# Source snapshot: CHIP Insurance Companies
Retrieved 2026-11-03 by the portfolio build rotation (live text fetch of pa.gov via browser; page crawled 2026-11-03 10:55 UTC, 63 lines, all sections captured).

## Page reviewed
- URL: https://www.pa.gov/agencies/dhs/resources/chip/chip-insurance-companies
- Title: "CHIP Insurance Companies | Department of Human Services | Commonwealth of Pennsylvania"
- Publisher: Pennsylvania Department of Human Services
- Retrieval: 2026-11-03

## Comparison against the 2026-10-16 snapshot — THE PAGE MOVED
- Companies unchanged: the same nine insurers with the same phone numbers
  (Aetna Better Health Kids 800-822-2447; Capital Blue Cross 800-543-7101;
  Geisinger Health Plan 866-621-5235; Highmark Choice Company - Highmark
  Healthy Kids 800-KIDS-105; Jefferson Health Plans CHIP 888-888-1211;
  Keystone First-CHIP 844-472-2447; UnitedHealthCare 800-414-9025;
  UPMC *for Kids* 800-650-8762; Wellkids by PA Health & Wellness 855-445-1920).
- NCQA health-plan accreditation table: still nine rows, all "Accredited".
  Current rows include Keystone First-CHIP | Accredited | October 6, 2026 |
  October 6, 2029, and PA Health & Wellness | Accredited | October 10, 2025 |
  October 10, 2028. The other seven rows match the 2026-10-16 snapshot
  (e.g. Aetna Better Health | Accredited | Dec. 26, 2024 | Dec. 26, 2027;
  Geisinger Health Plan | Accredited | June 2, 2025 | June 2, 2028).
- Health Equity accreditation table: now FOUR rows, not five. Aetna Better
  Health now reads | Accredited | August 19, 2026 | August 19, 2029 and
  United Healthcare now reads | Accredited | April 21, 2026 | April 21, 2029 —
  both replace the stale due dates flagged 2026-10-16 (August 31, 2026 and
  May 8, 2026 respectively). Capital BlueCross (June 13, 2025 | June 13, 2028)
  and PA Health & Wellness (October 1, 2025 | October 1, 2028) are unchanged.
- Keystone First-CHIP no longer appears in the Health Equity table at all.
  The page marks nothing lapsed and gives no reason; the row's absence is
  recorded as an absence only, not as a finding about Keystone's equity
  accreditation. Confirm against NCQA or the MCO before stating anything
  about it.

## Resolution of the 2026-10-16 recheck flags
- Two of the three stale Health Equity due dates are resolved by posted
  renewals on the page itself (Aetna, United). The third (Keystone, June 22,
  2026) is resolved differently: the row is gone, and Keystone's NCQA
  health-plan row carries a fresh October 6, 2026 grant date. The October
  lesson stands and is now proven by the page's own movement: a passed due
  date on an un-updated page was a recheck flag, not a lapse — and the
  recheck, eighteen days later, found the publisher had in fact updated.
- Minor extraction artifact, not a claim: the text extract ends with a stray
  "Phone: 8005437105" line (Capital Blue Cross's number without dashes);
  it adds no insurer and no claim.

## What the page does NOT establish
- County-by-county availability of each CHIP insurer (companies and phone
  numbers only; no county availability map).
- Benefit design, covered services, behavioral-health rules, provider
  networks, provider acceptance, or reimbursement rates.
- Enrollment numbers or eligibility rules beyond the program name.
- The reason Keystone First-CHIP left the Health Equity table, or its
  current equity-accreditation status — the page is silent on both.

## Limits for the simulator
- Use as a dated CHIP insurer directory with dated NCQA accreditation ledger
  only. Do not encode any coverage rule, benefit, rate, network, or
  eligibility rule from this page. Treat the Health Equity table as a
  four-row ledger as of 2026-11-03, and Keystone's equity status as
  unknown-from-this-page, not lapsed.
