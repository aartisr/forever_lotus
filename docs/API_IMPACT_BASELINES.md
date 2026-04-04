# Impact Baselines API

## Endpoints

1. List baselines
- GET /api/impact/baselines?limit=100

2. Create baseline
- POST /api/impact/baselines

3. Get baseline by id
- GET /api/impact/baselines/:id

4. Update baseline
- PATCH /api/impact/baselines/:id

5. Delete baseline
- DELETE /api/impact/baselines/:id

6. Generate transparency report
- GET /api/transparency/report?limit=100

## Create Payload Example

```json
{
  "key": "beneficiaries_reached",
  "title": "Beneficiaries Reached",
  "category": "impact",
  "owner": "Program Team",
  "description": "Unique beneficiaries reached by active initiatives",
  "baseline": {
    "value": 100,
    "unit": "people",
    "measuredAt": "2026-04-04T00:00:00.000Z",
    "source": "field-baseline-survey"
  },
  "current": {
    "value": 135,
    "unit": "people",
    "measuredAt": "2026-05-04T00:00:00.000Z",
    "source": "monthly-program-report"
  },
  "tags": ["pilot-a", "education"]
}
```

## Notes
- Storage is currently in-memory (for demo/prototyping).
- Replace with persistent storage for production usage.
