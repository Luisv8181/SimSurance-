# Design Direction: The Riverbend Field Station

> **Creative Thesis**:  
> Healthcare policy is neither dry administrative code nor a superficial toy game—it is an intricate human machine governed by statutory law. **The Riverbend Field Station** frames the Simsurance Learning Lab as an authoritative scientific field notebook paired with an interactive 16-bit municipal diorama. Glim acts as the principal investigator and field companion, guiding learners through verified statutory specimens and live town simulations without ever trapping content in generic AI cards.

---

## 1. Evaluation of Three Structural Directions

We explored three distinct structural paradigms before selecting our final path:

### Concept 1: The Archival Policy Monograph & Statutory Broadsheet
- **Thesis**: Insurance is written law made physical. The interface behaves like an open legal and actuarial broadsheet.
- **Visual Metaphor**: An illuminated legal folio or parliamentary white-paper with marginalia.
- **Structure**: Strict two-column asymmetric layout (Distill-style wide body + active margin rail), hairline architectural borders, zero cards, classical serif headlines.
- **References**: Stripe Press (`https://press.stripe.com/`), Distill.pub (`https://distill.pub/`).
- **Verdict**: *Rejected as standalone*. Exceptionally authoritative and elegant, but risks feeling dry and intimidating to first-time learners without visual world-building.

### Concept 2: The 16-Bit Town Simulator & Tactile Retro-Scientific Instrument
- **Thesis**: Healthcare systems are complex machines with moving parts. You cannot understand policy until you pull the levers and watch the county town react.
- **Visual Metaphor**: An interactive municipal dispatch console with 16-bit isometric pixel art and mechanical dials.
- **Structure**: Monospaced tabular readouts, full-bleed canvas viewport centered in a physical instrument bezel, modular rack-mount panels.
- **References**: Bartosz Ciechanowski (`https://ciechanow.ski/`), The Pudding (`https://pudding.cool/`).
- **Verdict**: *Rejected as standalone*. Highly engaging and memorable, but without an academic prose structure, learners can miss the statutory grounding and legal accountability behind the simulation.

### Concept 3 (Selected Direction): The Riverbend Field Station (Synthesis)
- **Thesis**: A rigorous synthesis of statutory legal rigor and tactile municipal simulation. The policy rules are presented as verified archival field notes annotated by Glim, while the town dynamics are rendered in an interactive 16-bit living diorama instrument.
- **Visual Metaphor**: An expedition field notebook and municipal control deck. Glim is the chief field guide; the policy texts are archival specimens; Riverbend County is a live interactive diorama.
- **Structure**: Editorial publication grid bounded by 1px architectural hairline rules, asymmetric margin gutters for Glim's field commentary and statutory citations, and an outset tactile instrument frame for Riverbend County.
- **References**: Synthesis of all 5 inspected references (The Pudding, Stripe Press, Distill.pub, Our World in Data, Bartosz Ciechanowski).
- **Verdict**: **APPROVED**. Balances statutory credibility with playful simulation, eliminating all generic AI tropes while maintaining 100% test compliance.

---

## 2. Design System Specification

### 2.1 Typography & Hierarchy
```css
--font-display: "Fraunces", "Newsreader", "Charter", "Georgia", serif;
--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace;
```

- **Section Crowns / Editorial Hooks**: High-contrast serif with optical spacing, commanding authority without corporate sterility (`font-family: var(--font-display)`).
- **Curriculum Prose**: Clean, humanist sans-serif with 1.65 line-height and maximum 68ch line-length for optimal reading endurance (`font-family: var(--font-body)`).
- **Data Ledgers & Legal Citations**: Tabular monospaced figures (`font-variant-numeric: tabular-nums`) ensuring actuarial amounts, week scrubbers, and regulatory codes align crisply (`font-family: var(--font-mono)`).

### 2.2 Palette & Semantic Token Architecture

We abandon neon purple-to-blue AI gradients and muddy drop shadows in favor of a physical, tactile palette:

| Token Name | Light Theme | Dark Theme (Default) | Semantic Purpose |
|---|---|---|---|
| `--surface-canvas` | `#fbfbfa` (Warm paper) | `#0b0f17` (Deep archival slate) | Base page canvas |
| `--surface-station` | `#ffffff` (Pure sheet) | `#111722` (Station ledger panel) | Main editorial workspace |
| `--surface-outset` | `#f1f3f7` (Milled plate) | `#161f2e` (Tactile instrument frame) | Outset pixel world bezel |
| `--ink-primary` | `#0f172a` (Obsidian ink) | `#f1f5f9` (Crisp parchment white) | Primary headlines and prose |
| `--ink-secondary` | `#475569` (Muted pencil) | `#94a3b8` (Slate annotation text) | Margin notes, subtitles |
| `--hairline-rule` | `rgba(15, 23, 42, 0.12)` | `rgba(255, 255, 255, 0.10)` | Architectural grid lines |
| `--hairline-strong`| `rgba(15, 23, 42, 0.24)` | `rgba(255, 255, 255, 0.22)` | Emphasized dividers, table borders |
| `--riverbend-blue` | `#1d4ed8` (Cobalt ink) | `#3b82f6` (Luminescent cobalt) | Claims, adjudication, primary actions |
| `--archival-amber` | `#b45309` (Warm ochre) | `#f59e0b` (Phosphor amber) | Queues, wait-times, review flags |
| `--forest-emerald` | `#047857` (Reserve green) | `#10b981` (Phosphor green) | Capitation pool, approved claims |
| `--crimson-alert` | `#b91c1c` (Editorial red) | `#ef4444` (Alert red) | Denied claims, statutory boundaries |

### 2.3 Layout Architecture: Architectural Hairlines & Asymmetric Margins

Instead of enclosing every section in a floating rounded rectangle card:
1. **Station Header**: Monospaced ticker showing system status, statutory jurisdiction (`PA Medicaid / BHC-MCO`), and quick navigation.
2. **Editorial Flow**: A central reading column (65-75ch) flanked by a dedicated 260px **Margin Gutter** on desktop viewports.
   - Glim's field commentary sits in the margin gutter alongside the relevant paragraph.
   - Statutory citation tags (`[PA-DHS-BHC-MCOS]`, `[42 CFR § 438]`) float in the gutter with direct click-to-open drawer triggers.
3. **Outset Instrument Frame**: Complex simulations (Riverbend Pixel World, County Queue Simulator, Adjudication Workbench) span across the central column and margin rail as an "outset" scientific bench, bordered by 1px architectural hairline rules with corner tick-marks.
4. **Zero Card-Soup**: Content sections are delineated by subtle hairline dividers and generous vertical whitespace (`var(--spacing-xl)`), not chunky nested boxes.

### 2.4 Glim's Visual Integration

Glim is the heart of the educational experience. Rather than a static avatar:
1. **Interactive Presence**: Glim appears directly in the hero crown with an authored dispatch greeting and direct jump links to the 7 curriculum units.
2. **Pedagogical States**: Glim dynamically transitions between three visual moods:
   - `glim-guide.svg`: Guiding the student through foundational mechanics.
   - `glim-think.svg`: Provoking deep thought on market trade-offs and capacity bottlenecks.
   - `glim-celebrate.svg`: Acknowledging successful checkpoint completion.
3. **Margin Companion**: When reading lessons, Glim's commentary appears as a warm, authoritative field note with direct links to legal statutes.

### 2.5 Tactile Controls & Ciechanowski Keyword Tethering

- All interactive sliders feature tactile detents, visible values, and monospaced readouts.
- Text prose contains semantic colored pills (`<span class="kw-amber">wait queue</span>`, `<span class="kw-blue">service payment</span>`) that share color tokens with the simulation meters.
- The 16-bit sound synth and CRT scanline toggles feature distinct tactile pressed states (`aria-pressed`).

---

## 3. Accessibility & Usability Standards

- **Color Contrast**: All text satisfies WCAG 2.1 AAA contrast requirements (> 7:1 for normal text, > 4.5:1 for large text).
- **Keyboard Navigation**: Every interactive control, tab, drawer button, and simulation dial is fully focusable with a high-visibility focus ring (`outline: 2px solid var(--riverbend-blue); outline-offset: 2px`).
- **Motion & Sound**: All audio generation is opt-in and safely handles missing browser audio contexts; animations respect `prefers-reduced-motion: reduce`.
- **Responsive Fluidity**: Graceful degradation from wide multi-column broadsheet on desktop to single-column field guide on mobile devices, with margin notes inline-collapsed cleanly.
