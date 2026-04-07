# Import and Activation Runbook

This runbook turns the Forever Lotus Universe Company package into an active growth-and-trust operating system.

## 1) Preconditions

- Paperclip control plane is reachable.
- You have CLI access to the repo root.
- You can provide required secrets at import/runtime.

Package path:

- ./paperclip-company/forever-lotus-company

## 2) Import

Run from repository root:

```bash
paperclipai company import --from ./paperclip-company/forever-lotus-company
```

Expected result:

- Company imports successfully.
- Agent roster, teams, projects, and tasks appear in control plane.

## 3) Configure Secrets

This package declares optional GH_TOKEN usage for key leadership and execution agents in .paperclip.yaml.

Minimum recommended setup:

- GH_TOKEN for agents that need repository operations.

If your runtime supports secret prompts at import time, provide GH_TOKEN there. Otherwise set or attach secrets using your control plane secret workflow.

## 4) First Activation (Day 0)

Open the imported company and verify:

- CEO agent exists and is top-level manager.
- Growth-first and trust-second priorities are visible in company docs.
- Ninety Day Growth Trust Command project is present.

Then trigger these routines first:

1. daily-telemetry-anomaly-scan
2. weekly-manifesto-compliance-drift
3. weekly-quality-gate
4. weekly-growth-trust-war-room
5. scorecard-0-30-growth-trust

## 5) Week 1 Launch Plan

Day 1:

- Run weekly-kpi-baseline-reconciliation.
- Run executive-scorecard.
- CEO publishes first weekly priority stack.

Day 2:

- Run content-seo-sprint.
- Run conversion-optimization-cycle.

Day 3:

- Run weekly-institutional-outreach-followup.
- Run trust-security-review.

Day 4:

- Validate blockers and approval gates through compliance-reviewer and governance-lead.

Day 5:

- Run weekly-growth-trust-war-room.
- Update owners and deadlines for next weekly cycle.

## 6) 90-Day Command Rhythm

0-30 days:

- Use scorecard-0-30-growth-trust to lock baselines, ownership, and control loops.

31-60 days:

- Switch execution emphasis to scorecard-31-60-growth-trust for acceleration.

61-90 days:

- Run scorecard-61-90-growth-trust for evidence consolidation and next-quarter reset.

Every month:

- monthly-governance-ethics-review
- monthly-trust-report
- monthly-reliability-drill
- monthly-strategy-reset

Every quarter:

- quarterly-standards-influence-review

## 7) Activation Health Checks

Your activation is healthy when all conditions are true:

- Weekly growth-trust war room is running on schedule.
- Quality and trust reviews produce explicit pass/block outcomes.
- Evidence lead publishes KPI confidence notes with traceable sources.
- CEO priority stack updates weekly with measurable outcomes.

## 8) Rollback and Recovery

If activation quality is poor in week 1:

1. Pause non-critical new initiatives.
2. Keep only growth-trust core loops active.
3. Re-run weekly-kpi-baseline-reconciliation.
4. Re-issue a simplified weekly priority stack from CEO.

Core loops to keep even in rollback mode:

- daily-telemetry-anomaly-scan
- weekly-quality-gate
- trust-security-review
- weekly-growth-trust-war-room
