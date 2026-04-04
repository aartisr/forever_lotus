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

export async function GET(request: NextRequest) {
  if (isAwariconAdminConfigured() && !isAwariconAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Invalid admin key.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tier = searchParams.get('tier') ?? '';
  const siteParam = searchParams.get('site') ?? '';
  const expDays = Number(searchParams.get('days') ?? '30');

  const validTier = awariconTiers.find((item) => item.key === tier);
  if (!validTier) {
    return NextResponse.json({ error: 'Invalid tier.' }, { status: 400 });
  }

  const site = normalizeSite(siteParam);
  if (!site) {
    return NextResponse.json({ error: 'Invalid site domain.' }, { status: 400 });
  }

  if (!await isSiteApproved(site)) {
    return NextResponse.json({ error: 'Site is not approved for signed badges.' }, { status: 403 });
  }

  const secret = process.env.AWARICON_BADGE_SIGNING_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Signing secret not configured.' }, { status: 503 });
  }

  const clampedDays = Number.isFinite(expDays) ? Math.min(365, Math.max(1, Math.floor(expDays))) : 30;
  const exp = Math.floor(Date.now() / 1000) + clampedDays * 24 * 60 * 60;
  const sig = signBadgePayload({ tier, site, exp }, secret);

  void appendAuditEntry('token_issued', site, { tier, exp });

  return NextResponse.json({
    tier,
    site,
    exp,
    sig,
  });
}

export const runtime = 'nodejs';