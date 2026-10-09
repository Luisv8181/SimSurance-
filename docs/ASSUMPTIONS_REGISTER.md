# Assumptions and Verification Register

This register prevents uncertain claims from becoming executable policy. Add an entry for every material rule, parameter or modeling assumption.

| ID | Topic | Claim / assumption | Classification | Evidence/source | Status | Owner/reviewer | Risk if wrong |
|---|---|---|---|---|---|---|---|
| A-001 | Program scope | SimSurance initially models Pennsylvania HealthChoices Behavioral Health | Scope decision | docs/DECISIONS.md | Chosen for prototype; exact operating rules need current-source review | Research lead + policy reviewer | Wrong scope invalidates rules and benchmarks |
| A-002 | Enrollment | Eligibility and enrollment must follow actual current rules, not a simplified SMI/SUD-only profile | Verification requirement | PA DHS program sources | Needs source extraction | Policy analyst | Population composition wrong |
| A-003 | Funding flows | Capitation and downstream provider payments are distinct levels of the payment system | Modeling principle | Applicable contracts and accounting boundary must be documented | Architecture rule; contract-specific details pending | Finance reviewer | Double-counted expenditure |
| A-004 | Rates | No specific payment rate is active until its source, period, unit and applicability are verified | Verification gate | Applicable official rate/contract source | Pending | Policy + finance reviewer | Invalid financial conclusions |
| A-005 | Need/utilization | Service seeking, attendance, dropout and clinical transitions require empirical parameters or clearly labeled assumptions | Modeling principle | Appropriate public data / literature / expert review | Pending parameterization | Statistician + clinical reviewer | False precision and biased effects |
| A-006 | Synthetic people | Population is generated from aggregate data and is not a sample of actual named people | Data policy | Data-generation documentation | Required | Data engineer + privacy reviewer | Privacy and representativeness risks |
| A-007 | Baseline validation | Each benchmark must have aligned population, scope, period and accounting definition; no universal 10% threshold | Validation principle | docs/VALIDATION_PLAN.md | Adopted | Statistician + finance reviewer | Misleading calibration claim |
| A-008 | Pilot legality | A hypothetical pilot is not assumed to be covered or authorized without review of applicable authority and contracts | Policy safeguard | Relevant current state/federal authority | Required for each scenario | Policy/legal reviewer | Misrepresenting legal feasibility |
| A-009 | Simulated outcome | Simulated differences are conditional estimates and not evidence of causal real-world effects | Interpretation rule | Research method | Required disclosure | Research lead + statistician | Overstated policy claims |

## Provenance classifications

- `verified_rule`: direct support from applicable authoritative source, checked and reviewed.
- `derived_value`: calculation from documented values with method recorded.
- `estimated_parameter`: estimate from observed data with method/uncertainty documented.
- `expert_assumption`: explicit assumption reviewed by a domain expert.
- `hypothetical_scenario`: proposed value or policy for experimentation, not an assertion about current law.

## Entry template

- ID:
- Topic:
- Exact claim or assumption:
- Classification:
- Source and exact passage:
- Jurisdiction/program/effective period:
- Method/units:
- Verification status:
- Owner/reviewer:
- Risk if wrong:
- Revisit trigger:
