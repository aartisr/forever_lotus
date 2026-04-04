import { NextResponse } from 'next/server';
import { buildPublicAwariconCertificationPayload } from '@/lib/awariconPublicCertification';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  const payload = buildPublicAwariconCertificationPayload();

  return NextResponse.json(payload, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
