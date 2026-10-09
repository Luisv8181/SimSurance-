# SimSurance Architecture and Research Decision Log

## 2026-10-08 — Initial direction
- Mission: source-grounded exploration and simulation of behavioral-health financing, initially Pennsylvania Medicaid behavioral health.
- Workflow: source → reviewed rule/parameter → service event → financial ledger → scenario comparison.
- Prototype inputs: synthetic records and public aggregates.
- Modeling: begin hybrid microsimulation/discrete-event; add agent interactions only when justified.
- Finance: separate transfers, payer-level expenditure and consolidated system cost; avoid capitation/claims double counting.
- Provenance classes: verified rule, derived value, estimated parameter, expert assumption, hypothetical scenario.
- Interpretation: results are conditional simulations, not causal findings or guaranteed savings.
- Stack: not locked; inspect current repo and deployment before changes.
- Open decisions: county/region, first service set, pilot question and source versions.

## Decision protocol
Record date, decision, alternatives, rationale, evidence, risk, reviewer and revisit criteria for every material change.
