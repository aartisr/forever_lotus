import type { MetadataRoute } from 'next';
import { buildPageUrl } from '@/lib/seo';
import { insightSlugs } from '@/content/insights';

const coreRoutes = ['/', '/about', '/manifesto', '/philosophy', '/research', '/insights', '/growth'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const insightRoutes = insightSlugs.map((slug) => `/insights/${slug}`);

  const allRoutes = [...coreRoutes, ...insightRoutes];

  return allRoutes.map((route) => ({
    url: buildPageUrl(route, 'en'),
    lastModified: now,
    changeFrequency: route === '/' || route === '/insights' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/insights/') ? 0.76 : 0.84,
    alternates: {
      languages: {
        en: buildPageUrl(route, 'en'),
        es: buildPageUrl(route, 'es'),
      },
    },
  }));
}
