# Source snapshot: CHIP Insurance Companies
Retrieved 2026-10-16 by the portfolio build rotation (live text fetch of pa.gov via browser).

## Page reviewed
- URL: https://www.pa.gov/agencies/dhs/resources/chip/chip-insurance-companies
- Title: "CHIP Insurance Companies | Department of Human Services | Commonwealth of Pennsylvania"
- Publisher: Pennsylvania Department of Human Services
- Retrieval: 2026-10-16; page rendered as text, 64 lines, all sections captured

## Comparison against the 2026-10-13 snapshot
- Byte-identical content: the same nine insurance companies with the same phone
  numbers (Aetna Better Health Kids 800-822-2447; Capital Blue Cross 800-543-7101;
  Geisinger Health Plan 866-621-5235; Highmark Choice Company - Highmark Healthy
  Kids 800-KIDS-105; Jefferson Health Plans CHIP 888-888-1211; Keystone First-CHIP
  844-472-2447; UnitedHealthCare 800-414-9025; UPMC *for Kids* 800-650-8762;
  Wellkids by PA Health & Wellness 855-445-1920).
- CHIP MCO NCQA Accreditation Status table unchanged: all nine MCOs "Accredited"
  with the same grant/due dates (e.g. Aetna Better Health | Accredited |
  Dec. 26, 2024 | Dec. 26, 2027; Geisinger Health Plan | Accredited |
  June 2, 2025 | June 2, 2028).
- Health Equity Accreditation Status table unchanged: five MCOs, all "Accredited"
  (e.g. PA Health & Wellness | Accredited | October 1, 2025 | October 1, 2028).

## New page-level observation (no claim beyond what the page shows)
- Three Health Equity "Next Due Date" entries on the page now lie in the past
  relative to this 2026-10-16 check: Aetna Better Health (August 31, 2026),
  Keystone First-CHIP (June 22, 2026), and United Healthcare (May 08, 2026).
- The page itself shows no update to those rows. This does NOT establish that any
  accreditation lapsed (a renewal may not have been posted); it establishes only
  that the page is a dated record whose accreditation table may not be current.
- Modeler discipline: a passed due date on an un-updated page is a recheck flag,
  not evidence of a lapse. Confirm current accreditation against NCQA or the
  MCO/issuer before encoding any "currently accredited" value.

## What the page does NOT establish
- County-by-county availability of each CHIP insurer (companies and phone numbers
  only; no county availability map).
- Benefit design, covered services, behavioral-health rules, provider networks,
  provider acceptance, or reimbursement rates.
- Enrollment numbers or eligibility rules beyond the program name.
- Current (2026-10-16) accreditation status — see the stale-due-date observation.

## Limits for the simulator
- Use as a dated CHIP insurer directory with dated NCQA accreditation ledger
  only. Do not encode any coverage rule, benefit, rate, network, or eligibility
  rule from this page; those live in CHIP contracts and documents this page does
  not link. Treat passed due dates on this page as a recheck trigger.
