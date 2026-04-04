import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import {
  buildAlternates,
  buildPageUrl,
  defaultOgImage,
  siteName,
} from '@/lib/seo';

const SearchEngineIndexingDashboard = dynamic(
  () => import('@/components/SearchEngineIndexingDashboard'),
  {
    loading: () => (
      <main className="min-h-screen bg-lotus-bg pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto animate-pulse space-y-5">
          <div className="h-8 rounded bg-lotus-bg-2" />
          <div className="h-24 rounded bg-lotus-bg-2" />
          <div className="h-24 rounded bg-lotus-bg-2" />
          <div className="h-24 rounded bg-lotus-bg-2" />
        </div>
      </main>
    ),
  }
);

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
