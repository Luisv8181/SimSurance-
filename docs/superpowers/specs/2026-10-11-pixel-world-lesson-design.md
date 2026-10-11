# Riverbend Pixel World — Experience Redesign

## Goal

Turn the first visual county lesson into a short playable experience. A learner should understand coverage, appointment capacity, coordination, and money flow by acting on one visible world, with little page scrolling. The model remains the existing fictional 52-week export.

## Research references

- [PhET simulation design](https://phet.colorado.edu/publications/PhET_Interviews_I.pdf): give learners simple controls, immediate visible consequences, and room to inspect surprising results.
- [Nicky Case on explorable explanations](https://blog.ncase.me/how-i-make-an-explorable-explanation/): start with a concrete question and play; introduce abstraction after the learner has seen it.
- [Duolingo Adventures](https://blog.duolingo.com/adventures/): use a character and feedback in the scene rather than a detached worksheet.
- [Bruno Simon’s playable portfolio](https://bruno-simon.com/): make navigation itself feel like movement through a place.
- [Learning Adventures World demo](https://learningadventures.org/demo): use a pixel setting, characters, and short quests as one coherent world.
- [Multimedia learning review](https://pubmed.ncbi.nlm.nih.gov/33716467/): keep text close to the visual it explains, segment the story, and let learners control the pace.

These are design inspirations, not evidence that this lesson has measured learning effectiveness.

## Screen and interaction

The main screen is a pixel-art Riverbend town with a coverage office, waiting area, clinic, and finance desk. A small firefly guide named Glim gives one short instruction at a time. On desktop, the town and dialogue/controls fit in one viewport at common sizes; on mobile, the town remains prominent and the lesson uses compact vertical space.

The experience has four states:

1. **Arrival.** See the world and begin a three-question prediction. Show one question at a time. Save the score without revealing answers.
2. **Explore.** Choose one of eight exported scenario/capacity cells, play or scrub the 52-week year, and tap town locations for short explanations. Draw waiting and in-care episode tokens directly in the town. Highlight the pilot paradox at low capacity and the effect of adding slots. Earn three discovery stamps by observing a baseline, comparing the pilot, and trying more slots. The learner can continue without collecting every stamp.
3. **Transfer.** Answer three fresh questions, one at a time, using the concepts seen in the world.
4. **Debrief.** Show before/after scores and concise answer explanations. Offer replay, exploration, and a source/method journal.

The journal is an overlay on the same screen. It carries the annual metrics, p10–p90 ranges, cost accounting, source boundaries, and links to the existing model/configuration and policy lesson. The visible stage carries only the numbers needed for the current decision.

## Visual system and motion

Original SVG pixel assets: a Riverbend town background and Glim sprite. Colors are deep indigo, petrol blue, mint, and warm amber. Sharp corners, stepped shadows, pixel tiles, and chunky controls replace rounded dashboard cards. People appear as small colored square sprites; their counts reflect rounded weekly means, with a persistent caption explaining that one sprite is approximately five synthetic episodes. CSS motion makes characters bob, windows glow, and the year progress; all nonessential motion stops for `prefers-reduced-motion`.

The scene art is decorative. Every hotspot and control is a semantic button with a visible focus state, text label, and equivalent result text. The page retains light and high-contrast support.

## Data and safety

- Continue to select only existing scenario/capacity runs in `county-sim.json`; no free-form parameter changes or browser-side policy calculation.
- Label numbers as rounded means across 30 seeded runs. The depicted episode sprites do not represent identifiable individuals.
- Keep capitation transfers separate from downstream costs. Display annual outcomes as annual and the town tokens as weekly.
- Keep fictional status in the HUD and full method/source details in the journal. Never present the simulation as a Pennsylvania coverage determination or forecast.
- No PHI, account, analytics, sound, or network request beyond the existing static JSON and source files.

## Validation

Run the Python and Node suites. Browser-check the full flow, hotspots, play/pause, journal, mobile width, keyboard focus, themes, reduced motion, and console. Check that the SVG assets load and that no page view fabricates data when the export is missing.
