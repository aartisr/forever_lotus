import type { Metadata } from 'next';
import Link from 'next/link';
import { awariconCopyright } from '@/content/awaricon';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Awaricon Copyright and Usage Policy';
const description =
  'Official legal policy for Awaricon marks, icons, badges, visual assets, usage permissions, attribution rules, ownership scope, and licensing guidance for partners.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/awaricon/legal', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/awaricon/legal', 'en'),
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

export default function AwariconLegalPage() {
  return (
    <section className="bg-lotus-bg px-5 pb-24 pt-32 sm:px-8" aria-labelledby="awaricon-legal-heading">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow mb-3">Awaricon Legal</p>
        <h1 id="awaricon-legal-heading" className="font-serif text-lotus-cream" style={{ fontSize: 'clamp(2rem,5vw,3.4rem)', fontWeight: 900 }}>
          Copyright and Usage Policy
        </h1>
        <p className="mt-5 text-lotus-muted leading-relaxed">
          {awariconCopyright.notice} The Awaricon name, logos, icon variants, badges, and associated visual systems are proprietary creative assets of {awariconCopyright.holder}.
        </p>

        <div className="mt-8 space-y-4">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="font-serif text-2xl text-lotus-cream mb-3">Ownership Scope</h2>
            <ul className="space-y-2 text-lotus-muted text-sm leading-relaxed list-disc pl-5">
              <li>Awaricon icon variants (Crystal Celestial, Monoline Luxury, Celestial Heraldic)</li>
              <li>Tier badge compositions (Platinum, Gold, Silver, Bronze)</li>
              <li>Awaricon naming, emblem architecture, and presentation language</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="font-serif text-2xl text-lotus-cream mb-3">Usage Terms</h2>
            <ul className="space-y-2 text-lotus-muted text-sm leading-relaxed list-disc pl-5">
              <li>No commercial resale, sublicensing, or redistribution without written permission.</li>
              <li>No removal of copyright notices embedded in downloadable icon assets.</li>
              <li>No deceptive use implying endorsement by Forever Lotus where none exists.</li>
              <li>Derivative marks based on Awaricon geometry require explicit approval.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-lotus-gold/30 bg-lotus-gold-dim p-6">
            <h2 className="font-serif text-2xl text-lotus-cream mb-3">Permissions and Licensing</h2>
            <p className="text-sm text-lotus-muted leading-relaxed">
              For licensing, collaboration, or authorized distribution rights, contact the Forever Lotus maintainers through the public repository and include your intended use, territory, and duration.
            </p>
          </article>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/awaricon" className="btn-primary">Back To Awaricon</Link>
          <Link href="/manifesto" className="btn-ghost">Read Manifesto</Link>
        </div>
      </div>
    </section>
  );
}
