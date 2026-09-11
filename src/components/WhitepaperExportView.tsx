import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Award, 
  BookOpen, 
  Layers, 
  Compass, 
  FileText 
} from 'lucide-react';
import { CATEGORY_EVALUATIONS, COMPOSITE_SCORES, ROADMAP_PHASES, IMPROVEMENT_DOMAINS } from '../data/evaluationData';

export const WhitepaperExportView: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownReport = () => {
    let md = `# FOREVER LOTUS (foreverlotus.com)
## Nobel-Cadre Institutional Evaluation & Strategic Transformation Dossier
**Founders:** Subasri Dorairaj (Author & Founder) & Ravikumar Raman (Co-founder)  
**Evaluated Against:** Nobel Foundation, Max Planck Society, Carnegie Endowment, and Oxford Martin Standards  
**Current Composite Score:** ${COMPOSITE_SCORES.currentOverall} / 10.0  
**Target Nobel Cadre Score:** ${COMPOSITE_SCORES.targetOverall} / 10.0 (+${COMPOSITE_SCORES.delta.toFixed(2)} pts)

---

### EXECUTIVE SUMMARY
Forever Lotus presents one of the rarest and most profound philosophical syntheses of our era: re-anchoring civilizational progress in human dignity by harmonizing 4,000 years of Eastern contemplative wisdom with contemporary empirical flourishing science.

However, to stand alongside global Nobel-cadre institutions, the digital manifestation must transition from a static, declarative brochure to a living, peer-reviewed global observatory and research canon.

---

### CATEGORY EVALUATIONS (SCALE: 1 - 10)

`;

    CATEGORY_EVALUATIONS.forEach((cat, idx) => {
      md += `#### ${idx + 1}. ${cat.title}
- **Score:** ${cat.score.toFixed(1)} / 10.0 (Target: ${cat.targetScore.toFixed(1)} / 10.0)
- **Subtitle:** ${cat.subtitle}
- **Benchmark Institution:** ${cat.benchmarkInstitution}
- **Executive Diagnostic:** ${cat.executiveSummary}

**Sub-Metrics:**
`;
      cat.subMetrics.forEach(sm => {
        md += `  - **${sm.name}** [Current: ${sm.currentScore.toFixed(1)} / Target: ${sm.targetScore.toFixed(1)}]: ${sm.currentObservations} -> *Action:* ${sm.actionRequired}\n`;
      });

      md += `\n**Direct Action Items:**\n`;
      cat.directActionItems.forEach(item => {
        md += `  - ${item}\n`;
      });
      md += `\n---\n\n`;
    });

    md += `### ACTIONABLE IMPROVEMENTS FOR GLOBAL EXCELLENCE\n\n`;
    IMPROVEMENT_DOMAINS.forEach(dom => {
      md += `#### ${dom.title}\n${dom.leadParagraph}\n\n`;
      dom.specifications.forEach(spec => {
        md += `##### ${spec.area}\n- **Current Limitation:** ${spec.currentLimitation}\n- **Nobel Standard:** ${spec.nobelCadreStandard}\n- **Specification Snippet:** \`${spec.codeOrDesignSpec}\`\n\n`;
      });
    });

    md += `### 16-WEEK TRANSFORMATION ROADMAP\n\n`;
    ROADMAP_PHASES.forEach(phase => {
      md += `#### Phase ${phase.phaseNumber}: ${phase.title} (${phase.timeframe})\n*Theme: ${phase.theme}*\n*Core Objective: ${phase.corePhilosophy}*\n\n`;
      phase.milestones.forEach(m => {
        md += `- **${m.week} - ${m.title}**\n`;
        m.deliverables.forEach(d => {
          md += `  - Deliverable: ${d}\n`;
        });
        md += `  - Standard Achieved: ${m.nobelStandardAchieved}\n  - KPI: ${m.kpi}\n\n`;
      });
    });

    md += `\n*Dossier prepared for Subasri Dorairaj & Ravikumar Raman · Institutum Forever Lotus*\n`;
    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownReport();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Forever_Lotus_Nobel_Cadre_Transformation_Dossier.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Control bar */}
      <div className="bg-stone-900 text-stone-100 p-5 rounded-xl border border-stone-800 shadow-md flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <h3 className="text-base font-display font-bold text-stone-50">
            Executive Transformation Whitepaper
          </h3>
          <p className="text-xs text-stone-400 font-serif-body">
            Full comprehensive dossier formatted for executive boards, grantmakers, and academic institutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono-code transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono-code transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-medium text-xs font-sans-ui transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Formal Whitepaper (PDF)</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE WHITEPAPER DOCUMENT */}
      <div className="bg-white p-8 sm:p-14 lg:p-20 rounded-2xl border border-stone-200 shadow-xl space-y-12 max-w-5xl mx-auto font-serif-body text-stone-900 leading-relaxed print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b-2 border-stone-900 pb-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono-code text-stone-500 uppercase tracking-widest">
            <span>INSTITUTIONAL AUDIT &amp; STRATEGIC ROADMAP</span>
            <span>DATE: 2026-09-08</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-stone-950 leading-tight">
            FOREVER LOTUS: PATHWAY TO A NOBEL-CADRE CIVILIZATIONAL INSTITUTION
          </h1>

          <div className="text-sm font-mono-code text-stone-600 flex flex-wrap gap-x-6 gap-y-1 pt-1">
            <span><strong>Target Domain:</strong> foreverlotus.com</span>
            <span><strong>Founders:</strong> Subasri Dorairaj &amp; Ravikumar Raman</span>
            <span><strong>Global Standard:</strong> Nobel Peace Prize / Max Planck</span>
          </div>
        </div>

        {/* Executive Overview */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-stone-950 uppercase tracking-wide border-b border-stone-200 pb-2">
            1. Executive Synthesis &amp; The Nobel Mandate
          </h2>
          <p className="text-base text-stone-800 leading-relaxed">
            The core intellectual framework of Forever Lotus—synthesizing 4,000 years of Eastern contemplative 
            heritage with rigorous 21st-century empirical flourishing science—possesses genuine world-historic 
            gravitas. It addresses humanity's greatest civilizational crisis: technological acceleration without 
            moral architecture.
          </p>
          <p className="text-base text-stone-800 leading-relaxed">
            However, our comprehensive evaluation reveals a critical operational divide: <strong>foreverlotus.com 
            currently functions as a static declaratory website rather than an active, verifiable global institution.</strong> 
            Across the five evaluated dimensions, the site currently scores a composite <strong>5.66 out of 10.0</strong>, 
            with a clear potential to attain <strong>9.76 out of 10.0</strong> through the systematic 16-week transformation 
            roadmap articulated herein.
          </p>
        </section>

        {/* Five Category Scores Summary */}
        <section className="space-y-6">
          <h2 className="text-xl font-display font-bold text-stone-950 uppercase tracking-wide border-b border-stone-200 pb-2">
            2. Detailed 1-to-10 Category Evaluations
          </h2>

          <div className="space-y-8">
            {CATEGORY_EVALUATIONS.map((cat, idx) => (
              <div key={cat.id} className="space-y-4 p-6 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-xs font-mono-code uppercase font-semibold text-amber-900">
                      Category 0{idx + 1}
                    </span>
                    <h3 className="text-xl font-display font-bold text-stone-900">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right font-mono-code text-sm">
                    <span className="font-bold text-amber-900 text-lg">{cat.score.toFixed(1)} / 10.0</span>
                    <span className="text-stone-500 text-xs ml-2">(Target: {cat.targetScore.toFixed(1)})</span>
                  </div>
                </div>

                <p className="text-stone-800 text-sm italic">
                  "{cat.executiveSummary}"
                </p>

                {/* Submetrics table */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-300 text-stone-600 font-mono-code">
                        <th className="py-2 pr-3">Sub-Metric</th>
                        <th className="py-2 px-2">Score</th>
                        <th className="py-2 px-3">Current Observation</th>
                        <th className="py-2 pl-3">Required Action for Nobel Cadre</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 font-sans-ui text-xs">
                      {cat.subMetrics.map(sm => (
                        <tr key={sm.id}>
                          <td className="py-2.5 pr-3 font-semibold text-stone-900">{sm.name}</td>
                          <td className="py-2.5 px-2 font-mono-code font-bold text-amber-800">{sm.currentScore.toFixed(1)}</td>
                          <td className="py-2.5 px-3 text-stone-700 font-serif-body">{sm.currentObservations}</td>
                          <td className="py-2.5 pl-3 text-amber-950 font-serif-body font-medium">{sm.actionRequired}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Direct action list */}
                <div className="pt-3 border-t border-stone-200">
                  <span className="text-xs font-mono-code text-stone-600 uppercase font-semibold block mb-2">
                    Action Directives:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-stone-800 font-serif-body">
                    {cat.directActionItems.map((item, dIdx) => (
                      <li key={dIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Actionable Engineering & Content Recommendations */}
        <section className="space-y-6">
          <h2 className="text-xl font-display font-bold text-stone-950 uppercase tracking-wide border-b border-stone-200 pb-2">
            3. Actionable Specifications: UI/UX, Content Strategy &amp; Mobile Equity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border border-stone-200 rounded-xl space-y-3 bg-stone-50/60">
              <h3 className="font-display font-bold text-base text-stone-900">
                A. UI/UX Architecture
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 font-serif-body leading-relaxed">
                <li>• <strong>Typography:</strong> Newsreader 72pt optical display for moral vows; Cinzel classical headers; JetBrains Mono for metrics.</li>
                <li>• <strong>Archival Vellum:</strong> #FAF8F5 canvas paired with mineral sumi ink (#1A1918) and antiquarian bronze.</li>
                <li>• <strong>Anti-Slop:</strong> Elimination of generic cards, purple gradients, and floating badges.</li>
              </ul>
            </div>

            <div className="p-5 border border-stone-200 rounded-xl space-y-3 bg-stone-50/60">
              <h3 className="font-display font-bold text-base text-stone-900">
                B. Content Strategy &amp; Canon
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 font-serif-body leading-relaxed">
                <li>• <strong>The Dual-Canon:</strong> Bidirectional linking of Thirukkural, Nagarjuna, Laozi, and Ashoka to Harvard and Stanford studies.</li>
                <li>• <strong>Verifiable Commitments:</strong> 1,500-word monographs detailing negative boundaries and audit metrics.</li>
                <li>• <strong>Dignity Observatory:</strong> Annual published indices of suffering reduction and local agency expansion.</li>
              </ul>
            </div>

            <div className="p-5 border border-stone-200 rounded-xl space-y-3 bg-stone-50/60">
              <h3 className="font-display font-bold text-base text-stone-900">
                C. Mobile &amp; Global Equity
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 font-serif-body leading-relaxed">
                <li>• <strong>48px Touch Targets:</strong> Ergonomic bottom-thumb reading controls and comfortable touch targets.</li>
                <li>• <strong>&lt;50KB Low-Data Mode:</strong> High-contrast text-only fallback for rural scholars in South Asia and Africa.</li>
                <li>• <strong>Polyglot Rendering:</strong> Native multi-script ligature support for Tamil, Sanskrit, and Mandarin.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 16-Week Roadmap */}
        <section className="space-y-6">
          <h2 className="text-xl font-display font-bold text-stone-950 uppercase tracking-wide border-b border-stone-200 pb-2">
            4. 16-Week Transformation Roadmap (Chronological Execution)
          </h2>

          <div className="space-y-6">
            {ROADMAP_PHASES.map((phase) => (
              <div key={phase.phaseNumber} className="border-l-2 border-stone-900 pl-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-code text-stone-500">
                  <span className="font-bold text-stone-900">PHASE 0{phase.phaseNumber}</span>
                  <span>•</span>
                  <span>{phase.timeframe}</span>
                </div>
                <h3 className="text-base font-display font-bold text-stone-950">
                  {phase.title}: {phase.theme}
                </h3>
                <p className="text-xs text-stone-700 font-serif-body italic">
                  {phase.corePhilosophy}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {phase.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="bg-stone-50 p-3 rounded border border-stone-200 text-xs">
                      <span className="font-mono-code text-[11px] font-bold text-amber-900 block">{m.week}: {m.title}</span>
                      <span className="text-stone-600 block mt-1">Standard: {m.nobelStandardAchieved}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formal Institutional Signoff */}
        <div className="border-t-2 border-stone-900 pt-8 space-y-2 text-xs font-mono-code text-stone-600">
          <p>CONFIDENTIAL EVALUATION AND TRANSFORMATION DOSSIER</p>
          <p>Prepared for Subasri Dorairaj &amp; Ravikumar Raman · Institutum Forever Lotus</p>
          <p>Certified against Global Civilizational &amp; Digital Governance Standards</p>
        </div>
      </div>
    </div>
  );
};
