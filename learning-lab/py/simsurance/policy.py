"""Minimal versioned policy registry and toy claim adjudication.

This is a software test harness, not a statement of Pennsylvania Medicaid policy.
Production rules must be sourced, versioned, reviewed, and scoped to an applicable
program/contract before use.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from enum import Enum
from typing import Iterable


class PolicyError(ValueError):
    """Raised when a policy record is internally invalid."""


class Provenance(str, Enum):
    VERIFIED_RULE = "verified_rule"
    DERIVED_VALUE = "derived_value"
    ESTIMATED_PARAMETER = "estimated_parameter"
    EXPERT_ASSUMPTION = "expert_assumption"
    HYPOTHETICAL_SCENARIO = "hypothetical_scenario"


class CoverageStatus(str, Enum):
    COVERED = "covered"
    NOT_COVERED = "not_covered"
    UNRESOLVED = "unresolved"


class AdjudicationStatus(str, Enum):
    PAID = "paid"
    DENIED = "denied"
    NEEDS_REVIEW = "needs_review"


@dataclass(frozen=True, slots=True)
class PolicyRule:
    rule_id: str
    service_code: str
    effective_from: date
    effective_to: date | None
    coverage: CoverageStatus
    provenance: Provenance
    source_ref: str | None = None
    scenario_id: str = "baseline"
    allowed_amount_cents: int | None = None

    def __post_init__(self) -> None:
        for field_name in ("rule_id", "service_code", "scenario_id"):
            value = getattr(self, field_name)
            if not isinstance(value, str) or not value.strip():
                raise PolicyError(f"{field_name} must be a non-empty string")
        if self.effective_to is not None and self.effective_to < self.effective_from:
            raise PolicyError("effective_to cannot be earlier than effective_from")
        if self.provenance is Provenance.VERIFIED_RULE and not self.source_ref:
            raise PolicyError("verified_rule requires a source_ref")
        if self.allowed_amount_cents is not None:
            if isinstance(self.allowed_amount_cents, bool) or not isinstance(self.allowed_amount_cents, int):
                raise PolicyError("allowed_amount_cents must be integer cents")
            if self.allowed_amount_cents < 0:
                raise PolicyError("allowed_amount_cents cannot be negative")
        if self.coverage is CoverageStatus.NOT_COVERED and self.allowed_amount_cents not in (None, 0):
            raise PolicyError("a not-covered rule cannot specify a positive allowed amount")

    def applies_on(self, service_date: date, scenario_id: str) -> bool:
        return (
            self.scenario_id == scenario_id
            and self.effective_from <= service_date
            and (self.effective_to is None or service_date <= self.effective_to)
        )


@dataclass(frozen=True, slots=True)
class RuleResolution:
    status: CoverageStatus
    rule: PolicyRule | None
    reason: str


class PolicyRegistry:
    def __init__(self, rules: Iterable[PolicyRule] = ()) -> None:
        self._rules: list[PolicyRule] = []
        ids: set[str] = set()
        for rule in rules:
            if rule.rule_id in ids:
                raise PolicyError(f"duplicate rule_id: {rule.rule_id}")
            ids.add(rule.rule_id)
            self._rules.append(rule)

    @property
    def rules(self) -> tuple[PolicyRule, ...]:
        return tuple(self._rules)

    def resolve(self, service_code: str, service_date: date, *, scenario_id: str = "baseline") -> RuleResolution:
        matches = [
            rule for rule in self._rules
            if rule.service_code == service_code and rule.applies_on(service_date, scenario_id)
        ]
        if not matches:
            return RuleResolution(CoverageStatus.UNRESOLVED, None, "No applicable rule found")
        if len(matches) > 1:
            return RuleResolution(CoverageStatus.UNRESOLVED, None, "Conflicting applicable rules found")
        rule = matches[0]
        if rule.coverage is CoverageStatus.UNRESOLVED:
            return RuleResolution(CoverageStatus.UNRESOLVED, rule, "Rule is explicitly unresolved")
        return RuleResolution(rule.coverage, rule, "Resolved by applicable rule")


@dataclass(frozen=True, slots=True)
class Claim:
    claim_id: str
    service_code: str
    service_date: date
    units: int
    scenario_id: str = "baseline"
    member_eligible: bool | None = None
    provider_qualified: bool | None = None
    authorization_required: bool = False
    authorization_approved: bool | None = None

    def __post_init__(self) -> None:
        if not self.claim_id.strip() or not self.service_code.strip() or not self.scenario_id.strip():
            raise PolicyError("claim_id, service_code, and scenario_id must be non-empty")
        if isinstance(self.units, bool) or not isinstance(self.units, int) or self.units <= 0:
            raise PolicyError("units must be a positive integer")


@dataclass(frozen=True, slots=True)
class AdjudicationResult:
    claim_id: str
    status: AdjudicationStatus
    allowed_amount_cents: int | None
    paid_amount_cents: int
    rule_id: str | None
    reason: str
    source_ref: str | None


def adjudicate_claim(claim: Claim, registry: PolicyRegistry) -> AdjudicationResult:
    """Adjudicate a toy claim without inventing missing policy decisions."""
    resolution = registry.resolve(claim.service_code, claim.service_date, scenario_id=claim.scenario_id)
    rule = resolution.rule

    def result(status: AdjudicationStatus, reason: str, allowed: int | None = None) -> AdjudicationResult:
        return AdjudicationResult(
            claim_id=claim.claim_id,
            status=status,
            allowed_amount_cents=allowed,
            paid_amount_cents=0,
            rule_id=rule.rule_id if rule else None,
            reason=reason,
            source_ref=rule.source_ref if rule else None,
        )

    if resolution.status is CoverageStatus.UNRESOLVED:
        return result(AdjudicationStatus.NEEDS_REVIEW, resolution.reason)
    if resolution.status is CoverageStatus.NOT_COVERED:
        return result(AdjudicationStatus.DENIED, "Service is not covered by the resolved rule", 0)
    if claim.member_eligible is False:
        return result(AdjudicationStatus.DENIED, "Member eligibility check failed")
    if claim.provider_qualified is False:
        return result(AdjudicationStatus.DENIED, "Provider qualification check failed")
    if claim.authorization_required and claim.authorization_approved is False:
        return result(AdjudicationStatus.DENIED, "Required authorization was not approved")
    if claim.member_eligible is None or claim.provider_qualified is None:
        return result(AdjudicationStatus.NEEDS_REVIEW, "Eligibility or provider qualification is unknown")
    if claim.authorization_required and claim.authorization_approved is None:
        return result(AdjudicationStatus.NEEDS_REVIEW, "Required authorization status is unknown")
    if rule is None or rule.allowed_amount_cents is None:
        return result(AdjudicationStatus.NEEDS_REVIEW, "No allowed amount is defined by the rule")

    allowed = rule.allowed_amount_cents * claim.units
    return AdjudicationResult(
        claim_id=claim.claim_id,
        status=AdjudicationStatus.PAID,
        allowed_amount_cents=allowed,
        paid_amount_cents=allowed,
        rule_id=rule.rule_id,
        reason="Toy adjudication passed all configured checks",
        source_ref=rule.source_ref,
    )
