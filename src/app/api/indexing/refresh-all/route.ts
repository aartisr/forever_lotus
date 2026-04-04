import { NextRequest } from 'next/server';
import { SearchIndexingService } from '@/services/search-indexing-service';
import { ok, serverError, unauthorized } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const expected = process.env.INDEXING_CRON_TOKEN;
    const token = request.headers.get('x-cron-token');

    if (expected && token !== expected) {
      return unauthorized();
    }

    const records = await SearchIndexingService.refreshAll();

    return ok({
      total: records.length,
      refreshedAt: new Date().toISOString(),
      records,
    });
  } catch (error) {
    console.error('Refresh all error:', error);
    return serverError('Failed to refresh all indexing records');
  }
}

export const runtime = 'nodejs';
