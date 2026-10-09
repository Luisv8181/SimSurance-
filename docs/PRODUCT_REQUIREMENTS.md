# SimSurance Product Requirements

## Product statement
An educational and research platform for exploring how behavioral-health policy and financing may influence access, utilization, outcomes, equity and financial sustainability. Combines a source-grounded Medicaid Policy Explorer with an auditable virtual-county simulator.

## Users
Clinicians/counselors; Medicaid and behavioral-health policy researchers; health economists/actuaries; simulation scientists/data analysts; advocates/program leaders; educational content creators.

## Main user journeys
1. Search an acronym/policy concept and read a plain-language explanation linked to an authoritative source and passage.
2. See jurisdiction, program, publication/effective date, version and verification state.
3. Trace a rule into a parameter, service event and financial transaction.
4. Configure a baseline and a clearly labeled scenario without silently changing verified policy.
5. Run reproducible simulations and inspect uncertainty and limitations.
6. Compare payer-specific and consolidated financial views without double-counting transfers.
7. Export a run manifest, data assumptions, source register and report.

## Functional requirements

### Source Explorer
- Search terms, acronyms, sources, programs, services and passages.
- Display canonical source metadata and supporting passages.
- Link related concepts and policy relationships.
- Show verified, needs-review, proposed, superseded and ambiguous statuses.
- Keep source text separate from AI-generated explanation.

### Policy Registry
- Store rules/parameters with provenance, jurisdiction, program, dates, units, assumptions and review state.
- Version all changes and preserve prior runs.
- Return rationale and source references for policy decisions.
- Show unresolved rules instead of guessing.

### Virtual County
- Seeded synthetic population calibrated to appropriate public aggregate data.
- Explicit enrollment, needs assumptions, access barriers and provider capacity.
- Queue/wait-time logic only where justified.
- No direct identifiers or claims of representing real people.

### Financial Engine
- Separate encounter, claim, adjudication, payment, transfer, capitation, adjustment and reversal event types.
- Track billed, allowed and paid amounts separately.
- Preserve correct payment layers and payer/system boundaries.
- Decimal-safe money and complete audit trail.

### Simulation Lab
- Run baseline and policy configurations.
- Record code/data/policy versions, configuration hash, seed and replications.
- Support repeated runs, sensitivity and stress testing.
- Report uncertainty and subgroup effects only where supported.

### Dashboard and exports
- Compare access, wait, unmet need, utilization, continuity, clinical proxies, crisis use, capacity, provider sustainability and expenditure.
- Mark values observed/estimated/assumed/simulated.
- Export CSV/JSON and report with reproducibility manifest.
- Clear disclaimer: not official policy, legal advice, coverage determination, clinical guidance, actuarial opinion or proof of cost savings.

## Non-functional requirements
- Testable simulation core independent of UI.
- Typed schemas with explicit units and periods.
- Versioned sources and parameters, audit trail.
- Accessible, plain-language UX.
- Privacy by design.
- Modularity and a validated small baseline before expansion.
- Graceful handling of missing/conflicting/outdated evidence.

## Out of scope for MVP
- Individual clinical decision support or real-person prediction.
- Production claims adjudication or eligibility determinations.
- Whole-state high-fidelity simulation.
- Every payer and service.
- LLMs acting as source of truth for behavior, rules, rates or outcomes.
- Causal claims or guaranteed savings from simulation alone.

## Success criteria
- A term search returns definition plus authoritative source/passage.
- Unknown rules are visibly unresolved and not executable by default.
- Toy claim scenarios reconcile against hand-calculated expected results.
- Seeded runs reproduce within a documented environment.
- Baseline/pilot comparison reports assumptions, uncertainty and payer/system views.
- Independent reviewers can trace results to rules, sources, events and ledger entries.
