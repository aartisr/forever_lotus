import { ok, serverError } from '@/lib/api-response';

interface CredentialState {
  engineId: string;
  engineName: string;
  configured: boolean;
  envVar: string;
  note: string;
}

function hasValue(name: string): boolean {
  const value = process.env[name];
  return typeof value === 'string' && value.trim().length > 0;
}

export async function GET() {
  try {
    const credentials: CredentialState[] = [
      {
        engineId: 'google',
        engineName: 'Google',
        configured: hasValue('GOOGLE_INDEXING_API_BEARER_TOKEN'),
        envVar: 'GOOGLE_INDEXING_API_BEARER_TOKEN',
        note: 'Used by Google Indexing API adapter.',
      },
      {
        engineId: 'bing',
        engineName: 'Bing',
        configured: hasValue('BING_WEBMASTER_API_KEY'),
        envVar: 'BING_WEBMASTER_API_KEY',
        note: 'Used by Bing Webmaster URL submission API.',
      },
      {
        engineId: 'yandex',
        engineName: 'Yandex',
        configured: hasValue('YANDEX_WEBMASTER_OAUTH_TOKEN'),
        envVar: 'YANDEX_WEBMASTER_OAUTH_TOKEN',
        note: 'Used by Yandex webmaster submission adapter.',
      },
      {
        engineId: 'cron',
        engineName: 'Automation Token',
        configured: hasValue('INDEXING_CRON_TOKEN'),
        envVar: 'INDEXING_CRON_TOKEN',
        note: 'Protects POST /api/indexing/refresh-all from unauthorized calls.',
      },
    ];

    const configuredCount = credentials.filter((item) => item.configured).length;

    return ok({
      configuredCount,
      total: credentials.length,
      credentials,
      readyForLiveSubmission:
        credentials.find((item) => item.engineId === 'google')?.configured === true ||
        credentials.find((item) => item.engineId === 'bing')?.configured === true,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Credential status error:', error);
    return serverError('Failed to read indexing credential status');
  }
}

export const runtime = 'nodejs';
