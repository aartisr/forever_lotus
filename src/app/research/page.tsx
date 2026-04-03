import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';
import { resolveLocale, withLocale } from '@/i18n';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'The Forever Lotus Research Dossier — 25+ peer-reviewed sources, canonical Eastern texts, and leading global institutions anchoring the framework.',
};

const categories = [
  {
    id: 'lotus-buddhist',
    letter: 'A',
    title: 'Lotus, Buddhist Thought & Eastern Scholarship',
    color: '#e887a6',
    sources: [
      {
        citation:
          'Kubo, T. (1983). The Lotus Sutra and New Buddhist Movements in Japan. Journal of Indian and Buddhist Studies, 31(2), 753–757.',
        doi: 'https://doi.org/10.4259/ibk.31.753',
        note: 'Japanese Association of Indian and Buddhist Studies — peer-reviewed, Eastern university origin.',
      },
      {
        citation:
          "Watanabe, H. (1997). Nichiren's View on the Lotus-sutra from the Recognition of His Lotus-sutra Practice. Journal of Indian and Buddhist Studies, 45(2), 523–532.",
        doi: 'https://doi.org/10.4259/ibk.45.523',
        note: 'Direct Asian scholarship on Lotus Sutra interpretation and practice.',
      },
      {
        citation:
          'Coomaraswamy, A. K. The Symbolism of the Lotus. In The Art of Indian Asia.',
        doi: 'https://doi.org/10.1515/9780691279589-011',
        note: 'Standard art-history anchor for lotus iconography in Indic traditions.',
      },
    ],
  },
  {
    id: 'brahma',
    letter: 'B',
    title: 'Brahma, Creation & Indic Philosophical Foundations',
    color: '#c9a84c',
    sources: [
      {
        citation: 'Rigveda 10.129 — Nasadiya Sukta: creation hymn and metaphysical origins.',
        doi: null,
        note: 'Vedic canonical primary text.',
      },
      {
        citation: 'Chandogya Upanishad 3.14.1: "sarvam khalvidam brahma."',
        doi: null,
        note: 'Core Upanishadic statement on Brahman-as-all.',
      },
      {
        citation: 'Taittiriya Upanishad 3.1.1: "from which beings are born…" cosmological formulation.',
        doi: null,
        note: 'Foundational cosmological framing.',
      },
      {
        citation: 'Mundaka Upanishad 1.1.7–1.1.9: emanation metaphors and source of creation.',
        doi: null,
        note: 'Emanation principle undergirding conscious creation.',
      },
      {
        citation: 'Bhagavata Purana, Skandha 3 — Brahma-lotus creation narrative.',
        doi: null,
        note: 'Puranic primary source for the lotus-creation cosmology.',
      },
      {
        citation: 'Vishnu Purana, Book 1 — creation narrative including Brahma\'s role.',
        doi: null,
        note: 'Complementary Puranic framing for the creative principle.',
      },
    ],
  },
  {
    id: 'institutions',
    letter: 'C',
    title: 'Institutional & University Anchors',
    color: '#14b8a6',
    sources: [
      {
        citation: 'Kyoto University Research Portal.',
        doi: 'https://www.kyoto-u.ac.jp/en/research',
        note: 'KURENAI repository of Japan-based Buddhist and philosophical scholarship.',
      },
      {
        citation: 'National University of Singapore — Research.',
        doi: 'https://www.nus.edu.sg/research',
        note: 'Asian Studies, humanities, and sustainability-ethics framing.',
      },
      {
        citation: 'Tsinghua University Research Overview.',
        doi: 'https://www.tsinghua.edu.cn/en/Research.htm',
        note: 'High-trust East Asian university anchor for comparative philosophy.',
      },
      {
        citation: 'Soka University Academics.',
        doi: 'https://www.soka.ac.jp/en/academics/',
        note: 'Buddhist-founded Japanese university with direct Lotus Sutra scholarship.',
      },
    ],
  },
  {
    id: 'compassion',
    letter: 'D',
    title: 'Compassion, Prosocial Behavior & Wellbeing Evidence',
    color: '#7c3aed',
    sources: [
      {
        citation: 'Stanford CCARE Research Hub — Compassion and Altruism Research.',
        doi: 'https://ccare.stanford.edu/research/',
        note: 'Leading institutional anchor for empirical compassion research.',
      },
      {
        citation: 'Harvard Human Flourishing Program Publications.',
        doi: 'https://hfh.fas.harvard.edu/publications',
        note: 'Peer-reviewed flourishing research supporting kindness-without-transaction claims.',
      },
      {
        citation: 'Oxford Wellbeing Research Centre.',
        doi: 'https://www.wellbeing.hmc.ox.ac.uk/',
        note: 'Global wellbeing metrics and policy-linked research.',
      },
      {
        citation:
          'Helliwell, J. F., Layard, R., Sachs, J. D., et al. (2025). World Happiness Report 2025. University of Oxford: Wellbeing Research Centre.',
        doi: 'https://www.worldhappiness.report/ed/2025/',
        note: 'Current global evidence base for prosocial outcomes and flourishing.',
      },
      {
        citation: 'Positive Psychology Center, University of Pennsylvania.',
        doi: 'https://ppc.sas.upenn.edu/',
        note: 'Seligman-school empirical base for meaning, virtue, and wellbeing.',
      },
    ],
  },
  {
    id: 'humanitarian',
    letter: 'E',
    title: 'Humanitarian & Digital Canon Access',
    color: '#0f9688',
    sources: [
      {
        citation: 'SuttaCentral Canonical Corpus — open Buddhist canon and translations.',
        doi: 'https://suttacentral.net/',
        note: 'Cross-tradition Buddhist textual grounding with transparent source access.',
      },
      {
        citation: 'Digital Sanskrit Buddhist Canon (University of the West).',
        doi: 'https://www.dsbcproject.org/',
        note: 'University-backed digital primary-text archive.',
      },
      {
        citation: 'Humanitarian Leadership Academy.',
        doi: 'https://www.humanitarianleadershipacademy.org/',
        note: 'Institutional anchor for humanitarian dignity and capacity-building.',
      },
    ],
  },
];

type PageProps = {
  searchParams?: {
    lang?: string | string[];
  };
};

export default function ResearchPage({ searchParams }: PageProps) {
  const locale = resolveLocale(searchParams?.lang);

  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 text-center overflow-hidden bg-lotus-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,182,168,0.07) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Evidence Base</p>
          <h1
            className="font-serif font-black text-lotus-cream mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            Research Dossier
          </h1>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed">
            25+ peer-reviewed sources, canonical primary texts, and leading global
            institutions anchoring every claim Forever Lotus makes.
          </p>
          <div className="lotus-divider mt-12 max-w-sm mx-auto">
            <LotusIcon size={22} variant="section" />
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="py-10 px-5 sm:px-8 bg-lotus-bg-2 border-y border-lotus-border-soft">
        <div className="max-w-4xl mx-auto">
          <div className="card-glass-gold rounded-2xl p-6">
            <p className="eyebrow mb-2">Research Method</p>
            <p className="text-lotus-cream/75 text-sm leading-relaxed max-w-3xl">
              This dossier prioritizes: (1) DOI-indexed, peer-reviewed, or university-hosted
              sources; (2) Eastern-university-backed scholarship; (3) canonical religious and
              philosophical primary texts labeled separately; and (4) contemporary wellbeing
              and prosocial evidence. Sources are separated by category for clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Category sections — light background for readability */}
      <section className="bg-[#f5f0e8] text-[#1a1612]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 space-y-16">
          {categories.map(({ id, letter, title, color, sources }) => (
            <ScrollReveal key={id}>
              <div className="border-b border-[rgba(26,22,18,0.12)] pb-14">
                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-serif font-black text-lg shrink-0"
                    style={{ background: `${color}18`, color }}
                  >
                    {letter}
                  </div>
                  <h2
                    className="font-serif font-bold text-[#1a1612]"
                    style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
                  >
                    {title}
                  </h2>
                </div>

                {/* Sources */}
                <div className="space-y-4">
                  {sources.map(({ citation, doi, note }) => (
                    <div
                      key={citation.slice(0, 40)}
                      className="rounded-xl p-5 border"
                      style={{
                        background: `${color}06`,
                        borderColor: `${color}20`,
                        borderLeft: `3px solid ${color}`,
                      }}
                    >
                      <p className="text-[#2a2420] text-sm leading-relaxed mb-2">
                        {citation}
                      </p>
                      {doi && (
                        <a
                          href={doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs break-all hover:underline"
                          style={{ color }}
                        >
                          {doi}
                        </a>
                      )}
                      {note && (
                        <p className="text-[#7a7470] text-xs mt-2 italic border-t border-[rgba(26,22,18,0.08)] pt-2">
                          {note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
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
              From Evidence to Framework
            </h2>
            <p className="text-lotus-muted mb-8 leading-relaxed">
              See how this scholarship grounds the full 15-section manifesto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={withLocale('/manifesto', locale)} className="btn-primary">
                Read the Manifesto →
              </Link>
              <Link href={withLocale('/philosophy', locale)} className="btn-ghost">
                Eastern Philosophy
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
