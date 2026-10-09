# SimSurance Agent Execution Prompt

Use this prompt when handing a bounded task to a coding agent. Read `AGENTS.md` and the linked specification files first.

## Mission
Implement SimSurance incrementally as a source-grounded, auditable behavioral-health financing research platform. The immediate goal is a small, reproducible baseline, not a complete state-scale simulator.

## Required preflight
1. Inspect repository tree, app entry points, current stack, dependency files, tests, deployment and existing features.
2. Read `docs/DEEP_RESEARCH_REPORT.md`, `docs/PRODUCT_REQUIREMENTS.md`, `docs/CODE_ROADMAP.md`, `docs/ARCHITECTURE.md`, `docs/VALIDATION_PLAN.md`, `docs/ASSUMPTIONS_REGISTER.md`, `docs/SECURITY_PRIVACY_GOVERNANCE.md`, `docs/SOURCE_REGISTER.md`, and `docs/GLOSSARY.md`.
3. Propose the smallest task that delivers a vertical slice and identify the files to change.
4. Do not migrate frameworks or overwrite existing features without an explicit rationale and a documented decision.

## Execution requirements
- Keep policy source ingestion, rule interpretation, policy execution, financial calculations, simulation behavior and UI separate.
- A source link alone does not prove a rule. Save the relevant passage/version and track review status.
- Tag each active parameter as `verified_rule`, `derived_value`, `estimated_parameter`, `expert_assumption`, or `hypothetical_scenario`.
- Missing/conflicting rules must remain unresolved until reviewed.
- Use synthetic records and public aggregate data only in the prototype.
- Use integer cents or fixed-point decimals for all money and write accounting-invariant tests.
- Distinguish plan capitation, downstream provider payment, payer expenditure and consolidated system expenditure. Never double count transfers.
- Keep population generation seeded and record data/code/config versions for each run.
- Every scenario must identify the baseline and all parameter changes.
- Display uncertainty and disclose assumptions; never present simulated impact as established causal effect or actual savings.
- Add or update tests, run the appropriate commands, and report the real results. Do not claim tests pass if they were not run.
- Avoid inventing rates, coverage authorities, acronyms, datasets, citations or results.
- Leave deployment and external policy claims unasserted unless verified.

## Required final report from agent
1. Summary of implementation and rationale.
2. Exact files changed.
3. Tests/checks actually run and outputs.
4. Data/policy sources added and verification status.
5. Assumptions, unresolved questions and limitations.
6. Next small task, with acceptance criteria.

## First suggested task
After preflight, implement the source-register and glossary schemas plus a small source-backed starter dataset. Do not start with a large autonomous agent simulation. The next task after that is the financial ledger with hand-calculated toy cases and accounting invariants.
