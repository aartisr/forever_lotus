import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ScrollReveal from '@/components/ScrollReveal';
import { insightArticles, getInsightBySlug, type InsightArticle } from '@/content/insights';
import { insightsIndexContent } from '@/content/insights-index';
import { Search, ArrowRight, ArrowLeft, BookOpen, Clock, Tag, Share2, HelpCircle } from 'lucide-react';
import { navigateTo } from '@/lib/next-navigation';

interface InsightsPageProps {
  initialSlug?: string;
}

export default function InsightsPage({ initialSlug }: InsightsPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
    }
  }, [initialSlug]);

  const activeArticle = selectedSlug ? getInsightBySlug(selectedSlug) : null;

  const filteredArticles = insightArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Single Article Reader View
  if (activeArticle) {
    return (
      <div className="bg-lotus-bg text-lotus-cream min-h-screen pt-32 pb-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => {
              setSelectedSlug(null);
              navigateTo('/insights');
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-lotus-gold hover:text-[#ffd66b] mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights Directory</span>
          </button>

          <header className="mb-12 border-b border-lotus-border-soft pb-10">
            <div className="flex items-center gap-2 text-xs font-mono-code text-lotus-gold uppercase tracking-wider mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>{activeArticle.keyword}</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-lotus-cream mb-6 leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-lotus-muted text-base sm:text-lg leading-relaxed mb-6 font-serif-body">
              {activeArticle.description}
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-lotus-cream/90 italic font-serif leading-relaxed">
              &ldquo;{activeArticle.intro}&rdquo;
            </div>
          </header>

          {/* Article Sections */}
          <div className="space-y-10 mb-16">
            {activeArticle.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                  {sec.heading}
                </h2>
                <p className="text-lotus-cream/90 text-base sm:text-lg leading-relaxed font-serif-body">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>

          {/* Frequently Asked Questions */}
          {activeArticle.faq && activeArticle.faq.length > 0 && (
            <section className="p-8 rounded-3xl bg-lotus-bg-2 border border-lotus-border-soft mb-16">
              <div className="flex items-center gap-2 mb-6 text-lotus-gold font-mono-code text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <div className="space-y-6">
                {activeArticle.faq.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-lotus-cream">
                      {item.question}
                    </h3>
                    <p className="text-lotus-muted text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Insights */}
          {activeArticle.relatedSlugs && activeArticle.relatedSlugs.length > 0 && (
            <section className="border-t border-lotus-border-soft pt-12">
              <h3 className="eyebrow mb-6">Related Readings</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {activeArticle.relatedSlugs.map((slug) => {
                  const related = getInsightBySlug(slug);
                  if (!related) return null;
                  return (
                    <button
                      key={slug}
                      onClick={() => {
                        setSelectedSlug(slug);
                        navigateTo(`/insights/${slug}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/40 text-left transition"
                    >
                      <h4 className="font-serif font-bold text-base text-lotus-cream mb-2 line-clamp-2">
                        {related.title}
                      </h4>
                      <span className="text-xs text-lotus-gold flex items-center gap-1 font-semibold">
                        Read Article <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Insights Index Directory View
  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow={insightsIndexContent.hero.eyebrow}
        title={insightsIndexContent.hero.title}
        description={insightsIndexContent.hero.description}
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      {/* Operations Quick Card */}
      <section className="py-6 px-5 sm:px-8 border-y border-lotus-border-soft bg-lotus-bg-2">
        <div className="max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-lotus-gold/10 via-white/[0.02] to-transparent border border-lotus-gold/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-lotus-gold block mb-1">
                {insightsIndexContent.operationsCard.eyebrow}
              </span>
              <h3 className="font-serif font-bold text-xl text-lotus-cream mb-1">
                {insightsIndexContent.operationsCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-lotus-muted max-w-xl">
                {insightsIndexContent.operationsCard.description}
              </p>
            </div>
            <Link
              href="/growth"
              className="btn-primary shrink-0 text-xs !py-2.5 !px-5"
            >
              {insightsIndexContent.operationsCard.cta} →
            </Link>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 px-5 sm:px-8 border-b border-lotus-border-soft">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-lotus-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 10 published insight essays..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm text-lotus-cream placeholder:text-lotus-muted-2 focus:outline-none focus:border-lotus-gold"
            />
          </div>

          <span className="text-xs text-lotus-muted font-mono-code">
            Showing {filteredArticles.length} of {insightArticles.length} essays
          </span>
        </div>
      </section>

      {/* Insight Articles Grid */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {filteredArticles.map((article, idx) => (
            <ScrollReveal key={article.slug} delay={idx * 60}>
              <article
                onClick={() => {
                  setSelectedSlug(article.slug);
                  navigateTo(`/insights/${article.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-full p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/40 hover:bg-white/[0.04] transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-code text-lotus-gold uppercase tracking-wider mb-3">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{article.keyword}</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-lotus-cream mb-3 group-hover:text-lotus-gold transition">
                    {article.title}
                  </h3>

                  <p className="text-lotus-muted text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-lotus-gold font-semibold">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Page CTA */}
      <PageCta
        title="Grounding Every Insight in Action"
        description="Explore the civilizational foundations and research sources behind these writings."
        links={[
          { href: '/manifesto', label: 'Read Manifesto', primary: true },
          { href: '/research', label: 'Research Dossier' },
        ]}
      />
    </div>
  );
}
