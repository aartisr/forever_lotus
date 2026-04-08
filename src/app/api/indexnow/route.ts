import { NextRequest } from 'next/server';
import { badRequest, ok } from '@/lib/api-response';
import { parseJsonBody } from '@/lib/api-request';
import { siteUrl } from '@/lib/seo';
import { submitIndexNowUrls } from '@/services/indexnow';

export async function POST(request: NextRequest) {
  const { data: body, error } = await parseJsonBody<{
    urlList?: string[];
    websiteUrl?: string;
    sitemapUrl?: string;
  }>(request);

  if (error || !body) {
    return badRequest(error ?? 'Invalid request body');
  }

  const websiteUrl = body.websiteUrl || siteUrl;
  const sitemapUrl = body.sitemapUrl || new URL('/sitemap.xml', websiteUrl).toString();

  const urlList = Array.isArray(body.urlList) && body.urlList.length > 0
    ? body.urlList
    : [websiteUrl, sitemapUrl];

  const result = await submitIndexNowUrls(urlList);

  if (!result.success) {
    return badRequest(result.message);
  }

  return ok(result);
}

export const runtime = 'nodejs';
