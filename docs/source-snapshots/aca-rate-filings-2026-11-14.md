# Pennsylvania Insurance Department — ACA Health Rate Filings — source snapshot

**Checked:** 2026-11-14
**Source record:** `pa-insurance-department-aca-filings` in `docs/sources.registry.json`
**Publisher:** Pennsylvania Insurance Department (Commonwealth of Pennsylvania)
**URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings
**Jurisdiction:** Pennsylvania
**Program:** Individual and small-group commercial insurance markets (Affordable Care Act)
**Review state after this check:** `official_page_reviewed` (page re-confirmed against the live page 2026-11-14; still not a rule-bearing source)

## Observed content (2026-11-14)

Page read in full today (copy crawled 2026-11-14 19:56 UTC, 134 lines, both
tables captured). **UNCHANGED since the 2026-11-11 check — the seventh
identical check in a row (2026-10-13, 2026-10-16, 2026-11-03, 2026-11-06,
2026-11-09, 2026-11-11, 2026-11-14):** the two-phase rate-review text ("Initial Rate Change Review"
/ "Final Rate Change Decision & Approval") is intact, the 2027 plan-year
tables still carry all 15 individual-market and all 16 small-group-market
company rows with both "Requested Rate Change %" and "Approved Rate Change %"
columns populated, and every figure spot-checked against the 2026-11-11
snapshot agrees exactly: Ambetter Health of Pennsylvania individual 40.90%
→ 35.13%; Oscar Health Plan of PA individual 15.39% → 1.38%; Health
Partners Plans individual 15.90% → 18.35%; Keystone Health Plan East
individual 14.68% → 15.98%; QCC Insurance Company individual 19.88% →
21.31%; Independence Assurance small group 8.95% → 8.95%; Ambetter Health
Solutions of Pennsylvania still "0.00% New Plan" in requested, approved,
and 2026 market-share columns. The 2026 Market Share column agrees on
every spot-checked value (Keystone Health Plan East individual 21.06%,
UPMC Health Network individual 20.69%, Independence Assurance small group
22.95%). The "Available on Pennie® Marketplace" column agrees too:
individual 13 Yes / 2 No (the No rows still Ambetter Health Solutions of
Pennsylvania and Keystone Health Plan Central), small-group 16 of 16 No.
Seven identical checks now span 32 days, back to October 13. The 2027 review
cycle looks complete and stable, and the check date is the version, since
the page carries no revision date or document version of its own.

### What seven identical checks do — and do not — establish

Seven reads over 32 days agreeing on every figure establish that the page's
2027 tables have not moved since at least October 13: the review cycle is
finished and the published numbers are settled. They do not establish that
the page will never change — a 2028 plan-year cycle, a correction, or a
redesign can still arrive — and they do not upgrade the page into a
rule-bearing source. The page still carries no premium dollar amounts, no
provider-network directory, and no behavioral-health reimbursement figures,
so no rate or market parameter can be encoded from it. The discipline is
the same as the share and Pennie columns': read each column for what it
marks, and never let a settled table stand in for a network or payment fact
the page does not carry. The only new fact this seventh read adds is the
interval itself: three days after the sixth check — back to the streak's
usual three-day cadence after the two-day gap that preceded it; the page
is quiet on a three-day cadence again, and the streak now covers a full
month plus two days.

## Model use

Page-level verification only (unchanged): filings confirm the existence and
two-phase structure of commercial-market rate review and give 2027
requested/approved rate-change pairs plus 2026 market shares and the Pennie
availability flag, but provide no premium dollar amounts, no provider-network
directory, and no behavioral-health reimbursement figures. No
provider-network or payment parameter can be encoded from this page. The
new Glim workbook scene uses the seventh identical reading as a "the check
date is the version" lesson: seven reads over 32 days, every figure still in
place, and what that stability does and does not license.

## Consumer shipped this run

Glim workbook scene `u1_p5d7_filings_recheck` in
`learning-lab/visual-journey.js` ("Unit I · The 5 Players, Ch 3 ·
Player 5d⁗⁗⁗: The Seventh Identical Reading — Thirty-Two Days of Quiet"):
a quiz-panel scene teaching the re-verification finding (seventh identical
check; 15 individual + 16 small-group rows; all spot-check figures agree;
Pennie column still 13 Yes / 2 No individual, 16 No small-group) and the
version discipline for an undated page, wired into the chain between
`u1_p5d6_filings_recheck` (which now points at it) and `u1_p5e_covmap`.
Registered as lesson `aca-rate-filings-seventh-recheck` in
`learning-lab/lessons.json` with status `source_review_required` (never
`source_verified` — that is the owner's call).

## Status

Official page located and re-reviewed 2026-11-14; content unchanged since
2026-11-11 (seventh identical check; the 2027 review cycle appears complete
and stable). `review_required_before_encoding` remains true: no rate or
market parameter has been encoded from this page, and none should be until
a specific filing's document version/effective period, exact passage, and
applicability to the modeled scenario are reviewed.
