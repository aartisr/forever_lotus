import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Forever Lotus — its founding vision, operating commitments, and the civilizational framework authored by Subasri Dorairaj.',
};

const commitments = [
  {
    num: '01',
    title: 'Metrics of Dignity',
    body: 'Publish annual dignity and impact metrics — not vanity metrics. Success is measured by suffering reduced and capability grown.',
  },
  {
    num: '02',
    title: 'Initiative Integrity',
    body: 'Tie every initiative to measurable outcomes. No program exists for appearance. Each must reduce harm or expand agency.',
  },
  {
    num: '03',
    title: 'Firewall from Self-Promotion',
    body: 'A clear, non-negotiable firewall between service and self-promotion. The brand serves the mission, not the reverse.',
  },
  {
    num: '04',
    title: 'Open Learning Systems',
    body: 'Build learning infrastructure that is open, multilingual, and culturally grounded — accessible to every human being.',
  },
  {
    num: '05',
    title: 'Local Agency First',
    body: 'Prioritize partnerships that strengthen local agency and capability, not partnerships that export external frameworks wholesale.',
  },
  {
    num: '06',
    title: 'No Extractive Trade-offs',
    body: 'Refuse projects that require extractive trade-offs. If achieving one goal requires compromising dignity elsewhere, it is rejected.',
  },
];

const values = [
  {
    icon: '🌿',
    label: 'Not bureaucratic',
    sub: 'No bureaucratic rigidity.',
    color: '#14b8a6',
  },
  {
    icon: '📖',
    label: 'Not dogmatic',
    sub: 'No doctrinal monopoly.',
    color: '#c9a84c',
  },
  {
    icon: '🤝',
    label: 'Not merely activist',
    sub: 'Evidence over performance.',
    color: '#e887a6',
  },
  {
    icon: '✦',
    label: 'Not abstract',
    sub: 'Operational, not rhetorical.',
    color: '#7c3aed',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">The Organization</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            About Forever Lotus
          </h1>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed">
            Not a campaign. Not a brand exercise. A civilizational stance — authored
            with rigor and grounded in millennia of wisdom.
          </p>
          <div className="lotus-divider mt-12 max-w-sm mx-auto">
            <LotusIcon size={22} variant="section" />
          </div>
        </div>
      </section>

      {/* What it is / is not */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg-2" aria-labelledby="what-heading">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="eyebrow mb-4">Strategic Position</p>
            <h2
              id="what-heading"
              className="font-serif font-bold text-lotus-cream"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              An Uncommon Position
            </h2>
            <p className="text-lotus-muted mt-4 max-w-2xl mx-auto leading-relaxed">
              Forever Lotus occupies a rare space among global frameworks — coherent
              enough to enable collaboration, principled enough to stand alone.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
            {values.map(({ icon, label, sub, color }) => (
              <ScrollReveal key={label} className="h-full">
                <div className="card-glass rounded-2xl p-6 text-center h-full">
                  <div className="text-3xl mb-3">{icon}</div>
                  <p
                    className="font-serif font-semibold text-sm mb-1"
                    style={{ color }}
                  >
                    {label}
                  </p>
                  <p className="text-lotus-muted text-xs leading-snug">{sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder section */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg" aria-labelledby="founder-heading">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <p className="eyebrow mb-4">Author & Founder</p>
              <h2
                id="founder-heading"
                className="font-serif font-black text-lotus-cream mb-5"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              >
                Subasri Dorairaj
              </h2>
              <p className="text-lotus-muted leading-relaxed mb-5">
                Forever Lotus is the intellectual and civilizational work of Subasri
                Dorairaj — a moral architecture authored to re-anchor creation in
                responsibility at a moment of unprecedented human power.
              </p>
              <p className="text-lotus-muted leading-relaxed">
                Written from the conviction that humanity holds the tools to either
                fracture or heal, this framework draws on 4,000 years of Eastern
                wisdom and contemporary evidence to articulate what &ldquo;progress with
                compassion&rdquo; actually means in operational terms.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="card-glass-gold rounded-2xl p-8">
                <p className="eyebrow mb-4">White Paper Position</p>
                <blockquote className="font-serif italic text-lotus-cream/85 text-lg leading-relaxed mb-5">
                  &ldquo;Humanity holds unprecedented power and unprecedented fragility at
                  the same time. The lotus teaches that creation must rise from stillness,
                  restraint, and clarity. Progress without moral architecture is instability
                  accelerated.&rdquo;
                </blockquote>
                <footer className="text-lotus-gold/60 text-xs tracking-wide">
                  — Subasri Dorairaj, Forever Lotus Manifesto, Section XIII
                </footer>
                <a
                  href="https://github.com/aartisr/forever_lotus"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-6 text-sm text-lotus-gold/75 hover:text-lotus-gold transition-colors duration-200"
                >
                  View the public repository
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Operating Commitments */}
      <section className="py-24 px-5 sm:px-8 bg-[#f5f0e8] text-[#1a1612]" aria-labelledby="commitments-heading">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#c9a84c] mb-4">
              Action Layer
            </p>
            <h2
              id="commitments-heading"
              className="font-serif font-bold text-[#1a1612]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              Operating Commitments
            </h2>
            <p className="text-[#4a4640] mt-4 max-w-xl mx-auto leading-relaxed">
              Kindness must be operational, not rhetorical. These six commitments
              are the action layer of the Forever Lotus framework.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {commitments.map(({ num, title, body }) => (
              <ScrollReveal key={num} className="h-full">
                <div className="rounded-2xl p-6 h-full border border-[rgba(26,22,18,0.10)] bg-white/50 hover:border-[#c9a84c]/30 hover:shadow-md transition-all duration-400">
                  <span className="font-serif text-[#c9a84c]/50 text-xs font-bold tracking-widest block mb-2">
                    {num}
                  </span>
                  <h3 className="font-serif font-bold text-[#1a1612] text-lg mb-3">
                    {title}
                  </h3>
                  <p className="text-[#5a5450] text-sm leading-relaxed">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Moral Lineage */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg-3" aria-labelledby="lineage-heading">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <LotusIcon size={48} variant="section" className="mx-auto mb-8 opacity-70 animate-float" />
            <p className="eyebrow mb-4">Moral Lineage</p>
            <h2
              id="lineage-heading"
              className="font-serif font-bold text-lotus-cream mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              Drawing from Humanity&rsquo;s Shared Inheritance
            </h2>
            <p className="text-lotus-muted text-lg leading-relaxed mb-5">
              Forever Lotus draws from lotus symbolism across civilizations, Brahma as
              conscious creation, and ethics reflected in humanitarian, environmental,
              peace, and educational institutions worldwide.
            </p>
            <p className="text-lotus-muted/70 text-base leading-relaxed max-w-xl mx-auto">
              It claims no monopoly on truth. It claims responsibility — to act with
              humility, kindness, rigor, and long-range care for life.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg text-center border-t border-lotus-border-soft">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p
              className="font-serif italic font-bold text-gold-shimmer mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}
            >
              &ldquo;Rooted. Rising. Untainted.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/manifesto" className="btn-primary">
                Read the Manifesto →
              </Link>
              <Link href="/research" className="btn-ghost">
                Research Dossier
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
