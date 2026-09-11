import React from 'react';
import Link from 'next/link';
import { awariconTiers } from '@/content/awaricon';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HomeAwariconTeaser: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 border-t border-lotus-border-soft">
      <div className="max-w-5xl mx-auto text-center">
        <p className="eyebrow mb-3">Trust Standard</p>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-lotus-cream mb-4">
          The Awaricon Trust Suite
        </h2>
        <p className="text-lotus-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-12">
          A verified proof-of-presence mark and mathematical trust architecture designed to honor human agency over synthetic noise.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 text-left">
          {awariconTiers.map((tier) => (
            <div
              key={tier.key}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-lotus-gold/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-3">{tier.sigil}</div>
                <h4 className="font-serif font-bold text-lg text-lotus-cream mb-1">{tier.label}</h4>
                <p className="text-xs font-mono-code text-lotus-gold mb-3">{tier.scoreRange}</p>
                <p className="text-xs text-lotus-muted leading-relaxed mb-4">{tier.claim}</p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] text-[11px] text-lotus-muted-2">
                Fit: <span className="text-lotus-cream/80">{tier.manifestoFit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link href="/awaricon" className="btn-primary !px-6 sm:!px-8 text-xs sm:text-sm inline-flex items-center gap-2 min-h-[44px]">
            <Sparkles className="w-4 h-4" />
            <span>Explore Awaricon Suite</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/evaluate" className="btn-secondary !px-6 sm:!px-8 text-xs sm:text-sm inline-flex items-center gap-2 min-h-[44px]">
            <span>Evaluate Your Platform</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
