# SimSurance Code Roadmap

This roadmap is a living plan. Mark tasks complete only after implementation and verification.

## Release gates
- **A — Source foundations:** policy concepts and glossary are traceable to current sources.
- **B — Financial correctness:** toy claims reconcile and accounting invariants pass.
- **C — Baseline reproducibility:** seeded runs reproduce under documented conditions.
- **D — Scenario comparison:** one hypothetical pilot is compared against baseline with uncertainty.
- **E — External review:** policy, clinical, financial and statistical reviewers inspect assumptions before policy-facing claims.

## M0: Repository audit
- [ ] Inspect stack, entry points, dependencies, current features, tests, deployment, license, branch and CI.
- [ ] Write architecture decisions to docs/DECISIONS.md.
- [ ] Preserve working features and avoid stack migration before need is established.
- Acceptance: documented setup and reproducible starting build/test, or explicit blockers.

## M1: Source Explorer
- [ ] Add source metadata schema, validation and provenance.
- [ ] Register current PA DHS HealthChoices BH/CMS primary sources with versions/effective dates.
- [ ] Build glossary entries with supporting passages, reviewer and verification state.
- [ ] Search acronym, policy term, service, program, source and passage.
- Acceptance: every definition traces to a source; AI summaries are not presented as authoritative text.

## M2: Policy Parameter Registry
- [ ] Define versioned rules/parameters, units, jurisdictions, program and effective intervals.
- [ ] Implement rule resolution with decision, reason, source refs and review state.
- [ ] Support unknown/conflicting/needs-review status.
- Acceptance: tests prove date-versioned resolution; unresolved policy never silently becomes an approval/denial.

## M3: Financial Ledger
- [ ] Model payer/payee and transaction types.
- [ ] Use integer cents or fixed-point decimals.
- [ ] Implement synthetic service events, claim adjudication, payment, denial, reversal and adjustment.
- [ ] Add reconciliation by payer/payee/service/period.
- [ ] Keep capitation and provider claims at separate levels to prevent double counting.
- Acceptance: hand-calculated toy cases pass all accounting invariants and trace to rules.

## M4: Synthetic County
- [ ] Define synthetic person/provider schema.
- [ ] Implement seeded population generation and record calibration targets/provenance.
- [ ] Document aggregate mismatches and limitations.
- [ ] Add finite provider capacity, slots, referral and queue/wait logic.
- Acceptance: repeatable population, explicit assumptions, no real-client data.

## M5: Baseline Simulator
- [ ] Connect demand, capacity, policy, events and ledger.
- [ ] Store run metadata, config hash, data/code/policy versions, seed and replication count.
- [ ] Generate baseline report and dashboard data.
- Acceptance: reproducible test runs, reconciled money, metrics traceable to events.

## M6: First Counterfactual
- [ ] Define one clearly hypothetical care-coordination/community service pilot.
- [ ] Specify assumed/verified funding authority, payment unit/rate, target population, workforce capacity, uptake and overhead.
- [ ] Compare baseline/pilot using documented seed/replication strategy.
- [ ] Add sensitivity and stress tests.
- Acceptance: scenario delta and uncertainty visible; no claims of real-world causation or guaranteed savings.

## M7: Dashboard and exports
- [ ] Show source cards and modified parameters.
- [ ] Compare access, wait, unmet need, service use, continuity, outcome proxies, crisis use, provider capacity, payer and total-system costs.
- [ ] Export source/parameter/run manifest, CSV/JSON, and readable report.
- [ ] Label observed, estimated, assumed and simulated values.
- Acceptance: external reviewer can reproduce a run from its manifest.

## M8: Validation and hardening
- [ ] External review by Medicaid policy/finance, clinical, modeling/statistics and community perspectives.
- [ ] Calibrate to aligned benchmarks; hold out independent data where feasible.
- [ ] Publish sensitivity, structural limits, failures and missing data.
- Acceptance: bounded use and unresolved issues explicitly documented.

## First implementation tickets
1. Repository/stack audit and decisions log.
2. Deep research report and PRD.
3. Source-register schema and primary-source seed.
4. Source-grounded glossary.
5. Policy-parameter schema and rule resolver.
6. Financial ledger and accounting invariants.
7. Toy adjudication scenarios/tests.
8. Seeded synthetic population plus calibration summary.
9. Provider capacity and queue model.
10. Baseline runner with full run manifest.
11. Scenario diff and sensitivity runner.
12. Policy Explorer UI.
13. Outcomes dashboard and report export.
14. CI and reproducibility/security checks.
15. Reviewer packet and limitations report.

## Agent task protocol
Each task must define goal, allowed files, evidence dependencies, explicit assumptions, tests, acceptance criteria and required reviewer. Avoid concurrent writes to one file; one integrator owns cross-module interfaces.

- Policy/source agent: source register, glossary and passages; cannot invent/approve policy.
- Finance agent: ledger and accounting tests; separate payer views and consolidated cost.
- Simulation agent: population, events, capacity and runner.
- Statistics/validation agent: calibration, uncertainty and independent critique.
- UI agent: source explorer and dashboard, exposing provenance and limitations.
- Security/ethics agent: threat model, synthetic data, governance.
- Integrator/red-team: interfaces, test execution, reconciliation and honest status report.

## Definition of done
Requirements met; provenance documented; relevant tests added and actually run; money reconciles; privacy/security considered; uncertainty shown; docs updated; no unsupported policy/clinical/savings/deployment claims.
