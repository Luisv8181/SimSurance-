# SimSurance Deep Research Report

> Status: Research synthesis supplied by project owner; current source details and all policy interpretations must be verified before implementation. This is a design input, not evidence that a policy or simulation has been validated.

## Executive summary

SimSurance is an open, auditable research platform for following the money through behavioral-health financing, initially focusing on Pennsylvania Medicaid HealthChoices Behavioral Health. It connects authoritative policy sources to explicit, versioned rules; builds a synthetic population and provider network; records service and financial events; and compares a documented baseline with clearly labeled hypothetical reforms.

The core question is: **Under what conditions do alternative behavioral-health financing and service-delivery policies improve access, outcomes, equity, and financial sustainability compared with a documented baseline?**

Core components: source/policy explorer, policy engine, financial ledger, synthetic population, provider network, simulation runner, scenario manager, outcomes dashboard, and export/API.

Simulation results are conditional estimates. They do not establish real-world causation, guarantee savings, or replace qualified policy, legal, actuarial, statistical, clinical, or community review.

## Goals and research questions

- Make each model rule traceable to a source passage, jurisdiction, program, effective period, provenance class, and review status.
- Compare current documented rules with proposed policy scenarios.
- Model synthetic people, providers, service demand, capacity, claims, payments, outcomes, and costs.
- Report access, waits, unmet need, continuity, expenditure by payer, total system expenditure, provider capacity/sustainability, equity and selected outcomes.
- Support reproducible runs, sensitivity analysis, source navigation, acronym learning, and educational outputs.

Research questions include: What could happen if a specific care-coordination or community service is funded? How may payment incentives affect provider participation and access? Who bears costs and who may benefit? How do conclusions vary under uncertain service uptake, need, provider capacity, rates, dropout, or enrollment churn?

## Initial scope

- Geography: Pennsylvania, using a small synthetic county/region first.
- Program: HealthChoices Behavioral Health, but only after verifying current Program Standards and Requirements (PS&R), applicable primary contractor agreements, and relevant dates.
- Services: begin with a tiny, sourced service catalog and one narrowly defined pilot scenario; expand only after the baseline passes validation.
- Inputs: public aggregate statistics and generated synthetic people; no real identifiable client records in the prototype.
- The model is a research/education tool, not a production eligibility system, claims adjudicator, or individual clinical predictor.

## Assumptions in the supplied report that must be checked before encoding

1. Broad national percentages for Medicaid coverage/spending must keep their original year, population, and definition; do not present old statistics as current universal facts.
2. Do not oversimplify HealthChoices enrollment as covering only people with serious mental illness or substance-use conditions. Encode actual applicable eligibility/enrollment rules from current authoritative sources.
3. Map the real current roles of DHS, counties, primary contractors, and BH-MCOs from current agreements; do not assume all counties have identical arrangements.
4. Keep managed-care capitation separate from downstream provider claims/payments. Model both layers without double-counting plan revenue/claims as multiple independent total-system costs.
5. Do not assume all covered services have a public fee schedule or that all non-session activities are categorically non-reimbursable. Verify specific benefit, provider, documentation, contract and payment rules.
6. Verify datasets such as “UDS” before treating them as Pennsylvania Medicaid behavioral-health encounter data. Do not conflate similarly named data systems.
7. Verify any asserted federal matching-rate enhancement, waiver authority or new financing mechanism against current law, CMS guidance and the applicable approved state authority.
8. A universal “match actual spending within 10%” target is not valid without aligning accounting boundary, period, population, service mix and definitions. Set benchmark-specific tolerances and explain mismatches.
9. Synthetic data do not automatically eliminate re-identification risk; document source, method, granularity and permitted use.

## Primary sources and acquisition priorities

| Priority | Source family | Use | Validation required |
|---|---|---|---|
| P0 | PA DHS HealthChoices Behavioral Health PS&R and applicable primary contractor/managed-care agreements | Program requirements, services, responsibilities, reporting, payment context | Current version, effective date, applicability, appendices, superseded versions |
| P0 | PA DHS HealthChoices BH publications, financial reporting requirements and official technical reports | Program structure, performance, aggregate financial context | Reporting year, denominator, scope, entity and definitions |
| P0 | PA Medicaid State Plan and amendments | Benefit authorities and state commitments | Link each modeled rule to the precise approved authority |
| P0 | Federal Medicaid statutes/regulations, including applicable 42 CFR Part 438 provisions | Federal managed-care/access/rate requirements | Current source and applicability |
| P1 | Official fee schedules and service/rate publications where relevant | FFS parameters when truly applicable | Do not assume an MCO’s contracted provider payment equals a state FFS fee |
| P1 | CMS expenditure reports and managed-care rate guidance | Financial benchmarks and rate context | Align accounting definitions and periods |
| P1 | Census ACS and Pennsylvania official demographics | Population calibration | Geography, vintage, margins of error |
| P1 | SAMHSA and other official population surveys | Prevalence/utilization priors | Align age, state, population and uncertainty |
| P1 | Official access, quality, and external quality review reports | Baseline validation | Measure definitions and denominators |
| P2 | Peer-reviewed/policy literature | Behavioral, clinical and model parameter evidence | Distinguish research evidence from binding policy |
| P2 | Nonpublic claims/encounters | Stronger calibration if available | Permissions, data-use terms, governance, security and appropriate review |

Starting points:
- PA DHS Behavioral HealthChoices: https://www.pa.gov/agencies/dhs/resources/medicaid/bhc
- PA DHS Behavioral HealthChoices publications: https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications
- Medicaid.gov: https://www.medicaid.gov/
- CMS managed-care rate guidance: https://www.medicaid.gov/medicaid/managed-care/guidance/rate-review-and-rate-guides
- CMS school-based services resources: https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/medicaid-and-school-based-services/school-based-services-resources

Every source record should capture source ID, title, publisher, canonical URL, jurisdiction/program, publication and effective dates, retrieval date, version/status, section/page/passage, parameter supported, extraction method, reviewer, conflicts and use restrictions.

## Architecture

### 1. Source Library and Policy Explorer
Ingest source metadata and permitted text/excerpts; search by acronym, concept, program, service, document and passage; link related concepts; track current/superseded/uncertain status. AI may draft summaries and candidate extractions, but only reviewed, source-backed records become executable rules.

### 2. Policy and Coverage Engine
Evaluate explicit, versioned rules for eligibility, benefit coverage, provider qualification, authorization and payment parameters. Return decision, rationale, rule/version and source references. Unknown or conflicting policy must produce “needs review,” not an automatic approval or denial.

### 3. Synthetic Population
Generate synthetic individuals/households calibrated to public aggregates. Track relevant attributes, insurance/enrollment, service needs, language/access barriers and service history. Record generation method, sources, seed and calibration gaps. Do not copy identifiable records.

### 4. Provider and Service Network
Represent organizations/provider types, service capabilities, locations, capacity, schedules, referral pathways, staffing and cost assumptions. Treat public directories as incomplete unless completeness is verified. Model queues, waits, cancellations and referral failures only where justified.

### 5. Financial Ledger
Represent funding and transfers, managed-care capitation, service events, claims, adjudication, provider payment, denial/adjustment/reversal, provider cost, administrative expense and pilot funding as distinct transaction types.

Each transaction should contain ID, run/scenario ID, period, payer, payee, service/type, amount, rule/version, source references and status. Keep billed charge, allowed amount, paid amount, cost-sharing, provider revenue, provider operating costs, MCO revenue/expenditure, state/federal expenditure and consolidated total-system costs distinct. Internal transfers must not inflate consolidated costs.

### 6. Simulation Core
Start with hybrid microsimulation plus discrete-event service operations. Individuals progress through explicit states/events; queues and provider capacity control access. Avoid complex autonomous LLM behavior until the basic model is validated.

Each run records policy, data, code/model versions, configuration hash, random seed, time horizon, replication count, timestamps, warnings and validation status.

### 7. Scenario Manager and Dashboard
Clone baseline settings and change named, versioned parameters. Report access, wait, unmet need, utilization, continuity, outcome proxies, crisis use, workforce capacity, provider sustainability, spending by payer/service and overall spending. Display uncertainty and mark each quantity as observed, estimated, assumed or simulated.

### 8. APIs and exports
Illustrative endpoints: GET /api/sources; GET /api/glossary?q=; GET /api/policy-rules; GET/POST /api/scenarios; POST /api/runs; GET /api/runs/{id}; GET /api/runs/{id}/metrics; GET /api/runs/{id}/ledger; GET /api/runs/{id}/report. Final path naming should follow the existing application and chosen framework.

## Core data model

- SourceDocument: title, URL, publisher, jurisdiction, program, dates, version/status/checksum.
- SourcePassage: source ID, section/page/anchor, excerpt, extraction and review status.
- GlossaryEntry: term, expansion, plain-language definition, relationships, source IDs, status.
- PolicyRule: rule ID, jurisdiction/program, domain, effective interval, logic/version, status and reviewer.
- PolicyParameter: name/value/unit, provenance class, uncertainty, date interval and evidence.
- Scenario: baseline reference, policy deltas, population/data versions, assumptions and author.
- SyntheticPerson: synthetic ID, aggregate-calibrated attributes, state variables and generation provenance.
- Provider: ID, type, service capabilities, capacity, location band and operating-cost assumptions.
- ServiceDefinition: service/code, coverage, qualification and unit, with source.
- ServiceEvent: person, provider, time, service, status and outcome.
- Claim: service event, billed/allowed amounts, adjudication, applied rules.
- LedgerTransaction: payer/payee, transaction type, amount, period, claim/funding reference and run.
- SimulationRun: configuration hash, seed, code/data/policy versions, timestamps and validation.
- OutcomeMetric: run/scenario, metric/value distribution, subgroup, unit, uncertainty and type.
- ReviewRecord: artifact/parameter, reviewer role, decision, date and notes.

Use integer cents or fixed-point decimals for money, never binary floating point for accounting. Store explicit units/time periods.

## Modeling tradeoffs

- Agent-based modeling captures heterogeneity and interactions but is data-hungry and harder to validate.
- Discrete-event simulation is well suited to appointments, waitlists, capacity and workflows.
- Microsimulation supports individual heterogeneity and probabilistic transitions.
- System dynamics can be useful as an aggregate cross-check.
- Recommended MVP: hybrid microsimulation + discrete-event queues, adding agent interactions only when needed.

## Baseline algorithm

1. Load versioned population, policy and scenario configuration.
2. Initialize enrollment and provider capacity.
3. Generate service-seeking events from explicit documented/estimated probabilities.
4. Route referrals and schedule against finite capacity.
5. Apply eligibility, coverage, qualification and authorization rules.
6. Record service events, claims and financial transactions at the correct payment layer.
7. Update person state, capacity, budget and outcomes.
8. Store run metadata and aggregates.
9. Repeat across seeds/replications.
10. Compare scenario distributions and perform sensitivity/stress tests.

## Accounting invariants

- No payment for a denied claim unless another explicit funding rule applies.
- Each payment references its applicable rule/version.
- Allowed/paid relationships follow the modeled rule and documented exceptions.
- Every transaction has currency and period.
- Adjustments/reversals remain auditable.
- Payer/payee totals reconcile by period.
- Transfers cancel within a defined consolidated boundary.
- Capitation and downstream provider claims do not count as two independent societal costs.
- Deterministic inputs/seed/configuration reproduce deterministic outputs.
- Any breached invariant fails validation or produces a visible diagnostic; it does not silently publish results.

## Outcomes, calibration and validation

Potential outcomes: access, unmet need, first-appointment wait, referral completion, continuity/dropout, utilization, crisis services, expenditure by payer/service, capacity utilization, provider revenue/cost proxies, workforce burden and subgroup differences.

Validation layers:
1. Source validity and currentness.
2. Policy-rule review.
3. Code verification.
4. Accounting reconciliation and edge-case testing.
5. Population calibration to defined aggregate benchmarks.
6. Process validation against observed or expert-reviewed patterns.
7. Out-of-sample validation where independent later data exist.
8. Stochastic, parameter and structural uncertainty analysis.
9. Stress testing under capacity shortages, increased demand, low uptake, higher cost and churn.
10. Independent policy, finance, clinical, statistical and community review.

Calibration fit is not proof of predictive validity. Increased service use does not automatically mean improved health. A reduction in one payer’s spend may shift cost to another payer or provider. Clinical transitions must use defensible estimates with uncertainty ranges.

## Privacy, ethics and open science

- Prototype with synthetic records and public aggregate data.
- Assess synthetic-data provenance and possible re-identification risk.
- Do not commit PHI, PII, credentials, restricted data or private claims extracts.
- Check licenses and permitted reuse for documents/data.
- Obtain agreements and appropriate security before any nonpublic data use.
- Consult institutional review/ethics authorities before stakeholder interviews, surveys, or nonpublic records; do not assume simulation alone automatically removes IRB considerations.
- Show source, assumption, uncertainty and simulation labels in the UI.
- Include a disclaimer: research/education use only; not an official policy determination, coverage decision, clinical recommendation, actuarial opinion or proof of savings.

## Suggested team and agent perspectives

Product/research architect; Medicaid policy analyst; health economist/reimbursement analyst; actuarial/financial reviewer; simulation/operations-research engineer; biostatistician/epidemiologist/causal-inference reviewer; behavioral-health clinician; software/data engineer; privacy/security/ethics reviewer; implementation-science/community reviewer; UX/information architect; independent validation/red-team reviewer.

AI agents can carry out bounded coding and review tasks but do not thereby hold professional credentials. Material legal, actuarial, clinical, statistical and policy assumptions require qualified human review.

## Roadmap

### Phase 0: repository audit (1–2 weeks)
Inspect actual stack, app entry points, dependencies, tests, deployment, license, existing issues and current docs. Record decisions; preserve existing work. Acceptance: runnable starting environment or clear blocker report.

### Phase 1: policy learning infrastructure (2–4 weeks)
Populate source register, glossary, source passages, version/effective dates and status; build source-backed search. Acceptance: each term links to a source passage and carries currentness/uncertainty status.

### Phase 2: policy registry and finance kernel (3–5 weeks)
Build versioned parameter/rule schemas; resolver; decimal-safe ledger; toy claims/denials/adjustments; accounting tests. Acceptance: hand-calculated examples reconcile; no unsupported real rates hard-coded.

### Phase 3: minimal synthetic county (3–5 weeks)
Seeded population, aggregate calibration report, minimal service demand, provider capacity/queues. Acceptance: repeatable population, transparent discrepancies, no real-client data.

### Phase 4: baseline simulation (3–5 weeks)
Connect demand, capacity, rules and ledger; store run manifest; produce baseline metrics. Acceptance: reproducible runs, explainable events and reconciled payments.

### Phase 5: one counterfactual pilot (3–5 weeks)
Define a hypothetical care-coordination/community service, funding premise, target population, payment unit/rate assumption, capacity, uptake and overhead; compare with baseline; add sensitivity analyses. Acceptance: every changed assumption is documented and outcomes show uncertainty/limitations.

### Phase 6: review and hardening (ongoing)
Get expert review, calibrate and validate with appropriate benchmarks, improve dashboard and exports, publish limitations, expand scope only after baseline validation. The 12–18 month horizon is a planning estimate, not a guarantee.

## Suggested repository structure

Adapt to the real stack after inspection:
- AGENTS.md, README.md
- docs/DEEP_RESEARCH_REPORT.md
- docs/PRODUCT_REQUIREMENTS.md
- docs/CODE_ROADMAP.md
- docs/ARCHITECTURE.md
- docs/AGENT_ROLES.md
- docs/RESEARCH_PLAN.md
- docs/SOURCE_REGISTER.md
- docs/GLOSSARY.md
- docs/ASSUMPTIONS_REGISTER.md
- docs/VALIDATION_PLAN.md
- docs/SECURITY_PRIVACY_GOVERNANCE.md
- docs/DECISIONS.md
- data/sources/ (metadata/pointers, not restricted copies)
- data/fixtures/ (small synthetic fixtures)
- src/ (or existing app layout)
- tests/ (or existing test layout)

## First implementation tickets

1. Audit actual repo, framework and deployment; record decisions.
2. Add this research report and product requirements.
3. Build source-register schema and seed current authoritative links.
4. Build source-backed acronym/glossary explorer.
5. Add typed policy-parameter registry/provenance.
6. Build financial ledger and accounting invariants.
7. Build toy claim adjudication tests.
8. Build seeded synthetic population and calibration report.
9. Add provider capacity and queue model.
10. Build baseline runner and complete run manifest.
11. Add one scenario diff and sensitivity runner.
12. Build comparison dashboard and exportable evidence packet.
13. Add CI, security/data checks and reproducibility regression tests.
14. Conduct independent reviewer/red-team pass.

Each ticket must specify scope, files allowed to change, data dependencies, tests, acceptance criteria and required reviewers. Avoid concurrent writes to the same file; one integrator controls shared interfaces.

## Therapy in Bits connection

Use the tool to teach one long episode tracing a hypothetical dollar from public funding, through Medicaid/managed-care arrangements, to provider payment and service delivery. Then use a clearly labeled hypothetical scenario to show how payment changes could affect capacity and access. Distinguish real documented policy from simulation assumptions at every step.

## Open decisions

- Select county/region and exact baseline source versions.
- Select the first service categories and scenario.
- Identify usable public aggregate benchmarks with aligned definitions.
- Audit existing tech stack and deployment target.
- Recruit domain review for policy parameters and ledger rules.
- Decide software license and source-document storage policy.
