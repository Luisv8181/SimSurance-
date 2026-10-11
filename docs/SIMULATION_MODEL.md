# Virtual County & Baseline Simulation Model (M4–M7)

## Purpose
This document describes the synthetic county and weekly discrete-event simulator implemented in [`src/simsurance/county.py`](../src/simsurance/county.py), [`src/simsurance/simulator.py`](../src/simsurance/simulator.py), and [`src/simsurance/runner.py`](../src/simsurance/runner.py), configured via [`config/toy_county.json`](../config/toy_county.json).

**Governance disclaimer:** Every parameter in `config/toy_county.json` is tagged `hypothetical_scenario`. None is a Pennsylvania Medicaid rate, caseload, prevalence estimate, network size, or policy rule. Simulation results are conditional on these assumptions and must never be reported as forecasts, empirical findings, or guaranteed cost savings.

---

## 1. Architecture & Separation of Concerns

1. **Configuration (`config/toy_county.json`)**:
   - Stores all numeric parameters, units, provenance tags (`hypothetical_scenario`, `expert_assumption`, `estimated_parameter`, `derived_value`, `verified_rule`), and scenario overrides.
   - Any parameter marked `verified_rule` is rejected by `parse_config()` unless accompanied by a `source_ref`.
   - Hashed via canonical SHA-256 (`CountyConfig.sha256`) so every run manifest is cryptographically tied to its exact parameter file.

2. **Synthetic County (`src/simsurance/county.py`)**:
   - Generates care-seeking episodes (`Episode`) and provider weekly slot capacities (`Provider`) over a 52-week horizon.
   - Uses **Common Random Numbers (CRN)**: arrival streams (`_ARRIVAL_STREAM`) and provider slot streams (`_PROVIDER_STREAM`) depend only on the integer `seed`, never on the scenario.
   - Consequently, `baseline` and `care_coordination_pilot` for `seed=k` face the *exact same* people arriving in the *exact same* weeks with the *exact same* provider slots.

3. **Weekly Simulator (`src/simsurance/simulator.py`)**:
   - Steps through 52 weeks:
     1. **Monthly Capitation Transfer**: Recorded on the first week of each month as `TransactionType.CAPITATION` (`include_in_system_total=False`).
     2. **Program Administrative Cost**: Recorded weekly when `coordinator_weekly_cost_cents > 0` as `TransactionType.ADMINISTRATIVE_COST` (`include_in_system_total=True`).
     3. **Waitlist Attrition**: Waiting individuals may drop off the waitlist with probability `weekly_waitlist_dropout` (tracked as unmet need, never conflated with recovery).
     4. **New Arrivals**: Episodes arriving in the current week join the FIFO waitlist.
     5. **In-Care Attrition**: Active clients after their intake week may stop early with probability `weekly_treatment_dropout`.
     6. **Intake Matching**: Available provider slots are filled first-come, first-served from the waitlist. Wait duration (`week - arrival_week`) is recorded.
     7. **Session Delivery & Adjudication**: Each active client either misses their scheduled slot (`no_show_probability`, consuming the slot without generating a claim) or attends, generating a `Claim` adjudicated via `adjudicate_claim()` and recorded in `Ledger` as `TransactionType.SERVICE_PAYMENT` (`include_in_system_total=True`).

4. **Replication Runner & Export (`src/simsurance/runner.py`, `scripts/export_lab_data.py`)**:
   - Runs 30 seeded replications (`seeds 1..30`) across 4 capacity multipliers (`0.75x`, `1.0x`, `1.25x`, `1.5x`) and 2 scenarios (`baseline`, `care_coordination_pilot`).
   - Computes mean, p10, p50 (median), and p90 across replications.
   - Exports [`learning-lab/data/county-sim.json`](../learning-lab/data/county-sim.json) for the interactive Virtual County Lab.

---

## 2. Accounting & Conservation Invariants

Tested automatically in [`tests/test_county_simulation.py`](../tests/test_county_simulation.py):

- **Episode Conservation**:
  $$\text{arrivals} = \text{started\_care} + \text{left\_waitlist} + \text{still\_waiting\_at\_end}$$
- **Active Care Conservation**:
  $$\text{started\_care} = \text{completed} + \text{stopped\_care\_early} + \text{in\_care\_at\_end}$$
- **No Double-Counting Invariant**:
  $$\text{system\_cost\_cents} = \text{service\_payments\_cents} + \text{coordinator\_cost\_cents}$$
  Capitation (`capitation_transfers_cents`) is tracked separately as a financing transfer between the state and the MCO and is never added to consolidated system cost.

---

## 3. Key Teaching Insight: Why Coordination Cannot Replace Capacity

Across the exported 30-seed grid:
- At **1.0x capacity**, the hypothetical care-coordination pilot increases completed episodes (`177` → `193`) and lowers unmet need (`22%` → `18%`) by reducing missed appointments (`15%` → `9%`) and waitlist drop-off (`4%` → `2%`).
- At **0.75x capacity** (severe clinician shortage), keeping people on the waitlist longer without adding appointment slots causes average wait times among those who start care to *increase* (`6.3` → `7.1` weeks) even as more episodes eventually complete (`138` → `149`).
- Expanding **provider capacity** (`1.0x` → `1.25x` → `1.5x`) directly collapses the queue (`3.3` weeks → `1.1` weeks → `0.2` weeks).

This illustrates a core Learning Lab principle: **coordination, coverage, and clinical capacity solve different bottlenecks.**
