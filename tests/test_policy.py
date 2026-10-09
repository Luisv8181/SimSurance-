import unittest
from datetime import date

from simsurance.policy import (
    AdjudicationStatus, Claim, CoverageStatus, PolicyError, PolicyRegistry,
    PolicyRule, Provenance, adjudicate_claim,
)

SERVICE_DATE = date(2026, 10, 1)


def toy_rule(**overrides):
    values = dict(
        rule_id="TOY-RULE-001",
        service_code="SYN-THERAPY-001",
        effective_from=date(2026, 1, 1),
        effective_to=None,
        coverage=CoverageStatus.COVERED,
        provenance=Provenance.HYPOTHETICAL_SCENARIO,
        source_ref=None,
        scenario_id="toy-demo",
        allowed_amount_cents=10_000,
    )
    values.update(overrides)
    return PolicyRule(**values)


class PolicyTests(unittest.TestCase):
    def test_hypothetical_claim_paid_with_hand_calculated_total(self):
        registry = PolicyRegistry([toy_rule()])
        claim = Claim(
            claim_id="TOY-CLAIM-001", service_code="SYN-THERAPY-001",
            service_date=SERVICE_DATE, units=3, scenario_id="toy-demo",
            member_eligible=True, provider_qualified=True,
        )
        result = adjudicate_claim(claim, registry)
        self.assertEqual(result.status, AdjudicationStatus.PAID)
        self.assertEqual(result.allowed_amount_cents, 30_000)
        self.assertEqual(result.paid_amount_cents, 30_000)
        self.assertEqual(result.rule_id, "TOY-RULE-001")

    def test_missing_rule_needs_review_not_auto_approval(self):
        claim = Claim("C-2", "UNKNOWN", SERVICE_DATE, 1, member_eligible=True, provider_qualified=True)
        result = adjudicate_claim(claim, PolicyRegistry())
        self.assertEqual(result.status, AdjudicationStatus.NEEDS_REVIEW)
        self.assertEqual(result.paid_amount_cents, 0)

    def test_not_covered_rule_denies_claim(self):
        rule = toy_rule(coverage=CoverageStatus.NOT_COVERED, allowed_amount_cents=None)
        claim = Claim("C-3", rule.service_code, SERVICE_DATE, 1, scenario_id="toy-demo", member_eligible=True, provider_qualified=True)
        result = adjudicate_claim(claim, PolicyRegistry([rule]))
        self.assertEqual(result.status, AdjudicationStatus.DENIED)
        self.assertEqual(result.paid_amount_cents, 0)

    def test_unknown_eligibility_needs_review(self):
        rule = toy_rule()
        claim = Claim("C-4", rule.service_code, SERVICE_DATE, 1, scenario_id="toy-demo", provider_qualified=True)
        result = adjudicate_claim(claim, PolicyRegistry([rule]))
        self.assertEqual(result.status, AdjudicationStatus.NEEDS_REVIEW)

    def test_conflicting_rules_need_review(self):
        first = toy_rule()
        second = toy_rule(rule_id="TOY-RULE-002", allowed_amount_cents=12_000)
        claim = Claim("C-5", first.service_code, SERVICE_DATE, 1, scenario_id="toy-demo", member_eligible=True, provider_qualified=True)
        result = adjudicate_claim(claim, PolicyRegistry([first, second]))
        self.assertEqual(result.status, AdjudicationStatus.NEEDS_REVIEW)
        self.assertEqual(result.paid_amount_cents, 0)

    def test_verified_rule_requires_source(self):
        with self.assertRaises(PolicyError):
            toy_rule(provenance=Provenance.VERIFIED_RULE, source_ref=None)

    def test_scenario_rule_does_not_leak_into_baseline(self):
        rule = toy_rule()
        claim = Claim("C-7", rule.service_code, SERVICE_DATE, 1, scenario_id="baseline", member_eligible=True, provider_qualified=True)
        result = adjudicate_claim(claim, PolicyRegistry([rule]))
        self.assertEqual(result.status, AdjudicationStatus.NEEDS_REVIEW)


if __name__ == "__main__":
    unittest.main()
