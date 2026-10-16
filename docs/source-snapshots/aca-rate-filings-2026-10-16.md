# Pennsylvania Insurance Department — ACA Health Rate Filings — source snapshot

**Checked:** 2026-10-16
**Source record:** `pa-insurance-department-aca-filings` in `docs/sources.registry.json`
**Publisher:** Pennsylvania Insurance Department (Commonwealth of Pennsylvania)
**URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings
**Jurisdiction:** Pennsylvania
**Program:** Individual and small-group commercial insurance markets (Affordable Care Act)
**Review state after this check:** `official_page_reviewed` (page re-confirmed verbatim against the live page 2026-10-16; still not a rule-bearing source)

## Observed content (2026-10-16)

Page read verbatim today. **No change since the 2026-10-13 snapshot:** the
two-phase rate-review text ("Initial Rate Change Review" / "Final Rate Change
Decision & Approval") is intact, and the 2027 plan-year tables still show all
15 individual-market and all 16 small-group-market company rows with both
"Requested Rate Change %" and "Approved Rate Change %" columns populated
(review cycle for 2027 appears complete and stable).

### New page-level observation: the approval can exceed the request

Row-by-row comparison (not previously recorded) shows the direction of
request-vs-approved divergence varies:

- **Approved below requested (the department cut the request):** the common
  case — e.g., Ambetter Health of Pennsylvania individual 40.90% → 35.13%;
  Oscar Health Plan of PA individual 15.39% → 1.38%.
- **Approved above requested (the department raised the request):**
  Health Partners Plans, Inc. individual 15.90% → 18.35%; Keystone Health
  Plan East individual 14.68% → 15.98%; QCC Insurance Company individual
  19.88% → 21.31%.
- **Approved equal to requested (review left the filing untouched):**
  Independence Assurance Company small group 8.95% → 8.95%; Keystone Health
  Plan Central small group 20.93% → 20.93%; Keystone Health Plan
  East/AmeriHealth HMO small group 6.48% → 6.48%.
- **New-plan entrant (no baseline):** Ambetter Health Solutions of
  Pennsylvania, Inc. shows "0.00% New Plan" in the requested, approved, and
  2026 market-share columns. A first filing has no prior premium, so 0.00%
  here means "no prior rate to change," not "premiums held flat."

Discipline for modeling: the approved column is the department's decision —
encode that number, never the request, and never the average of the two.
The request is neither a ceiling nor a floor.

## Model use

Page-level verification only (unchanged): filings confirm the existence and
two-phase structure of commercial-market rate review and give 2027
requested/approved rate-change pairs, but provide no premium dollar amounts,
no provider-network directory, and no behavioral-health reimbursement
figures. No provider-network or payment parameter can be encoded from this
page. The new Glim workbook scene uses the direction-of-divergence finding
as a "never encode the request; never assume its direction" lesson, with the
"New Plan" 0.00% rows as the non-observation discipline.

## Consumer shipped this run

Glim workbook scene `u1_p5d2_direction` in `learning-lab/visual-journey.js`
("Unit I · The 5 Players, Ch 3 · Player 5d′: The Rate Ledger, Both Directions
— The Request Is Not the Ceiling"): a quiz-panel scene teaching the
variable direction of request→approved divergence and the new-plan 0.00%
non-observation, wired into the chain between `u1_p5d_rates` (which now
points at it) and `u1_p5e_covmap`. Registered as lesson
`aca-rate-filings-direction` in `learning-lab/lessons.json` with status
`source_review_required` (never `source_verified` — that is the owner's call).

## Status

Official page located and re-reviewed 2026-10-16; content unchanged since
2026-10-13 (the 2027 review cycle appears complete and stable).
`review_required_before_encoding` remains true: no rate or market parameter
has been encoded from this page, and none should be until a specific filing's
document version/effective period, exact passage, and applicability to the
modeled scenario are reviewed.
