import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Website Onboarding';
const description =
  'Generic onboarding path for websites that align with the Forever Lotus Manifesto and seek ethical promotion within the ecosystem.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/onboarding-websites', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/onboarding-websites', 'en'),
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

const criteria = [
  'Mission alignment with compassion, dignity, and non-extractive impact.',
  'Transparent identity, ownership, and primary purpose.',
  'No harmful, manipulative, or exploitative patterns.',
  'Constructive value to education, wellbeing, peace, or stewardship.',
];

const submissionFields = [
  'Website name',
  'Primary URL',
  'Mission summary (3-5 lines)',
  'How the site aligns with the Forever Lotus Manifesto',
  'Contact email for review updates',
];

export default function OnboardingWebsitesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,135,166,0.12) 0%, transparent 62%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Generic Intake</p>
          <h1 className="font-serif font-black text-lotus-cream mb-5" style={{ fontSize: 'clamp(2.1rem, 5.8vw, 4.2rem)' }}>
            Website Onboarding
          </h1>
          <p className="text-lotus-muted text-lg leading-relaxed">{description}</p>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/75 p-6">
            <h2 className="font-serif text-2xl font-bold mb-4">Eligibility Criteria</h2>
            <ul className="space-y-3">
              {criteria.map((item) => (
                <li key={item} className="text-[#4a4640] text-sm leading-relaxed">• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/75 p-6">
            <h2 className="font-serif text-2xl font-bold mb-4">Submission Checklist</h2>
            <ul className="space-y-3">
              {submissionFields.map((item) => (
                <li key={item} className="text-[#4a4640] text-sm leading-relaxed">• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/85 p-6">
          <p className="text-[#3e3833] text-sm leading-relaxed">
            To submit your website, email these details to your preferred Forever Lotus contact channel. This onboarding page is intentionally generic
            so it can be reused for organizations, platforms, communities, and independent projects.
          </p>
        </div>
      </section>
    </>
  );
}
