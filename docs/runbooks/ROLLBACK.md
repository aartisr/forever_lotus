# Rollback Runbook

## Preconditions

- A known good deployment exists.
- Current incident has clear user impact or elevated risk.

## Rollback Decision

Rollback immediately if any is true:

1. Contact API is failing persistently (5xx spikes).
2. Homepage critical rendering regressions are user-visible.
3. Build/deploy outputs are inconsistent with expected artifacts.

## Procedure

1. Identify last stable commit/deployment.
2. Trigger platform rollback to that deployment.
3. Confirm service restore with smoke checks.
4. Keep incident channel open until metrics stabilize.

## Smoke Checks After Rollback

1. `GET /api/health/data-layer` returns healthy.
2. Homepage (`/`) and contact (`/contact`) load successfully.
3. Contact submit endpoint accepts valid payload and rejects invalid payload correctly.

## Follow-up

1. Mark reverted commit range.
2. Open a fix-forward issue with root cause context.
3. Add automated test coverage for the regression.
