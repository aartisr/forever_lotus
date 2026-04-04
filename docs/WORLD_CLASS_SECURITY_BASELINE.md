# World-Class Security Baseline

## Goal
Reduce preventable security risk through policy, automation, and review cadence.

## Minimum Controls

1. Dependency security
- Continuous dependency scanning.
- Patch cadence with severity SLAs.

2. Secrets hygiene
- No secrets in repository.
- Pre-commit and CI secret scanning.

3. Threat modeling
- Document top assets, threats, and mitigations.
- Review after major architecture changes.

4. Access control
- Least-privilege repository and deployment access.
- Periodic access review.

5. Incident readiness
- Security incident playbook.
- Severity model and escalation chain.

## Security Review Cadence

1. Monthly: dependency and secret scan review.
2. Quarterly: threat model refresh.
3. Annually: external security assessment.
