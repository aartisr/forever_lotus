import { insightArticles } from '@/content/insights';
import { aiCitationGuidance, getRoutesForAi } from '@/config/discoverability';
import { buildPageUrl, founderName, siteDescription, siteName, siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

function topInsights(limit: number) {
  return insightArticles.slice(0, limit);
}

function formatRouteLine(route: ReturnType<typeof getRoutesForAi>[number]) {
  return `- [${route.title}](${buildPageUrl(route.path)}): ${route.description}`;
}

export async function GET() {
  const essentialRouteLines = getRoutesForAi('essential')
    .map(formatRouteLine)
    .join('\n');
  const supportingRouteLines = getRoutesForAi('supporting')
    .map(formatRouteLine)
    .join('\n');
  const topArticleLines = topInsights(8)
    .map((article) => `- [${article.title}](${buildPageUrl(`/insights/${article.slug}`)}): ${article.description}`)
    .join('\n');
  const citationGuidanceLines = aiCitationGuidance
    .map((item) => `- ${item}`)
    .join('\n');

  const body = [
    `# ${siteName} - LLM Discovery`,
    '',
    `Summary: ${siteDescription}`,
    `Founder: ${founderName}`,
    '',
    `Website: ${siteUrl}`,
    `Sitemap: ${buildPageUrl('/sitemap.xml')}`,
    `RSS: ${buildPageUrl('/rss.xml')}`,
    `Full LLM Index: ${buildPageUrl('/llms-full.txt')}`,
    '',
    '## Essential Pages',
    essentialRouteLines,
    '',
    '## Supporting Pages',
    supportingRouteLines,
    '',
    '## Top Insights',
    topArticleLines,
    '',
    '## Citation Guidance',
    citationGuidanceLines,
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
