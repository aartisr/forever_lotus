'use client';

import React from 'react';
import Link from 'next/link';
import { AlignedWebsite } from '@/content/aligned-websites';
import { ExternalLink, Shield, CheckCircle2, Sparkles } from 'lucide-react';

interface WebsiteShowcaseProps {
  website: AlignedWebsite;
  featured?: boolean;
}

function formatText(text: string) {
  // Simple parser to render **bold** properly
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-lotus-cream">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function WebsiteShowcase({ website, featured = false }: WebsiteShowcaseProps) {
  return (
    <article
      className={`rounded-3xl overflow-hidden bg-lotus-bg-2 border transition-all duration-300 ${
        featured
          ? 'border-lotus-gold/50 shadow-2xl shadow-lotus-gold/10'
          : 'border-white/10'
      }`}
    >
      {/* Hero Section */}
      <div
        className={`relative px-6 sm:px-10 py-10 sm:py-14 border-b border-white/10 ${
          featured
            ? 'bg-gradient-to-br from-lotus-gold/15 via-lotus-bg-2 to-lotus-bg'
            : 'bg-white/[0.02]'
        }`}
      >
        {featured && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-lotus-gold text-black text-xs font-bold font-mono-code rounded-full mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXEMPLARY ALIGNED PLATFORM</span>
          </div>
        )}

        <h2 className="font-serif font-black text-3xl sm:text-4xl text-lotus-cream mb-2 tracking-tight">
          {website.name}
        </h2>

        <p className="text-base sm:text-lg text-lotus-gold font-medium mb-4">
          {website.tagline}
        </p>

        <p className="text-sm sm:text-base text-lotus-muted leading-relaxed max-w-3xl mb-6">
          {website.description}
        </p>

        {/* Principles Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {website.principles.map((principle) => (
            <span
              key={principle}
              className="px-3 py-1 bg-white/[0.06] text-lotus-cream border border-white/15 text-xs font-semibold rounded-full"
            >
              {principle}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm inline-flex items-center gap-2 !py-3 !px-6"
        >
          <span>Visit Platform</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Mission & Impact Section */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Left: Mission & Why It Matters */}
        <div className="p-6 sm:p-8 space-y-6 bg-white/[0.01]">
          <div>
            <h3 className="font-serif font-bold text-lg text-lotus-gold mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lotus-gold" />
              Mission
            </h3>
            <p className="text-sm text-lotus-cream leading-relaxed">
              {formatText(website.missionStatement)}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="font-serif font-bold text-lg text-lotus-gold mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lotus-gold" />
              Why It Matters
            </h3>
            <p className="text-sm text-lotus-cream leading-relaxed">
              {formatText(website.featuredReason)}
            </p>
          </div>
        </div>

        {/* Right: Design & Data Privacy */}
        <div className="p-6 sm:p-8 space-y-6 bg-white/[0.02]">
          <div>
            <h3 className="font-serif font-bold text-lg text-lotus-gold mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lotus-gold" />
              Design Philosophy
            </h3>
            <p className="text-sm text-lotus-cream leading-relaxed">
              {formatText(website.designPhilosophy)}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="font-serif font-bold text-lg text-lotus-gold mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lotus-gold" />
              Data & Privacy
            </h3>
            <p className="text-sm text-lotus-cream leading-relaxed">
              {formatText(website.dataTransparency)}
            </p>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="border-t border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="font-serif font-bold text-lg text-lotus-cream mb-4">
          {website.impact.headline}
        </h3>
        <ul className="grid sm:grid-cols-2 gap-3">
          {website.impact.metrics.map((metric) => (
            <li key={metric} className="flex items-start gap-3 text-sm text-lotus-muted">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{metric}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Accessibility Highlight */}
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/10 bg-black/40">
        <div className="p-6">
          <h4 className="font-bold text-xs uppercase tracking-wider text-lotus-gold mb-1.5 flex items-center gap-1.5">
            <span>♿</span>
            <span>Accessibility Standard</span>
          </h4>
          <p className="text-xs text-lotus-muted leading-relaxed">
            {website.accessibility}
          </p>
        </div>
        <div className="p-6">
          <h4 className="font-bold text-xs uppercase tracking-wider text-lotus-gold mb-1.5 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Radical Transparency</span>
          </h4>
          <p className="text-xs text-lotus-muted leading-relaxed">
            {website.dataTransparency}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * Compact card for listing multiple aligned websites
 */
export function WebsiteCard({ website }: { website: AlignedWebsite }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-lotus-gold/40 transition-all p-6">
      <h3 className="font-serif font-bold text-lg text-lotus-cream mb-2 line-clamp-2">{website.name}</h3>
      <p className="text-sm text-lotus-muted mb-3 line-clamp-2">{website.tagline}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {website.principles.slice(0, 3).map((p) => (
          <span key={p} className="px-2 py-1 bg-white/[0.06] text-lotus-cream border border-white/10 text-xs rounded">
            {p}
          </span>
        ))}
        {website.principles.length > 3 && (
          <span className="px-2 py-1 bg-white/[0.04] text-lotus-muted text-xs rounded">
            +{website.principles.length - 3}
          </span>
        )}
      </div>

      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold text-lotus-gold hover:text-white flex items-center gap-1"
      >
        <span>Explore Platform</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
