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
    path: '/manifesto',
    locale,
    title: messages.manifesto.meta.title,
    description: messages.manifesto.meta.description,
  });
}

export default async function ManifestoPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);
  const messages = getMessages(locale);

  return (
    <>
      <PageHero
        eyebrow={messages.manifesto.hero.eyebrow}
        title={messages.manifesto.hero.title}
        description={messages.manifesto.hero.description}
        gradient="radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 60%)"
        titleSize="clamp(2.6rem, 6vw, 5rem)"
        paddingBottom="pb-20"
      >
        <div className="lotus-divider mt-12 max-w-sm mx-auto">
          <LotusIcon size={22} variant="section" />
        </div>
      </PageHero>

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
      <PageCta
        eyebrow={messages.manifesto.cta.eyebrow}
        title={messages.manifesto.cta.title}
        links={[
          { href: withLocale('/philosophy', locale), label: messages.manifesto.cta.primary, primary: true },
          { href: withLocale('/research', locale), label: messages.manifesto.cta.secondary },
        ]}
      />
    </>
  );
}
