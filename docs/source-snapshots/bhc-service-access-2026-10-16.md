# Source snapshot: Request Behavioral HealthChoices Program Services (PA DHS)

Re-verified 2026-10-16 by the portfolio build rotation (live text fetch of the
official pa.gov page, 126 lines, all sections captured).

## Page reviewed
- URL: https://www.pa.gov/services/dhs/request-behavioral-healthchoices-program-services
- Title: "Request Behavioral HealthChoices Program Services | Commonwealth of Pennsylvania"
- Publisher: Pennsylvania Department of Human Services
- Retrieval: 2026-10-16

## Result: substantively unchanged since 2026-10-13
The page states the same member-facing access route captured in the
2026-10-11 and 2026-10-13 snapshots: behavioral healthcare covered through
Medicaid is overseen by the county's mental health office; the county
determines services/funding eligibility, assesses need, and refers to programs;
each county contracts with a BH-MCO; the member is assigned a BH-MCO by county
of residence; the member chooses providers within the BH-MCO's network; the MCO
mails a handbook; Medicaid application routes are COMPASS online, county
assistance office in person, mail, and phone (1-866-550-4355; Philadelphia
215-560-7226; customer service center Mon–Fri 8:00 a.m.–4:30 p.m.); the
OMHSAS email block carries an explicit warning not to include Social Security
numbers or medical information; the 988 Suicide & Crisis Lifeline block is
present (call or text 988, free and confidential, 24/7).

## New page-level observation (2026-10-16): duplication in the text extract
The fetched text renders the 988 Suicide & Crisis Lifeline section TWICE
(lines 98–112 and 106–112 repeat the same heading, subhead, and body copy),
and a bare phone artifact "Phone: 18773958930" appears near the Apply-by-Phone
block. Neither is a second claim by the page — repeated blocks and stray
tel-link artifacts are common in text extraction. The takeaway: quote from
the verified source text, but count the page's claims from the rendered page,
not the scrape's line count. The 988 copy itself is one block:
"Call or text 988 to receive free and confidential support from a trained
counselor 24 hours a day, 7 days a week."

## Verification scope — READ CAREFULLY
Page-level member-guidance verification only (existence + content of the
official page as of 2026-10-16). NOT verified: any person's enrollment or
eligibility, any BH-MCO's current provider network, any benefit authorization
or coverage rule, any rate, or the current accuracy of phone numbers beyond
what the page states. Do not encode a policy rule from this page.

## Registry action
- Record `pa-dhs-bhc-service-access`: official_page_reviewed, last_checked
  2026-10-16, snapshot at docs/source-snapshots/bhc-service-access-2026-10-16.md.
- `review_required_before_encoding` stays true — no policy parameter may be
  encoded from this page until its version, effective date, passage, and
  applicability are reviewed.
