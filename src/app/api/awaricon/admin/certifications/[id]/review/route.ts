import { NextRequest } from 'next/server';
import { badRequest, notFound, ok, unauthorized } from '@/lib/api-response';
import { parseJsonBody } from '@/lib/api-request';
import {
  isAwariconAdminAuthorized,
  isAwariconAdminConfigured,
} from '@/lib/awariconAdminAuth';
import { AwariconCertificationStorage } from '@/services/awaricon-certification-storage';
import { addApprovedSite, removeApprovedSite } from '@/lib/awariconApprovalRegistry';
import { awariconTiers } from '@/content/awaricon';
import type { CertificationStatus } from '@/lib/awariconCertification';

interface ReviewBody {
  action: 'approve' | 'reject' | 'revoke' | 'mark_under_review';
  /** Required when action = 'approve'. */
  tierAwarded?: string;
  notes?: string;
}

const STATUS_MAP: Record<ReviewBody['action'], CertificationStatus> = {
  approve: 'approved',
  reject: 'rejected',
  revoke: 'revoked',
  mark_under_review: 'under_review',
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAwariconAdminConfigured()) {
    return unauthorized('Admin key is not configured.');
  }
  if (!isAwariconAdminAuthorized(request)) {
    return unauthorized('Invalid admin key.');
  }

  const { id } = await params;
  const record = await AwariconCertificationStorage.get(id);
  if (!record) {
    return notFound('Certification application not found.');
  }

  const { data, error } = await parseJsonBody<ReviewBody>(request);
  if (error || !data?.action) {
    return badRequest('action is required (approve | reject | revoke | mark_under_review).');
  }

  const { action, tierAwarded, notes } = data;

  if (action === 'approve') {
    const validTier = awariconTiers.find((t) => t.key === tierAwarded);
    if (!validTier) {
      return badRequest('tierAwarded must be a valid tier key: platinum, gold, silver, bronze.');
    }
    // Add to approval registry so the site can request signed embed tokens
    await addApprovedSite(record.site);
  }

  if (action === 'revoke' && record.status === 'approved') {
    // Remove from approval registry so existing signed URLs will fail on renewal
    await removeApprovedSite(record.site);
  }

  const updated = await AwariconCertificationStorage.update(id, {
    status: STATUS_MAP[action],
    ...(action === 'approve' && tierAwarded ? { tierAwarded } : {}),
    ...(notes ? { reviewNotes: notes } : {}),
    reviewedAt: new Date().toISOString(),
  });

  return ok({ certification: updated });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
