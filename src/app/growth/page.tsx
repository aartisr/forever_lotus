import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import { growthPageContent } from '@/content/growth';

const title = growthPageContent.title;
const description = growthPageContent.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/growth', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/growth', 'en'),
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

export default function GrowthPage() {
  const dashboardSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Forever Lotus Growth KPI Dashboard Definition',
    description,
    url: buildPageUrl('/growth', 'en'),
    creator: {
      '@type': 'Organization',
      name: 'Forever Lotus',
    },
    keywords: [
      'seo dashboard',
      'growth kpi',
      'content scorecard',
      'organic growth operations',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dashboardSchema) }}
      />

      <PageHero
        eyebrow={growthPageContent.hero.eyebrow}
        title={growthPageContent.hero.title}
        description={growthPageContent.hero.description}
        gradient="radial-gradient(ellipse 72% 52% at 50% 0%, rgba(20,184,166,0.12) 0%, transparent 62%)"
        titleSize="clamp(2.2rem, 6vw, 4.6rem)"
      />

      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-8">KPI Targets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {growthPageContent.kpiCards.map((item) => (
              <article key={item.metric} className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/70 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8c7a53] mb-2">{item.target}</p>
                <h3 className="font-serif text-xl font-bold mb-3">{item.metric}</h3>
                <p className="text-[#4a4640] text-sm leading-relaxed">{item.why}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-8 bg-lotus-bg text-lotus-cream border-t border-lotus-border-soft">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-6">Weekly Ritual</h2>
          <ol className="space-y-3 text-lotus-muted">
            {growthPageContent.rituals.map((step) => (
              <li key={step} className="rounded-xl border border-lotus-border-soft bg-lotus-bg-2 px-4 py-3">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
