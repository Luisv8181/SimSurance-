# Dated source snapshot: Behavioral HealthChoices publications index

**Source:** Pennsylvania Department of Human Services — "Behavioral HealthChoices-Publications"
**Canonical URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications
**Publisher:** Commonwealth of Pennsylvania, Department of Human Services
**Retrieval date:** 2026-10-10
**Extraction method:** manual review of live page text by research agent
**Purpose:** preserve a dated, versioned lookup of the documents the publications
index lists (versions/effective periods as named in the index), for future rule
research, per the SRC-PA-BHC publications follow-up note in
docs/SOURCE_VERIFICATION_2026-10-08.md.

## Observed page structure (2026-10-10)

### General Publications (8 items)
- ASAM Provider Rates Effective January 1, 2026
- 2026 Financial Reporting Requirements (FRR)
- HealthChoices Examination Guide: Behavioral/Physical Health & Community HealthChoices
- HealthChoices Examination Guide: Supplemental Guidance Behavioral Health
- Program Standards and Requirements (PSR)
- Program Standards and Requirements (PSR): Appendices
- Telephonic Psychiatric Consultation Service Program (TiPS)
- OMHSAS Member Handbook 2026

### OMHSAS Publications (8 items)
- MHPAEA/Parity Reports: Mental Health Parity and Addiction Equity Act
  (MHPAEA/Parity) Final Report; MHPAEA/Parity Report with Community
  HealthChoices (CHC)
- Additional Reports: "A Call for Change: Towards a Recovery-Oriented Mental
  Health Service System"; "A Plan for Promoting Housing and Recovery-Oriented
  Services"; "Housing and the Sequential Intercept Model: A How-To Guide — For
  Planning for the Housing Needs of Individuals with Justice Involvement &
  Mental Illness"; "Hope for Pennsylvanians: Healthy Planning to Stay Calm in
  an Emergency & How to Cope Following Disasters and Emergencies"; "OMHSAS
  Strategic Plan for Cultural Competence"

### OMHSAS Resources (3 items)
- 2017 PATH Grant Application
- Community Mental Health Services Block Grant — Fiscal Year 2016-2017
- Community Mental Health Services Block Grant — Fiscal Year 2014-2015

### NCQA or URAC Certifications
- Per CFR 438.332, the department posts accreditation certificates from the
  National Committee for Quality Assurance (NCQA) and the Utilization Review
  Accreditation Commission (URAC).

### External Quality Review Projects — annual technical reports
- **Statewide:** 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015 (9 reports)
- **Carelon Behavioral Health, Inc (Formerly Beacon Health Options):** 2023, 2022,
  2021, 2020, 2019 (5 reports)
- **Community Behavioral Health (CBH):** 2023–2015 (9 reports)
- **Community Care Behavioral Health (CCBH):** 2023–2015 (9 reports)
- **Magellan Behavioral Health (MGH):** 2023–2015 (9 reports)

## Provenance category for this snapshot

`estimated_parameter` at most: a dated page observation, not a reviewed rule.

## Integrity check (2026-10-10)

41 document items listed (8 general + 8 OMHSAS publications + 3 resources +
22 MCO/statewide technical reports counted by MCO section above: 9 + 5 + 9 +
9 + 9 = 41 technical reports). No duplicate titles observed; one link-index
numbering artifact in the page's extraction (CCBH 2018 and CBH 2018 both
carried the same bracket index) is an extraction artifact, not a content
duplicate. The most recent technical report on the index is 2023 across all
sections.

## Hard limits — do not exceed

1. This snapshot is a **dated page check only** (2026-10-10). It records what the
   index lists; it is not a rule encoding and must be re-verified before use.
2. Listing a document in the index does **not** establish its version, effective
   period, or applicability to any modeled scenario. Review the linked document
   itself before encoding any rule.
3. No payment rate, coverage rule, eligibility rule, or rate authority was
   extracted or encoded in this run. `review_required_before_encoding` remains
   true for the `pa-dhs-bhc-publications` registry record.
4. Do not hard-code any document title, rate reference, or handbook statement
   into executable simulation logic without a reviewer-approved, versioned
   source record that cites the document's version and effective dates.

## Open questions

- The 2026-10-08 source-register note said the publications index lists
  "2025-2026/2024-2025 annual technical reports." Today's page shows the most
  recent External Quality Review technical reports dated 2023. These may be
  different report series (e.g., HealthChoices program annual reports vs. EQR
  annual technical reports), or the index may have changed between checks.
  Flagged, not resolved — do not silently select one reading.
- The index itself displays no effective dates or version numbers beyond the
  year baked into titles (2026 FRR, 2026 handbook, 2026 ASAM rates); each linked
  document must be opened to confirm its stated effective period.
