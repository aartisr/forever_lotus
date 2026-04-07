import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { buildPageUrl } from '@/lib/seo';
import { insightSlugs } from '@/content/insights';

const APP_DIR = path.join(process.cwd(), 'src', 'app');
const EXCLUDED_ROUTE_PREFIXES = ['/awaricon/admin'];

function isRouteGroup(segment: string) {
  return segment.startsWith('(') && segment.endsWith(')');
}

function isDynamicSegment(segment: string) {
  return segment.startsWith('[') && segment.endsWith(']');
}

function isExcludedRoute(route: string) {
  return EXCLUDED_ROUTE_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`));
}

function discoverStaticPageRoutes() {
  const discovered = new Set<string>();

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile() || !/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        continue;
      }

      const relativeDir = path.relative(APP_DIR, path.dirname(fullPath));
      const rawSegments = relativeDir === '' ? [] : relativeDir.split(path.sep).filter(Boolean);
      const segments = rawSegments.filter((segment) => !isRouteGroup(segment));

      if (segments.some((segment) => isDynamicSegment(segment))) {
        continue;
      }

      if (segments.some((segment) => segment.startsWith('_'))) {
        continue;
      }

      const route = segments.length === 0 ? '/' : `/${segments.join('/')}`;
      if (isExcludedRoute(route)) {
        continue;
      }

      discovered.add(route);
    }
  }

  walk(APP_DIR);
  return Array.from(discovered).sort((a, b) => a.localeCompare(b));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = discoverStaticPageRoutes();

  const insightRoutes = insightSlugs.map((slug) => `/insights/${slug}`);

  const allRoutes = Array.from(new Set([...staticRoutes, ...insightRoutes])).sort((a, b) => a.localeCompare(b));

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
