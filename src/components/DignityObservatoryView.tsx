import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Globe2, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { DIGNITY_OBSERVATORY_METRICS } from '@/data/prototypeData';

interface InitiativeMetric {
  id: string;
  name: string;
  location: string;
  category: 'Suffering Alleviation' | 'Grassroots Agency' | 'Open Education' | 'Digital Sovereignty';
  beneficiaries: string;
  dignityScore: number;
  status: 'Audited & Verified' | 'Continuous Monitoring';
  partnerEntity: string;
  verifiedMonth: string;
}

const SAMPLE_INITIATIVES: InitiativeMetric[] = [
  {
    id: 'init-01',
    name: 'Wellness Rural Guru Network',
    location: 'Tamil Nadu & Karnataka, India',
    category: 'Suffering Alleviation',
    beneficiaries: '14,200 rural families',
    dignityScore: 96.8,
    status: 'Audited & Verified',
    partnerEntity: 'Village Panchayat Cooperative',
    verifiedMonth: 'Q3 2026'
  },
  {
    id: 'init-02',
    name: 'Sangam Non-Harm Curriculum Initiative',
    location: 'Madurai & Colombo',
    category: 'Open Education',
    beneficiaries: '28,400 students',
    dignityScore: 94.5,
    status: 'Audited & Verified',
    partnerEntity: 'Open Tamil Literary Council',
    verifiedMonth: 'Q3 2026'
  },
  {
    id: 'init-03',
    name: 'Latin America Sovereign Health Knowledge Base',
    location: 'Oaxaca, Mexico & Cuzco, Peru',
    category: 'Grassroots Agency',
    beneficiaries: '9,850 community stewards',
    dignityScore: 92.4,
    status: 'Audited & Verified',
    partnerEntity: 'Indigenous Health Sovereignty Cadre',
    verifiedMonth: 'Q2 2026'
  },
  {
    id: 'init-04',
    name: 'Global Prosocial Cognitive Commons',
    location: 'Global (38 nations)',
    category: 'Digital Sovereignty',
    beneficiaries: '42,000+ researchers',
    dignityScore: 98.1,
    status: 'Continuous Monitoring',
    partnerEntity: 'Consortium of Independent Scholars',
    verifiedMonth: 'Q3 2026'
  },
  {
    id: 'init-05',
    name: 'Mindful Elder Care Telemetry Collective',
    location: 'Kyoto, Japan',
    category: 'Suffering Alleviation',
    beneficiaries: '3,100 elders & caregivers',
    dignityScore: 95.7,
    status: 'Audited & Verified',
    partnerEntity: 'Kansai Dignity Care Association',
    verifiedMonth: 'Q3 2026'
  },
];

export default function DignityObservatoryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [activeQuarter, setActiveQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q3');

  const filteredInitiatives = selectedCategory === 'all' 
    ? SAMPLE_INITIATIVES 
    : SAMPLE_INITIATIVES.filter(i => i.category === selectedCategory);

  const handleExportData = (format: 'csv' | 'json') => {
    const dataStr = format === 'csv'
      ? `id,name,location,category,beneficiaries,dignityScore,status,verifiedMonth\n` +
        SAMPLE_INITIATIVES.map(i => `${i.id},"${i.name}","${i.location}","${i.category}","${i.beneficiaries}",${i.dignityScore},"${i.status}","${i.verifiedMonth}"`).join('\n')
      : JSON.stringify({
          observatoryVersion: '2.4-NobelCadre',
          auditQuarter: '2026-Q3',
          aggregateIndicators: DIGNITY_OBSERVATORY_METRICS,
          verifiedInitiatives: SAMPLE_INITIATIVES,
          license: 'CC0 1.0 Universal Public Domain Dedication'
        }, null, 2);

    const blob = new Blob([dataStr], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Forever_Lotus_Dignity_Observatory_${activeQuarter}_2026.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-12">
      {/* Cadre Header & Methodology Anchor */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-lotus-gold/25 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BarChart3 className="w-48 h-48 text-lotus-gold" />
        </div>

        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Fulfilling Operating Commitment #1: Metrics of Dignity over Vanity Metrics</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-lotus-cream tracking-tight">
            The Living Global Dignity Observatory
          </h2>

          <p className="text-sm sm:text-base text-lotus-muted leading-relaxed font-sans-ui">
            Commercial internet platforms monitor click-through rates, ad impressions, and dwell-time extraction. 
            Forever Lotus replaces all extractive analytics with an open public telemetry ledger measuring 
            tangible suffering alleviation, local autonomous agency, and zero-compromise non-extraction.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono-code text-lotus-muted">
            <span className="flex items-center gap-1.5 text-lotus-gold">
              <ShieldCheck className="w-4 h-4" /> Audited under CC0 Open Data Commons
            </span>
            <span>•</span>
            <span>Independent Academic Ethics Review</span>
            <span>•</span>
            <span className="text-emerald-400">Quarterly Refresh: 2026-Q3</span>
          </div>
        </div>
      </div>

      {/* Core Composite Metrics (4 Primary Pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {DIGNITY_OBSERVATORY_METRICS.map((metric, idx) => (
          <div 
            key={idx} 
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-lotus-gold/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-lotus-muted">INDEX 0{idx + 1}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold border border-emerald-500/30">
                  {metric.delta}
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-lotus-cream tracking-tight">
                  {metric.value}
                </div>
                <h3 className="text-sm font-semibold text-lotus-gold mt-1">
                  {metric.label}
                </h3>
              </div>

              <p className="text-xs text-lotus-muted leading-relaxed">
                {metric.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-code text-lotus-muted-2">
              <span>Auditor:</span>
              <span className="text-lotus-cream font-medium">{metric.verifiedBy}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Historical Trend Telemetry: 2024–2026 Progression */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <span className="text-xs font-mono-code text-lotus-gold uppercase tracking-wider">
              Telemetry Trendline
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-lotus-cream mt-1">
              Multi-Year Suffering Alleviation &amp; Agency Trajectory
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuarter(q)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition ${
                  activeQuarter === q
                    ? 'bg-lotus-gold text-black font-bold'
                    : 'bg-white/[0.04] text-lotus-muted hover:text-lotus-cream border border-white/[0.06]'
                }`}
              >
                2026 {q}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Progression Graphic */}
        <div className="space-y-4 pt-2">
          {[
            { metric: 'Suffering Alleviation Efficacy', 2024: 76, 2025: 86, 2026: 94 },
            { metric: 'Local Indigenous Governance Ratio', 2024: 64, 2025: 78, 2026: 89 },
            { metric: 'Zero-Extraction Compliance', 2024: 100, 2025: 100, 2026: 100 },
            { metric: 'Open-Access Syllabus Utilization (Countries)', 2024: 14, 2025: 26, 2026: 38 },
          ].map((row, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono-code">
                <span className="text-lotus-cream font-medium">{row.metric}</span>
                <span className="text-lotus-gold">{row[2026]}% (2026 Target: 95%+)</span>
              </div>
              <div className="w-full bg-white/[0.05] rounded-full h-3 flex overflow-hidden p-0.5 border border-white/[0.08]">
                <div 
                  className="bg-gradient-to-r from-lotus-gold/60 to-lotus-gold h-full rounded-full transition-all duration-700" 
                  style={{ width: `${row[2026]}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono-code text-lotus-muted-2">
                <span>Baseline 2024: {row[2024]}%</span>
                <span>2025: {row[2025]}%</span>
                <span className="text-emerald-400">Current 2026: {row[2026]}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Grassroots Initiatives Registry */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-lotus-cream">
              Active Sovereign Initiatives Ledger
            </h3>
            <p className="text-xs sm:text-sm text-lotus-muted mt-1">
              Field-audited partner programs demonstrating non-extractive moral architecture in practice.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-lotus-gold mr-1 shrink-0" />
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'Suffering Alleviation', label: 'Suffering Alleviation' },
              { id: 'Grassroots Agency', label: 'Local Agency' },
              { id: 'Open Education', label: 'Open Education' },
              { id: 'Digital Sovereignty', label: 'Digital Sovereignty' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedCategory(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-code whitespace-nowrap transition ${
                  selectedCategory === f.id
                    ? 'bg-lotus-gold text-black font-semibold'
                    : 'bg-white/[0.03] text-lotus-muted hover:text-lotus-cream border border-white/[0.06]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Initiatives Table / Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInitiatives.map((init) => (
            <div 
              key={init.id}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/30 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono-code">
                  <span className="px-2 py-0.5 rounded bg-white/[0.05] text-lotus-gold border border-white/[0.08]">
                    {init.category}
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {init.verifiedMonth}
                  </span>
                </div>

                <h4 className="text-lg font-serif font-bold text-lotus-cream">
                  {init.name}
                </h4>

                <p className="text-xs text-lotus-muted flex items-center gap-1.5 font-sans-ui">
                  <Globe2 className="w-3.5 h-3.5 text-lotus-gold shrink-0" />
                  <span>{init.location}</span>
                </p>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                  <div className="text-[11px] font-mono-code text-lotus-muted-2">Verified Reach:</div>
                  <div className="text-xs font-semibold text-lotus-cream">{init.beneficiaries}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-code">
                <span className="text-lotus-muted">Dignity Score:</span>
                <span className="text-lotus-gold font-bold text-sm">{init.dignityScore} / 100</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raw Open Data Download & Verification Chamber */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-lotus-gold/10 via-white/[0.03] to-lotus-gold/10 border border-lotus-gold/30 text-center space-y-5">
        <div className="max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-lotus-cream">
            Export Open Public Data Ledger
          </h3>
          <p className="text-xs sm:text-sm text-lotus-muted font-sans-ui">
            In adherence to the Nobel standard of unconditional transparency, all aggregate telemetry, 
            methodology calculations, and audit logs are available for open academic analysis.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleExportData('csv')}
            className="px-5 py-3 rounded-full bg-lotus-gold text-black font-semibold text-xs flex items-center gap-2 hover:bg-[#ffd66b] transition shadow-lg shadow-lotus-gold/20"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV (Tabular Ledger)</span>
          </button>

          <button
            onClick={() => handleExportData('json')}
            className="px-5 py-3 rounded-full bg-white/[0.06] text-lotus-cream font-semibold text-xs border border-white/[0.12] flex items-center gap-2 hover:bg-white/[0.1] transition"
          >
            <FileText className="w-4 h-4 text-lotus-gold" />
            <span>Download JSON (Machine-Readable API Payload)</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono-code border border-emerald-500/40 animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Telemetry Ledger successfully generated and downloaded.</span>
          </div>
        )}

        <p className="text-[11px] font-mono-code text-lotus-muted-2 max-w-lg mx-auto">
          DOI: 10.5281/zenodo.foreverlotus.dignity · Released under CC0 1.0 Universal Public Domain Dedication.
        </p>
      </div>
    </div>
  );
}
