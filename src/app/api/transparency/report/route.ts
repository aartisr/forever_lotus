import { NextRequest } from 'next/server';
import { ok, serverError } from '@/lib/api-response';
import { queryInt } from '@/lib/api-request';
import { buildTransparencyMarkdown } from '@/lib/transparency-report';
import { ImpactKpiStorage } from '@/services/impact-kpi-storage';

export async function GET(request: NextRequest) {
  try {
    const limit = queryInt(request, 'limit', 100);
    const records = await ImpactKpiStorage.list(limit);
    const markdown = buildTransparencyMarkdown(records);

    return ok({
      generatedAt: new Date().toISOString(),
      total: records.length,
      records,
      markdown,
    });
  } catch (error) {
    console.error('Transparency report error:', error);
    return serverError('Failed to generate transparency report');
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
