"""Weekly baseline simulator for the fictional virtual county (roadmap M5/M6).

The simulator connects four existing pieces:

    synthetic demand (county.py) -> finite provider capacity (weekly slots)
    -> toy claim adjudication (policy.py) -> auditable ledger (ledger.py)

It is deliberately small and transparent. It is a teaching and software-testing
model: every number it produces is conditional on fictional assumptions and must
not be read as a forecast, a Pennsylvania estimate, or a causal effect.

Model mechanics (all are modeling assumptions, documented in docs/SIMULATION_MODEL.md):
- Time advances in weeks. Each person in care uses one weekly slot with one provider.
- New care-seeking episodes join a first-come, first-served waitlist.
- People already waiting may leave the waitlist each week (counted as unmet need).
- A person starts care when any provider has a free slot.
- Each scheduled session is attended or missed. Attended sessions generate a claim;
  missed sessions use the slot but generate no claim.
- People in care may stop early; otherwise the episode completes when the needed
  number of sessions has been attended.
- Monthly capitation is recorded as a financing transfer and never counted as a
  system cost; attended-session payments and coordinator costs are system costs.
"""

from __future__ import annotations

import random
from collections import deque
from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import Any

from .county import County, CountyConfig
from .ledger import Ledger, Transaction, TransactionType
from .policy import (
    AdjudicationStatus,
    Claim,
    CoverageStatus,
    PolicyRegistry,
    PolicyRule,
    Provenance,
    adjudicate_claim,
)

FICTIONAL_START_DATE = date(2027, 1, 4)  # fictional calendar anchor for toy claims
TOY_SERVICE_CODE = "TOY-OUTPATIENT-SESSION"  # deliberately not a real billing code
_BEHAVIOR_STREAM = 3_000_017

STATE = "fictional_state_program"
MCO = "fictional_managed_care_org"
COORDINATION = "fictional_care_coordination_program"


@dataclass
class _Client:
    episode_id: str
    arrival_week: int
    sessions_remaining: int
    provider_index: int = -1
    start_week: int = -1


@dataclass
class RunResult:
    """Outcome of one seeded simulation run."""

    scenario_id: str
    seed: int
    capacity_multiplier: float
    metrics: dict[str, float]
    weekly_waitlist: list[int]
    weekly_active: list[int]
    ledger: Ledger = field(repr=False)


def build_toy_registry(scenario_id: str, allowed_amount_cents: int) -> PolicyRegistry:
    """A single toy rule, tagged hypothetical, scoped to one scenario."""
    return PolicyRegistry([
        PolicyRule(
            rule_id=f"TOY-RULE-{scenario_id}",
            service_code=TOY_SERVICE_CODE,
            effective_from=FICTIONAL_START_DATE,
            effective_to=None,
            coverage=CoverageStatus.COVERED,
            provenance=Provenance.HYPOTHETICAL_SCENARIO,
            source_ref=None,
            scenario_id=scenario_id,
            allowed_amount_cents=allowed_amount_cents,
        )
    ])


def _percentile(values: list[int], q: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    position = (len(ordered) - 1) * q
    low = int(position)
    high = min(low + 1, len(ordered) - 1)
    return ordered[low] + (ordered[high] - ordered[low]) * (position - low)


def simulate(config: CountyConfig, county: County, scenario_id: str, *, capacity_multiplier: float = 1.0) -> RunResult:
    """Run one deterministic simulation for a county and scenario."""
    p = config.scenario_parameters(scenario_id)
    registry = build_toy_registry(scenario_id, p["allowed_amount_cents_per_session"])
    ledger = Ledger()
    rng = random.Random(county.seed * 7919 + _BEHAVIOR_STREAM)

    slots = [provider.weekly_slots for provider in county.providers]
    caseloads = [0 for _ in county.providers]
    arrivals_by_week: dict[int, list] = {}
    for episode in county.episodes:
        arrivals_by_week.setdefault(episode.arrival_week, []).append(episode)

    waitlist: deque[_Client] = deque()
    active: list[_Client] = []
    waits: list[int] = []
    counts = {
        "arrivals": 0, "started_care": 0, "completed": 0, "left_waitlist": 0,
        "stopped_care_early": 0, "attended_sessions": 0, "missed_sessions": 0,
        "claims_needing_review": 0, "started_within_4_weeks": 0,
    }
    weekly_waitlist: list[int] = []
    weekly_active: list[int] = []
    txn = 0
    last_month = -1

    def record(**kwargs: Any) -> None:
        nonlocal txn
        txn += 1
        ledger.add(Transaction(transaction_id=f"{scenario_id}-{county.seed}-T{txn:06d}", scenario_id=scenario_id, **kwargs))

    for week in range(config.weeks):
        month = week * 12 // config.weeks
        period = f"M{month + 1:02d}"
        service_date = FICTIONAL_START_DATE + timedelta(days=7 * week)

        if month != last_month:
            last_month = month
            record(period=period, payer=STATE, payee=MCO,
                   amount_cents=p["population"] * p["capitation_pmpm_cents"],
                   transaction_type=TransactionType.CAPITATION,
                   rule_ref="TOY-CAPITATION-ASSUMPTION", include_in_system_total=False)
        if p["coordinator_weekly_cost_cents"] > 0:
            record(period=period, payer=MCO, payee=COORDINATION,
                   amount_cents=p["coordinator_weekly_cost_cents"],
                   transaction_type=TransactionType.ADMINISTRATIVE_COST,
                   include_in_system_total=True)

        # 1. People already waiting may leave the waitlist (unmet need).
        if waitlist:
            remaining: deque[_Client] = deque()
            for client in waitlist:
                if rng.random() < p["weekly_waitlist_dropout"]:
                    counts["left_waitlist"] += 1
                else:
                    remaining.append(client)
            waitlist = remaining

        # 2. New episodes join the waitlist.
        for episode in arrivals_by_week.get(week, []):
            counts["arrivals"] += 1
            waitlist.append(_Client(episode.episode_id, episode.arrival_week, episode.sessions_needed))

        # 3. People already in care may stop early.
        still_active: list[_Client] = []
        for client in active:
            if client.start_week < week and rng.random() < p["weekly_treatment_dropout"]:
                counts["stopped_care_early"] += 1
                caseloads[client.provider_index] -= 1
            else:
                still_active.append(client)
        active = still_active

        # 4. Intake: fill free slots first-come, first-served.
        for index in range(len(slots)):
            while caseloads[index] < slots[index] and waitlist:
                client = waitlist.popleft()
                client.provider_index = index
                client.start_week = week
                caseloads[index] += 1
                active.append(client)
                wait = week - client.arrival_week
                waits.append(wait)
                counts["started_care"] += 1
                if wait <= 4:
                    counts["started_within_4_weeks"] += 1

        # 5. Sessions this week.
        still_active = []
        for client in active:
            if rng.random() < p["no_show_probability"]:
                counts["missed_sessions"] += 1
                still_active.append(client)
                continue
            counts["attended_sessions"] += 1
            claim = Claim(
                claim_id=f"{scenario_id}-{county.seed}-C{counts['attended_sessions']:06d}",
                service_code=TOY_SERVICE_CODE, service_date=service_date, units=1,
                scenario_id=scenario_id, member_eligible=True, provider_qualified=True,
            )
            result = adjudicate_claim(claim, registry)
            if result.status is AdjudicationStatus.PAID:
                record(period=period, payer=MCO,
                       payee=f"fictional_provider_{county.providers[client.provider_index].provider_id}",
                       amount_cents=result.paid_amount_cents,
                       transaction_type=TransactionType.SERVICE_PAYMENT,
                       rule_ref=result.rule_id, reference_id=claim.claim_id,
                       include_in_system_total=True)
            else:
                counts["claims_needing_review"] += 1
            client.sessions_remaining -= 1
            if client.sessions_remaining <= 0:
                counts["completed"] += 1
                caseloads[client.provider_index] -= 1
            else:
                still_active.append(client)
        active = still_active

        weekly_waitlist.append(len(waitlist))
        weekly_active.append(len(active))

    by_type = ledger.total_by_type(scenario_id=scenario_id)
    service_cents = by_type.get(TransactionType.SERVICE_PAYMENT.value, 0)
    coordinator_cents = by_type.get(TransactionType.ADMINISTRATIVE_COST.value, 0)
    capitation_cents = by_type.get(TransactionType.CAPITATION.value, 0)
    system_cents = ledger.system_total_cents(scenario_id=scenario_id)
    arrivals = counts["arrivals"]

    metrics: dict[str, float] = {
        **{k: float(v) for k, v in counts.items()},
        "still_waiting_at_end": float(len(waitlist)),
        "in_care_at_end": float(len(active)),
        "mean_wait_weeks": (sum(waits) / len(waits)) if waits else 0.0,
        "p90_wait_weeks": _percentile(waits, 0.9),
        "share_started_within_4_weeks": (counts["started_within_4_weeks"] / arrivals) if arrivals else 0.0,
        "unmet_need_share": ((counts["left_waitlist"] + len(waitlist)) / arrivals) if arrivals else 0.0,
        "service_payments_cents": float(service_cents),
        "coordinator_cost_cents": float(coordinator_cents),
        "capitation_transfers_cents": float(capitation_cents),
        "system_cost_cents": float(system_cents),
        "system_cost_per_completed_episode_cents": (system_cents / counts["completed"]) if counts["completed"] else 0.0,
        "weekly_slots": float(sum(slots)),
    }
    return RunResult(scenario_id, county.seed, capacity_multiplier, metrics, weekly_waitlist, weekly_active, ledger)
