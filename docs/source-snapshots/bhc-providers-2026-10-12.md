# Source snapshot — Behavioral HealthChoices for Providers (2026-10-12)

- **Source ID:** pa-dhs-bhc-providers
- **Title:** Behavioral HealthChoices for Providers
- **Issuer:** Pennsylvania Department of Human Services
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers
- **Retrieved:** 2026-10-12 (live fetch this run; 1,175 text lines + images)

## What the page says (page-level verification only — no rules encoded)

**Header framing** — page title "Behavioral HealthChoices" with subhead "Information for Providers".
Provider-context passages (verbatim from the page):

- "Mental health and drug and alcohol services provided via the HealthChoices program differ from the physical health component of the HealthChoices program."
- "For mental health and drug and alcohol services, each county contracts with a Managed Care Organization (MCO)."
- "Each HealthChoices consumer is assigned a Behavioral Health Managed Care Organization (BH-MCO) based on his or her county of residence."
- "Members, then, have a choice of Behavioral Health Care providers within the BH-MCO's network."
- "County Mental Health programs are required to ensure high quality care and timely access to appropriate mental health and drug and alcohol services, and to facilitate effective coordination with other needed services."

**Behavioral Health Eligibles Map by Zone, County, and MCO** — county table with "Lives Covered"
columns; statewide total: **2,717,158 lives covered**. Zones observed on the page:
Lehigh/Capital, North/Central County Option, North/Central State Option, Northeast, Southwest, Southeast.
The map table labels BH-MCOs as CBH, CCBH, MBH, PerformCare, Carelon.

**Flag / do not silently resolve:** the BH-MCO directory
(bhc-mcos, verified 2026-10-12) names the five BH-MCOs as Community Behavioral Health (CBH),
Community Care (CCBH), Magellan, PerformCare, Carelon — while this provider page's map table
uses "MBH" in counties the directory would attribute to Magellan (e.g., Lehigh, Northampton,
Bedford, Cambria, Somerset, Bucks, Montgomery). "MBH" is presumably Magellan Behavioral
Health's regional label, but the page does not state that. Treat as observed, not resolved;
any per-county MCO attribution for modeling must reconcile both pages, not pick one.

**American Society of Addiction Medicine (ASAM)** — fee schedule headed
"Rates Effective January 1, 2026" with levels of care 2.0WM, 2.1, 2.5, 3.1, 3.5, 3.7, 3.7WM
and rate types (per hour, per 15 minutes, per diem) with dollar fees. A dated rate schedule
with a stated effective date — useful as an example of date-stamped rate evidence, but
quoting any single fee into a model requires opening the linked ASAM PDF and checking
applicability (provider type, county, contract), which was NOT done this run.

**HCBS Behavioral Health Gap Payments** — a long PROMISe-ID/provider/payment table
(hundreds of rows: provider name, service location, payment amount). Present on the page;
not summarized here beyond existence.

## Scope limits (unchanged)

Provider-facing overview and directories only. Verifies exact product, provider type,
county, service, and current contract before applying any statement on this page to a case.
`review_required_before_encoding` stays true — nothing here has been promoted to a rule.
