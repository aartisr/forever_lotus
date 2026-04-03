import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';
import { getMessages, resolveLocale, withLocale } from '@/i18n';

export function generateMetadata(): Metadata {
  const messages = getMessages(resolveLocale(undefined));
  return {
    title: messages.philosophy.meta.title,
    description: messages.philosophy.meta.description,
  };
}

type PageProps = {
  searchParams?: {
    lang?: string | string[];
  };
};

export default function PhilosophyPage({ searchParams }: PageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const messages = getMessages(locale);

  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,135,166,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">{messages.philosophy.hero.eyebrow}</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            {messages.philosophy.hero.title}
          </h1>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed">
            {messages.philosophy.hero.description}
          </p>
          <div className="lotus-divider mt-12 max-w-sm mx-auto">
            <LotusIcon size={22} variant="section" />
          </div>
        </div>
      </section>

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
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg text-center border-t border-lotus-border-soft">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2
              className="font-serif font-bold text-lotus-cream mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              {messages.philosophy.cta.title}
            </h2>
            <p className="text-lotus-muted mb-8 leading-relaxed">
              {messages.philosophy.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={withLocale('/research', locale)} className="btn-primary">
                {messages.philosophy.cta.primary} →
              </Link>
              <Link href={withLocale('/manifesto', locale)} className="btn-ghost">
                {messages.philosophy.cta.secondary}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
