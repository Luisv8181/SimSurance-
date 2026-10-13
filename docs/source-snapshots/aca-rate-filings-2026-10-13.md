# Pennsylvania Insurance Department — ACA Health Rate Filings — source snapshot

**Checked:** 2026-10-13
**Source record:** `pa-insurance-department-aca-filings` in `docs/sources.registry.json`
**Publisher:** Pennsylvania Insurance Department (Commonwealth of Pennsylvania)
**URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings
**Jurisdiction:** Pennsylvania
**Program:** Individual and small-group commercial insurance markets (Affordable Care Act)
**Review state after this check:** `official_page_reviewed` (rate-filing index re-confirmed against the live page; still not a rule-bearing source)

## Observed content (2026-10-13)

Page text read verbatim today. The page describes **two main phases in the rate
review process each year**:

- **Initial Rate Change Review:** insurers send proposed rates and
  documentation; the department considers "their future cost estimates,
  historical data, and forecasts for the coming year" plus "the insurer's
  revenues, actual and projected profits, past rate changes, and the impact on
  Pennsylvania consumers."
- **Final Rate Change Decision & Approval:** after the initial review, the
  department sends necessary changes to the insurer; once made, the rates for
  the upcoming plan year are finalized and approved, and the final rate-change
  decision details are published.

**2027 plan-year filing tables** (page is already populated for the upcoming
2027 plan year, with both requested and approved rate-change columns filled):

- Individual-market table (15 companies): company name, tracking number,
  "Available on Pennie Marketplace" flag, Requested Rate Change %,
  Approved Rate Change %, 2026 Market Share, plan-availability coverage map,
  initial-request summary, and final-decision summary links.
- Small-group-market table (16 companies): same columns; none available on
  Pennie Marketplace.
- Example of request vs. decision divergence (both columns visible on the
  page): Ambetter Health of Pennsylvania, Inc. — requested 40.90%, approved
  35.13% (individual market); Oscar Health Plan of PA — requested 15.39%,
  approved 1.38% (individual market). UPMC Health Network, Inc. is shown as
  formerly UPMC Health Options, Inc.

The page lists **percentage rate changes and coverage-map links only** — no
premium dollar amounts, no provider-network directory, and no
behavioral-health-specific reimbursement figures.

## Model use

Commercial-market context for the reimbursement/economist tracks: this check
confirms the standing scope note — filings verify *that* a commercial market
rate review exists and its two-phase structure, but filings do not prove a
provider's network participation or behavioral-health reimbursement, so no
provider-network or payment parameter can be encoded from this page. For a
future modeled commercial scenario, the page answers *which* filing tables
exist (2027 individual + small group) and distinguishes the **request** (the
insurer's proposal) from the **approval** (the department's decision) — the
request must never be encoded as the price. The new Glim workbook scene uses
this page as a "rate ledger" lesson with the request-vs-approved distinction
as the modeled concept.

## Consumer shipped this run

Glim workbook scene `u1_p5d_rates` in `learning-lab/visual-journey.js`
("Unit I · The 5 Players, Ch 3 · Player 5d: The Rate Ledger — Who Sets the
Premium You See"): a quiz-panel scene teaching the two-phase rate review and
the request-vs-approved distinction using the verbatim department sentences
as the citation quote, wired into the chain after `u1_p5c_pennie` (which now
points at it). Registered as lesson `aca-rate-filings-2027` in
`learning-lab/lessons.json` with status `source_review_required` (never
`source_verified` — that is the owner's call).

## Status

Official page located and re-reviewed 2026-10-13; the page is now populated
with 2027 plan-year requested AND approved rate-change figures (review cycle
for 2027 appears complete). `review_required_before_encoding` remains true:
no rate or market parameter has been encoded from this page, and none should
be until a specific filing's document version/effective period, exact
passage, and applicability to the modeled scenario are reviewed.
