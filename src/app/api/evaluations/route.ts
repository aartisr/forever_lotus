import { NextRequest } from 'next/server';
import { EvaluationStorage } from '@/services/evaluation-storage';
import { ok, serverError } from '@/lib/api-response';
import { queryInt, queryString } from '@/lib/api-request';

/**
 * GET /api/evaluations?url=https://example.com&limit=10
 * List evaluations, optionally filtered by website URL
 */
export async function GET(request: NextRequest) {
  try {
    const url = queryString(request, 'url');
    const limit = queryInt(request, 'limit', 50);

    let records;

    if (url) {
      records = await EvaluationStorage.getByWebsite(url);
    } else {
      records = await EvaluationStorage.list(limit);
    }

    return ok({
      total: records.length,
      limit,
      evaluations: records.map((r) => ({
        id: r.id,
        website_url: r.result.website_url,
        website_name: r.result.website_name,
        overall_score: r.result.overall_compliance_score,
        status: r.result.summary.compliance_status,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
        recordStatus: r.status,
      })),
    });
  } catch (error) {
    console.error('List error:', error);
    return serverError('Failed to list evaluations');
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
