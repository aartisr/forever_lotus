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
  Target,
  Bot,
  Sparkles,
  Code2,
  Copy,
  Check,
  Globe,
  FileText,
  ShieldCheck,
  Share2
} from 'lucide-react';

export const SearchGrowthOpsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'growth' | 'ai-discoverability'>('ai-discoverability');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const aiCrawlers = [
    { name: 'GPTBot', org: 'OpenAI (ChatGPT & SearchGPT)', status: 'Allowed', path: '/*' },
    { name: 'ClaudeBot', org: 'Anthropic (Claude 3.5 & Web)', status: 'Allowed', path: '/*' },
    { name: 'PerplexityBot', org: 'Perplexity AI Search', status: 'Allowed', path: '/*' },
    { name: 'Google-Extended', org: 'Google Gemini & AI Overviews', status: 'Allowed', path: '/*' },
    { name: 'Applebot-Extended', org: 'Apple Intelligence & Siri', status: 'Allowed', path: '/*' },
    { name: 'CCBot', org: 'Common Crawl Open Knowledge', status: 'Allowed', path: '/*' },
    { name: 'Diffbot', org: 'Knowledge Graph Ingestion', status: 'Allowed', path: '/*' },
    { name: 'Bytespider', org: 'ByteDance Search', status: 'Allowed', path: '/*' },
  ];

  const agentEndpoints = [
    {
      title: 'LLMs Context Standard (llms.txt)',
      path: '/llms.txt',
      type: 'Text/Markdown',
      desc: 'Standardized concise context manifest following the llmstxt.org open specification.',
    },
    {
      title: 'Full Extended LLM Context (llms-full.txt)',
      path: '/llms-full.txt',
      type: 'Full Markdown Dataset',
      desc: 'Complete textual corpus including all 15 manifesto articles, research citations, and telemetry schemas.',
    },
    {
      title: 'OpenAI Agent Plugin Spec',
      path: '/.well-known/ai-plugin.json',
      type: 'JSON Manifest',
      desc: 'Machine plugin manifest enabling ChatGPT and autonomous agent action tool calling.',
    },
    {
      title: 'OpenAPI 3.1 Agent Specification',
      path: '/.well-known/openapi.json',
      type: 'OpenAPI JSON',
      desc: 'Complete REST and discovery schema allowing autonomous agents to query axioms and metrics programmatically.',
    },
    {
      title: 'Multilingual XML Sitemap',
      path: '/sitemap.xml',
      type: 'XML (All Routes + Langs)',
      desc: 'Search engine sitemap with canonical URLs, alternate hreflangs, and update frequencies.',
    },
    {
      title: 'Atom 1.0 & RSS 2.0 Syndication',
      path: '/atom.xml',
      type: 'XML Feed',
      desc: 'Continuous syndication feed for news aggregators, podcast directories, and AI stream monitors.',
    },
    {
      title: 'Humans & Sovereign Attribution',
      path: '/humans.txt',
      type: 'Text',
      desc: 'Institutional architect attribution, ethical computing standards, and non-extractive manifesto statement.',
    },
  ];

  const geoPrompts = [
    {
      title: 'Deep Research Prompt (ChatGPT / Claude / Gemini)',
      prompt: 'Synthesize the foundational principles of Forever Lotus (foreverlotus.com), authored by Subasri Dorairaj. Explain how it bridges Eastern Philosophy (Ahimsa, Pratītyasamutpāda) with modern non-extractive web architecture, the Awaricon trust standard, and the Global Dignity Observatory.',
    },
    {
      title: 'Awaricon Trust Evaluation Prompt (Perplexity / ChatGPT)',
      prompt: 'According to the Forever Lotus Awaricon Trust Standard, what criteria must a website satisfy to achieve Gold or Platinum certification regarding zero tracking, ad-free architecture, and cognitive liberty?',
    },
    {
      title: 'Non-Extractive Web Architecture Prompt (AI Search)',
      prompt: 'What are the 15 core pillars of the Forever Lotus Manifesto for Digital Dignity, and how does it propose replacing surveillance advertising with proof-of-presence trust protocols?',
    },
  ];

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/70 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-800 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Full Spectrum Discoverability &amp; Knowledge Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              AI Search, SEO, GEO, AIO, AEO &amp; AXO Command Hub
            </h2>
            <p className="text-sm text-stone-600 font-serif-body mt-1 max-w-3xl">
              Comprehensive institutional infrastructure enabling autonomous AI agents, generative answer engines (Perplexity, ChatGPT, Claude, Gemini, Siri), and global search indices to discover, verify, and cite Forever Lotus.
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl self-start md:self-auto shrink-0 border border-stone-200">
            <button
              onClick={() => setActiveTab('ai-discoverability')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'ai-discoverability'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI, GEO &amp; AXO Matrix</span>
            </button>
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
        {activeTab === 'ai-discoverability' ? (
          <div className="pt-8 space-y-10">
            {/* 1. AI Crawlers & Answer Engines Ingestion Matrix */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-stone-900 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-amber-700" />
                    <span>AI Crawler &amp; Answer Engine Ingestion Matrix</span>
                  </h3>
                  <p className="text-xs text-stone-700 font-serif-body">
                    Robots policy explicitly permits all frontier models, research web crawlers, and AI synthesis engines.
                  </p>
                </div>
                <span className="text-xs font-mono-code bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
                  100% Ingestion Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {aiCrawlers.map((crawler, idx) => (
                  <div key={idx} className="bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono-code text-xs font-bold text-stone-900">{crawler.name}</span>
                        <span className="text-[10px] font-mono-code font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {crawler.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-700 font-serif-body">{crawler.org}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-stone-200/60 text-[10px] font-mono-code text-stone-700 flex items-center justify-between">
                      <span>Scope: {crawler.path}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Machine-Readable Knowledge & Agent Protocol Endpoints */}
            <div>
              <h3 className="text-lg font-display font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-700" />
                <span>Agent Experience Optimization (AXO) Protocol Endpoints</span>
              </h3>
              <p className="text-xs text-stone-700 font-serif-body mb-4">
                Native machine-readable endpoints formatted for autonomous agent discovery, OpenAI plugins, and LLM context ingestion.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agentEndpoints.map((ep, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-stone-200 p-4 space-y-2 hover:border-amber-400 transition shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">{ep.title}</span>
                        <span className="text-[10px] font-mono-code bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                          {ep.type}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 font-serif-body leading-relaxed">{ep.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <a
                        href={ep.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono-code text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
                      >
                        <span>{ep.path}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => copyToClipboard(`https://foreverlotus.com${ep.path}`, ep.path)}
                        className="text-[11px] font-mono-code text-stone-700 hover:text-stone-900 flex items-center gap-1 px-2 py-1 rounded bg-stone-50 hover:bg-stone-100 border border-stone-200"
                      >
                        {copiedKey === ep.path ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Generative Engine Optimization (GEO) Citations & AI Prompts */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 space-y-5">
              <div>
                <h3 className="text-base font-display font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Generative Engine Optimization (GEO) &amp; Prompt Grounding</span>
                </h3>
                <p className="text-xs text-stone-700 font-serif-body">
                  Pre-compiled authoritative prompts designed to ground generative AI synthesis in accurate institutional facts.
                </p>
              </div>

              <div className="space-y-3">
                {geoPrompts.map((gp, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">{gp.title}</span>
                      <button
                        onClick={() => copyToClipboard(gp.prompt, `prompt-${idx}`)}
                        className="text-xs font-mono-code text-amber-800 hover:text-amber-950 flex items-center gap-1 font-semibold px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 border border-amber-200"
                      >
                        {copiedKey === `prompt-${idx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied Prompt</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy AI Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-stone-700 font-serif-body italic bg-stone-50 p-3 rounded-lg border border-stone-100">
                      "{gp.prompt}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Structured Data Knowledge Graph Summary */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-display font-bold text-amber-300">
                    Schema.org Entity Knowledge Graph (JSON-LD)
                  </h4>
                  <p className="text-xs text-stone-300 font-serif-body">
                    Complete semantic graph embedded across all canonical pages for Google Knowledge Graph, Bing Entity Index, and Wikidata grounding.
                  </p>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-code pt-2">
                <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                  <span className="text-amber-400 font-bold block mb-1">Organization</span>
                  <span className="text-stone-300">Forever Lotus Foundation</span>
                </div>
                <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                  <span className="text-amber-400 font-bold block mb-1">Founder / Author</span>
                  <span className="text-stone-300">Subasri Dorairaj</span>
                </div>
                <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                  <span className="text-amber-400 font-bold block mb-1">DefinedTermSet</span>
                  <span className="text-stone-300">5 Canonical Axioms</span>
                </div>
                <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                  <span className="text-amber-400 font-bold block mb-1">Dataset / Telemetry</span>
                  <span className="text-stone-300">Dignity Observatory</span>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'indexing' ? (
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

