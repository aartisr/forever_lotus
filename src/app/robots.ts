import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
import { aiCrawlerUserAgents, searchCrawlerUserAgents } from '@/config/discoverability';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/awaricon/admin'],
      },
      {
        userAgent: [...searchCrawlerUserAgents],
        allow: '/',
        disallow: ['/api/', '/awaricon/admin'],
      },
      {
        userAgent: [...aiCrawlerUserAgents, 'Google-Extended'],
        allow: '/',
        disallow: ['/api/', '/awaricon/admin'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
