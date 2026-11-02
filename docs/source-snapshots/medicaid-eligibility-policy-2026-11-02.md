# Medicaid.gov Eligibility Policy overview — source snapshot (re-verification)

**Checked:** 2026-11-02
**Source record:** `cms-medicaid-eligibility-policy` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS), U.S. federal government
**URL:** https://www.medicaid.gov/medicaid/eligibility-policy
**Program:** Medicaid eligibility (federal policy overview)
**Review state after this check:** `official_page_reviewed` (overview page verified
live; not a rule-bearing source)
**Prior snapshot compared:** `docs/source-snapshots/medicaid-eligibility-policy-2026-10-15.md`

## How this page was reached

The canonical URL https://www.medicaid.gov/medicaid/eligibility-policy was read
live via text fetch this run (crawled 2026-11-02). The old
`https://www.medicaid.gov/medicaid/eligibility` URL still 404s per the 2026-10-15
snapshot; it was not re-probed this run and is not cited anywhere in the new
consumer. No sidebar or subpage links were followed, no forms filled.

## Verdict: substantively unchanged since 2026-10-15

Every sentence quoted in the 2026-10-15 snapshot is still present verbatim in
today's full-page read, and every section-level fact from that snapshot still
holds:

- The combined-coverage figure is still "over 77.9 million Americans"
  (Medicaid and CHIP together), still carrying no date stamp.
- Mandatory groups, state option groups, the ACA 133% FPL expansion option
  ("Most states have chosen to expand coverage to adults, and those that have
  not yet expanded may choose to do so at any time"), MAGI counting, the
  blindness/disability/age-65+ SSI-methodology exemptions, 209(b) states,
  residency and citizenship/qualified-non-citizen rules, application-date
  coverage with up-to-3-months retroactivity, coverage "generally stops at
  the end of the month in which a person no longer meets the requirements
  for eligibility," the medically-needy spenddown ("Thirty-six states and
  the District of Columbia use spenddown programs"), and fair-hearing
  appeals are all still present as summarized on 2026-10-15.
- Still no "last updated" or publication date displayed anywhere in the
  visible page text — date discipline unchanged: this snapshot is the date
  evidence.

Verbatim sentences from the page (public-domain U.S. federal government text,
copied exactly as written; the MAGI sentence is the citation quote carried
into the new workbook scene):

> "To participate in Medicaid, federal law requires states to cover certain
> groups of individuals."

> "The MAGI-based methodology does not allow for income disregards that vary
> by state or by eligibility group and does not allow for an asset or
> resource test."

> "Benefits also may be covered retroactively for up to three months prior
> to the month of application, if the individual would have been eligible
> during that period had he or she applied."

> "Thirty-six states and the District of Columbia use spenddown programs,
> either as medically needy programs or as 209(b) states."

## One detail today's full read surfaces that the 2026-10-15 snapshot did not quote

The Appeals section carries a full Informational Bulletin appendix (CIB:
Coordination Between HHS Appeals Entity and Medicaid and CHIP Agencies —
Assessment States), with three scenarios each for states treating HHS Appeals
Entity decisions as assessments of eligibility and as final determinations
of eligibility. The 2026-10-15 snapshot summarized appeals as the fair-hearing
requirement and delegation options only; it did not quote or describe the
CIB appendix.

This is recorded as an evidence gap, NOT as a page change: a snapshot that
summarizes one part of a section is not proof the section held nothing else.
Until a full-page capture from 2026-10-15 is diffed against today's full
text, the CIB appendix is quoted only as today's read, never as a dated
change — the same discipline applied to the 2026-11-01 managed-care
re-verification, where an under-quoted initiatives paragraph was likewise
not claimed as a change. The appendix is coordination guidance for
assessment states, not an eligibility rule, and nothing in it is encoded.

## What this page CANNOT establish (unchanged)

- Any specific state's eligibility groups, income limits, or expansion status
  (rules are state-administered; the page explicitly says rules vary by state).
- Effective dates or publication date of the page itself (none displayed).
- Whether "77.9 million" is current, dated, or point-in-time (no date on the
  figure; it is stated for Medicaid and CHIP combined).
- Full legal text of any cited authority — the page names authorities but is
  an overview, not the regulation.
- Any appeals-delegation rule for a specific state: the CIB appendix
  describes assessment-state coordination flows in general terms only.

## Forensic notes

- Page-level verification only; no rules encoded
  (`review_required_before_encoding` stays true).
- The 2026-10-15 snapshot's URL-rot note stands: never cite a federal URL
  without a live check; the canonical page remains
  `/medicaid/eligibility-policy`.
