import React from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { AlignedWebsite } from '@/content/aligned-websites';

interface HomeEcosystemSpotlightProps {
  featuredWebsite?: AlignedWebsite;
}

export const HomeEcosystemSpotlight: React.FC<HomeEcosystemSpotlightProps> = ({
  featuredWebsite,
}) => {
  if (!featuredWebsite) return null;

  const principles = featuredWebsite.principles || [];
  const metrics = featuredWebsite.impact?.metrics || [];

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <p className="eyebrow mb-2">Ecosystem Spotlight</p>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-lotus-cream">
              Conscious Web Presence in Action
            </h2>
          </div>
          <Link
            href="/ecosystem"
            className="text-xs sm:text-sm text-lotus-gold hover:underline flex items-center gap-1 font-semibold min-h-[44px]"
          >
            <span>View all aligned platforms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-lotus-gold/30 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lotus-gold/15 text-lotus-gold text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Platform</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-lotus-cream">
                {featuredWebsite.name}
              </h3>
              <p className="text-lotus-gold font-medium text-sm sm:text-base">
                {featuredWebsite.tagline}
              </p>
              <p className="text-lotus-muted leading-relaxed text-xs sm:text-sm md:text-base">
                {featuredWebsite.description}
              </p>

              {principles.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {principles.map((p, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.05] text-lotus-cream/80 border border-white/[0.08]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs uppercase font-mono-code text-lotus-gold mb-3">Key Impact Metrics</p>
                <ul className="space-y-2.5 text-xs text-lotus-muted leading-relaxed">
                  {metrics.slice(0, 3).map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href={featuredWebsite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-xs !py-2.5 flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <span>Visit Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
