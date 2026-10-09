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
