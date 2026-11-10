# CMS Medicaid Managed Care Rate Review and Rate Guides — source snapshot

**Checked:** 2026-11-10 (live-browser rendered read of the official URL, 22:55–22:56 UTC; page loaded directly on the first attempt, no access block; no guide PDFs downloaded, no linked guide opened, no one contacted)
**Source record:** `cms-managed-care-rate-guidance` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS)
**URL:** https://www.medicaid.gov/medicaid/managed-care/guidance/rate-review-and-rate-guides
**Jurisdiction:** United States (federal)
**Program:** Medicaid managed care
**Review state after this check:** `official_page_reviewed` (federal rate-guidance index re-confirmed against a fresh rendered read; still not a rule-bearing source)

## Observed content (2026-11-10)

Unchanged since the 2026-11-08 snapshot, verified entry by entry against it — fifth consecutive unchanged check (2026-10-15, 2026-11-02, 2026-11-05, 2026-11-08, 2026-11-10; 26-day stability streak):

- The page still opens with the regulation sentence: "The managed care regulation requires that states develop valid managed care capitation rates in accordance with generally accepted actuarial principles and practices."
- Current guide: still the **2026-2027 Medicaid Managed Care Rate Development Guide**, released February 2026, "for states to use when setting capitation rates with respect to any managed care program subject to federal actuarial soundness requirements during rating periods starting between July 1, 2026, and June 30, 2027." The guide provides detail around CMS's expectations for actuarial rate certifications and is used as the basis for CMS's review; questions go to MMCratesetting@cms.hhs.gov.
- The "View previous years' rate-setting guidance" list is unchanged, same 15 entries in the same order: 2025-2026; the addendum to 2024-2025; 2024-2025; 2023-2024; 2022-2023; 2021-2022; 2020-2021; 2019-2020; 2018-2019; 2017-2018; the 2017 Managed Care Rate Setting Consultation Guide; the addendum to the 2016 guide; and the 2016, 2015, and 2014 consultation guides. Both addenda are still listed; still no addendum for the 2026-2027 guide.

## New page-level observation this run

Method note, not a page change: the plain-text fetch this run returned no copy fresh enough to use (no copy within 30 minutes), so this check rests on the live-browser rendered read instead — the first rate-guidance recheck carried by the rendered page rather than a text crawl. The switch of method bought an independent confirmation of the 2026-11-08 undated-page finding: the rendered read searched the full page text for "Updated", "Last", "Revised", and "Version" and found none anywhere — no revision date, no last-updated stamp, no document version in header, body, or footer. The only dates on the page are February 2026 (guide release) and July 1, 2026 / June 30, 2027 (rating-period window), plus the years in the guide titles. A text extract and a rendered read now agree the page is undated, by two different capture methods. The mailbox (MMCratesetting@cms.hhs.gov) remains the only contact channel printed on the page; it is recorded as a page fact, not used — no one was contacted.

## What this check did and did not do

This was a page-level read of the index only, checked against the 2026-11-08 snapshot entry by entry (regulation sentence, current-guide passage, and the full previous-years list in order). No guide PDF was opened, so no guide's contents, version details beyond the index listing, or addendum contents are known to this project. Nothing new was added and nothing was taken away — at least, nothing this page-level check can see.

## Model use

Federal rate-development guidance context for the actuarial and financial-model reviewer track: this check re-confirms which rating period the current guide covers (rating periods starting July 1, 2026 – June 30, 2027) and that the addendum drawer still holds exactly the two revisions (2024-2025 and 2016). The new Glim workbook scene uses the fifth unchanged re-read as a method lesson — when the cached text copy is stale, the live rendered read carries the check, and a second capture method independently confirms the page is undated — while repeating the standing discipline: the guides themselves must be opened before any rate claim is encoded.

## Consumer shipped this run

Glim workbook scene `u5_p2b_rateguide_recheck4` in `learning-lab/visual-journey.js` ("Unit V · Statutory Ledgers, Ch 12 · The Fifth Identical Reading — A Second Method Confirms the Undated Page"): a quiz-panel scene teaching that the 2026-11-10 re-read found the same current guide, same rating-period window, same 15-entry lineage in the same order, and the same two addenda — and that the check switched methods (live rendered read, after the text fetch had no fresh copy) and the rendered read independently confirms no revision date, last-updated stamp, or document version anywhere on the page. Wired between `u5_p2b_rateguide_recheck3` and `u5_p2b2_doorway`. Registered as lesson `rate-guide-recheck4` in `learning-lab/lessons.json` with status `source_review_required` (never `source_verified` — that is the owner's call).

## Status

Official page located and re-reviewed 2026-11-10; no changes observed since 2026-10-15. `review_required_before_encoding` remains true: no rule has been encoded from this page, and none should be until a specific guide's document version/effective period, exact passage, and applicability to the modeled scenario are reviewed.
