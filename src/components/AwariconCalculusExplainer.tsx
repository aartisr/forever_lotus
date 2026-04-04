import React from 'react';
import { awariconFormula } from '@/content/awaricon';

export default function AwariconCalculusExplainer() {
  return (
    <section id="awaricon-calculus-explainer" className="mx-auto max-w-5xl rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8 awaricon-calculus-shell" aria-labelledby="awaricon-calculus-heading">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow mb-2">Easy Understanding</p>
          <h3 id="awaricon-calculus-heading" className="font-serif text-2xl font-black text-lotus-cream sm:text-3xl">
            AWARICON Calculus, In One View
          </h3>
        </div>
        <div className="rounded-2xl border border-lotus-gold/25 bg-lotus-gold-dim px-4 py-3">
          <p className="text-xs uppercase tracking-[0.18em] text-lotus-gold/80">Formula</p>
          <p className="font-serif text-lg text-lotus-cream">{awariconFormula}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-lotus-muted">
        Briefly: AWARICON measures <span className="text-lotus-cream font-semibold">sustained dignified presence</span> over time.
        It is not a one-moment productivity score. It rewards consistent authenticity, ethical coherence, and accountable participation.
      </p>

      <details className="awaricon-calc-details mt-6 rounded-2xl border border-white/10 bg-[#070914]/90 p-4 sm:p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-lotus-gold/80">Expand For Thorough Explanation</p>
            <p className="mt-1 text-sm font-semibold text-lotus-cream">What each symbol means and how to interpret it</p>
          </div>
          <span className="awaricon-calc-chevron inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-lotus-cream/90">
            ▾
          </span>
        </summary>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-lotus-muted">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p><span className="text-lotus-cream font-semibold">Aw</span>: The integrated Awaricon value - your accumulated quality of conscious, ethical presence.</p>
            <p className="mt-2"><span className="text-lotus-cream font-semibold">Phi (Phi)</span>: Presence quality (authenticity, attentiveness, coherence).</p>
            <p className="mt-2"><span className="text-lotus-cream font-semibold">Df</span>: Dignity fidelity (how consistently actions align with dignity and non-harm).</p>
            <p className="mt-2"><span className="text-lotus-cream font-semibold">Phi * Df</span>: Coupling term - both must be high together; one without the other is insufficient.</p>
            <p className="mt-2"><span className="text-lotus-cream font-semibold">Sigma</span>: Aggregate across many interactions, contexts, and moments.</p>
            <p className="mt-2"><span className="text-lotus-cream font-semibold">Integral over omega</span>: Integrate across evolving states/time, so trajectory matters more than single snapshots.</p>
          </div>

          <div className="rounded-xl border border-lotus-gold/25 bg-lotus-gold-dim p-4">
            <p className="text-lotus-cream font-semibold">Interpretation Rule</p>
            <p className="mt-2">AWARICON is a developmental signal, not an identity verdict. It is designed for growth guidance and ethical reflection, never exclusion.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-lotus-cream font-semibold">How This Site Operationalizes It</p>
            <p className="mt-2">The live calculator uses a practical weighted approximation for usability while preserving the same conceptual intent: sustained dignity-centered presence over time.</p>
          </div>
        </div>
      </details>
    </section>
  );
}