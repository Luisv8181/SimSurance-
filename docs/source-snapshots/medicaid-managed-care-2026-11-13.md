# Source snapshot: Managed Care | Medicaid (CMS)

- **Source:** Managed Care | Medicaid, Centers for Medicare & Medicaid Services (CMS)
- **URL:** https://www.medicaid.gov/medicaid/managed-care
- **Retrieval:** 2026-11-13, text fetch of the official URL (copy crawled 2026-11-13 11:55 UTC, less than a minute before the read) plus a live-browser rendered read 11:55-11:56 UTC (6:55-6:56 AM EST), first attempt, no block. No links were clicked and no sign-in occurred.
- **Registry record:** `medicaid-gov-managed-care` (docs/sources.registry.json)
- **Purpose of this check:** Sixth re-verification of the federal managed-care landing page; the 2026-11-10 check had confirmed the state care-coordination initiatives paragraph across four consecutive full-page reads and flagged that a re-verification that only re-checks the body paragraphs is not a full-page diff — the sidebar counts too. This run completes that full-page diff with a rendered read of the sidebar.

## Full page text as read today (three main-body paragraphs, complete)

> Managed Care is a health care delivery system organized to manage cost, utilization, and quality. Medicaid managed care provides for the delivery of Medicaid health benefits and additional services through contracted arrangements between state Medicaid agencies and managed care organizations (MCOs) that accept a set per member per month (capitation) payment for these services.

> By contracting with various types of MCOs to deliver Medicaid program health care services to their beneficiaries, states can reduce Medicaid program costs and better manage utilization of health services. Improvement in health plan performance, health care quality, and outcomes are key objectives of Medicaid managed care.

> Some states are implementing a range of initiatives to coordinate and integrate care beyond traditional managed care. These initiatives are focused on improving care for populations with chronic and complex conditions, aligning payment incentives with performance goals, and building in accountability for high quality care.

## Comparison against the 2026-11-10 full read

- **Page unchanged since 2026-11-10.** All three main-body paragraphs match the 2026-11-10 full read verbatim and in the same order: definition + per-member-per-month (capitation) sentence; the costs/utilization/quality-objectives paragraph; and the state care-coordination-initiatives paragraph. This is the sixth consecutive unchanged check (2026-10-15, 2026-11-01, 2026-11-04, 2026-11-07, 2026-11-10, 2026-11-13).
- **What this settles:** the initiatives paragraph is now confirmed across FIVE consecutive full-page reads (2026-11-01, 2026-11-04, 2026-11-07, 2026-11-10, and 2026-11-13), twelve days. Five agreeing full reads is the strongest statement this page's verification record can make about current content — and it is still only a statement about the page as of today.
- **What this does NOT settle:** whether the page changed between 2026-10-15 and 2026-11-01. The 2026-10-15 snapshot quoted only the first paragraph and summarized the rest; no full-page capture from October 15 exists to diff against, so the October under-quote question remains permanently unresolvable from these records. It is recorded as an evidence gap, not a page change.
- **Continuing absences in the main body (unchanged since 2026-10-15):** no federal-authority text inside the three paragraphs, no enrollment-share figure (no "percent" and no "%" anywhere in the rendered page text), no last-updated date displayed. Text searches for "Updated", "Last", "Revision", and "2026" returned no matches anywhere in the rendered page. The check date therefore remains the version stamp.

## NEW page-level work: the sidebar enumerated in full for the first time

- **Related Resources is FOUR items, not three.** The rendered page lists, verbatim: "1915 of the Social Security Act", "1932(a) of the Social Security Act", "Title 42, Part 438 of the Code of Federal Regulations", and "Managed Care Organization HIEPolicy" — the fourth item rendered with no space before "Policy". The first three are marked as opening in a new window.
- **"Policy and Program Topics" is SEVEN items**, in this order: "Managed Care Authorities" (first), "Enrollment Report", "Managed Care Entities", "Guidance", "Managed LTSS", "Profiles & Program Features", "Technical Assistance". "Managed Care Authorities" is confirmed still present, first in the list.
- **Other rendered-page elements recorded for the first time:** breadcrumbs "Home" > "Medicaid" > "Managed Care"; feature links below the main text "Final Rule", "Managed Care Quality", "Mental Health Parity"; top primary navigation "Federal Policy Guidance", "Resources for States", "Medicaid", "CHIP", "Basic Health Program", "State Overviews", "About Us", plus "FAQs" and a "Search Medicaid.gov" box (dropdown menus were collapsed and not opened, so submenu titles were not visible); "State Medicaid & CHIP Profiles" with a "- Choose a State -" selector and "View" button; "About Us" links "Program History", "Leadership", "Contact Us"; footer "Related Sites" (Data.Medicaid.gov, CMS.gov, HHS.gov, Healthcare.gov, InsureKidsNow.gov, Medicare.gov) and "Helpful Links" (Web Policies and Important Links, Plain Language, Nondiscrimination & Accessibility, Privacy Settings, No Fear Act, Archive, Site Feedback, Privacy Policy).
- **NO change claim on the fourth Related Resources item.** The 2026-11-10 read named three items without ever claiming the list was complete, so whether "Managed Care Organization HIEPolicy" was present on 2026-11-10 is unresolvable from these records — the same evidence-gap discipline as the October under-quote question. The HIEPolicy label is recorded exactly as rendered; it may be a site rendering artifact (a collapsed space), not a page change. No claim is made either way.
- **Discipline carried forward:** do not quote a Related Resources link title as a rule, an authority, or an applicability finding. The links are a doorway to the authority documents, and the documents themselves must be opened before any rule is stated. The linked authority documents were NOT opened this run.

## Scope

Page-level verification only. No rules encoded; `review_required_before_encoding` stays true. Consumer shipped this run: WORKBOOK scene `u5_p2b2_recheck5` ("The Sidebar, Counted in Full") wired between `u5_p2b2_recheck4` and `u5_p2b3_gate`, and lesson `medicaid-managed-care-recheck5` in learning-lab/lessons.json with status `source_review_required`.
