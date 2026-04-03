import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';
import { getMessages, resolveLocale, withLocale } from '@/i18n';

export function generateMetadata(): Metadata {
  const messages = getMessages(resolveLocale(undefined));
  return {
    title: messages.researchPage.meta.title,
    description: messages.researchPage.meta.description,
  };
}

type PageProps = {
  searchParams?: {
    lang?: string | string[];
  };
};

export default function ResearchPage({ searchParams }: PageProps) {
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
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,182,168,0.07) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">{messages.researchPage.hero.eyebrow}</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            {messages.researchPage.hero.title}
          </h1>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed">
            {messages.researchPage.hero.description}
          </p>
          <div className="lotus-divider mt-12 max-w-sm mx-auto">
            <LotusIcon size={22} variant="section" />
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="py-10 px-5 sm:px-8 bg-lotus-bg-2 border-y border-lotus-border-soft">
        <div className="max-w-4xl mx-auto">
          <div className="card-glass-gold rounded-2xl p-6">
            <p className="eyebrow mb-2">{messages.researchPage.method.eyebrow}</p>
            <p className="text-lotus-cream/75 text-sm leading-relaxed max-w-3xl">
              {messages.researchPage.method.description}
            </p>
          </div>
        </div>
      </section>

      {/* Category sections — light background for readability */}
      <section className="bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 space-y-16">
          {messages.researchPage.categories.map(({ id, letter, title, color, sources }) => (
            <ScrollReveal key={id}>
              <div className="border-b border-[rgba(26,22,18,0.12)] pb-14">
                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-serif font-black text-lg shrink-0"
                    style={{ background: `${color}18`, color }}
                  >
                    {letter}
                  </div>
                  <h2
                    className="font-serif font-bold text-[#1a1612]"
                    style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
                  >
                    {title}
                  </h2>
                </div>

                {/* Sources */}
                <div className="space-y-4">
                  {sources.map(({ citation, doi, note }) => (
                    <div
                      key={citation.slice(0, 40)}
                      className="rounded-xl p-5 border"
                      style={{
                        background: `${color}06`,
                        borderColor: `${color}20`,
                        borderLeft: `3px solid ${color}`,
                      }}
                    >
                      <p className="text-[#2a2420] text-sm leading-relaxed mb-2">
                        {citation}
                      </p>
                      {doi && (
                        <a
                          href={doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs break-all hover:underline"
                          style={{ color }}
                        >
                          {doi}
                        </a>
                      )}
                      {note && (
                        <p className="text-[#7a7470] text-xs mt-2 italic border-t border-[rgba(26,22,18,0.08)] pt-2">
                          {note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
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
              {messages.researchPage.cta.title}
            </h2>
            <p className="text-lotus-muted mb-8 leading-relaxed">
              {messages.researchPage.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={withLocale('/manifesto', locale)} className="btn-primary">
                {messages.researchPage.cta.primary} →
              </Link>
              <Link href={withLocale('/philosophy', locale)} className="btn-ghost">
                {messages.researchPage.cta.secondary}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
