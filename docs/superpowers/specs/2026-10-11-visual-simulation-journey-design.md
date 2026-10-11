# Visual Simulation Journey — Design

## Purpose

Make SimSurance's existing fictional county model easier to understand by letting a learner watch the waitlist and care capacity change across a year, then check what they learned. This is a first visual teaching slice of the broader insurance-aware practice platform, not an operational insurance tool.

## User need and scope

The learner can enter with little insurance knowledge, make a prediction, explore a model-driven visual, inspect why it changes, and compare their starting and ending answers. The experience is a new Learning Lab page linked from the home page and lesson catalog. It uses the existing `learning-lab/data/county-sim.json`; it does not recalculate policy, claims, or county outcomes in the browser.

## Experience

1. Open with a human question: why can coverage and a funded plan coexist with a growing therapy waitlist?
2. Answer three short before questions about coverage versus capacity, coordination versus slots, and transfers versus service costs. Do not reveal correctness until the after check.
3. Explore a 52-week stage with a week scrubber, play/pause, a baseline/pilot switch, and four provider-capacity settings. Show two groups of rounded tokens: episodes waiting and episodes in care. Each token represents approximately five modeled episodes. Rounded means appear beside the tokens.
4. Show the annual outcomes separately from the selected week: completed episodes, average wait, unmet need, service payments, coordinator cost, and capitation transfer. Include p10–p90 ranges across 30 replications where available. Keep capitation outside the consolidated system-cost visual.
5. Offer a concise explanation for each stage and a collapsible model/evidence panel linking to the configuration, model methods, and existing official-source learning material. Say which claims are hypothetical.
6. Answer three transfer questions at the end. Show the before and after scores with explanations and invite the learner to explore again. This is self-feedback, not a validated assessment.

## Data and correctness

- Select only one of the eight exported scenario/capacity cells. Never interpolate an unrun scenario.
- Use the existing weekly mean arrays for week-specific values and annual metric summaries for year outcomes. Keep these labels distinct.
- No claim that the same named person moved from a particular token to another; tokens visualize averages across replications.
- All amounts and scenario effects remain `hypothetical_scenario`. No real coverage, billing, or Pennsylvania rate is inferred.
- On missing or malformed data, show an error and no numeric result rather than fabricate a fallback.

## Visual system

Reference: existing SimSurance Learning Lab brand (navy surfaces, mint and blue for model states, gold for caution, high-contrast and light themes). Use generous type, a compact control bar, animated token changes, and a clear stage diagram. No new framework or third-party animation package; this repository is static HTML/CSS/JS. Motion stops under `prefers-reduced-motion`, with play/pause always available. Controls and result text remain keyboard accessible and readable on mobile.

## Architecture

`visual-journey.js` owns pure selection/formatting/scoring helpers plus DOM behavior. `visual-journey.html` owns narrative, semantic structure, and visual styling. It loads the generated JSON and existing `lab-shell.js`; the shared source drawer remains available. A Node test exercises the pure helper functions with the actual exported JSON, and the existing Python suite keeps the site catalog and source registry checks.

## Validation and feedback

Run the repository Python suite and the new Node test. Check the page in a desktop and mobile browser, including keyboard, light/contrast, and reduced-motion behavior. Use the user's experience with the lesson as design feedback; do not interpret a score increase as evidence of real educational efficacy without a study.
