import type { MetadataRoute } from 'next';
import { buildPageUrl } from '@/lib/seo';

const routes = ['/', '/about', '/manifesto', '/philosophy', '/research'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: buildPageUrl(route, 'en'),
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
    alternates: {
      languages: {
        en: buildPageUrl(route, 'en'),
        es: buildPageUrl(route, 'es'),
      },
    },
  }));
}
