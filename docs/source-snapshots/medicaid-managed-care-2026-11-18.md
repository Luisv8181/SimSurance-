# Source snapshot: Managed Care | Medicaid (CMS)

- **Source:** Managed Care | Medicaid, Centers for Medicare & Medicaid Services (CMS)
- **URL:** https://www.medicaid.gov/medicaid/managed-care
- **Retrieval:** 2026-11-18, text fetch of the official URL (copy crawled 2026-11-18 22:55 UTC, less than a minute before the read) plus a live-browser rendered read 22:56-22:57 UTC (5:56-5:57 PM EST), first attempt, no block. No links were clicked and no sign-in occurred.
- **Registry record:** `medicaid-gov-managed-care` (docs/sources.registry.json)
- **Purpose of this check:** Eighth re-verification of the federal managed-care landing page; the 2026-11-15 check had recorded the HIEPolicy spacing as an extraction fact and the footer address for the first time. This run re-diffs the whole rendered page — body paragraphs, both sidebar lists, and the date search — against that record.

## Full page text as read today (three main-body paragraphs, complete)

> Managed Care is a health care delivery system organized to manage cost, utilization, and quality. Medicaid managed care provides for the delivery of Medicaid health benefits and additional services through contracted arrangements between state Medicaid agencies and managed care organizations (MCOs) that accept a set per member per month (capitation) payment for these services.

> By contracting with various types of MCOs to deliver Medicaid program health care services to their beneficiaries, states can reduce Medicaid program costs and better manage utilization of health services. Improvement in health plan performance, health care quality, and outcomes are key objectives of Medicaid managed care.

> Some states are implementing a range of initiatives to coordinate and integrate care beyond traditional managed care. These initiatives are focused on improving care for populations with chronic and complex conditions, aligning payment incentives with performance goals, and building in accountability for high quality care.

## Comparison against the 2026-11-15 full read

- **Page unchanged since 2026-11-15 on the three core paragraphs.** All three main-body paragraphs match the 2026-11-15 full read verbatim and in the same order: definition + per-member-per-month (capitation) sentence; the costs/utilization/quality-objectives paragraph; and the state care-coordination-initiatives paragraph. This is the eighth consecutive unchanged check (2026-10-15, 2026-11-01, 2026-11-04, 2026-11-07, 2026-11-10, 2026-11-13, 2026-11-15, 2026-11-18).
- **What this settles:** the initiatives paragraph is now confirmed across SEVEN consecutive full-page reads (2026-11-01, 2026-11-04, 2026-11-07, 2026-11-10, 2026-11-13, 2026-11-15, and 2026-11-18), seventeen days. Seven agreeing full reads is the strongest statement this page's verification record can make about current content — and it is still only a statement about the page as of today.
- **What this does NOT settle:** whether the page changed between 2026-10-15 and 2026-11-01. The 2026-10-15 snapshot quoted only the first paragraph and summarized the rest; no full-page capture from October 15 exists to diff against, so the October under-quote question remains permanently unresolvable from these records. It is recorded as an evidence gap, not a page change.
- **Continuing absences in the main body (unchanged since 2026-10-15):** no federal-authority text inside the three paragraphs, no enrollment-share figure (no "percent" and no "%" anywhere in the rendered page text), no last-updated date displayed. Text searches for "2026", "2025", "Updated", "Last", and "Revision" returned no matches anywhere in the rendered page, including the header, sidebars, and footer. The check date therefore remains the version stamp.

## Newly surfaced sentence — recorded NOT as a confirmed page change

- **The rendered read today shows the initiatives paragraph continuing past "high quality care" with a sentence no prior snapshot records:** "For more information on managed care, see the links below." — followed by three feature links immediately below the main text: "Final Rule", "Managed Care Quality", "Mental Health Parity".
- **Why this is not claimed as a change.** The three links themselves were already on record since the 2026-11-13 snapshot ("feature links below the main text"), so the sentence points at nothing new. The sentence itself appears in NO prior snapshot — a grep of all 145 snapshots finds it only here. Two explanations fit the record: the sentence was added to the page since 2026-11-15, or the 2026-11-13 and 2026-11-15 rendered reads missed it. The second cannot be ruled out: the text-fetch extraction STILL ends the paragraph at "high quality care" today, exactly as on 2026-11-15 — the sentence is invisible to the text fetch, and both earlier rendered reads relied in part on that extraction. The sentence is therefore recorded as newly surfaced, with the change-vs-omission question left open, the same evidence-gap discipline as the October under-quote question and the HIEPolicy fourth-item question.
- **What the sentence adds:** nothing rule-bearing. It is a pointer to three links already recorded since 2026-11-13. The linked documents were NOT opened this run.

## Sidebar re-diff: both lists confirmed, HIEPolicy spacing still an extraction fact

- **Related Resources is still FOUR items**, verbatim and in the same order as 2026-11-13 and 2026-11-15: "1915 of the Social Security Act", "1932(a) of the Social Security Act", "Title 42, Part 438 of the Code of Federal Regulations", and "Managed Care Organization HIE Policy".
- **Spacing note, unchanged.** Today's rendered read shows the fourth item as "HIE Policy" with a visible space — consistent with the plain-text extraction view recorded on 2026-11-15. The 2026-11-13 and 2026-11-15 structured link listings read "HIEPolicy" with no space; no structured listing was requested this run, so that form is not re-tested today. The space remains an extraction/rendering difference between views of the same page, not a page fact and not a change. Do not quote the spacing either way as a page fact.
- **"Policy and Program Topics" is still SEVEN items**, in the same reading order as 2026-11-13 and 2026-11-15: "Managed Care Authorities" (first), "Enrollment Report", "Managed Care Entities", "Guidance", "Managed LTSS", "Profiles & Program Features", "Technical Assistance". Two-column layout confirmed again: items 1-4 left, 5-7 right; reading order unchanged.
- **Footer recorded with one more line.** The footer shows "A federal government managed website by the Centers for Medicare & Medicaid Services." and "7500 Security Boulevard Baltimore, MD 21244", under the heading "Centers for Medicare & Medicaid Services". The "federal government managed website" line is recorded for the first time; like the address on 2026-11-15, it may be a capture difference rather than a page change. No date anywhere in the footer.
- **Discipline carried forward:** do not quote a Related Resources link title as a rule, an authority, or an applicability finding. The links are a doorway to the authority documents, and the documents themselves must be opened before any rule is stated. The linked authority documents were NOT opened this run.

## Scope

Page-level verification only. No rules encoded; `review_required_before_encoding` stays true. Consumer shipped this run: WORKBOOK scene `u5_p2b2_recheck7` ("The Sentence the Text Fetch Couldn't See") wired between `u5_p2b2_recheck6` and `u5_p2b3_gate`, and lesson `medicaid-managed-care-recheck7` in learning-lab/lessons.json with status `source_review_required`.
