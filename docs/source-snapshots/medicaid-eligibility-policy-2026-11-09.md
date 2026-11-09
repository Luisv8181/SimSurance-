# Medicaid.gov Eligibility Policy overview — source snapshot (re-verification)

**Checked:** 2026-11-09 (two independent reads this run: text fetch of the
official URL, copy crawled 2026-11-09 18:55 UTC, <1 min before the read; plus
a live browser read of the same URL, completed 19:04 UTC, after an initial
Akamai Access Denied block cleared by moving to a fresh browser)
**Source record:** `cms-medicaid-eligibility-policy` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS), U.S. federal government
**URL:** https://www.medicaid.gov/medicaid/eligibility-policy
**Program:** Medicaid eligibility (federal policy overview)
**Review state after this check:** `official_page_reviewed` (overview page verified
live; not a rule-bearing source)
**Prior snapshot compared:** `docs/source-snapshots/medicaid-eligibility-policy-2026-11-06.md`

## Verdict: UNCHANGED — fifth straight agreeing read; the 5% disregard
## suspension now stands five reads to one

Two independent reads of the same page, taken minutes apart by two different
methods, agree on every item below. The page matches the 2026-11-06 snapshot
exactly on all re-checked items: no movement, no new wording, no removed
section.

## Re-confirmed today (both reads)

- Combined-coverage figure still "over 77.9 million Americans" (Medicaid
  and CHIP together), still carrying no date stamp; the page still shows no
  last-updated or publication date anywhere in its visible text (confirmed
  by the live browser read as well as the text fetch — searches for "Last
  updated", "202", "2024", "2025" returned no matches; the only "Updated"
  hit is a Related Resources link title, "Updated Fact Sheet: Health
  Coverage Options for Afghan Evacuees", which is not a date for this page).
- Mandatory-groups sentence intact verbatim: "To participate in Medicaid,
  federal law requires states to cover certain groups of individuals."
- ACA expansion option intact: children to at least 133% of the FPL in every
  state; states given the option to extend eligibility to adults with income
  at or below 133% of the FPL; "Most states have chosen to expand coverage
  to adults, and those that have not yet expanded may choose to do so at
  any time."
- MAGI still the income-counting method (one set of income rules, a single
  application across Medicaid, CHIP, and the marketplace); the no-varying-
  disregards half-sentence intact in full: "The MAGI-based methodology does
  not allow for income disregards that vary by state or by eligibility group
  and does not allow for an asset or resource test." SSI-methodology
  exemptions for blindness, disability, age 65+; residency and citizenship
  rules; coverage generally stops at the end of the month eligibility ends;
  fair hearings still required when a claim is denied or not acted upon
  with reasonable promptness.
- Spenddown count intact verbatim: "Thirty-six states and the District of
  Columbia use spenddown programs, either as medically needy programs or as
  209(b) states."
- Retroactivity intact in the 2026-11-02 form: "Benefits also may be covered
  retroactively for up to three months prior to the month of application, if
  the individual would have been eligible during that period had he or she
  applied."
- The CIB appendix on HHS Appeals Entity coordination for assessment states
  is still present (three scenarios each for assessment vs determination
  treatment) — confirmed across the 2026-11-02, 2026-11-04, 2026-11-06, and
  2026-11-09 reads.

## The 5% disregard / 138% FPL sentence: suspension holds, now five to one

The 2026-11-04 snapshot (and the 2026-11-04 workbook scene built from it)
quoted a five percent MAGI income disregard "in effect making the income
limit 138% of the FPL for most adults." No such sentence appears in either
of today's reads — not in the 122-line text fetch (searched for "five
percent", "5 percent", "138%"), and not in the live browser read of the
visible page (searched for "five percent", "5 percent", "138%", "138", and
"percent": the word "percent" does not occur at all; percentages appear only
as "%", and the only FPL percentage on the page is 133%; the only
"disregard" hit is the MAGI sentence quoted above, which mentions no 5%
disregard).

Score: one read claims it (2026-11-04 browser read), five reads cannot find
it (2026-11-02 text fetch, 2026-11-06 text fetch, 2026-11-06 live browser
read, 2026-11-09 text fetch, 2026-11-09 live browser read). The suspension
recorded 2026-11-06 stands unchanged: quoted 2026-11-04 only, quoted as
current by nobody, until a second independent read finds it again. It is
NOT declared removed from the page — a sentence can live in a section a
render does not surface — but no workbook scene or lesson may quote it as
current until corroborated. The 2026-11-04 scene `u5_p2b3_gate_recheck2`
states it as confirmed; that scene is shipped history and is not edited
retroactively.

What this does NOT touch: the ACA expansion option is still on the page in
plain text ("states were given the option to extend eligibility to adults
with income at or below 133% of the FPL"), and the no-asset-test rule is
still there. Only the "138% via 5% disregard" formulation is suspended.

## What this page CANNOT establish (unchanged)

- Any specific state's eligibility groups, income limits, or expansion status
  (rules are state-administered; the page explicitly says rules vary by state).
- Effective dates or publication date of the page itself (none displayed).
- Whether "77.9 million" is current, dated, or point-in-time (no date on the
  figure; it is stated for Medicaid and CHIP combined).
- Full legal text of any cited authority — the page names authorities but is
  an overview, not the regulation.
- Any appeals-delegation rule for a specific state: the CIB appendix is
  coordination guidance for assessment states in general terms, never a rule.
- The MAGI 5% disregard / 138% FPL formulation as of today (see suspension
  above).

## Forensic notes

- Page-level verification only; no rules encoded
  (`review_required_before_encoding` stays true).
- The 2026-10-15 snapshot's URL-rot note stands: never cite a federal URL
  without a live check; the canonical page remains
  `/medicaid/eligibility-policy`.
- Access note: the live browser read first hit an Akamai/EdgeSuite "Access
  Denied" block (Reference #18.4d593a17.1794250599.c847562; a reload returned
  the same block with a new reference). The block cleared by moving to a
  fresh browser, and the live page then loaded. Same pattern as the
  2026-11-04 check (Access Denied cleared on environment replacement):
  medicaid.gov intermittently blocks this browser's first attempt, and a
  fresh environment is the working recovery. A blocked first attempt is
  evidence of nothing about the page.
- Method lesson, unchanged: a single reader can drop a sentence AND surface
  a sentence no other reader finds, in the same sitting. Two agreeing reads
  settle a flag; one read never does. Today's pair is the third consecutive
  two-reader agreement on this page (2026-11-06, 2026-11-09), and the
  suspension now rests on five reads to one.
