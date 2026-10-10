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
8. **Learning Lab** — plain-language education about mental-health insurance and financing, designed for high-school learners through practitioners and policy researchers.

## Learning Lab
**Interactive lessons:** [Learning Lab home](learning-lab/index.html) · [Follow the money](learning-lab/money-flow.html). The money-flow lesson lets learners switch between prospective payments, provider claims, and funding transfers, with a hypothetical calculator and a double-counting exercise.

The Learning Lab teaches the system through metaphors, visual explanations, worked examples, and synthetic cases. It explicitly separates official-source-backed rules from illustrative assumptions.

**Open the live Learning Lab:** [SimSurance Learning Lab](https://luisv8181.github.io/SimSurance-/). The compact visual-first experience includes a care-journey map, interactive money-flow lesson, fictional claim-decision pathway, toy claim calculator, guided cases, knowledge checks, and a plain-language glossary. Source files remain available in [`learning-lab/`](learning-lab/).

- [Learning Lab vision and curriculum](docs/LEARNING_LAB.md)
- [Source-linked Learning Lab design](docs/SOURCE_LINKED_LEARNING_LAB.md) — evidence panels, exact quotations, source registry, audience pathways, and mastery-based lesson loop.
- [Synthetic case studies](docs/LEARNING_LAB_CASES.md)
- [Plain-language glossary](docs/LEARNING_LAB_GLOSSARY.md)
- [Learning Lab implementation plan](docs/LEARNING_LAB_IMPLEMENTATION_PLAN.md)
- [Structured lesson catalog](learning-lab/lessons.json) — lesson IDs, audience levels, status labels, source references, and objectives.
- [Lesson authoring template](learning-lab/LESSON_TEMPLATE.md) — common format with source provenance, metaphor limitations, and accessibility checks.
- [Interactive claim decisions lesson](learning-lab/claim-decisions.html) — a toy adjudication explorer showing paid, not-approved, and needs-review outcomes without encoding real plan rules.
- [Implementation issue #3](https://github.com/Luisv8181/SimSurance-/issues/3)

The static site is deployed through GitHub Pages. Visual refresh work is ongoing; the diagrams are explanatory and fictional claim outcomes are not Pennsylvania coverage determinations. The Pages deployment workflow currently fails because the connected GitHub integration cannot create the Pages site (`Resource not accessible by integration`). A repository owner must enable Pages and select GitHub Actions in repository settings; until then, the page is available in source form but is not confirmed live. All amounts in sample cases are illustrative and must not be treated as Pennsylvania reimbursement rates or real coverage decisions.

## Pennsylvania insurance landscape

- [How practices decide which insurance plans to accept](learning-lab/index.html#practice-payer-decisions) — a practical learning module on client demand, net revenue, credentialing, contract burden, network participation, and ongoing review.
- [Pennsylvania insurance landscape guide](docs/PA_INSURANCE_LANDSCAPE.md) — separates commercial/Marketplace plans, Medicaid physical HealthChoices, Medicaid Behavioral HealthChoices, CHIP, Medicare, and EAP arrangements; links to official state directories and explains what a practice must verify before treating a plan as in-network.
- [Payer evaluation worksheet](learning-lab/index.html#payer-decision-lab) — browser-based evidence-gap checklist with plain-text export, designed for de-identified, practice-level reviews.

## Research principles
- Policy rules link to authoritative sources, passages, jurisdictions and effective dates.
- Distinguish verified rules, derived values, estimated parameters, expert assumptions and hypothetical scenarios.
- Record model/data/code versions, configuration and random seed for each run.
- Begin with synthetic records calibrated to public aggregate evidence; do not use identifiable client data in the prototype.
- Report uncertainty and limitations. Simulation results are conditional estimates, not proof of real-world causal effects or guaranteed savings.
- This is a research and education tool, not an official policy determination, coverage decision, clinical recommendation or legal advice.
- AI agents may research, code and critique; they may not silently invent policy rules, data, citations or results.

## Getting started
Read [the structured official-source registry](docs/sources.registry.json) alongside the [Source Register](docs/SOURCE_REGISTER.md) for stable source IDs and scope/review metadata.

Read [AGENTS.md](AGENTS.md), [the Deep Research Report](docs/DEEP_RESEARCH_REPORT.md), [Product Requirements](docs/PRODUCT_REQUIREMENTS.md), [Code Roadmap](docs/CODE_ROADMAP.md), [Architecture](docs/ARCHITECTURE.md), [Agent Roles](docs/AGENT_ROLES.md), [Research Plan](docs/RESEARCH_PLAN.md), [Source Register](docs/SOURCE_REGISTER.md), [Glossary](docs/GLOSSARY.md), [Assumptions Register](docs/ASSUMPTIONS_REGISTER.md), [Validation Plan](docs/VALIDATION_PLAN.md), [Security/Privacy/Governance](docs/SECURITY_PRIVACY_GOVERNANCE.md), [Decision Log](docs/DECISIONS.md), and the [Agent Execution Prompt](docs/AGENT_EXECUTION_PROMPT.md).

## Initial scope
Begin with Pennsylvania Medicaid behavioral health and a small synthetic county. First compare a documented baseline against one clearly labeled hypothetical care-coordination/community-service pilot. Avoid expanding to every insurer and service before baseline validation.

## Status
The initial Python financial ledger, source-aware policy registry, toy claim adjudicator, and 14 unit tests are committed. The 14-test suite passed locally; GitHub Actions is configured to run tests on pushes and pull requests, and the policy/ledger test runs have succeeded. A dated source-page verification note is available at [SOURCE_VERIFICATION_2026-10-08.md](docs/SOURCE_VERIFICATION_2026-10-08.md), and the hand-calculated hypothetical example is documented in [TOY_ADJUDICATION.md](docs/TOY_ADJUDICATION.md). This is not yet a complete simulator: detailed PS&R/contract rule extraction, source review, calibration, and independent validation remain in progress.
