# Source snapshot — Behavioral HealthChoices for Providers (2026-10-14)

- **Source ID:** pa-dhs-bhc-providers
- **Title:** Behavioral HealthChoices: Information for Providers
- **Issuer:** Pennsylvania Department of Human Services
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers
- **Retrieved:** 2026-10-14 (live fetch this run; page reports 1,175 text lines + images)

## What the page says (page-level verification only — no rules encoded)

Re-verified live 2026-10-14. Structurally identical to the 2026-10-12 check: provider-facing
overview framing unchanged ("each county contracts with a Managed Care Organization (MCO)";
"Each HealthChoices consumer is assigned a Behavioral Health Managed Care Organization
(BH-MCO) based on his or her county of residence"; county programs "required to ensure high
quality care and timely access").

**Behavioral Health Eligibles Map by Zone, County, and MCO** — statewide total still
**2,717,158 lives covered**; six zones (Lehigh/Capital, North/Central County Option,
North/Central State Option, Northeast, Southwest, Southeast); same BH-MCO labels as 10-12.
The MBH/Magellan label discrepancy flagged on 2026-10-12 stands unresolved: the map table
uses "MBH" (Lehigh, Northampton, Bedford, Cambria, Somerset, Bucks, Montgomery counties)
while the bhc-mcos directory names those counties' BH-MCO as Magellan. Observed, not
resolved — reconcile before use.

**American Society of Addiction Medicine (ASAM) fee schedule** — headed
"Rates Effective January 1, 2026" with a "download ASAM PDF" link. Levels of care
2.0WM, 2.1, 2.5, 3.1, 3.5, 3.7, 3.7WM; rate types per hour, per 15 minutes, per diem;
dollar fees present on the page. Observed fees this run: 2.0WM per hour $106.35;
2.1 per 15 minutes $11.57; 2.5 per 15 minutes $10.74; 3.1 per diem $160.13;
3.5 per diem $260.65; 3.7 per diem $321.78; 3.7WM per diem $415.24.
The 10-12 snapshot recorded the heading and unit types but not the individual fees, so
fee-by-fee comparison to 10-12 is not possible; structure and heading match. The linked
ASAM PDF itself was NOT opened this run — applicability (provider type, county, contract)
is still unchecked.

**HCBS Behavioral Health Gap Payments** — long PROMISe-ID/provider/payment table present
(as on 10-12); not summarized beyond existence.

## Scope limits (unchanged)

Provider-facing overview and directories only. A dated fee schedule is rate evidence with
an effective date — it is not a payment rule. Quoting any fee into a model requires
opening the linked ASAM PDF and checking applicability (provider type, county, contract),
which was NOT done this run. Provider acceptance, per-case benefits, and per-case payment
are not established by this page. `review_required_before_encoding` stays true —
nothing here has been promoted to a rule.
