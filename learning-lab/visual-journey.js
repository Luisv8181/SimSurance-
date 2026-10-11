(function (root) {
  'use strict';

  function selectView(data, scenarioId, capacity, week) {
    if (!data || !data.manifest || !data.manifest.scenarios || !data.manifest.scenarios[scenarioId]) {
      throw new Error('Unknown scenario in simulation export');
    }
    if (!data.manifest.capacity_multipliers.includes(capacity)) {
      throw new Error('Unknown capacity setting in simulation export');
    }
    if (!Number.isInteger(week) || week < 1 || week > data.manifest.weeks) {
      throw new Error('week is outside the simulation horizon');
    }
    const run = data.runs.find((item) => item.scenario_id === scenarioId && item.capacity_multiplier === capacity);
    if (!run || run.weekly_waitlist_mean.length !== data.manifest.weeks || run.weekly_in_care_mean.length !== data.manifest.weeks) {
      throw new Error('Selected simulation result is unavailable or incomplete');
    }
    const m = run.metrics;
    const service = m.service_payments_cents.mean;
    const coordinator = m.coordinator_cost_cents.mean;
    const system = m.system_cost_cents.mean;
    if (![service, coordinator, system].every(Number.isFinite) || Math.abs(system - service - coordinator) > 0.0001) {
      throw new Error('Simulation accounting mismatch: consolidated cost must equal service plus coordinator cost');
    }
    const waitlist = run.weekly_waitlist_mean[week - 1];
    const inCare = run.weekly_in_care_mean[week - 1];
    if (![waitlist, inCare].every((value) => Number.isFinite(value) && value >= 0)) {
      throw new Error('Selected weekly simulation values are invalid');
    }
    return {
      scenarioId,
      scenarioLabel: data.manifest.scenarios[scenarioId].label,
      capacity,
      week,
      weeks: data.manifest.weeks,
      replications: run.replications,
      configId: data.manifest.config_id,
      weekly: { waitlist, inCare, slots: m.weekly_slots.mean },
      annual: {
        completed: m.completed,
        meanWaitWeeks: m.mean_wait_weeks,
        unmetNeedShare: m.unmet_need_share,
        servicePaymentsCents: m.service_payments_cents,
        coordinatorCostCents: m.coordinator_cost_cents,
        capitationTransfersCents: m.capitation_transfers_cents,
        systemCostCents: m.system_cost_cents,
      },
    };
  }

  function compareOutcomes(data, capacity) {
    const week = data.manifest.weeks;
    const baseline = selectView(data, 'baseline', capacity, week);
    const pilot = selectView(data, 'care_coordination_pilot', capacity, week);
    return {
      baseline,
      pilot,
      waitlistDelta: pilot.weekly.waitlist - baseline.weekly.waitlist,
      completedDelta: pilot.annual.completed.mean - baseline.annual.completed.mean,
    };
  }

  function scoreAnswers(correct, answers) {
    if (!Array.isArray(correct) || !Array.isArray(answers)) {
      throw new TypeError('Learning check answers must be arrays');
    }
    return correct.reduce((score, key, index) => score + Number(Boolean(answers[index]) && answers[index] === key), 0);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { selectView, compareOutcomes, scoreAnswers };
  } else {
    root.SimSuranceJourney = { selectView, compareOutcomes, scoreAnswers };
    if (root.document) {
      const ready = () => { if (document.getElementById('visual-journey')) startLesson(); };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
      else ready();
    }
  }

  function startLesson() {
    const $ = (id) => document.getElementById(id);
    const scenarioButtons = [...document.querySelectorAll('[data-vj-scenario]')];
    const capacityButtons = [...document.querySelectorAll('[data-vj-capacity]')];
    const placeButtons = [...document.querySelectorAll('[data-vj-place]')];
    const reducedMotion = root.matchMedia('(prefers-reduced-motion: reduce)');
    const beforeQuestions = [
      {
        prompt: 'A person has insurance, but cannot book therapy. What might be missing?',
        options: ['A valid plan', 'An open clinician appointment', 'A paid claim'],
        answer: 'b',
        explanation: 'Coverage and an open appointment are separate. The story does not establish a denied claim.',
      },
      {
        prompt: 'A check-in worker keeps people on the waiting list. Do new therapy slots appear?',
        options: ['Yes, automatically', 'Only with Medicaid', 'No, clinician time is separate'],
        answer: 'c',
        explanation: 'Coordination can change engagement while provider capacity stays fixed.',
      },
      {
        prompt: 'Can an upstream capitation transfer and a downstream session payment both be added to one system-cost total?',
        options: ['No, that may double-count a flow', 'Yes, always', 'Only if electronic'],
        answer: 'a',
        explanation: 'The transfer and service payment sit at different layers of the same fictional financing flow.',
      },
    ];
    const afterQuestions = [
      {
        prompt: 'Riverbend has coverage and a long queue. What most directly opens more visits?',
        options: ['A bigger transfer alone', 'More clinician slots', 'A new plan name'],
        answer: 'b',
        explanation: 'More available clinician time directly creates more appointment slots.',
      },
      {
        prompt: 'The pilot helps more people stay engaged, yet the queue grows at low capacity. Why?',
        options: ['Everyone is uninsured', 'Every claim was denied', 'More people remain waiting while slots stay scarce'],
        answer: 'c',
        explanation: 'The pilot can reduce dropout without creating enough appointments to clear the queue.',
      },
      {
        prompt: 'Which amount stays outside Riverbend’s consolidated downstream cost?',
        options: ['Capitation transfer', 'Service payments', 'Coordinator cost'],
        answer: 'a',
        explanation: 'The upstream capitation transfer is tracked separately from service and coordinator costs.',
      },
    ];
    const state = {
      data: null,
      phase: 'intro',
      index: 0,
      selected: '',
      before: [],
      after: [],
      afterFeedback: false,
      scenario: 'baseline',
      capacity: 0.75,
      week: 1,
      timer: null,
      place: null,
      stamps: new Set(),
    };
    const format = (value, digits = 0) => value.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });
    const money = (cents) => `$${format(cents / 100)}`;
    const range = (metric, formatter) => `${formatter(metric.p10)}–${formatter(metric.p90)} across runs`;

    function stopPlayback() {
      if (state.timer) root.clearInterval(state.timer);
      state.timer = null;
      $('vj-play').textContent = '▶ Run the year';
      $('vj-play').setAttribute('aria-pressed', 'false');
    }

    function renderActors(id, value, type) {
      const container = $(id);
      const count = Math.round(value / 5);
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i += 1) {
        const actor = document.createElement('span');
        actor.className = `vj-actor vj-actor-${type}`;
        actor.style.left = `${type === 'wait' ? 34 + (i % 8) * 2.9 : 69 + (i % 6) * 2.7}%`;
        actor.style.top = `${73 + Math.floor(i / (type === 'wait' ? 8 : 6)) * 5}%`;
        actor.style.animationDelay = `${(i % 7) * -0.13}s`;
        actor.setAttribute('aria-hidden', 'true');
        fragment.append(actor);
      }
      container.replaceChildren(fragment);
    }

    function recordObservation() {
      if (state.week === state.data.manifest.weeks) {
        if (state.scenario === 'baseline' && state.capacity === 0.75) state.stamps.add('baseline');
        if (state.scenario === 'care_coordination_pilot' && state.capacity === 0.75) state.stamps.add('pilot');
        if (state.scenario === 'care_coordination_pilot' && state.capacity >= 1.25) state.stamps.add('capacity');
      }
      ['baseline', 'pilot', 'capacity'].forEach((name) => {
        const badge = document.querySelector(`[data-vj-stamp="${name}"]`);
        badge.classList.toggle('earned', state.stamps.has(name));
        badge.setAttribute('aria-label', `${badge.dataset.label}: ${state.stamps.has(name) ? 'discovered' : 'not yet discovered'}`);
      });
      $('vj-stamp-count').textContent = `${state.stamps.size}/3 discoveries`;
      if (state.phase === 'explore') $('vj-step').textContent = `${state.stamps.size} / 3`;
    }

    function guideForSetting() {
      if (state.place === 'coverage') return ['Coverage office', 'The plan starts the journey. An insurance card does not create an open clinician appointment.'];
      if (state.place === 'clinic') return ['Care clinic', `This setting has ${format(selectView(state.data, state.scenario, state.capacity, state.week).weekly.slots, 1)} mean weekly slots. Try raising capacity, then watch the queue.`];
      if (state.place === 'wait') return ['Waiting station', 'Each amber sprite is about five synthetic episodes. These are weekly averages, not the same people moving across the map.'];
      if (state.place === 'finance') return ['Money desk', 'The upstream capitation transfer and downstream service payments are different layers. Open the field journal to inspect them.'];
      if (!state.stamps.has('baseline')) return ['Quest 1 · Watch the queue', 'Run the year at 0.75× capacity. Coverage exists, so why are people still waiting?'];
      if (!state.stamps.has('pilot')) return ['Quest 2 · Try the check-in pilot', 'Switch on the pilot at 0.75× capacity. Watch who stays on the list while appointments remain scarce.'];
      if (!state.stamps.has('capacity')) return ['Quest 3 · Open more slots', 'Keep the pilot on, raise capacity to 1.25×, and run to week 52. What changes?'];
      const comparison = compareOutcomes(state.data, 0.75);
      const expanded = selectView(state.data, 'care_coordination_pilot', 1.25, 52);
      return ['You found the twist', `In this model, the pilot adds ${format(comparison.completedDelta, 1)} completions but ${format(comparison.waitlistDelta, 1)} to the low-capacity queue. More slots cut that queue from ${format(comparison.pilot.weekly.waitlist, 1)} to ${format(expanded.weekly.waitlist, 1)}.`];
    }

    function renderScene() {
      if (!state.data) return;
      let view;
      try {
        view = selectView(state.data, state.scenario, state.capacity, state.week);
      } catch (error) {
        $('vj-error').textContent = `This model view cannot be shown: ${error.message}`;
        $('vj-error').hidden = false;
        $('vj-field-stats').hidden = true;
        $('vj-wait-actors').replaceChildren();
        $('vj-care-actors').replaceChildren();
        stopPlayback();
        return;
      }
      $('vj-error').hidden = true;
      if (state.phase === 'explore') $('vj-field-stats').hidden = false;
      $('vj-week').value = String(state.week);
      $('vj-week-label').textContent = `WEEK ${state.week} / ${view.weeks}`;
      const season = ['spring', 'summer', 'autumn', 'winter'][Math.min(3, Math.floor((state.week - 1) / 13))];
      $('vj-world').dataset.season = season;
      $('vj-season-label').textContent = `${season.toUpperCase()} · WEEK ${state.week}`;
      $('vj-time-fill').style.width = `${state.week / view.weeks * 100}%`;
      $('vj-wait-number').textContent = format(view.weekly.waitlist, 1);
      $('vj-care-number').textContent = format(view.weekly.inCare, 1);
      $('vj-slot-number').textContent = format(view.weekly.slots, 1);
      $('vj-run-label').textContent = `${view.replications} seeded runs · rounded weekly means`;
      renderActors('vj-wait-actors', view.weekly.waitlist, 'wait');
      renderActors('vj-care-actors', view.weekly.inCare, 'care');
      scenarioButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.vjScenario === state.scenario)));
      capacityButtons.forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.vjCapacity) === state.capacity)));
      document.querySelectorAll('.vj-clinic-lights i').forEach((light, index) => {
        light.classList.toggle('on', index <= state.data.manifest.capacity_multipliers.indexOf(state.capacity));
      });
      $('vj-pilot-beacon').hidden = state.scenario !== 'care_coordination_pilot';
      recordObservation();
      if (state.phase === 'explore') {
        const [title, copy] = guideForSetting();
        $('vj-prompt').textContent = title;
        $('vj-copy').textContent = copy;
      }
      renderJournal(view);
    }

    function renderJournal(view) {
      if (!view) return;
      const comparison = compareOutcomes(state.data, state.capacity);
      $('vj-journal-setting').textContent = `${view.scenarioLabel} · ${view.capacity}× capacity`;
      $('vj-journal-completed').textContent = format(view.annual.completed.mean);
      $('vj-journal-completed-range').textContent = range(view.annual.completed, (v) => format(v));
      $('vj-journal-wait').textContent = `${format(view.annual.meanWaitWeeks.mean, 1)} weeks`;
      $('vj-journal-wait-range').textContent = range(view.annual.meanWaitWeeks, (v) => `${format(v, 1)} weeks`);
      $('vj-journal-unmet').textContent = `${format(view.annual.unmetNeedShare.mean * 100)}%`;
      $('vj-journal-unmet-range').textContent = range(view.annual.unmetNeedShare, (v) => `${format(v * 100)}%`);
      $('vj-journal-baseline').textContent = format(comparison.baseline.weekly.waitlist, 1);
      $('vj-journal-pilot').textContent = format(comparison.pilot.weekly.waitlist, 1);
      $('vj-journal-service').textContent = money(view.annual.servicePaymentsCents.mean);
      $('vj-journal-coordinator').textContent = money(view.annual.coordinatorCostCents.mean);
      $('vj-journal-system').textContent = money(view.annual.systemCostCents.mean);
      $('vj-journal-transfer').textContent = money(view.annual.capitationTransfersCents.mean);
      $('vj-model-id').textContent = `${view.configId} · ${view.replications} seeded runs · ${view.weeks} weeks`;
    }

    function renderChoices(question) {
      const list = $('vj-choice-list');
      list.replaceChildren();
      question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'vj-answer';
        button.textContent = option;
        button.dataset.answer = String.fromCharCode(97 + index);
        button.setAttribute('aria-pressed', String(state.selected === button.dataset.answer));
        button.addEventListener('click', () => {
          state.selected = button.dataset.answer;
          [...list.children].forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
          $('vj-action').disabled = false;
        });
        list.append(button);
      });
    }

    function renderResults() {
      const start = scoreAnswers(beforeQuestions.map((q) => q.answer), state.before);
      const end = scoreAnswers(afterQuestions.map((q) => q.answer), state.after);
      $('vj-prompt').textContent = `From ${start}/3 to ${end}/3`;
      const difference = end - start;
      $('vj-copy').textContent = `${difference > 0 ? `Up ${difference}` : difference < 0 ? `Down ${Math.abs(difference)}` : 'Same score'} on this visit’s self-check. This is feedback for learning, not a validated measure of mastery.`;
      const list = $('vj-review-list');
      list.replaceChildren();
      afterQuestions.forEach((question, index) => {
        const item = document.createElement('li');
        item.textContent = `${state.after[index] === question.answer ? '✓' : '↺'} ${question.explanation}`;
        list.append(item);
      });
      list.hidden = false;
      $('vj-restart').hidden = false;
    }

    function renderPhase() {
      const phase = state.phase;
      $('vj-game').dataset.phase = phase;
      $('vj-world').dataset.phase = phase;
      $('vj-tools').hidden = phase !== 'explore';
      $('vj-time-controls').hidden = phase !== 'explore';
      $('vj-field-stats').hidden = phase !== 'explore';
      $('vj-choice-list').hidden = !['before', 'after'].includes(phase) || (phase === 'after' && state.afterFeedback);
      $('vj-review-list').hidden = phase !== 'results';
      $('vj-restart').hidden = phase !== 'results';
      $('vj-journal-open').disabled = !state.data || ['intro', 'before'].includes(phase);
      placeButtons.forEach((button) => { button.disabled = phase !== 'explore'; });
      $('vj-phase-label').textContent = ({ intro: 'ARRIVAL', before: 'PREDICTION', explore: 'EXPLORE', after: 'TRANSFER', results: 'DEBRIEF' })[phase];
      const action = $('vj-action');
      action.disabled = false;
      if (phase === 'intro') {
        $('vj-prompt').textContent = 'Can a town have coverage and still wait for care?';
        $('vj-copy').textContent = 'Meet Glim. Together, you will run one fictional year, change what the town can do, and see what you learned.';
        action.textContent = 'Start the quest →';
        action.disabled = !state.data;
      } else if (phase === 'before') {
        $('vj-prompt').textContent = `Prediction ${state.index + 1} / ${beforeQuestions.length}`;
        $('vj-copy').textContent = beforeQuestions[state.index].prompt;
        state.selected = '';
        renderChoices(beforeQuestions[state.index]);
        action.textContent = 'Lock prediction →';
        action.disabled = true;
      } else if (phase === 'explore') {
        $('vj-choice-list').replaceChildren();
        action.textContent = state.after.length ? 'See my results →' : 'Try the final challenge →';
        $('vj-play').disabled = reducedMotion.matches;
        $('vj-motion-note').hidden = !reducedMotion.matches;
        if (reducedMotion.matches) $('vj-motion-note').textContent = 'Motion is reduced on this device. Use the week slider to explore.';
        renderScene();
      } else if (phase === 'after') {
        const question = afterQuestions[state.index];
        $('vj-prompt').textContent = `Challenge ${state.index + 1} / ${afterQuestions.length}`;
        const correct = state.after[state.index] === question.answer;
        $('vj-copy').textContent = state.afterFeedback ? `${correct ? 'Nice catch.' : 'Here is the key idea.'} ${question.explanation}` : question.prompt;
        if (!state.afterFeedback) {
          state.selected = '';
          renderChoices(question);
          action.textContent = 'Check my choice →';
          action.disabled = true;
        } else {
          $('vj-choice-list').replaceChildren();
          action.textContent = state.index === afterQuestions.length - 1 ? 'See my results →' : 'Next challenge →';
        }
      } else {
        $('vj-choice-list').replaceChildren();
        renderResults();
        action.textContent = 'Explore the town again →';
      }
      $('vj-step').textContent = phase === 'before' || phase === 'after' ? `${state.index + 1} / 3` : phase === 'explore' ? `${state.stamps.size} / 3` : phase === 'results' ? 'COMPLETE' : 'READY';
    }

    $('vj-action').addEventListener('click', () => {
      if (state.phase === 'intro') {
        state.phase = 'before';
        state.index = 0;
      } else if (state.phase === 'before') {
        if (!state.selected) return;
        state.before.push(state.selected);
        if (state.index < beforeQuestions.length - 1) state.index += 1;
        else {
          state.phase = 'explore';
          state.index = 0;
        }
      } else if (state.phase === 'explore') {
        stopPlayback();
        state.phase = state.after.length ? 'results' : 'after';
        state.index = 0;
      } else if (state.phase === 'after') {
        if (!state.afterFeedback) {
          if (!state.selected) return;
          state.after.push(state.selected);
          state.afterFeedback = true;
        } else if (state.index < afterQuestions.length - 1) {
          state.index += 1;
          state.afterFeedback = false;
        } else state.phase = 'results';
      } else state.phase = 'explore';
      renderPhase();
    });

    $('vj-restart').addEventListener('click', () => {
      stopPlayback();
      state.phase = 'intro';
      state.before = [];
      state.after = [];
      state.afterFeedback = false;
      state.index = 0;
      state.week = 1;
      state.scenario = 'baseline';
      state.capacity = 0.75;
      state.stamps.clear();
      state.place = null;
      renderScene();
      renderPhase();
    });

    scenarioButtons.forEach((button) => button.addEventListener('click', () => {
      state.scenario = button.dataset.vjScenario;
      state.place = null;
      renderScene();
    }));
    capacityButtons.forEach((button) => button.addEventListener('click', () => {
      state.capacity = Number(button.dataset.vjCapacity);
      state.place = null;
      renderScene();
    }));
    placeButtons.forEach((button) => button.addEventListener('click', () => {
      state.place = button.dataset.vjPlace;
      placeButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      renderScene();
      if (state.place === 'finance') {
        stopPlayback();
        $('vj-journal').showModal();
      }
    }));
    $('vj-week').addEventListener('input', () => {
      state.week = Number($('vj-week').value);
      state.place = null;
      renderScene();
    });
    $('vj-play').addEventListener('click', () => {
      if (state.timer) {
        stopPlayback();
        return;
      }
      if (reducedMotion.matches) {
        $('vj-motion-note').textContent = 'Motion is reduced on this device. Use the week slider to explore.';
        $('vj-motion-note').hidden = false;
        return;
      }
      state.week = 1;
      state.place = null;
      $('vj-play').textContent = '❚❚ Pause';
      $('vj-play').setAttribute('aria-pressed', 'true');
      renderScene();
      state.timer = root.setInterval(() => {
        state.week += 1;
        renderScene();
        if (state.week >= state.data.manifest.weeks) stopPlayback();
      }, 110);
    });
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) stopPlayback();
      $('vj-play').disabled = reducedMotion.matches;
      $('vj-motion-note').hidden = !reducedMotion.matches;
      if (reducedMotion.matches) $('vj-motion-note').textContent = 'Motion is reduced on this device. Use the week slider to explore.';
    });

    $('vj-journal-open').addEventListener('click', () => {
      stopPlayback();
      $('vj-journal').showModal();
    });
    $('vj-journal-close').addEventListener('click', () => $('vj-journal').close());
    $('vj-journal').addEventListener('click', (event) => { if (event.target === $('vj-journal')) $('vj-journal').close(); });
    $('vj-journal').querySelector('[data-source-id]').addEventListener('click', () => $('vj-journal').close());

    async function loadData() {
      try {
        const response = await root.fetch('./data/county-sim.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        for (const scenarioId of Object.keys(data.manifest.scenarios)) {
          for (const capacity of data.manifest.capacity_multipliers) {
            for (let week = 1; week <= data.manifest.weeks; week += 1) selectView(data, scenarioId, capacity, week);
          }
        }
        state.data = data;
        renderScene();
        renderPhase();
      } catch (error) {
        $('vj-error').textContent = `The simulation export could not be loaded: ${error.message}. Open this page from the Learning Lab web server.`;
        $('vj-error').hidden = false;
      }
    }

    renderPhase();
    loadData();
  }
})(typeof window === 'undefined' ? globalThis : window);
