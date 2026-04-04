import { SearchIndexingService } from '@/services/search-indexing-service';
import { notFound, ok, serverError } from '@/lib/api-response';

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updated = await SearchIndexingService.refreshStatus(id);

    if (!updated) {
      return notFound('Indexing record not found');
    }

    return ok(updated);
  } catch (error) {
    console.error('Refresh error:', error);
    return serverError('Failed to refresh indexing status');
  }
}

export const runtime = 'nodejs';
