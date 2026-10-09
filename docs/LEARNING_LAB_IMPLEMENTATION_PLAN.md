# Learning Lab Implementation Plan

## Product goal
Build a GitHub Pages learning experience alongside SimSurance's auditable simulation core. It should be useful before every real Pennsylvania policy rule has been encoded, while clearly separating educational examples from verified policy.

## Information architecture
- **Home:** "How does mental health insurance actually work?" with Explore, Understand, and Investigate paths.
- **Start with a story:** a fictional person navigating the path to care.
- **How the money moves:** actors and financial flows, distinguishing transfers from service costs.
- **Insurance dictionary:** plain-language glossary.
- **Case files:** guided fictional cases and alternative outcomes.
- **Try the model:** transparent toy calculations, followed by source-backed simulations when available.
- **Source room:** official documents, version dates, sections, and verification status.
- **About the model:** limitations, assumptions, privacy, and contribution guidance.

## MVP sequence

### Milestone 1: Content foundation
- Publish principles, glossary, and initial cases.
- Mark every invented amount and rule as illustrative.
- Separate education, simulation, and policy guidance.
- Review copy for reading level and accessibility.

### Milestone 2: Static GitHub Pages
- Inspect the existing frontend and Pages configuration before selecting a framework.
- Add responsive navigation without breaking the current site.
- Render lessons from structured Markdown or JSON content.
- Add source/status labels: official-source-verified, illustrative, needs-review, and historical.

### Milestone 3: Guided activities
- Add a claim example showing billed charge → allowed amount → payer payment/member responsibility under invented assumptions.
- Add a care-journey activity separating coverage, network, authorization, and capacity.
- Add a funding-flow activity that warns against double counting.
- Explain answers instead of only scoring them.

### Milestone 4: Connect to simulator core
- Consume ledger and policy-registry outputs rather than reimplementing financial logic in the browser.
- Show rule IDs, source version, inputs, arithmetic, and unresolved conditions.
- Preserve fail-closed behavior: unknown or conflicting rules produce an unresolved/review result.
- Ensure illustrative content cannot be mistaken for live adjudication.

## Content schema
Each lesson/case should include an ID, title, audience level, learning objectives, story, metaphor, metaphor limitations, steps, knowledge check, source references, status, last-reviewed date, model dependencies, and disclaimer.

Each rule-linked claim should reference a source record with title, publisher, URL, version/effective date, section, exact passage or precise extraction reference, applicability, reviewer, and verification status.

## Quality gates
- No invented numbers presented as actual Pennsylvania rates.
- No official policy assertion without a source and applicable date.
- No real patient data.
- No real claim adjudication or benefit advice in the learning-only MVP.
- Do not add capitation and downstream service payments together without a documented accounting perspective.
- Keyboard-accessible interactions and readable mobile layout.
- Automated checks for required content fields, internal links, and illustrative labels.

## Definition of done
A student can complete at least three lessons, explain coverage versus access, trace a fictional claim calculation, and identify which parts are invented. An advanced learner can follow source links and understand why examples do not establish real-world eligibility or reimbursement.
