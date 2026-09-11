'use client';

import { useEffect, useRef, useState } from 'react';

export default function AwariconFormulaPopover() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Explain Awaricon calculus"
        className="awaricon-formula-help inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-xs font-semibold text-lotus-cream transition-all duration-200 hover:border-lotus-gold/45 hover:text-lotus-gold"
      >
        ?
      </button>

      <div
        className={`awaricon-formula-popover fixed left-4 right-4 top-24 z-[90] w-auto rounded-2xl border border-white/15 bg-[rgba(7,9,20,0.96)] p-4 shadow-[0_20px_55px_rgba(0,0,0,0.58)] transition-all duration-200 sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+0.6rem)] sm:w-[min(21rem,80vw)] ${
          open ? 'visible opacity-100 translate-y-0 pointer-events-auto' : 'invisible opacity-0 -translate-y-1 pointer-events-none'
        }`}
        role="dialog"
        aria-hidden={!open}
        aria-label="Awaricon calculus quick explanation"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-lotus-gold/80">Quick Explanation</p>
        <p className="mt-2 text-sm leading-relaxed text-lotus-muted">
          AWARICON estimates dignified presence over time. Presence quality and dignity fidelity are combined, then aggregated across many moments.
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-lotus-muted-2">Open the full Calculus section below for a complete symbol-by-symbol breakdown.</p>
          <a
            href="#awaricon-calculus-explainer"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-lotus-gold hover:text-lotus-cream transition-colors"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
