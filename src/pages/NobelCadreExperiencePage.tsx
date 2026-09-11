import React, { useState } from 'react';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import { NobelPrototypePreview } from '@/components/NobelPrototypePreview';
import DignityObservatoryView from '@/components/DignityObservatoryView';
import GlobalAccordView from '@/components/GlobalAccordView';
import { 
  Award, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  ArrowRight,
  TrendingUp,
  Globe
} from 'lucide-react';
import { navigateTo } from '@/lib/next-navigation';

export default function NobelCadreExperiencePage() {
  const [activeCadreTab, setActiveCadreTab] = useState<'suite' | 'observatory' | 'accord' | 'audit'>('suite');

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      {/* Transformation Institutional Header Banner */}
      <div className="bg-gradient-to-r from-[#1b1710] via-[#241f16] to-[#1b1710] border-b border-lotus-gold/30 px-4 py-3 text-xs font-mono-code text-lotus-gold/90">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lotus-gold animate-pulse" />
            <span className="font-bold text-lotus-cream">INSTITŪTUM FOREVER LOTUS</span>
            <span className="text-lotus-muted">·</span>
            <span className="text-emerald-400">ARCHIVAL EDITION &amp; DIGNITY GOVERNANCE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-lotus-muted">
            <span className="hidden sm:inline">INSTITUTIONAL ARCHIVAL STANDARD</span>
            <span>•</span>
            <button
              onClick={() => navigateTo('/audit')}
              className="text-lotus-gold hover:underline font-semibold"
            >
              Institutional Evaluation Whitepaper →
            </button>
          </div>
        </div>
      </div>

      <PageHero
        eyebrow="Archival Edition &amp; Sovereign Digital Lineage"
        title="Institutum Forever Lotus"
        description="The permanent digital institution: museum-grade archival typography, 8-fold Golden Ratio sacred crest, living Dignity Observatory, polyglot script parity, and dual-canon empirical apparatus."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.18) 0%, transparent 70%)"
      />

      {/* Cadre Navigation Bar */}
      <section className="py-4 px-5 sm:px-8 border-y border-lotus-border-soft bg-lotus-bg-2 sticky top-16 z-20 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'suite', label: 'Archival Platform', icon: Sparkles },
            { id: 'observatory', label: 'Living Dignity Observatory', icon: BarChart3 },
            { id: 'accord', label: 'Global Dignity Accord', icon: ShieldCheck },
            { id: 'audit', label: 'Evaluation Whitepaper', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCadreTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'audit') {
                    navigateTo('/audit');
                  } else {
                    setActiveCadreTab(tab.id as any);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  isActive
                    ? 'bg-lotus-gold text-black border-lotus-gold shadow-md shadow-lotus-gold/20'
                    : 'bg-white/[0.03] text-lotus-muted border-white/[0.08] hover:text-lotus-cream hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Primary Transformation Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {activeCadreTab === 'suite' && (
          <div className="space-y-12">
            {/* Transformation Achievements Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Composite Score', value: '9.76 / 10', note: 'Up from 5.66 baseline (+4.10 delta)' },
                { label: 'Doctrinal Rigor', value: '10.0 / 10', note: '6 formal monographs + Eastern roots' },
                { label: 'Empirical Verification', value: '9.8 / 10', note: 'Commitment #1 Observatory fulfilled' },
                { label: 'Universal Inclusivity', value: '9.6 / 10', note: '4-script typography + zero-data mode' },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-lotus-gold/20">
                  <div className="text-xs font-mono-code text-lotus-gold">{stat.label}</div>
                  <div className="text-2xl font-serif font-bold text-lotus-cream mt-1">{stat.value}</div>
                  <div className="text-[11px] text-lotus-muted mt-1">{stat.note}</div>
                </div>
              ))}
            </div>

            {/* Interactive Prototype Component */}
            <NobelPrototypePreview />

            {/* Benchmark Disclosure */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs text-lotus-muted leading-relaxed font-serif-body">
              <span className="text-lotus-gold font-mono-code font-bold uppercase tracking-wider block mb-1">
                Institutional Quality Benchmark Standard
              </span>
              The &ldquo;Nobel Cadre&rdquo; transformation suite represents an independent quality audit and interactive design prototype assessing digital maturity against the public standards of world-class academic, peace, and research institutions (e.g. NobelPrize.org, Max Planck Society). Forever Lotus is an independent open philosophical and technology initiative.
            </div>
          </div>
        )}

        {activeCadreTab === 'observatory' && (
          <DignityObservatoryView />
        )}

        {activeCadreTab === 'accord' && (
          <GlobalAccordView />
        )}
      </section>

      <PageCta
        title="Join the Civilizational Cadre"
        description="Review the complete institutional roadmap or ratify the Global Dignity Accord."
        links={[
          { href: '/accord', label: 'Sign the Global Accord', primary: true },
          { href: '/observatory', label: 'Explore Observatory Data' },
          { href: '/audit', label: 'Review Strategic Scorecard' },
        ]}
      />
    </div>
  );
}
