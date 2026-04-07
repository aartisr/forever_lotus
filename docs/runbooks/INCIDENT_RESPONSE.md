# Incident Response Runbook

## Severity Levels

- SEV-1: Complete outage or critical security incident.
- SEV-2: Partial outage or major degradation in critical flows.
- SEV-3: Non-critical failure with workaround.

## First 15 Minutes

1. Acknowledge incident and assign an incident commander.
2. Capture scope: affected routes, environments, and user impact.
3. Freeze non-essential deployments.
4. Create a single incident channel and timeline log.

## Immediate Diagnostics

1. Check health endpoints and error rates:
   - `GET /api/health/data-layer`
2. Validate latest deployment and commit SHA.
3. Verify external dependencies:
   - Resend status and API key validity for contact flow.
4. Check recent application logs for top errors.

## Mitigation Options

1. Roll back to the last known good deployment.
2. Disable risky feature flags or routes if available.
3. Apply hotfix on a short-lived branch with focused scope.

## Communication

1. Update stakeholders every 15-30 minutes for SEV-1/SEV-2.
2. Include impact, mitigation status, and next ETA.
3. Post external status update when user-facing disruption is confirmed.

## Resolution and Exit Criteria

1. Error rates and latency return to baseline.
2. Critical path smoke tests pass:
   - homepage render
   - contact submission path
   - key API health checks
3. Monitoring remains stable for at least 30 minutes.

## Postmortem (Within 48 Hours)

1. Root cause and contributing factors.
2. What detection and response missed.
3. Corrective and preventive actions with owners and due dates.
