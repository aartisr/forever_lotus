import React, { useState } from 'react';
import { 
  Palette, 
  FileCode, 
  Smartphone, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  Sliders,
  Shield,
  Layers
} from 'lucide-react';
import { IMPROVEMENT_DOMAINS } from '../data/evaluationData';

export const ActionableImprovementsView: React.FC = () => {
  const [activeDomainId, setActiveDomainId] = useState<'ui_ux' | 'content_strategy' | 'mobile_responsiveness'>('ui_ux');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const activeDomain = IMPROVEMENT_DOMAINS.find(d => d.id === activeDomainId) || IMPROVEMENT_DOMAINS[0];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'ui_ux': return Palette;
      case 'content_strategy': return BookOpen;
      case 'mobile_responsiveness': return Smartphone;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-amber-400">
          <span className="px-2.5 py-0.5 rounded bg-amber-950 border border-amber-800/80 uppercase">
            Transformation Blueprints
          </span>
          <span>•</span>
          <span className="text-stone-400">Direct Engineering &amp; Design Directives</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-50">
          Actionable Improvements for Global Institutional Excellence
        </h2>
        <p className="text-stone-300 font-serif-body text-base max-w-3xl leading-relaxed">
          Concrete, implementable specifications designed to elevate Forever Lotus from a standard digital brochure
          to a Nobel-cadre intellectual institution. Organized into three core engineering disciplines.
        </p>

        {/* 3 Domain selector tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {IMPROVEMENT_DOMAINS.map((domain) => {
            const Icon = getDomainIcon(domain.id);
            const isActive = activeDomainId === domain.id;
            return (
              <button
                key={domain.id}
                id={`domain-tab-${domain.id}`}
                onClick={() => setActiveDomainId(domain.id)}
                className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-amber-950/80 border-amber-600 text-amber-200 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded ${
                    isActive ? 'bg-amber-900/60 text-amber-300' : 'bg-stone-800 text-stone-500'
                  }`}>
                    {domain.badge}
                  </span>
                </div>
                <div>
                  <h3 className={`text-sm font-display font-bold ${isActive ? 'text-stone-100' : 'text-stone-300'}`}>
                    {domain.title.split('&')[0]}
                  </h3>
                  <span className="text-xs text-stone-500 font-mono-code block mt-0.5">
                    {domain.specifications.length} Architectural Specs
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Domain Detail Content */}
      <div className="space-y-8">
        {/* Lead manifesto */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-mono-code uppercase text-amber-800 font-semibold tracking-wider block mb-1">
              Discipline Focus
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
              {activeDomain.title}
            </h3>
            <p className="mt-2 text-stone-700 font-serif-body text-base leading-relaxed">
              {activeDomain.leadParagraph}
            </p>
          </div>

          {/* Governing Principles */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono-code uppercase text-stone-500 tracking-wider">
              Governing Nobel Principles
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeDomain.principles.map((principle, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 p-4 rounded-lg border border-stone-200/80 space-y-2"
                >
                  <h5 className="text-sm font-display font-bold text-stone-900">
                    {principle.title}
                  </h5>
                  <p className="text-xs text-stone-600 font-serif-body leading-relaxed">
                    {principle.description}
                  </p>
                  <div className="pt-2 border-t border-stone-200/60 text-[11px] font-mono-code text-amber-900">
                    <span className="text-stone-400">Benchmark: </span>
                    {principle.nobelExample}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deep Technical Specifications Table */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-display font-bold text-stone-900">
                Detailed Implementation Specifications
              </h4>
              <p className="text-xs text-stone-600 font-serif-body">
                Side-by-side analysis of current limitations versus the Nobel-cadre code and design standard
              </p>
            </div>
            <span className="text-xs font-mono-code text-stone-500">
              Production Ready
            </span>
          </div>

          <div className="space-y-6">
            {activeDomain.specifications.map((spec, idx) => (
              <div
                key={idx}
                className="border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:border-amber-300 transition-colors"
              >
                <div className="bg-stone-100/70 px-5 py-3 border-b border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-stone-100 font-mono-code text-[11px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <h5 className="font-display font-bold text-sm text-stone-900">
                      {spec.area}
                    </h5>
                  </div>
                  <span className="text-xs font-mono-code text-stone-500">
                    Specification #{idx + 1}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-serif-body">
                    <div className="bg-rose-50/40 p-3.5 rounded-lg border border-rose-200/60">
                      <span className="text-[11px] font-mono-code text-rose-800 uppercase font-semibold block mb-1">
                        Current Limitation in foreverlotus.com
                      </span>
                      <p className="text-stone-700 leading-relaxed">
                        {spec.currentLimitation}
                      </p>
                    </div>

                    <div className="bg-emerald-50/40 p-3.5 rounded-lg border border-emerald-200/60">
                      <span className="text-[11px] font-mono-code text-emerald-800 uppercase font-semibold block mb-1">
                        Required Nobel-Cadre Standard
                      </span>
                      <p className="text-stone-800 leading-relaxed font-medium">
                        {spec.nobelCadreStandard}
                      </p>
                    </div>
                  </div>

                  {/* Code / Design Spec Block */}
                  <div className="bg-stone-900 text-stone-200 rounded-lg p-3.5 border border-stone-800 relative group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono-code uppercase tracking-wider text-amber-400">
                        Code &amp; Architectural Snippet
                      </span>
                      <button
                        onClick={() => handleCopy(spec.codeOrDesignSpec, idx)}
                        className="text-xs text-stone-400 hover:text-stone-100 font-mono-code flex items-center gap-1 bg-stone-800 hover:bg-stone-700 px-2 py-0.5 rounded transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copy Spec</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="font-mono-code text-xs text-stone-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {spec.codeOrDesignSpec}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
