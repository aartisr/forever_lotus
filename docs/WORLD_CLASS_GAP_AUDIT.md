# World-Class Gap Audit (April 2026)

This document tracks what was hardened immediately and what still requires sustained execution to reach true world-class maturity.

## Completed In This Iteration

- Added global security headers in Next config:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security`
- Hardened contact submission API:
  - Origin allow-list checks (`CONTACT_ALLOWED_ORIGINS`)
  - `Cache-Control: no-store` for route responses
- Improved contact modal UX/accessibility:
  - Escape key to close
  - Focus handoff to first input
  - Focus restoration on close
  - Body scroll lock while modal is open
  - Required-field submit gating and autocomplete hints
- Updated docs for operational environment variables:
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL`
  - `CONTACT_FROM_EMAIL`
  - `CONTACT_ALLOWED_ORIGINS`
- Build guard retained to avoid local `.next` manifest races.

## Validation Snapshot

- `npm run typecheck` passes
- `npm test` passes
- `npm run build` passes

## Remaining Gaps (Cannot Be Solved By One Patch)

### Reliability and Operations

- No formal SLOs/error budgets published.
- No incident response runbooks committed.
- No synthetic uptime checks documented.

### Security and Compliance

- No CSP policy yet (needs staged rollout to avoid breakage).
- No dependency-vulnerability gate in CI.
- No threat model document for contact and admin endpoints.

### Accessibility and UX Quality

- No automated accessibility test gate (axe/pa11y).
- Guided scroll nav not yet covered by UI/integration tests.

### Product and Impact Proof

- No analytics dashboards in repo proving conversion/retention outcomes.
- No externally verifiable impact evaluation framework.

## 30/60/90-Day Execution Plan

### 30 Days

- Add strict but rollout-safe CSP (report-only first, then enforce).
- Add CI gates: dependency audit + accessibility smoke tests.
- Create runbooks for incident triage and rollback.

### 60 Days

- Define SLOs for API availability and contact submission success.
- Add synthetic monitoring and alerting for critical user journeys.
- Add integration tests for contact and key page interactions.

### 90 Days

- Publish transparency metrics dashboard (availability, latency, lead funnel).
- Run an external security review.
- Publish an impact methodology with independently reviewable criteria.
