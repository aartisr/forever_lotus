import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface PillarItem {
  icon: string;
  title: string;
  summary?: string;
  subtitle?: string;
  points?: string[];
  color?: string;
}

interface HomePillarsGridProps {
  eyebrow: string;
  title: string;
  description: string;
  items: PillarItem[];
}

export const HomePillarsGrid: React.FC<HomePillarsGridProps> = ({
  eyebrow,
  title,
  description,
  items = [],
}) => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 border-t border-lotus-border-soft">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-lotus-cream mb-4">
              {title}
            </h2>
            <p className="text-lotus-muted text-sm sm:text-base md:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(items || []).map((pillar, idx) => (
            <ScrollReveal key={idx} delay={idx * 70}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/30 hover:bg-white/[0.04] transition duration-300 flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-4 block" role="img" aria-hidden="true">
                    {pillar.icon}
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-lotus-cream mb-2">
                    {pillar.title}
                  </h3>
                  {pillar.subtitle && (
                    <p className="text-xs text-lotus-gold font-mono-code mb-3">
                      {pillar.subtitle}
                    </p>
                  )}
                  {pillar.summary && (
                    <p className="text-xs sm:text-sm text-lotus-muted leading-relaxed mb-4">
                      {pillar.summary}
                    </p>
                  )}
                  {Array.isArray(pillar.points) && pillar.points.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {pillar.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs sm:text-sm text-lotus-muted flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-lotus-gold shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/manifesto" className="btn-primary !px-8 text-sm inline-flex items-center gap-2 min-h-[44px]">
            <span>Explore All 15 Manifesto Pillars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
