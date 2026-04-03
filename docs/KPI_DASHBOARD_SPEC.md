# KPI Dashboard Spec

Use this spec to build your weekly and monthly dashboard in GA4 + Search Console + backlink tracker.

## Primary Objective

Track whether growth is compounding across discovery, engagement, and conversion.

## KPI Groups

## 1) Discovery

- Organic impressions (Search Console)
- Indexed pages count
- Average position (priority URLs)
- New ranking keywords (Top 50 and Top 10)

## 2) Engagement Quality

- Organic sessions
- Engaged session rate
- Average engagement time
- Scroll depth or page completion (if available)

## 3) Conversion and Intent

- CTA clicks by `data-track` label
- CTA conversion rate by page
- Assisted conversions from insight pages
- Return visit rate (30-day)

## 4) Authority and Distribution

- New referring domains
- Backlink quality score (manual rubric)
- Social referral sessions
- Newsletter referral sessions

## Suggested Targets (First 90 Days)

- Impressions: +20% month over month
- Priority URL rank: Top 10 for 5 pages
- Organic CTR: >3.5%
- Engaged session rate: >60%
- CTA conversion: >4%
- Referring domains: +8 per month

## Query Layer

## Search Console Views

- Query x Page by clicks, impressions, CTR, position
- Priority page group trendline
- Non-branded query growth report

## GA4 Views

- Landing page x source/medium x engaged sessions
- Event report for `select_content` filtered by CTA labels
- Funnel: landing page -> CTA click -> destination page session

## Operating Rhythm

- Weekly: optimization decisions
- Monthly: strategy decisions
- Quarterly: architecture and positioning decisions

## Weekly Decision Rules

- High impressions + low CTR -> rewrite title and meta
- High CTR + low rank -> improve links and topical depth
- High traffic + low CTA rate -> improve CTA relevance and section placement
- Low impressions + high quality signals -> increase distribution and backlinks
