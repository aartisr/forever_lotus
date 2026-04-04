import type { Metadata } from 'next';
import {
  buildAlternates,
  buildPageUrl,
  defaultOgImage,
  siteName,
} from '@/lib/seo';
import SearchEngineIndexingDashboard from '@/components/SearchEngineIndexingDashboard';

const title = 'Search Engine Indexing Dashboard';
const description =
  'Submit aligned websites to top search engines, track indexing status, and monitor visibility metrics in one command center.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/insights/indexing', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/insights/indexing', 'en'),
    title,
    description,
    siteName,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [defaultOgImage],
  },
};

export default function SearchIndexingPage() {
  return <SearchEngineIndexingDashboard />;
}
