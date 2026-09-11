import React, { useState } from 'react';
import Link from 'next/link';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import { getMessages } from '@/i18n';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ScrollReveal from '@/components/ScrollReveal';
import { Search, ExternalLink, Copy, Check, Filter } from 'lucide-react';

export default function ResearchPage() {
  const locale = useResolvedLocale();
  const messages = getMessages(locale);
  const { researchPage } = messages;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  const categories = researchPage.categories;

  const handleCopyCitation = (citation: string, id: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedDoi(id);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  const filteredCategories = categories.map((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
      return null;
    }
    const filteredSources = cat.sources.filter(
      (s) =>
        s.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.note && s.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredSources.length === 0) return null;
    return { ...cat, sources: filteredSources };
  }).filter(Boolean);

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow={researchPage.hero.eyebrow}
        title={researchPage.hero.title}
        description={researchPage.hero.description}
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      {/* Method Banner & Filter Controls */}
      <section className="py-8 px-5 sm:px-8 border-y border-lotus-border-soft bg-lotus-bg-2">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-lotus-muted leading-relaxed">
            <span className="text-lotus-gold font-bold mr-2 uppercase font-mono-code">
              {researchPage.method.eyebrow}:
            </span>
            {researchPage.method.description}
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-lotus-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search authors, citations, universities, or DOIs..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm text-lotus-cream placeholder:text-lotus-muted-2 focus:outline-none focus:border-lotus-gold"
              />
            </div>

            {/* Category Filter Pills & Export */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition ${
                  selectedCategory === 'all'
                    ? 'bg-lotus-gold text-black'
                    : 'bg-white/[0.03] text-lotus-muted hover:text-lotus-cream border border-white/[0.08]'
                }`}
              >
                All (25+ Sources)
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
                    selectedCategory === c.id
                      ? 'bg-lotus-gold text-black'
                      : 'bg-white/[0.03] text-lotus-muted hover:text-lotus-cream border border-white/[0.08]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.title.split('—')[0].trim()}</span>
                </button>
              ))}

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => {
                    const bibtex = categories.flatMap(c => c.sources).map((s, i) => `@article{lotus_ref_${i+1},\n  title={${s.citation}},\n  year={2024},\n  note={${s.note || ''}}\n}`).join('\n\n');
                    const blob = new Blob([bibtex], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'forever-lotus-bibliography.bib';
                    a.click();
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-mono-code bg-white/[0.05] hover:bg-lotus-gold/20 text-lotus-gold border border-lotus-gold/30 transition flex items-center gap-1"
                  title="Export BibTeX for LaTeX / Zotero"
                >
                  <span>Download .bib</span>
                </button>
                <button
                  onClick={() => {
                    const text = categories.flatMap(c => c.sources).map((s, i) => `[${i+1}] ${s.citation} ${s.doi ? `DOI: ${s.doi}` : ''}`).join('\n\n');
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'forever-lotus-citations-apa.txt';
                    a.click();
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-mono-code bg-white/[0.05] hover:bg-white/[0.1] text-lotus-cream border border-white/[0.1] transition flex items-center gap-1"
                  title="Export plain APA text list"
                >
                  <span>Download .txt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sources Grid */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          {filteredCategories.map((cat: any) => (
            <ScrollReveal key={cat.id}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-mono-code font-bold text-sm text-black"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.letter}
                  </span>
                  <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                    {cat.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {cat.sources.map((src: any, idx: number) => {
                    const uniqueId = `${cat.id}-${idx}`;
                    return (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/25 transition group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <p className="font-serif-body text-base text-lotus-cream/95 leading-relaxed">
                              {src.citation}
                            </p>
                            {src.note && (
                              <p className="text-xs text-lotus-muted font-sans-ui">
                                {src.note}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {src.doi && (
                              <a
                                href={src.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-lotus-gold/20 text-lotus-gold text-xs font-mono-code flex items-center gap-1.5 transition"
                              >
                                <span>DOI / Source</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <button
                              onClick={() => handleCopyCitation(src.citation, uniqueId)}
                              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-lotus-muted hover:text-lotus-cream text-xs transition"
                              title="Copy Citation"
                            >
                              {copiedDoi === uniqueId ? (
                                <Check className="w-4 h-4 text-lotus-teal" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Page CTA */}
      <PageCta
        title={researchPage.cta.title}
        description={researchPage.cta.description}
        links={[
          { href: '/manifesto', label: researchPage.cta.primary, primary: true },
          { href: '/philosophy', label: researchPage.cta.secondary },
        ]}
      />
    </div>
  );
}
