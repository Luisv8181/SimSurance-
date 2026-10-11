const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'learning-lab/data/county-sim.json'), 'utf8'));
const { selectView, scoreAnswers } = require('../learning-lab/visual-journey.js');

test('week scrubber reads the selected exported run rather than inventing a result', () => {
  const run = data.runs.find((item) => item.scenario_id === 'baseline' && item.capacity_multiplier === 1);
  const first = selectView(data, 'baseline', 1, 1);
  const last = selectView(data, 'baseline', 1, 52);
  assert.equal(first.weekly.waitlist, run.weekly_waitlist_mean[0]);
  assert.equal(last.weekly.waitlist, run.weekly_waitlist_mean[51]);
  assert.equal(last.weekly.inCare, run.weekly_in_care_mean[51]);
  assert.notEqual(first.weekly.waitlist, last.weekly.waitlist);
  assert.equal(last.replications, 30);
});

test('scenario and capacity selection use the exact exported cell', () => {
  const run = data.runs.find((item) => item.scenario_id === 'care_coordination_pilot' && item.capacity_multiplier === 0.75);
  const view = selectView(data, 'care_coordination_pilot', 0.75, 12);
  assert.equal(view.weekly.waitlist, run.weekly_waitlist_mean[11]);
  assert.equal(view.annual.completed.mean, run.metrics.completed.mean);
  assert.equal(view.annual.meanWaitWeeks.p90, run.metrics.mean_wait_weeks.p90);
  assert.equal(view.scenarioLabel, data.manifest.scenarios.care_coordination_pilot.label);
});

test('consolidated cost stays separate from capitation transfers', () => {
  const view = selectView(data, 'care_coordination_pilot', 1, 52);
  assert.equal(
    view.annual.systemCostCents.mean,
    view.annual.servicePaymentsCents.mean + view.annual.coordinatorCostCents.mean,
  );
  assert.ok(view.annual.capitationTransfersCents.mean > view.annual.systemCostCents.mean);
  const corrupted = structuredClone(data);
  const cell = corrupted.runs.find((item) => item.scenario_id === 'care_coordination_pilot' && item.capacity_multiplier === 1);
  cell.metrics.system_cost_cents.mean += 1;
  assert.throws(() => selectView(corrupted, 'care_coordination_pilot', 1, 52), /accounting mismatch/);
});

test('invalid or incomplete exported selections stop without a fabricated fallback', () => {
  assert.throws(() => selectView(data, 'missing', 1, 1), /scenario/);
  assert.throws(() => selectView(data, 'baseline', 1.1, 1), /capacity/);
  assert.throws(() => selectView(data, 'baseline', 1, 0), /week/);
  assert.throws(() => selectView(data, 'baseline', 1, 53), /week/);
});

test('the learning check counts correct answers and leaves unanswered questions wrong', () => {
  assert.equal(scoreAnswers(['b', 'a', 'c'], ['b', '', 'c']), 2);
  assert.equal(scoreAnswers(['b', 'a', 'c'], ['b', 'a', 'c']), 3);
  assert.equal(scoreAnswers(['b', 'a', 'c'], ['a', 'b', 'a']), 0);
});

test('the lesson is discoverable from home and the catalog', () => {
  const page = fs.readFileSync(path.join(root, 'learning-lab/visual-journey.html'), 'utf8');
  const home = fs.readFileSync(path.join(root, 'learning-lab/index.html'), 'utf8');
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'learning-lab/lessons.json'), 'utf8'));
  assert.match(page, /A year of care, in motion/);
  assert.match(page, /visual-journey\.js/);
  assert.match(page, /hypothetical_scenario/);
  assert.match(home, /visual-journey\.html/);
  assert.ok(catalog.lessons.some((lesson) => lesson.path === 'visual-journey.html' && lesson.status === 'illustrative'));
});
