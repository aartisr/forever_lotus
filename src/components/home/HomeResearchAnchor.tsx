import React from 'react';
import Link from 'next/link';

interface HomeResearchAnchorProps {
  eyebrow: string;
  title: string;
  description: string;
  institutions?: string[];
  quote: string;
  cta: string;
}

export const HomeResearchAnchor: React.FC<HomeResearchAnchorProps> = ({
  eyebrow,
  title,
  description,
  institutions = [],
  quote,
  cta,
}) => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 border-t border-lotus-border-soft">
      <div className="max-w-5xl mx-auto text-center">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-lotus-cream mb-4">
          {title}
        </h2>
        <p className="text-lotus-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-3xl mx-auto mb-10">
          {(institutions || []).map((inst, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-lotus-cream/90 font-medium"
            >
              {inst}
            </span>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-lotus-bg-2 border border-lotus-border-soft max-w-3xl mx-auto mb-8">
          <p className="font-serif italic text-lotus-cream/90 text-base sm:text-lg md:text-xl leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        <Link href="/research" className="btn-primary !px-8 text-xs sm:text-sm inline-flex items-center gap-2 min-h-[44px]">
          <span>{cta}</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
};
