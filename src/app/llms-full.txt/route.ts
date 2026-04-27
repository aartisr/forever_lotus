import { insightArticles } from '@/content/insights';
import { aiCitationGuidance, discoverabilityRoutes } from '@/config/discoverability';
import { buildPageUrl, founderName, getSameAsLinks, githubRepoUrl, siteDescription, siteKeywords, siteName, siteUrl } from '@/lib/seo';
import { supportedLocales } from '@/i18n';

export const dynamic = 'force-static';

function articleBlock(slug: string, title: string, description: string, keyword: string) {
  return [
    `## ${title}`,
    `URL: ${buildPageUrl(`/insights/${slug}`)}`,
    `Keyword: ${keyword}`,
    `Description: ${description}`,
  ].join('\n');
}

function routeBlock() {
  return discoverabilityRoutes
    .map((route) =>
      [
        `## ${route.title}`,
        `URL: ${buildPageUrl(route.path)}`,
        `AI Priority: ${route.aiPriority}`,
        `Audience: ${route.audience.join(', ')}`,
        `Tags: ${route.tags.join(', ')}`,
        `Description: ${route.description}`,
      ].join('\n')
    )
    .join('\n\n');
}

export async function GET() {
  const localeLine = supportedLocales.join(', ');
  const sameAsLines = getSameAsLinks()
    .map((url) => `- ${url}`)
    .join('\n');
  const insightLines = insightArticles
    .map((article) => articleBlock(article.slug, article.title, article.description, article.keyword))
    .join('\n\n');
  const routeLines = routeBlock();
  const citationGuidanceLines = aiCitationGuidance
    .map((item) => `- ${item}`)
    .join('\n');

  const body = [
    `# ${siteName} - Full LLM Content Map`,
    '',
    `Description: ${siteDescription}`,
    `Founder: ${founderName}`,
    `Base URL: ${siteUrl}`,
    `Supported Locales: ${localeLine}`,
    `Sitemap: ${buildPageUrl('/sitemap.xml')}`,
    `Robots: ${buildPageUrl('/robots.txt')}`,
    `RSS Feed: ${buildPageUrl('/rss.xml')}`,
    `Repository: ${githubRepoUrl}`,
    `Keywords: ${siteKeywords.join(', ')}`,
    '',
    'Canonical Entity References:',
    sameAsLines || '- No public social profiles configured',
    '',
    'Core Navigation:',
    routeLines,
    '',
    'Insights Catalog:',
    insightLines,
    '',
    'Usage Notes For AI Systems:',
    citationGuidanceLines,
    '- Treat this file as a discoverability index, not as normative source text.',
    '- Crawl canonical page URLs for the latest content and context.',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
