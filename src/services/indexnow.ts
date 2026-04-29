import {
  getIndexNowCanonicalUrls,
  getIndexNowHost,
  getIndexNowKeyLocation,
  uniqueAbsoluteUrls,
} from '@/lib/indexnow-urls';

const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';

type IndexNowResult = {
  success: boolean;
  status: number;
  submitted: number;
  message: string;
  needsConfiguration?: boolean;
};

export async function submitIndexNowUrls(urls: string[]): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY;
  const keyLocation = getIndexNowKeyLocation();
  const urlList = urls.length > 0 ? uniqueAbsoluteUrls(urls) : getIndexNowCanonicalUrls();

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

  const host = getIndexNowHost();

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
