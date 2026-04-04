import { SearchIndexingService } from '@/services/search-indexing-service';
import { notFound, ok, serverError } from '@/lib/api-response';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const record = await SearchIndexingService.getRecord(id);

    if (!record) {
      return notFound('Indexing record not found');
    }

    return ok(record);
  } catch (error) {
    console.error('Fetch error:', error);
    return serverError('Failed to fetch indexing record');
  }
}

export const runtime = 'nodejs';
