# Visual Simulation Journey Implementation Plan

> **For agentic workers:** Implement this plan task by task with test-first checks and review each result against the design.

**Goal:** Add a model-driven visual Learning Lab journey with scenario exploration and a before/after self-check.

**Architecture:** Reuse the current static site and exported simulator JSON. Keep data selection and scoring in small pure JavaScript functions, with DOM code limited to rendering and controls. The new page does not execute insurance rules.

**Tech Stack:** Static HTML/CSS/JavaScript, Node's built-in test runner, existing Python `unittest` suite.

---

## Files

- Create `learning-lab/visual-journey.html`: story, semantic stage, controls, feedback, responsive presentation.
- Create `learning-lab/visual-journey.js`: pure data view/scoring functions and browser interaction.
- Create `tests/test_visual_journey.cjs`: behavioral checks using the real generated model export.
- Modify `learning-lab/index.html`: prominent entry to the visual journey.
- Modify `learning-lab/lessons.json`: catalog entry and learning objectives.
- Modify `.github/workflows/tests.yml`: run the Node test in CI alongside Python.

## Task 1 — Model view and learning score

- [x] Write `tests/test_visual_journey.cjs` first. Require `selectView` and `scoreAnswers` from `visual-journey.js`. Use the real JSON export. Assert week 1 versus week 52 waitlist changes, selected pilot/capacity values match the exact exported cell, capitation is excluded from consolidated system cost, invalid selections fail, and scores count correct answers without exceeding question count.
- [x] Run `node --test tests/test_visual_journey.cjs` and confirm failure because the module is absent.
- [x] Implement `selectView(data, scenarioId, capacity, week)` to validate the selector, find the exact run, and return weekly means plus annual metrics and manifest metadata. Implement `scoreAnswers(questions, answers)` as a pure count of correct selections. Export both for Node while preserving browser use.
- [x] Run the focused Node test, then make one deliberate wrong change to verify the test catches the important data/accounting behavior; restore it and rerun.

## Task 2 — Visual lesson and learner interaction

- [x] Add a structural smoke test for the page title and links in the home page and catalog. Confirm it fails before the page exists.
- [x] Build the page and DOM controller: fetch JSON; show an error on failure; render a week scrubber, play/pause, scenario and capacity controls, rounded token groups with rounded mean labels, annual metrics and ranges, the model/evidence disclosure, and before/after checks. Use the existing shared Lab shell.
- [x] Preserve keyboard access, reduced-motion behavior, mobile layout, source links, hypothetical labels, and distinct weekly versus annual labels.
- [x] Run the focused Node and Python tests and exercise the page in a browser.

## Task 3 — Integration and review

- [x] Link the page from `learning-lab/index.html` and add one illustrative entry to `learning-lab/lessons.json` with objectives and no unsupported policy claims.
- [x] Add Node test execution to `.github/workflows/tests.yml` with a pinned setup action and `node --test tests/test_visual_journey.cjs`.
- [x] Run `$env:PYTHONPATH='src'; python -m unittest discover -s tests -p 'test_*.py' -v` and `node --test tests/test_visual_journey.cjs`.
- [x] Render desktop and mobile layouts, exercise controls and the before/after feedback, inspect console errors, and review the diff for governance and privacy boundaries.

## Acceptance

The new lesson loads from Learning Lab navigation, visualizes only exported model results, distinguishes weekly means from annual summaries, displays uncertainty and fictional status, allows keyboard operation, offers a before/after learning comparison, and passes both test commands. No PHI, credentials, or real payment rules are added.
