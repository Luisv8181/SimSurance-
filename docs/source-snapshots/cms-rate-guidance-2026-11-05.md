# CMS Medicaid Managed Care Rate Review and Rate Guides — source snapshot

**Checked:** 2026-11-05 (text fetch of the official URL; copy crawled 2026-11-05 04:54 UTC, ~2 hours before the read; no sign-in, no guide PDFs downloaded)
**Source record:** `cms-managed-care-rate-guidance` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS)
**URL:** https://www.medicaid.gov/medicaid/managed-care/guidance/rate-review-and-rate-guides
**Jurisdiction:** United States (federal)
**Program:** Medicaid managed care
**Review state after this check:** `official_page_reviewed` (federal rate-guidance index re-confirmed against a fresh copy; still not a rule-bearing source)

## Observed content (2026-11-05)

Unchanged since the 2026-11-02 snapshot, verified entry by entry against it — third consecutive unchanged check (2026-10-15, 2026-11-02, 2026-11-05; 21-day stability streak):

- The page still opens with the regulation sentence: "The managed care regulation requires that states develop valid managed care capitation rates in accordance with generally accepted actuarial principles and practices."
- Current guide: still the **2026-2027 Medicaid Managed Care Rate Development Guide**, released February 2026, "for states to use when setting capitation rates with respect to any managed care program subject to federal actuarial soundness requirements during rating periods starting between July 1, 2026, and June 30, 2027." The guide provides detail around CMS's expectations for actuarial rate certifications and is used as the basis for CMS's review; questions go to MMCratesetting@cms.hhs.gov.
- The "View previous years' rate-setting guidance" list is unchanged, same 15 entries in the same order: 2025-2026; the addendum to 2024-2025; 2024-2025; 2023-2024; 2022-2023; 2021-2022; 2020-2021; 2019-2020; 2018-2019; 2017-2018; the 2017 Managed Care Rate Setting Consultation Guide; the addendum to the 2016 guide; and the 2016, 2015, and 2014 consultation guides. Both addenda are still listed; still no addendum for the 2026-2027 guide.

## New page-level observation this run

The rating-period window is a switch, not a label. The guide applies to rating periods **starting between July 1, 2026, and June 30, 2027** — so the start date of a rating period decides which guide governs its rates: a period starting June 30, 2026 falls under the 2025-2026 guide, one starting July 1, 2026 under the 2026-2027 guide. A one-day difference at the boundary changes the governing document. That is why the workbook scene shipped this run teaches the boundary date, not just the edition name. The mailbox (MMCratesetting@cms.hhs.gov) is the only contact channel printed on the page; it is recorded as a page fact, not used — no one was contacted.

## What this check did and did not do

This was a page-level read of the index only, checked against the 2026-11-02 snapshot entry by entry (regulation sentence, current-guide passage, and the full previous-years list in order). The text-fetch copy was crawled 2026-11-05 04:54 UTC, fresh enough to close the gap to today without a live-browser load. No guide PDF was opened, so no guide's contents, version details beyond the index listing, or addendum contents are known to this project. Nothing new was added and nothing was taken away — at least, nothing this page-level check can see.

## Model use

Federal rate-development guidance context for the actuarial and financial-model reviewer track: this check re-confirms which rating period the current guide covers (rating periods starting July 1, 2026 – June 30, 2027) and that the addendum drawer still holds exactly the two revisions (2024-2025 and 2016). The new Glim workbook scene uses the third unchanged re-read as a "the window decides the guide" lesson — the start date of a rating period is the switch between guide editions — while repeating the standing discipline: the guides themselves must be opened before any rate claim is encoded.

## Consumer shipped this run

Glim workbook scene `u5_p2b_rateguide_recheck2` in `learning-lab/visual-journey.js` ("Unit V · Statutory Ledgers, Ch 12 · The Window Decides the Guide: Three Reads, Same Index, One Boundary Date"): a quiz-panel scene teaching that the 2026-11-05 re-read found the same current guide, same rating-period window, same 15-entry lineage in the same order, and the same two addenda — and that the July 1, 2026 boundary date is what decides which guide governs a given rating period. Wired between `u5_p2b_rateguide_recheck` and `u5_p2b2_doorway`. Registered as lesson `rate-guide-recheck2` in `learning-lab/lessons.json` with status `source_review_required` (never `source_verified` — that is the owner's call).

## Status

Official page located and re-reviewed 2026-11-05; no changes observed since 2026-10-15. `review_required_before_encoding` remains true: no rule has been encoded from this page, and none should be until a specific guide's document version/effective period, exact passage, and applicability to the modeled scenario are reviewed.
