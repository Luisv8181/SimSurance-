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
    return {
      scenarioId,
      scenarioLabel: data.manifest.scenarios[scenarioId].label,
      capacity,
      week,
      weeks: data.manifest.weeks,
      replications: run.replications,
      configId: data.manifest.config_id,
      weekly: {
        waitlist: run.weekly_waitlist_mean[week - 1],
        inCare: run.weekly_in_care_mean[week - 1],
        slots: m.weekly_slots.mean,
      },
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

  function scoreAnswers(correct, answers) {
    if (!Array.isArray(correct) || !Array.isArray(answers)) {
      throw new TypeError('Learning check answers must be arrays');
    }
    return correct.reduce((score, key, index) => score + Number(Boolean(answers[index]) && answers[index] === key), 0);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { selectView, scoreAnswers };
  } else {
    root.SimSuranceJourney = { selectView, scoreAnswers };
    if (root.document) {
      const ready = () => {
        if (document.getElementById('visual-journey')) startLesson();
      };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
      else ready();
    }
  }

  function startLesson() {
    const $ = (id) => document.getElementById(id);
    const scenarioButtons = [...document.querySelectorAll('[data-vj-scenario]')];
    const capacityButtons = [...document.querySelectorAll('[data-vj-capacity]')];
    const weekInput = $('vj-week');
    const reducedMotion = root.matchMedia('(prefers-reduced-motion: reduce)');
    const state = { data: null, scenario: 'baseline', capacity: 1, week: 1, timer: null, beforeScore: null, scaleMax: 100 };
    const beforeQuestions = [
      {
        prompt: 'A person has insurance but cannot find an appointment. What is still possible?',
        options: ['The plan is definitely invalid', 'Provider capacity may be limited', 'Their claim was denied'],
        answer: 'b',
        explanation: 'Coverage and an open appointment are different things. The story does not establish a denied claim.',
      },
      {
        prompt: 'A coordinator helps people stay on a waitlist. Does that create therapy appointments?',
        options: ['Yes, automatically', 'Only if the payer is Medicaid', 'No, available clinician time is separate'],
        answer: 'c',
        explanation: 'Coordination may change engagement, but provider slots remain a separate constraint.',
      },
      {
        prompt: 'A plan receives capitation and pays a practice for a session. Can both be added as separate system costs?',
        options: ['No, that can double-count a transfer', 'Yes, always', 'Only if the claim is electronic'],
        answer: 'a',
        explanation: 'The upstream transfer and downstream service payment are different layers of the same financing flow.',
      },
    ];
    const afterQuestions = [
      {
        prompt: 'In the model, coverage exists while the waiting dots grow. What would most directly increase appointment openings?',
        options: ['A larger funding transfer alone', 'More available clinician slots', 'Renaming the insurance plan'],
        answer: 'b',
        explanation: 'More provider capacity directly adds appointment slots. Funding may help create capacity, but it does not do so instantly.',
      },
      {
        prompt: 'The check-in pilot lowers waitlist dropout, but the queue can still grow. Why?',
        options: ['Waiting means people are uninsured', 'Every claim was denied', 'People remain on the list while slots stay scarce'],
        answer: 'c',
        explanation: 'Keeping people engaged can leave more people waiting if appointment capacity does not also expand.',
      },
      {
        prompt: 'You are comparing total system cost in this toy model. Which amount stays outside that total?',
        options: ['Capitation transfer', 'Service payment', 'Coordinator cost'],
        answer: 'a',
        explanation: 'The model tracks capitation as a financing transfer and counts downstream service and coordinator costs separately.',
      },
    ];

    function renderQuiz(container, questions, group) {
      container.replaceChildren();
      questions.forEach((question, index) => {
        const fieldset = document.createElement('fieldset');
        fieldset.className = 'vj-question';
        const legend = document.createElement('legend');
        legend.textContent = `${String(index + 1).padStart(2, '0')} / ${question.prompt}`;
        fieldset.append(legend);
        question.options.forEach((option, optionIndex) => {
          const label = document.createElement('label');
          label.className = 'vj-answer';
          const input = document.createElement('input');
          input.type = 'radio';
          input.name = `${group}-${index}`;
          input.value = String.fromCharCode(97 + optionIndex);
          label.append(input, document.createTextNode(option));
          fieldset.append(label);
        });
        container.append(fieldset);
      });
    }

    function responses(group, length) {
      return Array.from({ length }, (_, index) => document.querySelector(`input[name="${group}-${index}"]:checked`)?.value || '');
    }

    function stopPlayback() {
      if (state.timer) root.clearInterval(state.timer);
      state.timer = null;
      $('vj-play').textContent = '▶ Play the year';
      $('vj-play').setAttribute('aria-pressed', 'false');
    }

    function dots(element, value) {
      const count = Math.round(value / 5);
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i += 1) {
        const dot = document.createElement('span');
        dot.className = 'vj-dot';
        dot.setAttribute('aria-hidden', 'true');
        fragment.append(dot);
      }
      element.replaceChildren(fragment);
    }

    const number = (value, digits = 0) => value.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });
    const money = (cents) => `$${number(cents / 100)}`;
    const range = (metric, format) => `${format(metric.p10)}–${format(metric.p90)} across runs`;

    function render() {
      if (!state.data) return;
      let view;
      let baseline;
      let pilot;
      try {
        view = selectView(state.data, state.scenario, state.capacity, state.week);
        baseline = selectView(state.data, 'baseline', state.capacity, 52);
        pilot = selectView(state.data, 'care_coordination_pilot', state.capacity, 52);
      } catch (error) {
        $('vj-error').textContent = `This model view cannot be shown: ${error.message}`;
        $('vj-error').hidden = false;
        $('vj-sim').hidden = true;
        stopPlayback();
        return;
      }
      $('vj-error').hidden = true;
      $('vj-sim').hidden = false;
      weekInput.value = String(state.week);
      $('vj-week-label').textContent = `Week ${state.week} of ${view.weeks}`;
      $('vj-scenario-label').textContent = view.scenarioLabel;
      $('vj-run-label').textContent = `Fictional Riverbend County · weekly averages across ${view.replications} runs`;
      $('vj-wait-number').textContent = number(view.weekly.waitlist, 1);
      $('vj-care-number').textContent = number(view.weekly.inCare, 1);
      $('vj-slot-number').textContent = number(view.weekly.slots, 1);
      $('vj-wait-track').style.width = `${view.weekly.waitlist / state.scaleMax * 100}%`;
      $('vj-care-track').style.width = `${view.weekly.inCare / state.scaleMax * 100}%`;
      $('vj-bar-scale').textContent = `Bars share a 0–${state.scaleMax} episode scale across all settings.`;
      dots($('vj-wait-dots'), view.weekly.waitlist);
      dots($('vj-care-dots'), view.weekly.inCare);
      $('vj-completed').textContent = number(view.annual.completed.mean);
      $('vj-completed-range').textContent = range(view.annual.completed, (v) => number(v));
      $('vj-wait').textContent = `${number(view.annual.meanWaitWeeks.mean, 1)} weeks`;
      $('vj-wait-range').textContent = range(view.annual.meanWaitWeeks, (v) => `${number(v, 1)} weeks`);
      $('vj-unmet').textContent = `${number(view.annual.unmetNeedShare.mean * 100)}%`;
      $('vj-unmet-range').textContent = range(view.annual.unmetNeedShare, (v) => `${number(v * 100)}%`);
      $('vj-service').textContent = money(view.annual.servicePaymentsCents.mean);
      $('vj-coordinator').textContent = money(view.annual.coordinatorCostCents.mean);
      $('vj-system').textContent = money(view.annual.systemCostCents.mean);
      $('vj-capitation').textContent = money(view.annual.capitationTransfersCents.mean);
      $('vj-base-completed').textContent = number(baseline.annual.completed.mean);
      $('vj-pilot-completed').textContent = number(pilot.annual.completed.mean);
      $('vj-base-wait').textContent = `${number(baseline.annual.meanWaitWeeks.mean, 1)} weeks`;
      $('vj-pilot-wait').textContent = `${number(pilot.annual.meanWaitWeeks.mean, 1)} weeks`;
      $('vj-base-cost').textContent = money(baseline.annual.systemCostCents.mean);
      $('vj-pilot-cost').textContent = money(pilot.annual.systemCostCents.mean);
      $('vj-model-id').textContent = `${view.configId} · ${view.replications} seeded runs · ${view.weeks} weeks`;
      scenarioButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.vjScenario === state.scenario)));
      capacityButtons.forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.vjCapacity) === state.capacity)));
    }

    renderQuiz($('vj-before-questions'), beforeQuestions, 'before');
    renderQuiz($('vj-after-questions'), afterQuestions, 'after');
    $('vj-before-submit').addEventListener('click', () => {
      const answers = responses('before', beforeQuestions.length);
      if (answers.some((answer) => !answer)) {
        $('vj-before-feedback').textContent = 'Choose an answer for each question to save your starting point.';
        return;
      }
      state.beforeScore = scoreAnswers(beforeQuestions.map((q) => q.answer), answers);
      $('vj-before-feedback').textContent = 'Starting answers saved for this visit. Explore the model, then try the final check.';
      $('vj-before-submit').disabled = true;
      $('vj-before-questions').querySelectorAll('input').forEach((input) => { input.disabled = true; });
    });
    $('vj-after-submit').addEventListener('click', () => {
      if (state.beforeScore === null) {
        $('vj-after-feedback').textContent = 'Save your starting answers first so you can compare what changed.';
        return;
      }
      const answers = responses('after', afterQuestions.length);
      if (answers.some((answer) => !answer)) {
        $('vj-after-feedback').textContent = 'Choose an answer for each final question.';
        return;
      }
      const afterScore = scoreAnswers(afterQuestions.map((q) => q.answer), answers);
      const delta = afterScore - state.beforeScore;
      $('vj-after-feedback').textContent = `Starting check: ${state.beforeScore}/3. Final check: ${afterScore}/3. ${delta > 0 ? `Up ${delta}.` : delta < 0 ? `Down ${Math.abs(delta)}.` : 'Same score.'} This is a self-check, not a validated test of mastery.`;
      const explanations = $('vj-explanations');
      explanations.replaceChildren();
      afterQuestions.forEach((question, index) => {
        const item = document.createElement('p');
        item.className = answers[index] === question.answer ? 'vj-right' : 'vj-review';
        item.textContent = `${index + 1}. ${answers[index] === question.answer ? 'Correct.' : 'Review this.'} ${question.explanation}`;
        explanations.append(item);
      });
      explanations.hidden = false;
      $('vj-after-questions').querySelectorAll('input').forEach((input) => { input.disabled = true; });
      $('vj-after-submit').disabled = true;
    });
    scenarioButtons.forEach((button) => button.addEventListener('click', () => {
      state.scenario = button.dataset.vjScenario;
      render();
    }));
    capacityButtons.forEach((button) => button.addEventListener('click', () => {
      state.capacity = Number(button.dataset.vjCapacity);
      render();
    }));
    weekInput.addEventListener('input', () => {
      state.week = Number(weekInput.value);
      render();
    });
    $('vj-play').addEventListener('click', () => {
      if (state.timer) {
        stopPlayback();
        return;
      }
      if (reducedMotion.matches) {
        $('vj-play-note').textContent = 'Motion is reduced on this device. Use the week slider to explore.';
        return;
      }
      if (state.week === 52) state.week = 1;
      $('vj-play').textContent = '❚❚ Pause';
      $('vj-play').setAttribute('aria-pressed', 'true');
      state.timer = root.setInterval(() => {
        state.week += 1;
        render();
        if (state.week >= 52) stopPlayback();
      }, 280);
    });
    reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) stopPlayback(); });

    root.fetch('./data/county-sim.json').then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    }).then((data) => {
      state.data = data;
      const highestWeeklyCount = Math.max(...data.runs.flatMap((run) => [...run.weekly_waitlist_mean, ...run.weekly_in_care_mean]));
      if (!Number.isFinite(highestWeeklyCount) || highestWeeklyCount <= 0) throw new Error('weekly model values are unavailable');
      state.scaleMax = Math.ceil(highestWeeklyCount / 10) * 10;
      render();
    }).catch((error) => {
      $('vj-error').textContent = `The simulation export could not be loaded: ${error.message}. Open this page from a local web server or the published Learning Lab.`;
      $('vj-error').hidden = false;
    });
  }
})(typeof window === 'undefined' ? globalThis : window);
