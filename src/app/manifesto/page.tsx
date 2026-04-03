import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';
import { getMessages, resolveLocale, withLocale } from '@/i18n';

export function generateMetadata(): Metadata {
  const messages = getMessages(resolveLocale(undefined));
  return {
    title: messages.manifesto.meta.title,
    description: messages.manifesto.meta.description,
  };
}

type PageProps = {
  searchParams?: {
    lang?: string | string[];
  };
};

export default function ManifestoPage({ searchParams }: PageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const messages = getMessages(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">{messages.manifesto.hero.eyebrow}</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            {messages.manifesto.hero.title}
          </h1>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed">
            {messages.manifesto.hero.description}
          </p>
          <div className="lotus-divider mt-12 max-w-sm mx-auto">
            <LotusIcon size={22} variant="section" />
          </div>
        </div>
      </section>

      {/* Manifesto sections — light editorial background */}
      <section className="bg-[#f5f0e8] text-[#1a1612]" aria-label="Manifesto sections">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
          {messages.manifesto.sections.map(({ num, title, body }, index) => (
            <ScrollReveal key={num}>
              <article
                className={`py-12 ${index !== messages.manifesto.sections.length - 1 ? 'border-b border-[rgba(26,22,18,0.10)]' : ''}`}
                aria-labelledby={`section-${num}`}
              >
                <div className="flex items-start gap-5">
                  {/* Roman numeral */}
                  <span
                    className="font-serif text-[#c9a84c] font-black shrink-0 mt-1 select-none"
                    style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
                    aria-hidden="true"
                  >
                    {num}.
                  </span>

                  <div>
                    <h2
                      id={`section-${num}`}
                      className="font-serif font-bold text-[#1a1612] mb-4"
                      style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)' }}
                    >
                      {title}
                    </h2>
                    <p className="text-[#4a4640] leading-relaxed text-base sm:text-[1.05rem]">
                      {body}
                    </p>
                  </div>
                </div>

                {index === messages.manifesto.sections.length - 1 && (
                  <div className="mt-10 pt-10 border-t border-[rgba(26,22,18,0.12)] text-center">
                    <p className="font-serif italic text-2xl text-[#c9a84c] font-semibold">
                      &ldquo;{messages.manifesto.closing}&rdquo;
                    </p>
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg text-center border-t border-lotus-border-soft">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="eyebrow mb-4">{messages.manifesto.cta.eyebrow}</p>
            <h2
              className="font-serif font-bold text-lotus-cream mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
            >
              {messages.manifesto.cta.title}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={withLocale('/philosophy', locale)} className="btn-primary">
                {messages.manifesto.cta.primary} →
              </Link>
              <Link href={withLocale('/research', locale)} className="btn-ghost">
                {messages.manifesto.cta.secondary}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
