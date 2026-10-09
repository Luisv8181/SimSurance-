# SimSurance

**A research platform for simulating behavioral-health policy, insurance rules, Medicaid financing, service delivery, and population outcomes.**

SimSurance is an auditable virtual-county laboratory connecting official policy sources to explicit rules, synthetic populations, provider networks, service events, financial flows, and comparative policy experiments.

**Core question:** Under what conditions do alternative behavioral-health financing and service-delivery policies improve access, outcomes, equity, and financial sustainability compared with a documented baseline?

## Product pillars
1. **Medicaid Policy Explorer** — searchable primary sources, acronyms, definitions, effective dates, source passages, policy relationships and uncertainty labels.
2. **Virtual County** — synthetic population, provider organizations, service capacity, referral pathways and access barriers.
3. **Policy Engine** — versioned rules for eligibility, covered services, authorization, provider qualifications and reimbursement.
4. **Financial Ledger** — auditable claims, payments, budgets, provider costs, payer-level expenditure and cash-flow accounting.
5. **Simulation Lab** — reproducible baseline and policy scenarios, repeated runs, sensitivity analysis and uncertainty intervals.
6. **Outcomes Dashboard** — access, wait times, unmet need, continuity, outcomes, equity, workforce capacity and financial sustainability.
7. **Research Learning Loop** — source → model → simulate → validate → compare → refine.

## Research principles
- Policy rules link to authoritative sources, passages, jurisdictions and effective dates.
- Distinguish verified rules, derived values, estimated parameters, expert assumptions and hypothetical scenarios.
- Record model/data/code versions, configuration and random seed for each run.
- Begin with synthetic records calibrated to public aggregate evidence; do not use identifiable client data in the prototype.
- Report uncertainty and limitations. Simulation results are conditional estimates, not proof of real-world causal effects or guaranteed savings.
- This is a research and education tool, not an official policy determination, coverage decision, clinical recommendation or legal advice.
- AI agents may research, code and critique; they may not silently invent policy rules, data, citations or results.

## Getting started
Read [AGENTS.md](AGENTS.md), [the Deep Research Report](docs/DEEP_RESEARCH_REPORT.md), [Product Requirements](docs/PRODUCT_REQUIREMENTS.md), [Code Roadmap](docs/CODE_ROADMAP.md), [Architecture](docs/ARCHITECTURE.md), [Agent Roles](docs/AGENT_ROLES.md), [Research Plan](docs/RESEARCH_PLAN.md), [Source Register](docs/SOURCE_REGISTER.md), [Glossary](docs/GLOSSARY.md), [Assumptions Register](docs/ASSUMPTIONS_REGISTER.md), [Validation Plan](docs/VALIDATION_PLAN.md), [Security/Privacy/Governance](docs/SECURITY_PRIVACY_GOVERNANCE.md), [Decision Log](docs/DECISIONS.md), and the [Agent Execution Prompt](docs/AGENT_EXECUTION_PROMPT.md).

## Initial scope
Begin with Pennsylvania Medicaid behavioral health and a small synthetic county. First compare a documented baseline against one clearly labeled hypothetical care-coordination/community-service pilot. Avoid expanding to every insurer and service before baseline validation.

## Status
The initial Python financial-ledger prototype and seven unit tests are committed. The test suite passed locally on 2026-10-08; GitHub Actions is configured to run the tests on pushes and pull requests. A dated source-page verification note is available at [SOURCE_VERIFICATION_2026-10-08.md](docs/SOURCE_VERIFICATION_2026-10-08.md). This is not yet a complete simulator: detailed PS&R/contract rule extraction, source review, calibration, and independent validation remain in progress.
