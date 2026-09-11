import React from 'react';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface HomeHeroProps {
  crestVariant: 'golden-ratio' | 'classic';
  setCrestVariant: (v: 'golden-ratio' | 'classic') => void;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  crestVariant,
  setCrestVariant,
  titlePrefix,
  titleHighlight,
  description,
  ctaPrimary,
  ctaSecondary,
}) => {
  return (
    <section className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-8 text-center overflow-hidden">
      {/* Ambient atmospheric glows - Hardware-accelerated radial gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,180,93,0.12)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(232,135,166,0.08)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Dignity Observatory Live Telemetry Notice */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lotus-gold/10 border border-lotus-gold/30 text-lotus-gold text-xs font-mono-code animate-fade-in hover:bg-lotus-gold/15 transition flex-wrap justify-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-lotus-cream">Global Dignity Observatory Active</span>
          <span className="text-lotus-muted hidden sm:inline">·</span>
          <span className="text-emerald-400 hidden sm:inline">Open Telemetry</span>
          <Link href="/observatory" className="text-xs font-bold underline ml-1 hover:text-white flex items-center gap-0.5">
            View Ledger →
          </Link>
        </div>

        {/* Animated Lotus Brand Mark / Golden Ratio 8-Fold Crest */}
        <div className="flex flex-col items-center justify-center gap-3 pt-2">
          <div className="relative p-4 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-[0_0_50px_rgba(201,168,76,0.15)] hover:border-lotus-gold/40 transition duration-500">
            {crestVariant === 'golden-ratio' ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-lotus-gold stroke-current fill-none stroke-[0.9]">
                  <circle cx="50" cy="50" r="46" strokeDasharray="1.5, 2.5" />
                  <circle cx="50" cy="50" r="42" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <path
                      key={i}
                      d="M50 14 C44 28, 44 42, 50 50 C56 42, 56 28, 50 14 Z"
                      transform={`rotate(${angle} 50 50)`}
                      className="fill-lotus-gold/10 hover:fill-lotus-gold/25 transition-colors"
                    />
                  ))}
                  <circle cx="50" cy="50" r="4" className="fill-lotus-gold" />
                </svg>
              </div>
            ) : (
              <LotusIcon className="w-16 h-16 sm:w-20 sm:h-20" size={80} />
            )}
          </div>

          {/* Crest Switcher */}
          <div className="flex items-center gap-2 text-[11px] font-mono-code bg-white/[0.03] p-1 rounded-full border border-white/[0.06]">
            <button
              onClick={() => setCrestVariant('golden-ratio')}
              className={`px-3 py-1 rounded-full transition min-h-[32px] ${
                crestVariant === 'golden-ratio' ? 'bg-lotus-gold text-black font-bold' : 'text-lotus-muted hover:text-lotus-cream'
              }`}
            >
              Sacred 8-Petal Crest
            </button>
            <button
              onClick={() => setCrestVariant('classic')}
              className={`px-3 py-1 rounded-full transition min-h-[32px] ${
                crestVariant === 'classic' ? 'bg-lotus-gold text-black font-bold' : 'text-lotus-muted hover:text-lotus-cream'
              }`}
            >
              Classic Lotus
            </button>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="eyebrow uppercase tracking-[0.2em] text-xs font-mono-code text-lotus-gold">
          Authored by Subasri Dorairaj
        </p>

        {/* Title */}
        <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-lotus-cream tracking-tight leading-[1.1] max-w-3xl mx-auto">
          {titlePrefix}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lotus-gold to-[#ffd66b]">
            {titleHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-lotus-cream/90 max-w-2xl mx-auto font-serif-body italic leading-relaxed">
          &ldquo;{description}&rdquo;
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
          <Link href="/manifesto" className="btn-primary !px-6 sm:!px-8 text-xs sm:text-sm inline-flex items-center gap-2 min-h-[44px]">
            <span>{ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/observatory" className="btn-secondary !px-6 sm:!px-8 text-xs sm:text-sm inline-flex items-center gap-2 min-h-[44px]">
            <Sparkles className="w-4 h-4 text-lotus-gold" />
            <span>Living Observatory</span>
          </Link>
          <Link href="/philosophy" className="btn-secondary !px-5 sm:!px-6 text-xs sm:text-sm inline-flex items-center gap-1.5 min-h-[44px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{ctaSecondary}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
