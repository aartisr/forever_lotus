import { NextRequest } from 'next/server';
import { badRequest, ok, serverError } from '@/lib/api-response';
import { parseJsonBody, queryInt } from '@/lib/api-request';
import {
  isKpiCategory,
  KpiBaselineRecord,
  normalizeKey,
} from '@/lib/impact-kpi';
import { ImpactKpiStorage } from '@/services/impact-kpi-storage';

export async function GET(request: NextRequest) {
  try {
    const limit = queryInt(request, 'limit', 100);
    const records = await ImpactKpiStorage.list(limit);

    return ok({
      total: records.length,
      limit,
      records,
    });
  } catch (error) {
    console.error('KPI list error:', error);
    return serverError('Failed to list KPI baselines');
  }
}

interface BaselineInput {
  key: string;
  title: string;
  category: string;
  owner: string;
  description?: string;
  baseline: {
    value: number;
    unit: string;
    measuredAt: string;
    source: string;
    notes?: string;
  };
  current?: {
    value: number;
    unit: string;
    measuredAt: string;
    source: string;
    notes?: string;
  };
  target?: {
    value: number;
    unit: string;
    measuredAt: string;
    source: string;
    notes?: string;
  };
  tags?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const parsed = await parseJsonBody<BaselineInput>(request);
    if (parsed.error || !parsed.data) {
      return badRequest(parsed.error ?? 'Invalid request body');
    }

    const body = parsed.data;

    if (!body.key || !body.title || !body.owner || !body.category || !body.baseline) {
      return badRequest('Missing required fields: key, title, owner, category, baseline');
    }

    if (!isKpiCategory(body.category)) {
      return badRequest('Invalid category. Use one of: impact, evidence, reliability, governance, adoption');
    }

    const now = new Date().toISOString();
    const record: KpiBaselineRecord = {
      id: ImpactKpiStorage.generateId(),
      key: normalizeKey(body.key),
      title: body.title.trim(),
      category: body.category,
      owner: body.owner.trim(),
      description: body.description?.trim(),
      baseline: body.baseline,
      current: body.current ?? body.baseline,
      target: body.target,
      tags: body.tags ?? [],
      createdAt: now,
      updatedAt: now,
    };

    await ImpactKpiStorage.save(record);

    return ok({ id: record.id, record }, 201);
  } catch (error) {
    console.error('KPI create error:', error);
    return serverError('Failed to create KPI baseline');
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
