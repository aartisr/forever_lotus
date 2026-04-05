import type { Metadata } from 'next';
import Link from 'next/link';
import AwariconBadge from '@/components/AwariconBadge';
import AwariconCalculator from '@/components/AwariconCalculator';
import AwariconCalculusExplainer from '@/components/AwariconCalculusExplainer';
import AwariconFormulaPopover from '@/components/AwariconFormulaPopover';
import AwariconIconStudio from '@/components/AwariconIconStudio';
import AwariconEmbedKit from '@/components/AwariconEmbedKit';
import { awariconDocAnchors, awariconFormula, awariconPrinciples, awariconTiers } from '@/content/awaricon';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Awaricon | Proof-of-Presence Badge System';
const description =
  'A dedicated Forever Lotus initiative: Awaricon Platinum, Gold, Silver, and Bronze badges designed as a manifesto-aligned trust architecture for the sentient era.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/awaricon', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/awaricon', 'en'),
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

export default function AwariconPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06070f] px-5 pb-24 pt-32 sm:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(169,214,255,0.18) 0%, transparent 62%), radial-gradient(ellipse 46% 40% at 16% 82%, rgba(255,204,107,0.12) 0%, transparent 72%), radial-gradient(ellipse 38% 40% at 86% 70%, rgba(214,233,255,0.12) 0%, transparent 76%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-lotus-gold/70">Forever Lotus Special Program</p>
          <h1 className="awaricon-title font-serif text-lotus-cream" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.8rem)', fontWeight: 900, lineHeight: 1.05 }}>
            AWARICON
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-lotus-muted">
            Awaricon is designed as an aspirational <strong className="text-lotus-cream">Proof-of-Presence</strong> emblem for the Sentient Era: a way to celebrate conscious agency, ethical authorship, and accountable participation in digital civilization.
          </p>

          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3">
            <span className="text-xs uppercase tracking-[0.18em] text-lotus-gold/70">Awaricon Calculus</span>
            <code className="font-serif text-sm text-lotus-cream">{awariconFormula}</code>
            <AwariconFormulaPopover />
          </div>
        </div>
      </section>

      <section className="bg-lotus-bg px-5 py-24 sm:px-8" aria-labelledby="manifesto-fit-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Why This Belongs In Forever Lotus</p>
            <h2 id="manifesto-fit-heading" className="font-serif text-lotus-cream" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', fontWeight: 800 }}>
              Manifesto Alignment, Not Just Badge Aesthetics
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {awariconPrinciples.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="font-serif text-2xl text-lotus-cream mb-3">{item.title}</h3>
                <p className="text-lotus-muted leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-lotus-gold/30 bg-lotus-gold-dim p-6">
            <p className="text-sm text-lotus-muted leading-relaxed">
              Design note from the source papers: we preserve the ambition of “presence-based trust” while grounding it in Forever Lotus ethics.
              This page intentionally frames Awaricon as a <strong className="text-lotus-cream">compassionate, non-exclusionary growth ladder</strong>, not a dehumanizing label.
            </p>
          </div>

          <div className="mt-10">
            <AwariconCalculusExplainer />
          </div>
        </div>
      </section>

      <section className="bg-[#070914] px-5 py-24 sm:px-8" aria-labelledby="tiers-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Metal Level Framework</p>
            <h2 id="tiers-heading" className="font-serif text-lotus-cream" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 900 }}>
              Platinum, Gold, Silver, Bronze
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lotus-muted leading-relaxed">
              Four world-class tiers with outworldly visual identity and explicit manifesto accountability.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {awariconTiers.map((tier, index) => (
              <AwariconBadge key={tier.key} tier={tier} index={index} />
            ))}
          </div>

          <AwariconIconStudio />
          <AwariconCalculator />
          <AwariconEmbedKit />
        </div>
      </section>

      <section className="bg-lotus-bg-2 px-5 py-20 sm:px-8" aria-labelledby="anchors-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="anchors-heading" className="font-serif text-lotus-cream mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800 }}>
            Source Anchors Used For This Design
          </h2>
          <ul className="space-y-3 text-lotus-muted">
            {awariconDocAnchors.map((anchor) => (
              <li key={anchor} className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">{anchor}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-lotus-border-soft bg-lotus-bg px-5 py-20 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-lotus-cream mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900 }}>
            Build The Most Loved Badge Ecosystem In The World
          </h2>
          <p className="text-lotus-muted leading-relaxed mb-8">
            Awaricon becomes meaningful when beauty, rigor, and ethics move together.
            In Forever Lotus terms: a badge should not only look legendary, it should protect dignity and inspire conscious creation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/awaricon/apply" className="btn-primary">Apply for Certification →</Link>
            <Link href="/awaricon/badge-generator" className="btn-ghost">Badge Embed Generator</Link>
            <Link href="/awaricon/compliance" className="btn-ghost">Public Compliance Guide</Link>
            <Link href="/api/awaricon/certification/levels" className="btn-ghost">Public Levels API</Link>
            <Link href="/manifesto" className="btn-ghost">Read Manifesto</Link>
            <Link href="/research" className="btn-ghost">Research Foundation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
