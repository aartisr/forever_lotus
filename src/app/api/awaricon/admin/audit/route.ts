import { NextRequest } from 'next/server';
import { ok, unauthorized } from '@/lib/api-response';
import { listAuditLog } from '@/lib/awariconApprovalRegistry';
import {
  isAwariconAdminAuthorized,
  isAwariconAdminConfigured,
} from '@/lib/awariconAdminAuth';

export async function GET(request: NextRequest) {
  if (!isAwariconAdminConfigured()) {
    return unauthorized('Admin key is not configured. Set AWARICON_ADMIN_KEY.');
  }

  if (!isAwariconAdminAuthorized(request)) {
    return unauthorized('Invalid admin key.');
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(200, Math.max(1, Number(searchParams.get('limit') ?? '100')));

  const entries = await listAuditLog(limit);
  return ok({ entries });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
