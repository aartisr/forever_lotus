import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Philosophy',
  description:
    'The Eastern philosophical foundations of Forever Lotus — the lotus across Hindu, Buddhist, Egyptian and universal traditions, Brahma and conscious creation.',
};

const traditions = [
  {
    id: 'hindu',
    name: 'Hindu Tradition',
    color: '#c9a84c',
    tagline: 'Creation as Responsibility',
    icon: '☸',
    overview:
      'In Hindu cosmology, Brahma — the creator principle — emerges from a lotus that grows from the navel of Vishnu. This image carries deep philosophical weight: creation is not an act of conquest or dominance, but of careful, intentional responsibility. The lotus here is both medium and message.',
    texts: [
      {
        source: 'Bhagavata Purana, Skandha 3',
        quote:
          'Brahma, seated upon the lotus, perceives the infinite and in perceiving, creates — not from desire for dominion, but from the imperative of divinity itself.',
      },
      {
        source: 'Chandogya Upanishad 3.14.1',
        quote: '"Sarvam khalvidam brahma" — all this is Brahman. Creation and creator are not separate.',
      },
      {
        source: 'Rigveda 10.129 — Nasadiya Sukta',
        quote:
          'The cosmological creation hymn describes the first arising from darkness not through violence, but through warmth — a principle of gentle origination.',
      },
    ],
    insight:
      'Forever Lotus draws on this: every act of creation — every institution, every product, every policy — carries a moral charge. The question is always: does it serve harmony or fracture?',
  },
  {
    id: 'buddhist',
    name: 'Buddhist Tradition',
    color: '#e887a6',
    tagline: 'Purity Through Conditions',
    icon: '✿',
    overview:
      "The Saddharma Puṇḍarīka Sūtra — the Lotus Sutra — is one of Buddhism's most revered texts. Its central metaphor: the lotus grows in muddy water yet blooms in perfect purity. It does not escape its difficult conditions. It is transformed by moving through them with grace.",
    texts: [
      {
        source: 'Saddharma Puṇḍarīka Sūtra (Lotus Sutra)',
        quote:
          'As the lotus flower is born in water, grows in water, and rises out of water to stand above it unsoiled, so I, born in the world, raised in the world, having overcome the world, live unsoiled by the world.',
      },
      {
        source: 'Kubo, T. — Journal of Indian and Buddhist Studies (1983)',
        quote:
          'The Lotus Sutra represents the culmination of Mahayana Buddhist thought — the universal potential for awakening regardless of conditions.',
      },
    ],
    insight:
      'This maps directly onto Forever Lotus: one need not escape suffering to achieve clarity. One rises through it, untainted.',
  },
  {
    id: 'egyptian',
    name: 'Egyptian Tradition',
    color: '#14b8a6',
    tagline: 'The First Sun',
    icon: '☀',
    overview:
      "In ancient Egyptian cosmology, the lotus (seshen) represents the primordial rising of the sun from the waters of chaos. The god Nefertem — lord of the lotus — embodies beauty, healing, and the original first sunrise. Creation begins not with conflict, but with emergence.",
    texts: [
      {
        source: 'Book of the Dead — Egyptian Canon',
        quote:
          'I am the pure lotus which rose from the primeval waters. I am the guardian of the nostrils of Ra. I am the guardian of the nose of Hathor.',
      },
    ],
    insight:
      "The Egyptian tradition reinforces: life's beginning is not violent conquest but pure emergence from water — from the formless into form, with inherent dignity.",
  },
];

const upanishads = [
  {
    text: '"From which beings are born, by which they live, to which they go and merge — that is Brahman."',
    source: 'Taittiriya Upanishad 3.1.1',
  },
  {
    text: '"Emanation from the one source — all creation flows from a single, unified principle of conscious awareness."',
    source: 'Mundaka Upanishad 1.1.7',
  },
  {
    text: '"That which is the finest essence — this whole world has that as its soul. That is reality. That is Atman."',
    source: 'Chandogya Upanishad 6.8.7',
  },
];

export default function PhilosophyPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,135,166,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Eastern Wisdom</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            The Philosophy
          </h1>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed">
            Four thousand years of cross-civilizational wisdom converge on a single
            principle: creation that rises from difficulty, untainted by it.
          </p>
          <div className="lotus-divider mt-12 max-w-sm mx-auto">
            <LotusIcon size={22} variant="section" />
          </div>
        </div>
      </section>

      {/* Traditions */}
      <div className="bg-lotus-bg">
        {traditions.map(({ id, name, color, tagline, icon, overview, texts, insight }, idx) => (
          <section
            key={id}
            className={`py-24 px-5 sm:px-8 ${idx % 2 !== 0 ? 'bg-lotus-bg-2' : ''}`}
            aria-labelledby={`trad-${id}`}
          >
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ color, fontSize: '1.8rem' }}>{icon}</span>
                  <p className="eyebrow" style={{ color: `${color}99` }}>
                    {name}
                  </p>
                </div>
                <h2
                  id={`trad-${id}`}
                  className="font-serif font-black text-lotus-cream mb-3"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
                >
                  {tagline}
                </h2>
                <p className="text-lotus-muted text-lg leading-relaxed mb-10 max-w-2xl">
                  {overview}
                </p>
              </ScrollReveal>

              <div className="space-y-5 stagger-children mb-10">
                {texts.map(({ source, quote }) => (
                  <ScrollReveal key={source} className="h-full">
                    <div
                      className="card-glass rounded-2xl p-7 border border-lotus-border-soft"
                      style={{ borderLeft: `2px solid ${color}`, borderLeftColor: color }}
                    >
                      <p className="font-serif italic text-lotus-cream/85 leading-relaxed mb-3 text-base sm:text-lg">
                        &ldquo;{quote}&rdquo;
                      </p>
                      <p className="text-lotus-muted-2 text-xs tracking-wide uppercase">
                        — {source}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <div
                  className="inline-block rounded-xl px-6 py-4 text-sm leading-relaxed"
                  style={{
                    background: `linear-gradient(135deg, ${color}12, ${color}06)`,
                    border: `1px solid ${color}25`,
                    color: '#f0ece488',
                  }}
                >
                  <strong style={{ color }}>Forever Lotus insight:</strong>{' '}
                  {insight}
                </div>
              </ScrollReveal>
            </div>
          </section>
        ))}
      </div>

      {/* Primary texts */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg-3" aria-labelledby="upanishads-heading">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="eyebrow mb-4">Primary Texts</p>
            <h2
              id="upanishads-heading"
              className="font-serif font-bold text-lotus-cream mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              The Upanishadic Foundation
            </h2>
            <p className="text-lotus-muted text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
              The Vedic and Upanishadic tradition provides the deepest scaffolding
              for what Forever Lotus calls &lsquo;conscious creation.&rsquo;
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3 stagger-children">
            {upanishads.map(({ text, source }) => (
              <ScrollReveal key={source} className="h-full">
                <blockquote className="card-glass-gold rounded-2xl p-6 h-full text-left">
                  <p className="font-serif italic text-lotus-cream/85 leading-relaxed mb-4 text-base">
                    {text}
                  </p>
                  <footer className="text-lotus-gold/60 text-xs tracking-wide">
                    — {source}
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg text-center border-t border-lotus-border-soft">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2
              className="font-serif font-bold text-lotus-cream mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              See the Evidence Base
            </h2>
            <p className="text-lotus-muted mb-8 leading-relaxed">
              25+ peer-reviewed sources anchoring these philosophical traditions in
              contemporary scholarship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/research" className="btn-primary">
                Research Dossier →
              </Link>
              <Link href="/manifesto" className="btn-ghost">
                Read the Manifesto
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
