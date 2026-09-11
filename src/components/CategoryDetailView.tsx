import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Layers, 
  FileCheck,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { CATEGORY_EVALUATIONS } from '../data/evaluationData';
import { CategoryId } from '../types';

interface CategoryDetailViewProps {
  selectedCategoryId: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onNavigateTab: (tab: string) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  selectedCategoryId,
  onSelectCategory,
  onNavigateTab,
}) => {
  const currentCategory = CATEGORY_EVALUATIONS.find(c => c.id === selectedCategoryId) || CATEGORY_EVALUATIONS[0];

  return (
    <div className="space-y-8">
      {/* Category selector pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
        {CATEGORY_EVALUATIONS.map((cat) => {
          const isActive = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${
                isActive
                  ? 'bg-amber-900 text-amber-50 border-amber-800 shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
              }`}
            >
              <span>{cat.title}</span>
              <span className={`px-1.5 py-0.2 rounded font-mono-code text-[11px] ${
                isActive ? 'bg-amber-950 text-amber-300' : 'bg-stone-100 text-stone-600'
              }`}>
                {cat.score.toFixed(1)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Detail Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 text-xs font-mono-code uppercase font-semibold">
                Category Audit
              </span>
              <span className="text-stone-400 text-xs">•</span>
              <span className="text-stone-600 text-xs font-serif-body italic">
                Evaluated against global civilizational standards
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              {currentCategory.title}
            </h2>
            <p className="text-sm font-mono-code text-amber-900">
              {currentCategory.subtitle}
            </p>
          </div>

          {/* Score Display Card */}
          <div className="bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-200 flex items-center gap-6 min-w-[280px]">
            <div className="text-center">
              <span className="text-[11px] font-mono-code text-stone-500 uppercase block">Current Score</span>
              <div className="text-3xl sm:text-4xl font-display font-bold text-amber-800">
                {currentCategory.score.toFixed(1)}
              </div>
              <span className="text-[10px] font-mono-code text-stone-400">Scale: 1 - 10</span>
            </div>

            <div className="h-12 w-px bg-stone-200" />

            <div className="text-center">
              <span className="text-[11px] font-mono-code text-stone-500 uppercase block">Nobel Target</span>
              <div className="text-3xl sm:text-4xl font-display font-bold text-emerald-700">
                {currentCategory.targetScore.toFixed(1)}
              </div>
              <span className="text-[10px] font-mono-code text-emerald-600 font-semibold">
                +{(currentCategory.targetScore - currentCategory.score).toFixed(1)} pts
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary Quote */}
        <div className="bg-amber-50/60 border-l-4 border-amber-700 p-4 sm:p-5 rounded-r-lg">
          <span className="text-xs font-mono-code text-amber-900 uppercase font-semibold block mb-1">
            Executive Diagnostic
          </span>
          <p className="text-stone-800 font-serif-body text-base sm:text-lg leading-relaxed italic">
            "{currentCategory.executiveSummary}"
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono-code text-amber-800">
            <Building2 className="w-3.5 h-3.5" />
            <span>Benchmark: {currentCategory.benchmarkInstitution}</span>
          </div>
        </div>

        {/* Current State vs Nobel Gaps 2-column comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Current State Reality */}
          <div className="bg-stone-50/70 p-5 rounded-lg border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <FileCheck className="w-4 h-4 text-stone-700" />
              <span>Current State Reality</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 font-serif-body">
              {currentCategory.currentStateAnalysis.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-stone-400 mt-1">•</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nobel Cadre Gaps */}
          <div className="bg-amber-50/40 p-5 rounded-lg border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              <span>The Nobel-Cadre Gap</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-serif-body">
              {currentCategory.nobelCadreGaps.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-1" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enduring Strengths & Vulnerabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Enduring Strengths */}
          <div className="border border-emerald-200 bg-emerald-50/40 p-5 rounded-lg space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs font-mono-code uppercase">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Enduring Strengths (Preserve &amp; Elevate)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-serif-body">
              {currentCategory.enduringStrengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Vulnerabilities */}
          <div className="border border-rose-200 bg-rose-50/40 p-5 rounded-lg space-y-2.5">
            <div className="flex items-center gap-2 text-rose-900 font-semibold text-xs font-mono-code uppercase">
              <ShieldAlert className="w-4 h-4 text-rose-700" />
              <span>Critical Vulnerabilities (Address Immediately)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-950 font-serif-body">
              {currentCategory.criticalVulnerabilities.map((vuln, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-1" />
                  <span className="leading-relaxed">{vuln}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Metrics Detailed Scorecard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-display font-bold text-stone-900">
              Sub-Metric Breakdown for {currentCategory.title}
            </h3>
            <p className="text-xs text-stone-600 font-serif-body">
              Granular grading, current observations, and the required Nobel-cadre standard
            </p>
          </div>
          <span className="text-xs font-mono-code text-stone-500">
            {currentCategory.subMetrics.length} Sub-Metrics
          </span>
        </div>

        <div className="space-y-4">
          {currentCategory.subMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <h4 className="text-base font-display font-bold text-stone-900">
                    {metric.name}
                  </h4>
                  <span className="text-xs text-stone-500 font-mono-code">
                    Global Benchmark: {metric.nobelCadreBenchmark}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono-code text-stone-400 block">Current</span>
                    <span className="text-lg font-mono-code font-bold text-amber-800">
                      {metric.currentScore.toFixed(1)} / 10
                    </span>
                  </div>
                  <div className="w-12 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-600 h-full rounded-full"
                      style={{ width: `${(metric.currentScore / 10) * 100}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono-code text-stone-400 block">Target</span>
                    <span className="text-lg font-mono-code font-bold text-emerald-700">
                      {metric.targetScore.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-serif-body">
                <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                  <span className="font-mono-code text-[11px] text-stone-500 uppercase font-semibold block mb-1">
                    Current Observation
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    {metric.currentObservations}
                  </p>
                </div>

                <div className="bg-amber-50/50 p-3.5 rounded-lg border border-amber-200">
                  <span className="font-mono-code text-[11px] text-amber-900 uppercase font-semibold block mb-1">
                    Action Required for Nobel Cadre
                  </span>
                  <p className="text-amber-950 leading-relaxed font-medium">
                    {metric.actionRequired}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immediate Direct Action Items */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 border border-stone-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
          <div>
            <span className="text-xs font-mono-code text-amber-400 uppercase tracking-wider">
              Execution Directives
            </span>
            <h3 className="text-lg font-display font-bold text-stone-50">
              Immediate Action Items for {currentCategory.title}
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('improvements')}
            className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium font-sans-ui"
          >
            <span>View Full Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentCategory.directActionItems.map((action, idx) => (
            <div
              key={idx}
              className="bg-stone-950/80 p-4 rounded-lg border border-stone-800 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700 text-amber-300 font-mono-code text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-stone-200 font-serif-body leading-relaxed">
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
