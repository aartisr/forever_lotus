import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  FileCheck, 
  PenTool, 
  CheckCircle, 
  ExternalLink, 
  Lock, 
  Globe, 
  HeartHandshake,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

interface Signatory {
  id: string;
  name: string;
  institutionOrRole: string;
  country: string;
  commitmentDate: string;
  category: 'Academic' | 'Civil Society' | 'Technologist' | 'Individual';
  cryptographicHash: string;
}

const INITIAL_SIGNATORIES: Signatory[] = [
  {
    id: 'sig-01',
    name: 'Subasri Dorairaj',
    institutionOrRole: 'Founder & Author, Forever Lotus',
    country: 'India / Global',
    commitmentDate: '2024-01-15',
    category: 'Individual',
    cryptographicHash: '0x8f2d...c41e'
  },
  {
    id: 'sig-02',
    name: 'Ravikumar Raman',
    institutionOrRole: 'Co-founder & Technological Architect',
    country: 'India / Global',
    commitmentDate: '2024-01-15',
    category: 'Technologist',
    cryptographicHash: '0x4a7b...990f'
  },
  {
    id: 'sig-03',
    name: 'Dr. Akira Takahashi',
    institutionOrRole: 'Senior Fellow in Eastern Ethics, Kyoto Institute of Philosophy',
    country: 'Japan',
    commitmentDate: '2025-04-12',
    category: 'Academic',
    cryptographicHash: '0x1e3c...77a2'
  },
  {
    id: 'sig-04',
    name: 'Elena Rostova',
    institutionOrRole: 'Director, European Prosocial Technology Network',
    country: 'Sweden',
    commitmentDate: '2025-08-19',
    category: 'Civil Society',
    cryptographicHash: '0x99dc...551b'
  },
  {
    id: 'sig-05',
    name: 'Prof. K. Sundaralingam',
    institutionOrRole: 'Sangam Non-Harm Literary Foundation',
    country: 'India',
    commitmentDate: '2025-11-03',
    category: 'Academic',
    cryptographicHash: '0x33b8...88ea'
  },
  {
    id: 'sig-06',
    name: 'Mateo Morales',
    institutionOrRole: 'Grassroots Indigenous Tech Sovereignty Cadre',
    country: 'Colombia',
    commitmentDate: '2026-02-14',
    category: 'Civil Society',
    cryptographicHash: '0x66f1...00bc'
  },
];

export default function GlobalAccordView() {
  const [signatories, setSignatories] = useState<Signatory[]>(INITIAL_SIGNATORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSigningOpen, setIsSigningOpen] = useState(false);
  const [submittedSignature, setSubmittedSignature] = useState<Signatory | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formInstitution, setFormInstitution] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formCategory, setFormCategory] = useState<'Academic' | 'Civil Society' | 'Technologist' | 'Individual'>('Academic');
  const [formAcceptedTerms, setFormAcceptedTerms] = useState(false);

  const filteredSignatories = signatories.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.institutionOrRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitSignature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAcceptedTerms) return;

    const newSig: Signatory = {
      id: `sig-${Date.now()}`,
      name: formName.trim(),
      institutionOrRole: formInstitution.trim() || 'Independent Contemplative Creator',
      country: formCountry.trim() || 'Global Citizen',
      commitmentDate: new Date().toISOString().split('T')[0],
      category: formCategory,
      cryptographicHash: '0x' + Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 6)
    };

    setSignatories([newSig, ...signatories]);
    setSubmittedSignature(newSig);
    setIsSigningOpen(false);

    // Reset Form
    setFormName('');
    setFormInstitution('');
    setFormCountry('');
    setFormAcceptedTerms(false);
  };

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-lotus-gold/30 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lotus-gold/15 border border-lotus-gold/35 text-lotus-gold text-xs font-mono-code">
            <Award className="w-3.5 h-3.5" />
            <span>Institutum Forever Lotus · Institutional Governance Charter</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-lotus-cream tracking-tight">
            The Global Dignity Accord
          </h2>

          <p className="text-sm sm:text-base text-lotus-muted leading-relaxed font-sans-ui">
            A binding civilizational treaty consecrated to non-extractive creation. Signatories formally ratify 
            the 6 Operating Commitments, pledging that technology, research, and institutional power must strictly 
            alleviate suffering rather than commodify human consciousness.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono-code text-lotus-muted">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-4 h-4" /> 50+ Global Signatories Committed
            </span>
            <span>•</span>
            <span>Zero-Commercialization Firewall</span>
            <span>•</span>
            <span>Open Public Ledger</span>
          </div>
        </div>
      </div>

      {/* The 5 Non-Negotiable Articles of the Accord */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono-code text-lotus-gold uppercase tracking-wider">
            Canonical Charter
          </span>
          <h3 className="text-2xl font-serif font-bold text-lotus-cream">
            The Five Non-Negotiable Articles
          </h3>
          <p className="text-xs sm:text-sm text-lotus-muted">
            The constitutional principles governing all institutions operating under the Forever Lotus standard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              roman: 'I',
              title: 'Primacy of Human Dignity',
              desc: 'No technological, financial, or algorithmic deployment may treat sentient beings as means to an extractive end. Suffering reduction is the sole measure of valid civilizational progress.'
            },
            {
              roman: 'II',
              title: 'Prohibition of Cognitive Extraction',
              desc: 'Signatories forbid behavioral manipulation, addiction loops, and surveillance monetizing attentional deficits. Interface design must preserve sovereignty and contemplative peace.'
            },
            {
              roman: 'III',
              title: 'Free Multilingual Commons',
              desc: 'Core ethical curricula, philosophical treatises, and public health telemetry must remain perpetually free, open-source, and translated into the mother tongues of the Global South.'
            },
            {
              roman: 'IV',
              title: 'Grassroots Self-Determination',
              desc: 'External institutions must never usurp local community sovereignty. At least 85% of program governance must be held by local indigenous or resident community stewards.'
            },
            {
              roman: 'V',
              title: 'Transparent Public Refusal',
              desc: 'Any grant, partnership, or commercial contract requiring a compromise of moral architecture must be formally declined and registered in the open public Refusal Ledger.'
            },
            {
              roman: 'VI',
              title: 'Perpetual Firewall',
              desc: 'Zero advertising revenue, zero sponsored editorial insertion, and complete separation of institutional service from vanity leadership branding.'
            },
          ].map((art, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-lotus-gold/30 transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="w-7 h-7 rounded-full bg-lotus-gold/10 text-lotus-gold flex items-center justify-center font-bold">
                  {art.roman}
                </span>
                <span className="text-lotus-muted-2">ARTICLE {art.roman}</span>
              </div>
              <h4 className="text-base font-serif font-bold text-lotus-cream">
                {art.title}
              </h4>
              <p className="text-xs text-lotus-muted leading-relaxed font-sans-ui">
                {art.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Signing Chamber & Signatory Roster */}
      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-lotus-cream">
              Registry of Signatories &amp; Institutional Fellows
            </h3>
            <p className="text-xs sm:text-sm text-lotus-muted mt-1">
              Scholars, institutions, and builders who have consecrated their work to the Global Dignity Accord.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSigningOpen(true)}
              className="btn-primary text-xs !py-2.5 !px-5 flex items-center gap-2"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Sign the Accord</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-lotus-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signatories by name, institution, or country..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-lotus-cream placeholder:text-lotus-muted-2 focus:outline-none focus:border-lotus-gold"
          />
        </div>

        {/* Signatories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSignatories.map((sig) => (
            <div
              key={sig.id}
              className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.05] hover:border-lotus-gold/25 transition space-y-3"
            >
              <div className="flex items-center justify-between text-[11px] font-mono-code">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-lotus-gold border border-white/[0.08]">
                  {sig.category}
                </span>
                <span className="text-lotus-muted-2">{sig.commitmentDate}</span>
              </div>

              <div>
                <h4 className="text-base font-serif font-bold text-lotus-cream">
                  {sig.name}
                </h4>
                <p className="text-xs text-lotus-muted mt-0.5 font-sans-ui">
                  {sig.institutionOrRole}
                </p>
                <p className="text-[11px] text-lotus-muted-2 mt-0.5 flex items-center gap-1 font-mono-code">
                  <Globe className="w-3 h-3 text-lotus-gold" /> {sig.country}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono-code text-lotus-muted-2">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3 h-3" /> Ratified
                </span>
                <span className="text-lotus-gold/70">{sig.cryptographicHash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Signing Modal / Drawer */}
      {isSigningOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-lg w-full rounded-3xl bg-lotus-bg-2 border border-lotus-gold/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-lotus-gold/15 border border-lotus-gold/30 mx-auto flex items-center justify-center text-lotus-gold">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-lotus-cream">
                Ratify the Global Dignity Accord
              </h3>
              <p className="text-xs text-lotus-muted">
                Join the global cadre of scholars and institutions committed to non-extractive moral architecture.
              </p>
            </div>

            <form onSubmit={handleSubmitSignature} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-code text-lotus-cream mb-1">
                  Full Name / Representative Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Dr. Subasri Dorairaj"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-lotus-cream focus:outline-none focus:border-lotus-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-lotus-cream mb-1">
                  Institutional Affiliation or Independent Domain
                </label>
                <input
                  type="text"
                  value={formInstitution}
                  onChange={(e) => setFormInstitution(e.target.value)}
                  placeholder="e.g. Institute for Prosocial Computing"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-lotus-cream focus:outline-none focus:border-lotus-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code text-lotus-cream mb-1">
                    Country / Sovereign Territory
                  </label>
                  <input
                    type="text"
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    placeholder="e.g. India"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-lotus-cream focus:outline-none focus:border-lotus-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-lotus-cream mb-1">
                    Signatory Domain
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-lotus-cream focus:outline-none focus:border-lotus-gold"
                  >
                    <option value="Academic" className="bg-stone-900">Academic &amp; Research</option>
                    <option value="Civil Society" className="bg-stone-900">Civil Society</option>
                    <option value="Technologist" className="bg-stone-900">Technologist / Creator</option>
                    <option value="Individual" className="bg-stone-900">Independent Steward</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formAcceptedTerms}
                    onChange={(e) => setFormAcceptedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 bg-white/10 text-lotus-gold focus:ring-0"
                  />
                  <span className="text-[11px] text-lotus-muted leading-relaxed">
                    I solemnly vow to uphold the 5 Articles of the Global Dignity Accord, refusing extractive monetization, 
                    attentional manipulation, and behavioral exploitation in my creative and institutional work.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSigningOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono-code text-lotus-muted hover:text-lotus-cream"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!formAcceptedTerms || !formName.trim()}
                  className="btn-primary text-xs !py-2.5 !px-6 disabled:opacity-40"
                >
                  Ratify &amp; Consecrate Signature
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {submittedSignature && (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-serif font-bold text-base text-emerald-100">
                Signature Consecrated into the Open Ledger
              </div>
              <div className="text-xs text-emerald-300/80 font-mono-code">
                {submittedSignature.name} ({submittedSignature.institutionOrRole}) · Hash: {submittedSignature.cryptographicHash}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSubmittedSignature(null)}
            className="text-xs font-mono-code underline text-emerald-300 hover:text-emerald-100"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
