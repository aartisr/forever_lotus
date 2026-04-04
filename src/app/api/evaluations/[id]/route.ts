import { NextRequest } from 'next/server';
import { EvaluationStorage } from '@/services/evaluation-storage';
import { notFound, ok, serverError } from '@/lib/api-response';

/**
 * GET /api/evaluations/:id
 * Get a specific evaluation by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const record = await EvaluationStorage.get(id);

    if (!record) {
      return notFound('Evaluation not found');
    }

    return ok({
      id: record.id,
      result: record.result,
      status: record.status,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      notes: record.notes,
    });
  } catch (error) {
    console.error('Retrieval error:', error);
    return serverError('Failed to retrieve evaluation');
  }
}

export const runtime = 'nodejs';
