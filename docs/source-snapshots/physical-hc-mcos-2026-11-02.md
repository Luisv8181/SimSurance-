# PA DHS Physical HealthChoices MCOs — source snapshot

**Checked:** 2026-11-02
**Source record:** `pa-dhs-physical-hc-mco` in `docs/sources.registry.json`
**Publisher:** Pennsylvania Department of Human Services (DHS)
**URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/hc/hc-mco
**Program:** Medicaid physical HealthChoices, Pennsylvania
**Review state after this check:** `official_page_reviewed` (page directory re-confirmed against the live page; not a rule-bearing source)

## Observed content (2026-11-02)

Content substantively UNCHANGED since the 2026-10-15 check (18 days earlier).
Today's fetch is the full page (94 lines, copy crawled 2026-11-02 23:02 UTC,
under a minute before the read). Every region table, county list, and plan
label in the 2026-10-15 snapshot is still present in the same order and
wording:

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

County recount (hand-counted from today's fetch): 13 (Lehigh/Capital) + 22
(Northeast) + 13 (Northwest) + 5 (Southeast) + 14 (Southwest) = 67 counties,
each appearing exactly once — the same total as the 2026-10-15 reading.
Footprint observation stands: only Geisinger Health Plan, Jefferson Health
Plans EverWell, and UPMC for You appear in all five region tables; Keystone
First and United Healthcare Community Plan are Southeast-only; Highmark
Wholecare is Lehigh/Capital + Southwest only; the AmeriHealth Caritas row
label varies by region (Pennsylvania / Northeast / bare "Amerihealth
Caritas"). The page still does not say whether the regional AmeriHealth
Caritas labels are one entity or separate entities — do not infer.

Persisting cosmetic defects, unchanged since 2026-10-15, read as evidence
the page was not re-edited between checks: the Northeast header still reads
"Northast Counties"; the Southwest Enhanced Member Supports Unit header
still carries the unmatched closing parenthesis ("formerly Special Needs
Unit)"); the Southwest row still spells "UPMC for you, Inc." with a
lowercase "y". Within today's fetch, the three statewide plans repeat
identical member-services and Enhanced Member Supports Unit numbers in all
five tables (e.g. Geisinger 855-227-1302 / 855-214-8100; UPMC for You
800-286-4242 / 866-463-1462).

Verbatim page wording (Northeast region header, typo retained):
"Northast Counties in the HealthChoices Program: Bradford, Carbon, Centre,
Clinton, Columbia, Juniata, Lackawanna, Luzerne, Lycoming, Mifflin, Monroe,
Montour, Northumberland, Pike, Schuylkill, Snyder, Sullivan, Susquehanna,
Tioga, Union, Wayne, Wyoming".

Honesty note: the 2026-10-15 snapshot enumerated plan labels and county
lists but did not record phone numbers, so today's phone numbers are
recorded here for the first time and cannot be diffed against 2026-10-15
at the number level. The unchanged finding covers labels, county lists,
order, and the cosmetic defects above. The region map image is not
machine-readable in a text fetch; the county lists above come from the page
text, which is authoritative over the map.

## Model use

Plan directory for the Pennsylvania physical HealthChoices program. Use only
as a dated plan directory; do not treat plan listing as evidence of a plan's
county availability at a given member address, benefit design, or contracted
provider network. Keep physical-health MCOs distinct from Behavioral
HealthChoices BH-MCOs (see `pa-dhs-bhc-mcos`). A modeled member's plan choice
set is region-scoped: never assign a plan that does not appear in the
member's region table.

## Status

Official page located, read, and re-verified 2026-11-02 (no content change
since 2026-10-15). `review_required_before_encoding` remains true: no rule
has been encoded from this page, and none should be until the underlying
contract documents' version/effective period, exact passage, and
applicability are reviewed. Region-to-county assignment is page-level
directory verification only.

**Consumer shipped this run:** Learning Lab WORKBOOK scene
`u1_p4_phys3_typos` ("The Typos That Didn't Move — A Directory, Re-Read
Eighteen Days Later") in `learning-lab/visual-journey.js`, registered as
lesson `physical-directory-recheck-typos` in `learning-lab/lessons.json`
with status `source_review_required`. Earlier consumers: scene `u1_p4_phys`
(lesson `two-plan-families`, 2026-10-12) covers the two-families
distinction; scene `u1_p4_phys2_menu` (lesson `physical-plan-region-menu`,
2026-10-15) covers the region-scoped choice set.
