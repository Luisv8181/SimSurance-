# Pennsylvania HealthChoices Behavioral Health Source Check

**Checked:** 2026-10-08  
**Status:** Initial web verification only. This establishes what current official pages list and say; it does not complete a legal interpretation of the PS&R or contract terms.

## Findings from official Pennsylvania DHS pages

### SRC-PA-BHC-001 — Behavioral HealthChoices overview
- **Publisher:** Pennsylvania Department of Human Services (DHS)
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc
- **Observed statements:** The page describes Behavioral HealthChoices as connecting Medicaid recipients with mental-health and drug/alcohol services; says each county contracts with a managed care organization for behavioral health; describes BH-MCO assignment by county of residence; and says Medicaid enrollees may be automatically enrolled in the behavioral-health program for their county.
- **Model use:** High-level program structure only.
- **Status:** Official overview page reviewed 2026-10-08. Do not treat the overview as the full eligibility specification, a rate source, or a substitute for the governing PS&R/contract.

### SRC-PA-BHC-002 — Behavioral HealthChoices publications index
- **Publisher:** Pennsylvania DHS
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications
- **Observed current index items:** ASAM Provider Rates Effective January 1, 2026; 2026 Financial Reporting Requirements (FRR); Program Standards and Requirements (PSR); PSR appendices; OMHSAS Member Handbook 2026; and the 2025-2026 and 2024-2025 Behavioral HealthChoices Annual Technical Reports.
- **Model use:** Primary index to acquire and version source files.
- **Status:** Official index reviewed 2026-10-08. The index confirms these items are listed, but the precise current effective version of the PS&R and appendices must be recorded from the linked documents before any rule is encoded.

### SRC-PA-BHC-003 — Behavioral Health MCOs and counties
- **Publisher:** Pennsylvania DHS
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-mcos
- **Observed statements:** The page lists BH-MCOs and their county assignments.
- **Model use:** County-to-plan assignment lookup, with an effective/retrieval date.
- **Status:** Official page located; preserve a dated snapshot before using its mapping in a simulation. County/plan mappings should not be hard-coded without a versioned source record.

### SRC-PA-BHC-004 — Information for providers
- **Publisher:** Pennsylvania DHS
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers
- **Observed content:** Provider information, a county/region/BH-MCO table, and a displayed ASAM rates section titled “Rates Effective January 1, 2026.”
- **Model use:** Potential provider-facing and rate-source discovery.
- **Status:** Official page located. Do not generalize ASAM rates to all behavioral-health services or assume a public fee schedule defines every MCO's contracted provider reimbursement.

### SRC-PA-BHC-005 — Behavioral HealthChoices Systems Management
- **Publisher:** Pennsylvania DHS / OMHSAS
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-systems-management
- **Observed statements:** Describes systems management as supporting access to Medicaid-covered behavioral-health and County Base-Funded Mental Health services, including management of claims/encounter data and business intelligence; identifies a resource account for 837 encounter issues and PS&R appendices.
- **Model use:** Future data-access and encounter-schema research.
- **Status:** Official page located. This is not proof that nonpublic encounter data are available for this project; permissions and data-use conditions still apply.

## Immediate source acquisition order

1. Download and inspect the PS&R and its appendices linked from the current publications index. Capture exact version/effective date and source passages for each modeled rule.
2. Inspect the 2026 FRR to understand financial categories and reporting boundaries.
3. Inspect the ASAM schedule effective 2026-01-01 only for the named ASAM service categories and its stated unit.
4. Inspect the 2025-2026 annual technical report for metric definitions, reporting period and denominators before using any measure for calibration.
5. Use the MCO/county mapping only as a dated lookup.
6. Identify current state-plan and federal authorities for each specific service and financing arrangement.

## Rule-encoding gate

No live executable rule should be created from this page review alone. For every rule, capture:
- exact document and version/effective date;
- section/page/paragraph;
- exact rule summary and scope;
- applicability by county, MCO, provider, member, service and period;
- whether the rule is legal/contractual, a derived parameter, an estimate, expert assumption or hypothetical scenario;
- reviewer and unresolved ambiguities.

## Important limitations

- The overview page does not establish that only people with SMI or SUD are eligible/enrolled.
- A county-to-BH-MCO mapping is not the same as a provider reimbursement schedule.
- A published service-specific ASAM rate does not imply a uniform fee schedule across the entire BH benefit.
- Public financial reports and encounter measures may use different accounting boundaries and denominators; reconcile definitions before calibration.
- This review is not legal advice and does not certify that any proposed pilot is authorized or reimbursable.

---

# Follow-up: 2026-10-10 — SRC-PA-BHC-003 snapshot re-verified

**Checked:** 2026-10-10 (rotation run, scheduled unit: verify one source-register
entry against its official page)
**Source:** SRC-PA-BHC-003 / registry `pa-dhs-bhc-mcos` —
https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-mcos

- Page is live; its five-MCO county-assignment table is unchanged in structure
  from the 2026-10-08 review. Full dated snapshot preserved at
  `docs/source-snapshots/bhc-mcos-2026-10-10.md`.
- Integrity check on the observed county lists: 67 listed, 67 unique, 0
  duplicates, 0 missing, 0 extras against Pennsylvania's 67 counties — the
  mapping covers every county exactly once.
- Page states each consumer is assigned a BH-MCO by county of residence and then
  chooses providers within that MCO's network; no "effective as of" date is
  displayed on the page.
- Status remains page-level verification only: does not establish credentialing,
  network status, benefits, or reimbursement. Re-verify the page again before any
  simulation run uses the mapping.
