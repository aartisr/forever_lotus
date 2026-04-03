import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';
import EvaluationDashboardClient from './evaluate-client';

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
