'use client';

import React from 'react';
import Link from 'next/link';
import { AlignedWebsite } from '@/content/aligned-websites';

interface WebsiteShowcaseProps {
  website: AlignedWebsite;
  featured?: boolean;
}

export function WebsiteShowcase({ website, featured = false }: WebsiteShowcaseProps) {
  return (
    <article className={`rounded-3xl overflow-hidden ${featured ? 'border-2 border-lotus-gold shadow-2xl' : 'border border-lotus-border-soft'}`}>
      {/* Hero Section */}
      <div className={`relative px-8 py-16 ${featured ? 'bg-gradient-to-br from-lotus-gold/10 to-lotus-rose/10' : 'bg-lotus-bg'}`}>
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-lotus-gold text-[#1a1612] text-xs font-bold rounded-full">
            ✨ FEATURED
          </div>
        )}

        <h2 className={`font-serif font-black mb-2 ${featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
          {website.name}
        </h2>

        <p className={`${featured ? 'text-lg' : 'text-base'} text-lotus-muted mb-6`}>
          {website.tagline}
        </p>

        <p className={`${featured ? 'text-base' : 'text-sm'} text-lotus-cream/90 leading-relaxed mb-6`}>
          {website.description}
        </p>

        {/* Principles Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {website.principles.map((principle) => (
            <span
              key={principle}
              className="px-3 py-1 bg-white/20 text-lotus-cream text-xs font-semibold rounded-full"
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
          className="inline-flex items-center gap-2 px-6 py-3 bg-lotus-gold text-[#1a1612] font-semibold rounded-lg hover:bg-lotus-gold/90 transition"
        >
          Visit Platform →
        </a>
      </div>

      {/* Mission & Impact Section */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left: Mission & Philosophy */}
        <div className="border-r border-lotus-border-soft bg-white/50 px-8 py-8">
          <div className="mb-8">
            <h3 className="font-serif font-bold text-lg mb-3 text-[#1a1612]">Mission</h3>
            <p className="text-sm text-[#4a4640] leading-relaxed">{website.missionStatement}</p>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-3 text-[#1a1612]">Why It Matters</h3>
            <p className="text-sm text-[#4a4640] leading-relaxed">{website.featuredReason}</p>
          </div>
        </div>

        {/* Right: Design & Values */}
        <div className="bg-white/30 px-8 py-8">
          <div className="mb-8">
            <h3 className="font-serif font-bold text-lg mb-3 text-[#1a1612]">Design Philosophy</h3>
            <p className="text-sm text-[#4a4640] leading-relaxed">{website.designPhilosophy}</p>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-3 text-[#1a1612]">Data & Privacy</h3>
            <p className="text-sm text-[#4a4640] leading-relaxed">{website.dataTransparency}</p>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="border-t border-lotus-border-soft bg-white/20 px-8 py-8">
        <h3 className="font-serif font-bold text-lg mb-4 text-[#1a1612]">{website.impact.headline}</h3>
        <ul className="grid md:grid-cols-2 gap-3">
          {website.impact.metrics.map((metric) => (
            <li key={metric} className="flex items-start gap-3">
              <span className="text-lotus-gold font-bold text-lg leading-none mt-1">•</span>
              <span className="text-sm text-[#4a4640]">{metric}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Accessibility Highlight */}
      <div className="grid md:grid-cols-2 gap-0 border-t border-lotus-border-soft">
        <div className="border-r border-lotus-border-soft bg-white/10 px-8 py-6">
          <h4 className="font-bold text-sm text-[#1a1612] mb-2">♿ Accessibility</h4>
          <p className="text-xs text-[#4a4640] leading-relaxed">{website.accessibility}</p>
        </div>
        <div className="bg-white/10 px-8 py-6">
          <h4 className="font-bold text-sm text-[#1a1612] mb-2">🔒 Transparency</h4>
          <p className="text-xs text-[#4a4640] leading-relaxed">{website.dataTransparency}</p>
        </div>
      </div>

      {/* Footer CTA */}
      {website.getStarted && (
        <div className="border-t border-lotus-border-soft bg-lotus-cream/5 px-8 py-6">
          <p className="text-sm text-[#4a4640] mb-4">{website.getStarted}</p>
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-semibold text-lotus-gold hover:text-lotus-rose transition"
          >
            Explore Now →
          </a>
        </div>
      )}
    </article>
  );
}

/**
 * Compact card for listing multiple aligned websites
 */
export function WebsiteCard({ website }: { website: AlignedWebsite }) {
  return (
    <div className="rounded-2xl border border-lotus-border-soft bg-white/60 hover:bg-white/80 transition p-6">
      <h3 className="font-serif font-bold text-lg mb-2 line-clamp-2">{website.name}</h3>
      <p className="text-sm text-lotus-muted mb-3 line-clamp-2">{website.tagline}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {website.principles.slice(0, 3).map((p) => (
          <span key={p} className="px-2 py-1 bg-lotus-gold/10 text-lotus-cream text-xs rounded">
            {p}
          </span>
        ))}
        {website.principles.length > 3 && (
          <span className="px-2 py-1 bg-lotus-border-soft text-lotus-muted text-xs rounded">
            +{website.principles.length - 3}
          </span>
        )}
      </div>

      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex text-sm font-semibold text-lotus-gold hover:text-lotus-rose transition"
      >
        Learn More →
      </a>
    </div>
  );
}
