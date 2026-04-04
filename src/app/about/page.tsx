import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { getMessages, resolveLocale, withLocale } from '@/i18n';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

type PageProps = {
  searchParams?: Promise<{
    lang?: string | string[];
  }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);
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

export default async function AboutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);
  const messages = getMessages(locale);
  const founderLotusImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nelumbo_nucifera_flower_in_full_bloom.jpg/1920px-Nelumbo_nucifera_flower_in_full_bloom.jpg';

  return (
    <>
      <PageHero
        eyebrow={messages.about.hero.eyebrow}
        title={messages.about.hero.title}
        description={messages.about.hero.description}
        gradient="radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 60%)"
        titleSize="clamp(2.6rem, 6vw, 5rem)"
        paddingBottom="pb-20"
      >
        <div className="lotus-divider mt-12 max-w-sm mx-auto">
          <LotusIcon size={22} variant="section" />
        </div>
      </PageHero>

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
            backgroundImage: `linear-gradient(180deg, rgba(15,12,31,0.72) 0%, rgba(15,12,31,0.58) 100%), url(${founderLotusImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            filter: 'saturate(1.05) contrast(1.04)',
            transform: 'scale(1.08)',
            opacity: 0.52,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 62% 52% at 50% 42%, rgba(232,135,166,0.2) 0%, rgba(232,135,166,0.04) 58%, transparent 74%), radial-gradient(ellipse 48% 42% at 30% 72%, rgba(201,168,76,0.11) 0%, transparent 72%)',
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
