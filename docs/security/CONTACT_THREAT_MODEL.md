# Contact Flow Threat Model

## Scope

- Route: `POST /api/contact`
- Client entry: contact lead-capture modal
- Integrations: Resend API, optional webhook sink

## Assets

- Investor lead identity data (name, email, notes)
- Availability and integrity of contact intake
- Email sender reputation and outbound channel trust

## Trust Boundaries

1. Public browser -> Next.js API route
2. API route -> Resend external API
3. API route -> optional webhook destination

## Primary Threats and Controls

### 1) Automated abuse / spam flood

- Controls:
  - In-memory rate limiting per IP
  - Honeypot field
  - Required consent and required contact fields

### 2) Cross-site submission abuse

- Controls:
  - Origin validation
  - Allow-list support via `CONTACT_ALLOWED_ORIGINS`

### 3) Duplicate submission replay

- Controls:
  - Request idempotency window keyed by `requestId`

### 4) Header/sender misconfiguration

- Controls:
  - Sender host sanity check against `EXPECTED_CONTACT_HOST`
  - Fail closed with explicit 5xx on misconfig

### 5) Data leakage from response caching

- Controls:
  - `Cache-Control: no-store` on API responses

## Residual Risks

- In-memory rate/idempotency storage is process-local (not distributed).
- CSP is currently report-only and not fully enforcing.
- Optional webhook reliability/availability depends on external endpoint.

## Recommended Next Controls

1. Move rate/idempotency storage to shared backing store.
2. Promote CSP to enforce mode after report analysis.
3. Add signed webhook payloads for downstream integrity.
4. Add scheduled secret rotation checks for API keys.
