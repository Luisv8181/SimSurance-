# Source snapshot: CMS School-Based Services Resources
Retrieved 2026-11-07 by the portfolio build rotation. TWO independent loads
this run, and they agree on every content item checked:
- Load 1: text fetch of the official index URL, copy crawled 2026-11-07
  22:55 UTC, less than a minute before the read (106 text lines).
- Load 2: live-browser rendered read, 22:56-22:58 UTC, "State SBS Examples"
  accordion expanded; no linked document was opened.

## Page reviewed
- URL: https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/medicaid-and-school-based-services/school-based-services-resources
- Title: "CMS School-Based Services Resources | Medicaid"
- Publisher: Centers for Medicare & Medicaid Services (CMS)
- Retrieval: 2026-11-07.

## Comparison vs 2026-11-06 snapshot
- Substantively UNCHANGED: same title, same introductory text (2023
  Comprehensive Guide named as the most notable guidance; sample SPAs,
  TSIPs, Administrative Claiming Plans, and Cost Reports provided; TAC
  contact SchoolBasedServices@cms.hhs.gov), same 7 TAC resources (SBS 101
  Quick Guide with its "Medicaid SBS Resources" link under the description;
  Readiness Checklist Tool; Understanding Cost Pools; How to Answer RMTS;
  Federal Documentation Requirements for LEAs; Reimbursement for
  Specialized Transportation; Considerations for Developing a TSIP), same 6
  CMS guidance items (2023 Comprehensive Guide; May 2023 and August 2022
  Informational Bulletins; 2014 SMD Letter #14-006; 2022 HHS resources;
  NPPES NPI application link), same 8 state SPA examples in the same four
  groupings (AZ 21-0006 approved October 25, 2021; CO 19-0021 approved
  February 11, 2020; IL 21-0008 approved April 18, 2023; NM 22-0004
  approved May 18, 2023; UT 21-0009 approved August 15, 2022; OR 19-0011
  approved May 18, 2023; NV 19-0005 approved October 24, 2019; WY 22-0001
  approved July 18, 2022), same Utah TSIP guide, same three cost-report
  examples (California DHCS, Colorado Dept. of Education, New Hampshire
  DHHS), and the same non-endorsement disclaimer.
- No "Last Updated" or page-revision stamp was visible on either load; the
  live-browser load searched the full page including the footer for
  "Updated" with no match. The only dates on the page are document years
  in guidance titles and the SPA approval dates.
- Wyoming SPA 22-0001 still listed as approved July 18, 2022, consistent
  with the approval package read on 2026-11-06 (approved July 18, 2022,
  effective July 1, 2022). No new conflict.

## LOAD ANOMALY (2026-11-04) — TESTED THIS RUN, DOES NOT REPRODUCE
- On 2026-11-04 two live loads returned different page versions: the first
  load showed different SPA numbers/dates (e.g. AZ 22-0004, CO 22-0029,
  IL 23-0003, NM 22-0003, UT Sep 15 2022, OR 21-0005) and a different
  guidance list (Mar/Oct 2023, May/Aug 2024 bulletins, Sep 2024 webinar).
- This run took TWO independent loads (text fetch + live browser, minutes
  apart) and they agree exactly on every SPA number and date, every
  guidance item, and every resource count. The divergent version has now
  failed to reproduce on every confirming load since November 4 (Nov 4
  confirming reload, Nov 6, and both Nov 7 loads).
- Status: the November 4 divergent load stands as a single unreproduced
  event; its cause (CDN/cache variant vs misread) remains undetermined
  from the page alone. The divergent values are still NOT recorded as
  page content. No further load is needed to close this: two agreeing
  independent loads in one run is the test the 2026-11-06 snapshot left
  open, and it is now taken.

## UTAH LINK-TARGET MISMATCH — REAPPEARS ON THE LIVE-BROWSER LOAD
- Load 2 (live browser) reports: the link text reads "Utah SPA 21-0009"
  but its href is https://www.medicaid.gov/medicaid/spa/downloads/UT-21-0019.pdf
  — it points to ut-21-0019.pdf, NOT ut-21-0009.pdf — and the link's own
  description in the page also reads "UT-21-0019".
- History of this check: mismatch present on the 2026-11-04 first load;
  target agreed with visible text (ut-21-0009.pdf) on the 2026-11-04
  confirming reload and on the 2026-11-06 load; mismatch present again on
  today's live-browser load. (Load 1, the text fetch, does not expose
  hrefs, so it cannot confirm or deny the target.)
- Status: LOAD-DEPENDENT, not a stable artifact — it appears on some loads
  and not others, twice each way across four observations. Neither the
  0009 nor the 0019 file was opened this run, so no claim is made about
  which file is the correct Utah SPA document, and the link must not be
  followed by its label alone. The workbook records the mismatch and its
  load history; resolving which file is authoritative is the owner's call
  (or a future run that opens both PDFs).

## Limits of this verification
- Page-level verification of the index only. The 2023 Comprehensive Guide,
  bulletins, the eight state SPA documents, TSIPs, and cost reports were
  NOT opened or read this run (the Wyoming package was opened and read on
  2026-11-06 and is not re-opened here).
- No coverage rule, rate, or payment methodology is verified beyond the
  index page's own text. Four distinct state SPA designs sit side by side;
  one state's approach must not be generalized to another.
- review_required_before_encoding remains TRUE.
