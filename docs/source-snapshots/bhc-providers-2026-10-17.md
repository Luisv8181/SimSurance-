# Source snapshot — Behavioral HealthChoices for Providers (2026-10-17)

- **Source ID:** pa-dhs-bhc-providers
- **Title:** Behavioral HealthChoices: Information for Providers
- **Issuer:** Pennsylvania Department of Human Services
- **URL:** https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-providers
- **Retrieved:** 2026-10-17 (live fetch this run; 1,175 text lines, same count as 10-14)

## What the page says (page-level verification only — no rules encoded)

Re-verified live 2026-10-17 — third live check in five days. Substantively identical to the
2026-10-14 reading. Provider-facing overview framing unchanged ("each county contracts with
a Managed Care Organization (MCO)"; "Each HealthChoices consumer is assigned a Behavioral
Health Managed Care Organization (BH-MCO) based on his or her county of residence"; county
programs "required to ensure high quality care and timely access").

**Behavioral Health Eligibles Map by Zone, County, and MCO** — statewide total still
**2,717,158 lives covered**; six zones (Lehigh/Capital, North/Central County Option,
North/Central State Option, Northeast, Southwest, Southeast); county-to-MCO rows match the
10-14 check (spot-checked: Adams CCBH, Lehigh MBH 88048, Philadelphia CBH 621641).

**ASAM fee schedule** — headed "Rates Effective January 1, 2026" with a "download ASAM
PDF" link. Fees byte-identical to the 10-14 recording: 2.0WM per hour $106.35;
2.1 per 15 minutes $11.57; 2.5 per 15 minutes $10.74; 3.1 per diem $160.13;
3.5 per diem $260.65; 3.7 per diem $321.78; 3.7WM per diem $415.24. No silent edits.

**HCBS Behavioral Health Gap Payments** — long PROMISe-ID/provider/payment table still
present, unchanged in structure; not summarized beyond existence.

## MBH/Magellan label discrepancy — RESOLVED between checks

The flag raised 2026-10-12 and still open in the 10-14 snapshot (map table uses "MBH"
for Lehigh, Northampton, Bedford, Cambria, Somerset, Bucks, Montgomery while the
bhc-mcos directory names Magellan for those counties) is now resolved by a sister page:
the MCO directory page, re-verified 2026-10-15 (see docs/source-snapshots/bhc-mcos-2026-10-15.md),
prints its own row as **"Magellan Behavioral Health of Pennsylvania (MBH)"** — the acronym
is defined by the very source that also prints the full name. Same DHS source family,
same entity. No phantom payer. The reconciliation is recorded here; the resolution is not
a claim about networks, benefits, or rates.

## Scope limits (unchanged)

Provider-facing overview and directory only. A dated fee schedule is rate evidence with
an effective date — it is not a payment rule. Quoting any fee into a model requires
opening the linked ASAM PDF and checking applicability (provider type, county, contract),
which was NOT done this run. Provider acceptance, per-case benefits, and per-case payment
are not established by this page. `review_required_before_encoding` stays true —
nothing here has been promoted to a rule.
