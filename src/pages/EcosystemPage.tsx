import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ScrollReveal from '@/components/ScrollReveal';
import { WebsiteShowcase } from '@/components/WebsiteShowcase';
import { alignedWebsites, alignmentCriteria } from '@/content/aligned-websites';
import { ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function EcosystemPage() {
  const featured = alignedWebsites[0];
  const others = alignedWebsites.slice(1);

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow="Conscious Ecosystem"
        title="Aligned Websites"
        description="A directory of digital platforms and initiatives that embody the Forever Lotus Manifesto: non-extractive value, radical transparency, and dignity-first design."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      {/* Featured Platform Showcase */}
      <section className="py-16 px-5 sm:px-8 border-t border-lotus-border-soft">
        <div className="max-w-5xl mx-auto space-y-16">
          <ScrollReveal>
            <div className="mb-4">
              <span className="eyebrow">Exemplary Platform</span>
            </div>
            <WebsiteShowcase website={featured} featured={true} />
          </ScrollReveal>

          {/* Directory of Verified Aligned Case Studies */}
          <div className="pt-8 border-t border-white/10">
            <div className="mb-8">
              <p className="eyebrow mb-2">Verified Ecosystem Case Studies</p>
              <h3 className="font-serif font-bold text-2xl text-lotus-cream">
                Independent Pillars of the Non-Extractive Web
              </h3>
              <p className="text-sm text-lotus-muted mt-1">
                Real-world institutions and open protocols demonstrating non-extractive architecture at planetary scale.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {others.map((site) => (
                <div key={site.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-lotus-gold/40 transition flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono-code text-lotus-gold uppercase tracking-wider block mb-1">
                      {site.principles[0]}
                    </span>
                    <h4 className="font-serif font-bold text-xl text-lotus-cream mb-2">
                      {site.name}
                    </h4>
                    <p className="text-xs text-lotus-muted leading-relaxed mb-4">
                      {site.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-mono-code font-semibold">
                      Verified Sovereign
                    </span>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-lotus-gold hover:text-white flex items-center gap-1"
                    >
                      <span>Visit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alignment Criteria */}
      <section className="py-24 px-5 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="eyebrow mb-3">The Standard</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-lotus-cream mb-4">
              What Makes a Website Aligned?
            </h2>
            <p className="text-lotus-muted text-base sm:text-lg leading-relaxed">
              Every platform in this directory is evaluated against the 6 core pillars of conscious creation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alignmentCriteria.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 60}>
                <div className="h-full p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/30 transition flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-lotus-gold/10 border border-lotus-gold/25 flex items-center justify-center text-lotus-gold mb-4">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-lotus-cream mb-2.5">
                      {item.principle}
                    </h3>
                    <p className="text-sm text-lotus-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/evaluate" className="btn-primary !px-8 text-sm inline-flex items-center gap-2">
              <span>Run Live Manifesto Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Page CTA */}
      <PageCta
        eyebrow="Join the Network"
        title="Is Your Website Purpose-Driven?"
        description="We invite organizations, educators, creators, and open initiatives committed to ethical presence to apply for network onboarding."
        links={[
          { href: '/onboarding-websites', label: 'Onboard Your Website', primary: true },
          { href: '/evaluate', label: 'Manifesto Evaluator' },
        ]}
      />
    </div>
  );
}
