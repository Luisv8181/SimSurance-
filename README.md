# SimSurance

**A research platform for simulating mental-health policy, insurance rules, Medicaid financing, service delivery, and population outcomes.**

SimSurance is envisioned as an auditable virtual-county laboratory. Researchers can encode documented policy rules, construct a synthetic population calibrated to public evidence, model provider capacity and payment flows, and compare a baseline system with proposed policy scenarios.

The core question:

> Under what conditions do alternative behavioral-health financing and service-delivery policies improve access, outcomes, equity, and financial sustainability compared with the existing system?

## Product pillars

1. **Medicaid Policy Explorer** — searchable primary sources, acronyms, definitions, effective dates, source passages, policy relationships, and uncertainty labels.
2. **Virtual County** — synthetic individuals and households, provider organizations, service capacity, referral pathways, and access barriers calibrated to published data.
3. **Policy and Coverage Engine** — versioned, explicit rules for eligibility, covered services, authorization, provider qualifications, and reimbursement.
4. **Financial Engine** — auditable claims, payments, budgets, operating costs, payer-level expenditure, and cash-flow accounting.
5. **Simulation Lab** — reproducible baseline and policy scenarios, repeated runs, sensitivity analysis, and uncertainty intervals.
6. **Outcomes Dashboard** — access, wait times, unmet need, continuity, clinical outcomes, equity, workforce capacity, and financial sustainability.
7. **Research Learning Loop** — source → model → simulate → validate → compare → refine, with assumptions and limitations attached to every result.

## Research principles

- **Source-grounded:** policy rules must link to authoritative sources, specific passages, jurisdictions, and effective dates.
- **Auditable:** every modeled decision and financial transaction should be explainable and traceable.
- **Reproducible:** record model version, data version, configuration, random seed, and run metadata.
- **Explicit about uncertainty:** distinguish observed data, estimated parameters, expert assumptions, and hypothetical policy choices.
- **Synthetic by default:** begin with synthetic records calibrated to aggregate public data. Do not use identifiable client records in the prototype.
- **No false precision:** simulated outcomes are conditional estimates, not proof that a policy will work in the real world.
- **Policy/legal boundary:** the platform supports research and education; it does not determine individual eligibility, make coverage decisions, or provide legal advice.
- **Human accountability:** AI agents may help research, code, summarize, and critique. They may not silently invent policy rules, data, citations, or model results.

## Initial scope

Start with Pennsylvania Medicaid behavioral health and a deliberately small, transparent county model. The first experiment should compare a documented baseline with a clearly labeled hypothetical care-coordination pilot. Do not model every insurer or every service before the baseline is validated.

## Suggested repository map

- `AGENTS.md` — instructions for coding and research agents
- `docs/AGENT_ROLES.md` — multidisciplinary expert perspectives and review duties
- `docs/ARCHITECTURE.md` — system boundaries, components, and data flow
- `docs/RESEARCH_PLAN.md` — research questions, first experiment, validation, and limitations
- `docs/SOURCE_REGISTER.md` — primary-source inventory and source-quality rules
- `docs/GLOSSARY.md` — acronym and concept dictionary
- `src/` — application and simulation code (to be established after stack selection)
- `tests/` — unit, integration, accounting-invariant, and reproducibility tests

## Status

Early-stage concept and research scaffold. A functioning simulator, validated policy engine, calibrated population, and empirical findings should not be claimed until implemented and tested.

## Working agreement

See [AGENTS.md](AGENTS.md) and the documents in [docs/](docs/) before implementing features.
