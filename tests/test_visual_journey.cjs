const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'learning-lab/data/county-sim.json'), 'utf8'));
const { selectView, scoreAnswers, compareOutcomes } = require('../learning-lab/visual-journey.js');

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
  const corrupted = structuredClone(data);
  const run = corrupted.runs.find((item) => item.scenario_id === 'baseline' && item.capacity_multiplier === 1);
  run.weekly_waitlist_mean[5] = null;
  assert.throws(() => selectView(corrupted, 'baseline', 1, 6), /weekly simulation values/);
});

test('the learning check counts correct answers and leaves unanswered questions wrong', () => {
  assert.equal(scoreAnswers(['b', 'a', 'c'], ['b', '', 'c']), 2);
  assert.equal(scoreAnswers(['b', 'a', 'c'], ['b', 'a', 'c']), 3);
  assert.equal(scoreAnswers(['b', 'a', 'c'], ['a', 'b', 'a']), 0);
});

test('the pilot can help completion while making a constrained queue larger', () => {
  const comparison = compareOutcomes(data, 0.75);
  assert.ok(comparison.completedDelta > 0);
  assert.ok(comparison.waitlistDelta > 0);
  assert.equal(comparison.baseline.weekly.waitlist, selectView(data, 'baseline', 0.75, 52).weekly.waitlist);
  assert.equal(comparison.pilot.weekly.waitlist, selectView(data, 'care_coordination_pilot', 0.75, 52).weekly.waitlist);
});

test('adding clinician capacity reduces the week-52 pilot queue in exported runs', () => {
  const constrained = selectView(data, 'care_coordination_pilot', 0.75, 52);
  const expanded = selectView(data, 'care_coordination_pilot', 1.25, 52);
  assert.ok(expanded.weekly.waitlist < constrained.weekly.waitlist);
  assert.ok(expanded.annual.completed.mean > constrained.annual.completed.mean);
});

test('the lesson is discoverable from home and the catalog', () => {
  const page = fs.readFileSync(path.join(root, 'learning-lab/visual-journey.html'), 'utf8');
  const home = fs.readFileSync(path.join(root, 'learning-lab/index.html'), 'utf8');
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'learning-lab/lessons.json'), 'utf8'));
  assert.match(page, /A year of care, in motion/);
  assert.match(page, /visual-journey\.js/);
  assert.match(page, /hypothetical_scenario/);
  assert.match(page, /assets\/riverbend-world\.svg/);
  assert.match(page, /assets\/glim-guide\.svg/);
  assert.match(page, /id="vj-journal"/);
  assert.match(home, /visual-journey\.html/);
  assert.ok(catalog.lessons.some((lesson) => lesson.path === 'visual-journey.html' && lesson.status === 'illustrative'));
});

test('audio synthesizer operates safely in headless environments', () => {
  const { AudioSynth } = require('../learning-lab/visual-journey.js');
  assert.ok(AudioSynth);
  assert.equal(typeof AudioSynth.isMuted, 'function');
  assert.equal(typeof AudioSynth.toggleMute, 'function');
  assert.doesNotThrow(() => AudioSynth.blip());
  assert.doesNotThrow(() => AudioSynth.chirp());
  assert.doesNotThrow(() => AudioSynth.stamp());
  assert.doesNotThrow(() => AudioSynth.step());
  assert.doesNotThrow(() => AudioSynth.celebrate());
});

test('visual journey includes offline fallback data and 16-bit expressive assets', () => {
  const page = fs.readFileSync(path.join(root, 'learning-lab/visual-journey.html'), 'utf8');
  assert.match(page, /id="county-sim-fallback"/);
  assert.match(page, /id="vj-sound-toggle"/);
  assert.match(page, /id="vj-crt-toggle"/);

  const fallbackMatch = page.match(/<script id="county-sim-fallback" type="application\/json">([\s\S]*?)<\/script>/);
  assert.ok(fallbackMatch, 'Fallback JSON script tag must be present');
  const embeddedData = JSON.parse(fallbackMatch[1]);
  assert.equal(embeddedData.manifest.config_id, data.manifest.config_id);
  assert.equal(embeddedData.manifest.weeks, 52);
  assert.equal(embeddedData.runs.length, data.runs.length);

  assert.ok(fs.existsSync(path.join(root, 'learning-lab/assets/glim-guide.svg')));
  assert.ok(fs.existsSync(path.join(root, 'learning-lab/assets/glim-think.svg')));
  assert.ok(fs.existsSync(path.join(root, 'learning-lab/assets/glim-celebrate.svg')));
  assert.ok(fs.existsSync(path.join(root, 'learning-lab/assets/riverbend-world.svg')));
});

test('pyodide in-browser python bundle loads valid Simsurance sources', () => {
  const { bundle, mountSimsurance } = require('../learning-lab/py-simsurance.js');
  assert.ok(bundle && bundle.files);
  assert.equal(typeof mountSimsurance, 'function');
  assert.ok(bundle.files['simsurance/__init__.py']);
  assert.ok(bundle.files['simsurance/county.py']);
  assert.ok(bundle.files['simsurance/ledger.py']);
  assert.ok(bundle.files['simsurance/policy.py']);
  assert.ok(bundle.files['simsurance/runner.py']);
  assert.ok(bundle.files['simsurance/simulator.py']);
  assert.ok(bundle.files['config/toy_county.json']);

  const livePage = fs.readFileSync(path.join(root, 'learning-lab/live-simulation.html'), 'utf8');
  assert.match(livePage, /The Live Python Policy Lab/);
  assert.match(livePage, /py-simsurance\.js/);
  assert.match(livePage, /py-runner\.js/);
  assert.match(livePage, /SimSurancePyRunner/);
});

test('pixel world town features 8 interactive chambers and discovery seals', () => {
  const { BUILDINGS, adjudicateToyClaim } = require('../learning-lab/visual-journey.js');
  assert.ok(BUILDINGS, 'BUILDINGS dictionary must be exported');
  const keys = ['coverage', 'wait', 'clinic', 'finance', 'claims', 'terminal', 'archives', 'crossroads'];
  keys.forEach((key, idx) => {
    assert.ok(BUILDINGS[key], `Building ${key} must exist`);
    assert.equal(BUILDINGS[key].num, idx + 1);
    assert.ok(BUILDINGS[key].name);
    assert.ok(BUILDINGS[key].sealTitle);
  });

  const paid = adjudicateToyClaim('valid', 'in_network', 'valid', 'valid');
  assert.equal(paid.status, 'paid');
  assert.equal(paid.amountCents, 9000);

  const deniedIneligible = adjudicateToyClaim('inactive', 'in_network', 'valid', 'valid');
  assert.equal(deniedIneligible.status, 'denied');

  const deniedOon = adjudicateToyClaim('valid', 'out_network', 'valid', 'valid');
  assert.equal(deniedOon.status, 'denied');

  const reviewAuth = adjudicateToyClaim('valid', 'in_network', 'missing', 'valid');
  assert.equal(reviewAuth.status, 'review');

  const reviewData = adjudicateToyClaim('valid', 'in_network', 'valid', 'invalid');
  assert.equal(reviewData.status, 'review');

  const page = fs.readFileSync(path.join(root, 'learning-lab/visual-journey.html'), 'utf8');
  assert.match(page, /id="vj-chamber"/);
  assert.match(page, /id="vj-chamber-title"/);
  assert.match(page, /id="vj-chamber-body"/);
  assert.match(page, /id="vj-chamber-claim"/);
  assert.match(page, /vj-town-nav/);
  keys.forEach((key) => {
    assert.match(page, new RegExp(`data-vj-place="${key}"`));
    assert.match(page, new RegExp(`data-vj-stamp="${key}"`));
  });
  assert.match(page, /py-simsurance\.js/);
  assert.match(page, /py-runner\.js/);
});

test('glim master curriculum covers all 7 units with statutory citations and complete graph integrity', () => {
  const { WORKBOOK } = require('../learning-lab/visual-journey.js');
  assert.ok(Array.isArray(WORKBOOK), 'WORKBOOK must be exported as an array');
  assert.ok(WORKBOOK.length >= 25, 'WORKBOOK must have a comprehensive set of scenes');

  // Verify all 7 units are present
  const expectedUnits = [
    'Unit I · The 5 Players',
    'Unit II · Member Gauntlet',
    'Unit III · Provider Realities',
    'Unit IV · Inpatient & Crisis',
    'Unit V · Statutory Ledgers',
    'Unit VI · Parity Mirage',
    'Unit VII · Solutions & Mastery',
  ];
  const presentUnits = new Set(WORKBOOK.map((s) => s.part));
  expectedUnits.forEach((unit) => {
    assert.ok(presentUnits.has(unit), `Unit "${unit}" must exist in WORKBOOK`);
  });

  // Verify scene IDs and graph transitions
  const sceneIds = new Set(WORKBOOK.map((s) => s.id));
  assert.equal(sceneIds.size, WORKBOOK.length, 'Every scene ID must be unique');

  WORKBOOK.forEach((scene) => {
    assert.ok(scene.id, 'Scene must have an id');
    assert.ok(scene.part, `Scene ${scene.id} must have a part`);
    assert.ok(scene.chapter, `Scene ${scene.id} must have a chapter`);
    assert.ok(scene.text, `Scene ${scene.id} must have text`);

    // Verify citation structure when present
    if (scene.citation) {
      assert.ok(scene.citation.title, `Scene ${scene.id} citation must have a title`);
      assert.ok(scene.citation.statute, `Scene ${scene.id} citation must have a statute`);
      assert.ok(scene.citation.quote, `Scene ${scene.id} citation must have a quote`);
      assert.ok(scene.citation.url, `Scene ${scene.id} citation must have a url`);
      assert.match(
        scene.citation.url,
        /^https:\/\/(www\.)?(pa\.gov|medicaid\.gov|cms\.gov|insurance\.pa\.gov|finance\.senate\.gov|pennie\.com)/,
        `Citation URL in ${scene.id} must be an official domain`,
      );
    }

    // Verify further reading structure when present
    if (scene.furtherReading) {
      assert.ok(Array.isArray(scene.furtherReading), `furtherReading in ${scene.id} must be an array`);
      scene.furtherReading.forEach((chip) => {
        assert.ok(chip.label, `furtherReading chip in ${scene.id} must have a label`);
        assert.ok(chip.url, `furtherReading chip in ${scene.id} must have a url`);
      });
    }

    // Verify transition links exist
    if (scene.next) {
      assert.ok(sceneIds.has(scene.next), `Scene ${scene.id} next target "${scene.next}" must exist`);
    }
    if (scene.choices) {
      assert.ok(Array.isArray(scene.choices), `choices in ${scene.id} must be an array`);
      scene.choices.forEach((choice) => {
        assert.ok(choice.text, `choice in ${scene.id} must have text`);
        assert.ok(sceneIds.has(choice.next), `Choice target "${choice.next}" in ${scene.id} must exist`);
      });
    }
  });

  // Verify visual-journey.html includes the citation card and further reading containers
  const page = fs.readFileSync(path.join(root, 'learning-lab/visual-journey.html'), 'utf8');
  assert.match(page, /id="vj-citation-card"/, 'Citation card container must exist in HTML');
  assert.match(page, /id="vj-further-reading"/, 'Further reading container must exist in HTML');
});



