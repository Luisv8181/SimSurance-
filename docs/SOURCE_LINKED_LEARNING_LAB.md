# Source-Linked Learning Lab: Product and Evidence Design

## Mission

Help people understand Pennsylvania behavioral-health financing and service delivery well enough to navigate care, operate a practice, advocate effectively, and evaluate reforms. SimSurance teaches the system, not just its vocabulary.

## Learning model

Every lesson follows a consistent loop:

1. **Encounter a real question** through a short, human-centered scenario.
2. **Make a prediction** or choose an action before reading the explanation.
3. **See the system** through a visual model or interactive simulation.
4. **Learn the concept** in plain language with one central takeaway.
5. **Inspect the evidence** in a source drawer without losing lesson progress.
6. **Interpret the evidence**: what the passage says, what it does not establish, and when it applies.
7. **Practice again** in a different case.
8. **Review later** if the learner had difficulty with the concept.

A lesson should take approximately 3–7 minutes. A concept should be introduced before technical vocabulary is required. Secondary detail belongs in expandable panels, not in the learner's main path.

## Audience entry points

- **Understand my care** — coverage, finding care, network participation, denials, complaints, grievances, appeals, and member resources.
- **Run a practice** — provider enrollment, contracting, credentialing, documentation, claims, payment, audits, and operational sustainability.
- **Advocate for change** — access standards, accountability, quality reports, financing, stakeholder roles, and evidence-based policy questions.
- **Research the system** — source provenance, policy mechanics, financial flows, model assumptions, data limitations, and scenario experiments.

These are different views over a shared knowledge graph. They must not imply that one audience's rules automatically apply to another.

## Evidence panel specification

Every policy-specific claim should have an adjacent **Show the source** action. The source panel should display:

- Exact short quotation, checked against the original source.
- Document title and issuing body.
- Section, page, table, or paragraph identifier.
- Publication/version date and effective date, where applicable.
- Direct link to the official document.
- Jurisdiction and scope: statewide, county/primary contractor, BH-MCO, provider contract, service-specific, or guidance.
- Evidence status: **Verified source**, **Interpretation**, **Conflicting sources**, **Historical**, or **Unresolved**.
- Plain-language explanation of the passage.
- **What this passage does not establish** and any important context or cross-references.
- Retrieval/verification date and supersession information when known.

Quote only the short excerpt necessary to teach the concept, attribute it, and link to the original. Do not reproduce entire manuals. Do not generate quotations from a summary or search snippet. Verify wording against the source itself before publication.

## Source registry

Use stable IDs and versioned records. Suggested fields:

`source_id`, `title`, `issuer`, `canonical_url`, `document_type`, `publication_date`, `effective_from`, `effective_to`, `retrieved_at`, `jurisdiction`, `audiences`, `section_locator`, `page_locator`, `source_status`, `supersedes`, `superseded_by`, `verification_notes`.

Keep exact excerpt records separate from source metadata:

`excerpt_id`, `source_id`, `exact_text`, `locator`, `context_summary`, `interpretation`, `limits`, `verified_by`, `verified_at`.

Policy rules must reference source/excerpt IDs and effective dates. No unresolved, illustrative, historical-only, or conflicting claim should silently become an executable current rule.

## Evidence categories

- **Binding program/contract requirement** — only when the source and applicability support that characterization.
- **Official guidance** — guidance, not automatically a binding requirement.
- **MCO/provider-specific requirement** — applies only to the named plan, contract, provider type, service, and relevant date.
- **Official report/data** — evidence about performance or outcomes, not automatically a rule.
- **Interpretation** — reasoned explanation that must remain distinguishable from source wording.
- **Illustrative model** — invented scenario or parameter used for teaching; never represent as a real rate or policy rule.
- **Unresolved/conflicting** — explicitly show the uncertainty and do not use as a definitive answer.

## Initial vertical slice

**Lesson:** Why can someone have insurance and still struggle to find a therapist?

Teach the distinction among:
1. Eligibility/coverage.
2. Whether a provider participates in the relevant network and is accepting new clients.
3. Actual provider capacity and wait time.
4. Practical barriers such as location, scheduling, language, accessibility, and coordination.

The lesson must include a prediction question, a visual care-access map, an interactive fictional case, short verified excerpts from relevant official sources, context/limitations for each excerpt, a member-resource route, a provider/operations route, a mastery check, and a transfer case.

Pennsylvania DHS's Behavioral HealthChoices overview and provider pages are starting points, not substitutes for verifying every downstream policy claim:
- https://www.pa.gov/agencies/dhs/resources/medicaid/bhc
- https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers
- https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications
- https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-systems-management
- https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-mcos

The publication index lists the Program Standards and Requirements, appendices, 2026 Financial Reporting Requirements, ASAM provider rates effective January 1, 2026, and the 2026 OMHSAS Member Handbook. Each item must be separately retrieved, versioned, and checked for applicability before quoting or encoding policy.

## Interface principles

- Show one core idea per screen.
- Prefer diagrams and decisions to explanatory walls of text.
- Keep progress and lesson navigation visible.
- Open source material in an in-page drawer or side panel; do not lose the learner's place.
- Explain wrong answers with reasoning, not only red/green marks.
- Make repetition supportive, not punitive. No streak or leaderboard should substitute for mastery.
- Use mobile-first layouts, keyboard navigation, readable contrast, reduced-motion support, and expandable technical detail.
- Add a practical **What can I do next?** section for verified member, advocate, provider, or research actions.

## Trust and safety

SimSurance is an educational and research tool, not a legal opinion, a coverage determination, or a substitute for plan-specific confirmation. Statewide rules, county arrangements, BH-MCO manuals, service-specific requirements, and provider contracts may differ. Surface that distinction wherever relevant.

## Definition of done

- Every policy-specific lesson has source metadata and evidence status.
- Exact quotations are verified against the original document and linked to a locator.
- Effective dates and applicability are visible.
- Tests validate required source fields, excerpt attribution, status labels, link presence, and lesson navigation.
- A beginner can finish the first lesson and explain coverage versus access in a new scenario.
- A provider can identify which source to consult next without being told an unverified rule.
- An advocate can trace an explanation back to the original source and understand the limits of that evidence.
