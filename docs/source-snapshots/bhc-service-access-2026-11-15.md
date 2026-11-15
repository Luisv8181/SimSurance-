# Source snapshot: Request Behavioral HealthChoices Program Services (PA DHS) — page UNCHANGED three days after its return

Retrieved 2026-11-15 by the portfolio build rotation (seventh re-verification of
record `pa-dhs-bhc-service-access`).

## Page reviewed
- URL: https://www.pa.gov/services/dhs/request-behavioral-healthchoices-program-services
- Title: "Request Behavioral HealthChoices Program Services | Commonwealth of Pennsylvania"
- Publisher: Pennsylvania Department of Human Services
- Retrieval: 2026-11-15; text fetch, copy crawled 2026-11-15 16:56 UTC, <1 min before the read

## Finding: UNCHANGED — the return holds, three days on
- Text fetch (`browser.open`): full page, 126 lines (L0-L126), HTTP 200, no redirect.
- This is the first check since the page RETURNED on 2026-11-12 after the
  HTTP 404 recorded 2026-11-09. The return holds: the page is live at its
  registered URL, and its content is unchanged from the 2026-11-12 snapshot,
  which was itself identical to the 2026-11-06 snapshot.

## Comparison with the 2026-11-12 snapshot: IDENTICAL
- Full 126-line read matches the 2026-11-12 snapshot line for line in the
  same order: same title, same Overview opening verbatim ("If you receive
  Medicaid health coverage and need support for mental health care or
  substance use disorder, Behavioral HealthChoices can help."), same
  county-office route and BH-MCO assignment by county of residence, same
  in-network provider choice and mailed handbook, same Eligibility section,
  same Apply for Medicaid section (COMPASS online, CAO in person, mail,
  phone via the Consumer Service Center 1-866-550-4355), same Customer
  Service Center hours (Monday-Friday 8:00 a.m. to 4:30 p.m.; Philadelphia
  215-560-7226), same OMHSAS email warning not to include confidential
  details, same 988 block.
- The two extraction artifacts noted since 2026-10-16 persist verbatim: the
  988 block still renders twice in the fetched text (L98-L104 and L106-L112),
  and the stray "Phone: 18773958930" tel-link artifact still appears at L124.
  Both remain scrape duplication, not second claims — count claims from the
  rendered page, not the extract. Their exact persistence is itself evidence
  the restored page is the same page, still, not a rewritten one.
- Still no revision date, last-updated stamp, or document version anywhere
  on the page: the check date is the version; cite it with the date.
- The page is member-facing access guidance, not a benefit schedule,
  provider directory, rate document, or eligibility rule. Nothing on it is
  new since 2026-10-13.

## Streak accounting
- Unchanged-content checks: 2026-10-13, 2026-10-16, 2026-11-03, 2026-11-06
  (four in a row), then MOVED — HTTP 404 on 2026-11-09 — then RETURNED
  2026-11-12 (content identical to 2026-11-06), now UNCHANGED again
  2026-11-15. The 404 interrupts the streak but does not reset the content:
  the text has now been the same for 33 days (2026-10-13 to 2026-11-15),
  with a three-day availability gap (2026-11-09 to 2026-11-12) in the
  middle. The availability gap and the content stability are separate facts
  and are recorded separately: availability broke, content never did.

## Verification scope — READ CAREFULLY
This run verified the OFFICIAL PAGE EXISTENCE AND CONTENT as of 2026-11-15
only, on one text fetch (a single independent read; the 2026-11-12 return
was established on two independent reads, and this run confirms the return
holds). It is page-level member-guidance verification, NOT a rule-bearing
document review. NOT verified this run: any person's enrollment or
eligibility, any BH-MCO's current provider network or directory accuracy,
any specific benefit authorization or coverage rule, any rate or payment
term, or the current accuracy of the phone numbers and office hours beyond
what the live page states. Do not encode a policy rule from this page. The
404 of 2026-11-09 is kept in the record history, not erased: the page was
unavailable for three days and then restored unchanged, and a three-day
outage is a three-day fact, not a permanent one. The "consumer" for this
verification is the new Learning Lab scene
`u1_p4_access7_still` plus lesson `bhc-service-access-page-still`
(status source_review_required), which teaches the post-return discipline:
after a page comes back, the next check is not a formality — it is the
check that proves the return was a restoration and not a one-day reprieve.

## Registry action
- Record `pa-dhs-bhc-service-access`: status stays
  `official_page_reviewed`, last_checked 2026-11-15, snapshot at
  docs/source-snapshots/bhc-service-access-2026-11-15.md, scope note
  extended with the 2026-11-15 unchanged finding (return holds, three days
  on; content stable 33 days apart from the three-day availability gap).
- `review_required_before_encoding` stays true — no policy parameter may be
  encoded from this page without document review of the applicable rule,
  version, effective date, and applicability.
