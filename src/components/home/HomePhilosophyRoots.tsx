import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface PrincipleCard {
  symbol: string;
  word: string;
  desc: string;
  color: string;
}

interface HomePhilosophyRootsProps {
  eyebrow: string;
  title: string;
  description: string;
  cards?: PrincipleCard[];
  quoteText: string;
  quoteCite: string;
}

export const HomePhilosophyRoots: React.FC<HomePhilosophyRootsProps> = ({
  eyebrow,
  title,
  description,
  cards = [],
  quoteText,
  quoteCite,
}) => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 border-t border-lotus-border-soft bg-lotus-bg-2">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(cards || []).map((card, idx) => (
            <ScrollReveal key={idx} delay={idx * 120}>
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/30 transition-all duration-300 group hover:-translate-y-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6 font-bold shadow-inner"
                  style={{
                    backgroundColor: `${card.color}15`,
                    color: card.color,
                    border: `1px solid ${card.color}30`,
                  }}
                >
                  {card.symbol}
                </div>
                <h3 className="font-serif font-bold text-2xl text-lotus-cream mb-3 group-hover:text-lotus-gold transition">
                  {card.word}
                </h3>
                <p className="text-lotus-muted leading-relaxed text-sm sm:text-base">
                  {card.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Central Quote Callout */}
        <ScrollReveal delay={250}>
          <div className="mt-12 sm:mt-16 p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-lotus-gold/10 via-lotus-gold/5 to-transparent border border-lotus-gold/25 text-center relative overflow-hidden">
            <p className="font-serif italic text-lotus-cream text-base sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-4">
              &ldquo;{quoteText}&rdquo;
            </p>
            <span className="text-xs font-mono-code uppercase tracking-widest text-lotus-gold">
              — {quoteCite}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
