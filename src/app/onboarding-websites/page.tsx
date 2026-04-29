import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';
import PageHero from '@/components/PageHero';

const title = 'Website Onboarding';
const description =
  'Forever Lotus recognizes and elevates websites that exemplify ethical, dignified, purpose-driven design with a public showcase, contextual backlinks, and ecosystem visibility.';

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
  'Accessible design that centers underserved communities.',
  'No harmful, manipulative, or exploitative patterns.',
  'Zero-extraction or privacy-first data practices.',
  'Constructive value to education, wellbeing, peace, or stewardship.',
];

const submissionFields = [
  'Website name & URL',
  'Founding team or leadership (names, backgrounds)',
  'Mission statement (3-5 lines)',
  'How the site embodies Forever Lotus Manifesto principles',
  'Design philosophy & accessibility approach',
  'Data practices & privacy commitments',
  'Impact metrics or social proof',
  'Contact email for review updates',
];

const benefits = [
  {
    title: 'Elevated Recognition',
    description:
      'Featured on Forever Lotus ecosystem as exemplary digital citizenship, reaching mission-aligned audiences worldwide.',
  },
  {
    title: 'Exclusive Showcase',
    description:
      'Comprehensive, beautifully designed showcase highlighting your mission, values, accessibility, and impact. Like a Nobel Prize for ethical platforms.',
  },
  {
    title: 'Community Alignment',
    description:
      'Connect with other purpose-driven platforms and support each other in building an ecosystem of dignity-first design.',
  },
  {
    title: 'Credibility & Trust',
    description:
      'Third-party validation from Forever Lotus that your platform meets stringent standards for ethics, accessibility, and transparency.',
  },
  {
    title: 'Marketing Amplification',
    description:
      'Your platform is featured in Forever Lotus communications, newsletters, and educational materials. Organic reach to aligned audiences.',
  },
  {
    title: 'Long-term Partnership',
    description:
      'Ongoing collaboration opportunities, co-created content, and potential joint initiatives that amplify collective impact.',
  },
];

const reviewProcess = [
  {
    step: 1,
    title: 'Submit Application',
    description:
      'Fill out the comprehensive form below with your mission, values, design philosophy, and impact metrics.',
  },
  {
    step: 2,
    title: 'Content Evaluation',
    description:
      'Forever Lotus team evaluates your website against manifesto principles using our criteria framework.',
  },
  {
    step: 3,
    title: 'Deep Review',
    description:
      'We conduct a thorough assessment of accessibility, data practices, design patterns, and alignment with our values.',
  },
  {
    step: 4,
    title: 'Recognition & Showcase',
    description:
      'Approved platforms are featured with a comprehensive, beautifully-designed showcase on the ecosystem page.',
  },
];

export default function OnboardingWebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ecosystem Recognition"
        title="Website Onboarding"
        description={`${description} Featured websites receive comprehensive showcase, amplified visibility, and recognition as exemplars of conscious digital creation.`}
        gradient="radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,135,166,0.12) 0%, transparent 62%)"
        titleSize="clamp(2.1rem, 5.8vw, 4.2rem)"
      />

      {/* Value Proposition */}
      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center mb-4">Why Join the Forever Lotus Ecosystem?</h2>
          <p className="text-center text-[#4a4640] mb-12 max-w-2xl mx-auto">
            Recognition from Forever Lotus is the digital equivalent of a Nobel Prize for ethical platforms. We don&apos;t just link to websites—we celebrate them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl bg-white/75 p-6 border border-[rgba(26,22,18,0.12)]">
                <h3 className="font-serif font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#4a4640] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Process */}
      <section className="py-16 px-5 sm:px-8 bg-lotus-bg">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-lotus-cream mb-12">Our Review Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewProcess.map((item) => (
              <div key={item.step} className="rounded-2xl bg-white/10 border border-lotus-border-soft p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lotus-gold text-[#1a1612] flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-lotus-cream mb-2">{item.title}</h3>
                    <p className="text-sm text-lotus-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Details */}
      <section className="py-16 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/75 p-6">
            <h2 className="font-serif text-2xl font-bold mb-4">Eligibility Criteria</h2>
            <ul className="space-y-3">
              {criteria.map((item) => (
                <li key={item} className="text-[#4a4640] text-sm leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[rgba(26,22,18,0.12)] bg-white/75 p-6">
            <h2 className="font-serif text-2xl font-bold mb-4">What We&apos;ll Need</h2>
            <ul className="space-y-3">
              {submissionFields.map((item) => (
                <li key={item} className="text-[#4a4640] text-sm leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 px-5 sm:px-8 bg-lotus-bg">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl border-2 border-lotus-gold bg-white/5 p-10">
            <h2 className="font-serif text-3xl font-bold text-lotus-cream mb-4">Ready to Apply?</h2>
            <p className="text-lotus-muted text-lg leading-relaxed mb-8">
              Send a comprehensive application email to{' '}
              <a href="mailto:hello@example.com" className="text-lotus-gold font-semibold hover:underline">
                hello@forever-lotus.org
              </a>{' '}
              with the information listed above. Please include &quot;Website Onboarding&quot; in the subject line.
            </p>
            <p className="text-lotus-muted text-sm leading-relaxed mb-8">
              We review applications quarterly. Featured websites receive a comprehensive, beautifully-designed showcase on our ecosystem page.
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex btn-primary text-lg"
              data-track="onboarding_apply_cta"
            >
              Submit Your Application
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
