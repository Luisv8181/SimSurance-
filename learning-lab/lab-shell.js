/* SimSurance Learning Lab shared shell:
   - Persistent mastery tracker across lessons
   - Light / Dark / High-Contrast theme switcher
   - Slide-out Source Evidence Drawer with search & filter (Issue #5)
*/
(function () {
  const SOURCES = [
    {
      id: "pa-dhs-bhc-overview",
      title: "Behavioral HealthChoices",
      issuer: "Pennsylvania Department of Human Services",
      url: "https://www.pa.gov/agencies/dhs/resources/medicaid/bhc",
      jurisdiction: "Pennsylvania",
      program: "Medicaid Behavioral HealthChoices",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "High-level program description and county-assigned BH-MCO context; not a complete rule or rate source.",
      does_not_establish: "Does not establish individual eligibility, provider network status, service authorization rules, or payment rates."
    },
    {
      id: "pa-dhs-bhc-providers",
      title: "Behavioral HealthChoices: Information for Providers",
      issuer: "Pennsylvania Department of Human Services",
      url: "https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers",
      jurisdiction: "Pennsylvania",
      program: "Medicaid Behavioral HealthChoices",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Provider-facing overview; verify exact product, provider type, county, service, and current contract before applying a statement to a case.",
      does_not_establish: "Does not prove that a specific clinician is enrolled, credentialed, or in network with a county's BH-MCO."
    },
    {
      id: "pa-dhs-bhc-mcos",
      title: "Behavioral HealthChoices: Managed Care Organizations",
      issuer: "Pennsylvania Department of Human Services",
      url: "https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-mcos",
      jurisdiction: "Pennsylvania",
      program: "Medicaid Behavioral HealthChoices",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: "Each HealthChoices consumer is assigned a Behavioral Health Managed Care Organization (BH-MCO) based on his or her county of residence.",
      scope_note: "Use as a dated county-to-BH-MCO lookup (67 PA counties verified 2026-10-10). A county mapping alone does not establish provider credentialing, open network status, benefits, or reimbursement.",
      does_not_establish: "Does not establish a specific person's active enrollment, a clinician's network contract, or appointment availability."
    },
    {
      id: "pa-dhs-bhc-publications",
      title: "Behavioral HealthChoices Publications",
      issuer: "Pennsylvania Department of Human Services",
      url: "https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-publications",
      jurisdiction: "Pennsylvania",
      program: "Medicaid Behavioral HealthChoices",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Index for Program Standards & Requirements (PS&R), appendices, financial reporting requirements, ASAM rates, and member handbook. Review the linked item and its effective date before encoding anything.",
      does_not_establish: "An index listing does not encode the underlying contract text; the specific document version and effective date must be inspected."
    },
    {
      id: "pa-dhs-bhc-systems-management",
      title: "Behavioral HealthChoices Systems Management",
      issuer: "Pennsylvania Department of Human Services / OMHSAS",
      url: "https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-systems-management",
      jurisdiction: "Pennsylvania",
      program: "Medicaid Behavioral HealthChoices",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Resource discovery for encounter systems and operational materials; not evidence that nonpublic data are available to this project.",
      does_not_establish: "Does not grant access to nonpublic encounter files or establish claim adjudication outcomes."
    },
    {
      id: "pa-dhs-physical-hc-mco",
      title: "Physical HealthChoices Managed Care Organizations",
      issuer: "Pennsylvania Department of Human Services",
      url: "https://www.pa.gov/agencies/dhs/resources/medicaid/hc/hc-mco",
      jurisdiction: "Pennsylvania",
      program: "Medicaid physical HealthChoices",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Keep physical-health MCOs distinct from Behavioral HealthChoices BH-MCOs.",
      does_not_establish: "Participating in a physical-health MCO network does not automatically mean participating in the county's BH-MCO network."
    },
    {
      id: "pa-dhs-chip-companies",
      title: "CHIP Insurance Companies",
      issuer: "Pennsylvania Department of Human Services",
      url: "https://www.pa.gov/agencies/dhs/resources/chip/chip-insurance-companies",
      jurisdiction: "Pennsylvania",
      program: "Children's Health Insurance Program",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Check current county availability and exact plan/product.",
      does_not_establish: "Does not establish behavioral-health network participation or specific benefit rules."
    },
    {
      id: "pa-insurance-department-aca-filings",
      title: "ACA Health Rate Filings",
      issuer: "Pennsylvania Insurance Department",
      url: "https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings",
      jurisdiction: "Pennsylvania",
      program: "Individual and small-group commercial insurance markets",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Market coverage area and premium filings do not prove a provider's network participation or behavioral-health reimbursement.",
      does_not_establish: "Does not show clinician fee schedules, credentialing rules, or open network status."
    },
    {
      id: "pa-insurance-department-2026-individual-coverage-areas",
      title: "Coverage Areas for 2026 Individual Market Plans",
      issuer: "Pennsylvania Insurance Department",
      url: "https://www.pa.gov/agencies/insurance/posted-filings-reports-company-orders/posted-product-and-rate-filings/aca-health-rate-filings/archived-health-insurance-rate-filings/2026-health-rate-filings/2026-coverage-areas-individual-market",
      jurisdiction: "Pennsylvania",
      program: "2026 individual commercial insurance market",
      status: "historical_snapshot",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Historical plan-availability snapshot for 2026, not the current or future plan year and not a provider network directory.",
      does_not_establish: "Historical market presence does not establish current-year plan offerings or provider networks."
    },
    {
      id: "pennie",
      title: "Pennie: Pennsylvania's Official Health Insurance Marketplace",
      issuer: "Pennie",
      url: "https://pennie.com/",
      jurisdiction: "Pennsylvania",
      program: "Individual and family health insurance marketplace",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Homepage verified live 2026-10-10: official state marketplace for health/dental coverage and certified-assister help channels.",
      does_not_establish: "Does not establish specific plan networks, clinician reimbursement, or Medicaid BH-MCO rules."
    },
    {
      id: "cms-managed-care-rate-guidance",
      title: "Medicaid Managed Care Rate Review and Rate Guides",
      issuer: "Centers for Medicare & Medicaid Services",
      url: "https://www.medicaid.gov/medicaid/managed-care/guidance/rate-review-and-rate-guides",
      jurisdiction: "United States",
      program: "Medicaid managed care",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: null,
      scope_note: "Federal guidance; confirm which rating period and authority apply to the modeled analysis.",
      does_not_establish: "Federal rate-setting guidance is not a state fee schedule or a clinic-level claim payment rule."
    },
    {
      id: "pa-dhs-bhc-service-access",
      title: "Request Behavioral HealthChoices Program Services",
      issuer: "Pennsylvania Department of Human Services",
      url: "https://www.pa.gov/services/dhs/request-behavioral-healthchoices-program-services",
      jurisdiction: "Pennsylvania",
      program: "Medicaid Behavioral HealthChoices",
      status: "official_page_reviewed",
      last_checked: "2026-10-10",
      quote: "If you’re having trouble finding a provider, contact your BH-MCO.",
      scope_note: "Member-facing explanation of access routes, county mental-health offices, BH-MCOs, provider directories and help when access is difficult.",
      does_not_establish: "Describes a member navigation step; does not guarantee that a specific clinician has an immediate opening."
    }
  ];

  const TOTAL_CHECKPOINTS = 8;
  const STORAGE_KEY = "simsurance-lab-mastery-v1";
  const THEME_KEY = "simsurance-lab-theme";

  function loadMastery() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? new Set(parsed) : new Set();
    } catch (_) {
      return new Set();
    }
  }

  function saveMastery(set) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    } catch (_) {}
  }

  const mastered = loadMastery();

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
    const btn = document.getElementById("ll-theme-btn");
    if (btn) {
      btn.textContent = theme === "light" ? "🌙 Dark mode" : theme === "contrast" ? "☀️ Light mode" : "☀️ Light mode";
    }
    const cBtn = document.getElementById("ll-contrast-btn");
    if (cBtn) {
      cBtn.setAttribute("aria-pressed", String(theme === "contrast"));
    }
  }

  let currentTheme = "dark";
  try {
    currentTheme = localStorage.getItem(THEME_KEY) || "dark";
  } catch (_) {}
  applyTheme(currentTheme);

  function updateMasteryUI() {
    const count = mastered.size;
    const pct = Math.min(100, Math.round((count / TOTAL_CHECKPOINTS) * 100));
    const label = document.getElementById("ll-mastery-label");
    const fill = document.getElementById("ll-mastery-fill");
    if (label) {
      label.textContent = count + " / " + TOTAL_CHECKPOINTS + " concept checks mastered";
    }
    if (fill) {
      fill.style.width = pct + "%";
    }
  }

  window.SimSuranceLab = {
    sources: SOURCES,
    recordCheckpoint: function (id) {
      if (!id) return;
      mastered.add(id);
      saveMastery(mastered);
      updateMasteryUI();
    },
    openSourceDrawer: function (sourceId) {
      openDrawer(sourceId);
    }
  };

  // Inject utility bar & slide-out source drawer when DOM is ready
  function initShell() {
    const header = document.querySelector("header.top, header.head");
    if (header && !document.getElementById("ll-utility-bar")) {
      const bar = document.createElement("div");
      bar.id = "ll-utility-bar";
      bar.className = "ll-utility-bar";
      bar.setAttribute("role", "region");
      bar.setAttribute("aria-label", "Learning progress and display tools");
      bar.innerHTML =
        '<div class="ll-utility-inner">' +
        '  <div class="ll-progress-group">' +
        '    <strong style="color:var(--mint);font-size:.78rem;letter-spacing:.08em;text-transform:uppercase">Mastery</strong>' +
        '    <div class="ll-progress-track" aria-hidden="true"><div class="ll-progress-fill" id="ll-mastery-fill"></div></div>' +
        '    <span id="ll-mastery-label" class="muted">0 / ' + TOTAL_CHECKPOINTS + ' concept checks mastered</span>' +
        '  </div>' +
        '  <div class="ll-utility-actions">' +
        '    <button type="button" class="ll-chip-btn" id="ll-open-drawer-btn" aria-haspopup="dialog">📚 Evidence shelf (' + SOURCES.length + ' sources)</button>' +
        '    <button type="button" class="ll-chip-btn" id="ll-theme-btn">☀️ Light mode</button>' +
        '    <button type="button" class="ll-chip-btn" id="ll-contrast-btn" aria-pressed="false">⚡ High contrast</button>' +
        '    <button type="button" class="ll-chip-btn" id="ll-reset-mastery" title="Reset mastery progress">↺ Reset</button>' +
        '  </div>' +
        '</div>';
      header.parentNode.insertBefore(bar, header);
    }

    if (!document.getElementById("ll-source-drawer")) {
      const backdrop = document.createElement("div");
      backdrop.id = "ll-drawer-backdrop";
      backdrop.className = "source-drawer-backdrop";
      backdrop.addEventListener("click", closeDrawer);

      const drawer = document.createElement("aside");
      drawer.id = "ll-source-drawer";
      drawer.className = "source-drawer";
      drawer.setAttribute("role", "dialog");
      drawer.setAttribute("aria-modal", "true");
      drawer.setAttribute("aria-labelledby", "ll-drawer-title");
      drawer.innerHTML =
        '<div class="source-drawer-header">' +
        '  <div>' +
        '    <div class="eyebrow">Primary-Source Evidence Shelf</div>' +
        '    <h2 id="ll-drawer-title" style="margin:.2em 0;font-size:1.35rem">Inspect official sources</h2>' +
        '    <p class="small muted" style="margin:0">Every policy statement must link to an official source, effective date, and scope limit. Click any source without losing your place in the lesson.</p>' +
        '  </div>' +
        '  <button type="button" class="ll-chip-btn" id="ll-close-drawer-btn" aria-label="Close source drawer">✕ Close</button>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">' +
        '  <input type="search" id="ll-drawer-search" placeholder="Search title, issuer, BH-MCO..." aria-label="Search sources" style="padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--panel2);color:var(--ink)">' +
        '  <select id="ll-drawer-filter" aria-label="Filter by program" style="padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--panel2);color:var(--ink)">' +
        '    <option value="all">All programs (' + SOURCES.length + ')</option>' +
        '    <option value="Medicaid Behavioral HealthChoices">PA Behavioral HealthChoices</option>' +
        '    <option value="commercial">Commercial / Pennie / CHIP</option>' +
        '    <option value="United States">Federal (CMS)</option>' +
        '  </select>' +
        '</div>' +
        '<div id="ll-drawer-list" aria-live="polite"></div>';

      document.body.appendChild(backdrop);
      document.body.appendChild(drawer);

      document.getElementById("ll-close-drawer-btn").addEventListener("click", closeDrawer);
      document.getElementById("ll-drawer-search").addEventListener("input", renderDrawerList);
      document.getElementById("ll-drawer-filter").addEventListener("change", renderDrawerList);
    }

    const openBtn = document.getElementById("ll-open-drawer-btn");
    if (openBtn) openBtn.addEventListener("click", function () { openDrawer(null); });

    const themeBtn = document.getElementById("ll-theme-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        currentTheme = currentTheme === "light" ? "dark" : "light";
        applyTheme(currentTheme);
      });
    }

    const contrastBtn = document.getElementById("ll-contrast-btn");
    if (contrastBtn) {
      contrastBtn.addEventListener("click", function () {
        currentTheme = currentTheme === "contrast" ? "dark" : "contrast";
        applyTheme(currentTheme);
      });
    }

    const resetBtn = document.getElementById("ll-reset-mastery");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        mastered.clear();
        saveMastery(mastered);
        updateMasteryUI();
      });
    }

    // Bind any [data-source-id] triggers on the page
    document.querySelectorAll("[data-source-id]").forEach(function (el) {
      el.addEventListener("click", function (ev) {
        ev.preventDefault();
        openDrawer(el.getAttribute("data-source-id"));
      });
    });

    // Listen for correct quiz clicks on existing pages to credit mastery automatically
    document.addEventListener("click", function (ev) {
      const t = ev.target;
      if (!t || !t.matches) return;
      if (t.matches('button[data-correct="true"]')) window.SimSuranceLab.recordCheckpoint("quiz-allowed");
      if (t.matches('button[data-case="true"]')) window.SimSuranceLab.recordCheckpoint("quiz-case-access");
      if (t.matches('button[data-payer-answer="true"]')) window.SimSuranceLab.recordCheckpoint("quiz-payer-choice");
      if (t.matches('#pa-access-check')) {
        const sel = document.querySelector('input[name="pa-access-answer"]:checked');
        if (sel && sel.value === "b") window.SimSuranceLab.recordCheckpoint("quiz-pa-access");
      }
      if (t.matches('button[data-answer="right"]')) window.SimSuranceLab.recordCheckpoint("quiz-money-double");
      if (t.matches('button[data-answer="correct"]')) window.SimSuranceLab.recordCheckpoint("quiz-claim-review");
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") closeDrawer();
    });

    applyTheme(currentTheme);
    updateMasteryUI();
    renderDrawerList();
  }

  let lastTrigger = null;
  let activeHighlightId = null;

  function renderDrawerList() {
    const list = document.getElementById("ll-drawer-list");
    if (!list) return;
    const q = (document.getElementById("ll-drawer-search")?.value || "").toLowerCase().trim();
    const filter = document.getElementById("ll-drawer-filter")?.value || "all";

    const filtered = SOURCES.filter(function (s) {
      const matchesFilter =
        filter === "all" ||
        (filter === "Medicaid Behavioral HealthChoices" && s.program === "Medicaid Behavioral HealthChoices") ||
        (filter === "United States" && s.jurisdiction === "United States") ||
        (filter === "commercial" && s.program !== "Medicaid Behavioral HealthChoices" && s.jurisdiction !== "United States");
      const text = (s.id + " " + s.title + " " + s.issuer + " " + s.program + " " + s.scope_note).toLowerCase();
      return matchesFilter && (!q || text.includes(q));
    });

    list.innerHTML = filtered.map(function (s) {
      const isHi = s.id === activeHighlightId ? " highlight" : "";
      const quoteHtml = s.quote
        ? '<div class="source-quote">“' + s.quote + '”</div>'
        : '';
      return (
        '<article class="source-card-item' + isHi + '" id="drawer-source-' + s.id + '">' +
        '  <div class="source-meta-row">' +
        '    <span class="source-badge">' + s.id + '</span>' +
        '    <span class="source-badge">' + s.status.replace(/_/g, " ") + '</span>' +
        '    <span class="muted">Checked ' + s.last_checked + '</span>' +
        '  </div>' +
        '  <h3 style="margin:.25em 0;font-size:1.05rem">' + s.title + '</h3>' +
        '  <p class="small muted" style="margin:.2em 0"><strong>Issuer:</strong> ' + s.issuer + ' · <strong>Program:</strong> ' + s.program + '</p>' +
        quoteHtml +
        '  <p class="small" style="margin:.45em 0"><strong>What this source supports:</strong> ' + s.scope_note + '</p>' +
        '  <p class="small muted" style="margin:.45em 0"><strong>What this source does NOT establish:</strong> ' + s.does_not_establish + '</p>' +
        '  <p class="small" style="margin:.5em 0 0"><a href="' + s.url + '" target="_blank" rel="noreferrer">Open official source (' + s.issuer + ') ↗</a></p>' +
        '</article>'
      );
    }).join("");
  }

  function openDrawer(sourceId) {
    lastTrigger = document.activeElement;
    activeHighlightId = sourceId || null;
    const searchEl = document.getElementById("ll-drawer-search");
    const filterEl = document.getElementById("ll-drawer-filter");
    if (sourceId && searchEl && filterEl) {
      searchEl.value = "";
      filterEl.value = "all";
    }
    renderDrawerList();
    const drawer = document.getElementById("ll-source-drawer");
    const backdrop = document.getElementById("ll-drawer-backdrop");
    if (drawer && backdrop) {
      backdrop.classList.add("open");
      drawer.classList.add("open");
      if (sourceId) {
        const card = document.getElementById("drawer-source-" + sourceId);
        if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      document.getElementById("ll-close-drawer-btn")?.focus();
    }
  }

  function closeDrawer() {
    const drawer = document.getElementById("ll-source-drawer");
    const backdrop = document.getElementById("ll-drawer-backdrop");
    if (drawer && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShell);
  } else {
    initShell();
  }
})();
