# SimSurance Learning Lab

## Purpose
The Learning Lab makes the financing and operation of the mental health insurance system understandable to the public. A high-school student should be able to build a correct mental model without learning insurance vocabulary first, while advanced learners can inspect sources, assumptions, and calculations. The Lab complements the simulator; it does not replace official plan documents or policy.

## Principles
1. Start with a human question: Why can someone have insurance and still struggle to get an appointment?
2. Explain the idea in everyday language before naming the formal term.
3. Use metaphors as bridges, and explain where each metaphor stops matching reality.
4. Make money flows visible: who pays, who receives money, and what the payment represents.
5. Use fictional people and organizations only.
6. Label information as source-verified, illustrative, unresolved, or historical.
7. Distinguish eligibility, covered benefits, network status, authorization, provider capacity, transportation, and language access.
8. Let learners change one variable at a time and compare outcomes.
9. Avoid blame-based explanations; rules, contracts, capacity, incentives, and missing information can all affect outcomes.
10. Treat plain language, mobile usability, keyboard access, readable contrast, and text alternatives as requirements.

## Audience layers
- **Explore:** short metaphors, visual flows, no assumed vocabulary.
- **Understand:** guided cases and knowledge checks.
- **Investigate:** editable toy scenarios and financial ledgers.
- **Practitioner / policy:** source-linked rules, effective dates, assumptions, and limitations.

These are depth settings, not judgments about ability. Learners can switch levels.

## Learning-science implementation

See [Learning Design Research](LEARNING_DESIGN_RESEARCH.md) for research anchors, practical design rules, and evaluation criteria. The interactive [Multiple Journeys lesson](../learning-lab/journeys.html) contrasts a member seeking care, a private practice evaluating plans, and a claim needing review. These are fictional cases; the lesson asks learners to identify facts, unknowns, and next evidence rather than infer real policy outcomes.

## Core modules
1. **The care journey:** need for help → find a provider → check coverage and network → appointment availability → service → claim or encounter → payment or follow-up. Real journeys are not always linear.
2. **Who is who?** Member, clinician, provider organization, behavioral health managed care organization (BH-MCO), state Medicaid agency, and federal funding.
3. **Insurance vocabulary:** eligibility, benefit, network, referral, prior authorization, claim, encounter, billed charge, allowed amount, denial, appeal, capitation, and administrative cost.
4. **Follow the money:** separate public funding flows from service payments. Do not count a payment to a plan and a downstream payment to a clinic as two separate costs of the same care without a clear accounting method.
5. **Why a claim may need review:** missing information, benefit questions, network or credentialing issues, authorization requirements, coding problems, duplicates, or unresolved policy.
6. **The clinic's budget:** revenue, staffing, rent, no-shows, payment timing, and appointment capacity interact. Reimbursement alone does not determine access or quality.
7. **Access is more than insurance:** provider supply, geography, transportation, language access, accommodations, trust, and scheduling.
8. **Incentives and trade-offs:** explore possible effects of payment design without claiming that a payment model alone predicts quality.
9. **Read a policy source:** identify publisher, title, version, effective date, section, applicability, and exact rule text.
10. **Build a better system:** compare hypothetical changes across cost, access, equity, administrative burden, and uncertainty.

## Metaphors and boundaries
- **Insurance as a rulebook plus a payment process:** separates coverage rules from processing. Limit: actual systems also involve contracts, law, clinical judgment, data, and human review.
- **Provider network as a list of places where a pass is accepted:** explains network status. Limit: a listing does not guarantee an open appointment or fit for a person's needs.
- **Prior authorization as checking a trip plan before departure:** explains advance review. Limit: criteria, protections, exceptions, and timelines are policy-specific.
- **A claim as a receipt submitted for review:** distinguishes billed charge from payment. Limit: claims are structured transactions, not just receipts.
- **Capitation as a set budget for a defined group and period:** explains prospective payment. Limit: contracts define population, scope, adjustments, and other terms.
- **The ledger as a bank statement for the model:** helps trace transactions. Limit: it is only as reliable as its inputs and accounting rules.

## Standard lesson format
1. Human question or story.
2. The idea in one minute.
3. Metaphor and its limits.
4. Visual flow of people, decisions, and money.
5. Worked example with assumptions visible.
6. What could change this result?
7. Knowledge check with explanations.
8. Source/model card showing rule status, date, provenance, and limitations.
9. Reflection connecting financing to access and lived experience.

## Case requirements
Each synthetic case should include objectives, context and timeline, roles, known facts, missing facts, verified rules versus assumptions, result and explanation, alternative paths, reflection questions, provenance, and review status. Never present a simulated decision as legal, insurance, or clinical advice.

## Planned activities
- Follow a dollar through the financing chain.
- Compare billed charge, allowed amount, and payment.
- Trace a fictional claim to paid, denied, or needs-review status.
- Change one scenario variable and compare outcomes.
- Explore why appointment capacity differs from a service budget.
- Inspect a source-backed rule and see which model result depends on it.

Every result should show inputs, rule identifiers, source versions, calculation steps, and unresolved items. If the system cannot justify a result, it should say "needs review."

## Evaluation
Check whether learners can identify system actors, distinguish coverage from access, distinguish billed charges from payments, avoid double-counting capitation and downstream payments, explain why a case needs review, and identify assumptions versus official rules.

## MVP boundary
Start with a static GitHub Pages experience: landing page and level selector, plain-language glossary, three guided lessons, two or three synthetic cases, a transparent toy ledger example, source links, and model limitations. Do not wait for a complete simulator, but label every hypothetical number and policy-dependent conclusion. Later, connect activities to the tested Python ledger and policy registry.
