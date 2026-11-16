# Source snapshot: Managed Care | Medicaid (CMS)

- **Source:** Managed Care | Medicaid, Centers for Medicare & Medicaid Services (CMS)
- **URL:** https://www.medicaid.gov/medicaid/managed-care
- **Retrieval:** 2026-11-15, text fetch of the official URL (copy crawled 2026-11-16 04:55 UTC, less than a minute before the read) plus a live-browser rendered read 04:56-04:57 UTC (11:56-11:57 PM EST), first attempt, no block. No links were clicked and no sign-in occurred.
- **Registry record:** `medicaid-gov-managed-care` (docs/sources.registry.json)
- **Purpose of this check:** Seventh re-verification of the federal managed-care landing page; the 2026-11-13 check had enumerated the sidebar in full for the first time. This run re-diffs the whole rendered page — body paragraphs, both sidebar lists, and the date search — against that record.

## Full page text as read today (three main-body paragraphs, complete)

> Managed Care is a health care delivery system organized to manage cost, utilization, and quality. Medicaid managed care provides for the delivery of Medicaid health benefits and additional services through contracted arrangements between state Medicaid agencies and managed care organizations (MCOs) that accept a set per member per month (capitation) payment for these services.

> By contracting with various types of MCOs to deliver Medicaid program health care services to their beneficiaries, states can reduce Medicaid program costs and better manage utilization of health services. Improvement in health plan performance, health care quality, and outcomes are key objectives of Medicaid managed care.

> Some states are implementing a range of initiatives to coordinate and integrate care beyond traditional managed care. These initiatives are focused on improving care for populations with chronic and complex conditions, aligning payment incentives with performance goals, and building in accountability for high quality care.

## Comparison against the 2026-11-13 full read

- **Page unchanged since 2026-11-13.** All three main-body paragraphs match the 2026-11-13 full read verbatim and in the same order: definition + per-member-per-month (capitation) sentence; the costs/utilization/quality-objectives paragraph; and the state care-coordination-initiatives paragraph. This is the seventh consecutive unchanged check (2026-10-15, 2026-11-01, 2026-11-04, 2026-11-07, 2026-11-10, 2026-11-13, 2026-11-15).
- **What this settles:** the initiatives paragraph is now confirmed across SIX consecutive full-page reads (2026-11-01, 2026-11-04, 2026-11-07, 2026-11-10, 2026-11-13, and 2026-11-15), fourteen days. Six agreeing full reads is the strongest statement this page's verification record can make about current content — and it is still only a statement about the page as of today.
- **What this does NOT settle:** whether the page changed between 2026-10-15 and 2026-11-01. The 2026-10-15 snapshot quoted only the first paragraph and summarized the rest; no full-page capture from October 15 exists to diff against, so the October under-quote question remains permanently unresolvable from these records. It is recorded as an evidence gap, not a page change.
- **Continuing absences in the main body (unchanged since 2026-10-15):** no federal-authority text inside the three paragraphs, no enrollment-share figure (no "percent" and no "%" anywhere in the rendered page text), no last-updated date displayed. Text searches for "Updated", "Last", "Revision", "202", and "2026" returned no matches anywhere in the rendered page, including the header, sidebars, and footer. The check date therefore remains the version stamp.

## Sidebar re-diff: both lists confirmed, one rendering note

- **Related Resources is still FOUR items**, verbatim and in the same order as 2026-11-13: "1915 of the Social Security Act", "1932(a) of the Social Security Act", "Title 42, Part 438 of the Code of Federal Regulations", and "Managed Care Organization HIEPolicy".
- **NEW rendering observation on the fourth item, recorded NOT as a page change.** The browser's structured link listing still reads "HIEPolicy" with no space before "Policy", exactly as on 2026-11-13 — but the plain-text extraction and the enlarged rendered screenshot this run show the same item as "Managed Care Organization HIE Policy" with a visible space. Two views of the same rendered page disagree on the space, so the space is an extraction/rendering difference, not a change to the item itself. The label is recorded in both forms here, with the structured listing treated as the item's text. The 2026-11-13 "may be a site rendering artifact" caution is now confirmed as the right framing: do not quote the spacing either way as a page fact.
- **"Policy and Program Topics" is still SEVEN items**, in the same reading order as 2026-11-13: "Managed Care Authorities" (first), "Enrollment Report", "Managed Care Entities", "Guidance", "Managed LTSS", "Profiles & Program Features", "Technical Assistance". New layout note, not a content change: the seven items render visually in two columns (items 1-4 left, 5-7 right); the reading order above is unchanged.
- **Footer recorded for the first time:** the footer shows the Centers for Medicare & Medicaid Services address, "7500 Security Boulevard Baltimore, MD 21244", with no date. No date appears anywhere on the rendered page.
- **Discipline carried forward:** do not quote a Related Resources link title as a rule, an authority, or an applicability finding. The links are a doorway to the authority documents, and the documents themselves must be opened before any rule is stated. The linked authority documents were NOT opened this run.

## Scope

Page-level verification only. No rules encoded; `review_required_before_encoding` stays true. Consumer shipped this run: WORKBOOK scene `u5_p2b2_recheck6` ("The Space That Wasn't There") wired between `u5_p2b2_recheck5` and `u5_p2b3_gate`, and lesson `medicaid-managed-care-recheck6` in learning-lab/lessons.json with status `source_review_required`.
