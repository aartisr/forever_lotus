import { NextRequest, NextResponse } from 'next/server';

const MAX_BODY_LENGTH = 16_000;

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? '';
  let reportPreview = '';

  try {
    if (contentType.includes('application/json')) {
      const body = (await req.json()) as unknown;
      reportPreview = JSON.stringify(body).slice(0, MAX_BODY_LENGTH);
    } else {
      reportPreview = (await req.text()).slice(0, MAX_BODY_LENGTH);
    }

    if (reportPreview) {
      console.error('[CSP report]', reportPreview);
    }
  } catch (error) {
    console.error('[CSP report parse error]', error);
  }

  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
