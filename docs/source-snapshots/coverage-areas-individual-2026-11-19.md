# Source snapshot — Coverage Areas for 2026 Individual Market Plans (2026-11-19)

- **Source ID:** pa-insurance-department-2026-individual-coverage-areas
- **Title:** Coverage Areas for 2026 Individual Market Plans
- **Issuer:** Pennsylvania Insurance Department
- **URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings/archived-health-insurance-rate-filings/2026-health-rate-filings/2026-coverage-areas-individual-market
- **Retrieved:** 2026-11-19 (live text fetch this run; page crawled 2026-11-19 22:56 UTC, 125 text lines + 15 map images — same line and image counts as 2026-11-16, 2026-11-13, 2026-11-10, 2026-11-07, 2026-11-04, 2026-11-01, and 2026-10-14). A plain-HTML fetch of the same URL the same run (17:57 EST) was used for the programmatic census count below; it contains the page content twice, and both copies agree exactly.

## What the page says (page-level verification only — no rules encoded)

Substantively UNCHANGED since the 2026-11-16 snapshot — the eighth identical
reading (2026-10-14, 2026-11-01, 2026-11-04, 2026-11-07, 2026-11-10,
2026-11-13, 2026-11-16, 2026-11-19), 36 days: same title, same archived 2026 health-rate-filings
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
Options; UPMC Health Plan. Spot checks agree with 2026-11-16: UPMC Health
Plan still covers only Crawford and Clearfield counties; Keystone Health Plan
East still lists the same five southeastern counties (Bucks, Chester,
Delaware, Montgomery, Philadelphia); Oscar Health Plan of PA still lists 13
counties. The 15 linked map images are the same scene7 files in the same
order (Image 0 ah-coverage-map-indv-mkt through Image 14
upmchp-coverage-map-indv-mkt); all fifteen timestamp query parameters are
identical to the values recorded on 2026-11-16, compared this run for the
first time — so the image check is now same-files-plus-same-timestamps, not
byte-identical (no file hash was taken).

## FULL CENSUS RE-COUNTED (this run, programmatically)

Every issuer's text list was counted again from today's live page by script
against the HTML fetch, and every count agrees exactly with the 2026-11-07
census — no list moved by even one county:

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
network. UPMC Health Options counts **51 for the seventh consecutive check**
(2026-11-01 hand count, 2026-11-04, 2026-11-07, 2026-11-10, 2026-11-13,
2026-11-16, and 2026-11-19 name-by-name enumerations of the same 51 names in
the same alphabetical order). Method note: the HTML fetch carries the page
content twice; the census was run on the first copy and the second copy was
verified identical to it, list by list.

## NEW THIS RUN: MAP IMAGE 14 COUNTED (text-vs-map reconciliation, UPMC Health Plan)

The 2026-11-16 snapshot left thirteen map images uncounted (Images 0-12 and
14). This run counts Image 14 (UPMC Health Plan, upmchp-coverage-map-indv-mkt)
— the smallest map on the page, and the one behind the two-county list the
spot checks keep confirming.

Method (reproducible): the Image 14 file was downloaded from the URL in
today's fetch (1072x592 JPEG) and read three ways. (1) A fill-color scan of
every pixel: 21,839 light-blue fill pixels, falling into exactly two
clusters — a western cluster of 10,395 pixels and a central cluster of 11,444
pixels, with zero fill pixels anywhere else in the image. (2) Disk samples
(radius 15 px) around county-label positions: Crawford 0.96 filled,
Clearfield 0.83 filled (the remainder is the label text itself), control
disks in Erie and Warren 0.00. (3) A direct visual read of the rendered map:
exactly two counties are shaded — Crawford in the northwest and Clearfield in
the center — and every other county is white.

Result: the map shades **2 counties — Crawford and Clearfield — exactly the
two counties the text list names**. Text 2, map 2, overlap 2, text-only 0,
map-only 0. The reconciliation for UPMC Health Plan is an AGREEMENT, the
first agreement in this series: it stands in direct contrast to Image 13
(UPMC Health Options), where the text says 51 and the map shades 39.

One color fact, recorded because the legend gives it a meaning: the fill on
Image 14 is light blue throughout, and a pixel-level check found zero purple
pixels anywhere in the image. Per the page's own legend, light blue means the
plan is newly available for the upcoming 2026 plan year — so the map as drawn
presents both of UPMC Health Plan's counties in the newly-available color,
while Image 13 presented its 39 shaded counties in purple with zero
light-blue pixels. What that difference MEANS is not established by this
check: no cause is claimed for why one issuer's map uses one legend color
and another's uses the other, and the map's vintage relative to the text list
is still unknown. Only the counts and the colors are.

Scope limit, still open: the other thirteen map images (Images 0-12) have NOT
been counted, so the text-vs-map reconciliation is complete for UPMC Health
Plan and UPMC Health Options only. The same method applies to the rest.

## COUNT FLAG, unchanged

Eight identical readings over 36 days prove the page has not moved — they do
not prove it is current. The page still carries no revision date,
last-updated stamp, or document version, so the check date is the version.
The text-vs-map reconciliation the 2026-11-01 flag required is now DONE for
UPMC Health Options (Image 13: text 51 vs map 39, a measured disagreement)
and for UPMC Health Plan (Image 14: text 2 vs map 2, an agreement), and
still open for the other thirteen images. The workbook's standing "52" claim
is contradicted by the text list seven times over and by the Image 13 map
once; Image 14's agreement concerns a different issuer and does not touch
that claim. The correction remains the owner's call.

## Scope limits

Historical market-availability snapshot for plan year 2026 only: a sales footprint
(where a plan could be purchased), not a provider-network directory and not a rate
record. 2026 boundaries must not be read as the current plan year, and no per-clinician
or per-claim fact can be drawn from a coverage map. `review_required_before_encoding`
stays true — nothing here has been promoted to a rule.
