# CMS Medicaid Managed Care Rate Review and Rate Guides — source snapshot

**Checked:** 2026-11-02 (live browser read, evening ET; no sign-in, no guide PDFs downloaded)
**Source record:** `cms-managed-care-rate-guidance` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS)
**URL:** https://www.medicaid.gov/medicaid/managed-care/guidance/rate-review-and-rate-guides
**Jurisdiction:** United States (federal)
**Program:** Medicaid managed care
**Review state after this check:** `official_page_reviewed` (federal rate-guidance index re-confirmed against the live page; still not a rule-bearing source)

## Observed content (2026-11-02)

Unchanged since the 2026-10-15 snapshot, verified live entry by entry:

- The page still opens with the regulation sentence: states must develop valid
  managed care capitation rates in accordance with generally accepted
  actuarial principles and practices.
- Current guide: still the **2026-2027 Medicaid Managed Care Rate Development
  Guide**, released February 2026, for states setting capitation rates for any
  managed care program subject to federal actuarial soundness requirements
  during rating periods **starting between July 1, 2026 and June 30, 2027**.
  The guide details CMS's expectations for actuarial rate certifications and
  serves as the basis for CMS's review; questions go to the managed-care
  rate-setting mailbox.
- The "View previous years' rate-setting guidance" list is unchanged, same
  15 entries in the same order: 2025-2026; the addendum to 2024-2025;
  2024-2025; 2023-2024; 2022-2023; 2021-2022; 2020-2021; 2019-2020; 2018-2019;
  2017-2018; the 2017 Managed Care Rate Setting Consultation Guide; the
  addendum to the 2016 guide; and the 2016, 2015, and 2014 consultation
  guides. Both addenda are still listed; no addendum is listed for the
  2026-2027 guide.

## What this check did and did not do

This was a live read of the index page only, checked against the 2026-10-15
snapshot entry by entry (current-guide passage, regulation sentence, and the
full previous-years list in order). A text-fetch copy crawled 2026-10-30 was
also read this run and matched the same content; the live read closes the
gap to today. No guide PDF was opened, so no guide's contents, version
details beyond the index listing, or addendum contents are known to this
project. Nothing new was added and nothing was taken away — at least, nothing
this page-level check can see.

## Model use

Federal rate-development guidance context for the actuarial and financial-model
reviewer track: this check re-confirms which rating period the current guide
covers (rating periods starting July 1, 2026 – June 30, 2027) and that the
addendum drawer still holds exactly the two revisions (2024-2025 and 2016).
This page is not a source of Pennsylvania payment rates, BH-MCO contract
rates, or Pennsylvania-specific rules; it is the index of the federal guides,
not the guides themselves. The new Glim workbook scene uses the recheck as a
"nothing moved, and that is the finding" lesson — an unchanged index still
has to be re-read, because a new addendum could appear on it without any
announcement — while repeating the standing discipline: the guides themselves
must be opened before any rate claim is encoded.

## Consumer shipped this run

Glim workbook scene `u5_p2b_rateguide_recheck` in `learning-lab/visual-journey.js`
("Unit V · Statutory Ledgers, Ch 12 · The Index, Re-Read: Eighteen Days Later,
Nothing Moved"): a quiz-panel scene teaching that the 2026-11-02 live re-read
found the same current guide, same rating-period window, same 15-entry lineage
in the same order, and the same two addenda — and that an unchanged page is a
real finding only as strong as the re-read behind it. Wired between
`u5_p2b_rateguide_addendum` and `u5_p2b2_doorway`. Registered as lesson
`rate-guide-recheck` in `learning-lab/lessons.json` with status
`source_review_required` (never `source_verified` — that is the owner's call).

## Status

Official page located and re-reviewed 2026-11-02; no changes observed since
2026-10-15. `review_required_before_encoding` remains true: no rule has been
encoded from this page, and none should be until a specific guide's document
version/effective period, exact passage, and applicability to the modeled
scenario are reviewed.
