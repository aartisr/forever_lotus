import React from 'react';
import Link from 'next/link';

interface Commitment {
  num: string;
  text: string;
}

interface HomeVowSectionProps {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  commitments?: Commitment[];
  cta: string;
}

export const HomeVowSection: React.FC<HomeVowSectionProps> = ({
  eyebrow,
  titlePrefix,
  titleHighlight,
  description,
  commitments = [],
  cta,
}) => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft">
      <div className="max-w-4xl mx-auto text-center">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-lotus-cream mb-4">
          {titlePrefix}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lotus-gold to-[#ffd66b]">
            {titleHighlight}
          </span>
        </h2>
        <p className="text-lotus-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 sm:mb-14">
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-left mb-10">
          {(commitments || []).map((com, idx) => (
            <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/20 transition">
              <span className="font-mono-code text-xs text-lotus-gold font-bold block mb-2">
                {com.num}
              </span>
              <p className="text-lotus-cream text-xs sm:text-sm leading-relaxed">
                {com.text}
              </p>
            </div>
          ))}
        </div>

        <Link href="/manifesto" className="btn-secondary !px-8 text-xs sm:text-sm inline-flex items-center gap-1.5 min-h-[44px]">
          <span>{cta}</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
};
