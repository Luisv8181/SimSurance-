# Source snapshot: PA DHS Behavioral HealthChoices Publications index (2026-10-17)

- Source: Pennsylvania Department of Human Services, "Behavioral HealthChoices - Publications"
- URL: https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications
- Fetched: 2026-10-17 (live text fetch, two full page reads; 272-line extract each time)
- Purpose: re-verify source pa-dhs-bhc-publications in docs/sources.registry.json and back a Glim WORKBOOK scene in learning-lab/visual-journey.js.

## What changed since 2026-10-14 (page-level verification only; no rules encoded)

**NEW section not recorded in the 2026-10-14 (or 2026-10-11) snapshot:**
"Mental Health & Behavioral Services for Children in Pennsylvania", stamped
"Last updated: October 2026". It is a service-availability table: rows are
behavioral-health service categories and service names; two columns,
"Behavioral Health Fee-For-Service Funded" and "Behavioral Health Managed
Care Funded", carry X marks where a service can be funded through that
channel. Examples: Crisis Walk-In carries X in both columns; Functional
Family Therapy (FFT) and Parent-Child Interaction Therapy (PCIT) carry X in
the managed-care column only. Several rows carry NO X in either column
(e.g., Administrative Case Management, Student Assistance Program, Drop-In
Center, Medication-Assisted Treatment) — absence of a mark is information.

Page footnotes on the table (verbatim):
- "If a family has Private Insurance the Private Insurance must be utilized first as Medicaid is a payer of last resort."
- "Availability varies by geographic area and funding source. Please check with the BH-MCO if you're a Medicaid enrollee for availability of services within your area."
- Uninsured/under-insured families are routed to the County Mental Health/Intellectual Disability Administrator or the Single County Authority.

Resource links at the section bottom: ATLAS treatment atlas, county SCA/MH-ID contact pages, BH-MCO contacts, the DHS provider directory, and the DDAP resources page.

**MISSING from this run's text extracts:** the "General Publications" section
recorded in the 2026-10-14 snapshot (PSR, ASAM rates effective Jan 1 2026,
2026 FRR, HealthChoices examination guides, TiPS, OMHSAS Member Handbook
2026) did not appear in either 272-line extract this run. Two possibilities:
the vault was rearranged and the section moved/renamed, or the extraction
missed a section. DO NOT conclude the documents were removed. Flagged for
owner confirmation — open the live page and/or documents before drawing a
conclusion.

## What the page states (sections still present, per the extract)

- OMHSAS Publications: MHPAEA/Parity Reports (Final Report; report with Community HealthChoices) and additional reports (recovery-oriented system "A Call for Change", housing/recovery plan, sequential-intercept housing guide, disaster coping guide, strategic plan for cultural competence).
- OMHSAS Resources: 2017 PATH Grant Application; Community Mental Health Services Block Grant FY 2016-2017 and FY 2014-2015.
- NCQA or URAC Certifications: "As per CFR 438.332, the department posts the certificate of accreditation by a Private Independent Entity. The posted certificates reflect the following agencies: the National Committee for Quality Assurance (NCQA) and the Utilization Review Accreditation Commission (URAC)." No per-plan accreditation dates on the index.
- External Quality Review Projects: "The Balanced Budget Act (BBA) of 1997 requires that state agencies contract with an External Quality Review Organization to conduct an annual external quality review of the services provided by contracted Medicaid Managed Care Organizations." Statewide annual technical reports 2015-2023; per-BH-MCO technical reports 2015-2023 for Carelon Behavioral Health, Inc (Formerly Beacon Health Options), Community Behavioral Health (CBH), Community Care Behavioral Health (CCBH), and Magellan Behavioral Health (MGH). Index listing only — none of the linked documents were opened or read this run.

## What the page does NOT establish

- The children's-services table is a funding-availability map, not a covered-benefit schedule and not a rate document. An X is a funding mark, never a promise that a child can get an appointment — the page itself says availability varies and directs Medicaid enrollees to check with the BH-MCO.
- No coverage rule, payment rate, credentialing standard, or contract term. Those live inside the linked documents, which must be opened and read for version/effective date before any claim is encoded.
- "Last updated: October 2026" is the only dateable fact on this index page; the page carries no revision history, so "current" is unknowable and claims carry the check date.

## Registry status

- id: pa-dhs-bhc-publications; status: official_page_reviewed; last_checked: 2026-10-17
- review_required_before_encoding: true (index page only; linked documents not reviewed)
