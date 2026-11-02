# Source snapshot — Behavioral HealthChoices for Providers (2026-11-02)

- **Source ID:** pa-dhs-bhc-providers
- **Title:** Behavioral HealthChoices: Information for Providers
- **Issuer:** Pennsylvania Department of Human Services
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers
- **Retrieved:** 2026-11-02 (live fetch this run; 1,175 text lines, same count as 2026-10-17)

## What the page says (page-level verification only — no rules encoded)

Re-verified live 2026-11-02 — first check since 2026-10-17, and this time the page
MOVED. The provider-facing overview framing is unchanged verbatim ("For mental health
and drug and alcohol services, each county contracts with a Managed Care Organization
(MCO)"; "Each HealthChoices consumer is assigned a Behavioral Health Managed Care
Organization (BH-MCO) based on his or her county of residence"; county programs
"required to ensure high quality care and timely access").

**Behavioral Health Eligibles Map — total CHANGED.** The statewide total is now
**2,764,063 lives covered**, up from 2,717,158 on 2026-10-17 (+46,905). All 67 county
rows were summed by hand this run and reconcile EXACTLY to the new stated total
(2,764,063), so the new total is internally consistent with its own table, not a
stray header edit. Spot changes against the 2026-10-17 snapshot: Philadelphia
621,641 → 618,549 (down, even as the statewide total rose); Lehigh 88,048 → 88,053.
County-to-MCO assignments are unchanged in the spot-checked rows (Adams CCBH,
Philadelphia CBH, Lehigh MBH). The map heading now reads "Behavioral Health
Eligibles Map by County and MCO" (2026-10-17 snapshot recorded "by Zone, County,
and MCO" with six zones); no zone grouping is shown in the current table. Watch
item, not an error claim: Montgomery and Northampton both print 112,070 lives —
identical figures for two counties — while the 67-row sum still reconciles exactly,
so the duplication, if it is one, is inside the page's own numbers and is flagged
for the next check rather than corrected here.

**ASAM fee schedule — UNCHANGED.** Still headed "Rates Effective January 1, 2026"
with a "download ASAM PDF" link. All seven fees byte-identical to the 2026-10-17
recording: 2.0WM per hour $106.35; 2.1 per 15 minutes $11.57; 2.5 per 15 minutes
$10.74; 3.1 per diem $160.13; 3.5 per diem $260.65; 3.7 per diem $321.78; 3.7WM
per diem $415.24. The schedule stood still while the map moved — a useful reminder
that different sections of one page update on different clocks.

**HCBS Behavioral Health Gap Payments** — long PROMISe-ID/provider/payment table
still present, unchanged in structure; not summarized beyond existence.

## Scope limits (unchanged)

Provider-facing overview and directory only. A dated fee schedule is rate evidence
with an effective date — it is not a payment rule. Quoting any fee into a model
requires opening the linked ASAM PDF and checking applicability (provider type,
county, contract), which was NOT done this run. Provider acceptance, per-case
benefits, and per-case payment are not established by this page.
`review_required_before_encoding` stays true — nothing here has been promoted
to a rule, and the changed eligibles total must NOT be quoted without its
2026-11-02 date: the 2,717,158 figure from October is now stale.
