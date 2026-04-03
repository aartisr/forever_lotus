import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';
import { getMessages, resolveLocale, withLocale } from '@/i18n';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

type PageProps = {
  searchParams?: {
    lang?: string | string[];
  };
};

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const locale = resolveLocale(searchParams?.lang);
  const messages = getMessages(locale);
  const path = '/about';

  return {
    title: messages.about.meta.title,
    description: messages.about.meta.description,
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: 'article',
      url: buildPageUrl(path, locale),
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      title: messages.about.meta.title,
      description: messages.about.meta.description,
      siteName,
      images: [defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.about.meta.title,
      description: messages.about.meta.description,
      images: [defaultOgImage],
    },
  };
}

export default function AboutPage({ searchParams }: PageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const messages = getMessages(locale);
  const founderLotusImage =
    'https://upload.wikimedia.org/wikipedia/commons/3/3a/Nelumbo_nucifera_pink_flower.jpg';

  return (
    <>
      {/* Page hero */}
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
          <p className="eyebrow mb-4">{messages.about.hero.eyebrow}</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            {messages.about.hero.title}
          </h1>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed">
            {messages.about.hero.description}
          </p>
          <div className="lotus-divider mt-12 max-w-sm mx-auto">
            <LotusIcon size={22} variant="section" />
          </div>
        </div>
      </section>

      {/* What it is / is not */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg-2" aria-labelledby="what-heading">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="eyebrow mb-4">{messages.about.strategic.eyebrow}</p>
            <h2
              id="what-heading"
              className="font-serif font-bold text-lotus-cream"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              {messages.about.strategic.title}
            </h2>
            <p className="text-lotus-muted mt-4 max-w-2xl mx-auto leading-relaxed">
              {messages.about.strategic.description}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
            {messages.about.strategic.values.map(({ icon, label, sub, color }) => (
              <ScrollReveal key={label} className="h-full">
                <div className="card-glass rounded-2xl p-6 text-center h-full">
                  <div className="text-3xl mb-3">{icon}</div>
                  <p
                    className="font-serif font-semibold text-sm mb-1"
                    style={{ color }}
                  >
                    {label}
                  </p>
                  <p className="text-lotus-muted text-xs leading-snug">{sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder section */}
      <section className="relative py-24 px-5 sm:px-8 bg-lotus-bg overflow-hidden" aria-labelledby="founder-heading">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,12,31,0.88) 0%, rgba(15,12,31,0.78) 100%), url(${founderLotusImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 36%',
            filter: 'saturate(0.85) blur(1px)',
            opacity: 0.33,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 72% 36%, rgba(232,135,166,0.22) 0%, transparent 66%), radial-gradient(ellipse 45% 40% at 30% 70%, rgba(201,168,76,0.1) 0%, transparent 72%)',
          }}
        />
        <div className="max-w-4xl mx-auto">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <p className="eyebrow mb-4">{messages.about.founder.eyebrow}</p>
              <h2
                id="founder-heading"
                className="font-serif font-black text-lotus-cream mb-5"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              >
                {messages.about.founder.name}
              </h2>
              <p className="text-lotus-muted leading-relaxed mb-5">
                {messages.about.founder.p1}
              </p>
              <p className="text-lotus-muted leading-relaxed">
                {messages.about.founder.p2}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="card-glass-gold rounded-2xl p-8">
                <p className="eyebrow mb-4">{messages.about.founder.paperEyebrow}</p>
                <blockquote className="font-serif italic text-lotus-cream/85 text-lg leading-relaxed mb-5">
                  &ldquo;{messages.about.founder.paperQuote}&rdquo;
                </blockquote>
                <footer className="text-lotus-gold/60 text-xs tracking-wide">
                  — {messages.about.founder.paperCite}
                </footer>
                <a
                  href="https://github.com/aartisr/forever_lotus"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-6 text-sm text-lotus-gold/75 hover:text-lotus-gold transition-colors duration-200"
                >
                  {messages.about.founder.repoLink}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Operating Commitments */}
      <section className="py-24 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]" aria-labelledby="commitments-heading">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#c9a84c] mb-4">
              {messages.about.commitments.eyebrow}
            </p>
            <h2
              id="commitments-heading"
              className="font-serif font-bold text-[#1a1612]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              {messages.about.commitments.title}
            </h2>
            <p className="text-[#4a4640] mt-4 max-w-xl mx-auto leading-relaxed">
              {messages.about.commitments.description}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {messages.about.commitments.items.map(({ num, title, body }) => (
              <ScrollReveal key={num} className="h-full">
                <div className="rounded-2xl p-6 h-full border border-[rgba(26,22,18,0.10)] bg-white/50 hover:border-[#c9a84c]/30 hover:shadow-md transition-all duration-400">
                  <span className="font-serif text-[#c9a84c]/50 text-xs font-bold tracking-widest block mb-2">
                    {num}
                  </span>
                  <h3 className="font-serif font-bold text-[#1a1612] text-lg mb-3">
                    {title}
                  </h3>
                  <p className="text-[#5a5450] text-sm leading-relaxed">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Moral Lineage */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg-3" aria-labelledby="lineage-heading">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <LotusIcon size={48} variant="section" className="mx-auto mb-8 opacity-70 animate-float" />
            <p className="eyebrow mb-4">{messages.about.lineage.eyebrow}</p>
            <h2
              id="lineage-heading"
              className="font-serif font-bold text-lotus-cream mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              {messages.about.lineage.title}
            </h2>
            <p className="text-lotus-muted text-lg leading-relaxed mb-5">
              {messages.about.lineage.p1}
            </p>
            <p className="text-lotus-muted/70 text-base leading-relaxed max-w-xl mx-auto">
              {messages.about.lineage.p2}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg text-center border-t border-lotus-border-soft">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p
              className="font-serif italic font-bold text-gold-shimmer mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}
            >
              &ldquo;{messages.about.cta.quote}&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={withLocale('/manifesto', locale)} className="btn-primary">
                {messages.about.cta.primary} →
              </Link>
              <Link href={withLocale('/research', locale)} className="btn-ghost">
                {messages.about.cta.secondary}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
