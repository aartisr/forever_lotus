import React from 'react';
import Link from 'next/link';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import { getMessages } from '@/i18n';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ScrollReveal from '@/components/ScrollReveal';
import LotusIcon from '@/components/LotusIcon';
import { Github, Shield, Sparkles, HeartHandshake, Compass, BookOpen, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const locale = useResolvedLocale();
  const messages = getMessages(locale);
  const { about } = messages;

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        description={about.hero.description}
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      {/* Strategic Position & Uncommon Values */}
      <section className="py-20 px-5 sm:px-8 border-t border-lotus-border-soft">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="eyebrow mb-3">{about.strategic.eyebrow}</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-lotus-cream mb-4">
              {about.strategic.title}
            </h2>
            <p className="text-lotus-muted text-base sm:text-lg leading-relaxed">
              {about.strategic.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.strategic.values.map((v, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/30 transition text-center"
              >
                <div className="text-3xl mb-4" role="img">{v.icon}</div>
                <h3 className="font-serif font-bold text-xl text-lotus-cream mb-2">
                  {v.label}
                </h3>
                <p className="text-xs text-lotus-muted">
                  {v.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author & Founder Profile */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-lotus-gold/25 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-lotus-gold/20 via-lotus-gold/5 to-white/5 border border-lotus-gold/30 flex items-center justify-center shadow-lg">
                  <LotusIcon size={56} className="w-14 h-14" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="eyebrow mb-1">{about.founder.eyebrow}</p>
                  <h2 className="font-serif font-black text-3xl sm:text-4xl text-lotus-cream">
                    {about.founder.name}
                  </h2>
                </div>

                <p className="text-lotus-cream/90 text-base sm:text-lg leading-relaxed font-serif-body">
                  {about.founder.p1}
                </p>

                <p className="text-lotus-muted text-sm sm:text-base leading-relaxed">
                  {about.founder.p2}
                </p>

                {/* White Paper Position Quote */}
                <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-lotus-gold/20 relative">
                  <p className="text-xs font-mono-code uppercase tracking-wider text-lotus-gold mb-2">
                    {about.founder.paperEyebrow}
                  </p>
                  <p className="font-serif italic text-lotus-cream text-base sm:text-lg leading-relaxed mb-3">
                    &ldquo;{about.founder.paperQuote}&rdquo;
                  </p>
                  <span className="text-xs font-mono-code text-lotus-muted-2">
                    — {about.founder.paperCite}
                  </span>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <a
                    href="https://github.com/aartisr/forever_lotus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs !py-2.5 !px-5 inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>{about.founder.repoLink}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Operating Commitments */}
      <section className="py-24 px-5 sm:px-8 border-t border-lotus-border-soft">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="eyebrow mb-3">{about.commitments.eyebrow}</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-lotus-cream mb-4">
              {about.commitments.title}
            </h2>
            <p className="text-lotus-muted text-base sm:text-lg leading-relaxed">
              {about.commitments.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.commitments.items.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/30 transition flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-code text-xs text-lotus-gold font-bold block mb-3">
                    COMMITMENT {item.num}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-lotus-cream mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-lotus-muted leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moral Lineage */}
      <section className="py-20 px-5 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft text-center">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-3">{about.lineage.eyebrow}</p>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-lotus-cream mb-6">
            {about.lineage.title}
          </h2>
          <p className="text-lotus-cream/90 text-base sm:text-lg leading-relaxed mb-4 font-serif-body">
            {about.lineage.p1}
          </p>
          <p className="text-lotus-muted text-sm sm:text-base leading-relaxed">
            {about.lineage.p2}
          </p>
        </div>
      </section>

      {/* Page CTA */}
      <PageCta
        quote={about.cta.quote}
        links={[
          { href: '/manifesto', label: about.cta.primary, primary: true },
          { href: '/research', label: about.cta.secondary },
        ]}
      />
    </div>
  );
}
