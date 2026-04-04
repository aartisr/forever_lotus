import { NextRequest } from 'next/server';
import { badRequest, ok, unauthorized } from '@/lib/api-response';
import { parseJsonBody } from '@/lib/api-request';
import {
  addApprovedSite,
  listApprovedSites,
  removeApprovedSite,
} from '@/lib/awariconApprovalRegistry';
import {
  isAwariconAdminAuthorized,
  isAwariconAdminConfigured,
} from '@/lib/awariconAdminAuth';

function ensureAdmin(request: NextRequest) {
  if (!isAwariconAdminConfigured()) {
    return unauthorized('Admin key is not configured. Set AWARICON_ADMIN_KEY.');
  }

  if (!isAwariconAdminAuthorized(request)) {
    return unauthorized('Invalid admin key.');
  }

  return null;
}

export async function GET(request: NextRequest) {
  const authError = ensureAdmin(request);
  if (authError) {
    return authError;
  }

  return ok({
    sites: await listApprovedSites(),
  });
}

export async function POST(request: NextRequest) {
  const authError = ensureAdmin(request);
  if (authError) {
    return authError;
  }

  const { data, error } = await parseJsonBody<{ site?: string }>(request);
  if (error || !data) {
    return badRequest(error ?? 'Invalid request body');
  }

  if (!data.site) {
    return badRequest('site is required');
  }

  const added = await addApprovedSite(data.site);
  if (!added) {
    return badRequest('site is invalid');
  }

  return ok({ sites: await listApprovedSites() });
}

export async function DELETE(request: NextRequest) {
  const authError = ensureAdmin(request);
  if (authError) {
    return authError;
  }

  const { data, error } = await parseJsonBody<{ site?: string }>(request);
  if (error || !data) {
    return badRequest(error ?? 'Invalid request body');
  }

  if (!data.site) {
    return badRequest('site is required');
  }

  const removed = await removeApprovedSite(data.site);
  if (!removed) {
    return badRequest('site was not found in runtime managed list');
  }

  return ok({ sites: await listApprovedSites() });
}

export const runtime = 'nodejs';
