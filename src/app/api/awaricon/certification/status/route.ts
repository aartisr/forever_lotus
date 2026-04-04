import { NextRequest } from 'next/server';
import { badRequest, notFound, ok } from '@/lib/api-response';
import { AwariconCertificationStorage } from '@/services/awaricon-certification-storage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')?.trim();

  if (!id) {
    return badRequest('Application ID (id) is required.');
  }

  const record = await AwariconCertificationStorage.get(id);
  if (!record) {
    return notFound('Application not found. Check the ID and try again.');
  }

  // Return only public-safe fields — never expose contactEmail or internal scoring notes
  return ok({
    id: record.id,
    site: record.site,
    organizationName: record.organizationName,
    status: record.status,
    score: record.score,
    recommendedTier: record.recommendedTier,
    tierAwarded: record.tierAwarded ?? null,
    tierRequested: record.tierRequested ?? null,
    reviewNotes: record.status === 'rejected' || record.status === 'revoked' ? (record.reviewNotes ?? null) : null,
    submittedAt: record.createdAt,
    reviewedAt: record.reviewedAt ?? null,
  });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
