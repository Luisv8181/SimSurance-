# Pennsylvania Insurance Department — ACA Health Rate Filings — source snapshot

**Checked:** 2026-11-06
**Source record:** `pa-insurance-department-aca-filings` in `docs/sources.registry.json`
**Publisher:** Pennsylvania Insurance Department (Commonwealth of Pennsylvania)
**URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings
**Jurisdiction:** Pennsylvania
**Program:** Individual and small-group commercial insurance markets (Affordable Care Act)
**Review state after this check:** `official_page_reviewed` (page re-confirmed against the live page 2026-11-06; still not a rule-bearing source)

## Observed content (2026-11-06)

Page read in full today (copy crawled 2026-11-06 14:55 UTC, 134 lines, both
tables captured). **UNCHANGED since the 2026-11-03 check — the fourth
identical check in a row (2026-10-13, 2026-10-16, 2026-11-03, 2026-11-06):**
the two-phase rate-review text ("Initial Rate Change Review" / "Final Rate
Change Decision & Approval") is intact, the 2027 plan-year tables still carry
all 15 individual-market and all 16 small-group-market company rows with
both "Requested Rate Change %" and "Approved Rate Change %" columns
populated, and every figure spot-checked against the 2026-11-03 snapshot
agrees exactly: Ambetter Health of Pennsylvania individual 40.90% →
35.13%; Oscar Health Plan of PA individual 15.39% → 1.38%; Health Partners
Plans individual 15.90% → 18.35%; Keystone Health Plan East individual
14.68% → 15.98%; QCC Insurance individual 19.88% → 21.31%; Independence
Assurance small group 8.95% → 8.95%; Ambetter Health Solutions of
Pennsylvania still "0.00% New Plan" in requested, approved, and 2026
market-share columns. The 2026 Market Share column agrees on every
spot-checked value (Keystone Health Plan East individual 21.06%, UPMC
Health Network individual 20.69%, Independence Assurance small group
22.95%). The 2027 review cycle looks complete and stable, and the check date
is the version, since the page carries no revision date or document version
of its own.

### New page-level observation: the Pennie column

The tables carry an "Available on Pennie® Marketplace" column that no
earlier snapshot analyzed. Read row by row:

- **Individual market:** 13 of 15 rows read Yes; the two No rows are
  Ambetter Health Solutions of Pennsylvania, Inc. (the "0.00% New Plan"
  row) and Keystone Health Plan Central.
- **Small-group market:** all 16 rows read No — not one small-group plan
  is listed as available on Pennie.

The flag marks whether that row's plan is listed for sale on Pennie's
marketplace. It is a doorway fact, not a sales or coverage fact: a "No"
does not mean the plan cannot be bought in Pennsylvania (small-group plans
are sold through employers and brokers, off the individual marketplace),
and a "Yes" says nothing about premiums in dollars, provider networks, or
behavioral-health reimbursement. The column's own discipline is the same as
the share column's — read the flag for what it marks, and never let it
stand in for a network or rate fact the page does not carry.

## Model use

Page-level verification only (unchanged): filings confirm the existence and
two-phase structure of commercial-market rate review and give 2027
requested/approved rate-change pairs plus 2026 market shares and the Pennie
availability flag, but provide no premium dollar amounts, no provider-network
directory, and no behavioral-health reimbursement figures. No
provider-network or payment parameter can be encoded from this page. The
new Glim workbook scene uses the Pennie column as a "a marketplace flag is
not a sales fact" lesson: 13-of-15 individual Yes, 16-of-16 small-group No,
and the standing rule that a flag never substitutes for a network or rate
fact.

## Consumer shipped this run

Glim workbook scene `u1_p5d4_pennieflag` in `learning-lab/visual-journey.js`
("Unit I · The 5 Players, Ch 3 · Player 5d‴: The Pennie Column — A
Marketplace Flag Is Not a Sales Fact"): a quiz-panel scene teaching the
"Available on Pennie® Marketplace" column (individual 13 Yes / 2 No,
small-group 16 No), wired into the chain between `u1_p5d3_share` (which now
points at it) and `u1_p5e_covmap`. Registered as lesson
`aca-rate-filings-pennie-flag` in `learning-lab/lessons.json` with status
`source_review_required` (never `source_verified` — that is the owner's
call).

## Status

Official page located and re-reviewed 2026-11-06; content unchanged since
2026-11-03 (fourth identical check; the 2027 review cycle appears complete
and stable). `review_required_before_encoding` remains true: no rate or
market parameter has been encoded from this page, and none should be until
a specific filing's document version/effective period, exact passage, and
applicability to the modeled scenario are reviewed.
