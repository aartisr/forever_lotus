import { NextRequest } from 'next/server';
import { badRequest, notFound, ok, serverError } from '@/lib/api-response';
import { parseJsonBody } from '@/lib/api-request';
import { ImpactKpiStorage } from '@/services/impact-kpi-storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = await ImpactKpiStorage.get(id);

    if (!record) return notFound('KPI baseline not found');
    return ok({ record });
  } catch (error) {
    console.error('KPI get error:', error);
    return serverError('Failed to retrieve KPI baseline');
  }
}

interface UpdateInput {
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
  description?: string;
  tags?: string[];
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const parsed = await parseJsonBody<UpdateInput>(request);
    if (parsed.error || !parsed.data) {
      return badRequest(parsed.error ?? 'Invalid request body');
    }

    const updates = parsed.data;
    if (
      updates.current === undefined &&
      updates.target === undefined &&
      updates.description === undefined &&
      updates.tags === undefined
    ) {
      return badRequest('No updatable fields provided');
    }

    const updated = await ImpactKpiStorage.update(id, updates);
    if (!updated) return notFound('KPI baseline not found');

    return ok({ record: updated });
  } catch (error) {
    console.error('KPI update error:', error);
    return serverError('Failed to update KPI baseline');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await ImpactKpiStorage.get(id);

    if (!existing) return notFound('KPI baseline not found');

    await ImpactKpiStorage.remove(id);
    return ok({ deleted: true, id });
  } catch (error) {
    console.error('KPI delete error:', error);
    return serverError('Failed to delete KPI baseline');
  }
}

export const runtime = 'nodejs';
