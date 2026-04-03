# Weekly Content Pipeline

Use this system to turn the site into a compounding growth engine.

## Goal

Publish one high-quality insight page and three distribution assets every week.

## Weekly Cadence

### Monday: Topic Selection

- Choose one primary keyword from Search Console opportunities.
- Choose two support keywords for related internal links.
- Confirm search intent category: informational, comparison, or framework guide.

Template:

- Primary keyword:
- Support keyword 1:
- Support keyword 2:
- Search intent:
- Target URL slug:

### Tuesday: Draft Production

- Add new article object in `src/content/insights.ts`.
- Include:
  - clear title
  - high-intent description
  - 3 practical sections
  - 2 FAQ entries
  - 2 related internal links
- Keep paragraph style concise and skimmable.

### Wednesday: SEO Quality Pass

- Validate headline includes primary keyword naturally.
- Ensure meta description includes keyword and user benefit.
- Add at least two links to existing pages.
- Verify FAQ questions match real user search phrasing.

### Thursday: Distribution Assets

Create and schedule:

- 1 LinkedIn post (insight summary + link)
- 1 X/Twitter thread (5-7 points + link)
- 1 short newsletter segment (problem -> framework -> link)

### Friday: Measurement and Iteration

Track for each newly published page:

- impressions
- CTR
- average position
- engaged sessions
- linked-page click-through

If impressions rise but CTR is low:

- rewrite title and meta description

If CTR is strong but rank is low:

- improve backlinks and topical depth

## Monthly Retrospective

- Top 3 ranking pages
- Bottom 3 underperformers
- Internal links added
- External links acquired
- Topics to double down on next month

## Operational Notes

- Tracking is enabled via `NEXT_PUBLIC_GA_ID` (GA4).
- Use `data-track` attributes for high-value CTAs.
- Keep all insight content in `src/content/insights.ts` for maintainability.
