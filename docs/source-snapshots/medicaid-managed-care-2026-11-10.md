# Source snapshot: Managed Care | Medicaid (CMS)

- **Source:** Managed Care | Medicaid, Centers for Medicare & Medicaid Services (CMS)
- **URL:** https://www.medicaid.gov/medicaid/managed-care
- **Retrieval:** 2026-11-10, live-browser rendered read 18:55-18:57 UTC (1:55-1:57 PM EST), first attempt, no block. The plain-text fetch returned only a stale cached copy (older than 30 minutes), so the live-browser read is the verification this run; no links were clicked and no sign-in occurred.
- **Registry record:** `medicaid-gov-managed-care` (docs/sources.registry.json)
- **Purpose of this check:** Fifth re-verification of the federal managed-care landing page; the 2026-11-07 check had confirmed the state care-coordination initiatives paragraph across three consecutive full-page reads.

## Full page text as read today (three main-body paragraphs, complete)

> Managed Care is a health care delivery system organized to manage cost, utilization, and quality. Medicaid managed care provides for the delivery of Medicaid health benefits and additional services through contracted arrangements between state Medicaid agencies and managed care organizations (MCOs) that accept a set per member per month (capitation) payment for these services.

> By contracting with various types of MCOs to deliver Medicaid program health care services to their beneficiaries, states can reduce Medicaid program costs and better manage utilization of health services. Improvement in health plan performance, health care quality, and outcomes are key objectives of Medicaid managed care.

> Some states are implementing a range of initiatives to coordinate and integrate care beyond traditional managed care. These initiatives are focused on improving care for populations with chronic and complex conditions, aligning payment incentives with performance goals, and building in accountability for high quality care.

## Comparison against the 2026-11-07 full read

- **Page unchanged since 2026-11-07.** All three main-body paragraphs match the 2026-11-07 full read verbatim and in the same order: definition + per-member-per-month (capitation) sentence; the costs/utilization/quality-objectives paragraph; and the state care-coordination-initiatives paragraph.
- **What this settles:** the initiatives paragraph is now confirmed across FOUR consecutive full-page reads (2026-11-01, 2026-11-04, 2026-11-07, and 2026-11-10), nine days. Four agreeing full reads is the strongest statement this page's verification record can make about current content — and it is still only a statement about the page as of today.
- **What this does NOT settle:** whether the page changed between 2026-10-15 and 2026-11-01. The 2026-10-15 snapshot quoted only the first paragraph and summarized the rest; no full-page capture from October 15 exists to diff against, so the October under-quote question remains permanently unresolvable from these records. It is recorded as an evidence gap, not a page change.
- **Continuing absences in the main body (unchanged since 2026-10-15):** no federal-authority text inside the three paragraphs, no enrollment-share figure (no "percent" and no "%" anywhere in the rendered page text), no last-updated date displayed. The check date therefore remains the version stamp.

## NEW page-level observation (recorded, NOT a page change)

- **The page names authorities in its Related Resources section.** The rendered page lists "1915 of the Social Security Act", "1932(a) of the Social Security Act", and "Title 42, Part 438 of the Code of Federal Regulations" under Related Resources, and a navigation link titled "Managed Care Authorities" appears under "Policy and Program Topics". These are link titles naming authority documents, not authority text in the body: the three main-body paragraphs still carry no federal-authority language, and there is still no "1915(a)/(b)" subdivision and no "1115" text anywhere in the rendered page.
- **Why this is an observation, not a change finding:** every earlier snapshot's "no federal-authority text" claim was drawn from the three main-body paragraphs (the text-fetch captures were 12 lines, body only). The 2026-10-15 snapshot never enumerated the sidebar or Related Resources, so whether these links were present in October is unresolvable from these records. The standing claim is therefore QUALIFIED, not reversed: the body carries no authority text; the page does name authorities in its resource links. A re-verification that only re-checks the body paragraphs is not a full-page diff — the sidebar counts too. The linked authority documents were NOT opened this run.
- **Discipline carried forward:** do not quote a Related Resources link title as a rule, an authority, or an applicability finding. The links are a doorway to the authority documents, and the documents themselves must be opened before any rule is stated.

## Scope

Page-level verification only. No rules encoded; `review_required_before_encoding` stays true. Consumer shipped this run: WORKBOOK scene `u5_p2b2_recheck4` ("The Doorway, Confirmed Four Times") wired between `u5_p2b2_recheck3` and `u5_p2b3_gate`, and lesson `medicaid-managed-care-recheck4` in learning-lab/lessons.json with status `source_review_required`.
