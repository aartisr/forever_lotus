import React, { useState } from 'react';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import { getMessages } from '@/i18n';
import PageCta from '@/components/sections/PageCta';
import { alignedWebsites } from '@/content/aligned-websites';

// Modular Home Subcomponents
import { HomeHero } from '@/components/home/HomeHero';
import { HomePhilosophyRoots } from '@/components/home/HomePhilosophyRoots';
import { HomePillarsGrid } from '@/components/home/HomePillarsGrid';
import { HomeObservatorySnap } from '@/components/home/HomeObservatorySnap';
import { HomeTraditionsGrid } from '@/components/home/HomeTraditionsGrid';
import { HomeResearchAnchor } from '@/components/home/HomeResearchAnchor';
import { HomeEcosystemSpotlight } from '@/components/home/HomeEcosystemSpotlight';
import { HomeAwariconTeaser } from '@/components/home/HomeAwariconTeaser';
import { HomeVowSection } from '@/components/home/HomeVowSection';
import { HomeFaqSection } from '@/components/home/HomeFaqSection';

export default function HomePage() {
  const locale = useResolvedLocale();
  const messages = getMessages(locale);
  const { home } = messages;
  const [crestVariant, setCrestVariant] = useState<'golden-ratio' | 'classic'>('golden-ratio');

  const featuredWebsite = alignedWebsites[0];

  const faqs = [
    {
      q: home.faq.q1,
      a: 'Forever Lotus is an institutional framework and open knowledge foundation authored by Subasri Dorairaj for conscious creation, humanitarian dignity, and responsible progress, uniting 4,000 years of Eastern wisdom with modern evidence-based research.',
    },
    {
      q: home.faq.q2,
      a: 'It is supported by 25+ peer-reviewed sources, canonical primary texts, and leading research institutions across three continents including Stanford CCARE, Harvard HFH, Oxford Wellbeing Research Centre, and Kyoto University.',
    },
    {
      q: home.faq.q3,
      a: 'The central objective is to re-anchor technological creation in moral responsibility: ensuring that technology, intelligence, wealth, and human power are directed toward reducing suffering and elevating human dignity rather than extraction.',
    },
    {
      q: 'What is the Non-Extractive Web and the Awaricon Protocol?',
      a: 'The Non-Extractive Web is an architectural paradigm rejecting dark patterns, behavioral surveillance tracking, and attention-hijacking mechanics. The Awaricon Protocol provides open mathematical trust verification for platforms honoring human sovereignty.',
    },
  ];

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      {/* 1. Hero & Crest Component (Paints immediately for instant FCP) */}
      <HomeHero
        crestVariant={crestVariant}
        setCrestVariant={setCrestVariant}
        titlePrefix={home.hero.titlePrefix}
        titleHighlight={home.hero.titleHighlight}
        description={home.hero.description}
        ctaPrimary={home.hero.ctaPrimary}
        ctaSecondary={home.hero.ctaSecondary}
      />

      {/* Below-the-fold sections with content-visibility auto for subsecond mobile layout */}
      <div className="cv-auto">
        {/* 2. Global Dignity Observatory Snapshot */}
        <HomeObservatorySnap />
      </div>

      <div className="cv-auto">
        {/* 3. Eastern Philosophical Roots (Ahimsa, Pratītyasamutpāda, Dharma) */}
        <HomePhilosophyRoots
          eyebrow={home.principle.eyebrow}
          title={home.principle.title}
          description={home.principle.description}
          cards={home.principle.cards}
          quoteText={home.quote.text}
          quoteCite={home.quote.cite}
        />
      </div>

      <div className="cv-auto">
        {/* 4. The 6 Pillars of Conscious Creation Grid */}
        <HomePillarsGrid
          eyebrow={home.pillars.eyebrow}
          title={home.pillars.title}
          description={home.pillars.description}
          items={home.pillars.items}
        />
      </div>

      <div className="cv-auto">
        {/* 5. Civilizational Traditions Grid */}
        <HomeTraditionsGrid
          eyebrow={home.traditions.eyebrow}
          title={home.traditions.title}
          description={home.traditions.description}
          items={home.traditions.items}
          ctaText={home.traditions.cta}
        />
      </div>

      <div className="cv-auto">
        {/* 6. Empirical University & Research Anchors */}
        <HomeResearchAnchor
          eyebrow={home.research.eyebrow}
          title={home.research.title}
          description={home.research.description}
          institutions={home.research.institutions}
          quote={home.research.quote}
          cta={home.research.cta}
        />
      </div>

      <div className="cv-auto">
        {/* 7. Aligned Ecosystem Spotlight */}
        <HomeEcosystemSpotlight featuredWebsite={featuredWebsite} />
      </div>

      <div className="cv-auto">
        {/* 8. Awaricon Trust Suite Teaser */}
        <HomeAwariconTeaser />
      </div>

      <div className="cv-auto">
        {/* 9. The Institutional Vow */}
        <HomeVowSection
          eyebrow={home.vow.eyebrow}
          titlePrefix={home.vow.titlePrefix}
          titleHighlight={home.vow.titleHighlight}
          description={home.vow.description}
          commitments={home.vow.commitments}
          cta={home.vow.cta}
        />
      </div>

      <div className="cv-auto">
        {/* 10. Frequently Asked Questions */}
        <HomeFaqSection faqs={faqs} />
      </div>

      <div className="cv-auto">
        {/* 11. Final Action CTA */}
        <PageCta
          title={`${home.closing.titlePrefix} ${home.closing.titleHighlight}`}
          description={home.closing.description}
          links={[
            { href: '/manifesto', label: home.closing.ctaPrimary, primary: true },
            { href: '/about', label: home.closing.ctaSecondary },
          ]}
        />
      </div>
    </div>
  );
}
