# Instructions for coding and research agents

## Mission

Build SimSurance as a transparent, evidence-grounded research platform for behavioral-health policy and financing simulation. Preserve the product pillars and research principles in the README.

## Before changing code

1. Inspect the current repository, existing issues, tests, and project conventions.
2. Read `docs/AGENT_ROLES.md`, `docs/ARCHITECTURE.md`, and `docs/RESEARCH_PLAN.md`.
3. State which user need the change addresses, the assumptions it introduces, and how it will be tested.
4. Prefer small, reviewable changes. Do not replace existing work or select a new stack without first checking what exists.

## Required agent perspectives

Coordinate these roles as perspectives, whether performed by separate agents or one agent in distinct review passes:

- Product / research architect
- Medicaid and health-policy analyst
- Health economist / reimbursement analyst
- Actuarial and financial-model reviewer
- Simulation and operations-research engineer
- Biostatistics / epidemiology / causal-inference reviewer
- Clinical behavioral-health reviewer
- Software and data engineer
- Privacy, security, ethics, and governance reviewer
- Implementation-science and community reviewer
- UX / information-architecture reviewer
- Independent validation / red-team reviewer

Do not treat role labels as credentials. High-stakes policy, legal, actuarial, clinical, and statistical assumptions require qualified human review before external claims are made.

## Evidence and policy rules

- Use primary sources first: CMS, Pennsylvania DHS/OMHSAS, official program manuals, state plans, approved waivers, official rate documents, and applicable contracts.
- Store source title, publisher, URL, jurisdiction, publication/effective dates, retrieval date, relevant passage, and status.
- Every policy parameter must be tagged as one of: `verified_rule`, `derived_value`, `estimated_parameter`, `expert_assumption`, or `hypothetical_scenario`.
- Never invent an acronym expansion, coverage rule, payment rate, legal authority, dataset, citation, or empirical result.
- Distinguish what is legally required, contract-specific, locally implemented, and merely proposed.
- When sources conflict or are outdated, flag the conflict and do not silently select one.
- AI-generated summaries must link back to source passages. The source is authoritative; the summary is not.

## Simulation and finance rules

- Keep policy logic separate from UI code and probabilistic behavior.
- Financial calculations must be deterministic given the same inputs and policy version.
- Record every modeled claim/payment with payer, recipient, service, date/period, allowed amount, paid amount, adjustments, and source/rule reference where applicable.
- Define accounting invariants and test them. Do not count transfers as new societal spending; report payer-level spending and total system spending separately.
- Do not equate billed charges with allowed amounts, paid claims, provider revenue, profit, or societal cost.
- Use common starting populations and controlled random seeds when comparing scenarios where appropriate.
- Report distributions and uncertainty, not only a single average.
- Include sensitivity analyses, adverse scenarios, and subgroup effects.
- Never label simulated savings or improved outcomes as real-world causal effects.

## Data, privacy, and ethics

- Prototype with synthetic data and public aggregate statistics.
- Do not commit PHI, PII, credentials, tokens, private datasets, or unlicensed data.
- Do not create synthetic people by copying identifiable patient records.
- Document provenance, permitted use, missingness, representativeness, and known limitations.
- Require appropriate governance and institutional review before using nonpublic client-level data or conducting human-subjects research.

## Engineering standards

- Prefer typed, modular, testable components and clear interfaces.
- Add tests for new business logic and financial rules.
- Validate inputs and make units, time periods, and payer perspectives explicit.
- Keep simulation configuration separate from code.
- Make runs reproducible with versioned configuration, data identifiers, random seed, code version, and run timestamp.
- Never fabricate a test result. Report commands actually run and failures honestly.
- Do not claim that the app is deployed, a feature works, or a source was verified unless confirmed.

## Review checklist for every feature

- [ ] Is the behavior tied to a documented requirement?
- [ ] Are source and effective date available for policy claims?
- [ ] Are assumptions and uncertainty visible?
- [ ] Are money flows and payer perspectives unambiguous?
- [ ] Are privacy and security implications considered?
- [ ] Are tests included and actually run?
- [ ] Can another researcher reproduce and audit the result?
- [ ] Are limitations stated in the UI or documentation?

## Implementation priority

1. Source register and glossary.
2. Policy Explorer search and source cards.
3. Minimal data schema and policy-parameter registry.
4. Financial ledger with accounting invariants.
5. Small synthetic county baseline.
6. Baseline validation and repeatable run configuration.
7. One hypothetical policy scenario.
8. Outcome comparison dashboard.
9. Broader agent behaviors, additional payers, and more complex clinical transitions only after validation.

Avoid premature multi-agent complexity. Build the smallest valid model first, then expand.


## Current implementation references
Before implementing, also read:
- docs/DEEP_RESEARCH_REPORT.md
- docs/PRODUCT_REQUIREMENTS.md
- docs/CODE_ROADMAP.md
- docs/ASSUMPTIONS_REGISTER.md
- docs/VALIDATION_PLAN.md
- docs/SECURITY_PRIVACY_GOVERNANCE.md
- docs/DECISIONS.md
- docs/AGENT_EXECUTION_PROMPT.md
- docs/THERAPY_IN_BITS_EPISODE.md

Follow the staged roadmap. Start by auditing the real codebase and source data; do not claim the simulator is implemented until it is built and tested.
