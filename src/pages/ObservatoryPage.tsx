import React from 'react';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import DignityObservatoryView from '@/components/DignityObservatoryView';

export default function ObservatoryPage() {
  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow="Commitment #1: Metrics of Dignity"
        title="The Living Global Dignity Observatory"
        description="Replacing vanity web analytics with open public indices of suffering alleviation, local agency expansion, and zero-compromise non-extractive flow."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%)"
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-lotus-border-soft">
        <DignityObservatoryView />
      </section>

      <PageCta
        title="Institutional Transparency"
        description="Review the complete institutional roadmap and evaluation scorecard."
        links={[
          { href: '/accord', label: 'Ratify Global Accord', primary: true },
          { href: '/audit', label: 'View Evaluation Scorecard' },
        ]}
      />
    </div>
  );
}
