'use client';

import { useMemo, useState } from 'react';
import { awariconTiers } from '@/content/awaricon';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function AwariconCalculator() {
  const [phi, setPhi] = useState(8);
  const [df, setDf] = useState(8);
  const [omega, setOmega] = useState(7);
  const [integrity, setIntegrity] = useState(8);

  const score = useMemo(() => {
    const weighted = phi * 0.35 + df * 0.35 + omega * 0.2 + integrity * 0.1;
    return clamp(Math.round((weighted / 10) * 100), 0, 100);
  }, [phi, df, omega, integrity]);

  const tier = useMemo(() => {
    return awariconTiers.find((item) => score >= item.minScore && score <= item.maxScore) ?? null;
  }, [score]);

  return (
    <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8 awaricon-calculator-shell" aria-labelledby="awaricon-calculator-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Live Tier Calculator</p>
          <h3 id="awaricon-calculator-heading" className="font-serif text-2xl font-black text-lotus-cream sm:text-3xl">Measure Your Current Awaricon Presence</h3>
        </div>
        <div className="rounded-2xl border border-lotus-gold/30 bg-lotus-gold-dim px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-lotus-gold/80">Current Aw Score</p>
          <p className="font-serif text-3xl font-black text-lotus-cream">{score}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-lotus-cream">Phi (Presence)</span>
            <span className="text-xs text-lotus-muted">{phi.toFixed(1)}</span>
          </div>
          <input type="range" min={0} max={10} step={0.1} value={phi} onChange={(event) => setPhi(Number(event.target.value))} className="w-full" />
        </label>

        <label className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-lotus-cream">Df (Dignity Fidelity)</span>
            <span className="text-xs text-lotus-muted">{df.toFixed(1)}</span>
          </div>
          <input type="range" min={0} max={10} step={0.1} value={df} onChange={(event) => setDf(Number(event.target.value))} className="w-full" />
        </label>

        <label className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-lotus-cream">Omega (Recursive Coherence)</span>
            <span className="text-xs text-lotus-muted">{omega.toFixed(1)}</span>
          </div>
          <input type="range" min={0} max={10} step={0.1} value={omega} onChange={(event) => setOmega(Number(event.target.value))} className="w-full" />
        </label>

        <label className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-lotus-cream">Integrity (Ethical Consistency)</span>
            <span className="text-xs text-lotus-muted">{integrity.toFixed(1)}</span>
          </div>
          <input type="range" min={0} max={10} step={0.1} value={integrity} onChange={(event) => setIntegrity(Number(event.target.value))} className="w-full" />
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#070914] p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-lotus-gold/75">Recommended Tier</p>
        {tier ? (
          <>
            <p className="mt-2 font-serif text-2xl font-black text-lotus-cream">{tier.label}</p>
            <p className="mt-2 text-sm text-lotus-muted">{tier.claim}</p>
          </>
        ) : (
          <p className="mt-2 text-sm text-lotus-muted">Below Bronze threshold. Continue cultivating presence and dignity practices.</p>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-lotus-muted">
        This calculator is a pedagogical approximation intended for reflection and growth. It is not an identity verdict and should never be used to exclude individuals from participation.
      </p>
    </section>
  );
}
