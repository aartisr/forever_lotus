import { describe, expect, it } from 'vitest';
import {
  aiCrawlerUserAgents,
  discoverabilityRoutes,
  getRoutesForAi,
  getSitemapHints,
  isDiscoverabilityExcluded,
} from '@/config/discoverability';
import { compactJsonLd } from '@/lib/structured-data';

describe('discoverability registry', () => {
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
    expect(discoverabilityRoutes.every((route) => route.description.length > 40)).toBe(true);
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

