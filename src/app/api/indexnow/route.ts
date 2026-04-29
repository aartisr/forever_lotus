import { NextRequest } from 'next/server';
import { badRequest, ok } from '@/lib/api-response';
import { getIndexNowCanonicalUrls } from '@/lib/indexnow-urls';
import { submitIndexNowUrls } from '@/services/indexnow';

async function readOptionalJsonBody(request: NextRequest): Promise<{
  body: { urlList?: string[] };
  error?: string;
}> {
  const rawBody = await request.text();

  if (rawBody.trim().length === 0) {
    return { body: {} };
  }

  try {
    return { body: JSON.parse(rawBody) as { urlList?: string[] } };
  } catch {
    return { body: {}, error: 'Request body must be valid JSON' };
  }
}

export async function POST(request: NextRequest) {
  const { body, error } = await readOptionalJsonBody(request);

  if (error) {
    return badRequest(error);
  }

  const urlList = Array.isArray(body.urlList) && body.urlList.length > 0
    ? body.urlList
    : getIndexNowCanonicalUrls();

  const result = await submitIndexNowUrls(urlList);

  if (!result.success) {
    return badRequest(result.message);
  }

  return ok(result);
}

export const runtime = 'nodejs';
