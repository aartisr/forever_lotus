# Discoverability Operations

Use this checklist after deploying `forever_lotus` so the technical SEO and social-sharing hooks in the app turn into real-world coverage.

## Required Environment Variables

- `NEXT_PUBLIC_SITE_URL`
  Use the final canonical production origin, for example `https://foreverlotus.com`.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  Enables Google Search Console verification metadata.
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
  Enables Bing Webmaster Tools verification metadata.
- `NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION`
  Enables Facebook domain verification metadata for link-sharing integrity.
- `NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFICATION`
  Enables Pinterest domain verification metadata.
- `NEXT_PUBLIC_X_HANDLE`
  Adds the canonical X handle to Twitter card metadata if the account is real and active.
- `NEXT_PUBLIC_X_PROFILE_URL`
- `NEXT_PUBLIC_LINKEDIN_PROFILE_URL`
- `NEXT_PUBLIC_INSTAGRAM_PROFILE_URL`
- `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL`
- `NEXT_PUBLIC_FACEBOOK_PAGE_URL`
- `NEXT_PUBLIC_TIKTOK_PROFILE_URL`
- `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL`
- `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER`
  Populate any real public profile URLs so the Organization schema can disambiguate the brand across search engines and AI systems. For WhatsApp, use either a public Channel URL or the public business phone number.
  `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER` is only used as a fallback when there is no public WhatsApp Channel URL.
- `INDEXNOW_KEY`
  Required for live IndexNow URL submission.
- `INDEXNOW_KEY_LOCATION`
  Optional override for the hosted key file URL.
- `NEXT_PUBLIC_GA_ID`
  Enables Google Analytics pageview and CTA/share click tracking.

## IndexNow Submission

The repository includes `npm run seo:indexnow`, which submits every indexable application page and every insight article to `https://api.indexnow.org/indexnow`. It discovers static routes from `src/app`, excludes the private `/awaricon/admin` route, and reads insight slugs from `src/content/insights.ts`. Requests are automatically split into batches of at most 10,000 URLs.

1. Generate an IndexNow key and set it in the production environment as `INDEXNOW_KEY`.
2. Deploy the application, then confirm `https://<your-domain>/indexnow-key.txt` returns that exact key. The app exposes this route automatically. If the key is hosted elsewhere, set `INDEXNOW_KEY_LOCATION` to its public HTTPS URL.
3. Set `NEXT_PUBLIC_SITE_URL` to the deployed canonical origin, without a path.
4. Submit all current canonical URLs:

   ```bash
   NEXT_PUBLIC_SITE_URL=https://foreverlotus.com INDEXNOW_KEY=your-key npm run seo:indexnow
   ```

`postbuild` also runs this script. It is a no-op when `INDEXNOW_KEY` is absent, so local builds and preview builds do not accidentally submit URLs. To make a failed submission fail the build or CI job, set `INDEXNOW_REQUIRED=1`.

For an urgent, targeted resubmission, provide a comma-separated list of absolute URLs or site-relative paths:

```bash
NEXT_PUBLIC_SITE_URL=https://foreverlotus.com INDEXNOW_KEY=your-key \\
INDEXNOW_URLS=/insights/new-article,https://foreverlotus.com/research \\
npm run seo:indexnow
```

Do not commit the key. A successful response means the IndexNow endpoint accepted the notification; it does not guarantee that a search engine will crawl or index a page immediately.

## Launch Checklist

1. Verify the production domain in Google Search Console and Bing Webmaster Tools.
2. Submit `https://<your-domain>/sitemap.xml` in both consoles.
3. Confirm `https://<your-domain>/robots.txt`, `https://<your-domain>/rss.xml`, `https://<your-domain>/llms.txt`, and `https://<your-domain>/llms-full.txt` are publicly reachable.
4. Host the IndexNow key file and run `npm run seo:indexnow` to submit all indexable URLs.
5. Test the homepage and one insight article in Google Rich Results Test and social preview debuggers.
6. Validate that public social profile URLs, if configured, resolve to the correct brand accounts.

## Ongoing Distribution Ritual

1. Publish new insight articles in tightly related topic clusters instead of one-off posts.
2. Immediately submit fresh URLs through IndexNow and request indexing in Search Console for priority pages.
3. Share each insight with a distinct angle on Facebook, WhatsApp, X, LinkedIn, email, and partner communities using the in-page share tools.
4. Link every new insight from at least one older related insight to strengthen internal topical authority.
5. Review top-performing search terms and publish follow-up articles that deepen the cluster rather than drifting into unrelated topics.
