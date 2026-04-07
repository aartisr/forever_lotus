# Paperclip Phase 0 Setup Package

This package operationalizes Phase 0 from the Forever Lotus x Awaricon master plan.

## Included Files

1. `goals.json` - Goal map (G1-G3) with outcome metrics.
2. `projects.json` - Project tree (P1-P6) aligned to goals.
3. `issue-templates.json` - Reusable template structures for campaign, partnership, product, research, and transparency work.
4. `routines.json` - Daily/weekly/monthly/quarterly routine definitions.
5. `bootstrap-paperclip-phase0.sh` - Script to create seed goals/projects/issues through Paperclip API.
6. `bootstrap-paperclip-routines.sh` - Script to create routines and schedule triggers through Paperclip API.
7. `bootstrap-paperclip-routines-idempotent.sh` - Idempotent routine sync script (safe to rerun without duplicates).

## Required Environment Variables

1. `PAPERCLIP_API_URL`
2. `PAPERCLIP_API_KEY`
3. `PAPERCLIP_COMPANY_ID`

For routines bootstrap:

1. `PAPERCLIP_ROUTINE_ASSIGNEE_AGENT_ID`
2. `PAPERCLIP_ROUTINE_PROJECT_ID`
3. Optional: `PAPERCLIP_ROUTINE_GOAL_ID`
4. Optional: `PAPERCLIP_ROUTINE_PARENT_ISSUE_ID`

## Quick Start

```bash
cd docs/paperclip-phase0-package
chmod +x bootstrap-paperclip-phase0.sh
./bootstrap-paperclip-phase0.sh

chmod +x bootstrap-paperclip-routines.sh
./bootstrap-paperclip-routines.sh

chmod +x bootstrap-paperclip-routines-idempotent.sh
./bootstrap-paperclip-routines-idempotent.sh
```

## Manual Setup Flow (If You Prefer API Calls by Hand)

1. Create goals from `goals.json`.
2. Create projects from `projects.json`.
3. Seed routine-managed issues for the first two weeks.
4. Create routines and triggers via `bootstrap-paperclip-routines.sh` or board/admin workflow.

## Idempotent Routine Sync

Use `bootstrap-paperclip-routines-idempotent.sh` when you expect reruns.

Behavior:

1. Finds existing routines by title.
2. Patches existing routines with desired assignee/project/policies.
3. Creates missing routines.
4. Adds schedule trigger only when same cron+timezone does not already exist.

## Suggested First Week Execution

1. Run bootstrap script and verify entities in Paperclip UI.
2. Create one issue per routine and assign owner agents.
3. Start two recurring routines first: `daily-manifesto-drift`, `weekly-pipeline-health`.
4. Open a single `transparency` template issue for week-end reporting.

## Notes

1. This package avoids destructive API operations.
2. `bootstrap-paperclip-phase0.sh` creates base structure and seed issues only.
3. Routines are defined in JSON; use board/admin route to register schedule triggers.
