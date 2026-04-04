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
    path: '/research',
    locale,
    title: messages.researchPage.meta.title,
    description: messages.researchPage.meta.description,
  });
}

export default async function ResearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);
  const messages = getMessages(locale);

  return (
    <>
      <PageHero
        eyebrow={messages.researchPage.hero.eyebrow}
        title={messages.researchPage.hero.title}
        description={messages.researchPage.hero.description}
        gradient="radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,182,168,0.07) 0%, transparent 60%)"
        titleSize="clamp(2.6rem, 6vw, 5rem)"
        paddingBottom="pb-20"
      >
        <div className="lotus-divider mt-12 max-w-sm mx-auto">
          <LotusIcon size={22} variant="section" />
        </div>
      </PageHero>

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
      <PageCta
        title={messages.researchPage.cta.title}
        description={messages.researchPage.cta.description}
        links={[
          { href: withLocale('/manifesto', locale), label: messages.researchPage.cta.primary, primary: true },
          { href: withLocale('/philosophy', locale), label: messages.researchPage.cta.secondary },
        ]}
      />
    </>
  );
}
