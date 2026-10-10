# Source register

This register is the starting point for primary-source research. Each source must be checked for current status and applicability before its content is encoded as a rule.

| Source family | What to extract | Notes |
|---|---|---|
| [Medicaid.gov](https://www.medicaid.gov/) | Medicaid program basics, state plan, waivers, managed care, covered authorities | Federal overview; applicability depends on specific authority and state implementation. |
| [CMS managed-care rate guidance](https://www.medicaid.gov/medicaid/managed-care/guidance/rate-review-and-rate-guides) | Rate development, actuarial soundness, documentation | Confirm the guide and rating period relevant to the modeled scenario. |
| [Pennsylvania DHS Behavioral HealthChoices](https://www.pa.gov/agencies/dhs/resources/medicaid/bhc) | Program structure, member services, managed-care arrangements | Use current Pennsylvania publications and applicable county/program details. |
| [Pennsylvania DHS Behavioral HealthChoices publications](https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications) | Standards, handbooks, reports, technical materials | Record version and effective dates for every encoded parameter. |
| [CMS school-based services resources](https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/medicaid-and-school-based-services/school-based-services-resources) | School-based service financing and administrative claiming | Do not generalize one state's coverage or implementation to another. |

## Required metadata for each source record

- Unique source ID
- Full title and issuing organization
- Canonical URL
- Jurisdiction and program
- Publication date and effective period, if stated
- Retrieval date and document version
- Section/page/passage supporting each extracted claim
- Source status: current, superseded, proposed, archived, or needs review
- Extraction method and reviewer
- Parameter(s) supported
- Conflicts or ambiguity
- Use restrictions and data licensing notes

## Provenance categories

- `verified_rule`: directly supported by an applicable authoritative source and reviewed.
- `derived_value`: calculated from documented values using a stated method.
- `estimated_parameter`: estimated from observed data with a stated method and uncertainty.
- `expert_assumption`: an explicit assumption reviewed by a domain expert.
- `hypothetical_scenario`: a proposed policy or value used for experimentation, not an assertion about current law.

Never mark a source as verified merely because an AI model supplied a citation. Open and inspect the source.


## Dated source verification snapshot

See [SOURCE_VERIFICATION_2026-10-08.md](SOURCE_VERIFICATION_2026-10-08.md) for the official Pennsylvania DHS pages checked on 2026-10-08 and the precise limits of what was verified.

Initial official-source findings:
- DHS's Behavioral HealthChoices overview describes county contracting with BH-MCOs and member assignment by county of residence: https://www.pa.gov/agencies/dhs/resources/medicaid/bhc
- The current publications index lists the PS&R and appendices, 2026 Financial Reporting Requirements, ASAM rates effective January 1, 2026, the 2026 member handbook, and 2025-2026/2024-2025 annual technical reports: https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications
- The county/MCO mapping is published separately: https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-mcos
- OMHSAS Systems Management describes its role in managing BH claims/encounter data and business intelligence: https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-systems-management

These findings verify official source pages and index contents, not the precise applicability of individual coverage, rate, or contract rules. Do not encode a policy rule until its source document version, effective period, exact passage, and applicability have been reviewed.


## Structured source registry

The machine-readable registry at [`sources.registry.json`](sources.registry.json) gives each source a stable ID, issuer, URL, jurisdiction, program, source type, review date, scope note, and explicit review gate. It is intended for tooling and the Learning Lab, not as a claim that every source's legal content has been verified.

Update records when a page or document is checked. For a rule-bearing source, append the exact document version/effective date, section/page/passage, reviewed applicability, and reviewer before marking the rule verified. Historical market-availability snapshots must remain distinct from current directories and never be treated as provider-network evidence.
