import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { insightArticles, searchInsights } from '@/content/insights';
import { insightsIndexContent } from '@/content/insights-index';
import { buildAlternates, buildOpenGraphImage, buildPageUrl, buildTwitterImage, siteName } from '@/lib/seo';
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildItemListJsonLd,
  buildJsonLdGraph,
  buildWebPageJsonLd,
} from '@/lib/structured-data';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: insightsIndexContent.metadata.title,
  description: insightsIndexContent.metadata.description,
  alternates: buildAlternates('/insights', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/insights', 'en'),
    title: insightsIndexContent.metadata.ogTitle,
    description: insightsIndexContent.metadata.ogDescription,
    siteName,
    images: [buildOpenGraphImage(undefined, insightsIndexContent.metadata.ogTitle)],
  },
  twitter: {
    card: 'summary_large_image',
    title: insightsIndexContent.metadata.ogTitle,
    description: insightsIndexContent.metadata.ogDescription,
    images: [buildTwitterImage(undefined, insightsIndexContent.metadata.ogTitle)],
  },
};

type PageProps = {
  searchParams?: Promise<{
    query?: string | string[];
  }>;
};

function normalizeQuery(query?: string | string[]): string {
  if (Array.isArray(query)) {
    return query[0]?.trim() ?? '';
  }

  return query?.trim() ?? '';
}

export default async function InsightsIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = normalizeQuery(params?.query);
  const filteredArticles = searchInsights(query);
  const collectionItems = filteredArticles.map((article) => ({
    name: article.title,
    url: buildPageUrl(`/insights/${article.slug}`),
    description: article.description,
    keyword: article.keyword,
  }));
  const breadcrumbSchema = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
  ]);
  const collectionSchema = buildCollectionPageJsonLd({
    path: '/insights',
    title: insightsIndexContent.metadata.ogTitle,
    description: insightsIndexContent.metadata.ogDescription,
    items: collectionItems,
  });
  const itemListSchema = buildItemListJsonLd({
    name: 'Forever Lotus insights library',
    items: collectionItems,
  });
  const webPageSchema = buildWebPageJsonLd({
    path: '/insights',
    title: insightsIndexContent.metadata.ogTitle,
    description: insightsIndexContent.metadata.ogDescription,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
    ],
  });
  const structuredData = buildJsonLdGraph([
    breadcrumbSchema,
    webPageSchema,
    collectionSchema,
    itemListSchema,
  ]);

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHero
        eyebrow={insightsIndexContent.hero.eyebrow}
        title={insightsIndexContent.hero.title}
        description={insightsIndexContent.hero.description}
        gradient="radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%)"
        titleSize="clamp(2.3rem, 6vw, 4.5rem)"
      />

      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-6xl mx-auto mb-8">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#8c7a53]">
              <li>
                <Link href="/" className="hover:text-[#6f541f] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#1a1612]">Insights</li>
            </ol>
          </nav>

          <div className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/70 p-5 md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8c7a53] mb-2">Search the library</p>
                <h2 className="font-serif text-2xl font-bold text-[#1a1612] mb-2">Find the topic AI answers and humans will quote</h2>
                <p className="text-[#4a4640] text-sm leading-relaxed">
                  Search across long-tail philosophy, leadership, compassion, dignity, and stewardship topics. Each article is optimized to stand on its own and reinforce the whole knowledge graph.
                </p>
              </div>
              <form action="/insights" method="get" className="w-full md:max-w-xl">
                <label htmlFor="insights-query" className="sr-only">
                  Search insights
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="insights-query"
                    type="search"
                    name="query"
                    defaultValue={query}
                    placeholder="Search conscious creation, lotus symbolism, ethical leadership..."
                    className="min-w-0 flex-1 rounded-full border border-[rgba(26,22,18,0.14)] bg-white px-5 py-3 text-sm text-[#1a1612] outline-none transition-colors placeholder:text-[#8f867d] focus:border-[#c9a84c]"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="rounded-full bg-[#1a1612] px-5 py-3 text-sm font-semibold text-[#f8f2e6] transition-colors hover:bg-[#2a241e]"
                    >
                      Search
                    </button>
                    {query ? (
                      <Link
                        href="/insights"
                        className="rounded-full border border-[rgba(26,22,18,0.14)] px-5 py-3 text-sm font-semibold text-[#1a1612] hover:border-[#c9a84c]/40 hover:text-[#8c6b28] transition-colors"
                      >
                        Clear
                      </Link>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#5a544c]">
              <span>{filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'} ready to explore</span>
              {query ? <span>Results for “{query}”</span> : <span>Browse the full cluster</span>}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <article className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-[linear-gradient(140deg,#fff8e9_0%,#f5f0e8_55%,#efe6d0_100%)] p-6 md:col-span-2">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8c7a53] mb-3">{insightsIndexContent.operationsCard.eyebrow}</p>
            <h2 className="font-serif text-3xl font-bold mb-3 text-[#1a1612]">
              {insightsIndexContent.operationsCard.title}
            </h2>
            <p className="text-[#4a4640] text-sm leading-relaxed mb-5 max-w-3xl">
              {insightsIndexContent.operationsCard.description}
            </p>
            <Link href="/insights/indexing" className="text-[#8c6b28] hover:text-[#6f541f] font-semibold text-sm">
              {insightsIndexContent.operationsCard.cta} {'->'}
            </Link>
          </article>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArticles.map((article) => (
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
          {filteredArticles.length === 0 ? (
            <article className="rounded-2xl border border-dashed border-[rgba(26,22,18,0.18)] bg-white/60 p-8 md:col-span-2 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8c7a53] mb-3">No exact match yet</p>
              <h2 className="font-serif text-2xl font-bold mb-3 text-[#1a1612]">Try a broader phrase</h2>
              <p className="text-[#4a4640] text-sm leading-relaxed max-w-xl mx-auto mb-5">
                Search by a core theme like compassion, dignity, ethics, peace, leadership, lotus, or stewardship. The library is built around topic clusters, so a slightly broader query usually unlocks the right path.
              </p>
              <Link href="/insights" className="text-[#8c6b28] hover:text-[#6f541f] font-semibold text-sm">
                Browse the full insights hub {'->'}
              </Link>
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}
