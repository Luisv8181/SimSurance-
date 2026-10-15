# PA DHS Physical HealthChoices MCOs — source snapshot

**Checked:** 2026-10-15
**Source record:** `pa-dhs-physical-hc-mco` in `docs/sources.registry.json`
**Publisher:** Pennsylvania Department of Human Services (DHS)
**URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/hc/hc-mco
**Program:** Medicaid physical HealthChoices, Pennsylvania
**Review state after this check:** `official_page_reviewed` (page directory re-confirmed against the live page; not a rule-bearing source)

## Observed content (2026-10-15)

Content substantively unchanged since the 2026-10-12 check. The live page lists
physical HealthChoices managed care organizations by region, with member services
phone numbers and Enhanced Member Supports Unit (formerly Special Needs Unit)
numbers per plan. Region tables (plan labels and phone numbers per region):

- Lehigh/Capital (Adams, Berks, Cumberland, Dauphin, Franklin, Fulton,
  Huntingdon, Lancaster, Lebanon, Lehigh, Northampton, Perry, York):
  AmeriHealth Caritas Pennsylvania, Geisinger Health Plan, Jefferson Health
  Plans EverWell, Highmark Wholecare, UPMC for You, Inc.
- Northeast (Bradford, Carbon, Centre, Clinton, Columbia, Juniata, Lackawanna,
  Luzerne, Lycoming, Mifflin, Monroe, Montour, Northumberland, Pike,
  Schuylkill, Snyder, Sullivan, Susquehanna, Tioga, Union, Wayne, Wyoming):
  AmeriHealth Caritas Northeast, Geisinger Health Plan, Jefferson Health Plans
  EverWell, UPMC for You, Inc.
- Northwest (Cameron, Clarion, Clearfield, Crawford, Elk, Erie, Forest,
  Jefferson, McKean, Mercer, Potter, Venango, Warren): AmeriHealth Caritas
  Pennsylvania, Geisinger Health Plan, Jefferson Health Plans EverWell,
  UPMC for You, Inc.
- Southeast (Bucks, Chester, Delaware, Montgomery, Philadelphia):
  Geisinger Health Plan, Jefferson Health Plans EverWell, Keystone First,
  UPMC for You, Inc., United Healthcare Community Plan.
- Southwest (Allegheny, Armstrong, Beaver, Bedford, Blair, Butler, Cambria,
  Fayette, Greene, Indiana, Lawrence, Somerset, Washington, Westmoreland):
  Amerihealth Caritas, Geisinger Health Plan, Jefferson Health Plans EverWell,
  Highmark Wholecare, UPMC for You, Inc.

Footprint observation (page-level, from reading all five tables this run): only
three plan labels — Geisinger Health Plan, Jefferson Health Plans EverWell, and
UPMC for You, Inc. — appear in all five region tables. The rest are region-scoped:
Keystone First and United Healthcare Community Plan appear only under Southeast;
Highmark Wholecare appears only under Lehigh/Capital and Southwest; the
AmeriHealth Caritas row label varies by region (Pennsylvania / Northeast / bare
"Amerihealth Caritas") with no cross-region rows. The page does not say whether
the regional AmeriHealth Caritas labels are one entity or separate entities —
do not infer.

Verbatim page wording (region header): "Southeast Counties in the
HealthChoices Program: Bucks, Chester, Delaware, Montgomery, Philadelphia".

The region map image on the page is not machine-readable in a text fetch;
the county lists above come from the page text, which is authoritative over
the map. Minor page typos ("Northast Counties" header, unmatched paren in the
Southwest Enhanced Member Supports Unit header) are cosmetic and unchanged.

## Model use

Plan directory for the Pennsylvania physical HealthChoices program. Use only as
a dated plan directory; do not treat plan listing as evidence of a plan's
county availability at a given member address, benefit design, or contracted
provider network. Keep physical-health MCOs distinct from Behavioral
HealthChoices BH-MCOs (see `pa-dhs-bhc-mcos`). A modeled member's plan choice
set is region-scoped: never assign a plan that does not appear in the member's
region table.

## Status

Official page located, read, and re-verified 2026-10-15 (no content change
since 2026-10-12). `review_required_before_encoding` remains true: no rule has
been encoded from this page, and none should be until the underlying contract
documents' version/effective period, exact passage, and applicability are
reviewed. Region-to-county assignment is page-level directory verification only.

**Consumer shipped this run:** Learning Lab WORKBOOK scene `u1_p4_phys2_menu`
("The Region Is the Menu — Plan Options Are Region-Scoped") in
`learning-lab/visual-journey.js`, registered as lesson `physical-plan-region-menu`
in `learning-lab/lessons.json` with status `source_review_required`. The
2026-10-12 consumer (scene `u1_p4_phys`, lesson `two-plan-families`) covers the
two-families distinction; the new scene covers the region-scoped choice set.
