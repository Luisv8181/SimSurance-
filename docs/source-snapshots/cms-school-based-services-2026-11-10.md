# Source snapshot: CMS School-Based Services Resources
Retrieved 2026-11-10 by the portfolio build rotation. THREE loads this
run; they do NOT all agree — that disagreement is the finding.

- Load 0: text fetch of the official index URL. The fetch returned a STALE
  cached copy crawled 2026-10-08 04:22 UTC (33 days old), 106 text lines,
  matching the 2026-11-07 snapshot line for line. It is NOT a fresh read
  and is used here only as the baseline variant.
- Load 1: live-browser rendered read, 2026-11-10 06:55-06:58 UTC
  (01:55-01:58 EST). "State SBS Examples" accordion expanded; no linked
  document was opened and no link was followed.
- Load 2: fresh live-browser rendered read, 2026-11-10 06:59-07:02 UTC
  (01:59-02:02 EST), same constraints; Utah link href inspected in the
  element view, not clicked.

## Page reviewed
- URL: https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/medicaid-and-school-based-services/school-based-services-resources
- Title: "CMS School-Based Services Resources | Medicaid"
- Publisher: Centers for Medicare & Medicaid Services (CMS)
- Retrieval: 2026-11-10.

## What all three loads agree on (the stable part)
- The same 8 state SPA examples in the same four groupings, with the same
  approval dates: AZ 21-0006 (October 25, 2021); CO 19-0021 (February 11,
  2020); IL 21-0008 (April 18, 2023); NM 22-0004 (May 18, 2023); UT
  21-0009 (August 15, 2022); OR 19-0011 (May 18, 2023); NV 19-0005
  (October 24, 2019); WY 22-0001 (July 18, 2022). Wyoming still July 18,
  2022, consistent with the approval package read on 2026-11-06.
- The Utah TSIP guide (Utah School-Based Medicaid Time Study
  Implementation Guide) and the same three cost-report examples
  (California DHCS, Colorado Dept. of Education, New Hampshire DHHS).
- The non-endorsement disclaimer, present at the bottom on every load.
- No "Last Updated" or page-revision stamp on any load; text searches for
  "Last Updated" and "Updated" return no matches, including the footer.
  The only dates on the page are document years and SPA approval dates.
  The check date remains the version.

## SECOND DIVERGENT LIVE VARIANT (Load 1)
- Load 1 shows a different page version from Loads 0 and 2: its intro
  opens "In 2023, CMS published extensive guidance on School-Based
  Services (SBS). The most notable of these is the 2023 Comprehensive
  Guide to Medicaid Services and Administrative Claiming..." and its CMS
  Guidance list runs 2023 Comprehensive Guide; State Medicaid Director
  Letter #23-005; State Health Official Letter #23-002; State Health
  Official Letter #22-002; Frequently Asked Questions on Medicaid
  School-Based Services; Medicaid School-Based Services Medicaid.gov
  Page. Its TAC list carries eight renamed items (e.g. "SBS
  Implementation Readiness Checklist", "Understanding Cost Pools for
  Medicaid School-Based Services").
- Load 2, four minutes later, agrees with the cached copy: its intro opens
  "We have also issued school-based services (SBS) guidance..." and its
  guidance list is the familiar May 2023 and August 2022 Informational
  Bulletins (Free Care), 2014 SMD Letter #14-006, plus three further items
  reported with different titles than the cached copy's — "Medicaid and
  the State Children's Health Insurance Program (CHIP): School-Based
  Health Services: A Guide for School Administrators", "Medicaid
  School-Based Services Resource Guide", and "Medicaid Coverage of
  Services Provided by School-Based Services (SBS) Providers" — and the
  2023 Comprehensive Guide does not appear in Load 2's guidance list.
- Status: Load 1 is the SECOND divergent live variant this index has
  produced (the first was the 2026-11-04 first load). Its values are NOT
  recorded as page content. The guidance section and intro are
  load-variant; only the SPA examples, TSIP guide, cost reports,
  disclaimer, and absence of a last-updated stamp are stable across
  loads. Cause (CDN/cache variant vs page update mid-flight) remains
  undetermined from the page alone.

## TAC COUNT RESOLVED: 7 BULLETS, 8 LINKED TITLES
- Load 2 reports the nuance the text fetch hides: the TAC list holds 8
  linked titles but 7 description bullets — "Medicaid SBS 101 Quick
  Guide" and "Medicaid SBS Resources" sit in the same bullet and share
  one description. The 2026-11-07 snapshot's "7 TAC resources" was a
  bullet count; the live render counts 8 linked titles. This is a
  counting-rule artifact, not a page change, and the snapshot count is
  corrected here with its history preserved.

## UTAH LINK-TARGET MISMATCH — PRESENT ON THE THIRD CONSECUTIVE LIVE LOAD
- Load 1 and Load 2 both report: the link text reads "Utah SPA 21-0009"
  but its href is
  https://www.medicaid.gov/medicaid/spa/downloads/UT-21-0019.pdf, and
  the link's own description reads "UT-21-0019".
- History of this check: mismatch present on the 2026-11-04 first load;
  absent on the 2026-11-04 confirming reload and on 2026-11-06; present
  on 2026-11-07, present on both 2026-11-10 live loads. Tally is now 3
  present / 2 absent across five observations — present on the last three
  live loads in a row. It is still not called a stable artifact, because
  two loads showed the target agreeing with the label, but the streak
  matters: the mismatch is the standing observation, the agreement the
  exception.
- Neither the 0009 nor the 0019 file was opened this run, so no claim is
  made about which file is the correct Utah SPA document, and the link
  must not be followed by its label alone. Resolving which file is
  authoritative is the owner's call (or a future run that opens both
  PDFs).

## NEW IN-LOAD FLICKER: UTAH APPROVAL DATE
- On Load 2, the first auto view immediately after expanding the state
  examples accordion showed Utah as "(approved October 14, 2021)"; three
  subsequent text/auto reads in the same load consistently showed
  "(approved August 15, 2022)".
- Status: a single in-load flicker against five steady reads of August 15,
  2022 (cached copy, Load 1, Load 2 final reads). Flagged, not promoted.
  The October 14, 2021 date is NOT recorded as page content.

## Limits of this verification
- Page-level verification of the index only. The 2023 Comprehensive Guide,
  bulletins, the eight state SPA documents, TSIPs, and cost reports were
  NOT opened or read this run (the Wyoming package was opened and read on
  2026-11-06 and is not re-opened here).
- No coverage rule, rate, or payment methodology is verified beyond the
  index page's own text. Four distinct state SPA designs sit side by side;
  one state's approach must not be generalized to another.
- review_required_before_encoding remains TRUE.
