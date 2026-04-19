import { insightArticles } from '@/content/insights';
import { buildPageUrl, siteName, siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function articlePublishedAt(index: number): string {
  const base = Date.UTC(2025, 0, 15);
  const twoWeeksMs = 14 * 24 * 60 * 60 * 1000;
  return new Date(base + index * twoWeeksMs).toUTCString();
}

export async function GET() {
  const itemsXml = insightArticles
    .map((article, index) => {
      const url = buildPageUrl(`/insights/${article.slug}`);

      return [
        '<item>',
        `<title>${escapeXml(article.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description>${escapeXml(article.description)}</description>`,
        `<category>${escapeXml(article.keyword)}</category>`,
        `<pubDate>${articlePublishedAt(index)}</pubDate>`,
        '</item>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${escapeXml(siteName)} Insights</title>`,
    `<link>${escapeXml(buildPageUrl('/insights'))}</link>`,
    '<description>Insights on conscious creation, compassion, dignity, and ethical leadership.</description>',
    '<language>en-us</language>',
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `<docs>${escapeXml('https://www.rssboard.org/rss-specification')}</docs>`,
    `<generator>${escapeXml(`${siteName} Next.js RSS`)}</generator>`,
    itemsXml,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
