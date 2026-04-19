# Forever Lotus Viral Search Playbook

This checklist is built to maximize ranking velocity after deployment.

## 1) Launch Prerequisites

- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- Set verification env vars after obtaining search console tokens:
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  - `NEXT_PUBLIC_YANDEX_VERIFICATION`
  - `NEXT_PUBLIC_YAHOO_VERIFICATION`
- Deploy and confirm these URLs are live:
  - `/robots.txt`
  - `/sitemap.xml`
  - `/llms.txt`
  - `/llms-full.txt`
  - `/rss.xml`
  - `/manifest.webmanifest`
  - `/opengraph-image`
  - `/twitter-image`

## 2) Submit To Search Engines

Submit `https://your-domain/sitemap.xml` to:

- Google Search Console
- Bing Webmaster Tools
- Yandex Webmaster
- Baidu Search Resource Platform
- Naver Search Advisor
- Seznam Webmaster

Note: Some engines consume Bing/IndexNow feeds indirectly, but direct submission still helps indexing speed.

## 3) Indexing Acceleration

- Connect Cloudflare + enable IndexNow ping support (or a separate IndexNow pinger).
- Use the built-in API endpoint to push URL batches after each content update:
  - `POST /api/indexnow` with `urlList`, `websiteUrl`, and `sitemapUrl`
- Publish 5-10 supporting articles that link into core pages:
  - Manifesto
  - Philosophy
  - Research
- Build a weekly posting cadence with social snippets linking to deep pages, not only home.

## 4) Authority Growth (Most Important)

- Acquire high-trust backlinks from:
  - University blogs or research forums
  - NGO / humanitarian communities
  - Philosophy, ethics, and education publications
- Repurpose one section of the manifesto into guest posts with canonical references.
- Publish a downloadable PDF whitepaper and earn citations from external domains.

## 5) CTR Optimization

- Test title and description variants every 2-3 weeks.
- Use emotionally specific titles on high-intent pages.
- Keep title length around 50-60 chars and meta description around 140-160 chars.

## 6) Content Expansion For Long-Tail Search

Create dedicated pages for:

- conscious creation framework
- lotus symbolism in buddhism and hinduism
- dignity-centered humanitarian design
- compassion research and wellbeing evidence
- eastern philosophy for leadership and ethics

Each page should:

- target one primary keyword cluster
- include FAQ blocks
- link to at least 2 existing pages
- include structured data when relevant

## 7) Performance Guardrails

- Keep LCP below 2.5s on mobile.
- Keep CLS below 0.1.
- Ensure all pages pass mobile usability checks.
- Use compressed images and avoid oversized media on first paint.

## 8) Measurement Loop

Track weekly:

- impressions by query
- average position
- click-through rate
- indexed pages
- referring domains growth

If impressions rise but CTR is flat, improve metadata copy.
If indexed pages are flat, improve internal linking and publish fresh pages.
If average position is flat, prioritize backlinks and topical depth.

## 9) AI Search Surface Area

- Keep `/llms.txt` concise and updated with top canonical pages.
- Keep `/llms-full.txt` comprehensive with all critical URLs and topic labels.
- Maintain structured data on high-intent pages (Article, FAQ, WebSite, Organization).
- Syndicate insights through `/rss.xml` so AI retrieval systems can detect fresh updates quickly.

## 10) Reality Check

No team can guarantee rank #1 across all top search engines for competitive terms.
The reliable path is: technical SEO + topical authority + quality backlinks + high CTR over time.

This repository now includes technical SEO foundations; ranking gains now depend on distribution and authority execution.
