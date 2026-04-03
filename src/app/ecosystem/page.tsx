import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Aligned Websites Ecosystem';
const description =
  'Forever Lotus highlights and promotes websites that align with the Manifesto. Purpose-led websites can request promotion and visibility here.';

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
  return (
    <>
      <section className="relative pt-32 pb-16 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 68% 52% at 50% 0%, rgba(20,184,166,0.1) 0%, transparent 62%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Ecosystem</p>
          <h1 className="font-serif font-black text-lotus-cream mb-5" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
            Aligned Websites
          </h1>
          <p className="text-lotus-muted text-lg leading-relaxed">{description}</p>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((item) => (
            <article key={item} className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/70 p-6">
              <p className="text-[#4a4640] text-sm leading-relaxed">{item}</p>
            </article>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-10 rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/80 p-7 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#1a1612] mb-3">Want your website featured?</h2>
          <p className="text-[#4a4640] text-sm leading-relaxed mb-5">
            If your platform agrees with the Forever Lotus Manifesto and promotes ethical, dignity-first outcomes,
            you can request onboarding for showcase and promotion.
          </p>
          <Link href="/onboarding-websites" className="inline-flex btn-primary" data-track="ecosystem_onboarding_cta">
            Onboard Your Website
          </Link>
        </div>
      </section>
    </>
  );
}
