import { NextResponse } from 'next/server';

const TEMPLATE = `# Search Indexing Integrations
# Fill these values to enable live submissions and secure automation.

# Google Indexing API OAuth bearer token
GOOGLE_INDEXING_API_BEARER_TOKEN=

# Bing Webmaster API key
BING_WEBMASTER_API_KEY=

# Yandex Webmaster OAuth token
YANDEX_WEBMASTER_OAUTH_TOKEN=

# Token required by POST /api/indexing/refresh-all in x-cron-token header
INDEXING_CRON_TOKEN=

# Optional: app runtime environment
NODE_ENV=production
`;

export async function GET() {
  return new NextResponse(TEMPLATE, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="indexing.env.template"',
      'Cache-Control': 'no-store',
    },
  });
}

export const runtime = 'nodejs';
