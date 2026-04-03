import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { insightArticles } from '@/content/insights';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Keyword-targeted insight pages on conscious creation, Eastern philosophy, dignity-centered systems, and evidence-based wellbeing.',
  alternates: buildAlternates('/insights', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/insights', 'en'),
    title: 'Forever Lotus Insights',
    description:
      'Explore practical guides on conscious creation, compassion, stewardship, and civilizational ethics.',
    siteName,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forever Lotus Insights',
    description:
      'Explore practical guides on conscious creation, compassion, stewardship, and civilizational ethics.',
    images: [defaultOgImage],
  },
};

export default function InsightsIndexPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Growth Library</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.3rem, 6vw, 4.5rem)' }}
          >
            Insight Pages
          </h1>
          <p className="text-lotus-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Operational content designed for long-tail search discovery, internal authority building,
            and user education across philosophy, stewardship, compassion, and leadership.
          </p>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {insightArticles.map((article) => (
            <article
              key={article.slug}
              className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/65 p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#8c7a53] mb-3">{article.keyword}</p>
              <h2 className="font-serif text-2xl font-bold mb-3 text-[#1a1612]">{article.title}</h2>
              <p className="text-[#4a4640] text-sm leading-relaxed mb-5">{article.description}</p>
              <Link href={`/insights/${article.slug}`} className="text-[#8c6b28] hover:text-[#6f541f] font-semibold text-sm">
                Read article {'->'}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
