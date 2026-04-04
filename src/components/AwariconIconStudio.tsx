'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AwariconMark, { type AwariconMarkVariant } from '@/components/AwariconMark';
import { awariconCopyright } from '@/content/awaricon';

const STORAGE_KEY = 'awaricon-icon-variant';

const variants: ReadonlyArray<{ key: AwariconMarkVariant; label: string; blurb: string }> = [
  { key: 'crystal', label: 'Crystal Celestial', blurb: 'Luminous, futuristic, and ethereal.' },
  { key: 'luxury', label: 'Monoline Luxury', blurb: 'Premium gold geometry with elite tone.' },
  { key: 'heraldic', label: 'Celestial Heraldic', blurb: 'Emblematic crest with trust authority.' },
];

export default function AwariconIconStudio() {
  const [active, setActive] = useState<AwariconMarkVariant>('crystal');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'crystal' || stored === 'luxury' || stored === 'heraldic') {
      setActive(stored);
    }
  }, []);

  const applyVariant = (next: AwariconMarkVariant) => {
    setActive(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent('awaricon-icon-variant-change', { detail: next }));
  };

  return (
    <section className="mx-auto mt-14 max-w-5xl rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8" aria-labelledby="awaricon-icon-studio-heading">
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Icon Direction Studio</p>
          <h3 id="awaricon-icon-studio-heading" className="font-serif text-2xl font-black text-lotus-cream sm:text-3xl">
            Choose The Final Awaricon Nav Icon
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-lotus-muted">
            Selection here instantly updates the top menu spotlight icon. This helps you compare conversion-grade visual identities in live context.
          </p>
        </div>
        <div className="rounded-2xl border border-lotus-gold/30 bg-lotus-gold-dim px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-lotus-gold/80">Active Style</p>
          <p className="text-sm font-semibold text-lotus-cream mt-1">{variants.find((v) => v.key === active)?.label}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {variants.map((variant) => {
          const selected = active === variant.key;
          return (
            <button
              key={variant.key}
              type="button"
              onClick={() => applyVariant(variant.key)}
              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                selected
                  ? 'border-lotus-gold/50 bg-lotus-gold-dim shadow-[0_0_0_1px_rgba(201,168,76,0.35)]'
                  : 'border-white/10 bg-white/[0.02] hover:border-lotus-gold/35 hover:bg-white/[0.04]'
              }`}
            >
              <div className="mb-3 flex items-center gap-3">
                <AwariconMark size={30} variant={variant.key} className="shrink-0" />
                <p className="text-sm font-semibold text-lotus-cream">{variant.label}</p>
              </div>
              <p className="text-xs text-lotus-muted">{variant.blurb}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-[#070914]/80 px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.14em] text-lotus-gold/80">Copyright Notice</p>
        <p className="mt-1 text-xs text-lotus-muted">
          {awariconCopyright.notice} Awaricon icon designs and related marks are proprietary assets of {awariconCopyright.holder}.
        </p>
        <Link href="/awaricon/legal" className="mt-2 inline-block text-[11px] uppercase tracking-[0.12em] text-lotus-gold hover:text-lotus-cream transition-colors">
          View full policy
        </Link>
      </div>
    </section>
  );
}
