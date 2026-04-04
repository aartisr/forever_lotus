import { NextRequest } from 'next/server';
import { SearchIndexingService } from '@/services/search-indexing-service';
import { badRequest, ok, serverError } from '@/lib/api-response';
import { parseJsonBody, requireFields } from '@/lib/api-request';

export async function POST(request: NextRequest) {
  try {
    const { data: body, error: parseError } = await parseJsonBody<{
      websiteUrl?: string;
      websiteName?: string;
      sitemapUrl?: string;
      feedUrl?: string;
    }>(request);

    if (parseError || !body) {
      return badRequest(parseError ?? 'Invalid request body');
    }

    const missing = requireFields(body as Record<string, unknown>, ['websiteUrl', 'websiteName', 'sitemapUrl']);
    if (missing) {
      return badRequest(`websiteUrl, websiteName, and sitemapUrl are required`);
    }

    const record = await SearchIndexingService.submitWebsite({
      websiteUrl: body.websiteUrl!,
      websiteName: body.websiteName!,
      sitemapUrl: body.sitemapUrl!,
      feedUrl: body.feedUrl,
    });

    return ok(record);
  } catch (error) {
    console.error('Submission error:', error);
    return serverError('Failed to submit website for indexing');
  }
}

export const runtime = 'nodejs';
