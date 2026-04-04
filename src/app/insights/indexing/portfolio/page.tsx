import type { Metadata } from 'next';
import IndexingPortfolioDashboard from '@/components/IndexingPortfolioDashboard';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Indexing Portfolio Tracker';
const description =
  'Track indexing health for many aligned websites across top search engines with filters and KPI monitoring.';

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
