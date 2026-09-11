import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  BookOpen, 
  Shield, 
  Globe, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  Copy, 
  Sparkles,
  Search,
  Quote,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  CORE_VOW, 
  OPERATING_COMMITMENTS, 
  CANON_SOURCES, 
  DIGNITY_OBSERVATORY_METRICS,
  MULTILINGUAL_INSCRIPTIONS 
} from '../data/prototypeData';
import { OperatingCommitment, CanonSource } from '../types';

export const NobelPrototypePreview: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<'en' | 'ta' | 'sa' | 'zh'>('en');
  const [activeCommitment, setActiveCommitment] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(35);
  const [selectedCanon, setSelectedCanon] = useState<string>('source-1');
  const [searchCanon, setSearchCanon] = useState<string>('');
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0);
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  const currentInscription = MULTILINGUAL_INSCRIPTIONS[selectedLang];
  const activeCommitmentData = OPERATING_COMMITMENTS.find(c => c.number === activeCommitment) || OPERATING_COMMITMENTS[0];
  const activeCanonData = CANON_SOURCES.find(s => s.id === selectedCanon) || CANON_SOURCES[0];

  const filteredCanonSources = CANON_SOURCES.filter(s => 
    s.title.toLowerCase().includes(searchCanon.toLowerCase()) ||
    s.traditionOrField.toLowerCase().includes(searchCanon.toLowerCase()) ||
    s.coreInsight.toLowerCase().includes(searchCanon.toLowerCase())
  );

  const handleCopyCitation = (source: CanonSource) => {
    const bibtex = `@article{foreverlotus_${source.id},\n  title={${source.title}},\n  tradition={${source.traditionOrField}},\n  year={${source.yearOrEpoch}},\n  counterpart={${source.modernEmpiricalCounterpart}},\n  url={https://foreverlotus.com/canon/${source.id}}\n}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedDoi(source.id);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Prototype Context Banner */}
      <div className="bg-amber-950 text-amber-100 p-4 sm:p-5 rounded-xl border border-amber-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-900 border border-amber-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-amber-100">
              Interactive Nobel-Cadre Experience (Live Redesign)
            </h3>
            <p className="text-xs text-amber-300/80 font-serif-body">
              Demonstrating the proposed typography, dual-canon research apparatus, and living Dignity Observatory.
            </p>
          </div>
        </div>

        {/* Prototype Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Multilingual Selector */}
          <div className="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-800 text-xs font-mono-code">
            {(['en', 'ta', 'sa', 'zh'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-2 py-1 rounded transition-colors ${
                  selectedLang === lang 
                    ? 'bg-amber-800 text-amber-100 font-bold' 
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title={MULTILINGUAL_INSCRIPTIONS[lang].lang}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Font scale adjustment */}
          <div className="flex items-center bg-stone-900 rounded-lg border border-stone-800 text-xs font-mono-code">
            <button
              onClick={() => setFontSizeOffset(prev => Math.max(-2, prev - 1))}
              className="px-2 py-1 text-stone-400 hover:text-stone-200"
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-[10px] text-stone-500 px-1">Aa</span>
            <button
              onClick={() => setFontSizeOffset(prev => Math.min(4, prev + 1))}
              className="px-2 py-1 text-stone-400 hover:text-stone-200"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* NOBEL-CADRE WEBSITE CONTAINER (Archival Vellum styling) */}
      <div 
        className="bg-[#FAF8F5] text-[#1A1918] rounded-2xl border border-[#E8E2D5] shadow-2xl overflow-hidden transition-all"
        style={{ fontSize: `${16 + fontSizeOffset}px` }}
      >
        {/* Institutional Top Bar */}
        <div className="border-b border-[#E8E2D5] px-6 sm:px-10 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-stone-600 bg-[#F4EFE6]/60">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-900 uppercase tracking-widest">
              INSTITUTUM FOREVER LOTUS
            </span>
            <span>•</span>
            <span className="italic font-serif-body">EST. FOR CIVILIZATIONAL DIGNITY</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>OPEN ACCORD PROTOCOL: CC BY-NC-ND</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">DOI: 10.5281/ZENODO.FOREVERLOTUS</span>
          </div>
        </div>

        {/* HERO SECTION: The Sacred Crest & Core Vow */}
        <section className="px-6 sm:px-12 lg:px-20 py-16 sm:py-24 text-center space-y-8 border-b border-[#E8E2D5] relative">
          {/* Subtle Sacred Lotus Crest (Golden Ratio 8-fold radial symmetry) */}
          <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full text-amber-900/80 stroke-current fill-none stroke-[0.85]"
            >
              {/* Outer sacred circle */}
              <circle cx="50" cy="50" r="46" strokeDasharray="1.5, 2.5" />
              <circle cx="50" cy="50" r="42" />
              {/* 8-fold Golden Ratio Petals */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <path
                  key={i}
                  d="M50 14 C44 28, 44 42, 50 50 C56 42, 56 28, 50 14 Z"
                  transform={`rotate(${angle} 50 50)`}
                  className="fill-amber-900/5 hover:fill-amber-900/15 transition-colors"
                />
              ))}
              {/* Center seed of moral responsibility */}
              <circle cx="50" cy="50" r="4.5" className="fill-amber-800/80" />
            </svg>
          </div>

          {/* Classical Inscriptions */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-mono-code tracking-widest text-amber-900/90 uppercase">
              {currentInscription.script} · {currentInscription.lang}
            </div>
            <p className="text-xs sm:text-sm font-serif-body italic text-stone-600">
              {selectedLang === 'ta' && CORE_VOW.classicalInscription}
              {selectedLang === 'sa' && CORE_VOW.sanskritInscription}
              {selectedLang === 'en' && 'Thirukkural 321 & Bhagavad Gita 5.25 — The Primacy of Non-Harm'}
              {selectedLang === 'zh' && '道德經第八章 — 上善若水，利萬物而不爭'}
            </p>
          </div>

          {/* The Core Vow in Display Typography */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-body font-normal tracking-tight text-[#1A1918] leading-[1.12]">
              {currentInscription.vow}
            </h1>

            <p className="text-base sm:text-xl font-serif-body text-stone-700 max-w-2xl mx-auto leading-relaxed">
              {currentInscription.sub}
            </p>

            <div className="pt-2 text-xs font-mono-code text-stone-500 uppercase tracking-wider">
              {CORE_VOW.authorship}
            </div>
          </div>

          {/* Voice of Dignity Audio Contemplation Player */}
          <div className="max-w-xl mx-auto mt-8 p-4 rounded-xl bg-white/80 border border-[#E0D9CB] shadow-sm flex items-center gap-4">
            <button
              onClick={() => setIsPlayingAudio(prev => !prev)}
              id="audio-play-toggle"
              className="w-11 h-11 rounded-full bg-amber-900 text-white flex items-center justify-center hover:bg-amber-800 transition-colors shrink-0 shadow-sm"
              title={isPlayingAudio ? 'Pause Contemplative Treatise' : 'Play Voice of Dignity Treatise'}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <div className="flex-1 text-left space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-display font-semibold text-stone-900">
                  Voice of Dignity: Foundational Treatise
                </span>
                <span className="font-mono-code text-[11px] text-stone-500">
                  {isPlayingAudio ? '08:42 / 24:18' : '24:18 (Spoken Word)'}
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-stone-200 rounded-full h-1.5 cursor-pointer">
                <div 
                  className="bg-amber-800 h-1.5 rounded-full transition-all"
                  style={{ width: `${isPlayingAudio ? 48 : audioProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono-code text-stone-400">
                <span>Narrated in Resonant Contemplative Cadence</span>
                <span>Uncompressed Audio · FLAC / AAC</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Six Operating Commitments Explorer */}
        <section className="px-6 sm:px-12 lg:px-20 py-16 sm:py-20 border-b border-[#E8E2D5] space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 font-semibold">
              The Action Layer of Moral Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900">
              The Six Operating Commitments
            </h2>
            <p className="text-sm sm:text-base font-serif-body text-stone-600 leading-relaxed">
              Making compassion operational, not rhetorical. Six binding structural guardrails that govern every initiative,
              forbidding vanity metrics, extractive trade-offs, and self-promotion.
            </p>
          </div>

          {/* Commitments selector grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {OPERATING_COMMITMENTS.map((com) => {
              const isSelected = activeCommitment === com.number;
              return (
                <button
                  key={com.number}
                  id={`commitment-tab-${com.number}`}
                  onClick={() => setActiveCommitment(com.number)}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-amber-800 shadow-md ring-1 ring-amber-700/20'
                      : 'bg-[#F5F1E8]/70 border-[#E2DDD0] hover:bg-white text-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono-code font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-amber-900 text-amber-100' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {com.number}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-bold text-stone-900 leading-snug">
                      {com.name}
                    </h4>
                    <span className="text-[10px] font-mono-code text-stone-500 line-clamp-1 mt-0.5">
                      {com.sanskritOrClassicalMotto}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Commitment Doctrinal Monograph Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#DFD8CA] shadow-sm space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-mono-code text-amber-900 uppercase font-semibold">
                  Commitment #{activeCommitmentData.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mt-1">
                  {activeCommitmentData.name}
                </h3>
              </div>
              <span className="text-xs font-mono-code text-stone-500">
                {activeCommitmentData.sanskritOrClassicalMotto}
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-base sm:text-lg font-serif-body text-stone-800 leading-relaxed italic border-l-2 border-amber-800 pl-4">
                "{activeCommitmentData.fullDoctrinalText}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs sm:text-sm font-serif-body">
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D5]">
                <span className="text-[11px] font-mono-code text-stone-500 uppercase font-semibold block mb-1">
                  Binding Metric of Verification
                </span>
                <p className="text-stone-800 leading-relaxed font-sans-ui text-xs">
                  {activeCommitmentData.metricOfVerification}
                </p>
              </div>

              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/80">
                <span className="text-[11px] font-mono-code text-amber-900 uppercase font-semibold block mb-1">
                  Nobel-Cadre Institutional UX Implementation
                </span>
                <p className="text-stone-800 leading-relaxed font-sans-ui text-xs">
                  {activeCommitmentData.nobelCadreUXImplementation}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: The Dual-Canon Research Apparatus */}
        <section className="px-6 sm:px-12 lg:px-20 py-16 sm:py-20 border-b border-[#E8E2D5] space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 font-semibold">
                Intellectual Provenance
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 mt-1">
                The Dual-Canon Apparatus
              </h2>
              <p className="text-sm text-stone-600 font-serif-body max-w-2xl mt-1">
                4,000 years of canonical Eastern wisdom cross-validated against 25+ contemporary peer-reviewed scientific studies.
              </p>
            </div>

            {/* Live Search & Filter in Canon */}
            <div className="relative min-w-[260px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                value={searchCanon}
                onChange={(e) => setSearchCanon(e.target.value)}
                placeholder="Filter traditions or papers..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-[#DDD7C9] text-xs font-sans-ui placeholder:text-stone-400 focus:outline-none focus:border-amber-700"
              />
            </div>
          </div>

          {/* Canon Sources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredCanonSources.map((source) => {
              const isSelected = selectedCanon === source.id;
              return (
                <div
                  key={source.id}
                  onClick={() => setSelectedCanon(source.id)}
                  className={`rounded-xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-amber-800 shadow-md ring-1 ring-amber-700/20'
                      : 'bg-[#F7F4EC] border-[#E5DFD2] hover:bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono-code text-stone-500">
                      <span>{source.yearOrEpoch}</span>
                      <span className="text-amber-900 font-semibold">{source.traditionOrField.split('(')[0]}</span>
                    </div>

                    <h4 className="text-base font-display font-bold text-stone-900 leading-snug">
                      {source.title}
                    </h4>

                    <p className="text-xs text-stone-700 font-serif-body line-clamp-3 leading-relaxed">
                      {source.coreInsight}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200/60 space-y-2">
                    <div className="text-[11px] font-mono-code text-stone-600 line-clamp-2">
                      <span className="font-semibold text-stone-900">Modern Empirical: </span>
                      {source.modernEmpiricalCounterpart}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCitation(source);
                        }}
                        className="text-[11px] font-mono-code text-amber-800 hover:text-amber-950 flex items-center gap-1"
                      >
                        {copiedDoi === source.id ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">BibTeX Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] font-mono-code text-stone-400">DOI Indexed</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: The Living Dignity Observatory (Verifying Commitment #1) */}
        <section className="px-6 sm:px-12 lg:px-20 py-16 sm:py-20 border-b border-[#E8E2D5] space-y-10 bg-[#F4EFE6]/50">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-code uppercase tracking-widest text-emerald-800 font-semibold">
              Live Public Ledger · Verifying Commitment #1
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900">
              The Global Dignity Observatory
            </h2>
            <p className="text-sm sm:text-base font-serif-body text-stone-600 leading-relaxed">
              We replace vanity web analytics with verified indices of suffering reduction, local agency, and non-extractive resource flow.
              Updated quarterly under open academic audit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {DIGNITY_OBSERVATORY_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-[#DFD8CA] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-stone-400">INDICATOR 0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    {metric.delta}
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-display font-bold text-stone-900">
                    {metric.value}
                  </div>
                  <h4 className="text-xs font-display font-bold text-stone-800 mt-1">
                    {metric.label}
                  </h4>
                </div>

                <p className="text-xs text-stone-600 font-serif-body leading-relaxed">
                  {metric.description}
                </p>

                <div className="pt-2 border-t border-stone-100 text-[10px] font-mono-code text-stone-400">
                  Audit: {metric.verifiedBy}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono-code pt-4">
            <button
              onClick={() => alert('Download simulated: Forever_Lotus_Dignity_Ledger_2026.csv')}
              className="px-4 py-2 rounded-lg bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Open Data (CSV / JSON)</span>
            </button>
            <span className="text-stone-400">Audited under CC0 Open Data Commons</span>
          </div>
        </section>

        {/* Institutional Footer */}
        <footer className="px-6 sm:px-12 lg:px-20 py-12 text-center text-xs text-stone-500 font-mono-code space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
            <span className="text-stone-700 font-semibold">FOREVER LOTUS FOUNDATIONAL DOCTRINE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
          </div>
          <p className="font-serif-body italic text-stone-600 max-w-lg mx-auto">
            "To make kindness operational, not rhetorical. Grounded in 4,000 years of Eastern wisdom,
            proven by science, consecrated to universal dignity."
          </p>
          <div className="text-[11px] text-stone-400 pt-2">
            Authored by Subasri Dorairaj &amp; Co-founded by Ravikumar Raman · Dedicated to Sentient Flourishing
          </div>
        </footer>
      </div>
    </div>
  );
};
