import React, { useState } from 'react';
import Link from 'next/link';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import { getMessages } from '@/i18n';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ScrollReveal from '@/components/ScrollReveal';

export default function PhilosophyPage() {
  const locale = useResolvedLocale();
  const messages = getMessages(locale);
  const { philosophy } = messages;
  const [activeTradition, setActiveTradition] = useState<string>('hindu');

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow={philosophy.hero.eyebrow}
        title={philosophy.hero.title}
        description={philosophy.hero.description}
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      {/* Tradition Selector Tabs */}
      <section className="py-8 px-5 sm:px-8 border-y border-lotus-border-soft bg-lotus-bg-2 sticky top-16 z-20 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
          {philosophy.traditions.map((trad) => {
            const isActive = activeTradition === trad.id;
            return (
              <button
                key={trad.id}
                onClick={() => setActiveTradition(trad.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition flex items-center gap-2 border ${
                  isActive
                    ? 'bg-lotus-gold text-black border-lotus-gold shadow-lg shadow-lotus-gold/20'
                    : 'bg-white/[0.03] text-lotus-muted border-white/[0.08] hover:text-lotus-cream hover:border-lotus-gold/40'
                }`}
              >
                <span>{trad.icon}</span>
                <span>{trad.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Traditions Detail View */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {philosophy.traditions
            .filter((t) => !activeTradition || t.id === activeTradition)
            .map((trad) => (
              <ScrollReveal key={trad.id}>
                <article className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl" role="img">{trad.icon}</span>
                        <h2 className="font-serif font-black text-3xl sm:text-4xl text-lotus-cream">
                          {trad.name}
                        </h2>
                      </div>
                      <p className="text-lotus-gold font-medium text-base">
                        {trad.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-lotus-cream/90 text-base sm:text-lg leading-relaxed mb-8">
                    {trad.overview}
                  </p>

                  {/* Primary Canonical Texts */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-xs uppercase font-mono-code tracking-widest text-lotus-gold">
                      Canonical Texts &amp; Quotes
                    </h3>
                    {trad.texts.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-black/40 border border-white/[0.05]"
                      >
                        <p className="font-serif italic text-lotus-cream/90 text-base mb-2">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <span className="text-xs font-mono-code text-lotus-muted block">
                          — {item.source}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Operational Insight */}
                  <div className="p-6 rounded-2xl bg-lotus-gold/5 border border-lotus-gold/20">
                    <h4 className="text-xs font-mono-code uppercase tracking-wider text-lotus-gold mb-2">
                      Forever Lotus Operational Mapping
                    </h4>
                    <p className="text-sm sm:text-base text-lotus-cream/90 leading-relaxed">
                      {trad.insight}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
        </div>
      </section>

      {/* Upanishadic Foundation */}
      <section className="py-20 px-5 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">{philosophy.primaryTexts.eyebrow}</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-lotus-cream mb-4">
              {philosophy.primaryTexts.title}
            </h2>
            <p className="text-lotus-muted text-base sm:text-lg max-w-2xl mx-auto">
              {philosophy.primaryTexts.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {philosophy.upanishads.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
              >
                <p className="font-serif italic text-lotus-cream/90 text-sm sm:text-base leading-relaxed mb-4">
                  {item.text}
                </p>
                <span className="text-xs font-mono-code text-lotus-gold">
                  {item.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page CTA */}
      <PageCta
        title={philosophy.cta.title}
        description={philosophy.cta.description}
        links={[
          { href: '/research', label: philosophy.cta.primary, primary: true },
          { href: '/manifesto', label: philosophy.cta.secondary },
        ]}
      />
    </div>
  );
}
