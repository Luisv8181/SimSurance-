# Design Research: Simsurance Learning Lab & Riverbend County

> **Product**: Simsurance Learning Lab & Riverbend County Interactive Simulation  
> **Audience**: Healthcare analysts, policy students, clinicians, payers, and curious learners exploring Medicaid, Medicare, and commercial insurance mechanics  
> **Use Case**: Deep educational exploration of healthcare policy, actuarial risk, prior authorizations, capitation vs. fee-for-service, and systemic supply-demand queues  
> **Emotional Tone**: Authoritative, intellectually rigorous, tactile, curious, and humanely grounding (bridging statutory legal reality with patient impact)

---

## 1. Executive Summary & Anti-Pattern Audit

Before researching references, we audited the existing interface to identify visual tropes and generic patterns that needed elimination:

| Existing Anti-Pattern | Why It Fails | Replacement Principle |
|---|---|---|
| **Card Soup Layout** | Repetitive rounded dark/gray cards (`border: 1px solid var(--border); border-radius: 16px; background: var(--panel)`) create visual fatigue and homogenize distinct content types. | **Architectural Hairline Grid & Margin Gutters**: Clear typographic hierarchy, publication-grade columns, and asymmetric margin notes (Distill-style). |
| **Generic AI Glowing Gradients** | Purple-to-blue neon glowing drop shadows feel like a SaaS marketing template or AI demo rather than an authoritative policy lab. | **Tactile Physical Palette**: Deep archival ink (`#0e1726`), warm linen paper tones (`#f8f9fa` / dark `#0c1017`), scientific brass/amber (`#d97706`), forest reserve (`#059669`), and riverbend cobalt (`#2563eb`). |
| **Floating Isolated Widgets** | Interactive controls (sliders, scenario buttons) trapped in isolated boxes disconnected from the prose. | **Color-Linked Text & Instrument Controls**: Inline keywords that visually tether directly to simulation dials and canvas states (Ciechanowski-style). |
| **Disembodied Character Badges** | Glim presented as a small static SVG icon inside a generic chat bubble. | **Curriculum Field Companion & Archival Guide**: Glim anchored at the primary point of entry with pedagogical state changes (guiding, analyzing, celebrating) and direct statutory cross-references. |

---

## 2. Live Reference Inspections & Analytical Principles

We inspected five distinct, live visual references (four outside healthcare/insurance) to extract structural, typographic, and interactive design principles.

### Reference 1: The Pudding (`https://pudding.cool/`)
- **Domain**: Visual Journalism / Cultural Data Essays
- **Inspected URL**: `https://pudding.cool/`
- **Composition**: Asymmetric narrative flow; issue-sequencing markers (`#225`, `#224`); content organized by chronological dispatches rather than generic card grids; scrollytelling pacing.
- **Typography**: Editorial serif headlines (Tiempos Text) paired with precise geometric sans-serif (Atlas Grotesk) and monospaced technical metadata (Atlas Typewriter). High contrast scale between essay title and data tags.
- **Color**: Muted archival ground, dense high-contrast typography, and purposeful spot colors reserved solely for data categories and trend lines.
- **Visual Language**: Custom investigative graphics embedded directly into reading flow; absence of generic container boxes; story-driven scrollytelling.
- **Interaction**: Micro-interactions triggered by narrative progression; scrubbing mechanisms that reward exploration; persistent chapter indicators.
- **Information Architecture**: Hook -> Investigation -> Interactive Checkpoint -> Authoritative Source Byline.
- **Transferable Principles**:
  - Treat Simsurance lessons as numbered, authored investigative dispatches (e.g. `DISPATCH #01: The Capitation Horizon`, `DISPATCH #02: The Prior Authorization Gate`).
  - Use monospaced data tags for statutory codes (e.g. `[PA-DHS-BHC-MCOS]`, `[42-CFR-438.68]`).

### Reference 2: Stripe Press (`https://press.stripe.com/`)
- **Domain**: Print & Digital Publishing / Economic History
- **Inspected URL**: `https://press.stripe.com/`
- **Composition**: Extreme macro/micro scale contrast; generous whitespace; architectural hairline rules (`1px solid var(--rule)`) creating structure without visual bulk.
- **Typography**: Authoritative grotesque typography (Söhne); heavy section headers with refined, tightly-spaced tracking; crisp caption labels; strict vertical baseline rhythm.
- **Color**: Clean archival ground, deep obsidian ink, warm paper highlights, and luminous architectural accents. Zero muddy box shadows or neon blurs.
- **Visual Language**: Tactile physical monograph covers; three-dimensional weight and tactile feel; archival permanence.
- **Interaction**: Physics-informed subtle hover states; tactile, crisp buttons with distinct active states; razor-sharp focus rings.
- **Information Architecture**: Core Thesis Statement -> Physical Artifact Showcase -> Metadata Ledger & Chapter Index.
- **Transferable Principles**:
  - Provide a tactile, book-publishing weight to policy documents and statutory sources.
  - Replace heavy card borders with 1px architectural hairline dividers.
  - Implement extreme typographic hierarchy between section crowns and analytical data tables.

### Reference 3: Distill.pub (`https://distill.pub/`)
- **Domain**: Machine Learning Research & Explorable Explanations
- **Inspected URL**: `https://distill.pub/`
- **Composition**: Asymmetric grid with a dedicated wide central column for longform exposition and an active margin column for side notes, citations (`<d-cite>`), and parameter annotations. Outset and full-bleed figures that break out of the column boundaries for complex systems.
- **Typography**: Academic serif body for rigorous narrative prose, monospaced fonts for mathematical formulas and code parameters, clean sans-serif for UI labels and interactive legends.
- **Color**: Academic off-white ground, high-contrast charcoal text, subtle hairline rules (`rgba(0,0,0,0.1)`), semantic blue/amber highlights for model parameters.
- **Visual Language**: Seamlessly embedded interactive models where changing a variable recalculates the system in real time without reloading or popping modals.
- **Interaction**: Direct parameter scrubbing; synchronized reactive visualizations; clickable margin citations linking to bibliography.
- **Information Architecture**: Abstract / Hook -> Interactive Simulation Model -> Asymmetric Margin Explanations -> Verifiable Proof & Citations.
- **Transferable Principles**:
  - Move Glim's guide notes, statutory citations, and policy parameters into an asymmetric margin gutter (or collapsible side-drawer on mobile).
  - Outset figures for the Riverbend Pixel World town map and the County Simulation queue graphs.
  - Embed citations as clickable interactive badges linked to the official source registry.

### Reference 4: Our World in Data (`https://ourworldindata.org/`)
- **Domain**: Global Public Policy & Statistical Research
- **Inspected URL**: `https://ourworldindata.org/`
- **Composition**: Dense, highly scannable public research format; topic taxonomy pills; split headers with prominent metric definitions; transparent source attribution footnotes beneath every chart.
- **Typography**: Clear sans-serif with tabular figures (`font-variant-numeric: tabular-nums`) for financial ledgers; explicit distinction between measurement units and quantitative values.
- **Color**: High-contrast accessible data series (cobalt blue, forest green, warm amber); neutral parchment ground; strict adherence to WCAG AAA contrast ratios.
- **Visual Language**: Provenance tags (`"Data source: CMS / PA DHS / Pennsylvania Bulletin"`); clear badge indicators for verified rules vs. illustrative toy models.
- **Interaction**: Metric dimension toggles (e.g. baseline vs. expanded capacity); timeline scrubbers; tabbed views between visual diagram, numerical ledger, and policy text.
- **Information Architecture**: Research Question -> Key Finding -> Interactive Explorer -> Methodological Caveats & Data Sources.
- **Transferable Principles**:
  - Add explicit "Methodology & Statutory Provenance" footnotes to every interactive widget.
  - Use tabular numbers for all dollar amounts, member counts, and wait-week metrics.
  - Display the "ILLUSTRATIVE CALCULATION" and "fictional plan rule" disclaimers as authoritative scientific caveats rather than generic warning banners.

### Reference 5: Bartosz Ciechanowski (`https://ciechanow.ski/`)
- **Domain**: Mechanical Engineering & Physics Explorable Essays
- **Inspected URL**: `https://ciechanow.ski/`
- **Composition**: Flawless integration between explanatory prose and interactive physical simulation; split-canvas containers (`split_container big_small`) showing simultaneous macro and micro views.
- **Typography**: IBM Plex Sans / Inter with exact tracking; inline colored keywords (e.g. `<span class="color_date">`, `<span class="color_time">`) that share exact color tokens with the physical controls and canvas elements.
- **Color**: Semantic variable coloring: each physical or actuarial parameter has a distinct color identifier carried through text, sliders, and canvas indicators.
- **Visual Language**: Tactile physical sliders (`long_slider`), custom dial controls, physical instrument aesthetics without decorative skeuomorphism.
- **Interaction**: Direct tactile scrubbing; synchronized canvas updates across multiple coordinated views; zero latency.
- **Information Architecture**: Phenomenon Observation -> Direct Variable Manipulation -> Intuitive Mechanical Discovery -> Formal Rule Derivation.
- **Transferable Principles**:
  - Connect text prose keywords to interactive controls using shared semantic color tokens (e.g. amber for `Waiting Queue`, cobalt for `Claim Adjudication`, emerald for `Primary Care Capacity`).
  - Design tactile instrument sliders and toggles with crisp physical detents and keyboard accessibility.
  - Coordinate the Riverbend Town Pixel World with the County Simulation charts so moving the week scrubber highlights the corresponding county district.

---

## 3. Transferable Design Synthesis

Combining these five references yields our foundational design rules for Simsurance:

1. **Typographic Pairings**:
   - *Headings & Titles*: High-character editorial serif (`Fraunces` / `Newsreader` / serif fallback) for human, authoritative weight.
   - *Body Prose*: Clean, highly legible neutral grotesque (`Inter` / system-ui) with optimal line-length (65-75ch) and vertical rhythm.
   - *Metadata & Code*: Crisp monospaced (`JetBrains Mono` / monospace) with tabular figures for statutory citations, financial ledger cents, and simulation ticks.

2. **Structural Composition**:
   - Replace disconnected floating cards with an **editorial publication grid** bounded by **1px architectural hairline rules**.
   - Use **asymmetric margin gutters** for Glim's field commentary, statutory citations, and quick parameter glosses.
   - Give the **Riverbend Pixel World** an outset architectural frame with tactile instrument controls (sound synthesizers, CRT scanline toggle, week scrubbers).

3. **Color Tokens & Roles**:
   - *Paper Ground*: Crisp warm canvas in light mode (`#fbfbfa`), deep archival ink in dark mode (`#0b0f17`).
   - *Ink*: Obsidian black (`#0f172a`) in light mode; soft luminescent parchment (`#e2e8f0`) in dark mode.
   - *Semantic Accents*:
     - **Riverbend Cobalt** (`#1d4ed8` / `#3b82f6`): Claims, adjudication, payment pathways.
     - **Archival Amber** (`#b45309` / `#f59e0b`): Wait times, bottlenecks, review-required alerts.
     - **Forest Reserve** (`#047857` / `#10b981`): Approved claims, capitation pools, preventive care.
     - **Slate Rule** (`#e2e8f0` / `#1e293b`): 1px hairline dividers.
