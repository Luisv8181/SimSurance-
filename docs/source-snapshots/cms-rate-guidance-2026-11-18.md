# CMS Medicaid Managed Care Rate Review and Rate Guides — source snapshot

**Checked:** 2026-11-18 (text fetch of the official URL, copy crawled 2026-11-19 02:55 UTC, <1 min before the read; full 42-line read; plus a live-browser rendered read the same day, 02:56-02:57 UTC, and a verbatim re-read 02:58-02:59 UTC; no guide PDFs downloaded, no linked guide opened, no one contacted)
**Source record:** `cms-managed-care-rate-guidance` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS)
**URL:** https://www.medicaid.gov/medicaid/managed-care/guidance/rate-review-and-rate-guides
**Jurisdiction:** United States (federal)
**Program:** Medicaid managed care
**Review state after this check:** `official_page_reviewed` (federal rate-guidance index re-confirmed against a fresh text fetch and two rendered reads; still not a rule-bearing source)

## Observed content (2026-11-18)

Unchanged since the 2026-11-16 snapshot, verified entry by entry against it — eighth consecutive unchanged check (2026-10-15, 2026-11-02, 2026-11-05, 2026-11-08, 2026-11-10, 2026-11-13, 2026-11-16, 2026-11-18; 34-day stability streak):

- The page still opens with the regulation sentence: "The managed care regulation requires that states develop valid managed care capitation rates in accordance with generally accepted actuarial principles and practices."
- Current guide: still the **2026-2027 Medicaid Managed Care Rate Development Guide**, released February 2026, "for states to use when setting capitation rates with respect to any managed care program subject to federal actuarial soundness requirements during rating periods starting between July 1, 2026, and June 30, 2027." The guide provides detail around CMS's expectations for actuarial rate certifications and is used as the basis for CMS's review; questions go to MMCratesetting@cms.hhs.gov.
- The "View previous years' rate-setting guidance" list is unchanged, same 15 entries in the same order: 2025-2026; the addendum to 2024-2025; 2024-2025; 2023-2024; 2022-2023; 2021-2022; 2020-2021; 2019-2020; 2018-2019; 2017-2018; the 2017 Managed Care Rate Setting Consultation Guide; the addendum to the 2016 guide; and the 2016, 2015, and 2014 consultation guides. Both addenda are still listed; still no addendum for the 2026-2027 guide.

## New page-level observation this run

A method finding, not a page change — and the correction matters more than the error. The first live rendered read (02:56 UTC) reported content the 42-line text extract did not show: a second sentence in the opening paragraph ("The managed care rate review process provides an opportunity for CMS to review the rates that states set for their managed care programs to ensure they meet these requirements and are actuarially sound."), a citation to "42 CFR 438.4" in the guide paragraph, a standalone sentence "Rating periods starting between July 1, 2026, and June 30, 2027, must use this guide.", and a reworded contact line ("If you have questions or comments, please contact MMCratesetting@cms.hhs.gov."). None of those four strings appears anywhere in this project's record — a grep of all 145+ snapshots, the docs, the workbook, and the lessons file finds no "438.4", no "rate review process provides", and no "must use this guide" — so the report was flagged rather than recorded.

A verbatim re-read of the same page two minutes later (02:58 UTC), quoting character for character, corrected all four items: the opening paragraph is one sentence only, the regulation sentence; the guide paragraph says "subject to federal actuarial soundness requirements" and names no CFR section; the rating-period window appears inside the first sentence ("during rating periods starting between July 1, 2026, and June 30, 2027"), not as a standalone "must use" sentence; and the contact line is "Please direct any questions related to this guide to MMCratesetting@cms.hhs.gov.", exactly as the text extract has always shown it. The corrected quotes match the 42-line text fetch exactly, sentence for sentence, including the straight-versus-curly apostrophe detail in "CMS' expectations ... CMS' review". The page never changed between the two reads; the first report paraphrased and dressed the paraphrase as quotation.

Discipline that follows: a rendered read is evidence only when it quotes verbatim, and a second independent read is the correction when the first one drifts. The two capture methods agree — but only when the quote is character for character. This is the mirror image of the 2026-11-16 BHC overview finding, where the rendered read exposed a real under-reading by the extraction; here the rendered read invented content the extraction never missed, and the re-read caught it. Both directions are why the check runs on two methods.

The undated-page finding stands: the first rendered read searched the full page, header and footer included, for "Last reviewed" and "updated" and found neither, so the only dates visible remain content dates inside the text itself (February 2026; July 1, 2026 – June 30, 2027; the guide years in the list). The mailbox (MMCratesetting@cms.hhs.gov) remains the only contact channel in the main content; it is recorded as a page fact, not used — no one was contacted.

## What this check did and did not do

This was a page-level read of the index only, checked against the 2026-11-16 snapshot entry by entry (regulation sentence, current-guide passage, and the full previous-years list in order), by a fresh text fetch and two rendered reads minutes apart. No guide PDF was opened, so no guide's contents, version details beyond the index listing, or addendum contents are known to this project. Nothing new was added and nothing was taken away — at least, nothing this page-level check can see. The one thing corrected was the check's own first report, not the page.

## Model use

Federal rate-development guidance context for the actuarial and financial-model reviewer track: this check re-confirms which rating period the current guide covers (rating periods starting July 1, 2026 – June 30, 2027) and that the addendum drawer still holds exactly the two revisions (2024-2025 and 2016). The new Glim workbook scene uses the eighth unchanged re-read as a method lesson — a rendered read that quotes what is not there is worse than one that finds nothing, because a paraphrase in quotation marks looks like evidence; the fix is verbatim quotation plus a second independent read — while repeating the standing discipline: the guides themselves must be opened before any rate claim is encoded.

## Consumer shipped this run

Glim workbook scene `u5_p2b_rateguide_recheck7` in `learning-lab/visual-journey.js` ("Unit V · Statutory Ledgers, Ch 12 · The Eighth Identical Reading — The Render That Quoted What Wasn't There"): a quiz-panel scene teaching that the 2026-11-18 re-read found the same current guide, same rating-period window, same 15-entry lineage in the same order, and the same two addenda — and that the first rendered read's four invented items (a second opening sentence, a 42 CFR 438.4 citation, a "must use this guide" sentence, a reworded contact line) were corrected two minutes later by a verbatim re-read whose quotes match the text extract exactly. Wired between `u5_p2b_rateguide_recheck6` and `u5_p2b2_doorway`. Registered as lesson `rate-guide-recheck7` in `learning-lab/lessons.json` with status `source_review_required` (never `source_verified` — that is the owner's call).

## Status

Official page located and re-reviewed 2026-11-18; no changes observed since 2026-10-15. `review_required_before_encoding` remains true: no rule has been encoded from this page, and none should be until a specific guide's document version/effective period, exact passage, and applicability to the modeled scenario are reviewed.
