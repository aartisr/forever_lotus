import React, { useState } from 'react';
import { alignedWebsites, AlignedWebsite } from '@/content/aligned-websites';
import { insightArticles, InsightArticle } from '@/content/insights';
import { 
  Globe, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Heart, 
  Search, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  BookMarked
} from 'lucide-react';

export const EcosystemInsightsView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'ecosystem' | 'insights'>('ecosystem');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle>(insightArticles[0]);

  const filteredArticles = insightArticles.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/70 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-800 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Ecosystem &amp; Published Scholarship</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              Aligned Platforms &amp; Doctrinal Insights
            </h2>
            <p className="text-sm text-stone-600 font-serif-body mt-1 max-w-3xl">
              Forever Lotus highlights platforms embodying conscious creation and publishes foundational research on civilizational ethics, human dignity, and non-extractive systems.
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl self-start md:self-auto shrink-0 border border-stone-200">
            <button
              onClick={() => setActiveSubTab('ecosystem')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'ecosystem'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Aligned Websites ({alignedWebsites.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('insights')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'insights'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Published Insights ({insightArticles.length})</span>
            </button>
          </div>
        </div>

        {/* Section Content */}
        {activeSubTab === 'ecosystem' ? (
          <div className="pt-8 space-y-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900">
                  Featured Aligned Platforms
                </h3>
                <p className="text-xs text-stone-700 font-serif-body">
                  Organizations and platforms verified against Forever Lotus non-extractive principles.
                </p>
              </div>
              <div className="text-xs font-mono-code px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                100% Zero Data Extraction Verified
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {alignedWebsites.map((site) => (
                <div 
                  key={site.id}
                  className="rounded-2xl border border-stone-200 bg-[#FCFBF8] p-6 sm:p-7 hover:border-amber-400/80 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-2">
                          Verified Partner
                        </span>
                        <h4 className="text-xl font-display font-bold text-stone-950">
                          {site.name}
                        </h4>
                        <p className="text-xs text-amber-800 font-medium font-serif-body italic">
                          {site.tagline}
                        </p>
                      </div>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 transition-colors"
                        title="Visit external site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-xs text-stone-700 font-serif-body leading-relaxed">
                      {site.description}
                    </p>

                    <div className="bg-white rounded-xl p-3.5 border border-stone-200/80 text-xs">
                      <p className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-amber-700" />
                        <span>Mission Statement:</span>
                      </p>
                      <p className="text-stone-600 font-serif-body italic">
                        &ldquo;{site.missionStatement}&rdquo;
                      </p>
                    </div>

                    {/* Principles */}
                    <div>
                      <p className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2">
                        Demonstrated Principles:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {site.principles.map((pr, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-800 border border-stone-300 font-medium"
                          >
                            {pr}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact metrics */}
                    <div className="border-t border-stone-200 pt-3 text-xs space-y-1.5">
                      <p className="font-bold text-stone-900">{site.impact.headline}</p>
                      <ul className="space-y-1">
                        {site.impact.metrics.map((metric, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-stone-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-[11px] text-stone-700 font-mono-code font-medium">
                      {site.url.replace('https://', '')}
                    </span>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1"
                    >
                      <span>Explore Platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Onboarding callout */}
            <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-base font-display font-bold text-amber-950">
                  Align Your Website with Forever Lotus
                </h4>
                <p className="text-xs text-amber-900/80 font-serif-body max-w-2xl">
                  Do you maintain a service built on human dignity, non-extractive algorithms, and zero intrusive surveillance? Apply for Awaricon certification and showcase alignment.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono-code text-amber-900 font-medium">
                  Free · Open Review
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Insights Knowledge Base */
          <div className="pt-8 space-y-6">
            {/* Search bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, keyword, or doctrine..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                />
              </div>
              <span className="text-xs text-stone-700 font-mono-code font-medium shrink-0">
                Showing {filteredArticles.length} of {insightArticles.length}
              </span>
            </div>

            {/* Master-Detail Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Article List Column */}
              <div className="lg:col-span-4 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                {filteredArticles.map((art) => {
                  const isSelected = selectedArticle.slug === art.slug;
                  return (
                    <button
                      key={art.slug}
                      onClick={() => setSelectedArticle(art)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-amber-900 text-amber-100 border-amber-800 shadow-sm'
                          : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded font-bold ${
                          isSelected ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-800'
                        }`}>
                          {art.keyword}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-200' : 'text-stone-500'}`} />
                      </div>
                      <h5 className="font-display font-bold text-xs mt-2 line-clamp-2 leading-snug">
                        {art.title}
                      </h5>
                      <p className={`text-[11px] font-serif-body line-clamp-2 mt-1 ${
                        isSelected ? 'text-amber-100/90' : 'text-stone-700'
                      }`}>
                        {art.intro}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Article Reading Pane */}
              <div className="lg:col-span-8 bg-[#FCFBF8] rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono-code text-amber-800 uppercase tracking-widest mb-1.5">
                    <BookMarked className="w-3.5 h-3.5 text-amber-600" />
                    <span>Canon Insight &middot; {selectedArticle.slug}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-950">
                    {selectedArticle.title}
                  </h3>
                  <div className="mt-3 bg-amber-50/80 border-l-2 border-amber-600 p-3 rounded-r-lg">
                    <p className="text-xs text-amber-950 font-serif-body italic leading-relaxed">
                      {selectedArticle.intro}
                    </p>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-5 pt-2 border-t border-stone-200">
                  {selectedArticle.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <h4 className="text-sm font-display font-bold text-stone-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>{sec.heading}</span>
                      </h4>
                      <p className="text-xs text-stone-700 font-serif-body leading-relaxed pl-3.5">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* FAQs */}
                {selectedArticle.faq && selectedArticle.faq.length > 0 && (
                  <div className="pt-4 border-t border-stone-200 space-y-3">
                    <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-700">
                      Frequently Inquired Foundations:
                    </h4>
                    <div className="space-y-2">
                      {selectedArticle.faq.map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-3 border border-stone-200 text-xs">
                          <p className="font-semibold text-stone-900 mb-1">{item.question}</p>
                          <p className="text-stone-600 font-serif-body">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
