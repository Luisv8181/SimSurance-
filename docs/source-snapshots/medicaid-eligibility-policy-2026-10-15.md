# Medicaid.gov Eligibility Policy overview — source snapshot

**Checked:** 2026-10-15
**Source record:** `cms-medicaid-eligibility-policy` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS), U.S. federal government
**URL:** https://www.medicaid.gov/medicaid/eligibility-policy
**Program:** Medicaid eligibility (federal policy overview)
**Review state after this check:** `official_page_reviewed` (overview page verified
live; not a rule-bearing source)

## How this page was reached

The URL `https://www.medicaid.gov/medicaid/eligibility` (no such record existed;
probed this run) returns a 404 ("Error: Page Not Found | Medicaid.gov"). Using
the site's own navigation, the current eligibility overview is:
https://www.medicaid.gov/medicaid/eligibility-policy ("Eligibility Policy").
Only that one page was read via the live browser; no sidebar or subpage links
were followed, no forms filled.

## Observed content (2026-10-15)

Page title "Eligibility Policy | Medicaid". Opens with a "Get Help with Medicaid
and CHIP" link and a "Related Resources" list (slide decks, SHO letters, fact
sheets), then the overview body. Renders normally; no maintenance banner, no
placeholder content.

No "last updated" or publication date is shown anywhere in the visible page
text, header, or footer — date discipline: this snapshot is the date evidence.

Verbatim sentences from the page (public-domain U.S. federal government text,
copied exactly as written):

> "Medicaid is a joint federal and state program that, together with the
> Children's Health Insurance Program (CHIP), provides health coverage to over
> 77.9 million Americans, including children, pregnant women, parents, seniors,
> and individuals with disabilities. Medicaid is the single largest source of
> health coverage in the United States."

> "To participate in Medicaid, federal law requires states to cover certain
> groups of individuals."

> "The Affordable Care Act of 2010 created the opportunity for states to expand
> Medicaid to cover nearly all low-income Americans under age 65."

> "The MAGI-based methodology does not allow for income disregards that vary
> by state or by eligibility group and does not allow for an asset or resource
> test."

## Section-level facts (paraphrased; page-level only)

- **Mandatory vs optional groups.** Federal law requires states to cover
  certain groups (low-income families, qualified pregnant women and children,
  SSI recipients are given as examples). States "have additional options for
  coverage and may choose to cover other groups," e.g., individuals receiving
  home and community-based services and foster-care children not otherwise
  eligible.
- **ACA expansion.** Children eligible to at least 133% of FPL in every state
  (most cover higher); states may extend to adults at or below 133% FPL; "Most
  states have chosen to expand coverage to adults, and those that have not yet
  expanded may choose to do so at any time."
- **Financial eligibility.** MAGI methodology for most children, pregnant
  women, parents, adults — one set of income-counting rules and a single
  application across Medicaid/CHIP/marketplace. Exempt: blindness, disability,
  age 65+ (SSI methodologies; some "209(b) states" use more restrictive
  criteria). Medicare Savings Programs use SSI methodologies. Some groups need
  no income determination (SSI enrollees, breast/cervical cancer program;
  title IV-E adoption-assistance children automatically eligible; qualifying
  former foster youth eligible at any income level).
- **Non-financial eligibility.** State residency; U.S. citizenship or qualified
  non-citizen (e.g., lawful permanent residents); some groups limited by age,
  pregnancy, or parenting status.
- **Coverage dates.** Effective on date of application or first day of the
  application month; retroactive up to 3 months if the person would have been
  eligible; generally ends at the end of the month requirements are no longer
  met.
- **Medically needy / spenddown.** State option for significant health needs
  with income above limits: eligibility by "spending down" income above the
  state's medically needy income standard via incurred medical expenses.
  209(b) states must also allow spenddown for blindness/disability/age groups.
  "Thirty-six states and the District of Columbia use spenddown programs."
- **Appeals.** States must offer a fair hearing for denials, erroneous actions,
  or unreasonable delay; may be delegated to the Exchange/Appeals Entity or
  another state agency with CMS approval under the Intergovernmental
  Cooperation Act of 1968.
- **Related topics** (summary blurbs only, not read): spousal impoverishment,
  treatment of trusts, five-year lookback on asset transfers for LTSS,
  estate recovery, third-party liability, waivers/demonstrations (states can
  apply to CMS to cover populations beyond the state plan; state-only programs
  get no federal funds).
- **Named authorities:** Affordable Care Act of 2010; title IV-E of the Social
  Security Act; 209(b) states; SUPPORT Act §1002(a) (related resource);
  Intergovernmental Cooperation Act of 1968.

## What this page CANNOT establish

- Any specific state's eligibility groups, income limits, or expansion status
  (rules are state-administered; the page explicitly says rules vary by state).
- Effective dates or publication date of the page itself (none displayed).
- Whether "77.9 million" is current, dated, or point-in-time (no date on the
  figure; it is stated for Medicaid and CHIP combined).
- Full legal text of any cited authority — the page names authorities but is
  an overview, not the regulation.

## Forensic notes

- This is the second Medicaid.gov URL rot event in two days: both
  /medicaid/eligibility and (yesterday) /medicaid/managed-care/index.html 404.
  The site's own search/nav found the successor both times. Rule stands: never
  cite a federal URL without a live check.
