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
  Populate any real public profile URLs so the Organization schema can disambiguate the brand across search engines and AI systems.
- `INDEXNOW_KEY`
  Required for live IndexNow URL submission.
- `INDEXNOW_KEY_LOCATION`
  Optional override for the hosted key file URL.
- `NEXT_PUBLIC_GA_ID`
  Enables Google Analytics pageview and CTA/share click tracking.

## Launch Checklist

1. Verify the production domain in Google Search Console and Bing Webmaster Tools.
2. Submit `https://<your-domain>/sitemap.xml` in both consoles.
3. Confirm `https://<your-domain>/robots.txt`, `https://<your-domain>/rss.xml`, `https://<your-domain>/llms.txt`, and `https://<your-domain>/llms-full.txt` are publicly reachable.
4. Host the IndexNow key file and submit the homepage, insights hub, and any newly published insight URLs through the existing IndexNow endpoint.
5. Test the homepage and one insight article in Google Rich Results Test and social preview debuggers.
6. Validate that public social profile URLs, if configured, resolve to the correct brand accounts.

## Ongoing Distribution Ritual

1. Publish new insight articles in tightly related topic clusters instead of one-off posts.
2. Immediately submit fresh URLs through IndexNow and request indexing in Search Console for priority pages.
3. Share each insight with a distinct angle on X, LinkedIn, email, and partner communities using the in-page share tools.
4. Link every new insight from at least one older related insight to strengthen internal topical authority.
5. Review top-performing search terms and publish follow-up articles that deepen the cluster rather than drifting into unrelated topics.
