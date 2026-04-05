import { NextResponse } from 'next/server';
import { awariconTiers } from '@/content/awaricon';
import {
  isSiteApproved,
  normalizeSite,
  signBadgePayload,
} from '@/lib/awariconBadgeVerification';
import {
  isAwariconAdminAuthorized,
  isAwariconAdminConfigured,
} from '@/lib/awariconAdminAuth';
import { appendAuditEntry } from '@/lib/awariconApprovalRegistry';
import { NextRequest } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, x-awaricon-admin-key',
  'Access-Control-Max-Age': '86400',
  Vary: 'Origin',
};

function jsonWithCors(payload: unknown, init?: ResponseInit) {
  return NextResponse.json(payload, {
    ...init,
    headers: {
      ...CORS_HEADERS,
      ...(init?.headers ?? {}),
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET(request: NextRequest) {
  if (isAwariconAdminConfigured() && !isAwariconAdminAuthorized(request)) {
    return jsonWithCors({ error: 'Invalid admin key.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tier = searchParams.get('tier') ?? '';
  const siteParam = searchParams.get('site') ?? '';
  const expDays = Number(searchParams.get('days') ?? '30');

  const validTier = awariconTiers.find((item) => item.key === tier);
  if (!validTier) {
    return jsonWithCors({ error: 'Invalid tier.' }, { status: 400 });
  }

  const site = normalizeSite(siteParam);
  if (!site) {
    return jsonWithCors({ error: 'Invalid site domain.' }, { status: 400 });
  }

  if (!await isSiteApproved(site)) {
    return jsonWithCors({ error: 'Site is not approved for signed badges.' }, { status: 403 });
  }

  const secret = process.env.AWARICON_BADGE_SIGNING_SECRET;
  if (!secret) {
    return jsonWithCors({ error: 'Signing secret not configured.' }, { status: 503 });
  }

  const clampedDays = Number.isFinite(expDays) ? Math.min(365, Math.max(1, Math.floor(expDays))) : 30;
  const exp = Math.floor(Date.now() / 1000) + clampedDays * 24 * 60 * 60;
  const sig = signBadgePayload({ tier, site, exp }, secret);

  void appendAuditEntry('token_issued', site, { tier, exp });

  return jsonWithCors({
    tier,
    site,
    exp,
    sig,
  });
}

export const runtime = 'nodejs';