import React, { useState } from 'react';
import { WebsiteEvaluator } from './website-evaluator';
import EvaluationDashboard from './EvaluationDashboard';
import { WebsiteEvaluationResult } from '@/lib/manifesto-evaluator';
import { 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink, 
  ShieldCheck, 
  Search,
  BookOpen
} from 'lucide-react';

export const WebsiteEvaluatorView: React.FC = () => {
  const [presetUrl, setPresetUrl] = useState<string>('');

  const sampleUrls = [
    { label: 'Wellness Rural Guru', url: 'https://wellness.ruralguru.com' },
    { label: 'Forever Lotus', url: 'https://www.foreverlotus.com/' },
    { label: 'Wikipedia Commons', url: 'https://en.wikipedia.org' },
  ];

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/70 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-800 uppercase tracking-widest mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Manifesto Compliance Diagnostic</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              Live Website &amp; Manifesto Evaluator
            </h2>
            <p className="text-sm text-stone-600 font-serif-body mt-1 max-w-3xl">
              Inspect any web property against the seven moral pillars of the Forever Lotus Manifesto: non-domination, earth consciousness, humanitarian dignity, and agency.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono-code px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
              7 Pillars · 0-100 Scoring
            </span>
          </div>
        </div>

        {/* Preset Launchers */}
        <div className="pt-6 flex items-center gap-3 flex-wrap">
          <span className="text-xs font-medium text-stone-600">Quick Test Domains:</span>
          {sampleUrls.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPresetUrl(s.url);
                const inputEl = document.querySelector('input[type="url"]') as HTMLInputElement;
                if (inputEl) {
                  inputEl.value = s.url;
                  // Trigger input event
                  inputEl.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-950 border border-stone-200 font-mono-code transition-colors flex items-center gap-1.5"
            >
              <span>{s.label}</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Evaluator Engine */}
      <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
        <WebsiteEvaluator />
      </div>
    </div>
  );
};
