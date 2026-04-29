import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const IndexingPortfolioDashboard = dynamic(
  () => import('@/components/IndexingPortfolioDashboard'),
  {
    loading: () => (
      <main className="min-h-screen bg-lotus-bg pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto animate-pulse space-y-5">
          <div className="h-8 rounded bg-lotus-bg-2" />
          <div className="h-20 rounded bg-lotus-bg-2" />
          <div className="h-20 rounded bg-lotus-bg-2" />
          <div className="h-20 rounded bg-lotus-bg-2" />
        </div>
      </main>
    ),
  }
);

const title = 'Indexing Portfolio Tracker';
const description =
  'Track indexing health for many aligned websites across Bing, Google, IndexNow, and indirect discovery channels with filters, status refreshes, and portfolio-level KPI monitoring.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/insights/indexing/portfolio', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/insights/indexing/portfolio', 'en'),
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

export default function PortfolioPage() {
  return <IndexingPortfolioDashboard />;
}
