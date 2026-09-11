import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, BookOpen } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface HomeFaqSectionProps {
  faqs?: FaqItem[];
}

export const HomeFaqSection: React.FC<HomeFaqSectionProps> = ({ faqs = [] }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 border-t border-lotus-border-soft">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-14">
          <p className="eyebrow mb-2">Clarity & Understanding</p>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-lotus-cream">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-lotus-muted mt-2">
            Clear, authoritative answers about Forever Lotus and the Non-Extractive Web.
          </p>
        </div>

        <div className="space-y-4">
          {(faqs || []).map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-lotus-cream flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-lotus-gold shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-lotus-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-lotus-gold' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-lotus-muted leading-relaxed border-t border-white/[0.04]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-lotus-bg-2 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-lotus-gold shrink-0" />
            <span className="text-xs sm:text-sm text-lotus-cream">
              Looking for machine-readable context for AI models or LLMs?
            </span>
          </div>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono-code text-lotus-gold hover:underline shrink-0"
          >
            View /llms.txt →
          </a>
        </div>
      </div>
    </section>
  );
};
