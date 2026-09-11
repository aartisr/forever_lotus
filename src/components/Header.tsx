import React from 'react';
import { 
  Award, 
  FileText, 
  Layers, 
  Compass, 
  Sparkles, 
  Printer, 
  ExternalLink, 
  Contrast, 
  Sun,
  Shield,
  Search,
  BookOpen,
  Activity,
  Globe,
  Cpu
} from 'lucide-react';
import { COMPOSITE_SCORES } from '../data/evaluationData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean | ((prev: boolean) => boolean)) => void;
  onOpenExport: () => void;
  currentLocale?: string;
  onSelectLocale?: (locale: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  highContrast,
  setHighContrast,
  onOpenExport,
  currentLocale = 'en',
  onSelectLocale,
}) => {
  const tabs = [
    { id: 'institute', label: 'Living Foundations', icon: Sparkles, badge: 'Manifesto' },
    { id: 'awaricon', label: 'Awaricon Suite', icon: Shield, badge: 'Calculator & Studio' },
    { id: 'evaluator', label: 'Website Evaluator', icon: Search, badge: 'Live Scanner' },
    { id: 'research', label: 'Dual Canon', icon: BookOpen, badge: 'Ancient & Modern' },
    { id: 'observatory', label: 'Dignity Observatory', icon: Activity, badge: 'Open Data' },
    { id: 'ecosystem', label: 'Ecosystem & Insights', icon: Globe, badge: '10 Articles' },
    { id: 'growth', label: 'Growth & Indexing', icon: Cpu, badge: 'Multi-Engine' },
    { id: 'evaluation', label: 'Nobel Audit (1-10)', icon: Award, badge: `${COMPOSITE_SCORES.currentOverall}/10` },
    { id: 'roadmap', label: '16-Week Roadmap', icon: Compass, badge: '4 Phases' },
    { id: 'whitepaper', label: 'Executive Whitepaper', icon: FileText, badge: 'Full Report' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950 text-stone-100 border-b border-stone-800/90 shadow-lg no-print">
      {/* Top utility bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80 text-xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/90 border border-amber-800/70 text-amber-300 font-mono-code font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            NOBEL-CADRE CANON
          </span>
          <span className="text-stone-400">Target:</span>
          <a 
            href="https://www.foreverlotus.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-200 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1 transition-colors font-mono-code"
          >
            foreverlotus.com <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
          <span className="text-stone-500 hidden sm:inline">|</span>
          <span className="text-stone-400 hidden sm:inline">
            Subasri Dorairaj &amp; Ravikumar Raman
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Global Language Bridge */}
          <div className="flex items-center gap-1 bg-stone-900 border border-stone-800 rounded-md px-1.5 py-0.5">
            <Globe className="w-3 h-3 text-amber-400 shrink-0" />
            <select
              value={currentLocale}
              onChange={(e) => onSelectLocale && onSelectLocale(e.target.value)}
              className="bg-transparent text-[11px] text-stone-300 focus:outline-none cursor-pointer py-0.5"
              aria-label="Select language"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-stone-900 text-stone-200">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setHighContrast(prev => !prev)}
            id="contrast-toggle-btn"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors text-xs"
            title="Toggle E-Paper High Contrast Reading Mode"
          >
            {highContrast ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Archival Vellum</span>
              </>
            ) : (
              <>
                <Contrast className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">High Contrast</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenExport}
            id="export-whitepaper-top-btn"
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-800 hover:bg-amber-700 text-amber-50 font-medium transition-colors text-xs shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / Export Dossier</span>
            <span className="sm:hidden">Dossier</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-amber-600/60 bg-stone-900 flex items-center justify-center text-amber-400 shadow-inner">
            <span className="font-display font-bold text-base">蓮</span>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-display tracking-wide font-bold text-stone-50">
              FOREVER LOTUS <span className="text-amber-400/90 font-normal">| NOBEL-CADRE TRANSFORMATION</span>
            </h1>
            <p className="text-[11px] text-stone-400 font-serif-body italic">
              Civilizational Architecture, Awaricon Trust Suite &amp; Strategic Transformation Roadmap
            </p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-950 text-amber-200 border border-amber-700/80 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono-code ${
                    isActive ? 'bg-amber-900/80 text-amber-200' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
