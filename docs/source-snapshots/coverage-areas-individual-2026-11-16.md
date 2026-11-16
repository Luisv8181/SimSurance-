# Source snapshot — Coverage Areas for 2026 Individual Market Plans (2026-11-16)

- **Source ID:** pa-insurance-department-2026-individual-coverage-areas
- **Title:** Coverage Areas for 2026 Individual Market Plans
- **Issuer:** Pennsylvania Insurance Department
- **URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings/archived-health-insurance-rate-filings/2026-health-rate-filings/2026-coverage-areas-individual-market
- **Retrieved:** 2026-11-16 (live fetch this run; page crawled 2026-11-16 22:56 UTC, 125 text lines + 15 map images — same line and image counts as 2026-11-13, 2026-11-10, 2026-11-07, 2026-11-04, 2026-11-01, and 2026-10-14)

## What the page says (page-level verification only — no rules encoded)

Substantively UNCHANGED since the 2026-11-13 snapshot — the seventh identical
reading (2026-10-14, 2026-11-01, 2026-11-04, 2026-11-07, 2026-11-10,
2026-11-13, 2026-11-16), 33 days: same title, same archived 2026 health-rate-filings
path, same two standing disclaimers (the maps show plan coverage for a past
year, are updated annually, and current plan coverage lives on the ACA Health
Rate Filing home page; and the maps apply to purchasing a plan only — they do
NOT show limits on health care coverage or provider network), same "What is a
Coverage Area?" explainer (purple = available 2025 and continuing into 2026;
light blue = newly available for 2026), and the same 15 issuer sections in the
same order: Ambetter Health of Pennsylvania; Capital Advantage Assurance
Company; Geisinger Health Plan; Geisinger Quality Options; Health Partners
Plans; Highmark, Inc.; Highmark Benefits Group; Highmark Coverage Advantage;
Keystone Health Plan Central; Keystone Health Plan East; Oscar Health Plan of
Pennsylvania; Partners Insurance Company; QCC Insurance Company; UPMC Health
Options; UPMC Health Plan. Spot checks agree with 2026-11-13: UPMC Health
Plan still covers only Crawford and Clearfield counties; Keystone Health Plan
East still lists the same five southeastern counties (Bucks, Chester,
Delaware, Montgomery, Philadelphia); Oscar Health Plan of PA still lists 13
counties. The 15 linked map images are the same scene7 files in the same
order (Image 0 ah-coverage-map-indv-mkt through Image 14
upmchp-coverage-map-indv-mkt); their timestamp query parameters are recorded
below for the first time, so the next run can compare them instead of
recording them uncompared again.

## FULL CENSUS RE-COUNTED (this run)

Every issuer's text list was counted again from today's live page and every
count agrees exactly with the 2026-11-07 census — no list moved by even one
county:

| Issuer | Counties |
|---|---|
| Ambetter Health of Pennsylvania | 39 |
| Capital Advantage Assurance Company | 21 |
| Geisinger Health Plan | 44 |
| Geisinger Quality Options | 44 |
| Health Partners Plans | 9 |
| Highmark, Inc. | 49 |
| Highmark Benefits Group | 18 |
| Highmark Coverage Advantage | 5 |
| Keystone Health Plan Central | 21 |
| Keystone Health Plan East | 5 |
| Oscar Health Plan of Pennsylvania | 13 |
| Partners Insurance Company | 9 |
| QCC Insurance Company | 5 |
| UPMC Health Options | 51 |
| UPMC Health Plan | 2 |

Total county mentions across all fifteen lists: 335. The four identical
pairs from the 2026-11-07 census still hold (Geisinger Health Plan =
Geisinger Quality Options at 44; Capital Advantage = Keystone Health Plan
Central at 21; Health Partners Plans = Partners Insurance Company at 9;
Keystone Health Plan East = QCC at 5) — a fact about the page's text lists
only, not evidence the paired plans are the same product, filing, or
network. UPMC Health Options counts **51 for the sixth consecutive check**
(2026-11-01 hand count, 2026-11-04, 2026-11-07, 2026-11-10, 2026-11-13,
and 2026-11-16 name-by-name enumerations of the same 51 names in the same
alphabetical order).

## NEW THIS RUN: MAP IMAGE 13 COUNTED (text-vs-map reconciliation, UPMC Health Options)

The 2026-11-01 flag required counting the linked map images before the
text-vs-map reconciliation could be called done. This run counts Image 13
(UPMC Health Options, upmcho-coverage-map-indv-mkt) — the first map image
ever counted, and the one behind the workbook's standing "52" claim.

Method (reproducible): the Image 13 file was downloaded from the URL in
today's fetch (1071x598 JPEG) and every one of Pennsylvania's 67 counties
was classified by sampling a disk of pixels around the county's label
position and scoring the fraction of purple-fill pixels against white-fill
pixels; 64 of 67 counties classified cleanly at fraction 1.00 (shaded) or
0.00 (white). The three borderline disks were resolved by viewing enlarged
crops of the image: Perry (disk straddled the Juniata/Perry border) is
shaded; Adams (disk straddled the Cumberland/Adams border) is white; an
early Susquehanna reading of shaded was a coordinate error (the sample point
fell inside Bradford) and the enlarged crop shows Susquehanna white. A
pixel-level check for the legend's light-blue fill found zero light-blue
pixels anywhere in the image: the map uses purple and white only.

Result: the map shades **39 counties**, and all 39 are inside the text
list. **Twelve text-list counties are white (unshaded) on the map:**
Adams, Berks, Centre, Columbia, Lancaster, Lehigh, Northampton,
Northumberland, Schuylkill, Snyder, Union, York. No county is shaded on
the map but absent from the text list.

So for UPMC Health Options the reconciliation is now a measured
disagreement, not an open question: text list 51, map 39, overlap 39,
text-only 12, map-only 0. The workbook's standing "52" claim (scene
u1_p5e_covmap, lesson coverage-areas-2026-sales-footprint) is now
contradicted by BOTH the page's own artifacts — the text list (51, counted
six times) and the map image (39, counted once) — but this run does NOT
silently correct that scene: the correction remains the owner's call, and
the flag stays visible in the new Glim scene (u1_p5e7_covseventh) and lesson
(coverage-areas-seventh-reading). What the disagreement MEANS is not
established by this check: the map may be an older vintage than the text
list, the twelve counties may be the newly-available-for-2026 additions the
legend describes as light blue but which render white here, or the map may
simply be drawn from a different cut of the data. No cause is claimed;
only the counts are.

Scope limit, still open: the other fourteen map images (Images 0-12 and
14) have NOT been counted, so the text-vs-map reconciliation is complete
for UPMC Health Options only. The same method applies to the rest.

## Map-image URLs with timestamp parameters (recorded 2026-11-16 for future comparison)

- Image 0 ah-coverage-map-indv-mkt?ts=1753968166928
- Image 1 caac-coverage-map-indv-mkt?ts=1753968631897
- Image 2 ghp-coverage-map-indv-mkt?ts=1753969308327
- Image 3 ghp-coverage-map-indv-mkt?ts=1753969621194
- Image 4 hpp-coverage-map-indv-mkt?ts=1753970326899
- Image 5 highmark-coverage-map-indv-mkt?ts=1753970086487
- Image 6 hbg-coverage-map-indv-mkt?ts=1753969802190
- Image 7 hca-coverage-map-indv-mkt?ts=1753969954788
- Image 8 khpc-coverage-map-indv-mkt?ts=1753970443066
- Image 9 khpe-coverage-map-indv-mkt?ts=1753970553457
- Image 10 oscar-coverage-map-indv-mkt?ts=1753970732935
- Image 11 pic-coverage-map-indv-mkt?ts=1753970843976
- Image 12 qcc-coverage-map-indv-mkt?ts=1753971105133
- Image 13 upmcho-coverage-map-indv-mkt?ts=1753971004792
- Image 14 upmchp-coverage-map-indv-mkt?ts=1753971258236

All hosted at https://s7d9.scene7.com/is/image/statepa/ with `&dpr=off`.
All fifteen timestamps fall in the same July 2025 window (1753968166928–
1753971258236).

## COUNT FLAG, partly closed

Seven identical readings over 33 days prove the page has not moved — they do
not prove it is current. The page still carries no revision date,
last-updated stamp, or document version, so the check date is the version.
The text-vs-map reconciliation the 2026-11-01 flag required is now DONE for
UPMC Health Options (Image 13) and still open for the other fourteen images.
The workbook's standing "52" claim is contradicted by the text list six
times over and by the map image once, and the correction remains the owner's
call.

## Scope limits

Historical market-availability snapshot for plan year 2026 only: a sales footprint
(where a plan could be purchased), not a provider-network directory and not a rate
record. 2026 boundaries must not be read as the current plan year, and no per-clinician
or per-claim fact can be drawn from a coverage map. `review_required_before_encoding`
stays true — nothing here has been promoted to a rule.
