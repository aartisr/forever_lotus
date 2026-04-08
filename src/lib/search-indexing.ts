export type IndexingMode = 'api' | 'manual' | 'indirect';

export type EngineStatus =
  | 'pending'
  | 'queued'
  | 'submitted'
  | 'processing'
  | 'indexed'
  | 'partial'
  | 'action-required'
  | 'failed';

export interface SearchEngineDefinition {
  id: string;
  name: string;
  marketNote: string;
  mode: IndexingMode;
  supportsApiSubmission: boolean;
  supportsStatusApi: boolean;
  requiresManualConsole: boolean;
  consoleUrl?: string;
  docsUrl?: string;
}

export interface WebsiteIndexingInput {
  websiteUrl: string;
  websiteName: string;
  sitemapUrl: string;
  feedUrl?: string;
}

export interface WebsiteMetricSnapshot {
  indexedUrls: number;
  discoveredUrls: number;
  indexingCoveragePct: number;
  estimatedClicks: number;
  estimatedImpressions: number;
  averagePosition: number;
  healthScore: number;
  criticalIssues: number;
  warnings: number;
  fetchedAt: string;
}

export interface SearchEngineSubmissionStatus {
  engineId: string;
  engineName: string;
  mode: IndexingMode;
  status: EngineStatus;
  submittedAt?: string;
  lastCheckedAt?: string;
  nextAction?: string;
  message: string;
  details: {
    apiConnected: boolean;
    sitemapAccepted?: boolean;
    lastCrawlAt?: string;
    indexedPages?: number;
    coveragePct?: number;
    clicks?: number;
    impressions?: number;
    avgPosition?: number;
  };
}

export interface WebsiteIndexingRecord {
  id: string;
  input: WebsiteIndexingInput;
  overallStatus: EngineStatus;
  submissions: SearchEngineSubmissionStatus[];
  metrics: WebsiteMetricSnapshot;
  createdAt: string;
  updatedAt: string;
}

export const TOP_SEARCH_ENGINES: SearchEngineDefinition[] = [
  {
    id: 'google',
    name: 'Google',
    marketNote: 'Largest global share, critical for discoverability',
    mode: 'api',
    supportsApiSubmission: true,
    supportsStatusApi: true,
    requiresManualConsole: true,
    consoleUrl: 'https://search.google.com/search-console',
    docsUrl: 'https://developers.google.com/search/apis/indexing-api/v3/quickstart',
  },
  {
    id: 'bing',
    name: 'Bing',
    marketNote: 'Powers multiple downstream search surfaces',
    mode: 'api',
    supportsApiSubmission: true,
    supportsStatusApi: true,
    requiresManualConsole: true,
    consoleUrl: 'https://www.bing.com/webmasters',
    docsUrl: 'https://www.bing.com/webmasters/url-submission-api',
  },
  {
    id: 'indexnow',
    name: 'IndexNow',
    marketNote: 'Push URLs directly to participating search engines for faster discovery',
    mode: 'api',
    supportsApiSubmission: true,
    supportsStatusApi: false,
    requiresManualConsole: false,
    docsUrl: 'https://www.indexnow.org/documentation',
  },
  {
    id: 'yahoo',
    name: 'Yahoo',
    marketNote: 'Mostly powered by Bing index distribution',
    mode: 'indirect',
    supportsApiSubmission: false,
    supportsStatusApi: false,
    requiresManualConsole: false,
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    marketNote: 'Privacy-first engine using blended index sources',
    mode: 'indirect',
    supportsApiSubmission: false,
    supportsStatusApi: false,
    requiresManualConsole: false,
  },
  {
    id: 'baidu',
    name: 'Baidu',
    marketNote: 'Important in China-region discovery strategies',
    mode: 'manual',
    supportsApiSubmission: false,
    supportsStatusApi: false,
    requiresManualConsole: true,
    consoleUrl: 'https://ziyuan.baidu.com/',
  },
  {
    id: 'yandex',
    name: 'Yandex',
    marketNote: 'Strong in CIS and surrounding markets',
    mode: 'api',
    supportsApiSubmission: true,
    supportsStatusApi: true,
    requiresManualConsole: true,
    consoleUrl: 'https://webmaster.yandex.com/',
  },
  {
    id: 'naver',
    name: 'Naver',
    marketNote: 'Key for Korean market visibility',
    mode: 'manual',
    supportsApiSubmission: false,
    supportsStatusApi: false,
    requiresManualConsole: true,
    consoleUrl: 'https://searchadvisor.naver.com/',
  },
  {
    id: 'seznam',
    name: 'Seznam',
    marketNote: 'Relevant for Czech Republic localized strategy',
    mode: 'manual',
    supportsApiSubmission: false,
    supportsStatusApi: false,
    requiresManualConsole: true,
    consoleUrl: 'https://search.seznam.cz/',
  },
  {
    id: 'ecosia',
    name: 'Ecosia',
    marketNote: 'Mission-led search layer with Bing dependency',
    mode: 'indirect',
    supportsApiSubmission: false,
    supportsStatusApi: false,
    requiresManualConsole: false,
  },
  {
    id: 'brave',
    name: 'Brave Search',
    marketNote: 'Emerging independent index with privacy-centric users',
    mode: 'manual',
    supportsApiSubmission: false,
    supportsStatusApi: false,
    requiresManualConsole: true,
    consoleUrl: 'https://search.brave.com/',
  },
];

export function computeOverallStatus(submissions: SearchEngineSubmissionStatus[]): EngineStatus {
  if (!submissions.length) return 'pending';

  const failures = submissions.filter((s) => s.status === 'failed').length;
  const indexed = submissions.filter((s) => s.status === 'indexed').length;
  const actionRequired = submissions.filter((s) => s.status === 'action-required').length;

  if (indexed >= Math.ceil(submissions.length * 0.5)) return 'indexed';
  if (failures > 0 && indexed === 0) return 'failed';
  if (actionRequired > 0) return 'action-required';

  return 'processing';
}
