import React, { useState } from 'react';
import AwariconInteractiveSuite from './AwariconInteractiveSuite';
import AwariconCalculusExplainer from './AwariconCalculusExplainer';
import AwariconApplicationForm from './AwariconApplicationForm';
import AwariconAdminConsole from './AwariconAdminConsole';
import { awariconTiers, awariconPrinciples, awariconFormula } from '@/content/awaricon';
import { 
  Calculator, 
  Layers, 
  FileText, 
  Shield, 
  Award, 
  Sparkles,
  CheckCircle2,
  Code2,
  Palette
} from 'lucide-react';

export const AwariconCompleteSuiteView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'suite' | 'calculus' | 'apply' | 'admin'>('suite');

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/70 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-800 uppercase tracking-widest mb-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Awaricon Ethical Trust Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              Awaricon Certification &amp; Presence Protocol
            </h2>
            <p className="text-sm text-stone-600 font-serif-body mt-1 max-w-3xl">
              The verifiable standard for intentional presence, non-extractive systems, and cognitive coherence in an age of automated synthetic media.
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl self-start md:self-auto shrink-0 border border-stone-200 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveSection('suite')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeSection === 'suite'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Suite &amp; Studio</span>
            </button>
            <button
              onClick={() => setActiveSection('calculus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeSection === 'calculus'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Calculus &amp; Formula</span>
            </button>
            <button
              onClick={() => setActiveSection('apply')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeSection === 'apply'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>5-Step Application Form</span>
            </button>
            <button
              onClick={() => setActiveSection('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeSection === 'admin'
                  ? 'bg-amber-900 text-amber-100 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Registry &amp; Admin</span>
            </button>
          </div>
        </div>

        {/* Core Principles Pill Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {awariconPrinciples.map((pr, idx) => (
            <div key={idx} className="bg-[#FAF8F5] rounded-xl p-4 border border-stone-200/80">
              <span className="text-[10px] font-mono-code text-amber-800 font-bold uppercase tracking-wider block mb-1">
                Pillar 0{idx + 1}
              </span>
              <h4 className="text-xs font-display font-bold text-stone-900 mb-1">
                {pr.title}
              </h4>
              <p className="text-[11px] text-stone-600 font-serif-body leading-relaxed">
                {pr.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-section views */}
      {activeSection === 'suite' && (
        <div className="space-y-8 bg-[#121118] text-white p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
              Live Evaluation Engine
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-amber-100">
              Awaricon Tier Matrix &amp; Icon Studio
            </h3>
            <p className="text-xs text-stone-400">
              Test presence variables (Phi), dignity fidelity (Df), and integrity signals in real time to calculate your Aw score.
            </p>
          </div>

          <AwariconInteractiveSuite tiers={awariconTiers} />
        </div>
      )}

      {activeSection === 'calculus' && (
        <div className="bg-[#121118] text-white p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <AwariconCalculusExplainer />
        </div>
      )}

      {activeSection === 'apply' && (
        <div className="bg-[#121118] text-white p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <AwariconApplicationForm />
        </div>
      )}

      {activeSection === 'admin' && (
        <div className="bg-[#121118] text-white p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <AwariconAdminConsole />
        </div>
      )}
    </div>
  );
};
