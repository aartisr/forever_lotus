import { NextResponse } from 'next/server';
import { awariconTiers } from '@/content/awaricon';
import { buildAwariconBadgeSvgMarkup } from '@/lib/awariconBadgeSvg';
import {
  isSiteApproved,
  normalizeSite,
  verifyBadgeSignature,
} from '@/lib/awariconBadgeVerification';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tierKey = searchParams.get('tier') ?? '';
  const siteParam = searchParams.get('site');
  const expParam = searchParams.get('exp');
  const sigParam = searchParams.get('sig');

  const tier = awariconTiers.find((item) => item.key === tierKey);
  if (!tier) {
    return NextResponse.json(
      {
        error: 'Invalid tier. Use one of: platinum, gold, silver, bronze.',
      },
      { status: 400 }
    );
  }

  const hasSignatureParams = Boolean(siteParam || expParam || sigParam);
  if (hasSignatureParams) {
    if (!siteParam || !expParam || !sigParam) {
      return NextResponse.json(
        { error: 'Signed badge requires site, exp, and sig parameters.' },
        { status: 400 }
      );
    }

    const site = normalizeSite(siteParam);
    if (!site) {
      return NextResponse.json({ error: 'Invalid site parameter.' }, { status: 400 });
    }

    if (!await isSiteApproved(site)) {
      return NextResponse.json({ error: 'Site is not approved.' }, { status: 403 });
    }

    const exp = Number(expParam);
    if (!Number.isFinite(exp)) {
      return NextResponse.json({ error: 'Invalid exp parameter.' }, { status: 400 });
    }

    if (Math.floor(Date.now() / 1000) > exp) {
      return NextResponse.json({ error: 'Badge token expired.' }, { status: 401 });
    }

    const secret = process.env.AWARICON_BADGE_SIGNING_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Signing secret not configured.' }, { status: 503 });
    }

    const isValid = verifyBadgeSignature(
      { tier: tier.key, site, exp, sig: sigParam },
      secret
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid badge signature.' }, { status: 401 });
    }
  }

  const svg = buildAwariconBadgeSvgMarkup(tier, {
    gradId: `aw-${tier.key}-grad`,
    haloId: `aw-${tier.key}-halo`,
    shineId: `aw-${tier.key}-shine`,
  });

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}