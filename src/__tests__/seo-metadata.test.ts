import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { discoverabilityRoutes } from '@/config/discoverability';
import { growthPageContent } from '@/content/growth';
import { insightArticles } from '@/content/insights';
import { insightsIndexContent } from '@/content/insights-index';
import { enMessages } from '@/i18n/messages/en';
import { siteDescription } from '@/lib/seo';

const MIN_META_DESCRIPTION_LENGTH = 120;

function walkFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return entry.isFile() ? [fullPath] : [];
  });
}

function getStaticPageDescriptions() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const descriptionPattern = /const description =\s*\n\s*'([^']+)';/g;

  return walkFiles(appDir)
    .filter((filePath) => filePath.endsWith('page.tsx'))
    .filter((filePath) => !filePath.endsWith(path.join('awaricon', 'admin', 'page.tsx')))
    .flatMap((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8');
      return Array.from(source.matchAll(descriptionPattern)).map((match) => ({
        source: path.relative(process.cwd(), filePath),
        description: match[1],
      }));
    });
}

describe('SEO metadata descriptions', () => {
  it('keeps public metadata descriptions substantial for Bing and social previews', () => {
    const descriptions = [
      { source: 'siteDescription', description: siteDescription },
      { source: 'insightsIndex.metadata.description', description: insightsIndexContent.metadata.description },
      { source: 'insightsIndex.metadata.ogDescription', description: insightsIndexContent.metadata.ogDescription },
      { source: 'growthPageContent.description', description: growthPageContent.description },
      { source: 'en.manifesto.meta.description', description: enMessages.manifesto.meta.description },
      { source: 'en.philosophy.meta.description', description: enMessages.philosophy.meta.description },
      { source: 'en.researchPage.meta.description', description: enMessages.researchPage.meta.description },
      { source: 'en.about.meta.description', description: enMessages.about.meta.description },
      ...discoverabilityRoutes.map((route) => ({
        source: `discoverability:${route.path}`,
        description: route.description,
      })),
      ...insightArticles.map((article) => ({
        source: `insight:${article.slug}`,
        description: article.description,
      })),
      ...getStaticPageDescriptions(),
    ];

    const shortDescriptions = descriptions
      .filter((entry) => entry.description.length < MIN_META_DESCRIPTION_LENGTH)
      .map((entry) => `${entry.source} (${entry.description.length})`);

    expect(shortDescriptions).toEqual([]);
  });
});
