import type { Metadata } from 'next';
import AwariconApplicationForm from '@/components/AwariconApplicationForm';
import AwariconCertificationStatus from '@/components/AwariconCertificationStatus';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Apply for Awaricon Certification | Forever Lotus';
const description =
  'Submit your website for Awaricon Certification — a proof-of-presence badge recognizing conscious digital agency, dignity-centered design, and ethical stewardship.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/awaricon/apply', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/awaricon/apply', 'en'),
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

export default function AwariconApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#06070f] px-5 pb-16 pt-32 sm:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(169,214,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 80% 80%, rgba(255,204,107,0.10) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-lotus-gold/70">Forever Lotus — Awaricon Program</p>
          <h1 className="font-serif text-lotus-cream" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)', fontWeight: 900, lineHeight: 1.08 }}>
            Apply for Awaricon Certification
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-lotus-muted">
            Awaricon Certification recognizes websites that embody <strong className="text-lotus-cream">conscious digital presence</strong>, dignity-centered design, and long-term ethical stewardship. Four tiers — Platinum, Gold, Silver, Bronze — reflect your Aw score.
          </p>
        </div>
      </section>

      {/* Process overview */}
      <section className="bg-lotus-bg px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6 text-center">How Certification Works</p>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Self-Assessment',
                desc: 'Complete a guided 5-step application. Score your Phi (presence), Df (dignity), trajectory, and integrity commitments. The system computes your Aw score live.',
              },
              {
                step: '02',
                title: 'Expert Review',
                desc: 'The Forever Lotus team evaluates your application, verifies your integrity claims, and determines your certification tier. Typical review: 3–10 business days.',
              },
              {
                step: '03',
                title: 'Badge & Embed Kit',
                desc: 'Approved sites receive their tier badge, a signed embed token, and copy-paste HTML to display the Awaricon badge anywhere on their website.',
              },
            ].map((item) => (
              <article key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="mb-3 font-mono text-3xl font-black text-lotus-gold/40">{item.step}</p>
                <h3 className="mb-2 font-serif text-xl text-lotus-cream">{item.title}</h3>
                <p className="text-sm text-lotus-muted leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>

          {/* Tier requirements */}
          <div className="mt-12">
            <p className="eyebrow mb-4">Scoring Thresholds</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { tier: 'Platinum', range: 'Aw 92–100', color: '#dff7ff', desc: 'Global exemplar of ethical presence' },
                { tier: 'Gold', range: 'Aw 80–91', color: '#ffd369', desc: 'High-trust guardian of humane systems' },
                { tier: 'Silver', range: 'Aw 65–79', color: '#d8e1e8', desc: 'Reliable steward of authentic participation' },
                { tier: 'Bronze', range: 'Aw 50–64', color: '#d28a5c', desc: 'Emerging practitioner committed to growth' },
              ].map((t) => (
                <div key={t.tier} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-serif text-lg font-black" style={{ color: t.color }}>{t.tier}</p>
                  <p className="text-xs text-lotus-gold/70">{t.range}</p>
                  <p className="mt-2 text-xs text-lotus-muted leading-snug">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="bg-[#070914] px-5 py-20 sm:px-8" aria-labelledby="apply-form-heading">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-2 text-center">Submit Your Application</p>
          <h2 id="apply-form-heading" className="mb-8 text-center font-serif text-3xl font-black text-lotus-cream">
            Start the Certification Process
          </h2>
          <AwariconApplicationForm />
        </div>
      </section>

      {/* Status lookup */}
      <section className="bg-lotus-bg px-5 py-20 sm:px-8" aria-labelledby="status-heading">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-2 text-center">Already Applied?</p>
          <h2 id="status-heading" className="mb-8 text-center font-serif text-3xl font-black text-lotus-cream">
            Track Your Application
          </h2>
          <AwariconCertificationStatus />
        </div>
      </section>

      {/* FAQ strip */}
      <section className="border-t border-lotus-border-soft bg-lotus-bg-2 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="eyebrow mb-4">Common Questions</p>
          {[
            {
              q: 'Is certification free?',
              a: 'Yes. The Awaricon certification process is currently offered at no cost as part of the Forever Lotus mission.',
            },
            {
              q: 'How long does a certificate last?',
              a: 'Certifications are valid for 12 months. Sites are encouraged to reapply to reflect ongoing growth and renewed commitment.',
            },
            {
              q: 'Can a certification be revoked?',
              a: 'Yes. Forever Lotus reserves the right to revoke certifications if a site no longer meets the integrity standards it committed to.',
            },
            {
              q: 'What happens after approval?',
              a: 'Approved sites are added to the Awaricon registry. You can then request signed embed tokens from the admin console to display your badge.',
            },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
              <p className="font-serif text-base font-bold text-lotus-cream">{item.q}</p>
              <p className="mt-2 text-sm text-lotus-muted leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
