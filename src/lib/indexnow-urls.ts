import { discoverabilityRoutes } from '@/config/discoverability';
import { insightSlugs } from '@/content/insights';
import { siteUrl } from '@/lib/seo';

export const indexNowKeyFileName = 'indexnow-key.txt';

const staticIndexNowPaths = [
  '/',
  '/about',
  '/manifesto',
  '/philosophy',
  '/research',
  '/insights',
  '/insights/indexing',
  '/insights/indexing/portfolio',
  '/growth',
  '/ecosystem',
  '/backlinks',
  '/onboarding-websites',
  '/evaluate',
  '/awaricon',
  '/awaricon/apply',
  '/awaricon/badge-generator',
  '/awaricon/compliance',
  '/awaricon/legal',
  '/contact',
] as const;

function configuredSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || siteUrl).replace(/\/+$/, '');
}

function toAbsoluteUrl(url: string): string {
  return new URL(url, configuredSiteUrl()).toString();
}

export function getIndexNowKeyLocation(): string {
  if (process.env.INDEXNOW_KEY_LOCATION) {
    return process.env.INDEXNOW_KEY_LOCATION;
  }

  return toAbsoluteUrl(`/${indexNowKeyFileName}`);
}

export function getIndexNowHost(): string {
  return new URL(configuredSiteUrl()).hostname;
}

export function uniqueAbsoluteUrls(urls: string[]): string[] {
  return Array.from(
    new Set(
      urls
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url) => toAbsoluteUrl(url))
    )
  );
}

export function getIndexNowCanonicalUrls(): string[] {
  const canonicalPaths = [
    ...staticIndexNowPaths,
    ...discoverabilityRoutes.map((route) => route.path),
    ...insightSlugs.map((slug) => `/insights/${slug}`),
  ];

  return uniqueAbsoluteUrls(canonicalPaths);
}
