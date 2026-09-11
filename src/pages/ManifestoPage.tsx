import React, { useState } from 'react';
import Link from 'next/link';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import { getMessages } from '@/i18n';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ScrollReveal from '@/components/ScrollReveal';
import { Copy, Check, BookOpen, Share2, Sparkles, Volume2 } from 'lucide-react';

export default function ManifestoPage() {
  const locale = useResolvedLocale();
  const messages = getMessages(locale);
  const { manifesto } = messages;
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [readingMode, setReadingMode] = useState(false);

  const handleCopy = (num: string, title: string, body: string) => {
    const text = `Forever Lotus Manifesto - Section ${num}: ${title}\n\n${body}\n\nSource: https://www.foreverlotus.com/manifesto`;
    navigator.clipboard.writeText(text);
    setCopiedSection(num);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow={manifesto.hero.eyebrow}
        title={manifesto.hero.title}
        description={manifesto.hero.description}
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      >
        {/* Controls Toolbar */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setReadingMode(!readingMode)}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition ${
              readingMode 
                ? 'bg-lotus-gold text-black border-lotus-gold' 
                : 'bg-white/[0.04] text-lotus-cream border-white/[0.08] hover:border-lotus-gold/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{readingMode ? 'Standard Layout' : 'Focus Reading Mode'}</span>
          </button>
        </div>
      </PageHero>

      {/* Sections List */}
      <section className="py-16 px-5 sm:px-8 border-t border-lotus-border-soft">
        <div className={`mx-auto transition-all duration-300 ${readingMode ? 'max-w-2xl' : 'max-w-4xl'} space-y-12`}>
          {manifesto.sections.map((section, idx) => (
            <ScrollReveal key={section.num} delay={idx * 40}>
              <article 
                id={`section-${section.num.toLowerCase()}`}
                className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/30 transition-all duration-300 relative group"
              >
                {/* Roman Numeral Header */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-code text-sm font-bold text-lotus-gold px-2.5 py-1 rounded bg-lotus-gold/10 border border-lotus-gold/20">
                      Section {section.num}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(section.num, section.title, section.body)}
                    className="opacity-60 group-hover:opacity-100 p-2 rounded-lg hover:bg-white/[0.06] text-lotus-muted hover:text-lotus-gold transition text-xs flex items-center gap-1.5"
                    title="Copy Section"
                  >
                    {copiedSection === section.num ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-lotus-teal" />
                        <span className="text-lotus-teal">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-lotus-cream mb-4">
                  {section.title}
                </h2>

                <p className="text-lotus-cream/90 text-base sm:text-lg leading-relaxed font-serif-body">
                  {section.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Manifesto Closing Statement */}
      <section className="py-20 px-5 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft text-center">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-3">Foundational Seal</p>
          <p className="font-serif italic font-bold text-3xl sm:text-4xl text-lotus-gold mb-6">
            &ldquo;{manifesto.closing}&rdquo;
          </p>
          <p className="text-sm text-lotus-muted max-w-lg mx-auto mb-10">
            Authored by Subasri Dorairaj to preserve human agency, universal compassion, and moral responsibility in the age of accelerated power.
          </p>
        </div>
      </section>

      {/* Page CTA */}
      <PageCta
        eyebrow={manifesto.cta.eyebrow}
        title={manifesto.cta.title}
        links={[
          { href: '/philosophy', label: manifesto.cta.primary, primary: true },
          { href: '/research', label: manifesto.cta.secondary },
        ]}
      />
    </div>
  );
}
