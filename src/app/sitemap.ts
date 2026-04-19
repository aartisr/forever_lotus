import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { buildPageUrl } from '@/lib/seo';
import { insightSlugs } from '@/content/insights';
import { supportedLocales } from '@/i18n';

const APP_DIR = path.join(process.cwd(), 'src', 'app');
const INSIGHTS_CONTENT_PATH = path.join(process.cwd(), 'src', 'content', 'insights.ts');
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

function fileLastModified(filePath: string) {
  return fs.statSync(filePath).mtime;
}

function discoverStaticPageRoutes() {
  const discovered = new Map<string, Date>();

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

      discovered.set(route, fileLastModified(fullPath));
    }
  }

  walk(APP_DIR);
  return Array.from(discovered.entries())
    .map(([route, lastModified]) => ({ route, lastModified }))
    .sort((a, b) => a.route.localeCompare(b.route));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = discoverStaticPageRoutes();

  const insightRoutes = insightSlugs.map((slug) => ({
    route: `/insights/${slug}`,
    lastModified: fileLastModified(INSIGHTS_CONTENT_PATH),
  }));

  const allRoutes = Array.from(
    new Map(
      [...staticRoutes, ...insightRoutes].map((entry) => [entry.route, entry])
    ).values()
  ).sort((a, b) => a.route.localeCompare(b.route));

  return allRoutes.map(({ route, lastModified }) => ({
    url: buildPageUrl(route, 'en'),
    lastModified,
    changeFrequency:
      route === '/' || route === '/insights' || route.startsWith('/insights/')
        ? 'weekly'
        : 'monthly',
    priority:
      route === '/'
        ? 1
        : route === '/manifesto' || route === '/philosophy' || route === '/research'
          ? 0.9
          : route.startsWith('/insights/')
            ? 0.8
            : 0.76,
    alternates: {
      languages: Object.fromEntries(
        supportedLocales.map((locale) => [locale, buildPageUrl(route, locale)])
      ),
    },
  }));
}
