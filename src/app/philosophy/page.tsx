import React from 'react';
import type { Metadata } from 'next';
import LotusIcon from '@/components/LotusIcon';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import PageCta from '@/components/sections/PageCta';
import { getMessages, resolveLocale, withLocale } from '@/i18n';
import { buildLocalizedPageMetadata } from '@/lib/page-metadata';

type PageProps = {
  searchParams?: Promise<{
    lang?: string | string[];
  }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);
  const messages = getMessages(locale);

  return buildLocalizedPageMetadata({
    path: '/philosophy',
    locale,
    title: messages.philosophy.meta.title,
    description: messages.philosophy.meta.description,
  });
}

export default async function PhilosophyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);
  const messages = getMessages(locale);

  return (
    <>
      <PageHero
        eyebrow={messages.philosophy.hero.eyebrow}
        title={messages.philosophy.hero.title}
        description={messages.philosophy.hero.description}
        gradient="radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,135,166,0.08) 0%, transparent 60%)"
        titleSize="clamp(2.6rem, 6vw, 5rem)"
        paddingBottom="pb-20"
      >
        <div className="lotus-divider mt-12 max-w-sm mx-auto">
          <LotusIcon size={22} variant="section" />
        </div>
      </PageHero>

      {/* Traditions */}
      <div className="bg-lotus-bg">
        {messages.philosophy.traditions.map(({ id, name, color, tagline, icon, overview, texts, insight }, idx) => (
          <section
            key={id}
            className={`py-24 px-5 sm:px-8 ${idx % 2 !== 0 ? 'bg-lotus-bg-2' : ''}`}
            aria-labelledby={`trad-${id}`}
          >
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ color, fontSize: '1.8rem' }}>{icon}</span>
                  <p className="eyebrow" style={{ color: `${color}99` }}>
                    {name}
                  </p>
                </div>
                <h2
                  id={`trad-${id}`}
                  className="font-serif font-black text-lotus-cream mb-3"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
                >
                  {tagline}
                </h2>
                <p className="text-lotus-muted text-lg leading-relaxed mb-10 max-w-2xl">
                  {overview}
                </p>
              </ScrollReveal>

              <div className="space-y-5 stagger-children mb-10">
                {texts.map(({ source, quote }) => (
                  <ScrollReveal key={source} className="h-full">
                    <div
                      className="card-glass rounded-2xl p-7 border border-lotus-border-soft"
                      style={{ borderLeft: `2px solid ${color}`, borderLeftColor: color }}
                    >
                      <p className="font-serif italic text-lotus-cream/85 leading-relaxed mb-3 text-base sm:text-lg">
                        &ldquo;{quote}&rdquo;
                      </p>
                      <p className="text-lotus-muted-2 text-xs tracking-wide uppercase">
                        — {source}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <div
                  className="inline-block rounded-xl px-6 py-4 text-sm leading-relaxed"
                  style={{
                    background: `linear-gradient(135deg, ${color}12, ${color}06)`,
                    border: `1px solid ${color}25`,
                    color: '#f0ece488',
                  }}
                >
                    <strong style={{ color }}>Forever Lotus insight:</strong>{' '}
                  {insight}
                </div>
              </ScrollReveal>
            </div>
          </section>
        ))}
      </div>

      {/* Primary texts */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg-3" aria-labelledby="upanishads-heading">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="eyebrow mb-4">{messages.philosophy.primaryTexts.eyebrow}</p>
            <h2
              id="upanishads-heading"
              className="font-serif font-bold text-lotus-cream mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              {messages.philosophy.primaryTexts.title}
            </h2>
            <p className="text-lotus-muted text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
              {messages.philosophy.primaryTexts.description}
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3 stagger-children">
            {messages.philosophy.upanishads.map(({ text, source }) => (
              <ScrollReveal key={source} className="h-full">
                <blockquote className="card-glass-gold rounded-2xl p-6 h-full text-left">
                  <p className="font-serif italic text-lotus-cream/85 leading-relaxed mb-4 text-base">
                    {text}
                  </p>
                  <footer className="text-lotus-gold/60 text-xs tracking-wide">
                    — {source}
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <PageCta
        title={messages.philosophy.cta.title}
        description={messages.philosophy.cta.description}
        links={[
          { href: withLocale('/research', locale), label: messages.philosophy.cta.primary, primary: true },
          { href: withLocale('/manifesto', locale), label: messages.philosophy.cta.secondary },
        ]}
      />
    </>
  );
}
