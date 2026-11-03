# Pennsylvania Insurance Department — ACA Health Rate Filings — source snapshot

**Checked:** 2026-11-03
**Source record:** `pa-insurance-department-aca-filings` in `docs/sources.registry.json`
**Publisher:** Pennsylvania Insurance Department (Commonwealth of Pennsylvania)
**URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings
**Jurisdiction:** Pennsylvania
**Program:** Individual and small-group commercial insurance markets (Affordable Care Act)
**Review state after this check:** `official_page_reviewed` (page re-confirmed against the live page 2026-11-03; still not a rule-bearing source)

## Observed content (2026-11-03)

Page read in full today (crawled 2026-11-03 14:55 UTC, 134 lines, both tables
captured). **Substantively unchanged since the 2026-10-16 check:** the
two-phase rate-review text ("Initial Rate Change Review" / "Final Rate Change
Decision & Approval") is intact, the 2027 plan-year tables still carry all 15
individual-market and all 16 small-group-market company rows with both
"Requested Rate Change %" and "Approved Rate Change %" columns populated,
and every figure spot-checked against the October snapshots agrees exactly:
Ambetter Health of Pennsylvania individual 40.90% → 35.13%; Oscar Health Plan
of PA individual 15.39% → 1.38%; Health Partners Plans individual 15.90% →
18.35%; Keystone Health Plan East individual 14.68% → 15.98%; QCC Insurance
individual 19.88% → 21.31%; Independence Assurance small group 8.95% →
8.95%; Ambetter Health Solutions of Pennsylvania still "0.00% New Plan" in
requested, approved, and 2026 market-share columns. Third identical check in
a row (2026-10-13, 2026-10-16, 2026-11-03) — the 2027 review cycle looks
complete and stable, and the check date is the version, since the page
carries no revision date or document version of its own.

### New page-level observation: the third column nobody reads

The tables carry a "2026 Market Share" column that the October snapshots
never analyzed. Read row by row, it is a concentration story with a date
warning attached:

- **Individual market:** the 15 shares sum to 99.99% (rounding only).
  Keystone Health Plan East 21.06% and UPMC Health Network, Inc. (shown as
  formerly UPMC Health Options, Inc.) 20.69% together hold 41.75% — over
  two-fifths of the individual market in two carriers. Highmark, Inc. is
  third at 15.80%.
- **Small-group market:** the 16 shares sum to 100.01% (rounding only).
  Concentration is sharper: Independence Assurance Company 22.95%, UPMC
  Health Network 22.63%, and Keystone Health Plan East/AmeriHealth HMO Inc.
  20.52% together hold 66.10% — two-thirds of the small-group market in
  three carriers.
- **The date warning:** the column is explicitly 2026 market share on a page
  whose rate columns are for the 2027 plan year. Share is a backward-looking
  footprint, not a 2027 fact, and it says nothing about premiums in dollars,
  provider networks, or behavioral-health reimbursement — the same limits
  that already apply to the whole page.

Name presentations observed today (recorded, not claimed as changes, since
the October snapshots did not enumerate every row name): UPMC Health
Network, Inc. is shown as formerly UPMC Health Options, Inc. in both tables
(the individual-market instance was already noted 2026-10-13), and Highmark
Care Benefits is shown as formerly FPLIC in the small-group table. All 15
individual rows show "Yes" or "No" on the Pennie Marketplace flag as before;
no small-group row is Pennie-available.

## Model use

Page-level verification only (unchanged): filings confirm the existence and
two-phase structure of commercial-market rate review and give 2027
requested/approved rate-change pairs plus 2026 market shares, but provide no
premium dollar amounts, no provider-network directory, and no
behavioral-health reimbursement figures. No provider-network or payment
parameter can be encoded from this page. The new Glim workbook scene uses
the market-share column as a "concentration is a footprint, not a price"
lesson: top-carrier shares, the 2026-vs-2027 date split, and the standing
rule that share never substitutes for a network or rate fact.

## Consumer shipped this run

Glim workbook scene `u1_p5d3_share` in `learning-lab/visual-journey.js`
("Unit I · The 5 Players, Ch 3 · Player 5d″: The Share Column — Concentration
Is a Footprint, Not a Price"): a quiz-panel scene teaching the 2026 market
share column (individual top two 41.75%, small-group top three 66.10%, both
columns summing to ~100% as an integrity check), wired into the chain
between `u1_p5d2_direction` (which now points at it) and `u1_p5e_covmap`.
Registered as lesson `aca-rate-filings-market-share` in
`learning-lab/lessons.json` with status `source_review_required` (never
`source_verified` — that is the owner's call).

## Status

Official page located and re-reviewed 2026-11-03; content substantively
unchanged since 2026-10-16 (the 2027 review cycle appears complete and
stable). `review_required_before_encoding` remains true: no rate or market
parameter has been encoded from this page, and none should be until a
specific filing's document version/effective period, exact passage, and
applicability to the modeled scenario are reviewed.
