import { NextRequest } from 'next/server';
import { ok, unauthorized } from '@/lib/api-response';
import {
  isAwariconAdminAuthorized,
  isAwariconAdminConfigured,
} from '@/lib/awariconAdminAuth';
import { AwariconCertificationStorage } from '@/services/awaricon-certification-storage';
import type { CertificationStatus } from '@/lib/awariconCertification';

export async function GET(request: NextRequest) {
  if (!isAwariconAdminConfigured()) {
    return unauthorized('Admin key is not configured.');
  }
  if (!isAwariconAdminAuthorized(request)) {
    return unauthorized('Invalid admin key.');
  }

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status') as CertificationStatus | null;
  const limit = Math.min(200, Math.max(1, Number(searchParams.get('limit') ?? '100')));

  let records = await AwariconCertificationStorage.list(limit);
  if (statusFilter) {
    records = records.filter((r) => r.status === statusFilter);
  }

  return ok({ certifications: records, total: records.length });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
