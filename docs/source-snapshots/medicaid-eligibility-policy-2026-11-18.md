# Medicaid.gov Eligibility Policy overview — source snapshot (re-verification)

**Checked:** 2026-11-18 (text fetch of the official URL, copy crawled
2026-11-18 06:55 UTC, <1 min before the read)
**Source record:** `cms-medicaid-eligibility-policy` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS), U.S. federal government
**URL:** https://www.medicaid.gov/medicaid/eligibility-policy
**Program:** Medicaid eligibility (federal policy overview)
**Review state after this check:** `official_page_reviewed` (overview page verified
live; not a rule-bearing source)
**Prior snapshot compared:** `docs/source-snapshots/medicaid-eligibility-policy-2026-11-15.md`

## Verdict: UNCHANGED — eighth straight agreeing read; the 5% disregard
## suspension now stands ten reads to one

One text fetch of the same page, taken three days after the 2026-11-15
two-reader check, matches the 2026-11-15 snapshot exactly on all
re-checked items: same 122-line text, same section order, no movement,
no new wording, no removed section. This is the eighth straight agreeing
read (2026-10-15, 2026-11-02, 2026-11-04, 2026-11-06, 2026-11-09,
2026-11-12, 2026-11-15, 2026-11-18).

## Re-confirmed today

- Combined-coverage figure still "over 77.9 million Americans" (Medicaid
  and CHIP together), still carrying no date stamp; the page still shows no
  last-updated or publication date anywhere in its visible text.
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
  treatment) — confirmed across the 2026-11-02, 2026-11-04, 2026-11-06,
  2026-11-09, 2026-11-12, 2026-11-15, and 2026-11-18 reads.

## The 5% disregard / 138% FPL sentence: suspension holds, now ten to one

The 2026-11-04 snapshot (and the 2026-11-04 workbook scene built from it)
quoted a five percent MAGI income disregard "in effect making the income
limit 138% of the FPL for most adults." No such sentence appears in today's
read — a find for "138" returns zero matches in the 122-line text, and the
only FPL percentage on the page is 133%, twice. The only "five" on the page
remains "the five-year period preceding their Medicaid application" (the
asset-transfer look-back).

Score: one read claims it (2026-11-04 browser read), ten reads cannot find
it (2026-11-02 text fetch, 2026-11-06 text fetch, 2026-11-06 live browser
read, 2026-11-09 text fetch, 2026-11-09 live browser read, 2026-11-12 text
fetch, 2026-11-12 live browser read, 2026-11-15 text fetch, 2026-11-15 live
browser read, 2026-11-18 text fetch — eleven reads total, ten against).
The suspension recorded 2026-11-06 stands unchanged: quoted 2026-11-04
only, quoted as current by nobody, until a second independent read finds it
again. It is NOT declared removed from the page — a sentence can live in a
section a render does not surface — but no workbook scene or lesson may
quote it as current until corroborated. The 2026-11-04 scene
`u5_p2b3_gate_recheck2` states it as confirmed; that scene is shipped
history and is not edited retroactively.

What this does NOT touch: the ACA expansion option is still on the page in
plain text ("states were given the option to extend eligibility to adults
with income at or below 133% of the FPL"), and the no-asset-test rule is
still there. Only the "138% via 5% disregard" formulation is suspended.

## NEW page-level angle shipped as consumer: the fair hearing the law promises

The Appeals section, re-confirmed verbatim today, has not had a dedicated
workbook scene until now. Its core sentence: "States must provide
individuals the opportunity to request a fair hearing regarding a denial,
an action taken by the state agency that he or she believes was erroneous,
or if the state has not acted with reasonable promptness." Three triggers,
all on the page: a denial, an action the person believes was erroneous,
and the state not acting with reasonable promptness. The page also records
how a state may run the hearing: by the Medicaid agency itself, delegated
to the Exchange or Exchange Appeals Entity (for appeals of denials of
eligibility for individuals whose income is determined based on MAGI), or
delegated to another state agency if the state obtains approval from CMS
under the Intergovernmental Cooperation Act of 1968. What the page does NOT
give: any deadline for requesting a hearing, any "reasonable promptness"
timeframe, any hearing procedure, or any state's actual appeals process —
those live in state rules, not on this overview page. Consumer shipped
2026-11-18: WORKBOOK scene `u5_p2b3_gate_recheck7` ("The Gate, Eighth
Reading: The Hearing the Law Promises"), lesson
`medicaid-eligibility-gate-recheck7`, status `source_review_required`.

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
- Any fair-hearing deadline, promptness timeframe, or hearing procedure
  (none on this page).

## Forensic notes

- Page-level verification only; no rules encoded
  (`review_required_before_encoding` stays true).
- The 2026-10-15 snapshot's URL-rot note stands: never cite a federal URL
  without the retrieval date; the check date remains the version for this
  undated page.
- Single-reader check this run (text fetch only); the 2026-11-15 two-reader
  agreement is the last two-reader confirmation. A second independent read
  was not taken because the text fetch matched the 2026-11-15 snapshot
  exactly and the find for "138" returned zero matches; the suspension's
  ten-to-one count is therefore ten reads, one of them today's.
