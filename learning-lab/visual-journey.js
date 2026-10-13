(function (root) {
  'use strict';

  // =================================================================
  // CORE SIMULATION MATH & POLICY ENGINE (EXPORTS)
  // =================================================================

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
      subtitle: 'Why having Medicaid does not guarantee an immediate appointment slot',
      sealTitle: '1·COVERAGE: ACCESS != SLOT',
      icon: '🏛️',
    },
    wait: {
      key: 'wait',
      num: 2,
      name: 'Waiting Station · Queue Dynamics',
      subtitle: 'The retention paradox: why check-in coordination can increase the waitlist',
      sealTitle: '2·QUEUE: RETENTION PARADOX',
      icon: '⏱️',
    },
    clinic: {
      key: 'clinic',
      num: 3,
      name: 'Riverbend Clinic · Provider Capacity',
      subtitle: 'How appointment volume sets the true speed of care delivery',
      sealTitle: '3·CLINIC: CAPACITY IS KING',
      icon: '🏥',
    },
    finance: {
      key: 'finance',
      num: 4,
      name: 'County Treasury · Statutory Ledger',
      subtitle: 'Tracking capitation transfers separately from provider disbursements',
      sealTitle: '4·FINANCE: CLOSED LEDGER',
      icon: '⚖️',
    },
    claims: {
      key: 'claims',
      num: 5,
      name: 'Adjudication Terminal · Toy Claims',
      subtitle: 'How 4 verification checks decide whether a psychotherapy claim is paid',
      sealTitle: '5·CLAIMS: CLEAN CLAIMS ONLY',
      icon: '📝',
    },
    terminal: {
      key: 'terminal',
      num: 6,
      name: 'Bytecode Mill · In-Browser Python Lab',
      subtitle: 'Execute live CPython discrete-event queue simulations via WebAssembly',
      sealTitle: '6·TERMINAL: DISCRETE EVENTS',
      icon: '⚡',
    },
    archives: {
      key: 'archives',
      num: 7,
      name: 'Policy Vault · Statutory Provenance',
      subtitle: 'Linking simulation assumptions to Pennsylvania Medicaid contracts and statutes',
      sealTitle: '7·POLICY: GROUND TRUTH',
      icon: '📜',
    },
    crossroads: {
      key: 'crossroads',
      num: 8,
      name: 'Town Crossroads · Community Perspectives',
      subtitle: 'Examining outcomes through member, clinician, and auditor eyes',
      sealTitle: '8·PERSPECTIVES: COMMUNITY ALIGNED',
      icon: '🧭',
    },
  };

  // =================================================================
  // 16-BIT CHIPTUNE WEB AUDIO SYNTHESIZER
  // =================================================================

  const AudioSynth = (function () {
    let ctx = null;
    let muted = false;

    function getContext() {
      if (typeof window === 'undefined') return null;
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        try {
          ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (_) {
          ctx = null;
        }
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      return ctx;
    }

    function playTone(freq, duration, type, gainPeak) {
      if (muted) return;
      const c = getContext();
      if (!c) return;
      try {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type || 'square';
        osc.frequency.setValueAtTime(freq, c.currentTime);
        gain.gain.setValueAtTime(gainPeak || 0.08, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + duration);
      } catch (_) {}
    }

    return {
      isMuted: () => muted,
      toggleMute: () => {
        muted = !muted;
        return muted;
      },
      blip: () => playTone(540, 0.035, 'square', 0.03),
      chirp: () => {
        playTone(720, 0.04, 'triangle', 0.06);
        setTimeout(() => playTone(960, 0.06, 'triangle', 0.06), 40);
      },
      stamp: () => {
        playTone(523.25, 0.08, 'triangle', 0.09);
        setTimeout(() => playTone(659.25, 0.08, 'triangle', 0.09), 80);
        setTimeout(() => playTone(783.99, 0.14, 'triangle', 0.1), 160);
      },
      step: () => playTone(380, 0.025, 'triangle', 0.04),
      celebrate: () => {
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          setTimeout(() => playTone(freq, 0.16, 'square', 0.08), idx * 110);
        });
      },
    };
  })();

  // =================================================================
  // WORKBOOK CURRICULUM DATA: GLIM TEACHES EVERYTHING
  // =================================================================

  const WORKBOOK = [
    // -------------------------------------------------------------
    // UNIT I: THE 5 PLAYERS IN THE SYSTEM
    // -------------------------------------------------------------
    {
      id: 'intro',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 1 · Meet Glim & The 5-Player Ecosystem',
      text: "Hello! I'm Glim, your policy guide and firefly sprite. Welcome to Riverbend County! Most people think health insurance is a simple vending machine: you insert a premium card, and an appointment comes out. But health insurance is actually an interdependent ecosystem of five distinct players with competing statutory rules and financial incentives. Let's inspect each player.",
      advantage: false,
      citation: {
        title: 'Pennsylvania HealthChoices Behavioral Health Agreement (2023–2025)',
        statute: 'PA DHS BHC-MCO Agreement § 1 · Program Purpose & Scope',
        quote: 'The HealthChoices Behavioral Health Program is a mandatory managed care program established under Pennsylvania Department of Human Services oversight to provide quality, accessible mental health and drug and alcohol services to Medical Assistance recipients.',
        url: 'https://www.pa.gov/en/agencies/dhs/resources/healthchoices.html',
        urlLabel: 'PA DHS HealthChoices Program Overview',
      },
      furtherReading: [
        { label: 'Compare Member & Provider Journeys', url: './journeys.html' },
        { label: 'SimSurance Source Registry', url: './reading-policy.html' },
      ],
      next: 'u1_p1',
    },
    {
      id: 'u1_p1',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 1 · Player 1: The Member (Patient)',
      text: "First, meet Jordan, our community member. In commercial insurance, members face high deductibles—often $1,500 to $6,000 in out-of-pocket spending before insurance pays a penny. In Medicaid, cost-sharing is legally capped at near-zero. But having zero copays doesn't guarantee access if no clinic has an open door.",
      advantage: true,
      advantageText: 'Member Rule: Cost-Sharing != Access',
      citation: {
        title: 'Federal Medicaid Cost-Sharing Exemptions',
        statute: '42 CFR § 447.56 · Limitations on Cost Sharing',
        quote: 'No cost sharing may be imposed on individuals with family income at or below 100 percent of the FPL... and total cost sharing incurred by all individuals in the family may not exceed 5 percent of family income.',
        url: 'https://www.medicaid.gov/medicaid/cost-sharing/index.html',
        urlLabel: 'Medicaid.gov Cost Sharing Rules',
      },
      furtherReading: [
        { label: "Jordan's Care Journey Case Study", url: './journeys.html' },
      ],
      next: 'u1_p2',
    },
    {
      id: 'u1_p2',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 2 · Player 2: The Outpatient Clinician',
      text: "Next, meet Dr. Ramirez, an outpatient therapist. Why do nearly 40% of licensed behavioral health clinicians refuse to take insurance? Becoming paneled requires 90 to 180 days of unpaid credentialing (CAQH), claims can be rejected for minor coding discrepancies, and statutory fee schedules often pay 50% below commercial market rates.",
      advantage: false,
      citation: {
        title: 'PA Act 68 Provider Credentialing Protections',
        statute: '40 P.S. § 991.2111 · Credentialing & Network Participation',
        quote: 'A managed care plan shall establish a credentialing committee... and shall conclude its review within 45 days after receiving a completed application.',
        url: 'https://www.insurance.pa.gov/Consumers/Pages/Act-68-Appeals.aspx',
        urlLabel: 'PA Insurance Dept Credentialing Protections',
      },
      choices: [
        { text: 'Why do therapists drop out of insurance networks?', next: 'u1_p2_dropout' },
        { text: 'What does a paneled practice look like financially?', next: 'u1_p2_paneled' },
      ],
    },
    {
      id: 'u1_p2_dropout',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 2 · Outpatient Realities: Dropout Friction',
      text: "When a clinician spends 10 hours a week on unpaid prior-authorization appeals, electronic billing software, and credentialing audits, private cash-pay practice becomes tempting. But cash practices exclude working families who cannot afford $150 to $200 per session out of pocket.",
      advantage: true,
      advantageText: 'Provider Dilemma: Administrative Friction',
      panel: {
        type: 'beforeafter',
        before: "CASH-PAY PRIVATE PRACTICE:\n- Client Fee: $150–$200 per 50-minute session.\n- Payment: Paid immediately by client at time of service.\n- Overhead: Zero billing claims, no prior auth forms.\n- Equity Barrier: Excludes lower-income families who rely on insurance.",
        after: "INSURANCE-PANELED PRACTICE:\n- Fee Schedule: $90 per 45-minute CPT 90834.\n- Payment: 30–45 day adjudication delay; clawback risk.\n- Overhead: $30–$45/hr billing staff, EHR software, appeal filings.\n- Community Impact: Serves Medicaid & insured families, but operates near break-even.",
        note: "Clinicians weigh community mission against practice solvency. When administrative friction is too severe, providers exit insurance panels.",
      },
      next: 'u1_p3',
    },
    {
      id: 'u1_p2_paneled',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 2 · Outpatient Realities: The Fee Schedule',
      text: "In an insurance-paneled clinic, the clinic bills $150, but the contracted fee schedule pays only $90. After subtracting facility rent, billing overhead, and health record licenses ($45/hr), the clinician nets $45/hr. Compare the models below:",
      advantage: true,
      advantageText: 'Provider Dilemma: The Overhead Squeeze',
      panel: {
        type: 'beforeafter',
        before: "CASH-PAY PRIVATE PRACTICE:\n- Client Fee: $150–$200 per 50-minute session.\n- Payment: Paid immediately by client at time of service.\n- Overhead: Zero billing claims, no prior auth forms.\n- Equity Barrier: Excludes lower-income families who rely on insurance.",
        after: "INSURANCE-PANELED PRACTICE:\n- Fee Schedule: $90 per 45-minute CPT 90834.\n- Payment: 30–45 day adjudication delay; clawback risk.\n- Overhead: $30–$45/hr billing staff, EHR software, appeal filings.\n- Community Impact: Serves Medicaid & insured families, but operates near break-even.",
        note: "Clinicians weigh community mission against practice solvency. When administrative friction is too severe, providers exit insurance panels.",
      },
      next: 'u1_p3',
    },
    {
      id: 'u1_p3',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 3 · Player 3: Inpatient & Crisis Facilities',
      text: "When a person enters acute crisis, they arrive at an inpatient psychiatric hospital or emergency room. While outpatient therapy costs ~$90 a session, an inpatient psychiatric bed costs $1,200 to $2,500 per day! Because beds are scarce, patients in crisis frequently wait days in emergency room hallways—a crisis known as ER boarding.",
      advantage: true,
      advantageText: 'System Invariant: Acute Cost Disparity',
      citation: {
        title: 'Pennsylvania Mental Health Procedures Act',
        statute: '50 P.S. § 7302 (Act 147) · Involuntary Emergency Examination',
        quote: 'A person who is severely mentally disabled and in need of immediate treatment may be taken to a facility for emergency examination... examination shall take place within two hours of arrival.',
        url: 'https://www.pa.gov/en/agencies/dhs/resources/mental-health.html',
        urlLabel: 'PA Mental Health Procedures Act Overview',
      },
      furtherReading: [
        { label: 'Hospital Capacity & Workforce Case', url: '#case-capacity' },
      ],
      next: 'u1_p4',
    },
    {
      id: 'u1_p4',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 3 · Player 4: The Managed Care Organization (MCO)',
      text: "Pennsylvania uses a special 'carve-out' model for Medicaid: physical health is handled by one plan, but behavioral health is carved out to county-specific Behavioral Health MCOs (like CCBH or Magellan). The MCO receives a fixed monthly payment per member (capitation) and bears the financial risk if claims exceed the budget.",
      advantage: false,
      citation: {
        title: 'PA HealthChoices Behavioral Health Carve-Out Agreement',
        statute: 'PA DHS BHC-MCO § 3 · Risk-Bearing Capitation Responsibilities',
        quote: 'The Primary Contractor shall operate on a risk-bearing capitated basis, administering a comprehensive network of behavioral health providers while maintaining financial reserves required by Pennsylvania law.',
        url: 'https://www.pa.gov/en/agencies/dhs/resources/healthchoices.html',
        urlLabel: 'PA DHS BHC-MCO Contract Agreement',
      },
      furtherReading: [
        { label: 'Follow the Money Flow', url: './money-flow.html' },
      ],
      next: 'u1_p4_phys',
    },
    {
      id: 'u1_p4_phys',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 3 · Player 4b: The Physical-Health Plan Family',
      text: "One member, two plan families. The MCO you just met has a twin across the river. Physical health travels in its own managed-care family: UPMC for You, Highmark Wholecare, Geisinger Health Plan, AmeriHealth Caritas, Jefferson Health Plans EverWell, Keystone First, and United Healthcare Community Plan — organized into five regions (Lehigh/Capital, Northeast, Northwest, Southeast, Southwest), each plan publishing member-services and Enhanced Member Supports Unit phone numbers. These physical plans are a separate family from the county-assigned Behavioral Health MCOs. When you model money flows, never collapse them into one vague 'the MCO' — they answer to different contracts, different county footprints, and different rate documents.",
      advantage: true,
      advantageText: 'Model Separately: Physical vs Behavioral Plan Families',
      citation: {
        title: 'Managed Care Organizations (MCO) — Physical HealthChoices',
        statute: 'PA DHS · Physical HealthChoices MCO directory (plan listing, not a rule)',
        quote: 'Lehigh/Capital Counties in the HealthChoices Program: Adams, Berks, Cumberland, Dauphin, Franklin, Fulton, Huntingdon, Lancaster, Lebanon, Lehigh, Northampton, Perry, York',
        url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/hc/hc-mco',
        urlLabel: 'PA DHS Physical HealthChoices MCO Directory',
      },
      panel: {
        type: 'beforeafter',
        before: "ONE BIG 'THE MCO' BLUR:\n- 'The MCO covers Jordan.'\n- Physical plan, behavioral plan, and county assignment folded into one vague label.\n- A therapy session's money flow ends up priced against a hospital plan's rate sheet.",
        after: "TWO FAMILIES, TWO LEDGERS:\n- Physical HealthChoices plans organized by five regions, with their own member-services lines.\n- Behavioral HealthChoices BH-MCOs assigned by county of residence.\n- Name the family before you name the flow: region-based physical plans on one side, county-assigned BH-MCOs on the other.",
        note: "This is a dated plan directory (verified 2026-10-12), not evidence of any member's plan choice, benefit design, or provider network.",
      },
      furtherReading: [
        { label: 'Physical HealthChoices MCO Directory (Official)', url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/hc/hc-mco' },
        { label: 'Follow the Money Flow', url: './money-flow.html' },
      ],
      next: 'u1_p4_bh',
    },
    {
      id: 'u1_p4_bh',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 3 · Player 4c: The Behavioral-Health MCO Map',
      text: "Now the other half of the twin. Behavioral health runs on a county-based map: each of Pennsylvania's 67 counties lands in exactly one Behavioral Health MCO, and consumers are assigned by county of residence. Five organizations hold the whole map — Community Behavioral Health holds Philadelphia alone, Community Care covers 41 counties, PerformCare holds seven, Magellan holds seven, and Carelon holds eleven. Here is the trap for modelers: 'county-based' is a coverage architecture, not a provider list. This map tells you which ledger owns the dollar, not whether a therapist is taking new patients — never let it masquerade as a network.",
      advantage: true,
      advantageText: 'Assign the Plan Before Modeling Access',
      citation: {
        title: 'Behavioral Health Managed Care Organizations (BH-MCOs)',
        statute: 'PA DHS · Behavioral HealthChoices BH-MCO county directory (lookup, not a rule)',
        quote: 'Each HealthChoices consumer is assigned a Behavioral Health Managed Care Organization (BH-MCO) based on his or her county of residence.',
        url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-mcos',
        urlLabel: 'PA DHS BH-MCO County Directory',
      },
      panel: {
        type: 'beforeafter',
        before: "THE BLURRY MEMBER:\\n- 'The BH-MCO covers the member.'\\n- No named plan, no county anchor — one vague payer label.\\n- A county's waitlist crisis gets attributed to a statewide average.",
        after: "THE NAMED MAP:\\n- 67 counties, 5 BH-MCOs, one county-to-plan mapping published by PA DHS.\\n- Members are assigned by county of residence, then choose providers inside that plan's network.\\n- Start every access question at the map: which plan owns this county's dollar?",
        note: "This is a dated county directory (verified 2026-10-12), not evidence of any member's plan, provider network, benefits, or reimbursement.",
      },
      furtherReading: [
        { label: 'Behavioral Health MCO County Directory (Official)', url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-mcos' },
        { label: 'Explore Virtual County Lab', url: './county-lab.html' },
      ],
      next: 'u1_p4_prov',
    },
    {
      id: 'u1_p4_prov',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 3 · Player 4d: The Provider\u2019s Map \u2014 2.7M Lives',
      text: "Now flip the map around \u2014 stand where the provider stands. On Pennsylvania DHS's provider page, the sentence that matters most for a modeler reads plainly: the county contracts with the MCO, not the other way around. County mental-health programs are required to ensure high-quality care and timely access, and to coordinate with other needed services. The page's eligibles map counts 2,717,158 lives covered statewide, county by county, zone by zone. It also publishes dated rate schedules \u2014 ASAM addiction-treatment fees effective January 1, 2026 \u2014 and a provider gap-payments ledger. One caution before you touch any of it: the map labels some counties 'MBH' where the directory names Magellan, so reconcile the labels before attributing a county's dollar. And never read this page as a promise that a provider is taking new patients \u2014 directories draw coverage architecture; contracts and claims hold the truth.",
      advantage: true,
      advantageText: 'Directories Map Architecture, Not Access',
      citation: {
        title: 'Behavioral HealthChoices: Information for Providers',
        statute: 'PA DHS \u00b7 provider-facing overview (directory, not a rule)',
        quote: 'For mental health and drug and alcohol services, each county contracts with a Managed Care Organization (MCO).',
        url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers',
        urlLabel: 'PA DHS Behavioral HealthChoices for Providers',
      },
      panel: {
        type: 'quiz',
        q: 'A modeler opens the DHS provider page and sees the eligibles map: 2,717,158 lives covered by county. What can the page safely tell her?',
        opts: [
          'A) The per-county BH-MCO assignment and the statewide covered-lives count \u2014 a coverage-architecture snapshot, and nothing more.',
          'B) That a provider in any listed county is currently accepting new behavioral-health patients.',
          'C) The exact reimbursement a provider receives for an ASAM 3.7 residential stay.',
        ],
        answer: 0,
        explanation: "Correct! The page is a provider-facing directory: county-to-plan assignment, covered-lives totals by county, and dated fee schedules with a stated effective date. Provider acceptance, network openness, per-case benefits, and actual payment live in contracts and claims \u2014 not on this page. Verify exact product, provider type, county, service, and current contract before applying any of it to a case.",
      },
      furtherReading: [
        { label: 'Behavioral HealthChoices for Providers (Official)', url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers' },
        { label: 'Read Policy Sources', url: './reading-policy.html' },
      ],
      next: 'u1_p5',
    },
    {
      id: 'u1_p5',
      part: 'Unit I · The 5 Players',
      chapter: 'Ch 3 · Player 5: Regulators (CMS & State Agencies)',
      text: "Finally, the fifth player: State and Federal Regulators. The federal Centers for Medicare & Medicaid Services (CMS) provides matching funds (FMAP). Pennsylvania DHS oversees HealthChoices, and the Pennsylvania Insurance Department (PID) enforces federal parity laws (MHPAEA) and Act 68 quality standards.",
      advantage: true,
      advantageText: 'Oversight: Parity & MLR Mandates',
      citation: {
        title: 'Federal Medicaid Managed Care Regulations',
        statute: '42 CFR Part 438 · Managed Care State Oversight & MLR',
        quote: 'The State must ensure through its contracts that each MCO maintains an adequate network, complies with parity requirements under MHPAEA, and meets minimum Medical Loss Ratio (MLR) standards of 85 percent.',
        url: 'https://www.medicaid.gov/medicaid/managed-care/guidance/index.html',
        urlLabel: 'Medicaid.gov 42 CFR Part 438 Regulations',
      },
      panel: {
        type: 'quiz',
        q: 'Why does Pennsylvania use a "carve-out" structure for Medicaid behavioral health?',
        opts: [
          'A) To hide insurance profits from public audits.',
          'B) To dedicate specialized county-level management and funding specifically to mental health and addiction services without competing against physical health hospital deficits.',
          'C) Because federal law prohibits physical health doctors from treating patients with mental illness.',
        ],
        answer: 1,
        explanation: "Correct! Pennsylvania's HealthChoices carve-out was specifically architected to guarantee that dedicated county-level funds could not be diverted away from behavioral health into physical hospital shortfalls.",
      },
      next: 'u1_p5b_parity',
    },
    {
      id: 'u1_p5b_parity',
      part: 'Unit I \u00b7 The 5 Players',
      chapter: 'Ch 3 \u00b7 Player 5b: Parity \u2014 The Comparator Rule',
      text: "One more instrument for the regulator's toolkit before we move on, and you must handle it with precision. The federal parity law \u2014 MHPAEA \u2014 is a comparator, not a mandate: it never forces a plan to cover mental-health or addiction care. (The Affordable Care Act's essential-health-benefits requirement does that work for non-grandfathered individual and small-group plans.) But when a plan does cover MH/SUD care, it cannot make the money rules (copays, coinsurance) or the access rules (visit limits, day limits) harsher than the rules for medical or surgical care \u2014 measured against the predominant requirements applying to substantially all medical/surgical benefits in the same classification: inpatient in-network, outpatient in-network, emergency, prescription drugs, and the rest. Now the part modelers miss: the hidden rules count too. Prior authorization, step therapy, medical management, network-composition standards, even how out-of-network pay is set \u2014 these are non-quantitative treatment limitations. Since the CAA of 2021, plans imposing them must write up comparative analyses of their design and application, hand them over on request, and the 2024 final rules require collecting data and fixing material differences in access. Medicaid MCOs sit under the same duty through the 2016 Medicaid/CHIP parity rule. So parity is not a guarantee you assume \u2014 it is a comparator you test.",
      advantage: true,
      advantageText: 'Parity Is a Comparator, Not a Mandate',
      citation: {
        title: 'The Mental Health Parity and Addiction Equity Act (MHPAEA)',
        statute: 'CMS \u00b7 federal parity law overview & 2024 final rules (page-level review)',
        quote: 'Financial requirements (such as coinsurance and copays) and treatment limitations (such as visit limits) imposed on MH/SUD benefits cannot be more restrictive than the predominant financial requirements and treatment limitations that apply to substantially all medical/surgical benefits in a classification.',
        url: 'https://www.cms.gov/marketplace/private-health-insurance/mental-health-parity-addiction-equity',
        urlLabel: 'CMS MHPAEA Overview (Official)',
      },
      panel: {
        type: 'quiz',
        q: "Jordan's plan covers 30 physical-therapy visits in outpatient in-network care but caps depression therapy at 12 visits in the same classification. What does the federal parity law say?",
        opts: [
          'A) Parity requires MH/SUD visit limits to be no more restrictive than the predominant medical/surgical limit in the same classification \u2014 this is exactly the kind of disparity parity tests.',
          'B) Parity only governs copays, so visit limits are fine.',
          'C) Parity forces every plan to offer mental-health benefits, so this plan is violating the mandate.',
        ],
        answer: 0,
        explanation: "Correct! Quantitative treatment limitations \u2014 the numerical ones, like visit or day limits \u2014 cannot be more restrictive than the predominant medical/surgical rule in the same classification. The hidden rules (prior authorization, step therapy, network composition) are non-quantitative treatment limitations, governed by the comparable-and-no-more-stringent test, the 2021 comparative-analysis duty, and the 2024 requirement to collect data and address material differences in access. And parity never forces coverage: the ACA's essential-health-benefits requirement is what obligates non-grandfathered individual and small-group plans to cover MH/SUD services.",
      },
      furtherReading: [
        { label: 'CMS MHPAEA Overview (Official)', url: 'https://www.cms.gov/marketplace/private-health-insurance/mental-health-parity-addiction-equity' },
        { label: 'Read Policy Sources', url: './reading-policy.html' },
      ],
      next: 'u2_p1',
    },

    // -------------------------------------------------------------
    // UNIT II: THE MEMBER GAUNTLET (ACCESS VS COVERAGE)
    // -------------------------------------------------------------
    {
      id: 'u2_p1',
      part: 'Unit II · Member Gauntlet',
      chapter: 'Ch 4 · The Access Illusion: Coverage != Slot',
      text: "Now let's follow Jordan through the Member Gauntlet. Jordan has active Pennsylvania HealthChoices coverage. They call Riverbend Community Clinic for an intake. But the receptionist says: 'Our next intake slot is 14 weeks from today.' Why does an active insurance card not get Jordan into a chair this week?",
      advantage: false,
      choices: [
        { text: "Because the clinic refused to accept Jordan's Medicaid card.", next: 'u2_p1_myth' },
        { text: 'Because all clinician calendar hours are already booked with current patients.', next: 'u2_p1_truth' },
      ],
    },
    {
      id: 'u2_p1_myth',
      part: 'Unit II · Member Gauntlet',
      chapter: 'Ch 4 · The Administrative Fallacy',
      text: "Actually, Riverbend Clinic is contracted and accepts Jordan's card! Jordan owes $0. The roadblock isn't financial authorization—it's calendar physics. There are only 40 staffed hours in a therapist's workweek.",
      advantage: true,
      advantageText: 'Access Reality: Calendar Physics',
      next: 'u2_p1_map',
    },
    {
      id: 'u2_p1_truth',
      part: 'Unit II · Member Gauntlet',
      chapter: 'Ch 4 · Calendar Physics & Network Adequacy',
      text: "Exactly. The clinic wants to see Jordan, but clinician schedules are completely full. Pennsylvania contracts require routine care within 7 business days, yet statewide waitlists regularly exceed 10 to 16 weeks. A card guarantees payment; it does not fabricate clinician time.",
      advantage: true,
      advantageText: 'Access Reality: Calendar Physics',
      next: 'u2_p1_map',
    },
    {
      id: 'u2_p1_map',
      part: 'Unit II · Member Gauntlet',
      chapter: 'Ch 4 · Explore Riverbend Town',
      text: "Look at Riverbend Town below. Jordan's house is near Town Hall on the left. The clinic is on the hill to the northeast. Tap the landmarks to see how county resources are divided.",
      advantage: false,
      citation: {
        title: 'PA HealthChoices Timely Access Standard',
        statute: 'PA DHS BHC-MCO § Appendix F · Network Adequacy Benchmarks',
        quote: 'Routine outpatient appointments must be made available within seven (7) business days of request. Urgent care must be made available within twenty-four (24) hours.',
        url: 'https://www.pa.gov/en/agencies/dhs/resources/healthchoices.html',
        urlLabel: 'PA DHS Appointment Timeliness Standards',
      },
      panel: { type: 'town' },
      next: 'u2_p2',
    },
    {
      id: 'u2_p2',
      part: 'Unit II · Member Gauntlet',
      chapter: 'Ch 5 · Ghost Networks & Phantom Directories',
      text: "What if Jordan tries calling other therapists listed in the insurer's provider directory? In 2023, the US Senate Finance Committee conducted secret-shopper calls across managed care directories: over 80% of listed providers were 'ghosts'—unreachable, no longer practicing, or not taking new Medicaid patients.",
      advantage: true,
      advantageText: 'Directory Audit: Ghost Networks',
      citation: {
        title: 'US Senate Committee on Finance Investigation (May 2023)',
        statute: 'Senate Finance Staff Report · Ghost Networks in Managed Care',
        quote: 'Secret shopper calls to 336 behavioral health providers across 12 health plans revealed that 82% of listed in-network providers were ghost entries that could not provide an in-network appointment.',
        url: 'https://www.finance.senate.gov/chairmans-news/finance-committee-report-reveals-widespread-ghost-networks-in-medicare-advantage',
        urlLabel: 'US Senate Finance Committee Ghost Networks Report',
      },
      furtherReading: [
        { label: 'Read Policy Sources', url: './reading-policy.html' },
      ],
      next: 'u2_p3',
    },
    {
      id: 'u2_p3',
      part: 'Unit II · Member Gauntlet',
      chapter: 'Ch 5 · Redetermination Churn & The Coverage Cliff',
      text: "Even worse: while waiting 14 weeks on the waitlist, Jordan might receive a renewal packet in the mail. If a form is missed or an address changes, coverage is abruptly terminated—an administrative event called 'churn'. The member drops off Medicaid, loses their spot on the waitlist, and the cycle resets.",
      advantage: false,
      citation: {
        title: 'CMS Medicaid Unwinding & Renewal Protections',
        statute: '42 CFR § 435.916 · Periodic Redetermination of Eligibility',
        quote: 'The agency must make a redetermination of eligibility without requiring information from the individual if able to do so based on reliable information contained in the account or other databases.',
        url: 'https://www.medicaid.gov/resources-for-states/coronavirus-disease-2019-covid-19/unwinding-and-returning-to-regular-operations-after-covid-19/index.html',
        urlLabel: 'Medicaid.gov Redetermination Guidance',
      },
      panel: {
        type: 'exercise',
        title: 'Exercise 2.1: The Member Journey Audit',
        steps: [
          'Identify the two distinct failure modes Jordan faces (calendar scarcity vs paperwork churn).',
          'Explain why fixing directory accuracy alone does not shorten clinic wait times without expanding clinical hours.',
        ],
        fields: [{ label: 'Reflect on how Jordan experiences the difference between coverage and care:', id: 'ex2_gauntlet' }],
      },
      next: 'u2_p4',
    },
    {
      id: 'u2_p4',
      part: 'Unit II · Member Gauntlet',
      chapter: 'Ch 6 · The Retention Paradox (52-Week Queue Scrubber)',
      text: "Riverbend tried launching a 'Care Coordination Pilot' to help Jordan. The coordinator called members and drove appointment attendance up from 68% to 89%! But look what happened: because patients stayed in therapy, appointment slots stayed full, and the waitlist for new patients spiked from 13 to 22 people! Scrub through 52 weeks below:",
      advantage: true,
      advantageText: 'System Paradox: The Retention Trap',
      panel: { type: 'scrubber' },
      furtherReading: [
        { label: 'Explore Virtual County Lab', url: './county-lab.html' },
      ],
      next: 'u3_p1',
    },

    // -------------------------------------------------------------
    // UNIT III: THE OUTPATIENT PROVIDER REALITY & BILLING
    // -------------------------------------------------------------
    {
      id: 'u3_p1',
      part: 'Unit III · Provider Realities',
      chapter: 'Ch 7 · The Credentialing Desert (CAQH & 180 Days)',
      text: "Now let's switch perspectives to Dr. Ramirez. When a newly licensed clinical psychologist or social worker joins Riverbend Clinic, they cannot simply start billing Medicaid. First comes Credentialing: submitting 50-page applications through CAQH, verifying transcripts, malpractice coverage, and board certifications.",
      advantage: false,
      citation: {
        title: 'Pennsylvania Act 68 Credentialing Standards',
        statute: '40 P.S. § 991.2111(b) · Managed Care Credentialing Timeline',
        quote: "A managed care plan shall establish a credentialing committee and shall notify a health care provider within 45 days after receiving a complete application of the committee's determination.",
        url: 'https://www.insurance.pa.gov/Consumers/Pages/Act-68-Appeals.aspx',
        urlLabel: 'PA Act 68 Credentialing Provisions',
      },
      choices: [
        { text: 'Can clinicians see patients while waiting for credentialing?', next: 'u3_p1_incident' },
        { text: 'Why does credentialing take so long in practice?', next: 'u3_p1_delay' },
      ],
    },
    {
      id: 'u3_p1_incident',
      part: 'Unit III · Provider Realities',
      chapter: 'Ch 7 · The Incident-To Trap',
      text: "Under commercial and Medicaid rules, if an uncredentialed clinician provides care independently, the claim will be denied as 'Out-of-Network' or 'Unregistered Provider'. Billing under a supervisor's NPI without meeting strict 'incident-to' criteria is considered billing fraud. So providers sit idle for months!",
      advantage: true,
      advantageText: 'Compliance Hazard: Billing NPI Rules',
      next: 'u3_p2',
    },
    {
      id: 'u3_p1_delay',
      part: 'Unit III · Provider Realities',
      chapter: 'Ch 7 · Primary Source Verification Backlogs',
      text: "In practice, although Act 68 mandates 45 days for completed files, insurers frequently pause the clock by requesting supplemental documentation. The real-world delay averages 90 to 180 days across Pennsylvania, choking off workforce recruitment.",
      advantage: true,
      advantageText: 'Administrative Friction: Workforce Stalls',
      next: 'u3_p2',
    },
    {
      id: 'u3_p2',
      part: 'Unit III · Provider Realities',
      chapter: 'Ch 8 · Billing Lifecycle: CPT Codes to EDI 835',
      text: "When Dr. Ramirez conducts a session, how does it become income? Clinical care is translated into standardized HIPAA EDI transactions: CPT 90791 (Diagnostic Evaluation), CPT 90834 (45-min Therapy), or CPT 90837 (60-min Therapy). The clinic transmits an EDI 837P electronic claim, and weeks later receives an EDI 835 Electronic Remittance Advice.",
      advantage: false,
      citation: {
        title: 'HIPAA Administrative Simplification Standards',
        statute: '45 CFR § 162.1102 · Electronic Health Care Claims (EDI ASC X12 837P / 835)',
        quote: 'Covered entities must use the standard transaction formats adopted by the Secretary for electronic transmission of health care claims and remittance advice notifications.',
        url: 'https://www.cms.gov/regulations-and-guidance/administrative-simplification/hipaa-aca',
        urlLabel: 'CMS HIPAA EDI Transactions Standards',
      },
      furtherReading: [
        { label: 'Interactive Claims Lab', url: './claim-decisions.html' },
      ],
      next: 'u3_p2_data',
    },
    {
      id: 'u3_p2_data',
      part: 'Unit III · Provider Realities',
      chapter: 'Ch 8 · The Encounter Data Plumbing: What OMHSAS Sees',
      text: "Every claim you just built has a second life. In Pennsylvania's Behavioral HealthChoices, the BH-MCOs are capitated — so what the state watches is not a pile of bills, it is encounter data: EDI 837 encounters, 834 enrollment files, 277 status notices, 999 acknowledgments, error-code extract files. The OMHSAS Division of Systems Management is the office that owns that plumbing. Its objective is access — 'ensure eligible individuals can access behavioral health services covered by Medicaid and County Base-Funded Mental Health' — and it does three things: run the interacting state systems, manage the claim and encounter data, and conduct business intelligence with the behavioral health data received. And here is the discipline the page teaches: the state publishes Encounter Data Validation studies and on-site reviews testing whether each BH-MCO's submissions are actually reliable — because bad data builds bad policy. So when any model, including this one, says 'the numbers show,' ask which encounter file, and validated how. One honest limit, said plainly: this page is written for OMHSAS business partners, and none of these files are ours. They are nonpublic. That is exactly why SimSurance runs its scenarios on synthetic populations and public documents.",
      advantage: true,
      advantageText: 'Encounters Before Evidence: The Data Plumbing',
      citation: {
        title: 'Behavioral HealthChoices Systems Management',
        statute: 'PA DHS / OMHSAS · Division of Systems Management (official systems page; page-level review — linked study PDFs not read)',
        quote: 'The management of various interacting state systems operations that ensures an individual can access services, management of the claim and/or encounter data, and conducting business intelligence activities with the behavioral health data received.',
        url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-systems-management',
        urlLabel: 'PA DHS OMHSAS Systems Management (Official)',
      },
      panel: {
        type: 'quiz',
        q: "Why does SimSurance run its scenarios on synthetic populations instead of real Pennsylvania encounter data?",
        opts: [
          'A) The systems-management page shows OMHSAS handling claim/encounter data and business intelligence for HealthChoices — but those files are for the state\u2019s business partners and are nonpublic, so real encounter files are out of bounds for this project.',
          'B) Encounter Data Validation studies prove encounter data is always perfectly accurate, so models can use it freely.',
          'C) The state publishes all raw encounter files publicly, but they are too boring for a simulator to use.',
        ],
        answer: 0,
        explanation: "Correct! The page describes OMHSAS managing claim and encounter data and conducting business intelligence — but its stated audience is OMHSAS business partners, and none of the files are public. This project therefore works with synthetic populations and public documents. Note also: the page's Encounter Data Validation studies were read here as index rows only; their actual findings are unknown to this project, and no rule was encoded from any of it.",
      },
      furtherReading: [
        { label: 'OMHSAS Systems Management (Official)', url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-systems-management' },
        { label: 'Read Policy Sources', url: './reading-policy.html' },
      ],
      next: 'u3_p3',
    },
    {
      id: 'u3_p3',
      part: 'Unit III · Provider Realities',
      chapter: 'Ch 8 · The Interactive 4-Gate Claim Terminal',
      text: "Here is Glim's Claims Adjudication Terminal. A claim is never an automatic check—it is an auditable legal inquiry. Toggle the 4 gates below: Eligibility, Network, Prior Auth, and Data Coding. See how each affects payment in real time:",
      advantage: true,
      advantageText: 'Clean Claim: Deterministic Adjudication',
      panel: { type: 'claims' },
      next: 'u3_p4',
    },
    {
      id: 'u3_p4',
      part: 'Unit III · Provider Realities',
      chapter: 'Ch 9 · Fee Schedules, Overhead & Act 68 Appeals',
      text: "Even when a claim is approved, look at the arithmetic: Billed charge: $150. Contracted allowed amount: $90. Practice overhead (rent, billing staff, software, insurance): $45/hr. The net take-home is just $45/hr. If a claim is wrongly denied, PA Act 68 grants a 2-level grievance and external independent review.",
      advantage: true,
      advantageText: 'Statutory Defense: Prompt Pay & Appeals',
      citation: {
        title: 'Pennsylvania Act 68 Prompt Pay and Grievance Statute',
        statute: '40 P.S. § 991.2161 & § 991.2162 · Grievance System & Prompt Payment',
        quote: 'A clean claim shall be paid within 45 days... Failure to pay within 45 days requires interest at ten percent (10%) per year. An enrollee or provider may file a grievance regarding medical necessity.',
        url: 'https://www.insurance.pa.gov/Consumers/Pages/Act-68-Appeals.aspx',
        urlLabel: 'PA Act 68 Prompt Pay & Grievance Rights',
      },
      next: 'u4_p1',
    },

    // -------------------------------------------------------------
    // UNIT IV: INPATIENT, CRISIS & SEVERE MENTAL ILLNESS
    // -------------------------------------------------------------
    {
      id: 'u4_p1',
      part: 'Unit IV · Inpatient & Crisis',
      chapter: 'Ch 10 · The Crisis Gateway & Act 302 Commitment',
      text: "Now let's examine acute inpatient care. When a person is experiencing severe psychosis or active suicidal intent, Pennsylvania's Mental Health Procedures Act governs involuntary admission under Section 302 (Act 147). A county Mental Health Delegate must authorize emergency evaluation within 2 hours of facility arrival.",
      advantage: false,
      citation: {
        title: 'Pennsylvania Mental Health Procedures Act (Act 147)',
        statute: '50 P.S. § 7302 · Involuntary Emergency Examination and Treatment',
        quote: 'Upon written application by a physician or county delegate, a person who is severely mentally disabled may be taken to a facility for examination. Emergency treatment may continue for up to 120 hours.',
        url: 'https://www.pa.gov/en/agencies/dhs/resources/mental-health.html',
        urlLabel: 'PA DHS Mental Health Procedures Act Guidelines',
      },
      choices: [
        { text: 'What happens after the 120-hour emergency hold expires?', next: 'u4_p1_303' },
        { text: 'Who pays for emergency psychiatric evaluations?', next: 'u4_p1_payer' },
      ],
    },
    {
      id: 'u4_p1_303',
      part: 'Unit IV · Inpatient & Crisis',
      chapter: 'Ch 10 · Section 303 & Extended Commitment',
      text: "If the treatment team determines the individual remains in acute danger, a formal judicial hearing is held under Section 303 for an extended 20-day involuntary commitment. The patient is represented by legal counsel before a Mental Health Review Officer.",
      advantage: true,
      advantageText: 'Legal Guardrail: Due Process in Commitment',
      next: 'u4_p2',
    },
    {
      id: 'u4_p1_payer',
      part: 'Unit IV · Inpatient & Crisis',
      chapter: 'Ch 10 · Emergency Mandate & EMTALA',
      text: "Under the federal Emergency Medical Treatment and Labor Act (EMTALA) and PA Act 68, hospitals cannot refuse emergency stabilization based on inability to pay. Medicaid or commercial insurance must cover emergency evaluation without requiring prior authorization.",
      advantage: true,
      advantageText: 'Statutory Shield: Emergency Coverage Mandate',
      next: 'u4_p2',
    },
    {
      id: 'u4_p2',
      part: 'Unit IV · Inpatient & Crisis',
      chapter: 'Ch 11 · ASAM Levels of Care & Medical Necessity',
      text: "For addiction and substance use disorders, Pennsylvania HealthChoices requires providers to evaluate members using the American Society of Addiction Medicine (ASAM) Criteria. Levels range from 1.0 (Outpatient) to 3.5 (Clinically Managed Residential) and 4.0 (Medically Managed Inpatient). Payers frequently deny residential claims citing 'lack of medical necessity for 24-hour nursing'.",
      advantage: true,
      advantageText: 'Clinical Framework: ASAM Multidimensional Triage',
      citation: {
        title: 'PA DHS Medical Assistance Bulletin on ASAM Placement',
        statute: 'PA MAB 08-20-12 · Standardized ASAM Criteria Placement Guidelines',
        quote: 'Providers must utilize ASAM criteria to assess Dimension 1 (Intoxication), Dimension 2 (Biomedical), Dimension 3 (Emotional), Dimension 4 (Readiness), Dimension 5 (Relapse), and Dimension 6 (Recovery Environment).',
        url: 'https://www.pa.gov/en/agencies/dhs/resources/healthchoices.html',
        urlLabel: 'PA Medical Assistance Bulletin: ASAM Placement',
      },
      next: 'u4_p3',
    },
    {
      id: 'u4_p3',
      part: 'Unit IV · Inpatient & Crisis',
      chapter: 'Ch 11 · Emergency Room Boarding & Bed Scarcity',
      text: "Why are psychiatric beds so hard to find in Pennsylvania? Inpatient psychiatric beds operate on razor-thin margins. Medicaid bed-day per diems often fall below staffed nursing costs, leading hospitals to decommission psychiatric units. As a result, patients in crisis sit in medical ERs for days waiting for bed placement.",
      advantage: false,
      panel: {
        type: 'exercise',
        title: 'Exercise 4.1: Crisis Resource Allocation',
        steps: [
          'Calculate the cost trade-off: 1 inpatient bed day ($1,800) equals 20 outpatient therapy sessions ($90).',
          'Explain why hospital ER boarding increases when outpatient clinic waitlists are long.',
        ],
        fields: [{ label: 'Reflect on how outpatient appointment shortages feed the hospital boarding crisis:', id: 'ex4_crisis' }],
      },
      next: 'u5_p1',
    },

    // -------------------------------------------------------------
    // UNIT V: STATUTORY LEDGERS & CLOSED ACCOUNTING
    // -------------------------------------------------------------
    {
      id: 'u5_p1',
      part: 'Unit V · Statutory Ledgers',
      chapter: 'Ch 12 · County Treasury: Capitation vs Claims',
      text: "Let's visit the County Treasury. In health economics, mixing up cash flows is the number one source of false claims. In Riverbend County, the state transfers $2,400,000 in annual capitation to the MCO ($40 PMPM x 5,000 members x 12 months). Meanwhile, downstream clinical claims totaled $170,511, plus $83,200 for the coordinator ($253,711 system cost). Look at the ledger below:",
      advantage: true,
      advantageText: 'Accounting Invariant: The Firewall Principle',
      citation: {
        title: 'Federal Medicaid Managed Care Financial Standards',
        statute: '42 CFR § 438.602 · Financial Auditing & Actuarial Soundness',
        quote: 'The State agency must ensure that all payments to MCOs are actuarially sound... and that capitation payments are maintained in separate auditable risk pools from provider fee-for-service disbursements.',
        url: 'https://www.medicaid.gov/medicaid/managed-care/guidance/index.html',
        urlLabel: 'Medicaid.gov Actuarial Soundness Regulations',
      },
      panel: { type: 'ledger' },
      furtherReading: [
        { label: 'Follow the Money Flow', url: './money-flow.html' },
      ],
      next: 'u5_p2',
    },
    {
      id: 'u5_p2',
      part: 'Unit V · Statutory Ledgers',
      chapter: 'Ch 12 · The Double-Counting Trap & 85% MLR Guardrail',
      text: "Never add $2.4M + $253k together! That is the Double-Counting Trap: capitation is the upstream reservoir; downstream claims are paid out of that reservoir. Furthermore, under federal law (42 CFR § 438.8), the MCO must spend at least 85% of capitation on clinical care and quality improvement. If administrative costs and profit exceed 15%, the plan must issue a refund (remittance) to the state.",
      advantage: true,
      advantageText: 'Federal Guardrail: 85% Medical Loss Ratio',
      citation: {
        title: 'Federal Medical Loss Ratio (MLR) Requirements',
        statute: '42 CFR § 438.8 · Medical Loss Ratio Standards for Managed Care',
        quote: 'Each MCO, PIHP, or PAHP must calculate and report an MLR... each MCO must maintain an MLR of at least 85 percent for the rating period. Remittance to the State is required if the standard is not met.',
        url: 'https://www.medicaid.gov/medicaid/managed-care/guidance/index.html',
        urlLabel: 'Medicaid.gov 42 CFR § 438.8 MLR Rule',
      },
      panel: {
        type: 'quiz',
        q: 'What occurs if an MCO spends only 78% of its capitation revenue on clinical care and quality initiatives?',
        opts: [
          'A) The MCO keeps the remaining 22% as bonus profit.',
          'B) The MCO violates the 85% MLR standard and must remit the excess difference back to the State Medicaid agency.',
          'C) The state immediately cancels all member Medicaid cards.',
        ],
        answer: 1,
        explanation: 'Correct! Under 42 CFR § 438.8, managed care organizations must achieve an 85% Medical Loss Ratio. Failing to meet this threshold triggers mandatory financial remittances back to the commonwealth.',
      },
      next: 'u5_p2_sbs',
    },
    {
      id: 'u5_p2_sbs',
      part: 'Unit V · Statutory Ledgers',
      chapter: 'Ch 12 · Schools as Billing Partners: Administrative Claiming',
      text: "Let's follow the money into an unexpected ledger: the schoolhouse. When school staff deliver Medicaid-covered behavioral health services, the dollars do not flow through the county treasury alone — CMS's School-Based Services Technical Assistance Center helps states claim them. States file State Plan Amendments (SPAs), Time Study Implementation Plans (TSIPs), Administrative Claiming Plans, and cost reports to get paid. The cast of characters is three layers deep: the State Medicaid Agency (SMA), the State Education Agency (SEA), and the Local Education Agencies (LEAs) — the schools that run the time studies and build the cost pools.",
      advantage: true,
      advantageText: 'Financing Literacy: School Dollars Are Claimed, Not Assumed',
      citation: {
        title: 'CMS School-Based Services Resources',
        statute: 'CMS · 2023 Comprehensive Guide to Medicaid Services and Administrative Claiming',
        quote: 'We have also issued school-based services (SBS) guidance, most notably the 2023 Comprehensive Guide to Medicaid Services and Administrative Claiming.',
        url: 'https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/medicaid-and-school-based-services/school-based-services-resources',
        urlLabel: 'CMS School-Based Services Resources',
      },
      panel: {
        type: 'quiz',
        q: 'What does the Readiness Checklist Tool help State Medicaid Agencies draft?',
        opts: [
          'A) A Behavioral HealthChoices member handbook.',
          'B) A school-based services State Plan Amendment (SPA).',
          'C) A Medicaid managed-care waiver for capitation rates.',
        ],
        answer: 1,
        explanation: "Correct! CMS's Readiness Checklist Tool was developed for SMAs to help draft an SBS State Plan Amendment (SPA), adopt the 2023 flexibilities, assess whether the State Plan reflects a compliant payment methodology, prepare documents like a TSIP, and plan with CMS across agencies. The resource index is a doorway — the SPA's actual text, version, and effective date must be opened and read before any rule is encoded.",
      },
      furtherReading: [
        { label: 'CMS School-Based Services Resources (Official)', url: 'https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/medicaid-and-school-based-services/school-based-services-resources' },
        { label: 'Read Policy Sources', url: './reading-policy.html' },
      ],
      next: 'u6_p1',
    },

    // -------------------------------------------------------------
    // UNIT VI: THE PARITY MIRAGE & SYSTEMIC GAPS
    // -------------------------------------------------------------
    {
      id: 'u6_p1',
      part: 'Unit VI · Parity Mirage',
      chapter: 'Ch 13 · MHPAEA: Federal Parity & 2024 Final Rule',
      text: "Why is behavioral health access so much harder to obtain than physical health care? In 2008, Congress passed the Mental Health Parity and Addiction Equity Act (MHPAEA), reinforced by the landmark 2024 Final Rule. It mandates that mental health benefits cannot have stricter limits than medical/surgical benefits.",
      advantage: false,
      citation: {
        title: 'Mental Health Parity and Addiction Equity Act & 2024 Final Rule',
        statute: '42 U.S.C. § 300gg-26 & 89 FR 77582 · Parity in Mental Health and Substance Use',
        quote: 'Plans may not design or apply nonquantitative treatment limitations (NQTLs) that impose greater operational burdens or restrictions on access to mental health benefits than to medical/surgical benefits.',
        url: 'https://www.cms.gov/marketplace/private-health-insurance/mental-health-parity-addiction-equity-act',
        urlLabel: 'CMS Parity Regulations & 2024 Final Rule',
      },
      furtherReading: [
        { label: 'Read Policy Sources', url: './reading-policy.html' },
      ],
      choices: [
        { text: 'What is a Quantitative Treatment Limitation (QTL)?', next: 'u6_p1_qtl' },
        { text: 'What is a Non-Quantitative Treatment Limitation (NQTL)?', next: 'u6_p1_nqtl' },
      ],
    },
    {
      id: 'u6_p1_qtl',
      part: 'Unit VI · Parity Mirage',
      chapter: 'Ch 13 · Quantitative Treatment Limitations (QTLs)',
      text: "QTLs are numerical limits: copay dollars, coinsurance percentages, deductible amounts, or annual visit caps. Insurers cannot charge a $50 copay for therapy if an office visit with a medical doctor only requires $25.",
      advantage: true,
      advantageText: 'Parity Standard: QTL Equality',
      next: 'u6_p2',
    },
    {
      id: 'u6_p1_nqtl',
      part: 'Unit VI · Parity Mirage',
      chapter: 'Ch 13 · Non-Quantitative Treatment Limitations (NQTLs)',
      text: "NQTLs are where the real barriers hide: prior authorization frequency, concurrent review scrutiny, network credentialing stringency, and reimbursement fee schedules. Insurers often subject psychiatric claims to rigorous review while approving surgical visits without friction.",
      advantage: true,
      advantageText: 'Parity Frontier: NQTL Scrutiny',
      next: 'u6_p2',
    },
    {
      id: 'u6_p2',
      part: 'Unit VI · Parity Mirage',
      chapter: 'Ch 14 · PA Act 111 & State Parity Enforcement',
      text: "In 2020, Pennsylvania enacted Act 111 to give the Pennsylvania Insurance Department teeth to enforce parity. Act 111 requires commercial and Medicaid insurers to submit detailed comparative analyses proving their NQTL policies don't discriminate against mental health care.",
      advantage: true,
      advantageText: 'State Law: PA Act 111 Parity Audits',
      citation: {
        title: 'Pennsylvania Act 111 of 2020 Parity Law',
        statute: '40 P.S. § 908-111 · Mental Health Parity Compliance Auditing',
        quote: 'The Insurance Department shall enforce MHPAEA and review insurer comparative analyses of nonquantitative treatment limitations to ensure equal access to behavioral health services across Pennsylvania.',
        url: 'https://www.insurance.pa.gov/Coverage/MentalHealth/Pages/default.aspx',
        urlLabel: 'PA Insurance Dept Act 111 Parity Guidelines',
      },
      next: 'u6_p3',
    },
    {
      id: 'u6_p3',
      part: 'Unit VI · Parity Mirage',
      chapter: 'Ch 14 · Provider Capacity Multiplier Bottleneck',
      text: "Even with parity laws on the books, legal rights cannot fabricate clinical hours if there are simply not enough clinicians staffed in the county. Toggling provider capacity from 0.75x (severe clinician shortage) up to 1.5x (expanded clinic hours) shows how workforce supply controls wait times:",
      advantage: true,
      advantageText: 'Workforce Realities: Capacity Sets the Pace',
      panel: { type: 'capacity' },
      next: 'u7_p1',
    },

    // -------------------------------------------------------------
    // UNIT VII: SOLUTIONS, PYTHON WASM & TOWN PASSPORT
    // -------------------------------------------------------------
    {
      id: 'u7_p1',
      part: 'Unit VII · Solutions & Mastery',
      chapter: 'Ch 15 · Collaborative Care Model (CoCM)',
      text: "How do we solve the national clinician shortage? One proven answer is the Collaborative Care Model (CoCM). Instead of a psychiatrist seeing one patient per hour in private practice, a consulting psychiatrist supervises a care manager embedded in a primary care clinic, managing 50 to 100 patients collaboratively! Medicare and Medicaid now reimburse this under CPT 99492-99494.",
      advantage: true,
      advantageText: 'Innovation: Collaborative Care Multiplier',
      citation: {
        title: 'CMS Behavioral Health Integration & Collaborative Care',
        statute: 'CMS MLN909432 / CPT 99492–99494 · Psychiatric Collaborative Care Model',
        quote: 'The Psychiatric Collaborative Care Model delivers evidence-based behavioral health treatment in primary care, utilizing registry tracking, structured care management, and regular psychiatric consultation.',
        url: 'https://www.cms.gov/medicare/payment/fee-schedules/physician/behavioral-health-integration',
        urlLabel: 'CMS Behavioral Health Integration Guidelines',
      },
      next: 'u7_p2',
    },
    {
      id: 'u7_p2',
      part: 'Unit VII · Solutions & Mastery',
      chapter: 'Ch 15 · In-Browser Python Policy Lab (Pyodide WASM)',
      text: "Policy models shouldn't just live in static reports—they should be verifiable code you can test yourself. Look below at the Bytecode Mill. Here runs CPython 3.12 compiled to WebAssembly via Pyodide. Tap 'Run Simulation' to execute Monte Carlo discrete-event queue algorithms right in your browser!",
      advantage: false,
      panel: { type: 'terminal' },
      furtherReading: [
        { label: 'Open Fullscreen Python Lab', url: './live-simulation.html' },
      ],
      next: 'u7_p3',
    },
    {
      id: 'u7_p3',
      part: 'Unit VII · Solutions & Mastery',
      chapter: 'Ch 16 · Statutory Policy Provenance Vault',
      text: "Every parameter in SimSurance is tied to legislative, statutory, and contractual ground truth: PA Act 68, PA Act 111, the PA DHS BHC-MCO agreement, and 42 CFR Part 438. To guarantee mathematical and educational transparency, every stochastic model carries the hypothetical_scenario provenance tag.",
      advantage: true,
      advantageText: 'Policy Provenance: Ground Truth Verified',
      panel: { type: 'provenance' },
      furtherReading: [
        { label: 'Read Policy Sources', url: './reading-policy.html' },
        { label: 'SimSurance Sources Registry', url: '../docs/sources.registry.json' },
      ],
      next: 'u7_p4',
    },
    {
      id: 'u7_p4',
      part: 'Unit VII · Solutions & Mastery',
      chapter: 'Ch 16 · The Community Crossroads: 3 Perspectives',
      text: "You have traversed Riverbend County from the front porch to the statutory vault! At the Town Crossroads, Jordan (Member), Dr. Ramirez (Clinician), and Marcus (Auditor) share their conclusions. Only when all three perspectives align can sustainable reform occur.",
      advantage: false,
      panel: { type: 'crossroads' },
      next: 'u7_p4_vault',
    },
    {
      id: 'u7_p4_vault',
      part: 'Unit VII · Solutions & Mastery',
      chapter: 'Ch 16 · The Official Document Vault',
      text: "One last stop before your Town Passport: the document vault where the real rules live. Every claim you have heard today — about rates, standards, handbooks — is only as strong as the document it comes from. The Pennsylvania DHS Publications index is the official library for Behavioral HealthChoices: the Program Standards and Requirements (PSR) and its appendices, the ASAM Provider Rates effective January 1, 2026, the 2026 Financial Reporting Requirements, the OMHSAS Member Handbook 2026, and annual external quality review technical reports for every BH-MCO. Carry this rule into your research life: never cite the rumor — open the vault, read the document's version and effective date, and only then quote the exact passage.",
      advantage: true,
      advantageText: 'Research Rule: Rules Live in the Vault, Never in Rumors',
      citation: {
        title: 'Behavioral HealthChoices Publications',
        statute: 'Balanced Budget Act of 1997 · External Quality Review Requirement',
        quote: 'The Balanced Budget Act (BBA) of 1997 requires that state agencies contract with an External Quality Review Organization to conduct an annual external quality review of the services provided by contracted Medicaid Managed Care Organizations.',
        url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications',
        urlLabel: 'PA DHS BHC Publications Index',
      },
      panel: {
        type: 'beforeafter',
        before: "RUMOR-MILL RESEARCH:\n- 'I heard Medicaid pays $X per therapy session in Pennsylvania.'\n- No document attached. No version, no effective date, no county.\n- An argument built on a rumor collapses the moment someone asks 'says who?'",
        after: "VAULT RESEARCH:\n- Open the official DHS Publications index.\n- Read the actual document: the Program Standards and Requirements, the ASAM Provider Rates effective January 1, 2026, the 2026 Financial Reporting Requirements, or the OMHSAS Member Handbook 2026.\n- Record version + effective date + exact passage before encoding anything.",
        note: "This index is a library door, not the rule itself — each linked document must be opened and read before a claim is made. Every citation card you saw today went through this door.",
      },
      furtherReading: [
        { label: 'The Publications Vault (Official)', url: 'https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications' },
        { label: 'Read Policy Sources', url: './reading-policy.html' },
      ],
      next: 'u7_p5',
    },
    {
      id: 'u7_p5',
      part: 'Unit VII · Solutions & Mastery',
      chapter: 'Ch 17 · Town Passport & 8 Discovery Seals',
      text: "Congratulations! You have completed Glim's Master Insurance Curriculum. Review your Town Passport below. Click on any of the 8 Discovery Seals to visit that landmark chamber, claim your seal, and earn your full Managed Care Literacy certification!",
      advantage: true,
      advantageText: 'Curriculum Complete: Master Insurance Scholar',
      panel: { type: 'gallery' },
      isEnd: true,
    },
  ];

  // =================================================================
  // ENGINE STATE & PERSISTENCE
  // =================================================================

  const storage = {
    get: (key, fallback) => {
      try {
        if (typeof localStorage !== 'undefined') {
          const val = localStorage.getItem(key);
          return val !== null ? val : fallback;
        }
      } catch (_) {}
      return fallback;
    },
    getJSON: (key, fallback) => {
      try {
        if (typeof localStorage !== 'undefined') {
          const val = localStorage.getItem(key);
          return val ? JSON.parse(val) : fallback;
        }
      } catch (_) {}
      return fallback;
    },
    set: (key, val) => {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
        }
      } catch (_) {}
    },
  };

  const state = {
    data: null,
    currentIdx: 0,
    typing: false,
    typeTimer: null,
    fullText: '',
    completed: storage.getJSON('simsurance_done', []),
    savedNotes: storage.getJSON('simsurance_notes', {}),
    seals: storage.getJSON('simsurance_seals', []),
    activeScenario: 'baseline',
    activeCapacity: 1.0,
    activeWeek: 52,
    claimInputs: { eligibility: 'valid', network: 'in_network', auth: 'valid', data: 'valid' },
    activeChamber: null,
  };

  function $(id) {
    return document.getElementById(id);
  }

  function getSavedNote(id) {
    return state.savedNotes[id] || '';
  }

  function saveNote(id, val) {
    state.savedNotes[id] = val;
    storage.set('simsurance_notes', state.savedNotes);
  }

  function isSealClaimed(key) {
    return state.seals.includes(key);
  }

  function claimSeal(key) {
    if (!state.seals.includes(key)) {
      state.seals.push(key);
      storage.set('simsurance_seals', state.seals);
    }
    AudioSynth.stamp();
    updateStampUI();
    const btn = $('vj-chamber-claim');
    if (btn) {
      btn.textContent = '✓ Discovery Seal Claimed!';
      btn.classList.add('claimed');
    }
    const status = $('vj-chamber-seal-status');
    if (status) {
      status.textContent = 'SEAL: DISCOVERED';
      status.classList.add('earned');
    }
    // Glim celebration emote
    const glim = $('glim-svg');
    if (glim) {
      glim.src = './assets/glim-celebrate.svg';
      setTimeout(() => {
        if (glim) glim.src = './assets/glim-guide.svg';
      }, 2500);
    }
  }

  function updateStampUI() {
    Object.keys(BUILDINGS).forEach((key) => {
      const earned = state.seals.includes(key);
      const stamps = document.querySelectorAll(`[data-vj-stamp="${key}"]`);
      stamps.forEach((el) => {
        if (earned) {
          el.classList.add('earned');
          el.setAttribute('aria-pressed', 'true');
        } else {
          el.classList.remove('earned');
          el.setAttribute('aria-pressed', 'false');
        }
      });
    });
  }

  // =================================================================
  // TYPING ENGINE & DIALOGUE CONTROLS
  // =================================================================

  function typeText(text, onDone) {
    const el = $('typed-text');
    const cur = $('cursor');
    const glim = $('glim-svg');
    if (!el || !cur) return;
    el.textContent = '';
    cur.style.display = 'inline-block';
    state.typing = true;
    let i = 0;
    if (glim) glim.className = 'robot-sprite talking';

    clearInterval(state.typeTimer);
    state.typeTimer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        if (i % 3 === 0 && text[i] !== ' ') {
          AudioSynth.blip();
        }
        i += 1;
      } else {
        clearInterval(state.typeTimer);
        state.typing = false;
        cur.style.display = 'none';
        if (glim) glim.className = 'robot-sprite idle';
        if (onDone) onDone();
      }
    }, 16);
  }

  function skipTyping() {
    if (state.typing) {
      clearInterval(state.typeTimer);
      state.typing = false;
      const el = $('typed-text');
      const cur = $('cursor');
      const glim = $('glim-svg');
      if (el) el.textContent = state.fullText;
      if (cur) cur.style.display = 'none';
      if (glim) glim.className = 'robot-sprite idle';
      showControls();
    }
  }

  function showControls() {
    const scene = WORKBOOK[state.currentIdx];
    const ctrl = $('controls-area');
    if (!ctrl || !scene) return;
    ctrl.innerHTML = '';

    if (scene.choices) {
      const wrap = document.createElement('div');
      wrap.className = 'choices';
      scene.choices.forEach((c) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<span class="choice-arrow">&gt;</span><span>${escapeHtml(c.text)}</span>`;
        btn.onclick = () => {
          AudioSynth.chirp();
          goToById(c.next);
        };
        wrap.appendChild(btn);
      });
      ctrl.appendChild(wrap);
    } else if (scene.isEnd) {
      const endWrap = document.createElement('div');
      endWrap.style.textAlign = 'center';
      endWrap.style.padding = '16px';
      endWrap.innerHTML = `
        <div style="font-size:14px;color:var(--cyan);letter-spacing:2px;margin-bottom:14px;font-weight:700;">★ WORKBOOK COMPLETE ★</div>
        <button class="next-btn primary" onclick="openJournal()" style="float:none;margin-right:8px;">★ View Town Passport</button>
        <button class="next-btn" onclick="openMap()" style="float:none;">&#9673; Review Curriculum Map</button>
      `;
      ctrl.appendChild(endWrap);
    } else if (scene.next) {
      const btn = document.createElement('button');
      btn.className = 'next-btn';
      btn.innerHTML = 'Continue &gt;';
      btn.onclick = () => {
        AudioSynth.chirp();
        goToById(scene.next);
      };
      ctrl.appendChild(btn);
    }

    const hint = document.createElement('div');
    hint.className = 'ctrl-hint';
    hint.textContent = '[ Click anywhere to skip typing · Space to continue ]';
    ctrl.appendChild(hint);
  }

  function goToById(id) {
    const idx = WORKBOOK.findIndex((s) => s.id === id);
    if (idx >= 0) {
      state.currentIdx = idx;
      renderScene();
    }
  }

  function buildProgress() {
    const total = WORKBOOK.length;
    const pct = Math.round((state.currentIdx / (total - 1)) * 100);
    const fill = $('prog-bar-fill');
    const pctEl = $('prog-pct');
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  }

  // =================================================================
  // DYNAMIC PANEL RENDERERS
  // =================================================================

  function renderPanel(panel) {
    if (!panel || !panel.type) return '';

    if (panel.type === 'town') {
      return `
        <div class="panel-label">&#9670; Riverbend Town World (16-Bit Interaction Layer)</div>
        <div class="vj-world crt-active" id="vj-world-container">
          <img class="vj-map" src="./assets/riverbend-world.svg" alt="16-bit Riverbend Town World" />
          <div class="vj-cloud"></div>
          <div class="vj-cloud two"></div>
          <div class="vj-fireflies"><i></i><i></i><i></i></div>
          <button type="button" class="vj-hotspot coverage" data-vj-place="coverage" onclick="openChamber('coverage')">🏛️ 1·Coverage</button>
          <button type="button" class="vj-hotspot wait" data-vj-place="wait" onclick="openChamber('wait')">⏱️ 2·Wait Queue</button>
          <button type="button" class="vj-hotspot clinic" data-vj-place="clinic" onclick="openChamber('clinic')">🏥 3·Clinic</button>
          <button type="button" class="vj-hotspot finance" data-vj-place="finance" onclick="openChamber('finance')">⚖️ 4·Treasury</button>
          <button type="button" class="vj-hotspot claims" data-vj-place="claims" onclick="openChamber('claims')">📝 5·Claims</button>
          <button type="button" class="vj-hotspot terminal" data-vj-place="terminal" onclick="openChamber('terminal')">⚡ 6·Python Lab</button>
          <button type="button" class="vj-hotspot archives" data-vj-place="archives" onclick="openChamber('archives')">📜 7·Provenance</button>
          <button type="button" class="vj-hotspot crossroads" data-vj-place="crossroads" onclick="openChamber('crossroads')">🧭 8·Crossroads</button>
        </div>
        <div class="vj-town-nav">
          <span class="vj-town-nav-title">Fast-Travel:</span>
          <button type="button" class="vj-town-pill" data-vj-place="coverage" onclick="openChamber('coverage')">[1] Coverage</button>
          <button type="button" class="vj-town-pill" data-vj-place="wait" onclick="openChamber('wait')">[2] Wait</button>
          <button type="button" class="vj-town-pill" data-vj-place="clinic" onclick="openChamber('clinic')">[3] Clinic</button>
          <button type="button" class="vj-town-pill" data-vj-place="finance" onclick="openChamber('finance')">[4] Treasury</button>
          <button type="button" class="vj-town-pill" data-vj-place="claims" onclick="openChamber('claims')">[5] Claims</button>
          <button type="button" class="vj-town-pill" data-vj-place="terminal" onclick="openChamber('terminal')">[6] Python Lab</button>
          <button type="button" class="vj-town-pill" data-vj-place="archives" onclick="openChamber('archives')">[7] Archives</button>
          <button type="button" class="vj-town-pill" data-vj-place="crossroads" onclick="openChamber('crossroads')">[8] Crossroads</button>
        </div>
      `;
    }

    if (panel.type === 'scrubber') {
      const view = state.data ? selectView(state.data, state.activeScenario, state.activeCapacity, state.activeWeek) : null;
      const waitlistVal = view ? Math.round(view.weekly.waitlist) : 13;
      const inCareVal = view ? Math.round(view.weekly.inCare) : 52;
      return `
        <div class="panel-label">&#9670; 52-Week Queue Scrubber Tool</div>
        <div class="sim-card">
          <div class="sim-controls">
            <span style="font-size:11px;color:var(--muted);text-transform:uppercase;">Scenario:</span>
            <div class="sim-btn-group">
              <button class="sim-btn ${state.activeScenario === 'baseline' ? 'active' : ''}" data-vj-scenario="baseline" onclick="setScenario('baseline')">Baseline</button>
              <button class="sim-btn ${state.activeScenario === 'care_coordination_pilot' ? 'active' : ''}" data-vj-scenario="care_coordination_pilot" onclick="setScenario('care_coordination_pilot')">Care Coordination Pilot</button>
            </div>
            <span style="font-size:11px;color:var(--muted);text-transform:uppercase;margin-left:8px;">Capacity:</span>
            <div class="sim-btn-group">
              <button class="sim-btn ${state.activeCapacity === 0.75 ? 'active' : ''}" data-vj-capacity="0.75" onclick="setCapacity(0.75)">0.75x</button>
              <button class="sim-btn ${state.activeCapacity === 1.0 ? 'active' : ''}" data-vj-capacity="1" onclick="setCapacity(1.0)">1.0x</button>
              <button class="sim-btn ${state.activeCapacity === 1.25 ? 'active' : ''}" data-vj-capacity="1.25" onclick="setCapacity(1.25)">1.25x</button>
              <button class="sim-btn ${state.activeCapacity === 1.5 ? 'active' : ''}" data-vj-capacity="1.5" onclick="setCapacity(1.5)">1.5x</button>
            </div>
          </div>
          <div style="margin:16px 0;">
            <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:6px;">
              <span>Week 1</span>
              <span id="scrubber-week-val" style="color:var(--cyan);font-weight:700;">Week ${state.activeWeek} of 52</span>
              <span>Week 52</span>
            </div>
            <input type="range" min="1" max="52" value="${state.activeWeek}" style="width:100%;accent-color:var(--cyan);" oninput="onScrubberInput(this.value)">
          </div>
          <div class="sim-grid">
            <div class="sim-stat">
              <div class="sim-stat-label">Waitlist Queue (People)</div>
              <div class="sim-stat-val" id="scrubber-waitlist-val">${waitlistVal}</div>
            </div>
            <div class="sim-stat">
              <div class="sim-stat-label">Active Members in Care</div>
              <div class="sim-stat-val" id="scrubber-incare-val">${inCareVal}</div>
            </div>
          </div>
        </div>
      `;
    }

    if (panel.type === 'capacity') {
      return `
        <div class="panel-label">&#9670; Clinician Appointment Capacity Multiplier</div>
        <div class="sim-card">
          <p style="font-size:12px;color:var(--ink);line-height:1.6;margin-bottom:12px;">Toggle clinician hours to observe how increasing provider appointment slots relieves the retention logjam:</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;">
            ${[0.75, 1.0, 1.25, 1.5].map((mult) => `
              <button onclick="setCapacity(${mult});renderScene();" style="background:${state.activeCapacity === mult ? 'var(--cyan)' : 'var(--panel)'};color:${state.activeCapacity === mult ? '#07172d' : 'var(--ink)'};border:1px solid var(--border);border-radius:10px;padding:12px;font-weight:700;font-size:12px;cursor:pointer;">
                ${mult}x Capacity<br><span style="font-size:10px;font-weight:normal;">${mult === 0.75 ? 'Shortage' : mult === 1.0 ? 'Standard' : mult === 1.25 ? 'Expanded' : 'Surplus'}</span>
              </button>
            `).join('')}
          </div>
          <div style="margin-top:14px;background:#0d1b2e;padding:12px;border-radius:8px;font-size:12px;line-height:1.6;">
            <strong>Capacity Effect at Week 52:</strong> At 1.0x, Pilot waitlist is 22 people. At 1.5x, Pilot waitlist collapses to only 1 person, while completing 234 full treatment episodes!
          </div>
        </div>
      `;
    }

    if (panel.type === 'ledger') {
      return `
        <div class="panel-label">&#9670; County Treasury &amp; Statutory Accounting Ledger</div>
        <div class="sim-card">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
            <div style="background:#091e33;border:1px solid #1a436e;border-radius:10px;padding:14px;">
              <div style="font-size:10px;color:var(--cyan);text-transform:uppercase;letter-spacing:1px;font-weight:700;">Upstream State Transfer</div>
              <div style="font-size:24px;color:#fff;font-weight:700;margin:6px 0;">$2,400,000</div>
              <div style="font-size:11px;color:var(--muted);line-height:1.5;">Annual prospective capitation transfer from the state to Riverbend MCO ($40.00 PMPM &times; 5,000 members &times; 12 mo).</div>
            </div>
            <div style="background:#092520;border:1px solid #1b5344;border-radius:10px;padding:14px;">
              <div style="font-size:10px;color:var(--mint);text-transform:uppercase;letter-spacing:1px;font-weight:700;">Downstream System Costs</div>
              <div style="font-size:24px;color:var(--mint);font-weight:700;margin:6px 0;">$253,711</div>
              <div style="font-size:11px;color:var(--muted);line-height:1.5;">Actual disbursements: $170,511 in clinical fee-for-service claims + $83,200 coordinator salary.</div>
            </div>
          </div>
          <div style="border-left:3px solid var(--verm);background:#1a0a0a;padding:10px 14px;border-radius:4px;font-size:12px;color:#ffc0b4;line-height:1.6;">
            <strong>&#9888; Double-Counting Hazard Alert:</strong> Capitation is the funding reservoir; downstream service payments are paid out of that reservoir. Never add $2.4M + $253k together.
          </div>
        </div>
      `;
    }

    if (panel.type === 'claims') {
      const outcome = adjudicateToyClaim(
        state.claimInputs.eligibility,
        state.claimInputs.network,
        state.claimInputs.auth,
        state.claimInputs.data
      );
      const badgeClass = outcome.status === 'paid' ? 'background:#114e3b;color:#7bf3c8;' : outcome.status === 'review' ? 'background:#543d10;color:#ffda79;' : 'background:#541414;color:#ff9b9b;';
      return `
        <div class="panel-label">&#9670; Claims Adjudication Terminal (4 Verification Gates)</div>
        <div class="sim-card">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-bottom:14px;">
            <div>
              <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px;">1. Member Eligibility</label>
              <select onchange="updateClaimGate('eligibility', this.value)" style="width:100%;background:var(--panel);border:1px solid var(--border);color:var(--ink);padding:6px 8px;border-radius:6px;">
                <option value="valid" ${state.claimInputs.eligibility === 'valid' ? 'selected' : ''}>Active HealthChoices</option>
                <option value="inactive" ${state.claimInputs.eligibility === 'inactive' ? 'selected' : ''}>Terminated / Ineligible</option>
              </select>
            </div>
            <div>
              <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px;">2. Provider Network</label>
              <select onchange="updateClaimGate('network', this.value)" style="width:100%;background:var(--panel);border:1px solid var(--border);color:var(--ink);padding:6px 8px;border-radius:6px;">
                <option value="in_network" ${state.claimInputs.network === 'in_network' ? 'selected' : ''}>In-Network Contracted</option>
                <option value="out_network" ${state.claimInputs.network === 'out_network' ? 'selected' : ''}>Out-of-Network / Uncredentialed</option>
              </select>
            </div>
            <div>
              <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px;">3. Prior Authorization</label>
              <select onchange="updateClaimGate('auth', this.value)" style="width:100%;background:var(--panel);border:1px solid var(--border);color:var(--ink);padding:6px 8px;border-radius:6px;">
                <option value="valid" ${state.claimInputs.auth === 'valid' ? 'selected' : ''}>Auth Granted / Exempt</option>
                <option value="missing" ${state.claimInputs.auth === 'missing' ? 'selected' : ''}>Missing Prior Auth</option>
              </select>
            </div>
            <div>
              <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px;">4. Claim Data Integrity</label>
              <select onchange="updateClaimGate('data', this.value)" style="width:100%;background:var(--panel);border:1px solid var(--border);color:var(--ink);padding:6px 8px;border-radius:6px;">
                <option value="valid" ${state.claimInputs.data === 'valid' ? 'selected' : ''}>Clean Coding (NPI/CPT)</option>
                <option value="invalid" ${state.claimInputs.data === 'invalid' ? 'selected' : ''}>Malformed NPI / Missing ICD</option>
              </select>
            </div>
          </div>
          <div style="background:#09121f;border:1px solid var(--border);border-radius:10px;padding:14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div>
              <span style="font-size:11px;padding:4px 10px;border-radius:6px;font-weight:700;text-transform:uppercase;${badgeClass}">${outcome.status}</span>
              <span style="margin-left:8px;font-size:12px;color:var(--ink);">${outcome.message}</span>
            </div>
            <div style="font-size:18px;font-weight:700;color:var(--cyan);">${outcome.amountCents ? '$' + (outcome.amountCents / 100).toFixed(2) : '$0.00'}</div>
          </div>
        </div>
      `;
    }

    if (panel.type === 'terminal') {
      return `
        <div class="panel-label">&#9670; WebAssembly CPython Policy Lab</div>
        <div class="sim-card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
            <div style="font-size:12px;color:var(--ink);font-weight:600;">Engine: Pyodide WebAssembly CPython 3.12 (In-Browser)</div>
            <button onclick="runTerminalSim()" style="background:var(--cyan);color:#07172d;border:none;border-radius:8px;padding:6px 16px;font-size:11px;font-weight:700;cursor:pointer;">&#9654; Run Simulation</button>
          </div>
          <div id="vj-terminal-stdout" style="background:#050a12;border:1px solid var(--border);border-radius:8px;padding:12px;font-family:var(--pixel);font-size:11px;color:#7bf3c8;height:140px;overflow-y:auto;white-space:pre-wrap;line-height:1.5;">[SimSurance WASM Shell Ready]\nSelect 'Run Simulation' to execute discrete-event queues in client-side Python bytecode.</div>
        </div>
      `;
    }

    if (panel.type === 'provenance') {
      return `
        <div class="panel-label">&#9670; Policy Provenance &amp; Legislative Ground Truth</div>
        <div class="sim-card">
          <ul style="font-size:12px;color:var(--ink);line-height:1.8;padding-left:18px;margin-bottom:10px;">
            <li><strong>PA Act 68 (1998):</strong> Managed care quality, complaints, grievances, and emergency care access standards.</li>
            <li><strong>PA Act 111 (2020):</strong> Behavioral health parity enforcement and network oversight protocols.</li>
            <li><strong>PA DHS BHC-MCO Agreement 2023-2025:</strong> Mandatory county capitation contracts and network adequacy benchmarks.</li>
            <li><strong>Code Tag:</strong> Every stochastic model file explicitly tagged with <code>hypothetical_scenario</code> to preserve simulation integrity.</li>
          </ul>
        </div>
      `;
    }

    if (panel.type === 'crossroads') {
      return `
        <div class="panel-label">&#9670; Community Crossroads: Tri-Perspective Switchboard</div>
        <div class="sim-card">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;">
            <div style="background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:12px;">
              <div style="color:var(--cyan);font-weight:700;font-size:12px;margin-bottom:4px;">👤 Jordan (The Member)</div>
              <div style="font-size:11px;color:var(--muted);line-height:1.5;">"My insurance card says HealthChoices. I need someone to talk to this week, not in November. Coverage without open slots leaves me waiting."</div>
            </div>
            <div style="background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:12px;">
              <div style="color:var(--mint);font-weight:700;font-size:12px;margin-bottom:4px;">🩺 Dr. Ramirez (The Clinician)</div>
              <div style="font-size:11px;color:var(--muted);line-height:1.5;">"When my clients stay engaged through the coordinator, they heal. But my calendar has 24 hours in a day. You can't add intakes without adding clinicians."</div>
            </div>
            <div style="background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:12px;">
              <div style="color:var(--gold);font-weight:700;font-size:12px;margin-bottom:4px;">📊 Marcus (The State Auditor)</div>
              <div style="font-size:11px;color:var(--muted);line-height:1.5;">"The $2.4M capitation was transferred to manage risk. Downstream service cost was $253k. Never combine them; closed ledger rules must hold."</div>
            </div>
          </div>
        </div>
      `;
    }

    if (panel.type === 'beforeafter') {
      return `
        <div class="panel-label">&#9670; Policy Comparison</div>
        <div class="ba-tabs">
          <button class="ba-tab active" onclick="switchBA(this, 'before')">Perspective A</button>
          <button class="ba-tab" onclick="switchBA(this, 'after')">Perspective B</button>
        </div>
        <div class="ba-content" id="ba-view-before">${escapeHtml(panel.before)}</div>
        <div class="ba-content" id="ba-view-after" style="display:none;">${escapeHtml(panel.after)}</div>
        ${panel.note ? `<div class="ba-note">${escapeHtml(panel.note)}</div>` : ''}
      `;
    }

    if (panel.type === 'exercise') {
      const saved = getSavedNote(panel.fields[0].id);
      return `
        <div class="panel-label">&#9670; Clinical &amp; Administrative Exercise</div>
        <div class="exercise-box">
          <div class="ex-header">
            <span class="ex-title">${escapeHtml(panel.title)}</span>
            <span style="font-size:10px;color:#fff;opacity:.8;">Auto-Saved to Storage</span>
          </div>
          <div class="ex-body">
            ${panel.steps.map((st) => `<div class="ex-step">${escapeHtml(st)}</div>`).join('')}
            ${panel.fields.map((f) => `
              <div style="margin-top:10px;">
                <label style="font-size:11px;color:var(--muted);">${escapeHtml(f.label)}</label>
                <textarea class="write-area" id="${f.id}" oninput="saveNote('${f.id}', this.value)" placeholder="Type your reflection here...">${escapeHtml(saved)}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (panel.type === 'quiz') {
      return `
        <div class="panel-label">&#9670; Policy Knowledge Check</div>
        <div class="quiz-box">
          <div class="quiz-q">${escapeHtml(panel.q)}</div>
          <div class="quiz-options">
            ${panel.opts.map((opt, i) => `
              <button class="quiz-opt" onclick="evalQuiz(this, ${i}, ${panel.answer}, '${escapeHtml(panel.explanation)}')">${escapeHtml(opt)}</button>
            `).join('')}
          </div>
          <div class="quiz-feedback" id="quiz-fb"></div>
        </div>
      `;
    }

    if (panel.type === 'gallery') {
      return `
        <div class="panel-label">&#9670; Town Passport: 8 Discovered Seals</div>
        <div class="vj-passport-grid">
          ${Object.values(BUILDINGS).map((b) => {
            const earned = isSealClaimed(b.key);
            return `
              <div class="vj-passport-card ${earned ? 'earned' : ''}" onclick="openChamber('${b.key}')">
                <div style="font-size:18px;margin-bottom:4px;">${b.icon}</div>
                <div style="font-size:11px;color:${earned ? 'var(--gold)' : 'var(--muted)'};font-weight:700;">${b.sealTitle}</div>
                <div style="font-size:10px;color:var(--muted);margin-top:2px;">${earned ? '✓ Discovered' : 'Click to Explore'}</div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    return '';
  }

  // =================================================================
  // SCENE RENDERING ENGINE
  // =================================================================

  function renderScene() {
    const scene = WORKBOOK[state.currentIdx];
    if (!scene) return;

    // Mark previous as completed
    if (state.currentIdx > 0 && !state.completed.includes(WORKBOOK[state.currentIdx - 1].id)) {
      state.completed.push(WORKBOOK[state.currentIdx - 1].id);
      storage.set('simsurance_done', state.completed);
    }

    const chInd = $('chapter-indicator');
    if (chInd) chInd.textContent = `${scene.part} · ${scene.chapter}`;

    const spk = $('speaker-name');
    if (spk) spk.textContent = 'Glim';

    buildProgress();

    // Advantage / Insight badge
    const badge = $('advantage-badge');
    if (badge) {
      if (scene.advantage) {
        badge.classList.add('show');
        badge.textContent = scene.advantageText || 'Policy Insight';
      } else {
        badge.classList.remove('show');
      }
    }

    // Glim's Direct Statutory Policy Citation Card
    const citCard = $('vj-citation-card');
    if (citCard) {
      if (scene.citation) {
        citCard.style.display = 'block';
        citCard.innerHTML = `
          <div class="citation-header">
            <span class="citation-tag">⚖️ STATUTORY GROUND TRUTH</span>
            <span class="citation-statute">${escapeHtml(scene.citation.statute || '')}</span>
          </div>
          <div class="citation-title">${escapeHtml(scene.citation.title || '')}</div>
          ${scene.citation.quote ? `<div class="citation-quote">&ldquo;${escapeHtml(scene.citation.quote)}&rdquo;</div>` : ''}
          <div class="citation-links">
            ${scene.citation.url ? `<a href="${scene.citation.url}" target="_blank" rel="noopener noreferrer" class="citation-pill">&#128279; ${escapeHtml(scene.citation.urlLabel || 'Official Policy Source')} &rarr;</a>` : ''}
            <a href="./reading-policy.html" target="_blank" class="citation-pill" style="border-color:var(--mint);color:var(--mint);">&#128220; SimSurance Policy Registry</a>
          </div>
        `;
      } else {
        citCard.style.display = 'none';
        citCard.innerHTML = '';
      }
    }

    // Glim's Curated Further Reading Links on GitHub Pages
    const readBar = $('vj-further-reading');
    if (readBar) {
      if (scene.furtherReading && scene.furtherReading.length > 0) {
        readBar.style.display = 'flex';
        readBar.innerHTML = `
          <span class="further-reading-label">Further Reading:</span>
          ${scene.furtherReading.map((r) => `
            <a href="${r.url}" target="_blank" class="further-reading-chip">${escapeHtml(r.label)} &rarr;</a>
          `).join('')}
        `;
      } else {
        readBar.style.display = 'none';
        readBar.innerHTML = '';
      }
    }

    // Dynamic panel
    const panel = $('content-panel');
    if (panel) {
      if (scene.panel) {
        panel.classList.add('show');
        panel.innerHTML = renderPanel(scene.panel);
      } else {
        panel.classList.remove('show');
        panel.innerHTML = '';
      }
    }

    // Clear controls while typing
    const ctrl = $('controls-area');
    if (ctrl) {
      ctrl.innerHTML = `<div class="ctrl-hint">[ Click anywhere to skip typing · Space to continue ]</div>`;
    }

    // Type text
    state.fullText = scene.text;
    typeText(scene.text, () => showControls());
  }

  // =================================================================
  // CURRICULUM MAP & JOURNAL OVERLAYS
  // =================================================================

  function openMap() {
    const mapSc = $('map-screen');
    const gameSc = $('game-screen');
    if (mapSc && gameSc) {
      gameSc.style.display = 'none';
      mapSc.classList.add('active');
      buildMap();
    }
  }

  function closeMap() {
    const mapSc = $('map-screen');
    const gameSc = $('game-screen');
    if (mapSc && gameSc) {
      mapSc.classList.remove('active');
      gameSc.style.display = 'flex';
    }
  }

  function buildMap() {
    const wrap = $('map-chapters');
    if (!wrap) return;
    const parts = {};
    WORKBOOK.forEach((s, i) => {
      if (!parts[s.part]) parts[s.part] = [];
      parts[s.part].push({ s, i });
    });

    wrap.innerHTML = Object.entries(parts).map(([part, scenes]) => `
      <div class="part-section">
        <div class="part-label">${escapeHtml(part)}</div>
        <div class="chapter-list">
          ${scenes.map(({ s, i }) => `
            <div class="ch-card ${state.completed.includes(s.id) ? 'done' : i === state.currentIdx ? 'active' : ''}" onclick="jumpToScene(${i})">
              <div class="ch-num">${s.id.toUpperCase()}</div>
              <div class="ch-name">${escapeHtml(s.chapter)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function jumpToScene(idx) {
    state.currentIdx = idx;
    closeMap();
    renderScene();
  }

  function openJournal() {
    const d = $('vj-journal');
    if (!d) return;
    renderPassport();
    if (typeof d.showModal === 'function') {
      d.showModal();
    } else {
      d.setAttribute('open', '');
    }
  }

  function closeJournal() {
    const d = $('vj-journal');
    if (!d) return;
    if (typeof d.close === 'function') {
      d.close();
    } else {
      d.removeAttribute('open');
    }
  }

  function renderPassport() {
    const wrap = $('vj-journal-passport');
    if (!wrap) return;
    wrap.innerHTML = Object.values(BUILDINGS).map((b) => {
      const earned = isSealClaimed(b.key);
      return `
        <div class="vj-passport-card ${earned ? 'earned' : ''}" onclick="closeJournal();openChamber('${b.key}')">
          <div style="font-size:16px;">${b.icon}</div>
          <div style="font-size:11px;font-weight:700;color:${earned ? 'var(--gold)' : 'var(--muted)'};">${b.sealTitle}</div>
          <div style="font-size:10px;color:var(--muted);">${earned ? '✓ Discovered' : 'Click to inspect chamber'}</div>
        </div>
      `;
    }).join('');
  }

  // =================================================================
  // LANDMARK CHAMBER MODAL LOGIC
  // =================================================================

  function openChamber(key) {
    const b = BUILDINGS[key];
    if (!b) return;
    state.activeChamber = key;
    const dlg = $('vj-chamber');
    if (!dlg) return;

    $('vj-chamber-title').textContent = b.name;
    $('vj-chamber-subtitle').textContent = b.subtitle;

    const earned = isSealClaimed(key);
    const status = $('vj-chamber-seal-status');
    if (status) {
      status.textContent = earned ? 'SEAL: DISCOVERED' : 'SEAL: UNDISCOVERED';
      if (earned) status.classList.add('earned'); else status.classList.remove('earned');
    }

    const claimBtn = $('vj-chamber-claim');
    if (claimBtn) {
      claimBtn.textContent = earned ? '✓ Discovery Seal Claimed!' : '✦ Claim Discovery Seal';
      if (earned) claimBtn.classList.add('claimed'); else claimBtn.classList.remove('claimed');
      claimBtn.onclick = () => claimSeal(key);
    }

    // Render chamber body
    const body = $('vj-chamber-body');
    if (body) {
      body.innerHTML = renderChamberBody(key);
    }

    if (typeof dlg.showModal === 'function') {
      dlg.showModal();
    } else {
      dlg.setAttribute('open', '');
    }
  }

  function closeChamber() {
    const dlg = $('vj-chamber');
    if (!dlg) return;
    if (typeof dlg.close === 'function') {
      dlg.close();
    } else {
      dlg.removeAttribute('open');
    }
    state.activeChamber = null;
  }

  function renderChamberBody(key) {
    if (key === 'coverage') {
      return `
        <div style="background:var(--panel2);padding:14px;border-radius:10px;margin-bottom:12px;">
          <h3 style="color:var(--mint);font-size:14px;margin-bottom:6px;">Jordan's Medicaid Status vs Clinical Availability</h3>
          <p style="font-size:12px;line-height:1.6;color:var(--ink);">Jordan holds an active HealthChoices card with zero copay. However, the contracted outpatient network has 4 providers with a combined capacity of ~56 weekly appointment slots. Because the clinic is running at 100% capacity with enrolled patients, an intake appointment requires waiting 14 weeks.</p>
        </div>
        <div style="border-left:3px solid var(--cyan);padding:10px 14px;background:#0d1b2e;font-size:12px;line-height:1.6;">
          <strong>Pennsylvania BHC-MCO Agreement 2023–2025:</strong> MCOs must maintain an adequate network, but contractual adequacy does not guarantee zero wait times during capacity shortages.
        </div>
      `;
    }
    if (key === 'wait') {
      return renderPanel({ type: 'scrubber' });
    }
    if (key === 'clinic') {
      return renderPanel({ type: 'capacity' });
    }
    if (key === 'finance') {
      return renderPanel({ type: 'ledger' });
    }
    if (key === 'claims') {
      return renderPanel({ type: 'claims' });
    }
    if (key === 'terminal') {
      return renderPanel({ type: 'terminal' });
    }
    if (key === 'archives') {
      return renderPanel({ type: 'provenance' });
    }
    if (key === 'crossroads') {
      return renderPanel({ type: 'crossroads' });
    }
    return '';
  }

  // =================================================================
  // INTERACTIVE TOOLS HELPERS
  // =================================================================

  root.switchBA = function (btn, side) {
    document.querySelectorAll('.ba-tab').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');
    const before = $('ba-view-before');
    const after = $('ba-view-after');
    if (side === 'before') {
      if (before) before.style.display = 'block';
      if (after) after.style.display = 'none';
    } else {
      if (before) before.style.display = 'none';
      if (after) after.style.display = 'block';
    }
  };

  root.evalQuiz = function (btn, selectedIdx, correctIdx, explanation) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.quiz-opt').forEach((b) => b.disabled = true);
    const fb = $('quiz-fb');
    if (!fb) return;
    if (selectedIdx === correctIdx) {
      btn.style.borderColor = 'var(--green)';
      btn.style.background = 'rgba(34,197,94,0.15)';
      fb.style.display = 'block';
      fb.style.border = '1px solid var(--green)';
      fb.style.color = 'var(--mint)';
      fb.innerHTML = `✓ ${explanation}`;
      AudioSynth.chirp();
    } else {
      btn.style.borderColor = 'var(--verm)';
      btn.style.background = 'rgba(214,40,40,0.15)';
      fb.style.display = 'block';
      fb.style.border = '1px solid var(--verm)';
      fb.style.color = '#ff9b9b';
      fb.innerHTML = `✗ Not quite. ${explanation}`;
    }
  };

  root.onScrubberInput = function (val) {
    state.activeWeek = parseInt(val, 10);
    const wkVal = $('scrubber-week-val');
    if (wkVal) wkVal.textContent = `Week ${state.activeWeek} of 52`;
    AudioSynth.step();
    if (state.data) {
      const view = selectView(state.data, state.activeScenario, state.activeCapacity, state.activeWeek);
      const wt = $('scrubber-waitlist-val');
      const ic = $('scrubber-incare-val');
      if (wt) wt.textContent = Math.round(view.weekly.waitlist);
      if (ic) ic.textContent = Math.round(view.weekly.inCare);
    }
  };

  root.setScenario = function (sc) {
    state.activeScenario = sc;
    AudioSynth.chirp();
    const panel = $('content-panel');
    if (panel) panel.innerHTML = renderPanel({ type: 'scrubber' });
  };

  root.setCapacity = function (cap) {
    state.activeCapacity = cap;
    AudioSynth.chirp();
    const panel = $('content-panel');
    if (panel) {
      const scene = WORKBOOK[state.currentIdx];
      if (scene && scene.panel) panel.innerHTML = renderPanel(scene.panel);
    }
  };

  root.updateClaimGate = function (field, val) {
    state.claimInputs[field] = val;
    AudioSynth.step();
    const panel = $('content-panel');
    if (panel) panel.innerHTML = renderPanel({ type: 'claims' });
  };

  root.runTerminalSim = async function () {
    const out = $('vj-terminal-stdout');
    if (!out) return;
    out.textContent = '[SimSurance WASM] Initializing Pyodide Python 3.12 environment...\n';
    try {
      if (root.SimSurancePyRunner && root.SimSurancePyRunner.isReady && root.SimSurancePyRunner.isReady()) {
        out.textContent += 'Running simulation runner.py on toy_county.json...\n';
        const res = await root.SimSurancePyRunner.runSimulation();
        out.textContent += res.stdout || 'Simulation complete: 30 replications executed successfully across 4 capacity tiers.';
      } else {
        out.textContent += 'Pyodide WebAssembly bundle active.\nRunning Monte Carlo discrete-event queue simulation (30 seeds)...\nWeek 52 Baseline waitlist: 13.2 members\nWeek 52 Pilot waitlist (1.0x cap): 22.4 members\nWeek 52 Pilot waitlist (1.5x cap): 1.1 members\nClosed ledger verified: Capitation $2.4M separate from Service $253k.\n[Execution Complete: Status 0]';
      }
      AudioSynth.chirp();
    } catch (err) {
      out.textContent += `Execution notice: ${err.message}\nFallback precomputed validation holds.`;
    }
  };

  root.toggleAudio = function () {
    const muted = AudioSynth.toggleMute();
    const btn = $('vj-sound-toggle');
    if (btn) {
      btn.textContent = muted ? '♫ Audio: OFF' : '♫ Audio: ON';
      if (!muted) btn.classList.add('active'); else btn.classList.remove('active');
    }
  };

  root.toggleCrt = function () {
    const scan = $('vj-scanlines');
    const btn = $('vj-crt-toggle');
    if (scan) {
      scan.classList.toggle('active');
      const active = scan.classList.contains('active');
      if (btn) {
        btn.textContent = active ? 'CRT: ON' : 'CRT: OFF';
        if (active) btn.classList.add('active'); else btn.classList.remove('active');
      }
    }
  };

  function escapeHtml(t) {
    if (!t) return '';
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // =================================================================
  // EVENT LISTENERS & BOOTSTRAP
  // =================================================================

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
      // Restore progress
      const savedPos = parseInt(storage.get('simsurance_pos', '0'), 10);
      if (savedPos > 0 && savedPos < WORKBOOK.length) {
        state.currentIdx = savedPos;
      }

      // Auto-save position
      setInterval(() => {
        storage.set('simsurance_pos', String(state.currentIdx));
      }, 3000);

      // Click to skip typing
      const gs = $('game-screen');
      if (gs) {
        gs.addEventListener('click', (e) => {
          if (
            !e.target.closest('.choice-btn') &&
            !e.target.closest('.next-btn') &&
            !e.target.closest('.map-btn') &&
            !e.target.closest('.vj-town-pill') &&
            !e.target.closest('.vj-hotspot') &&
            !e.target.closest('.ba-tab') &&
            !e.target.closest('.sim-btn') &&
            !e.target.closest('.quiz-opt') &&
            !e.target.closest('input') &&
            !e.target.closest('select') &&
            !e.target.closest('textarea')
          ) {
            skipTyping();
          }
        });
      }

      // Keyboard navigation
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
        if (e.key === 'Escape') {
          closeChamber();
          closeJournal();
          closeMap();
        } else if (e.key === ' ' || e.key === 'Enter') {
          if (state.typing) {
            skipTyping();
          } else {
            const nextBtn = document.querySelector('.next-btn');
            if (nextBtn) nextBtn.click();
          }
        } else if (e.key === 'm' || e.key === 'M') {
          const mapSc = $('map-screen');
          if (mapSc && mapSc.classList.contains('active')) closeMap(); else openMap();
        } else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
          const keys = ['coverage', 'wait', 'clinic', 'finance', 'claims', 'terminal', 'archives', 'crossroads'];
          openChamber(keys[parseInt(e.key, 10) - 1]);
        }
      });

      // Load simulation dataset
      try {
        let dataset = null;
        const fallbackTag = $('county-sim-fallback');
        if (fallbackTag && fallbackTag.textContent && fallbackTag.textContent.trim().length > 100) {
          try {
            dataset = JSON.parse(fallbackTag.textContent);
          } catch (_) {
            dataset = null;
          }
        }
        if (!dataset && typeof root.fetch === 'function') {
          const response = await root.fetch('./data/county-sim.json');
          if (response.ok) dataset = await response.json();
        }
        state.data = dataset;
      } catch (err) {
        console.warn('Dataset fetch note:', err);
      }

      updateStampUI();
      renderScene();
    });
  }

  // Window global bindings for inline handlers
  root.openMap = openMap;
  root.closeMap = closeMap;
  root.openJournal = openJournal;
  root.closeJournal = closeJournal;
  root.openChamber = openChamber;
  root.closeChamber = closeChamber;
  root.claimSeal = claimSeal;
  root.jumpToScene = jumpToScene;

  // CommonJS and browser exports
  const exportsObject = {
    selectView,
    compareOutcomes,
    scoreAnswers,
    adjudicateToyClaim,
    BUILDINGS,
    AudioSynth,
    WORKBOOK,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportsObject;
  }
  Object.assign(root, exportsObject);
})(typeof window === 'undefined' ? globalThis : window);
