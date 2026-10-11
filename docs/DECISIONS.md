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

## 2026-10-10 — Lead product: the Learning Lab
- Decision: the Learning Lab is the lead product. The simulator (M0–M5) serves the Lab's hardest lessons rather than the other way around. Rotation units prioritize Lab-facing value: lessons, glossary, and source-linked explainers first; simulator components earn priority when a Lab lesson needs modeled numbers the toy ledger cannot support.
- Alternatives considered: (a) simulator-first — keep building M0–M5 as the main track with the Lab as outreach; (b) parallel tracks with no declared lead.
- Rationale: the Lab is the only surface a real person can touch today, and it is now live on GitHub Pages. The simulator has capability milestones but no named first question and no user; building it first risks a cathedral. The Lab teaches the exact literacy (coverage vs. participation vs. capacity; verified vs. assumed) that the simulator will later assume.
- Evidence: Lab deployed and serving 2026-10-10 (deploy-learning-lab.yml green); simulator at M0 with the audit unmarked and no first scenario named (see CODE_ROADMAP.md).
- Risk: simulator progress slows; Lab content may outrun the simulator's ability to back quantitative lessons. Mitigated by the promotion rule above.
- Reviewer: Luis Vasquez (owner).
- Revisit when: the simulator has a named first scenario tied to a decision it informs, or a Lab lesson requires modeled scenarios beyond the toy ledger — at that point rebalance explicitly instead of drifting.

## Decision protocol
Record date, decision, alternatives, rationale, evidence, risk, reviewer and revisit criteria for every material change.
