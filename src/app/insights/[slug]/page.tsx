import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import ShareActions from '@/components/ShareActions';
import { getInsightBySlug, getInsightReadTime, getInsightWordCount, insightSlugs } from '@/content/insights';
import { buildAlternates, buildOpenGraphImage, buildPageUrl, buildTwitterImage, founderName, siteKeywords, siteName } from '@/lib/seo';
import { getOgLocale } from '@/i18n';
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFAQPageJsonLd, buildJsonLdGraph } from '@/lib/structured-data';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return insightSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return {
      title: 'Insight Not Found',
      description: 'The requested insight article does not exist.',
    };
  }

  const path = `/insights/${article.slug}`;
  const socialImage = buildPageUrl(`${path}/opengraph-image`, 'en');
  const keywords = Array.from(
    new Set([article.keyword, article.title, 'Forever Lotus', 'conscious creation', 'ethical leadership'])
  );

  return {
    title: article.title,
    description: article.description,
    keywords: [...siteKeywords, ...keywords],
    authors: [{ name: founderName, url: buildPageUrl('/about') }],
    alternates: buildAlternates(path, 'en'),
    openGraph: {
      type: 'article',
      url: buildPageUrl(path, 'en'),
      locale: getOgLocale('en'),
      title: article.title,
      description: article.description,
      siteName,
      images: [buildOpenGraphImage(socialImage, article.title)],
      authors: [founderName],
      section: 'Insights',
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [buildTwitterImage(socialImage, article.title)],
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.relatedSlugs
    .map((slug) => getInsightBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const articlePath = `/insights/${article.slug}`;
  const articleUrl = buildPageUrl(articlePath);
  const socialImage = buildPageUrl(`${articlePath}/opengraph-image`);
  const readTime = getInsightReadTime(article);
  const wordCount = getInsightWordCount(article);

  const articleSchema = buildArticleJsonLd({
    path: articlePath,
    title: article.title,
    description: article.description,
    image: socialImage,
    keywords: [article.keyword, article.title, ...article.relatedSlugs],
    articleSection: article.sections.map((section) => section.heading),
    wordCount,
  });

  const breadcrumbSchema = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: article.title, path: articlePath },
  ]);

  const faqSchema = buildFAQPageJsonLd(
    article.faq.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );
  const structuredData = buildJsonLdGraph([breadcrumbSchema, articleSchema, faqSchema]);

  return (
    <>
      <JsonLd data={structuredData} />

      <section className="relative pt-32 pb-14 px-5 sm:px-8 bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 65% 48% at 50% 0%, rgba(20,184,166,0.12) 0%, transparent 62%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] text-lotus-gold/75">
              <li>
                <Link href="/" className="hover:text-lotus-gold transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/insights" className="hover:text-lotus-gold transition-colors">
                  Insights
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-lotus-cream/90">{article.keyword}</li>
            </ol>
          </nav>
          <p className="eyebrow mb-4">{article.keyword}</p>
          <h1 className="font-serif font-black text-lotus-cream mb-5" style={{ fontSize: 'clamp(2.1rem, 5.4vw, 4rem)' }}>
            {article.title}
          </h1>
          <p className="text-lotus-muted text-lg leading-relaxed max-w-3xl mx-auto">{article.description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-lotus-muted">
            <span>{founderName}</span>
            <span aria-hidden="true">•</span>
            <span>{readTime} min read</span>
            <span aria-hidden="true">•</span>
            <span>{wordCount} words</span>
          </div>
        </div>
      </section>

      <section className="py-14 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <ShareActions title={article.title} url={articleUrl} description={article.description} />
          </div>

          <p className="text-[#423d36] text-base sm:text-lg leading-relaxed mb-8">{article.intro}</p>

          <div className="space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="rounded-xl border border-[rgba(26,22,18,0.12)] bg-white/70 p-6">
                <h2 className="font-serif text-2xl font-bold text-[#1a1612] mb-3">{section.heading}</h2>
                <p className="text-[#4a4640] leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-xl border border-[rgba(26,22,18,0.15)] bg-white p-6">
            <h2 className="font-serif text-2xl font-bold text-[#1a1612] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {article.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold text-[#1f1a16] mb-1">{item.question}</h3>
                  <p className="text-[#4a4640] text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold text-[#1a1612] mb-4">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/insights/${related.slug}`}
                  className="rounded-xl border border-[rgba(26,22,18,0.12)] bg-white/70 p-4 hover:shadow-sm transition-shadow"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-[#8c7a53] mb-2">{related.keyword}</p>
                  <p className="font-serif text-lg text-[#1a1612]">{related.title}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 border-t border-[rgba(26,22,18,0.15)] pt-6 flex flex-wrap gap-3">
            <Link href="/insights" className="text-[#8c6b28] hover:text-[#6f541f] font-semibold text-sm">
              Back to all insights
            </Link>
            <span className="text-[#7a7470] text-sm">|</span>
            <Link href="/research" className="text-[#8c6b28] hover:text-[#6f541f] font-semibold text-sm">
              Explore research dossier
            </Link>
          </section>
        </article>
      </section>
    </>
  );
}
