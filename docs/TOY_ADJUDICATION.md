# Toy claim adjudication example

**Purpose:** test the software's rule-resolution and accounting path. This example is entirely hypothetical and is not a Pennsylvania Medicaid rate or coverage rule.

## Inputs

| Field | Value |
|---|---|
| Scenario | `toy-demo` |
| Service code | `SYN-THERAPY-001` (invented test code) |
| Rule ID | `TOY-RULE-001` |
| Provenance | `hypothetical_scenario` |
| Service date | 2026-10-01 |
| Units | 3 |
| Hypothetical allowed amount | $100.00 per unit |
| Member eligibility | True in test fixture |
| Provider qualification | True in test fixture |
| Authorization | Not required in test fixture |

## Hand calculation

$100.00 × 3 units = **$300.00** allowed and paid in this deliberately simple test case.

The software stores the amount as 30,000 integer cents. The test asserts that the result is paid, records the rule ID, and preserves the scenario boundary.

## Required negative cases

- No applicable rule → `needs_review`, $0 paid.
- Explicit not-covered rule → `denied`, $0 paid.
- Unknown member eligibility or provider qualification → `needs_review`, $0 paid.
- Conflicting applicable rules → `needs_review`, $0 paid.
- Hypothetical rule in a different scenario → does not leak into the baseline.
- A rule marked `verified_rule` without a source reference is invalid.

These tests establish software behavior only. Real policy rules and payment rates must be extracted from applicable official documents and reviewed before being loaded into a baseline scenario.
