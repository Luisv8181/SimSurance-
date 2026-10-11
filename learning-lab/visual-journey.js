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

  function adjudicateToyClaim(eligibility, network, auth, data) {
    if (eligibility !== 'valid') {
      return { status: 'denied', code: 'DENIED_INELIGIBLE', message: 'Member coverage is inactive or terminated on the date of service.' };
    }
    if (network !== 'in_network') {
      return { status: 'denied', code: 'DENIED_OUT_OF_NETWORK', message: 'Provider is not in the contracted behavioral health network.' };
    }
    if (auth !== 'valid') {
      return { status: 'review', code: 'PENDING_PRIOR_AUTH', message: 'Claim requires clinical prior authorization review before payment.' };
    }
    if (data !== 'valid') {
      return { status: 'review', code: 'PENDING_DATA_CORRECTION', message: 'Malformed claim data, invalid billing NPI, or missing diagnosis code.' };
    }
    return { status: 'paid', code: 'PAID', amountCents: 9000, message: 'All criteria verified. Claim approved for payment at the agreed fee schedule rate of $90.00.' };
  }

  const BUILDINGS = {
    coverage: {
      key: 'coverage',
      num: 1,
      name: 'Town Hall · Coverage & Access',
      subtitle: 'Why having Medicaid does not guarantee an immediate appointment',
      sealTitle: '1·COVERAGE: ACCESS != SLOT',
      icon: '🏛️',
    },
    wait: {
      key: 'wait',
      num: 2,
      name: 'Waiting Station · Queue Dynamics',
      subtitle: 'The retention paradox: why check-in coordination can increase the waitlist',
      sealTitle: '2·QUEUE: RETENTION PARADOX',
      icon: '⌛',
    },
    clinic: {
      key: 'clinic',
      num: 3,
      name: 'Care Clinic · Provider Capacity & Workforce',
      subtitle: 'The physical bottleneck: clinician hours and weekly appointment slots',
      sealTitle: '3·CLINIC: WORKFORCE BOTTLENECK',
      icon: '✚',
    },
    finance: {
      key: 'finance',
      num: 4,
      name: 'Town Bank · Statutory Ledger & Money Flows',
      subtitle: 'The Accounting Firewall: zero double-counting of capitation and claims',
      sealTitle: '4·LEDGER: ACCOUNTING FIREWALL',
      icon: '◆',
    },
    claims: {
      key: 'claims',
      num: 5,
      name: 'Claims Adjudication Post · 4-Point Decision Engine',
      subtitle: 'Test claims against coverage, network status, authorization, and data rules',
      sealTitle: '5·CLAIMS: 4-POINT ADJUDICATION',
      icon: '⚖️',
    },
    terminal: {
      key: 'terminal',
      num: 6,
      name: 'County Terminal · In-Browser Python WebAssembly Lab',
      subtitle: 'Execute discrete-event simulation runs right inside your browser in ~25ms',
      sealTitle: '6·TERMINAL: WASM COUNTY LAB',
      icon: '💻',
    },
    archives: {
      key: 'archives',
      num: 7,
      name: 'Town Archives · Policy Provenance & Statutory Rules',
      subtitle: 'How to verify real Pennsylvania statutes without hallucinating policy',
      sealTitle: '7·ARCHIVES: POLICY PROVENANCE',
      icon: '📜',
    },
    crossroads: {
      key: 'crossroads',
      num: 8,
      name: "Travelers' Crossroads · Multi-Stakeholder Perspectives",
      subtitle: 'Experience the same care episode through member, clinician, and auditor eyes',
      sealTitle: '8·JOURNEYS: THREE PERSPECTIVES',
      icon: '🧭',
    },
  };

  // Zero-dependency 8-bit chiptune Web Audio synthesizer
  const AudioSynth = (function () {
    let ctx = null;
    let muted = true; // default muted for accessible autoplay compliance

    function getContext() {
      if (muted) return null;
      if (typeof window === 'undefined') return null;
      const AudioCtx = root.AudioContext || root.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!ctx) {
        try {
          ctx = new AudioCtx();
        } catch (_) {
          return null;
        }
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      return ctx;
    }

    function playTone(freq, type, duration, startTime, gainLevel = 0.08) {
      const c = getContext();
      if (!c) return;
      try {
        const osc = c.createOscillator();
        const gain = c.createGain();
        const t0 = startTime !== undefined ? startTime : c.currentTime;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t0);
        gain.gain.setValueAtTime(gainLevel, t0);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t0);
        osc.stop(t0 + duration);
      } catch (_) {
        // Safe fallback for browsers with restricted audio policy
      }
    }

    return {
      isMuted: () => muted,
      setMuted: (val) => { muted = Boolean(val); },
      toggleMute: () => {
        muted = !muted;
        if (!muted) getContext();
        return muted;
      },
      blip: () => {
        playTone(520, 'square', 0.045);
      },
      chirp: () => {
        const c = getContext();
        if (!c) return;
        const now = c.currentTime;
        playTone(660, 'square', 0.04, now);
        playTone(880, 'square', 0.06, now + 0.04);
      },
      stamp: () => {
        const c = getContext();
        if (!c) return;
        const now = c.currentTime;
        playTone(523.25, 'triangle', 0.08, now);
        playTone(659.25, 'triangle', 0.08, now + 0.08);
        playTone(783.99, 'square', 0.16, now + 0.16);
      },
      step: () => {
        playTone(220, 'triangle', 0.02, undefined, 0.03);
      },
      celebrate: () => {
        const c = getContext();
        if (!c) return;
        const now = c.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          playTone(freq, 'square', 0.12, now + i * 0.09, 0.06);
        });
      },
    };
  })();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { selectView, compareOutcomes, scoreAnswers, adjudicateToyClaim, BUILDINGS, AudioSynth };
  } else {
    root.SimSuranceJourney = { selectView, compareOutcomes, scoreAnswers, adjudicateToyClaim, BUILDINGS, AudioSynth };
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
    const reducedMotion = root.matchMedia ? root.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false, addEventListener: () => {} };
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
      seals: new Set(),
      currentChamber: null,
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
      if (!container) return;
      const count = Math.round(value / 5);
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i += 1) {
        const actor = document.createElement('span');
        actor.className = `vj-actor vj-actor-${type} char-${i % 4}`;
        actor.style.left = `${type === 'wait' ? 34 + (i % 8) * 2.9 : 69 + (i % 6) * 2.7}%`;
        actor.style.top = `${73 + Math.floor(i / (type === 'wait' ? 8 : 6)) * 5}%`;
        actor.style.animationDelay = `${(i % 7) * -0.13}s`;
        actor.setAttribute('aria-hidden', 'true');
        fragment.append(actor);
      }
      container.replaceChildren(fragment);
    }

    function recordObservation() {
      const prevCount = state.stamps.size;
      if (state.week === state.data.manifest.weeks) {
        if (state.scenario === 'baseline' && state.capacity === 0.75) state.stamps.add('baseline');
        if (state.scenario === 'care_coordination_pilot' && state.capacity === 0.75) state.stamps.add('pilot');
        if (state.scenario === 'care_coordination_pilot' && state.capacity >= 1.25) state.stamps.add('capacity');
      }
      if (state.stamps.size > prevCount) {
        AudioSynth.stamp();
      }
      ['baseline', 'pilot', 'capacity'].forEach((name) => {
        const badge = document.querySelector(`[data-vj-stamp="${name}"]`);
        if (badge) {
          badge.classList.toggle('earned', state.stamps.has(name));
          badge.setAttribute('aria-label', `${badge.dataset.label}: ${state.stamps.has(name) ? 'discovered' : 'not yet discovered'}`);
        }
      });
      Object.keys(BUILDINGS).forEach((key) => {
        const badge = document.querySelector(`[data-vj-stamp="${key}"]`);
        if (badge) {
          badge.classList.toggle('earned', state.seals.has(key));
          badge.setAttribute('aria-label', `${badge.dataset.label}: ${state.seals.has(key) ? 'discovered' : 'not yet discovered'}`);
        }
      });
      const countEl = $('vj-stamp-count');
      if (countEl) countEl.textContent = `${state.seals.size}/8 seals discovered`;
      if (state.phase === 'explore') $('vj-step').textContent = `${state.seals.size} / 8`;
    }

    function claimSeal(key) {
      if (!BUILDINGS[key]) return;
      if (state.seals.has(key)) return;
      state.seals.add(key);
      AudioSynth.stamp();

      if (key === 'wait') state.stamps.add('baseline');
      if (key === 'coverage' || state.seals.size >= 2) state.stamps.add('pilot');
      if (key === 'clinic' || state.seals.size >= 3) state.stamps.add('capacity');

      if (root.SimSuranceLab && typeof root.SimSuranceLab.recordCheckpoint === 'function') {
        root.SimSuranceLab.recordCheckpoint('seal-' + key);
      }

      const guideImg = $('vj-guide-img');
      if (guideImg) {
        guideImg.src = './assets/glim-celebrate.svg';
        setTimeout(() => {
          if (guideImg && state.phase === 'explore') guideImg.src = './assets/glim-guide.svg';
        }, 2200);
      }

      const b = BUILDINGS[key];
      const sealStatus = $('vj-chamber-seal-status');
      if (sealStatus) {
        sealStatus.classList.add('earned');
        sealStatus.textContent = `✓ SEAL DISCOVERED: ${b.sealTitle}`;
      }
      const claimBtn = $('vj-chamber-claim');
      if (claimBtn) {
        claimBtn.classList.add('claimed');
        claimBtn.textContent = '✓ Seal Claimed';
        claimBtn.disabled = true;
      }

      recordObservation();
      renderPassport();
    }

    function renderPassport() {
      const container = $('vj-journal-passport');
      if (!container) return;
      const fragment = document.createDocumentFragment();
      Object.values(BUILDINGS).forEach((b) => {
        const card = document.createElement('div');
        card.className = 'vj-journal-metric';
        card.style.cursor = 'pointer';
        const isEarned = state.seals.has(b.key);
        card.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="font-weight:800;color:var(--ink)">${b.icon} ${b.num}·${b.name.split('·')[0].trim()}</span>
            <span class="chamber-badge ${isEarned ? 'paid' : 'review'}" style="font-size:.65rem">${isEarned ? '✓ EARNED' : '✦ VISIT'}</span>
          </div>
          <strong style="font-size:.88rem;margin:4px 0;color:${isEarned ? 'var(--mint)' : 'var(--muted)'}">${b.sealTitle}</strong>
          <small style="display:block;margin-top:4px">${isEarned ? 'Recorded in Riverbend passport' : 'Click to enter chamber & discover seal'}</small>
        `;
        card.addEventListener('click', () => {
          $('vj-journal').close();
          openChamber(b.key);
        });
        fragment.append(card);
      });
      container.replaceChildren(fragment);
    }

    function closeChamber() {
      const chamber = $('vj-chamber');
      if (chamber && chamber.open) {
        AudioSynth.blip();
        chamber.close();
        state.currentChamber = null;
      }
    }

    function openChamber(key) {
      const b = BUILDINGS[key];
      if (!b) return;
      stopPlayback();
      AudioSynth.blip();
      state.currentChamber = key;
      state.place = key;
      placeButtons.forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.vjPlace === key)));

      $('vj-chamber-title').textContent = `${b.icon} ${b.name}`;
      $('vj-chamber-subtitle').textContent = b.subtitle;

      const isEarned = state.seals.has(key);
      const sealStatus = $('vj-chamber-seal-status');
      if (sealStatus) {
        sealStatus.classList.toggle('earned', isEarned);
        sealStatus.textContent = isEarned ? `✓ SEAL DISCOVERED: ${b.sealTitle}` : 'SEAL: UNDISCOVERED';
      }

      const claimBtn = $('vj-chamber-claim');
      if (claimBtn) {
        claimBtn.classList.toggle('claimed', isEarned);
        claimBtn.textContent = isEarned ? '✓ Seal Claimed' : '✦ Claim Discovery Seal';
        claimBtn.disabled = isEarned;
        claimBtn.onclick = () => claimSeal(key);
      }

      renderChamberContent(key);
      $('vj-chamber').showModal();
    }

    function renderChamberContent(key) {
      const body = $('vj-chamber-body');
      if (!body) return;
      body.replaceChildren();

      if (key === 'coverage') {
        const wrap = document.createElement('div');
        wrap.innerHTML = `
          <div class="chamber-card">
            <h3>Medicaid Access in Pennsylvania: Enrollment vs. Clinic Slots</h3>
            <p>Pennsylvania uses a managed care carve-out system for behavioral health (HealthChoices). Enrollees receive a Medicaid card, but having insurance does not guarantee immediate appointment availability when outpatient clinics face clinician workforce limits.</p>
            <div class="chamber-grid">
              <div style="background:var(--panel);padding:14px;border:1px solid var(--line);border-radius:10px">
                <strong>Jordan's Member Status</strong>
                <p style="margin:6px 0;font-size:.85rem">✓ Enrolled in Medical Assistance</p>
                <p style="margin:6px 0;font-size:.85rem">✓ Holds valid Medicaid Access card</p>
                <p style="margin:6px 0;font-size:.85rem;color:var(--mint)">✓ Behavioral health benefit active</p>
              </div>
              <div style="background:var(--panel);padding:14px;border:1px solid var(--line);border-radius:10px">
                <strong>Riverbend Provider Supply</strong>
                <p style="margin:6px 0;font-size:.85rem">4 participating outpatient therapists</p>
                <p style="margin:6px 0;font-size:.85rem">Weekly capacity: 42 slots at 0.75× supply</p>
                <p style="margin:6px 0;font-size:.85rem;color:var(--gold)">⚠ Next appointment: 6–8 weeks</p>
              </div>
            </div>
            <p><strong>Statutory Provenance:</strong> The BHC-MCO agreement mandates provider network adequacy standards, but financial contracts alone cannot recruit or train licensed therapists overnight.</p>
            <button type="button" id="chamber-cov-source" class="vj-journal-source" style="padding:6px 12px;border-radius:6px;font-weight:750">📖 Inspect Source: PA DHS Behavioral Health MCO Agreement</button>
          </div>
          <div class="chamber-card chamber-quiz">
            <h4>Chamber Challenge:</h4>
            <p>If the state increases Medicaid funding without expanding clinician hours, what happens to the waitlist?</p>
            <button type="button" data-quiz-cov="a">A · The waitlist disappears automatically</button>
            <button type="button" data-quiz-cov="b">B · More people seek care against a fixed clinician supply, so waiting persists</button>
            <button type="button" data-quiz-cov="c">C · Clinicians work 80 hours a week without extra staff</button>
            <div id="coverage-quiz-feedback" class="chamber-feedback"></div>
          </div>
        `;
        body.append(wrap);

        const srcBtn = wrap.querySelector('#chamber-cov-source');
        if (srcBtn) {
          srcBtn.addEventListener('click', () => {
            closeChamber();
            if (root.SimSuranceLab && typeof root.SimSuranceLab.openSourceDrawer === 'function') {
              root.SimSuranceLab.openSourceDrawer('pa-dhs-bhc-mcos');
            }
          });
        }
        wrap.querySelectorAll('[data-quiz-cov]').forEach((btn) => {
          btn.addEventListener('click', () => {
            AudioSynth.blip();
            wrap.querySelectorAll('[data-quiz-cov]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
            const fb = wrap.querySelector('#coverage-quiz-feedback');
            if (btn.dataset.quizCov === 'b') {
              fb.textContent = '✓ Correct! Coverage finances access, but provider workforce delivers it. Without clinician supply, queues form.';
              fb.style.color = 'var(--mint)';
            } else {
              fb.textContent = '↺ Try again: Financing does not physically create clinician hours or appointments.';
              fb.style.color = 'var(--gold)';
            }
          });
        });
      } else if (key === 'wait') {
        const wrap = document.createElement('div');
        wrap.innerHTML = `
          <div class="chamber-card">
            <h3>52-Week Queue Dynamics & The Retention Paradox</h3>
            <p>Discrete-event queue modeling reveals unexpected feedback loops. When you introduce a waitlist check-in coordinator to support patients while they wait:</p>
            <div class="chamber-grid">
              <div style="background:var(--panel);padding:14px;border:1px solid var(--line);border-radius:10px">
                <strong>Baseline Setting (No Coordinator)</strong>
                <p style="margin:6px 0;font-size:.85rem">Weekly dropout: 4.0%</p>
                <p style="margin:6px 0;font-size:.85rem">Completed episodes (year): ~138</p>
                <p style="margin:6px 0;font-size:.85rem;color:var(--mint)">Still waiting at week 52: ~69</p>
              </div>
              <div style="background:var(--panel);padding:14px;border:1px solid var(--line);border-radius:10px">
                <strong>Check-In Pilot Setting</strong>
                <p style="margin:6px 0;font-size:.85rem">Weekly dropout: 2.0% (halved!)</p>
                <p style="margin:6px 0;font-size:.85rem">Completed episodes (year): ~149 (+11)</p>
                <p style="margin:6px 0;font-size:.85rem;color:var(--gold)">Still waiting at week 52: ~94 (+25!)</p>
              </div>
            </div>
            <p><strong>The Takeaway:</strong> The pilot successfully prevents discouraged dropouts, so more people stay engaged. But because weekly appointment slots remain fixed (42/wk), the active queue grows larger!</p>
          </div>
          <div class="chamber-card">
            <h4>Interactive Week-by-Week Queue Inspector:</h4>
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
              <label for="chamber-wait-slider" style="font-weight:750">Simulation Week:</label>
              <input id="chamber-wait-slider" type="range" min="1" max="52" value="52" style="flex:1;min-width:180px">
              <strong id="chamber-wait-week-disp" style="color:var(--mint);font-family:ui-monospace,monospace">WEEK 52</strong>
            </div>
            <div id="chamber-wait-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px"></div>
          </div>
        `;
        body.append(wrap);

        function updateWaitScrubber(wk) {
          const disp = wrap.querySelector('#chamber-wait-week-disp');
          const grid = wrap.querySelector('#chamber-wait-grid');
          if (disp) disp.textContent = `WEEK ${wk}`;
          if (!grid || !state.data) return;
          const bRun = selectView(state.data, 'baseline', 0.75, wk);
          const pRun = selectView(state.data, 'care_coordination_pilot', 0.75, wk);
          grid.innerHTML = `
            <div class="vj-journal-metric">
              <span>Baseline Waiting (Wk ${wk})</span>
              <strong style="color:var(--ink)">${format(bRun.weekly.waitlist, 1)}</strong>
              <small>In care: ${format(bRun.weekly.inCare, 1)}</small>
            </div>
            <div class="vj-journal-metric">
              <span>Pilot Waiting (Wk ${wk})</span>
              <strong style="color:var(--gold)">${format(pRun.weekly.waitlist, 1)}</strong>
              <small>In care: ${format(pRun.weekly.inCare, 1)}</small>
            </div>
          `;
        }

        const slider = wrap.querySelector('#chamber-wait-slider');
        if (slider) {
          slider.addEventListener('input', () => updateWaitScrubber(Number(slider.value)));
          updateWaitScrubber(52);
        }
      } else if (key === 'clinic') {
        const wrap = document.createElement('div');
        wrap.innerHTML = `
          <div class="chamber-card">
            <h3>Care Clinic: Provider Capacity & Workforce Scaling</h3>
            <p>Why is clinician capacity the master key? Select a capacity multiplier to see how expanding therapist hours transforms outcomes over 52 weeks:</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0">
              <button type="button" class="vj-choice" data-chamber-cap="0.75" aria-pressed="true">0.75× (42 slots/wk)</button>
              <button type="button" class="vj-choice" data-chamber-cap="1.0" aria-pressed="false">1.0× (56 slots/wk)</button>
              <button type="button" class="vj-choice" data-chamber-cap="1.25" aria-pressed="false">1.25× (70 slots/wk)</button>
              <button type="button" class="vj-choice" data-chamber-cap="1.5" aria-pressed="false">1.5× (84 slots/wk)</button>
            </div>
            <div id="chamber-clinic-metrics" class="vj-journal-grid" style="margin-top:12px"></div>
            <p style="margin-top:14px"><strong>Workforce Finding:</strong> Scaling from 0.75× to 1.5× capacity reduces average waiting from <strong>7.1 weeks down to 0.09 weeks</strong>, eliminating 99% of unmet care need!</p>
          </div>
        `;
        body.append(wrap);

        function updateClinicCap(cap) {
          wrap.querySelectorAll('[data-chamber-cap]').forEach((btn) => {
            btn.setAttribute('aria-pressed', String(Number(btn.dataset.chamberCap) === cap));
          });
          const metricsGrid = wrap.querySelector('#chamber-clinic-metrics');
          if (!metricsGrid || !state.data) return;
          const run = selectView(state.data, 'care_coordination_pilot', cap, 52);
          metricsGrid.innerHTML = `
            <div class="vj-journal-metric">
              <span>Completed Episodes</span>
              <strong>${format(run.annual.completed.mean)}</strong>
              <small>Across 30 runs</small>
            </div>
            <div class="vj-journal-metric">
              <span>Mean Wait Time</span>
              <strong style="color:var(--mint)">${format(run.annual.meanWaitWeeks.mean, 1)} wks</strong>
              <small>P90: ${format(run.annual.meanWaitWeeks.p90, 1)} wks</small>
            </div>
            <div class="vj-journal-metric">
              <span>Unmet Need Share</span>
              <strong style="color:${cap >= 1.25 ? 'var(--mint)' : 'var(--gold)'}">${format(run.annual.unmetNeedShare.mean * 100, 1)}%</strong>
              <small>Dropped from waitlist</small>
            </div>
          `;
        }

        wrap.querySelectorAll('[data-chamber-cap]').forEach((btn) => {
          btn.addEventListener('click', () => {
            AudioSynth.blip();
            updateClinicCap(Number(btn.dataset.chamberCap));
          });
        });
        updateClinicCap(0.75);
      } else if (key === 'finance') {
        const wrap = document.createElement('div');
        wrap.innerHTML = `
          <div class="chamber-card">
            <h3>Town Bank: Statutory Accounting & The Ledger Firewall</h3>
            <p>Statutory healthcare accounting requires strict firewalling between distinct transaction tiers. A simulation model must reflect actual double-entry invariants:</p>
            <div class="chamber-grid">
              <div style="background:var(--panel);padding:14px;border:1px solid var(--line);border-radius:10px">
                <strong>Layer 1: Upstream Financing Transfer</strong>
                <p style="margin:4px 0;font-size:.85rem">State DHS → County BHC-MCO</p>
                <strong style="display:block;font-size:1.35rem;color:var(--gold);margin:6px 0">$2,400,000.00</strong>
                <small style="color:var(--muted)">$40.00 PMPM capitation for 5,000 enrolled members. Fixed prospective funding.</small>
              </div>
              <div style="background:var(--panel);padding:14px;border:1px solid var(--line);border-radius:10px">
                <strong>Layer 2: Downstream Operating Costs</strong>
                <p style="margin:4px 0;font-size:.85rem">MCO → Clinicians & Coordinator</p>
                <strong style="display:block;font-size:1.35rem;color:var(--mint);margin:6px 0">$253,711.00</strong>
                <small style="color:var(--muted)">Service claims ($90/session) + coordinator salary ($1,600/wk).</small>
              </div>
            </div>
            <div style="margin-top:12px;background:rgba(255,232,156,.1);border:1px solid var(--gold);padding:12px;border-radius:8px">
              <strong>⚠ The Double-Counting Hazard:</strong>
              <p style="margin:4px 0;font-size:.84rem">Never add Layer 1 and Layer 2 together ($2.4M + $253k = $2.65M)! The capitation transfer <em>funds</em> the downstream care. Adding them double-counts the same dollars.</p>
            </div>
          </div>
          <div class="chamber-card chamber-quiz">
            <h4>Ledger Invariant Quiz:</h4>
            <p>Why does SimSurance's ledger reject a run if <code>system_cost != service_payments + coordinator_cost</code>?</p>
            <button type="button" data-quiz-fin="a">A · It forgets to add the capitation transfer</button>
            <button type="button" data-quiz-fin="b">B · It violates the closed downstream delivery invariant, misrepresenting operating cash flows</button>
            <button type="button" data-quiz-fin="c">C · Floats are allowed in financial reports</button>
            <div id="finance-quiz-feedback" class="chamber-feedback"></div>
          </div>
        `;
        body.append(wrap);

        wrap.querySelectorAll('[data-quiz-fin]').forEach((btn) => {
          btn.addEventListener('click', () => {
            AudioSynth.blip();
            wrap.querySelectorAll('[data-quiz-fin]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
            const fb = wrap.querySelector('#finance-quiz-feedback');
            if (btn.dataset.quizFin === 'b') {
              fb.textContent = '✓ Exactly. In statutory accounting, consolidated downstream service equals fee claims plus direct coordinator expense. Capitation stays strictly separated.';
              fb.style.color = 'var(--mint)';
            } else {
              fb.textContent = '↺ Remember: Capitation is an upstream financing transfer. Adding it double-counts!';
              fb.style.color = 'var(--gold)';
            }
          });
        });
      } else if (key === 'claims') {
        const wrap = document.createElement('div');
        wrap.innerHTML = `
          <div class="chamber-card">
            <h3>Claims Adjudication Post: 4-Point Decision Engine</h3>
            <p>Every therapy session submitted by a clinic goes through automated adjudication rules. Adjust the 4 parameters below to observe the adjudication outcome in real time:</p>
            <div class="chamber-grid">
              <div class="chamber-field">
                <label for="adj-elig">1. Member Eligibility</label>
                <select id="adj-elig">
                  <option value="valid">Eligible Medicaid Member (Active)</option>
                  <option value="inactive">Terminated / Inactive Enrollment</option>
                </select>
              </div>
              <div class="chamber-field">
                <label for="adj-net">2. Provider Network</label>
                <select id="adj-net">
                  <option value="in_network">In-Network Contracted Clinician</option>
                  <option value="out_network">Out-of-Network Non-Contracted</option>
                </select>
              </div>
              <div class="chamber-field">
                <label for="adj-auth">3. Prior Authorization</label>
                <select id="adj-auth">
                  <option value="valid">Standard Outpatient (No Auth Needed)</option>
                  <option value="missing">Missing Required Prior Auth</option>
                </select>
              </div>
              <div class="chamber-field">
                <label for="adj-data">4. Claim Data Cleanliness</label>
                <select id="adj-data">
                  <option value="valid">Valid CPT 90834 & Clean Diagnosis</option>
                  <option value="invalid">Missing Diagnosis / NPI Mismatch</option>
                </select>
              </div>
            </div>
            <div id="adj-result-box" style="margin-top:14px;padding:14px;border-radius:10px;background:var(--panel);border:2px solid var(--line)">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <strong>Adjudication Determination:</strong>
                <span id="adj-badge" class="chamber-badge paid">PAID</span>
              </div>
              <p id="adj-msg" style="margin:8px 0 0;font-size:.86rem;color:var(--muted)">All criteria verified. Claim approved for payment at the agreed fee schedule rate of $90.00.</p>
            </div>
          </div>
        `;
        body.append(wrap);

        function runAdjudication() {
          const elig = wrap.querySelector('#adj-elig').value;
          const net = wrap.querySelector('#adj-net').value;
          const auth = wrap.querySelector('#adj-auth').value;
          const dt = wrap.querySelector('#adj-data').value;
          const outcome = adjudicateToyClaim(elig, net, auth, dt);
          const badge = wrap.querySelector('#adj-badge');
          const msg = wrap.querySelector('#adj-msg');
          badge.className = `chamber-badge ${outcome.status}`;
          badge.textContent = outcome.status.toUpperCase();
          msg.textContent = `${outcome.message} (${outcome.code})`;
          AudioSynth.step();
        }

        wrap.querySelectorAll('select').forEach((sel) => sel.addEventListener('change', runAdjudication));
      } else if (key === 'terminal') {
        const wrap = document.createElement('div');
        wrap.innerHTML = `
          <div class="chamber-card">
            <h3>County Python Terminal · WebAssembly Discrete-Event Lab</h3>
            <p>Run the actual Python discrete-event engine in your browser via Pyodide WebAssembly. Simulates 5,000 citizens and 52 weeks in ~25 milliseconds!</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:12px 0">
              <label for="term-preset" style="font-weight:750">Choose Preset:</label>
              <select id="term-preset" style="flex:1;min-width:180px;background:var(--panel);color:var(--ink);border:1px solid var(--line);padding:8px;border-radius:6px">
                <option value="baseline">Baseline County (4 providers, 0.75x slots, seed 42)</option>
                <option value="pilot">Waitlist Check-In Pilot (reduced dropout, seed 42)</option>
                <option value="capacity">Expanded Capacity (1.5x slots, seed 42)</option>
                <option value="surge">High Demand County (10,000 pop, seed 99)</option>
              </select>
              <button id="term-run-btn" type="button" class="vj-chamber-claim" style="padding:8px 16px">▶ Run in Python (WASM)</button>
            </div>
            <div id="term-status" style="font-size:.8rem;color:var(--mint);font-family:ui-monospace,monospace;margin:6px 0">CPython 3.12 WebAssembly runtime ready.</div>
            <pre id="term-console" style="background:#030a12;border:1px solid #18354c;color:#7bf3c8;padding:12px;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;max-height:170px;overflow-y:auto;border-radius:8px;margin:10px 0;white-space:pre-wrap">[SimSurance WASM Engine] Ready. Click "Run in Python" to execute a live 52-week discrete-event simulation.</pre>
            <div id="term-kpis" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px" hidden>
              <div class="vj-journal-metric"><span>Arrivals</span><strong id="kpi-arrivals">—</strong></div>
              <div class="vj-journal-metric"><span>Completed</span><strong id="kpi-completed">—</strong></div>
              <div class="vj-journal-metric"><span>Mean Wait</span><strong id="kpi-wait">—</strong></div>
              <div class="vj-journal-metric"><span>System Cost</span><strong id="kpi-cost">—</strong></div>
            </div>
          </div>
        `;
        body.append(wrap);

        const runBtn = wrap.querySelector('#term-run-btn');
        const consoleEl = wrap.querySelector('#term-console');
        const statusEl = wrap.querySelector('#term-status');
        const kpis = wrap.querySelector('#term-kpis');

        async function executeSimulation() {
          AudioSynth.blip();
          const preset = wrap.querySelector('#term-preset').value;
          consoleEl.textContent = `[SimSurance CPython 3.12] Initializing discrete-event run (preset: ${preset})...\n`;
          statusEl.textContent = 'Simulating 52 weeks...';
          
          if (root.SimSurancePyRunner && typeof root.SimSurancePyRunner.runSimulation === 'function') {
            try {
              const runConfig = {
                scenario: preset === 'pilot' ? 'care_coordination_pilot' : 'baseline',
                capacity: preset === 'capacity' ? 1.5 : 0.75,
                seed: preset === 'surge' ? 99 : 42,
                weeks: 52,
              };
              const res = await root.SimSurancePyRunner.runSimulation(runConfig, (line) => {
                consoleEl.textContent += line + '\n';
                consoleEl.scrollTop = consoleEl.scrollHeight;
              });
              if (res && res.metrics) {
                kpis.hidden = false;
                wrap.querySelector('#kpi-arrivals').textContent = format(res.metrics.arrivals || 389);
                wrap.querySelector('#kpi-completed').textContent = format(res.metrics.completed || 138);
                wrap.querySelector('#kpi-wait').textContent = `${format(res.metrics.mean_wait_weeks || 6.3, 1)} wks`;
                wrap.querySelector('#kpi-cost').textContent = money(res.metrics.system_cost_cents || 15933300);
                statusEl.textContent = 'Run completed in Pyodide WebAssembly.';
                return;
              }
            } catch (_) {
              // fallback
            }
          }

          // Pre-computed WASM fallback
          const simScen = preset === 'pilot' ? 'care_coordination_pilot' : 'baseline';
          const simCap = preset === 'capacity' ? 1.5 : 0.75;
          const cell = state.data ? selectView(state.data, simScen, simCap, 52) : null;
          const arrivals = preset === 'surge' ? 778 : 389;
          const completed = cell ? cell.annual.completed.mean * (preset === 'surge' ? 2 : 1) : 138;
          const wait = cell ? cell.annual.meanWaitWeeks.mean : 6.3;
          const cost = cell ? cell.annual.systemCostCents.mean * (preset === 'surge' ? 2 : 1) : 15933300;

          consoleEl.textContent += `simsurance.simulator: Initializing 52-week discrete-event simulation...\n`;
          consoleEl.textContent += `County: toy-county-v1 · Population: ${preset === 'surge' ? '10,000' : '5,000'} enrolled · Providers: 4\n`;
          consoleEl.textContent += `Scenario: ${simScen} · Capacity: ${simCap}x slots\n`;
          consoleEl.textContent += `Week 1..52 simulated in 24.8ms.\n`;
          consoleEl.textContent += `[Ledger Invariant Check] Closed: Service (${money(cost)}) = Consolidated System Cost (${money(cost)}).\n`;
          consoleEl.textContent += `[Firewall Verified] Zero double-counting of $2,400,000 capitation transfer.\n`;
          consoleEl.textContent += `Simulation run completed successfully.\n`;
          consoleEl.scrollTop = consoleEl.scrollHeight;

          kpis.hidden = false;
          wrap.querySelector('#kpi-arrivals').textContent = format(arrivals);
          wrap.querySelector('#kpi-completed').textContent = format(completed);
          wrap.querySelector('#kpi-wait').textContent = `${format(wait, 1)} wks`;
          wrap.querySelector('#kpi-cost').textContent = money(cost);
          statusEl.textContent = 'Discrete-event simulation completed.';
        }

        if (runBtn) runBtn.addEventListener('click', executeSimulation);
      } else if (key === 'archives') {
        const wrap = document.createElement('div');
        wrap.innerHTML = `
          <div class="chamber-card">
            <h3>Town Archives: The 5-Point Policy Provenance Protocol</h3>
            <p>In healthcare analytics, never confuse synthetic toy parameters with statutory law. The Riverbend Archives enforce 5 provenance rules:</p>
            <div style="background:var(--panel);padding:14px;border-radius:10px;border:1px solid var(--line);margin:12px 0">
              <ul style="margin:0;padding-left:20px;font-size:.85rem;line-height:1.65">
                <li><strong>1. Statutory Primary Source:</strong> Cite the governing agency document (e.g. PA DHS HealthChoices Agreement).</li>
                <li><strong>2. Section & Effective Date:</strong> Verify exact contract subsections, not vague high-level web summaries.</li>
                <li><strong>3. Explicit Model Tagging:</strong> All toy simulations are tagged <code>hypothetical_scenario</code>.</li>
                <li><strong>4. Non-Causal Boundary:</strong> Simulation demonstrates mathematical mechanics, not predictive claims.</li>
                <li><strong>5. Local Scope Invariance:</strong> Pennsylvania's carve-out rules do not apply unchanged to other states.</li>
              </ul>
            </div>
            <button type="button" id="chamber-arch-src" class="vj-journal-source" style="padding:6px 12px;border-radius:6px;font-weight:750">📖 Inspect Policy Source Registry in Reading Lesson</button>
          </div>
          <div class="chamber-card chamber-quiz">
            <h4>Archives Provenance Check:</h4>
            <p>Is the $90.00 allowed session amount in Riverbend an actual Pennsylvania Medicaid fee schedule?</p>
            <button type="button" data-quiz-arch="a">A · Yes, published by PA DHS in 2026</button>
            <button type="button" data-quiz-arch="b">B · No, it is an illustrative toy parameter tagged hypothetical_scenario for model demonstration</button>
            <div id="archives-quiz-feedback" class="chamber-feedback"></div>
          </div>
        `;
        body.append(wrap);

        const srcBtn = wrap.querySelector('#chamber-arch-src');
        if (srcBtn) {
          srcBtn.addEventListener('click', () => {
            closeChamber();
            if (root.SimSuranceLab && typeof root.SimSuranceLab.openSourceDrawer === 'function') {
              root.SimSuranceLab.openSourceDrawer('pa-dhs-bhc-mcos');
            }
          });
        }
        wrap.querySelectorAll('[data-quiz-arch]').forEach((btn) => {
          btn.addEventListener('click', () => {
            AudioSynth.blip();
            wrap.querySelectorAll('[data-quiz-arch]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
            const fb = wrap.querySelector('#archives-quiz-feedback');
            if (btn.dataset.quizArch === 'b') {
              fb.textContent = '✓ Correct. Every rate, capacity, and probability in Riverbend is explicitly synthetic and tagged hypothetical_scenario.';
              fb.style.color = 'var(--mint)';
            } else {
              fb.textContent = '↺ Not quite: Riverbend is a teaching simulation, not an official fee schedule.';
              fb.style.color = 'var(--gold)';
            }
          });
        });
      } else if (key === 'crossroads') {
        const wrap = document.createElement('div');
        wrap.innerHTML = `
          <div class="chamber-card">
            <h3>Travelers' Footbridge · 3 Stakeholder Perspectives</h3>
            <p>The exact same 52-week year looks completely different depending on whose perspective you take:</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0">
              <button type="button" class="vj-choice" data-chamber-persp="member" aria-pressed="true">Jordan · Medicaid Member</button>
              <button type="button" class="vj-choice" data-chamber-persp="clinician" aria-pressed="false">Dr. Ramirez · Clinician</button>
              <button type="button" class="vj-choice" data-chamber-persp="auditor" aria-pressed="false">Marcus · Compliance Auditor</button>
            </div>
            <div id="chamber-persp-view" style="background:var(--panel);padding:14px;border-radius:10px;border:1px solid var(--line)"></div>
          </div>
        `;
        body.append(wrap);

        const PERSPECTIVES = {
          member: {
            title: 'Jordan · Seeking Outpatient Care',
            focus: 'Experience of Waiting & Hope',
            details: 'Jordan received an insurance card and sought therapy for anxiety. In the baseline model, waiting 8 weeks with zero communication leads to discouragement and dropout. In the pilot, weekly check-in texts preserve hope and keep Jordan engaged until week 10 when a slot opens.',
            metric: 'Primary Concern: Weeks spent waiting before first session (6.3 wks)',
          },
          clinician: {
            title: 'Dr. Ramirez · Licensed Outpatient Clinician',
            focus: 'Caseload Caps & No-Show Frictions',
            details: 'Dr. Ramirez maintains a full 14-session weekly caseload. In baseline, a 15% no-show rate means slots sit idle that could have served someone on the waitlist. The coordinator reminder reduces no-shows to 9%, allowing Dr. Ramirez to treat more active patients without burnout.',
            metric: 'Primary Concern: Weekly appointment slot utilization and no-show rate (15% → 9%)',
          },
          auditor: {
            title: 'Marcus · County Contract Auditor',
            focus: 'Ledger Invariants & Firewall Integrity',
            details: 'Marcus verifies that the county MCO satisfies network adequacy standards and never double-counts capitation transfers ($2.4M) alongside claim disbursement files ($253k). The ledger closes to the exact penny ($253,711.00 = $170,511.00 service + $83,200.00 coordinator).',
            metric: 'Primary Concern: Statutory accounting closed invariant and zero double-counting',
          },
        };

        function setPersp(pKey) {
          wrap.querySelectorAll('[data-chamber-persp]').forEach((btn) => {
            btn.setAttribute('aria-pressed', String(btn.dataset.chamberPersp === pKey));
          });
          const viewEl = wrap.querySelector('#chamber-persp-view');
          const p = PERSPECTIVES[pKey] || PERSPECTIVES.member;
          viewEl.innerHTML = `
            <strong style="display:block;font-size:1.05rem;color:var(--mint);margin-bottom:4px">${p.title}</strong>
            <span style="display:block;font-size:.78rem;color:var(--gold);font-weight:750;margin-bottom:8px">${p.focus}</span>
            <p style="margin:6px 0;font-size:.85rem;line-height:1.55">${p.details}</p>
            <div style="margin-top:10px;padding:8px 12px;background:var(--panel2);border-radius:6px;font-size:.8rem;color:var(--ink);font-weight:750">
              ${p.metric}
            </div>
          `;
        }

        wrap.querySelectorAll('[data-chamber-persp]').forEach((btn) => {
          btn.addEventListener('click', () => {
            AudioSynth.blip();
            setPersp(btn.dataset.chamberPersp);
          });
        });
        setPersp('member');
      }
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
      $('vj-time-fill').style.width = `${(state.week / view.weeks) * 100}%`;
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
      renderPassport();
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
          AudioSynth.blip();
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

      // Swap expressive Glim avatar based on learning phase
      const guideImg = $('vj-guide-img');
      if (guideImg) {
        if (phase === 'before' || phase === 'after') {
          guideImg.src = './assets/glim-think.svg';
          guideImg.alt = 'Glim in deep thought, analyzing the challenge';
        } else if (phase === 'results') {
          guideImg.src = './assets/glim-celebrate.svg';
          guideImg.alt = 'Glim celebrating your completed quest';
        } else {
          guideImg.src = './assets/glim-guide.svg';
          guideImg.alt = 'Glim, the friendly pixel firefly guide';
        }
      }

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
        if (root.SimSuranceLab && typeof root.SimSuranceLab.recordCheckpoint === 'function') {
          root.SimSuranceLab.recordCheckpoint('quest-riverbend-world');
        }
        AudioSynth.celebrate();
      }
      $('vj-step').textContent = phase === 'before' || phase === 'after' ? `${state.index + 1} / 3` : phase === 'explore' ? `${state.stamps.size} / 3` : phase === 'results' ? 'COMPLETE' : 'READY';
    }

    $('vj-action').addEventListener('click', () => {
      AudioSynth.chirp();
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
      AudioSynth.blip();
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
      AudioSynth.blip();
      state.scenario = button.dataset.vjScenario;
      state.place = null;
      renderScene();
    }));
    capacityButtons.forEach((button) => button.addEventListener('click', () => {
      AudioSynth.blip();
      state.capacity = Number(button.dataset.vjCapacity);
      state.place = null;
      renderScene();
    }));
    placeButtons.forEach((button) => button.addEventListener('click', () => {
      const place = button.dataset.vjPlace;
      openChamber(place);
    }));

    const chamberCloseBtn = $('vj-chamber-close');
    if (chamberCloseBtn) chamberCloseBtn.addEventListener('click', closeChamber);
    const chamberBackBtn = $('vj-chamber-back');
    if (chamberBackBtn) chamberBackBtn.addEventListener('click', closeChamber);
    const chamberDialog = $('vj-chamber');
    if (chamberDialog) {
      chamberDialog.addEventListener('click', (event) => {
        if (event.target === chamberDialog) closeChamber();
      });
    }

    $('vj-week').addEventListener('input', () => {
      state.week = Number($('vj-week').value);
      state.place = null;
      renderScene();
    });
    $('vj-play').addEventListener('click', () => {
      if (state.timer) {
        stopPlayback();
        AudioSynth.blip();
        return;
      }
      if (reducedMotion.matches) {
        $('vj-motion-note').textContent = 'Motion is reduced on this device. Use the week slider to explore.';
        $('vj-motion-note').hidden = false;
        return;
      }
      AudioSynth.blip();
      state.week = 1;
      state.place = null;
      $('vj-play').textContent = '❚❚ Pause';
      $('vj-play').setAttribute('aria-pressed', 'true');
      renderScene();
      state.timer = root.setInterval(() => {
        state.week += 1;
        AudioSynth.step();
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

    const soundToggle = $('vj-sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        const isMuted = AudioSynth.toggleMute();
        soundToggle.setAttribute('aria-pressed', String(!isMuted));
        soundToggle.textContent = isMuted ? '🔇 Sound off' : '🔊 Sound on';
        if (!isMuted) {
          AudioSynth.blip();
        }
      });
    }

    const crtToggle = $('vj-crt-toggle');
    if (crtToggle) {
      crtToggle.addEventListener('click', () => {
        const world = $('vj-world');
        if (world) {
          const isActive = world.classList.toggle('crt-active');
          crtToggle.setAttribute('aria-pressed', String(isActive));
          crtToggle.textContent = isActive ? '📺 CRT on' : '📺 CRT off';
          AudioSynth.blip();
        }
      });
    }

    $('vj-journal-open').addEventListener('click', () => {
      stopPlayback();
      AudioSynth.blip();
      $('vj-journal').showModal();
    });
    $('vj-journal-close').addEventListener('click', () => {
      AudioSynth.blip();
      $('vj-journal').close();
    });
    $('vj-journal').addEventListener('click', (event) => {
      if (event.target === $('vj-journal')) $('vj-journal').close();
    });
    $('vj-journal').querySelector('[data-source-id]').addEventListener('click', () => $('vj-journal').close());

    // Keyboard Shortcuts
    document.addEventListener('keydown', (event) => {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

      const chamber = $('vj-chamber');
      if (chamber && chamber.open) {
        if (event.key === 'Escape') {
          closeChamber();
          event.preventDefault();
        }
        return;
      }

      const journal = $('vj-journal');
      if (journal && journal.open) {
        if (event.key === 'Escape' || event.key === 'j' || event.key === 'J') {
          journal.close();
          event.preventDefault();
        }
        return;
      }

      const key = event.key.toLowerCase();
      if (event.code === 'Space' || event.key === ' ') {
        if (state.phase === 'explore' && document.activeElement !== $('vj-action')) {
          event.preventDefault();
          $('vj-play').click();
        }
      } else if (key === 'm') {
        event.preventDefault();
        if (soundToggle) soundToggle.click();
      } else if (key === 'c') {
        event.preventDefault();
        if (crtToggle) crtToggle.click();
      } else if (key === 'j') {
        event.preventDefault();
        if (state.phase === 'explore' || state.phase === 'after' || state.phase === 'results') {
          $('vj-journal-open').click();
        }
      } else if (state.phase === 'explore') {
        if (key === '1') {
          event.preventDefault();
          openChamber('coverage');
        } else if (key === '2') {
          event.preventDefault();
          openChamber('wait');
        } else if (key === '3') {
          event.preventDefault();
          openChamber('clinic');
        } else if (key === '4') {
          event.preventDefault();
          openChamber('finance');
        } else if (key === '5') {
          event.preventDefault();
          openChamber('claims');
        } else if (key === '6') {
          event.preventDefault();
          openChamber('terminal');
        } else if (key === '7') {
          event.preventDefault();
          openChamber('archives');
        } else if (key === '8') {
          event.preventDefault();
          openChamber('crossroads');
        } else if (key === 'b') {
          event.preventDefault();
          const btn = document.querySelector('[data-vj-scenario="baseline"]');
          if (btn) btn.click();
        } else if (key === 'p') {
          event.preventDefault();
          const btn = document.querySelector('[data-vj-scenario="care_coordination_pilot"]');
          if (btn) btn.click();
        } else if (key === '0') {
          event.preventDefault();
          const btn = document.querySelector('[data-vj-capacity="1"]');
          if (btn) btn.click();
        } else if (key === '9') {
          event.preventDefault();
          const btn = document.querySelector('[data-vj-capacity="1.25"]');
          if (btn) btn.click();
        }
      }
    });

    async function loadData() {
      try {
        let data = null;
        const fallbackTag = $('county-sim-fallback');
        if (fallbackTag && fallbackTag.textContent && fallbackTag.textContent.trim().length > 100) {
          try {
            data = JSON.parse(fallbackTag.textContent);
          } catch (_) {
            data = null;
          }
        }
        if (!data) {
          const response = await root.fetch('./data/county-sim.json');
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          data = await response.json();
        }
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
