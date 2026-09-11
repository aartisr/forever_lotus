import React, { useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/sections/PageCta';
import ScrollReveal from '@/components/ScrollReveal';
import { Copy, Check, ExternalLink, Code2, BookMarked, Award } from 'lucide-react';

export default function BacklinksPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const bibtex = `@misc{forever_lotus_2026,
  author = {Dorairaj, Subasri},
  title = {Forever Lotus: A Civilizational Framework for Conscious Creation},
  year = {2026},
  publisher = {Forever Lotus Press},
  howpublished = {\\url{https://www.foreverlotus.com}},
  note = {Fifteen Sections on Conscious Creation, Eastern Philosophy, and Human Dignity}
}`;

  const markdownBadge = `[![Forever Lotus Aligned](https://www.foreverlotus.com/icon.svg)](https://www.foreverlotus.com/manifesto)`;

  const htmlBadge = `<a href="https://www.foreverlotus.com/manifesto" target="_blank" rel="noopener noreferrer">
  <img src="https://www.foreverlotus.com/icon.svg" alt="Forever Lotus Aligned" width="32" height="32" />
</a>`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-lotus-bg text-lotus-cream min-h-screen">
      <PageHero
        eyebrow="Academic Provenance &amp; Canon"
        title="Citation Kit &amp; Backlinks"
        description="Official academic citations, BibTeX definitions, backlink assets, and digital canon references for researchers, authors, and partner platforms."
        gradient="radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
      />

      <section className="py-16 px-5 sm:px-8 border-t border-lotus-border-soft">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Academic Attribution Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookMarked className="w-5 h-5 text-lotus-gold" />
                <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                  Standard Academic Citation (APA 7th)
                </h2>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    'Dorairaj, S. (2026). Forever Lotus: A Civilizational Framework for Conscious Creation. Forever Lotus Press. https://www.foreverlotus.com',
                    'apa'
                  )
                }
                className="btn-ghost text-xs !py-1.5 !px-3"
              >
                {copiedId === 'apa' ? <Check className="w-3.5 h-3.5 text-lotus-teal" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'apa' ? 'Copied' : 'Copy APA'}</span>
              </button>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/[0.06] text-sm text-lotus-cream/90 font-serif leading-relaxed">
              Dorairaj, S. (2026). <em>Forever Lotus: A Civilizational Framework for Conscious Creation</em>. Forever Lotus Press. https://www.foreverlotus.com
            </div>
          </div>

          {/* BibTeX Source */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-lotus-gold" />
                <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                  BibTeX Record
                </h2>
              </div>
              <button
                onClick={() => handleCopy(bibtex, 'bibtex')}
                className="btn-ghost text-xs !py-1.5 !px-3"
              >
                {copiedId === 'bibtex' ? <Check className="w-3.5 h-3.5 text-lotus-teal" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'bibtex' ? 'Copied' : 'Copy BibTeX'}</span>
              </button>
            </div>

            <pre className="p-5 rounded-xl bg-black/50 border border-white/[0.06] text-xs font-mono-code text-lotus-gold overflow-x-auto">
              {bibtex}
            </pre>
          </div>

          {/* Verification Backlink Badges */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-6">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-lotus-gold" />
              <h2 className="font-serif font-bold text-2xl text-lotus-cream">
                Ecosystem Verification Badges
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-lotus-muted leading-relaxed">
              Embed these verified marks on aligned websites, academic repositories, and open publications.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono-code text-lotus-gold">Markdown Code</span>
                  <button
                    onClick={() => handleCopy(markdownBadge, 'md')}
                    className="text-xs text-lotus-muted hover:text-lotus-cream flex items-center gap-1"
                  >
                    {copiedId === 'md' ? <Check className="w-3 h-3 text-lotus-teal" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-black/40 border border-white/[0.05] text-xs font-mono text-lotus-cream/80 overflow-x-auto">
                  {markdownBadge}
                </pre>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono-code text-lotus-gold">HTML Code</span>
                  <button
                    onClick={() => handleCopy(htmlBadge, 'html')}
                    className="text-xs text-lotus-muted hover:text-lotus-cream flex items-center gap-1"
                  >
                    {copiedId === 'html' ? <Check className="w-3 h-3 text-lotus-teal" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-black/40 border border-white/[0.05] text-xs font-mono text-lotus-cream/80 overflow-x-auto">
                  {htmlBadge}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title="Research Grounding"
        description="Inspect the complete 25+ source peer-reviewed research dossier."
        links={[
          { href: '/research', label: 'Explore Research Dossier', primary: true },
          { href: '/manifesto', label: 'Read Manifesto' },
        ]}
      />
    </div>
  );
}
