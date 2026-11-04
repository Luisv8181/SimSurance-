# Source snapshot: CMS School-Based Services Resources
Retrieved 2026-11-04 by the portfolio build rotation (live browser reads of
medicaid.gov; the plain-text fetch returns only an October 8 cached copy,
too old to use, so the page was read live in the browser this run —
page-level check only, no linked documents opened).

## Page reviewed
- URL: https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/medicaid-and-school-based-services/school-based-services-resources
- Title: "CMS School-Based Services Resources | Medicaid"
- Publisher: Centers for Medicare & Medicaid Services (CMS)
- Retrieval: 2026-11-04; two live loads the same day (see LOAD ANOMALY
  below). The confirming reload expanded and read the TAC Resources, CMS
  Guidance, State SBS Examples, Time Study Implementation Plans, and
  Cost-Reports sections.

## Comparison vs 2026-11-01 snapshot
- Substantively UNCHANGED on the confirming reload: same title, same
  introductory text (2023 Comprehensive Guide named as the most notable
  guidance; sample SPAs, TSIPs, Administrative Claiming Plans, and Cost
  Reports provided; TAC contact SchoolBasedServices@cms.hhs.gov), same 7
  TAC resources (including the Readiness Checklist Tool description about
  drafting an SBS SPA, adopting 2023 flexibilities, assessing payment
  methodology compliance, preparing a TSIP or Interagency Agreement, and
  planning with CMS across agencies), same 6 CMS guidance items (2023
  Comprehensive Guide; May 2023 and August 2022 Informational Bulletins;
  2014 SMD Letter #14-006; 2022 HHS resources; NPPES NPI application
  link), same 8 state SPA examples in the same four groupings, same Utah
  TSIP guide, same three cost-report examples (California DHCS, Colorado
  DOE, New Hampshire Medicaid to Schools), and the same non-endorsement
  disclaimer.
- No "Last Updated" or page-revision stamp was visible in the main content
  or footer on either load. The only dates on the page are document years
  in guidance titles and the SPA approval dates.
- State SBS examples confirmed as listed on the confirming reload
  (identical to 2026-11-01):
  - Cost methodology, expanded services beyond IDEA to any Medicaid
    enrolled child: AZ SPA 21-0006 (approved October 25, 2021), CO SPA
    19-0021 (approved February 11, 2020), IL SPA 21-0008 (approved April
    18, 2023), NM SPA 22-0004 (approved May 18, 2023).
  - Cost methodology, IDEA services: UT SPA 21-0009 (approved August 15,
    2022).
  - Cost-based rate methodology, expanded services for any child enrolled
    in Medicaid: OR SPA 19-0011 (approved May 18, 2023).
  - Fee-schedule rate: NV SPA 19-0005 (expanded services, approved October
    24, 2019); WY SPA 22-0001 (IDEA only, approved July 18, 2022).

## LOAD ANOMALY — two live loads, two page versions (recorded, not resolved)
- The first live load on 2026-11-04 (morning) returned a DIFFERENT version
  of the same URL: different intro paragraphs, different TAC resource
  descriptions, a different 6-item guidance list (March 2023, October 2023,
  May 2024, and August 2024 bulletins plus a September 2024 webinar), and
  different SPA numbers/dates (AZ 22-0004 approved October 12, 2022; CO
  22-0029 approved March 30, 2023; IL 23-0003 approved October 2, 2023; NM
  22-0003 approved March 23, 2023; UT 21-0009 approved September 15, 2022;
  OR 21-0005 approved July 25, 2022; NV 19-0005 and WY 22-0001 unchanged).
  It also showed a Utah link-target mismatch (visible "21-0009" vs link
  target ut-21-0019.pdf).
- A fresh reload the same day (late morning) reproduced the 2026-11-01
  values exactly on every item re-checked, and the October 8 cached text
  copy independently matches the 2026-11-01 version item for item.
- Handling: the first load's values are NOT recorded as page content.
  Two independent captures (2026-11-01 snapshot, October 8 cache) plus
  the confirming reload corroborate the 2026-11-01 version; the divergent
  load stands alone. Whether the cause was a CDN/cache variant, a
  rendering variant, or a misread cannot be determined from the page
  alone, and no cause is asserted here. Counts matched in both loads (7
  TAC, 6 guidance, 8 SPAs), which is why counts never settle content.
- Consequence for quoting: any quotation from this page should cite the
  load/version it came from. A single load never settles an index page
  when loads disagree.

## CONFLICT FLAG — Wyoming SPA 22-0001 approval date (still unresolved)
- Wyoming SPA 22-0001 approved July 18, 2022 appears in BOTH 2026-11-04
  loads, in the 2026-11-01 live read, and in the workbook's own earlier
  scene text. The 2026-10-14 snapshot recorded 2022-01-06. The tally is
  now three reads for July 18, 2022 against one snapshot for January 6,
  2022 — but a tally is not a resolution. Per standing discipline, neither
  date is promoted: the Wyoming SPA approval document itself must be
  opened and read before either date is quoted or modeled.

## Minor page-level observations (not changes)
- Utah link-label artifact is LOAD-DEPENDENT, not stable: the confirming
  reload's link target is ut-21-0009.pdf, agreeing with the visible text
  "Utah SPA 21-0009"; the divergent first load showed ut-21-0019.pdf.
  Do not cite the artifact as a stable page property.
- Disclaimer (verbatim, U.S. Government text): "linking to a non-United
  States Government website does not constitute an endorsement by CMS,
  HHS, or any of their employees of the sponsors or the information and/or
  any products presented on the website."

## Limits of this verification
- Page-level verification only: the index page's own claims were read.
  Linked documents (2023 Comprehensive Guide, bulletins, sample SPAs/
  TSIPs, state example links) were NOT opened or read this run.
- No coverage rule, rate, or payment methodology is verified by this page.
  Four distinct state SPA designs sit side by side; one state's approach
  must not be generalized to another.
- review_required_before_encoding remains TRUE.
