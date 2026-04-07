# Forever Lotus Operating Company

Agent company package for running forever_lotus as a governed execution system inside Paperclip.

## What This Company Does

- Converts strategy into weekly execution across product, growth, trust, and reliability.
- Uses a hub-and-spoke workflow with explicit handoffs and approvals.
- Enforces quality and governance gates before high-risk changes ship.

## Workflow

1. CEO sets priorities and assigns work to department leads.
2. Department specialists execute scoped tasks and produce artifacts.
3. Compliance/reliability agents validate evidence and approve release readiness.
4. Executive scorecard summarizes KPI movement and next priorities.

## Org Chart

- ceo: Chief Executive Officer (reportsTo: null)
- product-lead: Product Lead (reportsTo: ceo)
- ux-systems: UX Systems Agent (reportsTo: product-lead)
- frontend-implementation: Frontend Implementation Agent (reportsTo: product-lead)
- growth-strategist: Growth Strategist Agent (reportsTo: ceo)
- editorial: Editorial Agent (reportsTo: growth-strategist)
- distribution: Distribution Agent (reportsTo: growth-strategist)
- security-risk: Security and Risk Agent (reportsTo: ceo)
- transparency: Transparency Agent (reportsTo: security-risk)
- compliance-reviewer: Compliance Reviewer Agent (reportsTo: security-risk)
- platform-reliability: Platform Reliability Agent (reportsTo: ceo)
- incident-commander: Incident Commander Agent (reportsTo: platform-reliability)
- qa-verification: QA Verification Agent (reportsTo: platform-reliability)

## Included Projects

- core-website-excellence
- trust-governance
- growth-engine

## Getting Started

Import with Paperclip CLI:

```bash
paperclipai company import --from ./paperclip-company/forever-lotus-company
```

## References

- Source repo: https://github.com/aartisr/forever_lotus
- Agent Companies spec: https://agentcompanies.io/specification
- Paperclip: https://github.com/paperclipai/paperclip
