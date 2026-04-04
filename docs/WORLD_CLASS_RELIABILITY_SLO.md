# World-Class Reliability and SLO Baseline

## Scope
Define production reliability targets and incident response expectations.

## Initial SLOs

1. Availability
- Target: 99.9% monthly uptime for public site/API.

2. Latency
- Target: P95 page load under agreed threshold per route class.

3. Error Rate
- Target: server error rate below defined threshold.

## Incident Management

1. Severity levels
- Sev1: user-impacting outage.
- Sev2: degraded core function.
- Sev3: minor impairment.

2. Response expectations
- Sev1 ack within 15 minutes.
- Sev2 ack within 60 minutes.
- Sev3 next business cycle.

3. Post-incident
- Blameless postmortem within 5 business days.
- Corrective actions tracked to closure.

## Reliability Operating Rhythm

1. Weekly reliability review.
2. Monthly SLO report.
3. Quarterly reliability architecture review.
