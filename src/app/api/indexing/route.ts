import { NextRequest } from 'next/server';
import { SearchIndexingService } from '@/services/search-indexing-service';
import { ok, serverError } from '@/lib/api-response';
import { queryInt } from '@/lib/api-request';

export async function GET(request: NextRequest) {
  try {
    const limit = queryInt(request, 'limit', 25);

    const records = await SearchIndexingService.listRecords(limit);

    return ok({
      total: records.length,
      records,
    });
  } catch (error) {
    console.error('List indexing records error:', error);
    return serverError('Failed to list indexing records');
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
