# Source snapshot: Managed Care | Medicaid (CMS)

- **Source:** Managed Care | Medicaid, Centers for Medicare & Medicaid Services (CMS)
- **URL:** https://www.medicaid.gov/medicaid/managed-care
- **Retrieval:** 2026-11-04, via text fetch (page copy crawled 2026-11-04 09:40 UTC, ~1 hour before this run's check)
- **Registry record:** `medicaid-gov-managed-care` (docs/sources.registry.json)
- **Purpose of this check:** Third re-verification of the federal managed-care landing page; the 2026-11-01 re-verification had left an unresolved difference (a third paragraph on state care-coordination initiatives that the 2026-10-15 snapshot never quoted).

## Full page text as read today (12 lines, complete)

> Managed Care is a health care delivery system organized to manage cost, utilization, and quality. Medicaid managed care provides for the delivery of Medicaid health benefits and additional services through contracted arrangements between state Medicaid agencies and managed care organizations (MCOs) that accept a set per member per month (capitation) payment for these services.

> By contracting with various types of MCOs to deliver Medicaid program health care services to their beneficiaries, states can reduce Medicaid program costs and better manage utilization of health services. Improvement in health plan performance, health care quality, and outcomes are key objectives of Medicaid managed care.

> Some states are implementing a range of initiatives to coordinate and integrate care beyond traditional managed care. These initiatives are focused on improving care for populations with chronic and complex conditions, aligning payment incentives with performance goals, and building in accountability for high quality care.

## Comparison against the 2026-11-01 full read

- **Page unchanged since 2026-11-01.** All three paragraphs match the 2026-11-01 full read verbatim and in the same order: definition + per-member-per-month (capitation) sentence; the costs/utilization/quality-objectives paragraph; and the state care-coordination-initiatives paragraph.
- **What this settles:** the initiatives paragraph is now confirmed across TWO consecutive full-page reads (2026-11-01 and 2026-11-04), not one. It is no longer "today's read only" — but it is still overview language, never a rule, an authority, a rate, or an enrollment figure.
- **What this does NOT settle:** whether the page changed between 2026-10-15 and 2026-11-01. The 2026-10-15 snapshot quoted only the first paragraph and summarized the rest; no full-page capture from October 15 exists to diff against, so the October under-quote question remains permanently unresolvable from these records. It is recorded as an evidence gap, not a page change.
- **Continuing absences (unchanged since 2026-10-15):** no federal-authority text (no 1932(a), 1915(a)/(b), or 1115 mention), no enrollment-share figure, no last-updated date displayed. The check date therefore remains the version stamp.
- **Not followed this run:** sidebar links (e.g., "Managed Care Authorities") and linked documents were not opened; this page is an index/overview, not a source of any state's authority, rates, or enrollment figures.

## Scope

Page-level verification only. No rules encoded; `review_required_before_encoding` stays true. Consumer shipped this run: WORKBOOK scene `u5_p2b2_recheck2` ("The Doorway, Confirmed Twice") wired between `u5_p2b2_recheck` and `u5_p2b3_gate`, and lesson `medicaid-managed-care-recheck2` in learning-lab/lessons.json with status `source_review_required`.
