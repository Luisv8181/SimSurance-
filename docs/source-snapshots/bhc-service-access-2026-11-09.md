# Source snapshot: Request Behavioral HealthChoices Program Services (PA DHS) — URL returns 404

Retrieved 2026-11-09 by the portfolio build rotation (fifth re-verification of
record `pa-dhs-bhc-service-access`).

## Page reviewed
- URL: https://www.pa.gov/services/dhs/request-behavioral-healthchoices-program-services
- Publisher: Pennsylvania Department of Human Services
- Retrieval: 2026-11-09; two independent reads, both 404

## Finding: MOVED — the registered URL no longer serves the page
- Text fetch (`browser.open`) returned HTTP 404 for the registered URL.
- Live browser load of the exact same URL returned the pa.gov "Page not
  found" page, with NO redirect — the final URL was exactly the starting
  URL. Browser/tab title: "404 | Commonwealth of Pennsylvania". Main
  heading: "Page not found". Main message, verbatim: "We're sorry, we can't
  find the page you're looking for. The site administrator may have removed
  it, changed its location, or made it otherwise unavailable."
- No Behavioral HealthChoices content was present at that URL on 2026-11-09:
  no county mental-health office route, no BH-MCO assignment information,
  no COMPASS or other application route, no phone numbers, no 988 crisis
  line, no member handbook. No page-specific date or version note was shown.
- This ENDS the stability streak: four identical unchanged checks
  (2026-10-13, 2026-10-16, 2026-11-03, 2026-11-06; 24 days). The page did
  not change its text this run — it stopped existing at its URL.

## What the content looked like, and where it survives
- A web-search index still lists the page under the same URL (last crawl
  ~2 days before this check) and its indexed excerpt matches the 2026-11-06
  snapshot sentence for sentence (county office route, BH-MCO assignment by
  county of residence, in-network provider choice, mailed handbook, COMPASS /
  CAO / mail / Consumer Service Center 1-866-550-4355 application channels,
  988 block). The indexed copy is stale evidence, not a live page — do not
  cite it as current.
- The substance survives on two live official pages, both read live on
  2026-11-09 (crawled <1 minute before each read):
  1. DHS Behavioral Health program page,
     https://www.pa.gov/agencies/dhs/programs-services/behavioral-health —
     county mental-health program office coordinates care, connects members
     to providers, assists the uninsured; 988 call-or-text 24/7; Medicaid
     mental-health / drug-and-alcohol services run through Behavioral
     HealthChoices; once enrolled, the member is assigned to a managed care
     organization and chooses providers within the network.
  2. Behavioral HealthChoices overview,
     https://www.pa.gov/agencies/dhs/resources/medicaid/bhc — verbatim:
     "Each HealthChoices consumer is assigned a Behavioral Health Managed
     Care Organization (BH-MCO) based on his or her county of residence."
     and "The MCO will send you a handbook outlining how to access services
     and outlining the benefits available to you."
- The DHS program page links "Behavioral HealthChoices" to the BHC overview
  page, NOT to the dead service-page URL. No replacement service-page URL
  was found this run (the search index still points at the dead URL).

## Verification scope — READ CAREFULLY
This run verified that the OFFICIAL PAGE AT THE REGISTERED URL IS
UNAVAILABLE as of 2026-11-09, and that the same member-guidance substance
is live on the two program/overview pages named above. It is page-level
availability verification, NOT a rule-bearing document review. NOT verified
this run: any person's enrollment or eligibility, any BH-MCO's current
provider network or directory accuracy, any specific benefit authorization
or coverage rule, any rate or payment term, or the current accuracy of the
phone numbers and office hours beyond what the live pages state. Do not
encode a policy rule from any of these pages. The "consumer" for this
verification is the Learning Lab WORKBOOK scene `u1_p4_access5_404` (status
source_review_required), which teaches the dead-URL discipline: a source
can die at its address while its content survives elsewhere, and a stale
search-index copy is not a live page.

## Registry action
- Record `pa-dhs-bhc-service-access`: status `official_page_unavailable`,
  last_checked 2026-11-09, snapshot at
  docs/source-snapshots/bhc-service-access-2026-11-09.md. The URL in the
  record is kept as-is (it is the address that was checked and that 404s);
  do NOT silently swap in a different page's URL. A corrected or relocated
  URL for the service page is an owner decision — the candidate replacement
  content lives at the DHS behavioral-health program page and the BHC
  overview page (both already registered separately).
- `review_required_before_encoding` stays true — no policy parameter may be
  encoded from this page without document review of the applicable rule,
  version, effective date, and applicability.
