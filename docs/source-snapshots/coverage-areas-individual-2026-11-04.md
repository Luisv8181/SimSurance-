# Source snapshot — Coverage Areas for 2026 Individual Market Plans (2026-11-04)

- **Source ID:** pa-insurance-department-2026-individual-coverage-areas
- **Title:** Coverage Areas for 2026 Individual Market Plans
- **Issuer:** Pennsylvania Insurance Department
- **URL:** https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings/archived-health-insurance-rate-filings/2026-health-rate-filings/2026-coverage-areas-individual-market
- **Retrieved:** 2026-11-04 (live fetch this run; page crawled 2026-11-04 22:56 UTC, 125 text lines + 15 map images — same line and image counts as 2026-11-01 and 2026-10-14)

## What the page says (page-level verification only — no rules encoded)

Substantively UNCHANGED since the 2026-11-01 snapshot: same title, same archived
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
Spot checks agree with 2026-11-01: UPMC Health Plan still covers only Crawford and
Clearfield counties; Keystone Health Plan East still lists the same five
southeastern counties (Bucks, Chester, Delaware, Montgomery, Philadelphia); Oscar
Health Plan of PA still lists 13 counties.

## COUNT FLAG, narrowed but NOT closed

This run enumerated the live UPMC Health Options text list name by name instead of
hand-counting it: Adams, Allegheny, Armstrong, Beaver, Bedford, Berks, Blair,
Bradford, Butler, Cambria, Cameron, Carbon, Centre, Clarion, Clinton, Columbia,
Cumberland, Dauphin, Elk, Erie, Fayette, Forest, Greene, Huntingdon, Indiana,
Jefferson, Lackawanna, Lancaster, Lawrence, Lebanon, Lehigh, Luzerne, Lycoming,
McKean, Mercer, Northampton, Northumberland, Perry, Potter, Schuylkill, Snyder,
Somerset, Sullivan, Tioga, Union, Venango, Warren, Washington, Westmoreland,
Wyoming, York — **51 names, 51 unique, in alphabetical order, no duplicates**.
That agrees exactly with the 2026-11-01 hand count of 51, so the TEXT-LIST count
is now confirmed twice.

What is still open: the linked coverage-map image (Image 13 on the page) has NOT
been counted, so the text-vs-map reconciliation the 2026-11-01 flag required is
still incomplete. The workbook's standing "52" claim (scene u1_p5e_covmap, lesson
coverage-areas-2026-sales-footprint) is now contradicted by two counts of the
page's own text list, but this run does NOT silently correct that scene: the
correction, and the map-image check, remain the owner's call, and the flag stays
visible in the new Glim scene (u1_p5e3_covrecount) and lesson
(coverage-areas-recount-51).

## Scope limits

Historical market-availability snapshot for plan year 2026 only: a sales footprint
(where a plan could be purchased), not a provider-network directory and not a rate
record. 2026 boundaries must not be read as the current plan year, and no per-clinician
or per-claim fact can be drawn from a coverage map. `review_required_before_encoding`
stays true — nothing here has been promoted to a rule.
