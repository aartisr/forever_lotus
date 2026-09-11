import React, { useState } from 'react';
import { ScorecardOverview } from '@/components/ScorecardOverview';
import { CategoryDetailView } from '@/components/CategoryDetailView';
import { ActionableImprovementsView } from '@/components/ActionableImprovementsView';
import { RoadmapView } from '@/components/RoadmapView';
import { WhitepaperExportView } from '@/components/WhitepaperExportView';
import { CategoryId } from '@/types';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';

export default function StrategicAuditPage() {
  const [activeTab, setActiveTab] = useState<'scorecard' | 'deepdive' | 'improvements' | 'roadmap' | 'whitepaper'>('scorecard');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('purpose');

  const handleSelectCategory = (id: CategoryId) => {
    setSelectedCategory(id);
    setActiveTab('deepdive');
  };

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow="Institutional Architecture & Standards"
        title="Strategic Architecture Audit"
        description="Comprehensive evaluation of the Forever Lotus ecosystem across civilizational resonance, ethical rigor, accessibility, and strategic durability."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      {/* Sub-Navigation Tabs */}
      <section className="py-4 px-5 sm:px-8 border-y border-lotus-border-soft bg-lotus-bg-2 sticky top-16 z-20 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'scorecard', label: 'Scorecard Overview' },
            { id: 'deepdive', label: 'Category Deep-Dive' },
            { id: 'improvements', label: 'Actionable Improvements' },
            { id: 'roadmap', label: '16-Week Roadmap' },
            { id: 'whitepaper', label: 'Export Whitepaper' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                activeTab === tab.id
                  ? 'bg-lotus-gold text-black border-lotus-gold shadow-md shadow-lotus-gold/20'
                  : 'bg-white/[0.03] text-lotus-muted border-white/[0.08] hover:text-lotus-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Panels */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {activeTab === 'scorecard' && (
          <ScorecardOverview
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onNavigateTab={(tab) => {
              if (tab === 'roadmap') setActiveTab('roadmap');
              else if (tab === 'improvements') setActiveTab('improvements');
              else if (tab === 'whitepaper') setActiveTab('whitepaper');
              else setActiveTab('deepdive');
            }}
          />
        )}

        {activeTab === 'deepdive' && (
          <CategoryDetailView
            selectedCategoryId={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onNavigateTab={(tab) => {
              if (tab === 'roadmap') setActiveTab('roadmap');
              else if (tab === 'improvements') setActiveTab('improvements');
              else if (tab === 'whitepaper') setActiveTab('whitepaper');
              else setActiveTab('scorecard');
            }}
          />
        )}

        {activeTab === 'improvements' && <ActionableImprovementsView />}
        {activeTab === 'roadmap' && <RoadmapView />}
        {activeTab === 'whitepaper' && <WhitepaperExportView />}
      </section>

      <PageCta
        title="From Audit to Execution"
        description="Explore the civilizational framework and evidence base guiding this evaluation."
        links={[
          { href: '/manifesto', label: 'Read Manifesto', primary: true },
          { href: '/growth', label: 'Search Growth Console' },
        ]}
      />
    </div>
  );
}
