'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import ScrollReveal from '@/components/ScrollReveal';

// ─── Data ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: '🌿',
    title: 'Earth Consciousness',
    summary:
      'Gratitude made practical. Stewardship is not an optional virtue — it is the minimum expression of respect for the conditions that sustain all life.',
    color: 'teal',
  },
  {
    icon: '🤲',
    title: 'Kindness Without Expectation',
    summary:
      'True compassion is not transactional. Giving is not moral currency — it is alignment with life itself.',
    color: 'pink',
  },
  {
    icon: '📖',
    title: 'Education as Liberation',
    summary:
      'Education is humanity\'s sacred inheritance. Knowledge must produce agency, not credential theater.',
    color: 'gold',
  },
  {
    icon: '🕊️',
    title: 'Peace and Inner Harmony',
    summary:
      'Durable social peace begins in the human nervous system — in restraint, clarity, and responsibility.',
    color: 'violet',
  },
  {
    icon: '🤝',
    title: 'Humanitarian Dignity',
    summary:
      'Aid must restore dignity, not manufacture dependency. Assistance without agency becomes erosion.',
    color: 'teal',
  },
  {
    icon: '✨',
    title: 'Conscious Creation',
    summary:
      'Every system, institution, and decision is an act of creation — bending the future toward harmony or fracture.',
    color: 'gold',
  },
];

const traditions = [
  {
    tradition: 'Hindu',
    text: 'Brahma emerges from the lotus — creation as responsibility, not conquest.',
    cite: 'Bhagavata Purana',
  },
  {
    tradition: 'Buddhist',
    text: 'The Lotus Sutra: purity of spirit untainted by the murky waters of ignorance.',
    cite: 'Saddharma Puṇḍarīka Sūtra',
  },
  {
    tradition: 'Egyptian',
    text: 'The lotus represents the first sun—creation rising from the primordial waters.',
    cite: 'Book of the Dead',
  },
  {
    tradition: 'Universal',
    text: 'Rooted in darkness, nourished by difficulty, rising toward light, remaining unstained.',
    cite: 'The Lotus Principle',
  },
];

const stats = [
  { value: '25+', label: 'Peer-reviewed sources' },
  { value: '4,000', label: 'Years of Eastern wisdom' },
  { value: '6', label: 'Civilizational pillars' },
  { value: '3', label: 'Continents of scholarship' },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    // Parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xFrac = (clientX / window.innerWidth - 0.5) * 2;
      const yFrac = (clientY / window.innerHeight - 0.5) * 2;
      const mandala = el.querySelector<HTMLElement>('.hero-mandala');
      if (mandala) {
        mandala.style.transform = `translate(${xFrac * 18}px, ${yFrac * 18}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Starfield */}
      <div className="starfield" aria-hidden="true" />

      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(201,168,76,0.11) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(14,182,168,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Animated lotus mandala */}
      <div
        className="hero-mandala absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        <LotusIcon
          size={520}
          variant="hero"
          className="opacity-30 animate-float"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-28">
        <p
          className="eyebrow mb-6 animate-fade-up"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          ❋ &nbsp; Forever Lotus &nbsp; ❋
        </p>

        <h1
          id="hero-heading"
          className="font-serif font-black leading-[1.06] mb-6 animate-fade-up"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            animationDelay: '380ms',
            animationFillMode: 'both',
          }}
        >
          A Civilizational Call to{' '}
          <span className="text-gold-shimmer">Conscious Creation</span>
        </h1>

        <p
          className="text-lotus-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: '540ms', animationFillMode: 'both' }}
        >
          Humanity can create without domination. Progress can be kind. This is
          a practical moral architecture for an age of immense power.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '700ms', animationFillMode: 'both' }}
        >
          <Link href="/manifesto" className="btn-primary text-base">
            Read the Manifesto
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/philosophy" className="btn-ghost text-base">
            Explore the Philosophy
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up"
        style={{ animationDelay: '1200ms', animationFillMode: 'both' }}
        aria-hidden="true"
      >
        <span className="text-lotus-muted-2 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-lotus-gold/40 to-transparent animate-float" />
      </div>
    </section>
  );
}

// ─── Lotus Principle ─────────────────────────────────────────────────────────

function LotusPrinciple() {
  return (
    <section className="py-28 px-5 sm:px-8 bg-lotus-bg" aria-labelledby="principle-heading">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <p className="eyebrow mb-4">The Operating Principle</p>
          <h2
            id="principle-heading"
            className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            The Lotus as Method
          </h2>
          <p className="text-lotus-muted max-w-2xl mx-auto text-lg leading-relaxed mb-16">
            Across 4,000 years of civilizational wisdom, the lotus does not
            escape difficulty — it transforms through it. This is the principle.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {[
            {
              symbol: '◎',
              word: 'Rooted',
              desc: 'Born from darkness and challenge. Strength comes from depth, not escape.',
              color: '#0f9688',
            },
            {
              symbol: '↑',
              word: 'Rising',
              desc: 'Ascending toward light without abandoning the origin of growth.',
              color: '#c9a84c',
            },
            {
              symbol: '✦',
              word: 'Untainted',
              desc: 'Pure despite conditions. Creation that refuses to be stained by its context.',
              color: '#e887a6',
            },
          ].map(({ symbol, word, desc, color }) => (
            <ScrollReveal key={word} className="h-full">
              <div className="card-glass rounded-2xl p-8 h-full group hover:border-lotus-border transition-all duration-500 hover:shadow-card-hover">
                <div
                  className="text-4xl mb-4 font-serif font-black"
                  style={{ color }}
                >
                  {symbol}
                </div>
                <h3
                  className="font-serif text-2xl font-bold mb-3"
                  style={{ color }}
                >
                  {word}
                </h3>
                <p className="text-lotus-muted leading-relaxed text-sm">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Quote Section ────────────────────────────────────────────────────────────

function QuoteSection() {
  return (
    <section className="relative py-28 px-5 sm:px-8 overflow-hidden bg-lotus-bg-2">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <LotusIcon size={44} variant="section" className="mx-auto mb-8 opacity-70" />
          <blockquote>
            <p
              className="font-serif italic leading-tight mb-8 text-lotus-cream/90"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
            >
              &ldquo;Creation is not domination — it is responsibility. Every
              system we design bends the future toward harmony or fracture.
              Neutrality is an illusion.&rdquo;
            </p>
            <footer className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-lotus-gold/40" />
              <cite className="not-italic text-lotus-gold text-sm font-medium tracking-wider uppercase">
                Forever Lotus Manifesto
              </cite>
              <div className="h-px w-12 bg-lotus-gold/40" />
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Six Pillars ──────────────────────────────────────────────────────────────

const pillarBorderColors: Record<string, string> = {
  teal: 'hover:border-lotus-teal/40',
  pink: 'hover:border-lotus-pink/40',
  gold: 'hover:border-lotus-gold/40',
  violet: 'hover:border-violet-500/40',
};

const pillarIconBg: Record<string, string> = {
  teal: 'bg-lotus-teal/10 text-lotus-teal',
  pink: 'bg-lotus-pink/10 text-lotus-pink',
  gold: 'bg-lotus-gold/10 text-lotus-gold',
  violet: 'bg-violet-500/10 text-violet-400',
};

function PillarsSection() {
  return (
    <section className="py-28 px-5 sm:px-8 bg-lotus-bg" aria-labelledby="pillars-heading">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="eyebrow mb-4">Core Framework</p>
          <h2
            id="pillars-heading"
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Six Pillars of Conscious Creation
          </h2>
          <p className="text-lotus-muted max-w-xl mx-auto mt-4 leading-relaxed">
            A coherent moral architecture — not abstract, not bureaucratic, but
            deeply operational.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {pillars.map(({ icon, title, summary, color }) => (
            <ScrollReveal key={title} className="h-full">
              <div
                className={`card-glass rounded-2xl p-7 h-full border border-lotus-border-soft transition-all duration-500 group cursor-default ${pillarBorderColors[color]}`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 ${pillarIconBg[color]}`}
                >
                  {icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-lotus-cream">
                  {title}
                </h3>
                <p className="text-lotus-muted text-sm leading-relaxed">{summary}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <Link href="/manifesto" className="btn-ghost">
              Explore all pillars in the Manifesto →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Statistics ───────────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-lotus-bg-2 border-y border-lotus-border-soft">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
          {stats.map(({ value, label }) => (
            <ScrollReveal key={label} className="text-center">
              <p
                className="font-serif font-black text-gold-shimmer mb-2"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
              >
                {value}
              </p>
              <p className="text-lotus-muted text-sm leading-snug">{label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Traditions Section ───────────────────────────────────────────────────────

function TraditionsSection() {
  return (
    <section className="py-28 px-5 sm:px-8 bg-lotus-bg" aria-labelledby="traditions-heading">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="eyebrow mb-4">Universal Wisdom</p>
          <h2
            id="traditions-heading"
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            The Lotus Across Civilization
          </h2>
          <p className="text-lotus-muted max-w-xl mx-auto mt-4 leading-relaxed">
            One symbol. Four thousand years. Every major spiritual tradition
            converges on the same principle.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger-children">
          {traditions.map(({ tradition, text, cite }) => (
            <ScrollReveal key={tradition} className="h-full">
              <div className="card-glass-gold rounded-2xl p-7 h-full group hover:shadow-gold transition-all duration-500">
                <p className="eyebrow mb-3 text-lotus-gold/60">{tradition}</p>
                <p className="font-serif italic text-lotus-cream/85 text-lg leading-relaxed mb-4">
                  &ldquo;{text}&rdquo;
                </p>
                <p className="text-lotus-muted-2 text-xs tracking-wide">— {cite}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 text-center">
            <Link href="/philosophy" className="btn-ghost">
              Dive into Eastern Philosophy →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Research Section ─────────────────────────────────────────────────────────

function ResearchSection() {
  const institutions = [
    'Stanford CCARE',
    'Harvard HFH',
    'Oxford Wellbeing Research Centre',
    'Kyoto University',
    'National University of Singapore',
    'Tsinghua University',
  ];

  return (
    <section className="py-28 px-5 sm:px-8 bg-lotus-bg-2" aria-labelledby="research-heading">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <p className="eyebrow mb-4">Evidence Base</p>
          <h2
            id="research-heading"
            className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Grounded in Scholarship
          </h2>
          <p className="text-lotus-muted max-w-2xl mx-auto text-lg leading-relaxed mb-12">
            Forever Lotus is not ideology. It is built on 25+ peer-reviewed
            sources, canonical Eastern texts, and leading research institutions
            across three continents.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3 mb-14 stagger-children">
          {institutions.map((inst) => (
            <ScrollReveal key={inst}>
              <span className="card-glass-gold inline-block px-5 py-2.5 rounded-full text-sm text-lotus-cream/80 font-medium">
                {inst}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="card-glass rounded-2xl p-8 max-w-2xl mx-auto border border-lotus-border-soft">
            <LotusIcon size={36} variant="section" className="mx-auto mb-5 opacity-70" />
            <p className="font-serif italic text-lotus-cream/80 text-xl leading-relaxed mb-5">
              &ldquo;Kindness without transaction is supported by prosocial and flourishing research from Stanford, Harvard, and the World Happiness Report.&rdquo;
            </p>
            <Link href="/research" className="btn-primary text-sm !py-2.5">
              Explore the Research Dossier →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Vow Section ─────────────────────────────────────────────────────────────

function VowSection() {
  return (
    <section className="relative py-32 px-5 sm:px-8 overflow-hidden bg-lotus-bg-3" aria-labelledby="vow-heading">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,135,166,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="eyebrow mb-6">The Vow</p>
          <h2
            id="vow-heading"
            className="font-serif font-black leading-tight mb-8 text-lotus-cream"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Forever Lotus is a Brand in Form.{' '}
            <span className="text-lotus-pink">A Vow in Substance.</span>
          </h2>
          <p className="text-lotus-muted text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Its vow is explicit: reduce suffering, elevate dignity, and reject
            domination. Any strategy, institution, or product that fails this test
            does not belong within Forever Lotus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-12">
            {[
              {
                num: '01',
                text: 'Publish annual dignity and impact metrics, not vanity metrics.',
              },
              {
                num: '02',
                text: 'Tie all initiatives to measurable suffering reduction and capability growth.',
              },
              {
                num: '03',
                text: 'Build learning systems that are open, multilingual, and culturally grounded.',
              },
            ].map(({ num, text }) => (
              <div
                key={num}
                className="card-glass rounded-xl p-5 border border-lotus-border-soft"
              >
                <span className="font-serif text-lotus-gold/40 text-xs font-bold tracking-wider">
                  {num}
                </span>
                <p className="text-lotus-cream/75 text-sm leading-relaxed mt-2">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <Link href="/manifesto" className="btn-primary text-base">
            Read the Full Manifesto →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-28 px-5 sm:px-8 bg-lotus-bg border-t border-lotus-border-soft" aria-labelledby="cta-heading">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <LotusIcon size={52} variant="section" className="mx-auto mb-8 animate-float" />
          <h2
            id="cta-heading"
            className="font-serif font-black mb-5 text-lotus-cream"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Where One Person Chooses Compassion,{' '}
            <span className="text-gold-shimmer">the Lotus Blooms Again.</span>
          </h2>
          <p className="text-lotus-muted text-lg max-w-xl mx-auto leading-relaxed mb-10">
            This is an invitation — not a doctrine. Co-create balance over
            excess, peace over power theater, and shared futures over isolated gain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/manifesto" className="btn-primary text-base">
              Read the Manifesto
            </Link>
            <Link href="/about" className="btn-ghost text-base">
              About Forever Lotus
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LotusPrinciple />
      <QuoteSection />
      <PillarsSection />
      <StatsSection />
      <TraditionsSection />
      <ResearchSection />
      <VowSection />
      <CTASection />
    </>
  );
}
