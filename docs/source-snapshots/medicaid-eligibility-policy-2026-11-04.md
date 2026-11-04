# Medicaid.gov Eligibility Policy overview — source snapshot (re-verification)

**Checked:** 2026-11-04 (live browser read, about 1:57–1:58 PM EST)
**Source record:** `cms-medicaid-eligibility-policy` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS), U.S. federal government
**URL:** https://www.medicaid.gov/medicaid/eligibility-policy
**Program:** Medicaid eligibility (federal policy overview)
**Review state after this check:** `official_page_reviewed` (overview page verified
live; not a rule-bearing source)
**Prior snapshot compared:** `docs/source-snapshots/medicaid-eligibility-policy-2026-11-02.md`

## How this page was reached

The canonical URL https://www.medicaid.gov/medicaid/eligibility-policy was read
live in the browser this run. The first load returned only an "Access Denied"
block (reference #18.3b593a17.1793818563.188b283e, and a second reference on
reload); after a browser-environment replacement the same verified URL loaded
successfully and its full visible text was read. No forms were filled and no
subpages were clicked through. The block is recorded as an access anomaly only:
it says nothing about page content, and the successful load is the evidence
for everything below.

## Verdict: substantively unchanged on every re-checked item, with two flagged
## discrepancies that are NOT claimed as page changes

Confirmed still present, in the wording quoted below (public-domain U.S.
federal government text, copied exactly as read today):

- The combined-coverage figure is still "over 77.9 million Americans"
  (Medicaid and CHIP together), still carrying no date stamp, and the page
  still shows no last-updated or publication date anywhere in its visible
  text (the only "Updated" hit is a related-resource title, "Updated
  Application for Health Coverage & Help Paying Costs (August 2023)").
- Mandatory groups, state option groups, and the ACA 133% FPL expansion
  option are unchanged, including: "Most states have chosen to expand
  coverage to adults, and those that have not yet expanded may choose to do
  so at any time."
- The mandatory-groups sentence is intact verbatim:

> "To participate in Medicaid, federal law requires states to cover certain
> groups of individuals."

- MAGI is still the income-counting method (one set of income rules, a single
  application across Medicaid, CHIP, and the marketplace), still with a five
  percent income disregard "in effect making the income limit 138% of the FPL
  for most adults," and still with no asset or resource test for MAGI-based
  methods: "MAGI-based methods do not use an asset or resource test."
- Retroactive coverage is still up to three months, and coverage still
  generally stops at the end of the month eligibility ends:

> "Medicaid coverage may start retroactively for up to 3 months before the
> month of application, if the individual would have been eligible during
> the retroactive period. Coverage generally stops at the end of the month
> in which a person no longer meets the requirements for eligibility."

- Fair hearings are still required when a claim is denied or not acted upon
  with reasonable promptness, before an impartial hearing officer, with an
  opportunity to appeal the hearing decision.

## Flagged discrepancy 1: the spenddown state count is absent from today's read

The 2026-11-02 snapshot quoted: "Thirty-six states and the District of
Columbia use spenddown programs, either as medically needy programs or as
209(b) states." Today's read of the medically-needy section states only that
"States have the option to establish" such a program, describes the spenddown
mechanism (incurring medical expenses above the state's medically-needy
income standard), and gives NO state count anywhere in that section.

This is NOT recorded as a confirmed page change. The two reads used different
extraction methods (text fetch on 2026-11-02, live browser read today), so
the absence could be an extraction difference rather than a removed
sentence. Until a second independent read corroborates the absence, the
36-states-plus-DC count is carried forward as "quoted 2026-11-02, not
re-surfaced 2026-11-04" — it is NOT quoted as current in the new workbook
scene, and no new count is asserted.

## Flagged discrepancy 2: two sentences reworded or not re-surfaced

- Retroactivity: the 2026-11-02 snapshot quoted "Benefits also may be
  covered retroactively for up to three months prior to the month of
  application, if the individual would have been eligible during that period
  had he or she applied." Today's wording is the "Medicaid coverage may start
  retroactively for up to 3 months before the month of application" sentence
  quoted above. The rule (three months, conditional on eligibility during the
  period) is the same; the sentence form differs. Recorded as a wording
  difference between reads, not as a confirmed edit, for the same
  extraction-method reason.
- MAGI disregards: the 2026-11-02 snapshot quoted "The MAGI-based
  methodology does not allow for income disregards that vary by state or by
  eligibility group and does not allow for an asset or resource test."
  Today's read re-verified the no-asset-test half ("MAGI-based methods do
  not use an asset or resource test") and the five-percent disregard, but did
  not re-surface the "does not allow for income disregards that vary by
  state" half. That half is therefore "quoted 2026-11-02, not re-surfaced
  2026-11-04," not promoted and not contradicted.

## What this page CANNOT establish (unchanged)

- Any specific state's eligibility groups, income limits, or expansion status
  (rules are state-administered; the page explicitly says rules vary by state).
- Effective dates or publication date of the page itself (none displayed).
- Whether "77.9 million" is current, dated, or point-in-time (no date on the
  figure; it is stated for Medicaid and CHIP combined).
- Full legal text of any cited authority — the page names authorities but is
  an overview, not the regulation.
- Any appeals-delegation rule for a specific state: the CIB appendix on HHS
  Appeals Entity coordination for assessment states, noted as an evidence gap
  on 2026-11-02, was not re-examined in detail today and remains quoted only
  as the 2026-11-02 read, never as a rule.
- Any medically-needy state count as of today (see flagged discrepancy 1).

## Forensic notes

- Page-level verification only; no rules encoded
  (`review_required_before_encoding` stays true).
- The 2026-10-15 snapshot's URL-rot note stands: never cite a federal URL
  without a live check; the canonical page remains
  `/medicaid/eligibility-policy`.
- Discipline carried forward from the 2026-11-04 school-based-services run:
  when two reads of one page disagree, corroboration settles and a single
  uncorroborated read never does — which is why both discrepancies above are
  flagged, not promoted into change claims or into Glim's dialogue.
