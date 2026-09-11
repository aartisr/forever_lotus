import React, { useState } from 'react';
import SearchEngineIndexingDashboard from './SearchEngineIndexingDashboard';
import { growthPageContent } from '@/content/growth';
import { 
  TrendingUp, 
  Search, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  Cpu,
  Target
} from 'lucide-react';

export const SearchGrowthOpsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'growth'>('indexing');

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/70 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-800 uppercase tracking-widest mb-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-600" />
              <span>Search Infrastructure &amp; Growth Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              Indexing Automation &amp; Growth Operations
            </h2>
            <p className="text-sm text-stone-600 font-serif-body mt-1 max-w-3xl">
              Real-time multi-engine search indexing pipeline (IndexNow, Google, Bing, Baidu) alongside non-manipulative organic discovery rituals.
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl self-start md:self-auto shrink-0 border border-stone-200">
            <button
              onClick={() => setActiveTab('indexing')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'indexing'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Engine Indexing</span>
            </button>
            <button
              onClick={() => setActiveTab('growth')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'growth'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Growth KPIs &amp; Rituals</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'indexing' ? (
          <div className="pt-8">
            <SearchEngineIndexingDashboard />
          </div>
        ) : (
          <div className="pt-8 space-y-8">
            {/* KPI Cards Grid */}
            <div>
              <h3 className="text-lg font-display font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-700" />
                <span>Operational KPI Targets (Compounding Discovery)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {growthPageContent.kpiCards.map((kpi, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#FCFBF8] rounded-2xl border border-stone-200 p-5 space-y-2 hover:border-amber-400 transition-colors shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-700 font-semibold">{kpi.metric}</span>
                      <span className="text-xs font-mono-code font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                        {kpi.target}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 font-serif-body leading-relaxed pt-1 border-t border-stone-200">
                      {kpi.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Operating Rituals */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-display font-bold text-stone-900">
                    Weekly Execution Cadence
                  </h4>
                  <p className="text-xs text-stone-700 font-serif-body">
                    Disciplined non-extractive distribution rhythms to build compounding trust authority.
                  </p>
                </div>
                <Calendar className="w-5 h-5 text-amber-700" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                {growthPageContent.rituals.map((ritual, idx) => {
                  const [day, ...rest] = ritual.split(':');
                  return (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-stone-200/80 space-y-1.5">
                      <span className="text-xs font-mono-code font-bold text-amber-800 uppercase block">
                        {day}
                      </span>
                      <p className="text-xs text-stone-700 font-serif-body leading-snug">
                        {rest.join(':').trim()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
