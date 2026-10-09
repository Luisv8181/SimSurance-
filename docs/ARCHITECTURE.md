# System architecture

## Design goal

Connect authoritative policy evidence to an executable, auditable simulation without allowing AI-generated text to become an unverified rule.

## Logical components

### A. Source and policy knowledge layer
- Source register: official documents, jurisdiction, publisher, URL, publication date, effective period, retrieval date, status.
- Document passages: source-linked excerpts and section identifiers.
- Glossary: acronym expansion, plain-language definition, related concepts, source links.
- Policy parameter registry: value, unit, jurisdiction, effective dates, provenance category, confidence/uncertainty, reviewer, and source passage.
- Change history: detect and review changes to policy documents and parameters.

### B. Policy engine
Represent eligibility, covered service definitions, provider qualifications, authorization, limits, and reimbursement rules as versioned, testable rules. Rules should return both a decision and an explanation that identifies the applicable rule and source. Unknown rules must return an explicit unresolved state rather than silently defaulting to approval or denial.

### C. Synthetic population
Represent individuals/households using documented distributions and synthetic attributes such as age band, insurance category, geography, language needs, clinical needs, access barriers, and service history. Store no direct identifiers. Avoid implying that a synthetic individual is a real patient.

### D. Provider and service network
Represent provider organizations, workforce types, capacity, service locations, operating hours, referral pathways, waitlists, and unit costs. Make assumptions about hiring, turnover, travel, and service availability explicit.

### E. Behavioral and clinical process model
Use simple, evidence-informed probabilities and transition rules for seeking care, referral, attendance, dropout, continuity, and outcomes. Keep behavioral assumptions separate from legal and payment rules. Do not make an LLM the source of truth for numerical transitions.

### F. Financial ledger
Model service events, claims, adjudication, payments, denials, adjustments, administrative costs, grants, and budgets. Each transaction should have a unique ID, payer, recipient, period, service category, amount, rule/version reference, and scenario/run identifier.

Required accounting distinctions:
- Billed charge
- Allowed amount
- Paid amount
- Member cost-sharing, where applicable
- Provider operating cost
- Payer expenditure
- Transfers between organizations
- Total system expenditure from a clearly defined perspective

Avoid double-counting transfers as new system costs.

### G. Scenario manager and simulation runner
A run should specify:
- Baseline or scenario ID
- Policy version and parameters
- Population/data version
- Model/code version
- Random seed
- Time horizon and time step/event semantics
- Replication count
- Run timestamp
- Validation status

Use paired or common-random-number comparisons where appropriate, and document when scenario logic changes the random process.

### H. Outcomes and reporting
Report distributions and uncertainty for:
- Access and unmet need
- Time to first appointment and waitlists
- Service utilization and continuity
- Clinical outcome proxies, with caveats
- Crisis and higher-acuity service utilization
- Provider capacity, workload, revenue, and sustainability
- Expenditure by payer and service
- Equity by relevant subgroups

Each visualization should disclose whether values are observed, estimated, assumed, or simulated.

## Suggested initial technology boundaries

Do not lock the stack until the existing repository and deployment constraints are reviewed. Keep the core simulation as a testable library independent of the web UI. A relational database can hold normalized policy metadata, scenario configurations, and run results; large synthetic event histories may later require optimized storage. The initial prototype can use local files and a lightweight database if this speeds validation.

## Data flow

1. Researcher searches a policy term.
2. Explorer returns a definition and primary-source passages.
3. Researcher or qualified reviewer records a parameter and provenance.
4. Scenario configuration selects a versioned parameter set.
5. Simulation generates service events and financial transactions.
6. Validation checks invariants and expected ranges.
7. Dashboard compares scenarios and displays uncertainty and limitations.
8. Results export with full run metadata and source references.

## Non-goals for the first prototype

- Individual clinical decision support
- Real eligibility or coverage determinations
- Production claims adjudication
- Predicting outcomes for a real identified person
- Treating LLM-generated agents as empirically validated human behavior
- Claiming real-world savings or causal effects from simulation alone
