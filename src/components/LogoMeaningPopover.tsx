'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { withLocale } from '@/i18n';
import type { Locale } from '@/i18n';

type LogoMeaningPopoverProps = {
  locale: Locale;
  className?: string;
  align?: 'left' | 'right';
};

export default function LogoMeaningPopover({
  locale,
  className = '',
  align = 'left',
}: LogoMeaningPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lotus-gold/80 hover:text-lotus-cream transition-colors"
        aria-expanded={open}
        aria-label="Learn what the Forever Lotus symbol means"
        data-track="logo_meaning_toggle"
      >
        What this symbol means
      </button>

      {open && (
        <div
          className={`absolute z-[80] mt-2 w-[300px] rounded-2xl border border-white/10 bg-[rgba(9,11,20,0.97)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.65)] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          role="dialog"
          aria-label="Meaning of the Forever Lotus symbol"
        >
          <p className="text-[10px] uppercase tracking-[0.16em] text-lotus-gold/75">Logo Meaning</p>
          <p className="mt-2 text-sm text-lotus-cream leading-relaxed">
            Rooted base, rising lotus, and conscious center: a symbol of compassionate creation, dignity, and
            responsibility.
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-lotus-muted">
            <li>Rooted base: stewardship and grounded action.</li>
            <li>Rising bloom: disciplined hope through adversity.</li>
            <li>Center seed: conscious creation and responsibility.</li>
          </ul>
          <p className="mt-3 text-xs italic text-lotus-gold/80">Rooted. Rising. Untainted.</p>
          <Link
            href={withLocale('/manifesto', locale)}
            className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-lotus-gold hover:text-lotus-cream transition-colors"
            data-track="logo_meaning_manifesto"
          >
            Read Manifesto
          </Link>
        </div>
      )}
    </div>
  );
}
