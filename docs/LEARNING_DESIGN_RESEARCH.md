# SimSurance Learning Design: Evidence, Decisions, and Multiple Journeys

**Status:** Design guidance informed by established learning-science and accessibility frameworks. This is a synthesis for product decisions, not a systematic review or a claim that every technique works equally well for every learner.

## Research anchors

1. **How People Learn II — National Academies of Sciences, Engineering, and Medicine (2018).** A broad synthesis of learning research across development, prior knowledge, memory, motivation, and context. Use it to avoid treating learning as passive exposure to information.
   - https://nap.nationalacademies.org/catalog/24783/how-people-learn-ii-learners-contexts-and-cultures
2. **Institute of Education Sciences / What Works Clearinghouse practice guides.** Evidence-focused guidance includes spacing learning over time, alternating worked examples with problem solving, combining graphics with verbal explanations, and using quizzes to re-expose learners to key content.
   - https://ies.ed.gov/ncee/wwc/
3. **CAST Universal Design for Learning Guidelines.** Design for learner variability through multiple means of engagement, representation, and action/expression; provide options without removing the core learning objective.
   - https://udlguidelines.cast.org/
4. **Cognitive Load Theory / worked examples.** Beginners benefit from explicit, completed examples before being asked to independently solve complex tasks. Remove decorative complexity that competes with the idea being taught; gradually fade guidance as expertise grows.
   - Sweller, van Merriënboer & Paas, “Cognitive Architecture and Instructional Design” (1998): https://doi.org/10.1207/s15326985ep3304_2
5. **Retrieval practice.** Asking learners to recall or apply an idea, then giving corrective feedback, can strengthen later access more effectively than rereading alone. Questions should teach, not merely grade.
   - Roediger & Karpicke, “Test-Enhanced Learning” (2006): https://doi.org/10.1111/j.1467-9280.2006.01693.x
6. **Multimedia learning.** Pair words with a purposeful diagram when the visual clarifies relationships. Keep labels near the part they explain and avoid redundant, crowded text.
   - Mayer, *Multimedia Learning* (3rd ed., 2021): https://doi.org/10.1017/9781316941355

## Product implications

### 1. Teach one mechanism at a time
Start with a human question and a single objective. Explain unfamiliar language in ordinary words first, then reveal the formal term. Keep the initial model small; introduce exceptions after the basic mechanism is understood.

### 2. Use worked examples before open-ended investigation
Show one complete fictional journey with the known facts, rule/check, result, and rationale. Next, ask the learner to choose the next step in a similar case. Later, remove prompts and let advanced learners investigate sources independently.

### 3. Make retrieval low-stakes and explanatory
Ask one decision question after the explanation. On selection, explain why the answer follows from the facts and why alternatives overreach. Allow retry without shame. Do not treat a correct guess as proof of mastery.

### 4. Compare multiple journeys
Use contrast cases with different actors and goals:
- **Member seeking care:** coverage, plan assignment, provider participation, appointment capacity, language/transport barriers.
- **Private practice choosing a payer:** demand, provider eligibility, contract terms, net revenue, administrative load, network availability, mission and capacity.
- **Clinician resolving a claim:** response code, documentation, applicable rule version, correction, review or appeal.
- **Plan/state oversight:** access standards, network adequacy, quality measures, financing, reporting and accountability.

After each journey, ask: what is known, what remains unknown, which rule applies, what evidence would resolve it, and who has authority to act? Contrast helps learners see which principles transfer and which details depend on context.

### 5. Make uncertainty visible
Every scenario should distinguish:
- **Source-verified rule:** exact passage, issuer, URL, version/effective date, jurisdiction, program, service and provider applicability, reviewer.
- **Derived result:** transparent calculation or logical implication from stated inputs.
- **Illustrative assumption:** fictional rate, timeline, contract term, or outcome.
- **Unknown / needs review:** missing facts or conflicting authority.
- **Historical:** valid for a prior time period but not necessarily current.

Never let a simulated result look like an actual coverage determination. When applicability cannot be established, stop at “needs review.”

### 6. Build accessibility in from the beginning
Use semantic headings, readable mobile layouts, keyboard-operable controls, visible focus, high contrast, text labels for diagrams, reduced-motion support, plain-language definitions, and feedback that does not rely on color alone. Let learners revisit the visual or read a concise text alternative.

### 7. Space and revisit
Revisit core distinctions in later cases instead of presenting them once. A simple pattern: first encounter (explain), next lesson (recall), later contrasting case (apply), later investigation (justify with a source). Do not implement reminders or progress tracking until privacy and persistence decisions are explicit.

## Learning loop for each module

1. **Question:** A recognizable human problem.
2. **Model:** One visual, one mechanism, vocabulary introduced in context.
3. **Worked case:** Step-by-step reasoning with all assumptions shown.
4. **Decision:** A low-stakes learner choice.
5. **Feedback:** Why the answer follows from evidence; why other choices fail.
6. **Contrast:** Switch one meaningful condition or compare a different actor's journey.
7. **Transfer:** Apply the principle to a new situation.
8. **Source trail:** Open the exact primary source or clearly label the case as illustrative.
9. **Reflection:** What changed, what stayed the same, and what is still unknown?

## How we will evaluate whether the Lab teaches

Do not evaluate success only by page views or lesson completion. Use small, privacy-respecting tests:
- **Pre/post explanation:** Can learners explain coverage vs network vs payment in their own words?
- **Novel transfer case:** Can they reason correctly in a case with different names and circumstances?
- **Evidence discipline:** Can they separate known facts from assumptions and name the next source to check?
- **Delayed recall:** Can they still make the distinction in a later session?
- **Accessibility/usability:** Can users complete the activity on mobile and with keyboard navigation?
- **Misconception audit:** Track recurring wrong answers (anonymized/aggregate only) and improve feedback.

A learner who answers a question correctly but cannot explain the evidence may need more instruction. Treat wrong answers as design feedback, not a learner deficit.

## Initial implementation priorities

1. Multi-journey selector with member, practice, and claim scenarios.
2. Shared question format with corrective feedback.
3. Lesson catalog metadata for objectives, scenario status, and source references.
4. Source rule cards with applicability/version fields.
5. Later: spaced review and learner progress only after privacy and data-minimization review.

## Sources and limitations

This document links to established frameworks and foundational research. It is an applied design synthesis, not a systematic literature review. Before making strong comparative claims about effectiveness, conduct a documented review of study quality, learner populations, outcomes, and context. SimSurance should test its own materials with learners and revise based on observed comprehension, transfer, accessibility, and source-use behavior.
