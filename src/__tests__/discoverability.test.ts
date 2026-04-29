import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  aiCrawlerUserAgents,
  discoverabilityRoutes,
  getRoutesForAi,
  getSitemapHints,
  isDiscoverabilityExcluded,
} from '@/config/discoverability';
import {
  getIndexNowCanonicalUrls,
  getIndexNowHost,
  getIndexNowKeyLocation,
  indexNowKeyFileName,
} from '@/lib/indexnow-urls';
import { buildAlternates } from '@/lib/seo';
import { compactJsonLd } from '@/lib/structured-data';

describe('discoverability registry', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('keeps priority pages available for AI retrieval', () => {
    const essentialPaths = getRoutesForAi('essential').map((route) => route.path);

    expect(essentialPaths).toContain('/');
    expect(essentialPaths).toContain('/manifesto');
    expect(essentialPaths).toContain('/research');
    expect(essentialPaths).toContain('/insights');
  });

  it('allows modern AI search crawlers without exposing admin routes', () => {
    expect(aiCrawlerUserAgents).toContain('OAI-SearchBot');
    expect(isDiscoverabilityExcluded('/awaricon/admin')).toBe(true);
    expect(isDiscoverabilityExcluded('/awaricon/admin/review')).toBe(true);
    expect(isDiscoverabilityExcluded('/awaricon')).toBe(false);
  });

  it('returns explicit sitemap hints for registered routes and sensible defaults', () => {
    expect(getSitemapHints('/').priority).toBe(1);
    expect(getSitemapHints('/insights/conscious-creation-framework')).toMatchObject({
      priority: 0.82,
      changeFrequency: 'monthly',
    });
    expect(discoverabilityRoutes.every((route) => route.description.length >= 120)).toBe(true);
  });

  it('publishes language alternates for every supported locale', () => {
    const alternates = buildAlternates('/manifesto', 'en');

    expect(alternates.languages).toMatchObject({
      'x-default': 'https://foreverlotus.com/manifesto',
      en: 'https://foreverlotus.com/manifesto',
      es: 'https://foreverlotus.com/manifesto?lang=es',
      pt: 'https://foreverlotus.com/manifesto?lang=pt',
      ta: 'https://foreverlotus.com/manifesto?lang=ta',
      kn: 'https://foreverlotus.com/manifesto?lang=kn',
    });
  });

  it('prepares canonical IndexNow submissions and root key discovery', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.foreverlotus.com/');

    const urls = getIndexNowCanonicalUrls();

    expect(getIndexNowHost()).toBe('www.foreverlotus.com');
    expect(getIndexNowKeyLocation()).toBe(`https://www.foreverlotus.com/${indexNowKeyFileName}`);
    expect(urls).toContain('https://www.foreverlotus.com/');
    expect(urls).toContain('https://www.foreverlotus.com/backlinks');
    expect(urls).toContain('https://www.foreverlotus.com/insights/conscious-creation-framework');
    expect(urls.some((url) => url.includes('/awaricon/admin'))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe('structured data compaction', () => {
  it('removes undefined and empty fields before JSON-LD rendering', () => {
    expect(
      compactJsonLd({
        '@type': 'Thing',
        name: 'Forever Lotus',
        sameAs: [],
        nested: {
          good: 'yes',
          missing: undefined,
        },
      })
    ).toEqual({
      '@type': 'Thing',
      name: 'Forever Lotus',
      nested: {
        good: 'yes',
      },
    });
  });
});
