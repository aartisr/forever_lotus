import type { Metadata } from 'next';
import Link from 'next/link';
import { awariconFormula, awariconTiers } from '@/content/awaricon';
import { INTEGRITY_INDICATORS } from '@/lib/awariconCertification';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Awaricon Compliance Guide | Public Certification Standards';
const description =
  'Public Awaricon certification levels, score thresholds, and compliance checklist for websites implementing proof-of-presence trust standards.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/awaricon/compliance', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/awaricon/compliance', 'en'),
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

export default function AwariconCompliancePage() {
  return (
    <section className="bg-lotus-bg px-5 pb-24 pt-32 sm:px-8" aria-labelledby="awaricon-compliance-heading">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3">Public Standard</p>
        <h1 id="awaricon-compliance-heading" className="font-serif text-lotus-cream" style={{ fontSize: 'clamp(2rem,5vw,3.4rem)', fontWeight: 900 }}>
          Awaricon Compliance Guide
        </h1>
        <p className="mt-5 max-w-4xl text-lotus-muted leading-relaxed">
          This page publishes the full Awaricon level framework so organizations can benchmark themselves and implement improvements before formal certification.
          Programmatic access is available at <strong className="text-lotus-cream">/api/awaricon/certification/levels</strong> and the versioned endpoint <strong className="text-lotus-cream">/api/awaricon/certification/levels/v1</strong>.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-lotus-gold/70">Scoring Formula</p>
          <p className="mt-2 font-serif text-2xl text-lotus-cream">{awariconFormula}</p>
          <p className="mt-3 text-sm text-lotus-muted">Weighted model: Phi 35% + Df 35% + Omega 20% + Integrity 10%</p>
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-2xl text-lotus-cream">Certification Levels</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {awariconTiers.map((tier) => (
              <article key={tier.key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.15em] text-lotus-gold/70">{tier.metal}</p>
                <h3 className="mt-1 font-serif text-2xl text-lotus-cream">{tier.label}</h3>
                <p className="mt-2 text-sm text-lotus-muted">Score Range: {tier.scoreRange}</p>
                <p className="mt-3 text-sm text-lotus-muted leading-relaxed">{tier.claim}</p>
                <p className="mt-2 text-sm text-lotus-muted leading-relaxed">{tier.manifestoFit}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-2xl text-lotus-cream">Compliance Checklist</h2>
          <ul className="mt-4 space-y-3">
            {INTEGRITY_INDICATORS.map((item) => (
              <li key={item.key} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-lotus-muted">
                <strong className="text-lotus-cream">{item.key}</strong>: {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/api/awaricon/certification/levels" className="btn-primary">Open Public JSON</Link>
          <Link href="/api/awaricon/certification/levels/v1" className="btn-ghost">Open Versioned JSON</Link>
          <Link href="/awaricon/apply" className="btn-ghost">Apply for Certification</Link>
        </div>
      </div>
    </section>
  );
}
