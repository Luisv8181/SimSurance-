# Medicaid.gov Eligibility Policy overview — source snapshot (re-verification)

**Checked:** 2026-11-06 (two independent reads this run: text fetch of the
official URL, copy crawled 2026-11-07 02:55 UTC, <1 min before the read; plus
a live browser read of the same URL at 02:56–02:57 UTC)
**Source record:** `cms-medicaid-eligibility-policy` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS), U.S. federal government
**URL:** https://www.medicaid.gov/medicaid/eligibility-policy
**Program:** Medicaid eligibility (federal policy overview)
**Review state after this check:** `official_page_reviewed` (overview page verified
live; not a rule-bearing source)
**Prior snapshot compared:** `docs/source-snapshots/medicaid-eligibility-policy-2026-11-04.md`

## Verdict: both 2026-11-04 flagged discrepancies resolved as extraction
## differences; one new suspension (the 5% disregard sentence)

Two independent reads of the same page, taken minutes apart by two different
methods, agree on every item below. That agreement is what settles the
2026-11-04 flags: the page did not change between November 4 and November 6;
the November 4 browser read dropped text.

## Resolved: the spenddown state count is back, verbatim

Both reads find, word for word (public-domain U.S. federal government text,
copied exactly as read today):

> "Thirty-six states and the District of Columbia use spenddown programs,
> either as medically needy programs or as 209(b) states."

The 2026-11-02 quote is confirmed as current page text again. The suspension
recorded 2026-11-04 is LIFTED: the count is quotable, dated 2026-11-06, from
two agreeing reads. The November 4 absence was an extraction difference in
that day's browser read, not a page edit.

## Resolved: retroactivity wording is the 2026-11-02 form

Both reads find:

> "Benefits also may be covered retroactively for up to three months prior
> to the month of application, if the individual would have been eligible
> during that period had he or she applied."

The 2026-11-04 variant ("Medicaid coverage may start retroactively for up
to 3 months before the month of application") was the extraction's
paraphrase, not an edit. The rule (three months, conditional on eligibility
during the period) is unchanged in every read.

## Resolved: the MAGI disregards half-sentence is back in full

Both reads find:

> "The MAGI-based methodology does not allow for income disregards that
> vary by state or by eligibility group and does not allow for an asset or
> resource test."

The 2026-11-02 half-sentence, not re-surfaced 2026-11-04, is confirmed as
current page text.

## NEW SUSPENSION: the 5% disregard / 138% FPL sentence

The 2026-11-04 snapshot (and the 2026-11-04 workbook scene built from it)
quoted a five percent MAGI income disregard "in effect making the income
limit 138% of the FPL for most adults." No such sentence appears in either
of today's reads — not in the 122-line text fetch (searched for "five
percent", "5 percent", "138%"), and not in the live browser read of the
visible page. The 2026-11-02 text fetch never had it either.

Score: one read claims it (2026-11-04 browser read), three reads cannot
find it (2026-11-02 text fetch, 2026-11-06 text fetch, 2026-11-06 live
browser read). Per house discipline it is now SUSPENDED, exactly as the
spenddown count was on 2026-11-04: quoted 2026-11-04 only, quoted as
current by nobody, until a second independent read finds it again. It is
NOT declared removed from the page — a sentence can live in a section a
render does not surface — but no workbook scene or lesson may quote it as
current until corroborated.

What this does NOT touch: the ACA expansion option is still on the page in
plain text ("states were given the option to extend eligibility to adults
with income at or below 133% of the FPL"; "Most states have chosen to
expand coverage to adults, and those that have not yet expanded may choose
to do so at any time"), and the no-asset-test rule is still there. Only the
"138% via 5% disregard" formulation is suspended.

## Other items re-confirmed today (both reads)

- Combined-coverage figure still "over 77.9 million Americans" (Medicaid
  and CHIP together), still carrying no date stamp; the page still shows no
  last-updated or publication date anywhere in its visible text (confirmed
  by the live browser read as well as the text fetch).
- Mandatory-groups sentence intact verbatim: "To participate in Medicaid,
  federal law requires states to cover certain groups of individuals."
- MAGI still the income-counting method (one set of income rules, a single
  application across Medicaid, CHIP, and the marketplace); SSI-methodology
  exemptions for blindness, disability, age 65+; residency and citizenship
  rules; coverage generally stops at the end of the month eligibility ends;
  fair hearings still required when a claim is denied or not acted upon
  with reasonable promptness.
- The CIB appendix on HHS Appeals Entity coordination for assessment states
  is still present (three scenarios each for assessment vs determination
  treatment) — now confirmed across the 2026-11-02, 2026-11-04, and
  2026-11-06 reads.

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
- Method lesson, sharpened by this run: a single reader can drop a sentence
  AND surface a sentence no other reader finds, in the same sitting. The
  November 4 browser read did both — it lost the spenddown count and the
  retroactivity wording while gaining the 5% disregard sentence. Only a
  second reader, using a different method, catches either failure. Two
  agreeing reads settle a flag; one read never does.
- Correction note for the record: the 2026-11-04 workbook scene
  `u5_p2b3_gate_recheck2` ("The Gate, Third Reading") states the 5%
  disregard / 138% formulation as confirmed. That scene is shipped history
  and is not edited retroactively; the correction lives here, in the
  2026-11-06 scene `u5_p2b3_gate_recheck3`, and in the registry scope note.
