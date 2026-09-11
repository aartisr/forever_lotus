import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

interface TraditionItem {
  tradition: string;
  cite: string;
  text: string;
}

interface HomeTraditionsGridProps {
  eyebrow: string;
  title: string;
  description: string;
  items?: TraditionItem[];
  ctaText: string;
}

export const HomeTraditionsGrid: React.FC<HomeTraditionsGridProps> = ({
  eyebrow,
  title,
  description,
  items = [],
  ctaText,
}) => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-lotus-cream mb-4">
              {title}
            </h2>
            <p className="text-lotus-muted text-sm sm:text-base md:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(items || []).map((trad, idx) => (
            <ScrollReveal key={idx} delay={idx * 90}>
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/25 transition h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                    <span className="font-serif font-bold text-lg sm:text-xl text-lotus-gold">
                      {trad.tradition} Tradition
                    </span>
                    <span className="text-xs font-mono-code text-lotus-muted-2">
                      {trad.cite}
                    </span>
                  </div>
                  <p className="text-lotus-cream/90 text-sm sm:text-base leading-relaxed font-serif-body">
                    {trad.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/philosophy" className="btn-secondary !px-8 text-xs sm:text-sm inline-flex items-center gap-1.5 min-h-[44px]">
            <span>{ctaText}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
