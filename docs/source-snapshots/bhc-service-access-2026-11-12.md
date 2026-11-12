# Source snapshot: Request Behavioral HealthChoices Program Services (PA DHS) — page BACK, content identical to 2026-11-06

Retrieved 2026-11-12 by the portfolio build rotation (sixth re-verification of
record `pa-dhs-bhc-service-access`).

## Page reviewed
- URL: https://www.pa.gov/services/dhs/request-behavioral-healthchoices-program-services
- Title: "Request Behavioral HealthChoices Program Services | Commonwealth of Pennsylvania"
- Publisher: Pennsylvania Department of Human Services
- Retrieval: 2026-11-12; two independent reads minutes apart, both live

## Finding: RETURNED — the 404 is reversed; the page is live again at its registered URL
- Text fetch (`browser.open`): full page, 126 lines, copy crawled 2026-11-12
  10:55 UTC, <1 min before the read. HTTP 200, no redirect.
- Live browser load of the exact same URL (2026-11-12 10:56 UTC): renders
  the real page, not the pa.gov "Page not found" page. Final URL exactly the
  starting URL, no redirect observed. Tab title matches the page title.
  Main heading (H1): "Request Behavioral HealthChoices Program Services".
  Overview opens, verbatim: "If you receive Medicaid health coverage and
  need support for mental health care or substance use disorder, Behavioral
  HealthChoices can help." The 988 Suicide & Crisis Lifeline section is
  visible (sidebar and "On this page" navigation).
- This REVERSES the 2026-11-09 finding (HTTP 404 on two independent reads,
  no redirect). The page was unavailable for three days and is now back at
  the same address. No replacement URL was ever needed, and none is claimed.

## Comparison with the 2026-11-06 snapshot: IDENTICAL
- Full 126-line read matches the 2026-11-06 snapshot line for line in the
  same order: same title, same Overview (county mental-health office route,
  BH-MCO assignment by county of residence, in-network provider choice,
  mailed handbook), same Eligibility section, same Apply for Medicaid
  section (COMPASS online, CAO in person, mail, phone via the Consumer
  Service Center 1-866-550-4355), same Customer Service Center hours
  (Monday-Friday 8:00 a.m. to 4:30 p.m.; Philadelphia 215-560-7226), same
  988 block, same OMHSAS email warning not to include confidential details.
- The two extraction artifacts noted since 2026-10-16 persist verbatim: the
  988 block still renders twice in the fetched text, and the stray
  "Phone: 18773958930" tel-link artifact still appears near the end. Both
  remain scrape duplication, not second claims — count claims from the
  rendered page, not the extract. Their exact return is itself evidence the
  restored page is the same page, not a rewritten one.
- Still no revision date, last-updated stamp, or document version anywhere
  on the page: the check date is the version; cite it with the date.
- The page is member-facing access guidance, not a benefit schedule,
  provider directory, rate document, or eligibility rule. Nothing on it is
  new since 2026-10-13.

## Verification scope — READ CAREFULLY
This run verified the OFFICIAL PAGE EXISTENCE AND CONTENT as of 2026-11-12
only, on two independent reads. It is page-level member-guidance
verification, NOT a rule-bearing document review. NOT verified this run: any
person's enrollment or eligibility, any BH-MCO's current provider network
or directory accuracy, any specific benefit authorization or coverage rule,
any rate or payment term, or the current accuracy of the phone numbers and
office hours beyond what the live pages state. Do not encode a policy rule
from this page. The 404 of 2026-11-09 is kept in the record history, not
erased: the page was unavailable for three days and then restored unchanged,
and a three-day outage is a three-day fact, not a permanent one. The
"consumer" for this verification is the new Learning Lab scene
`u1_p4_access6_returned` plus lesson `bhc-service-access-page-returned`
(status source_review_required), which teaches the return discipline: a
dead address is not always a dead page, and the record must carry both the
absence and the return.

## Registry action
- Record `pa-dhs-bhc-service-access`: status back to
  `official_page_reviewed`, last_checked 2026-11-12, snapshot at
  docs/source-snapshots/bhc-service-access-2026-11-12.md, scope note
  extended with the 2026-11-09 404 and the 2026-11-12 return (content
  identical to the 2026-11-06 snapshot).
- `review_required_before_encoding` stays true — no policy parameter may be
  encoded from this page without document review of the applicable rule,
  version, effective date, and applicability.
