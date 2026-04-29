import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';
import { getFeaturedWebsite, alignmentCriteria } from '@/content/aligned-websites';
import { WebsiteShowcase, WebsiteCard } from '@/components/WebsiteShowcase';
import PageHero from '@/components/PageHero';

const title = 'Aligned Websites Ecosystem';
const description =
  'Forever Lotus highlights purpose-led websites aligned with the Manifesto, giving ethical platforms a public showcase, contextual backlinks, and visibility through a dignity-first ecosystem.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/ecosystem', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/ecosystem', 'en'),
    title,
    description,
    siteName,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [defaultOgImage],
  },
};

const highlights = [
  'We feature independent websites that share compassion-first values.',
  'We promote mission-driven projects aligned with dignity, peace, education, and stewardship.',
  'Approved websites gain visibility through our ecosystem showcase and future editorial highlights.',
];

export default function EcosystemPage() {
  const featuredWebsite = getFeaturedWebsite();

  return (
    <>
      <PageHero
        eyebrow="Ecosystem"
        title="Aligned Websites"
        description={description}
        gradient="radial-gradient(ellipse 68% 52% at 50% 0%, rgba(20,184,166,0.1) 0%, transparent 62%)"
      />

      {/* Featured Website Showcase */}
      <section className="py-20 px-5 sm:px-8 bg-lotus-bg">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-center">
            <p className="eyebrow mb-2">✨ Exemplary Alignment</p>
            <h2 className="font-serif font-black text-3xl md:text-4xl text-lotus-cream">
              Featured on Forever Lotus
            </h2>
          </div>
          <WebsiteShowcase website={featuredWebsite} featured={true} />
        </div>
      </section>

      {/* What Makes a Website "Aligned" */}
      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-black text-3xl text-center mb-12">
            What We Look For in Aligned Websites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alignmentCriteria.map((criterion) => (
              <div key={criterion.principle} className="rounded-2xl bg-white/70 border border-[rgba(26,22,18,0.12)] p-6">
                <h3 className="font-serif font-bold text-lg mb-3">{criterion.principle}</h3>
                <p className="text-sm leading-relaxed text-[#4a4640]">{criterion.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights & CTA */}
      <section className="py-16 px-5 sm:px-8 bg-lotus-bg">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {highlights.map((item) => (
              <article key={item} className="rounded-2xl border border-lotus-border-soft bg-white/10 p-6">
                <p className="text-lotus-muted text-sm leading-relaxed">{item}</p>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-lotus-border-soft bg-white/5 p-7 text-center">
            <h2 className="font-serif text-2xl font-bold text-lotus-cream mb-3">Want your website featured?</h2>
            <p className="text-lotus-muted text-sm leading-relaxed mb-5">
              If your platform exemplifies dignified, ethical, and purpose-driven design—we&apos;d love to amplify your work.
              Showcase your commitment to compassion, transparency, and conscious creation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/onboarding-websites" className="inline-flex btn-primary" data-track="ecosystem_onboarding_cta">
                Apply for Onboarding
              </Link>
              <Link href="/backlinks" className="inline-flex btn-ghost" data-track="ecosystem_backlink_kit_cta">
                Get Backlink Kit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
