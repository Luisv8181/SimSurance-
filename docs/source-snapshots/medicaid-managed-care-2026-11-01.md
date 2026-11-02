# Medicaid.gov Managed Care landing page — source snapshot

**Checked:** 2026-11-01 (evening run; page text returned from a copy crawled
2026-11-02 00:12 UTC, about three hours before this run — see the read-method
note below)
**Source record:** `medicaid-gov-managed-care` in `docs/sources.registry.json`
**Publisher:** Centers for Medicare & Medicaid Services (CMS), U.S. federal government
**URL:** https://www.medicaid.gov/medicaid/managed-care
**Program:** Medicaid managed care (federal)
**Review state after this check:** `official_page_reviewed` (index/landing page
re-verified; not a rule-bearing source)

## Read method — stated plainly

This run did not use the live-browser render that the 2026-10-15 check used.
The page text came from a text fetch of the official URL, and the fetch
reported its copy as crawled 2026-11-02 00:12 UTC (19:12 EST 2026-11-01), about
three hours before this run started at 21:54 EST. That is recent, but it is not
a live render: if the page changed inside that three-hour window, this snapshot
would not show it. The definition sentences below are quoted from that copy,
and the comparison to October 15 is a comparison against the October 15
snapshot document, not against a fresh October 15 capture.

## Observed content (2026-11-01 read)

Page title "Managed Care | Medicaid". The returned article body is three
short paragraphs:

1. "Managed Care is a health care delivery system organized to manage cost,
   utilization, and quality. Medicaid managed care provides for the delivery
   of Medicaid health benefits and additional services through contracted
   arrangements between state Medicaid agencies and managed care
   organizations (MCOs) that accept a set per member per month (capitation)
   payment for these services."
2. "By contracting with various types of MCOs to deliver Medicaid program
   health care services to their beneficiaries, states can reduce Medicaid
   program costs and better manage utilization of health services.
   Improvement in health plan performance, health care quality, and outcomes
   are key objectives of Medicaid managed care."
3. "Some states are implementing a range of initiatives to coordinate and
   integrate care beyond traditional managed care. These initiatives are
   focused on improving care for populations with chronic and complex
   conditions, aligning payment incentives with performance goals, and
   building in accountability for high quality care."

## Comparison against the 2026-10-15 snapshot — an unresolved difference

The two definition sentences in paragraph 1 match the 2026-10-15 snapshot's
verbatim quotes exactly: the delivery-system definition and the PMPM
capitation mechanism are unchanged.

Paragraphs 2 and 3 were NOT quoted in the 2026-10-15 snapshot, which described
the body as "the delivery system and capitation mechanism only." That leaves
two live possibilities that this run cannot distinguish:

- (a) the page gained paragraphs 2 and 3 between 2026-10-15 and 2026-11-01; or
- (b) paragraphs 2 and 3 were already on the page on 2026-10-15 and the
  snapshot simply under-quoted them (it quoted only the first paragraph and
  summarized the rest).

NO page-change claim is made. A snapshot that quotes one paragraph is not
evidence the page held only one paragraph, and recency does not resolve a
snapshot-vs-read mismatch. Until a full-page capture is diffed against today's
full text, paragraphs 2 and 3 are quoted only as "present in the 2026-11-01
read," never as a dated change. The workbook scene shipped with this check
teaches exactly that discipline.

## What the page still does NOT establish

- No text on the page names the federal authorities: no section 1932(a) state
  plan authority, no section 1915(a) or 1915(b) waiver authority, no section
  1115 research-and-demonstration authority, and no statement of which
  authority most programs operate under. (Same as 2026-10-15.)
- No sentence states any share of Medicaid beneficiaries enrolled in managed
  care. (Same as 2026-10-15.)
- No "last updated" or publication date is shown. (Same as 2026-10-15.)
- The initiatives paragraph (paragraph 3) is overview language, not an
  authority, a rate, an enrollment figure, or an applicability finding. It
  must not be encoded as a payment or program rule.

## Model use

Index-level re-confirmation that CMS presents managed care as a delivery
system organized around cost/utilization/quality management with
per-member-per-month capitation payments to MCOs, plus state-level
coordination/integration initiatives described in general terms. This page
remains a doorway, not a rule book: cite it for the delivery-system
definition only; anything about 1932(a), 1915(a)/(b), or 1115 must come from
the authorities pages the sidebar points to (not yet reviewed).

## Status

Official page re-read 2026-11-01. `review_required_before_encoding`
remains true: no rule has been encoded from this page, and none should be
until a rule-bearing document's version/effective period, exact passage, and
applicability are reviewed. The old `/managed-care/index.html` URL remains
dead and must not be cited. Re-verify every federal URL before citing.
