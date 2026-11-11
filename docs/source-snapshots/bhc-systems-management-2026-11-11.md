# Source snapshot: pa-dhs-bhc-systems-management — 2026-11-11

- Source ID: `pa-dhs-bhc-systems-management`
- URL: https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-systems-management
- Retrieved: 2026-11-11 (live fetch, full page text, 253 lines; copy crawled 2026-11-11 14:55 UTC, <1 min before the read)
- Status vs 2026-11-08 review: substantively unchanged, section by section — fifth
  identical check (2026-10-15, 2026-11-02, 2026-11-05, 2026-11-08, 2026-11-11), 27-day streak.

## What was checked against the 2026-11-08 snapshot

1. Same fetch length as 2026-11-08, 2026-11-05, 2026-11-02, and 2026-10-15: 253 lines.
2. Division objective sentence unchanged (systems operations, claim/encounter-data
   management, business intelligence with received behavioral-health data, in
   service of eligible individuals accessing Medicaid- and County Base-Funded-covered
   behavioral health services).
3. Audience sentence unchanged — page still addressed to OMHSAS business partners,
   not a public dataset.
4. Systems Notices table: newest still OMHSAS-2026-001, "OMHSAS Sub-Capitation Paymen
   Supplemental File Reporting Requirements" (page's own typo "Paymen" retained),
   dated June 9, 2026; no newer notice added — now five months since the newest
   operational instruction. Three rows still "Reserved" in the main table (2021-003,
   2021-007, 2021-008), as in the 2026-11-08 snapshot. FIRST RECORDED COUNT: the
   table holds 41 rows in total (1 from 2026, 12 from 2020, 9 from 2021, 3 from
   2022, 7 from 2023, 5 from 2024, 4 from 2025) — prior snapshots did not record a
   count, so this is a baseline for future diffs, not a change claim.
5. Encounter Documents index unchanged in the sections enumerated 2026-10-15:
   837 encounters, 834 benefit enrollment/maintenance, unsolicited 277 status
   notifications, X12 999 functional acknowledgments, BES report layouts, ESC
   supplemental extract, diagnosis-code file layout, PRV435, PRV720, 834 companion
   guide, edit crosswalks, CCRI edit guides and reporting tools, CCRI webinar
   materials.
6. CCRI-Specific System Notices table unchanged: newest still CCRI-2025-001
   (Encounter Data — EDI Response Files, March 25, 2025); CCRI 2022–001 still
   "Reserved". Together with the main table, the page still holds FOUR Reserved
   document numbers (2021-003, 2021-007, 2021-008, CCRI 2022–001) — numbers with
   no title and no date behind them. Recorded as placeholders only: a Reserved
   row is not a notice, not a document, and not evidence of a missing rule.
7. HealthChoices Reports unchanged: per-BH-MCO Encounter Data Validation (EDV)
   studies dated 2023 (Beacon Health Options, Community Behavioral Health,
   Community Care Behavioral Health, Magellan, PerformCare) and on-site reviews
   dated 2023 and 2019. NOTE: the EDV-study PDFs themselves were NOT read this
   run (page-level review only); their findings remain unknown to this project.
   The newest validation evidence on the page is now two years old.
8. HealthChoices Provider Enrollment Documents unchanged: enrollment forms for
   PROMISe Provider Type 07 – Capitation.
9. Contact table for OMHSAS Systems Division resource accounts still present
   (837, 834, eligibility-discrepancy, BHSRCC, provider enrollment, ICWC,
   BH-MCO security, CCRI data accounts).

## New page-level observation this run

A SECOND fingerprint typo survives alongside "Sub-Capitation Paymen": the
HealthChoices Reports table describes the studies as "Encounter Data Valdiation
Study" (page line 225, "Valdiation" for Validation). Two independent slips
surviving five reads is stronger evidence the page has not been re-edited
between checks than one typo alone — but it is still only evidence about the
page, not about the program: a page that never moves is not proof the program
is current, only proof the page is still. The page still carries no revision
date, last-updated stamp, or document version anywhere — the check date
(2026-11-11) is the only version the citation has: cite this page as
"current as of the 2026-11-11 re-read."

## Verbatim quote (page lines 4–5, used for the Glim citation)

"The Division of Systems Management objective is to ensure eligible individuals
can access behavioral health services covered by Medicaid and County
Base-Funded Mental Health."

## Limits established this run (do NOT encode as rules)

- This page describes how OMHSAS handles data flows; it is not coverage, rate,
  benefit, or eligibility evidence, and nothing here becomes a simulator parameter.
- The encounter files, EDV-study contents, on-site-review findings, and
  business-intelligence outputs are nonpublic: the page's stated audience is
  business partners. SimSurance cannot use them; synthetic populations and public
  documents remain the evidence boundary.
- EDV studies were read as index rows only; their findings are unknown.
- The four Reserved rows are placeholders, not documents: do not count them as
  notices, do not fill them in, and do not read the gap as a missing rule.
- The 41-row Systems Notices count is a first-time baseline recorded this run;
  no earlier snapshot counted the table, so no change claim is made from it.
- review_required_before_encoding stays TRUE for this source.
- Honesty note on the comparison: the 2026-11-08 snapshot records a paraphrased
  section-by-section enumeration plus one verbatim quote, not stored raw page
  text, so this recheck is a section-by-section comparison against that
  enumeration (same line count, every enumerated element present in the same
  order and wording), not a byte-level diff.
