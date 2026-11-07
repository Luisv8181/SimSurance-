# Source snapshot — Coverage Areas for 2026 Individual Market Plans (2026-11-07)

- **Source ID:** pa-insurance-department-2026-individual-coverage-areas
- **Title:** Coverage Areas for 2026 Individual Market Plans
- **Issuer:** Pennsylvania Insurance Department
- **URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings/archived-health-insurance-rate-filings/2026-health-rate-filings/2026-coverage-areas-individual-market
- **Retrieved:** 2026-11-07 (live fetch this run; page crawled 2026-11-07 18:55 UTC, 125 text lines + 15 map images — same line and image counts as 2026-11-04, 2026-11-01, and 2026-10-14)

## What the page says (page-level verification only — no rules encoded)

Substantively UNCHANGED since the 2026-11-04 snapshot: same title, same archived
2026 health-rate-filings path, same two standing disclaimers (the maps show plan
coverage for a past year, are updated annually, and current plan coverage lives on
the ACA Health Rate Filing home page; and the maps apply to purchasing a plan only
— they do NOT show limits on health care coverage or provider network), same
"What is a Coverage Area?" explainer (purple = available 2025 and continuing into
2026; light blue = newly available for 2026), and the same 15 issuer sections in the
same order: Ambetter Health of Pennsylvania; Capital Advantage Assurance Company;
Geisinger Health Plan; Geisinger Quality Options; Health Partners Plans; Highmark,
Inc.; Highmark Benefits Group; Highmark Coverage Advantage; Keystone Health Plan
Central; Keystone Health Plan East; Oscar Health Plan of Pennsylvania; Partners
Insurance Company; QCC Insurance Company; UPMC Health Options; UPMC Health Plan.
Spot checks agree with 2026-11-04: UPMC Health Plan still covers only Crawford and
Clearfield counties; Keystone Health Plan East still lists the same five
southeastern counties (Bucks, Chester, Delaware, Montgomery, Philadelphia); Oscar
Health Plan of PA still lists 13 counties.

## FULL CENSUS: every issuer's text list counted (new this run)

This run counted all fifteen issuers' text lists from today's live page, not just
UPMC Health Options. Counts are of county names in each section's text list:

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

Checks performed on the transcribed lists: no duplicate county name inside any
single list; 13 of the 15 lists are in alphabetical order (the two exceptions are
Capital Advantage and Keystone Health Plan Central, which share the same
non-alphabetical order — because the two lists are identical). Four pairs of
issuers list exactly the same county set: Geisinger Health Plan = Geisinger
Quality Options (44), Capital Advantage Assurance = Keystone Health Plan Central
(21), Health Partners Plans = Partners Insurance Company (9), Keystone Health
Plan East = QCC Insurance Company (5). That is a fact about the page's text
lists only — it is NOT evidence that the paired plans are the same product, the
same filing, or the same network. Footprints range from 2 counties (UPMC Health
Plan) to 51 (UPMC Health Options). UPMC Health Options vs Highmark, Inc. overlap
heavily but differ: UPMC lists 9 counties Highmark does not (Bradford, Carbon,
Clinton, Lackawanna, Luzerne, Lycoming, Sullivan, Tioga, Wyoming) and Highmark
lists 7 UPMC does not (Clearfield, Crawford, Franklin, Fulton, Juniata, Mifflin,
Montour).

## COUNT FLAG, still open

UPMC Health Options counts **51 for the third consecutive check** (2026-11-01 hand
count, 2026-11-04 name-by-name enumeration, 2026-11-07 name-by-name enumeration
of the same 51 names in the same alphabetical order). The text-list count is now
thrice-confirmed. What is still open, unchanged: the linked coverage-map image
(Image 13 on the page) has NOT been counted, so the text-vs-map reconciliation
the 2026-11-01 flag required is still incomplete. The workbook's standing "52"
claim (scene u1_p5e_covmap, lesson coverage-areas-2026-sales-footprint) is
contradicted by three counts of the page's own text list, but this run does NOT
silently correct that scene: the correction, and the map-image check, remain the
owner's call, and the flag stays visible in the new Glim scene (u1_p5e4_covcensus)
and lesson (coverage-areas-full-census).

## Scope limits

Historical market-availability snapshot for plan year 2026 only: a sales footprint
(where a plan could be purchased), not a provider-network directory and not a rate
record. 2026 boundaries must not be read as the current plan year, and no per-clinician
or per-claim fact can be drawn from a coverage map. `review_required_before_encoding`
stays true — nothing here has been promoted to a rule.
