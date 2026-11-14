# PA DHS Physical HealthChoices MCOs — source snapshot

**Checked:** 2026-11-14
**Source record:** `pa-dhs-physical-hc-mco` in `docs/sources.registry.json`
**Publisher:** Pennsylvania Department of Human Services (DHS)
**URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/hc/hc-mco
**Program:** Medicaid physical HealthChoices, Pennsylvania
**Review state after this check:** `official_page_reviewed` (page directory re-confirmed against the live page; not a rule-bearing source)

## Observed content (2026-11-14)

Content substantively UNCHANGED since the 2026-11-11 check (3 days earlier).
Today's fetch is the full page (94 lines, copy crawled 2026-11-14 15:55 UTC,
under a minute before the read). Every region table, county list, plan
label, and phone number in the 2026-11-11 snapshot is still present in the
same order and wording:

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
each appearing exactly once — the same total as the 2026-11-11, 2026-11-08,
2026-11-05, 2026-11-02, and 2026-10-15 readings.

FOURTH PHONE-NUMBER DIFF, ALL AGREE. The 2026-11-05 check was the first
phone-number diff (against the first recording on 2026-11-02); 2026-11-08
was the second; 2026-11-11 the third; today is the fourth, and every
member-services and Enhanced Member Supports Unit number agrees again
across all five region tables:

- AmeriHealth Caritas Pennsylvania: 888-991-7200 / 800-684-5503 (Lehigh/Capital and Northwest)
- AmeriHealth Caritas Northeast: 855-809-9200 / 888-498-0766
- Amerihealth Caritas (Southwest row label): 888-991-7200 / 800-684-5503
- Geisinger Health Plan: 855-227-1302 / 855-214-8100 (identical in all five tables)
- Jefferson Health Plans EverWell: 800-553-0784 / 866-500-4571 (identical in all five tables)
- Highmark Wholecare: 800-392-1147 / 800-642-3550 (Lehigh/Capital and Southwest)
- UPMC for You, Inc.: 800-286-4242 / 866-463-1462 (identical in all five tables)
- Keystone First: 800-521-6860 / 800-573-4100 (Southeast only)
- United Healthcare Community Plan: 800-414-9025 / 877-844-8844 (Southeast only)

The three statewide plans (Geisinger, Jefferson EverWell, UPMC for You)
repeat identical numbers in all five tables, as in every prior check.

TTY PUNCTUATION WOBBLE, CHECKED A THIRD TIME — STILL UNMOVED. The
2026-11-05 snapshot recorded the wobble for the first time; 2026-11-08 was
the first recheck where the punctuation itself was diffable, 2026-11-11 the
second, and today is the third. The same three rows drop the colon after
TTY in the same places — Northeast Jefferson ("TTY 877-454-8477",
"TTY 215-849-1579"), Northeast UPMC ("TTY 800-361-2629"), and Southwest
UPMC ("TTY 800-361-2629") — while every other row carries "TTY:" as before.
The wobble is now three-times-confirmed as stable, which continues to read
as an extraction-level quirk of the page's rendering, not a page edit; the
numbers themselves agree everywhere.

Persisting cosmetic defects, unchanged since 2026-10-15, still read as
evidence the page was not re-edited between checks: the Northeast header
still reads "Northast Counties"; the Southwest Enhanced Member Supports Unit
header still carries the unmatched closing parenthesis ("formerly Special
Needs Unit)"); the Southwest row still spells "UPMC for you, Inc." with a
lowercase "y".

Verbatim page wording (Northeast region header):
"Northast Counties in the HealthChoices Program: Bradford, Carbon, Centre,
Clinton, Columbia, Juniata, Lackawanna, Luzerne, Lycoming, Mifflin, Monroe,
Montour, Northumberland, Pike, Schuylkill, Snyder, Sullivan, Susquehanna,
Tioga, Union, Wayne, Wyoming".

## Model use

Plan directory for the Pennsylvania physical HealthChoices program. Use only
as a dated plan directory; do not treat plan listing as evidence of a plan's
county availability at a given member address, benefit design, or contracted
provider network. Keep physical-health MCOs distinct from Behavioral
HealthChoices BH-MCOs (see `pa-dhs-bhc-mcos`). A modeled member's plan choice
set is region-scoped: never assign a plan that does not appear in the
member's region table. A phone number that has survived a dated recheck is
usable as a dated directory fact; a number never rechecked is a guess with a
dial tone.

## Status

Official page located, read, and re-verified 2026-11-14 (no content change
since 2026-11-11; sixth identical check after 2026-10-15, 30-day streak).
`review_required_before_encoding` remains true: no rule has been encoded
from this page, and none should be until the underlying contract documents'
version/effective period, exact passage, and applicability are reviewed.
Region-to-county assignment is page-level directory verification only.

**Consumer shipped this run:** Learning Lab WORKBOOK scene
`u1_p4_phys7_phones4` ("The Fourth Diff: A Directory's Phone Lines,
Checked a Fourth Time — and the Wobble That Stayed Put Three Times") in
`learning-lab/visual-journey.js`, registered as lesson
`physical-directory-phones-diff4` in `learning-lab/lessons.json` with
status `source_review_required`. Earlier consumers: scene
`u1_p4_phys6_phones3` (lesson `physical-directory-phones-diff3`, 2026-11-11)
covers the third phone-number diff; scene `u1_p4_phys5_phones2` (lesson
`physical-directory-phones-diff2`, 2026-11-08) covers the second
phone-number diff; scene `u1_p4_phys4_phones` (lesson
`physical-directory-phones-diff`, 2026-11-05) covers the first phone-number
diff; scene `u1_p4_phys3_typos` (lesson
`physical-directory-recheck-typos`, 2026-11-02) covers the persisting-typos
recheck; scene `u1_p4_phys2_menu` (lesson `physical-plan-region-menu`,
2026-10-15) covers the region-scoped choice set; scene `u1_p4_phys`
(lesson `two-plan-families`, 2026-10-12) covers the two-families
distinction.
