import { siteUrl } from '@/lib/seo';

const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';

type IndexNowResult = {
  success: boolean;
  status: number;
  submitted: number;
  message: string;
  needsConfiguration?: boolean;
};

function toAbsoluteUrl(url: string): string {
  return new URL(url, siteUrl).toString();
}

function uniqueAbsoluteUrls(urls: string[]): string[] {
  return Array.from(
    new Set(
      urls
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url) => toAbsoluteUrl(url))
    )
  );
}

export async function submitIndexNowUrls(urls: string[]): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY;
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteUrl;
  const keyLocation =
    process.env.INDEXNOW_KEY_LOCATION ||
    `${configuredSiteUrl.replace(/\/+$/, '')}/${key || 'indexnow-key'}.txt`;

  const urlList = uniqueAbsoluteUrls(urls);

  if (!key) {
    return {
      success: false,
      status: 400,
      submitted: 0,
      message: 'INDEXNOW_KEY is not configured.',
      needsConfiguration: true,
    };
  }

  if (urlList.length === 0) {
    return {
      success: false,
      status: 400,
      submitted: 0,
      message: 'No URLs provided for IndexNow submission.',
    };
  }

  const host = new URL(configuredSiteUrl).hostname;

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList,
      }),
    });

    const bodyText = await response.text();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        submitted: 0,
        message: `IndexNow submission failed: ${response.status} ${bodyText.slice(0, 160)}`,
      };
    }

    return {
      success: true,
      status: response.status,
      submitted: urlList.length,
      message: `IndexNow accepted ${urlList.length} URL(s).`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown network error';
    return {
      success: false,
      status: 500,
      submitted: 0,
      message: `IndexNow request failed: ${message}`,
    };
  }
}
