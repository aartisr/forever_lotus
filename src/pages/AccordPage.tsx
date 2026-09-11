import React from 'react';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import GlobalAccordView from '@/components/GlobalAccordView';

export default function AccordPage() {
  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow="Institutional Governance &amp; Ethics"
        title="The Global Dignity Accord"
        description="A binding civilizational treaty and non-extractive firewall charter consecrated to non-harm, open public telemetry, and grassroots local sovereignty."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%)"
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-lotus-border-soft">
        <GlobalAccordView />
      </section>

      <PageCta
        title="Rooted in the Framework"
        description="Explore the living Dignity Observatory or read the 15-section foundational manifesto."
        links={[
          { href: '/observatory', label: 'View Dignity Observatory', primary: true },
          { href: '/manifesto', label: 'Read Manifesto' },
        ]}
      />
    </div>
  );
}
