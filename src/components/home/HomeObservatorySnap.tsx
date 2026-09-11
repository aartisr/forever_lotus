import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { DIGNITY_OBSERVATORY_METRICS } from '@/data/prototypeData';

export const HomeObservatorySnap: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-lotus-bg-2 border-t border-lotus-border-soft">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE TELEMETRY FEEDS</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-lotus-cream">
              Global Dignity Observatory
            </h2>
            <p className="text-xs sm:text-sm text-lotus-muted max-w-xl mt-1">
              Public telemetry tracking the expansion of non-extractive digital architecture and algorithmic liberation.
            </p>
          </div>
          <Link
            href="/observatory"
            className="btn-secondary !py-2 !px-4 text-xs font-mono-code inline-flex items-center gap-1.5 shrink-0 self-start md:self-auto min-h-[44px]"
          >
            <span>Open Observatory Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Metrics Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {DIGNITY_OBSERVATORY_METRICS.slice(0, 4).map((metric, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-lotus-gold/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono-code text-lotus-muted mb-2">
                  <span>INDEX 0{idx + 1}</span>
                  <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {metric.delta}
                  </span>
                </div>
                <div className="font-serif font-bold text-2xl sm:text-3xl text-lotus-cream tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs text-lotus-gold font-semibold mt-1">
                  {metric.label}
                </div>
                <p className="text-[11px] text-lotus-muted-2 mt-2 leading-relaxed">
                  {metric.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono-code text-lotus-muted">
                Audited by {metric.verifiedBy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
