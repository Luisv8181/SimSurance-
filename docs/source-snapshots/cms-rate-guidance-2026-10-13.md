# CMS Medicaid Managed Care Rate Review and Rate Guides — source snapshot

**Checked:** 2026-10-13
**Source record:** `cms-managed-care-rate-guidance` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS)
**URL:** https://www.medicaid.gov/medicaid/managed-care/guidance/rate-review-and-rate-guides
**Jurisdiction:** United States (federal)
**Program:** Medicaid managed care
**Review state after this check:** `official_page_reviewed` (federal rate-guidance index re-confirmed against the live page; still not a rule-bearing source)

## Observed content (2026-10-13)

Unchanged since the 2026-10-11 snapshot (page text read verbatim today):

- The page states that the managed care regulation requires states to develop
  valid managed care capitation rates in accordance with generally accepted
  actuarial principles and practices.
- Current guide: the **2026-2027 Medicaid Managed Care Rate Development Guide**,
  released February 2026, for states setting capitation rates for any managed
  care program subject to federal actuarial soundness requirements during
  rating periods **starting between July 1, 2026 and June 30, 2027**. Per the
  page, the guide details CMS's expectations for information in actuarial rate
  certifications and serves as the basis for CMS's review. Questions are
  directed to CMS's managed-care rate-setting mailbox.
- The page indexes previous years' rate-setting guidance, most recent first:
  2025-2026; the addendum to 2024-2025; 2024-2025; 2023-2024; 2022-2023;
  2021-2022; 2020-2021; 2019-2020; 2018-2019; 2017-2018; the 2017 Managed Care
  Rate Setting Consultation Guide; the addendum to the 2016 guide; and the
  2016, 2015, and 2014 consultation guides.

## Model use

Federal rate-development guidance context for the actuarial and financial-model
reviewer track: this check re-confirms which rating period the current guide
covers (rating periods starting July 1, 2026 – June 30, 2027), answering the
registry scope note's "confirm which rating period ... applies" question for
any future modeled analysis. This page is not a source of Pennsylvania payment
rates, BH-MCO contract rates, or Pennsylvania-specific rules; it is the index
of the federal guides, not the guides themselves. The new Glim workbook scene
uses the index page as a "map to the guides" lesson — the guides themselves
must be opened before any rate claim is encoded.

## Consumer shipped this run

Glim workbook scene `u5_p2b_rateguide` in `learning-lab/visual-journey.js`
("Unit V · Statutory Ledgers, Ch 12 · The Rate Guide: Where Capitation Numbers
Are Born"): a quiz-panel scene teaching that the capitation figure lives in an
actuarial rate certification shaped by CMS's 2026–2027 Rate Development Guide,
with the verbatim federal actuarial-soundness sentence as the citation quote.
Registered as lesson `rate-guide-index` in `learning-lab/lessons.json` with
status `source_review_required` (never `source_verified` — that is the
owner's call).

## Status

Official page located and re-reviewed 2026-10-13; no changes observed since
2026-10-11. `review_required_before_encoding` remains true: no rule has been
encoded from this page, and none should be until a specific guide's document
version/effective period, exact passage, and applicability to the modeled
scenario are reviewed.
