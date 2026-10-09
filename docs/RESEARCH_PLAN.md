# Research plan: virtual-county behavioral-health finance simulation

## Working title

**SimSurance: A Virtual County for Behavioral-Health Policy and Financing Research**

## Primary question

Under what conditions do alternative behavioral-health financing and service-delivery policies improve access, outcomes, equity, and financial sustainability compared with a documented baseline?

## First study: narrow and testable

Compare a baseline behavioral-health service system with a clearly labeled hypothetical care-coordination pilot for a synthetic Pennsylvania county.

Do not assume the proposed service is Medicaid-reimbursable. The study must specify a hypothetical authorized funding pathway or use a documented existing payment authority, with qualified review before making legal or policy claims.

### Baseline
- Synthetic population calibrated to suitable public aggregate data.
- Documented current eligibility and service rules for a clearly named program and effective period.
- Explicit provider capacity and utilization assumptions.
- Transparent unit costs and payment parameters, each tagged by evidence status.
- Reproducible simulation runs.

### Scenario
- Define the proposed service, target population, provider qualifications, delivery setting, payment mechanism, unit rate, administrative costs, and implementation constraints.
- Separate confirmed policy rules from hypothetical assumptions.
- Include workforce capacity and adoption constraints so service availability does not expand magically.

### Outcomes
- Access rate and unmet need
- Time to first appointment and waitlist duration
- Service use and continuity
- Selected clinical outcome proxies
- Crisis/higher-acuity utilization
- Payer-level expenditure and total system expenditure
- Provider workload, revenue, operating cost, and sustainability
- Subgroup differences and distributional effects

## Evidence and data plan

Prioritize official and transparent sources, such as:
- CMS Medicaid authorities, managed-care regulations, rate-development guidance, and school-based services guidance.
- Pennsylvania DHS/OMHSAS program standards, Behavioral HealthChoices publications, official reports, and applicable rate/contract materials where publicly available.
- Public aggregate utilization and demographic datasets from government agencies.
- Peer-reviewed research for treatment engagement, service utilization, clinical transitions, and evaluation methods.

Maintain a source register with URL, publisher, jurisdiction, publication/effective dates, access date, relevant passage, and permitted-use notes. Do not infer local rates or contractual details from generic national sources.

## Validation plan

1. **Face validity:** policy, clinical, and operational reviewers inspect process logic.
2. **Code verification:** unit and integration tests confirm the implementation matches the written rules.
3. **Accounting verification:** test conservation/transfer logic, totals, duplicate claims, and payer allocations.
4. **Calibration:** compare aggregate model behavior with independent observed data where appropriate.
5. **Sensitivity analysis:** vary uncertain parameters and report how conclusions change.
6. **Stress testing:** test capacity shortages, increased demand, low uptake, high administrative costs, and unexpected utilization.
7. **Reproducibility:** rerun with recorded configuration, code version, data version, and random seed.
8. **External validation:** when feasible, compare predictions with later or separate observed data; document failure as well as success.

## Interpretation limits

- Simulations estimate consequences conditional on assumptions.
- A model can reproduce historical patterns and still fail to predict the effects of a new policy.
- A reduction in one payer's expenditure may shift costs to another payer or provider.
- Increased service use is not automatically improved health.
- Clinical outcomes, costs, and equity must be evaluated together.
- Real-world policy recommendations require external evidence and qualified review; simulated effects alone do not establish causal impact.

## Deliverables

1. Source register and glossary.
2. Baseline system map.
3. Versioned policy-parameter registry.
4. Minimal synthetic county and financial ledger.
5. Reproducible baseline report.
6. One scenario comparison with uncertainty and sensitivity analyses.
7. Research methods note documenting assumptions, limitations, and validation results.
