import React from 'react';
import { 
  Award, 
  Target, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  BookOpen,
  Eye,
  Activity,
  Globe
} from 'lucide-react';
import { CATEGORY_EVALUATIONS, COMPOSITE_SCORES } from '../data/evaluationData';
import { CategoryId } from '../types';

interface ScorecardOverviewProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onNavigateTab: (tab: string) => void;
}

export const ScorecardOverview: React.FC<ScorecardOverviewProps> = ({
  selectedCategory,
  onSelectCategory,
  onNavigateTab,
}) => {
  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'purpose': return Target;
      case 'functionality': return BookOpen;
      case 'aesthetic': return Eye;
      case 'engagement': return Activity;
      case 'accessibility': return Globe;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (score >= 6.0) return 'text-amber-800 bg-amber-50 border-amber-300';
    return 'text-rose-800 bg-rose-50 border-rose-300';
  };

  return (
    <div className="space-y-8">
      {/* Executive Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 border border-stone-800 shadow-xl relative overflow-hidden">
        {/* Subtle background ornamentation */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 rounded-full border border-stone-800/40 opacity-20 pointer-events-none flex items-center justify-center">
          <span className="font-display text-9xl text-amber-500/20">蓮</span>
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-amber-950 text-amber-300 border border-amber-800/80 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Global Peer Review Audit
            </span>
            <span className="text-stone-400 text-xs font-mono-code">
              Standard: Nobel Peace Center / IAS Princeton / Oxford Martin
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-stone-50 leading-tight">
              Evaluation &amp; Transformation of Forever Lotus
            </h2>
            <p className="mt-2 text-stone-300 font-serif-body text-base sm:text-lg leading-relaxed max-w-3xl">
              A comprehensive institutional audit assessing the digital manifestation of Subasri Dorairaj &amp; Ravikumar Raman's 
              civilizational moral architecture. Evaluated on a 1-to-10 scale across completion of purpose, functionality, aesthetic 
              nobility, user engagement, and universal accessibility.
            </p>
          </div>

          {/* Composite Score Meter */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-800">
            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800">
              <span className="text-xs font-mono-code text-stone-400 uppercase tracking-wider block">
                Current Composite Index
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-display font-bold text-amber-400">
                  {COMPOSITE_SCORES.currentOverall}
                </span>
                <span className="text-stone-500 font-mono-code text-sm">/ 10.0</span>
              </div>
              <span className="text-[11px] text-amber-300/80 block mt-1">
                Honorable Foundation · Static Manifesto
              </span>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800">
              <span className="text-xs font-mono-code text-stone-400 uppercase tracking-wider block">
                Nobel-Cadre Target
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-display font-bold text-emerald-400">
                  {COMPOSITE_SCORES.targetOverall}
                </span>
                <span className="text-stone-500 font-mono-code text-sm">/ 10.0</span>
              </div>
              <span className="text-[11px] text-emerald-300/80 block mt-1">
                Living Global Observatory Standard
              </span>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono-code text-stone-400 uppercase tracking-wider block">
                  Transformation Velocity
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-display font-bold text-stone-100">
                    +4.10 pts
                  </span>
                  <span className="text-stone-400 text-xs">Required Delta</span>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('roadmap')}
                className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 group"
              >
                Inspect 16-Week Roadmap <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Categories Scorecard Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-stone-900">
              The Five Dimensions of Institutional Excellence
            </h3>
            <p className="text-sm text-stone-600 font-serif-body">
              Click any category card to examine deep-dive findings, sub-metrics, and direct action items.
            </p>
          </div>
          <span className="text-xs font-mono-code text-stone-500 hidden sm:inline">
            5 Categories · 1-10 Scale
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORY_EVALUATIONS.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`cursor-pointer rounded-xl p-5 sm:p-6 transition-all border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200 hover:border-stone-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-800">
                      <Icon className="w-5 h-5 text-amber-800" />
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono-code font-semibold border ${getScoreColor(cat.score)}`}>
                        {cat.score.toFixed(1)} / 10
                      </span>
                      <span className="block text-[11px] font-mono-code text-stone-400 mt-0.5">
                        Target: {cat.targetScore.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-display font-bold text-stone-900 leading-snug">
                    {cat.title}
                  </h4>
                  <p className="text-xs text-amber-900/80 font-mono-code mt-0.5 mb-2.5 line-clamp-1">
                    {cat.subtitle}
                  </p>

                  <p className="text-xs text-stone-600 font-serif-body line-clamp-3 leading-relaxed">
                    {cat.executiveSummary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-serif-body italic">Benchmark:</span>
                    <span className="text-stone-700 font-mono-code text-[11px] truncate max-w-[170px]" title={cat.benchmarkInstitution}>
                      {cat.benchmarkInstitution.split('&')[0]}
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${(cat.score / 10) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-amber-800 font-medium">
                      {isSelected ? '✓ Currently Inspecting' : 'Inspect Sub-Metrics'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Quick Actions Card */}
          <div className="rounded-xl p-5 sm:p-6 bg-stone-900 text-stone-100 border border-stone-800 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-mono-code uppercase tracking-wider">Next Step</span>
              </div>
              <h4 className="text-base font-display font-bold text-stone-50">
                Experience the Redesigned Prototype
              </h4>
              <p className="text-xs text-stone-300 font-serif-body mt-2 leading-relaxed">
                See how Forever Lotus looks and feels when rendered to the Nobel Prize standard—complete with sacred geometry crest,
                dual-canon citations, and interactive Dignity Observatory.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('prototype')}
              className="mt-4 w-full py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs font-sans-ui transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Launch Nobel Prototype</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Nobel Cadre Gap Matrix Summary */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-lg font-display font-bold text-stone-900">
              Nobel-Cadre Institutional Gap Matrix
            </h3>
            <p className="text-xs text-stone-600 font-serif-body">
              How foreverlotus.com compares to world-class academic and peace institutions
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 text-xs font-mono-code">
            Peer Review Benchmark
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-mono-code">
                <th className="py-2.5 pr-4">Dimension</th>
                <th className="py-2.5 px-3">Current Score</th>
                <th className="py-2.5 px-3">Target Score</th>
                <th className="py-2.5 px-3">Primary Institutional Gap</th>
                <th className="py-2.5 pl-3">Transformation Pillar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans-ui">
              <tr className="hover:bg-stone-50">
                <td className="py-3 pr-4 font-semibold text-stone-900">1. Completion of Purpose</td>
                <td className="py-3 px-3 font-mono-code font-bold text-amber-700">6.2 / 10</td>
                <td className="py-3 px-3 font-mono-code font-bold text-emerald-700">9.8 / 10</td>
                <td className="py-3 px-3 text-stone-600 font-serif-body">Vows are stated rhetorically; missing live verification &amp; dignity dataset.</td>
                <td className="py-3 pl-3 text-amber-800 font-mono-code text-[11px]">Living Dignity Observatory</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-3 pr-4 font-semibold text-stone-900">2. Functionality &amp; Architecture</td>
                <td className="py-3 px-3 font-mono-code font-bold text-amber-700">5.4 / 10</td>
                <td className="py-3 px-3 font-mono-code font-bold text-emerald-700">9.6 / 10</td>
                <td className="py-3 px-3 text-stone-600 font-serif-body">Static brochure layout; no interactive search, DOI links, or BibTeX exports.</td>
                <td className="py-3 pl-3 text-amber-800 font-mono-code text-[11px]">Academic Citation Engine</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-3 pr-4 font-semibold text-stone-900">3. Aesthetic Design</td>
                <td className="py-3 px-3 font-mono-code font-bold text-amber-700">5.8 / 10</td>
                <td className="py-3 px-3 font-mono-code font-bold text-emerald-700">9.9 / 10</td>
                <td className="py-3 px-3 text-stone-600 font-serif-body">Modern tech sans-serif lacks historical gravitas and mathematical step-ratios.</td>
                <td className="py-3 pl-3 text-amber-800 font-mono-code text-[11px]">Archival Vellum &amp; Newsreader</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-3 pr-4 font-semibold text-stone-900">4. User Engagement</td>
                <td className="py-3 px-3 font-mono-code font-bold text-rose-700">5.0 / 10</td>
                <td className="py-3 px-3 font-mono-code font-bold text-emerald-700">9.5 / 10</td>
                <td className="py-3 px-3 text-stone-600 font-serif-body">Passive linear reading; missing participatory moral cases and audio treatises.</td>
                <td className="py-3 pl-3 text-amber-800 font-mono-code text-[11px]">Contemplative Multi-Modal UX</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="py-3 pr-4 font-semibold text-stone-900">5. Accessibility &amp; Equity</td>
                <td className="py-3 px-3 font-mono-code font-bold text-amber-700">5.9 / 10</td>
                <td className="py-3 px-3 font-mono-code font-bold text-emerald-700">10.0 / 10</td>
                <td className="py-3 px-3 text-stone-600 font-serif-body">English-only interface contradicts vow of multilingual open learning; no low-data mode.</td>
                <td className="py-3 pl-3 text-amber-800 font-mono-code text-[11px]">Polyglot WCAG 2.2 AAA + &lt;50KB Mode</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Benchmark Methodology Disclosure */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 leading-relaxed font-serif-body">
          <strong className="text-stone-900 font-sans-ui font-semibold">Institutional Benchmark Note:</strong> &ldquo;Nobel Cadre&rdquo; serves as an independent design, editorial rigor, and accessibility quality rubric established for this audit, benchmarked against the public digital standards of world-class institutions (including NobelPrize.org, the Max Planck Society, and the Carnegie Endowment). Forever Lotus is an independent philosophical and sovereign technology initiative.
        </div>
      </div>
    </div>
  );
};
