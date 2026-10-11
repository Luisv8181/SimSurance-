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
**Interactive lessons:** [Learning Lab home](learning-lab/index.html) · [Follow the money](learning-lab/money-flow.html) · [Claim decisions](learning-lab/claim-decisions.html) · [Compare journeys](learning-lab/journeys.html) · [How to read a policy source](learning-lab/reading-policy.html) · [Virtual County & Capacity Simulator](learning-lab/county-lab.html).

The Learning Lab teaches the system through metaphors, visual explanations, worked examples, and synthetic cases. It explicitly separates official-source-backed rules from illustrative assumptions, includes a slide-out **Source Evidence Drawer** backed by [`docs/sources.registry.json`](docs/sources.registry.json), supports **Light / Dark / High-Contrast** accessibility themes, and tracks learner mastery across 8 interactive checkpoints.

**Open the live Learning Lab:** [SimSurance Learning Lab](https://luisv8181.github.io/SimSurance-/). The compact visual-first experience includes role-based entry points (*Member/Family*, *Clinician/Practice*, *Advocate/Student*, *Policy Researcher*), a care-journey map, interactive money-flow lesson, fictional claim-decision pathway, 6-part policy provenance inspector, 52-week virtual county queue & ledger simulator, payer evaluation worksheet, and a plain-language glossary. Source files remain available in [`learning-lab/`](learning-lab/).

- [Learning Lab vision and curriculum](docs/LEARNING_LAB.md)
- [Source-linked Learning Lab design](docs/SOURCE_LINKED_LEARNING_LAB.md) — evidence panels, exact quotations, source registry, audience pathways, and mastery-based lesson loop.
- [Virtual County & Simulation Model (M4–M7)](docs/SIMULATION_MODEL.md) — synthetic population, provider slot queues, Common Random Numbers (CRN) counterfactual comparison, and accounting invariants.
- [Synthetic case studies](docs/LEARNING_LAB_CASES.md)
- [Plain-language glossary](docs/LEARNING_LAB_GLOSSARY.md)
- [Learning Lab implementation plan](docs/LEARNING_LAB_IMPLEMENTATION_PLAN.md)
- [Structured lesson catalog](learning-lab/lessons.json) — lesson IDs, audience levels, status labels, source references, and objectives.
- [Lesson authoring template](learning-lab/LESSON_TEMPLATE.md) — common format with source provenance, metaphor limitations, and accessibility checks.
- [Interactive claim decisions lesson](learning-lab/claim-decisions.html) — a toy adjudication explorer showing paid, not-approved, and needs-review outcomes without encoding real plan rules.
- [Interactive policy-reading lesson](learning-lab/reading-policy.html) — inspect real PA DHS source records and test provenance boundaries before encoding rules.
- [Interactive virtual county simulator](learning-lab/county-lab.html) — explore 52-week queue dynamics and capitation vs. claim accounting across 30 replications.

All amounts in sample cases and virtual county runs are illustrative (`hypothetical_scenario`) and must not be treated as Pennsylvania reimbursement rates, empirical prevalence estimates, or real coverage decisions.

## Pennsylvania insurance landscape

- [How practices decide which insurance plans to accept](learning-lab/index.html#practice-payer-decisions) — a practical learning module on client demand, net revenue, credentialing, contract burden, network participation, and ongoing review.
- [Pennsylvania insurance landscape guide](docs/PA_INSURANCE_LANDSCAPE.md) — separates commercial/Marketplace plans, Medicaid physical HealthChoices, Medicaid Behavioral HealthChoices, CHIP, Medicare, and EAP arrangements; links to official state directories and explains what a practice must verify before treating a plan as in-network.
- [Payer evaluation worksheet](learning-lab/index.html#payer-decision-lab) — browser-based evidence-gap checklist with plain-text export, designed for de-identified, practice-level reviews.
- [Official-source library](learning-lab/index.html#source-library) — quick links to Pennsylvania program directories and guidance for checking source applicability.

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

Read [AGENTS.md](AGENTS.md), [the Deep Research Report](docs/DEEP_RESEARCH_REPORT.md), [Product Requirements](docs/PRODUCT_REQUIREMENTS.md), [Code Roadmap](docs/CODE_ROADMAP.md), [Architecture](docs/ARCHITECTURE.md), [Simulation Model](docs/SIMULATION_MODEL.md), [Agent Roles](docs/AGENT_ROLES.md), [Research Plan](docs/RESEARCH_PLAN.md), [Source Register](docs/SOURCE_REGISTER.md), [Glossary](docs/GLOSSARY.md), [Assumptions Register](docs/ASSUMPTIONS_REGISTER.md), [Validation Plan](docs/VALIDATION_PLAN.md), [Security/Privacy/Governance](docs/SECURITY_PRIVACY_GOVERNANCE.md), [Decision Log](docs/DECISIONS.md), and the [Agent Execution Prompt](docs/AGENT_EXECUTION_PROMPT.md).

## Running tests & regenerating simulation data
```bash
PYTHONPATH=src python -m unittest discover -s tests -p "test_*.py" -v
PYTHONPATH=src python scripts/export_lab_data.py
```

## Status
Milestones **M0–M7** are implemented and verified by a **40-test suite** (`tests/test_policy.py`, `tests/test_ledger.py`, `tests/test_county_simulation.py`, and `tests/test_learning_lab.py`):
- **Policy & Ledger Core (`src/simsurance/policy.py`, `src/simsurance/ledger.py`)**: Date-versioned rule resolution with `NEEDS_REVIEW` uncertainty handling and integer-cent accounting that strictly separates upstream `CAPITATION` transfers from downstream `SERVICE_PAYMENT` and `ADMINISTRATIVE_COST` system costs.
- **Virtual County & 52-Week Discrete-Event Simulator (`src/simsurance/county.py`, `src/simsurance/simulator.py`, `src/simsurance/runner.py`)**: Seeded synthetic population and provider network (`config/toy_county.json`) using Common Random Numbers (CRN) across 30 replications and 4 capacity multipliers (`0.75x`–`1.5x`) to compare baseline operations against a hypothetical care-coordination pilot (`learning-lab/data/county-sim.json`).
- **Source-Linked Learning Lab (`learning-lab/`)**: Six interactive HTML modules with Light/Dark/High-Contrast themes, slide-out Source Evidence Drawer, role-based entry points, inline SVG diagrams, and persistent mastery tracking. Detailed PS&R/contract clause extraction and external calibration (M8) remain gated on human policy review.
