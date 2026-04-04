import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const EvaluationDashboardClient = dynamic(() => import('./evaluate-client'), {
  loading: () => (
    <main className="min-h-screen bg-lotus-bg pt-32 pb-16 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto animate-pulse space-y-4">
        <div className="h-8 rounded bg-lotus-bg-2" />
        <div className="h-8 rounded bg-lotus-bg-2" />
        <div className="h-24 rounded bg-lotus-bg-2" />
      </div>
    </main>
  ),
});

const title = 'Manifesto Evaluator';
const description =
  'Submit your website for a dignified, encouraging evaluation against the Forever Lotus Manifesto. Receive actionable feedback on alignment with our core principles.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/evaluate', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/evaluate', 'en'),
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

export default function EvaluatePage() {
  return <EvaluationDashboardClient />;
}
