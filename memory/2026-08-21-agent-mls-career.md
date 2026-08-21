# Debug Report: Agent MLS career history

- Date: 2026-08-21
- Status: DONE

## Symptom

Advisors reported that saving a New York license number did not make MLS Past
Sales appear on the public profile. New advisors had no clear indication of
whether the license had matched OneKey or whether OneKey had any eligible
Closed records.

## Root cause

This was three distinct states presented as one silent outcome:

1. Website identity sync attempted an exact license match only during publish
   or a later identity edit. A temporary BBO outage or stale roster left
   `public.agents.mls_id` null forever unless the advisor edited identity again.
2. Portal treated website sync as best effort and discarded the returned
   notice, so "saved" did not mean "MLS verified" but looked identical in the
   UI.
3. A verified MLS identity does not imply Past Sales exist. The public section
   intentionally renders only when BBO returns at least one authorized Closed
   deal. BBO Member and Career jobs also ran weekly, adding avoidable delay.

## Evidence

- Production public roster audit: 69 visible profiles; 49 initially had
  `mls_id`; two license-bearing profiles did not.
- Yeshu Tan's exact license already matched BBO member `KEY507263`, proving the
  missing retry path. The protected identity endpoint linked it successfully.
- One remaining 10-digit license did not match any Homix OneKey roster member;
  it was not guessed or force-linked.
- BBO's durable Closed archive contained 1,185,538 records spanning 1997-12-18
  through 2026-08-16. Five sampled zero-result agents had zero rows in both the
  archive and career projection; same-license historical member-key lookup also
  found no alternate rows. Their empty public sections are therefore accurate.
- The deployed reconciliation smoke run returned `scanned=2`, `matched=1`,
  `unmatched=1`, and `failures=0`, automatically linking Jueyao Lu to
  `KEY507063`.
- After the production refresh, 51 of 69 visible profiles had a verified MLS
  identity. BBO returned authorized Closed history for 27 and an accurate zero
  result for 24; no career request failed.
- The initial post-refresh audit left one visible license unmatched: Yunhang
  (Eva) Hou's submitted `10311210013` was not present in the OneKey roster.
- A final comparison with OneKey's public Homix office roster found that
  Yunhang's submitted license was incorrect. OneKey and BBO agree on license
  `10301219915`, member MLS ID `213594`, and member key `326222762`; Portal and
  website production records were corrected to `KEY213594`. Her BBO career now
  returns 18 Closed transactions.
- The same cross-check confirmed Jingyi Li as license `10401298069`, member MLS
  ID `190152`, and member key `326200099`. Her production identity was already
  correct and BBO returns 85 Closed transactions; the website page needed a
  fresh deployment to discard its pre-sync empty render.

## Fix

- Homix website now returns machine-readable MLS verification states, performs
  a daily exact-license reconciliation, and expires the shared Career cache
  after BBO's daily jobs.
- BBO Member and Career incremental jobs now run daily. `/api/v1/sync/status`
  includes the Closed archive, Career projection, and roster fingerprint.
- Homix Portal now preserves the canonical save while displaying verified,
  unmatched, unavailable, ambiguous, claimed, unlinked, and failed states to
  advisors and administrators.
- No name-based or email-based identity guessing was introduced.

## Regression tests

- `scripts/test-agent-mls-license.mjs`
- Portal `src/lib/__tests__/public-identity-status.test.ts`
- BBO `internal/worker/scheduler_test.go`

## Verification

- Homix website: license regression test, ESLint, TypeScript, and production
  Next.js build passed.
- Homix Portal: full test suite, ESLint, TypeScript, and production Next.js
  build passed.
- BBO: `go test ./...` and `go vet ./...` passed.
- Vercel deployments for website and Portal completed successfully.
- Azure cron expressions read back as daily (`10 9 * * *` Member and
  `0 12 * * *` Career).
- The recovery run completed successfully: Property processed 277 changes and
  reconciled 124 Homix records; Member processed 1,449 rows; the Closed archive
  processed 1,537 rows; the career projection processed 788 rows; and the
  career roster rebuilt for 63 members.
- Production `/readyz` returned HTTP 200 with fresh Property activity, and the
  Property/OpenHouse schedules were restored to `*/5 * * * *` and
  `7,22,37,52 * * * *`.

## Related operational note

During diagnosis, direct MLS Grid probes bypassed BBO's shared 2 req/s limiter
and tripped the provider's rolling rate window. Property and OpenHouse schedules
were temporarily paused so the window could recover, then restored after a
successful BBO-managed sync. All subsequent verification used BBO/Azure rather
than direct provider requests.
