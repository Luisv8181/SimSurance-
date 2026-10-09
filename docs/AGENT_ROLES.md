# Multidisciplinary roles and review perspectives

SimSurance is not merely an AI application. It is a policy-research and simulation system. The roles below describe the expertise needed to design, validate, and govern it. They may be separate human collaborators, AI-assisted workflows, or review checklists; an AI role is not a substitute for a qualified professional.

## Core perspectives

### 1. Product and research architect
**Owns:** research questions, scope, assumptions register, roadmap, integration across disciplines.
**Reviews:** whether each feature serves a defined research question and whether claims match the evidence.

### 2. Medicaid and health-policy analyst
**Owns:** policy source mapping, eligibility and coverage concepts, state-plan/waiver context, program authority, effective dates.
**Reviews:** whether rules are current, jurisdiction-specific, and correctly distinguished from proposed policy.

### 3. Health economist and reimbursement analyst
**Owns:** payer/provider incentives, payment mechanisms, utilization, administrative costs, and cost perspectives.
**Reviews:** whether the model distinguishes billed charges, allowed amounts, payments, provider revenue, costs, and societal expenditure.

### 4. Actuarial / financial-model reviewer
**Owns:** financial assumptions, rate and utilization scenarios, budget impact, uncertainty, financial sustainability.
**Reviews:** sensitivity to rates, risk, utilization, trend, and assumptions. Qualified actuarial review is needed for formal actuarial claims.

### 5. Simulation and operations-research engineer
**Owns:** agent-based or discrete-event model design, queues, capacity, scheduling, feedback, repeated experiments.
**Reviews:** model logic, computational behavior, reproducibility, and whether complexity is justified by the question.

### 6. Biostatistics, epidemiology, and causal-inference reviewer
**Owns:** population calibration, parameter estimation, uncertainty intervals, subgroup analysis, validation, and causal limitations.
**Reviews:** representativeness, bias, confounding, statistical stability, and whether comparisons support the conclusions claimed.

### 7. Clinical behavioral-health reviewer
**Owns:** plausible care pathways, treatment engagement, continuity, crisis transitions, and clinically meaningful outcomes.
**Reviews:** whether the model reflects clinical practice without reducing people to stereotypes or deterministic labels.

### 8. Software and data engineer
**Owns:** application architecture, APIs, schemas, data pipelines, versioning, access control, test automation, and observability.
**Reviews:** reliability, data lineage, security, performance, and maintainability.

### 9. Privacy, security, ethics, and governance reviewer
**Owns:** data minimization, synthetic-data boundaries, access controls, threat modeling, governance, and review triggers.
**Reviews:** PHI/PII exposure, re-identification risks, consent and permitted-use issues, and research oversight needs.

### 10. Implementation-science and community reviewer
**Owns:** real-world workflow, adoption barriers, organizational incentives, cultural and linguistic access, lived-experience input.
**Reviews:** feasibility, equity, unintended effects, and whether proposed services can be delivered in practice.

### 11. UX and information-architecture designer
**Owns:** source navigation, acronym glossary, relationship maps, plain-language explanations, dashboard hierarchy, accessibility.
**Reviews:** whether users can move from a term to its source, mechanism, financial implication, and simulation parameter.

### 12. Independent validator / red team
**Owns:** adversarial review, replication checks, edge cases, accounting invariants, source audits, and scenario stress tests.
**Reviews:** hidden assumptions, double counting, leakage between scenarios, false precision, and unsupported claims.

## Collaboration protocol

For any proposed policy scenario, produce a compact review packet:

1. **Policy analyst:** source-backed description of the rule and legal/contractual boundaries.
2. **Economist:** payer/provider flows and intended incentives.
3. **Clinical/community reviewers:** plausible service pathway and access implications.
4. **Simulation engineer:** formal model and explicit assumptions.
5. **Statistician:** calibration, uncertainty, and evaluation plan.
6. **Engineer:** implementation, tests, and run metadata.
7. **Independent validator:** challenge the assumptions and attempt to reproduce the result.

If reviewers disagree, preserve the disagreement in the assumptions register. Do not resolve it by majority vote or by letting an AI choose the most confident-sounding answer.
