'use client';

import React, { useId, useMemo, useState } from 'react';
import type { AwariconTier } from '@/content/awaricon';
import { awariconCopyright } from '@/content/awaricon';
import { buildAwariconBadgeSvgMarkup } from '@/lib/awariconBadgeSvg';

interface AwariconBadgeProps {
  tier: AwariconTier;
  index?: number;
}

function downloadBlob(blob: Blob, fileName: string): void {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export default function AwariconBadge({ tier, index = 0 }: AwariconBadgeProps) {
  const id = useId().replace(/:/g, '');
  const gradId = `aw-grad-${id}`;
  const haloId = `aw-halo-${id}`;
  const shineId = `aw-shine-${id}`;
  const [downloadingPng, setDownloadingPng] = useState(false);

  const svgMarkup = useMemo(() => {
    return buildAwariconBadgeSvgMarkup(tier, { gradId, haloId, shineId });
  }, [tier, gradId, haloId, shineId]);

  const handleDownloadSvg = (): void => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, `awaricon-${tier.key}-badge.svg`);
  };

  const handleDownloadPng = async (): Promise<void> => {
    setDownloadingPng(true);
    try {
      const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const image = new Image();
      image.src = svgUrl;

      try {
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error('Unable to render badge image.'));
        });
      } finally {
        URL.revokeObjectURL(svgUrl);
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Canvas context unavailable.');
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((result) => resolve(result), 'image/png');
      });
      if (!blob) {
        throw new Error('Unable to export PNG.');
      }

      downloadBlob(blob, `awaricon-${tier.key}-badge.png`);
    } catch {
      // Download fallback as SVG when PNG conversion fails.
      handleDownloadSvg();
    } finally {
      setDownloadingPng(false);
    }
  };

  return (
    <div
      className="group awaricon-badge-shell relative rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(9,10,18,0.98),rgba(16,18,30,0.94))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(0,0,0,0.6)]"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: `radial-gradient(circle at 50% 35%, ${tier.gradientVia}99 0%, transparent 68%)` }} />

      <div className="relative mb-5 flex justify-center">
        <svg viewBox="0 0 360 360" className="h-[230px] w-[230px] drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]" role="img" aria-label={`${tier.label} badge`}>
          <defs>
            <radialGradient id={haloId} cx="50%" cy="45%" r="58%">
              <stop offset="0%" stopColor={tier.gradientVia} stopOpacity="0.95" />
              <stop offset="65%" stopColor={tier.gradientTo} stopOpacity="0.38" />
              <stop offset="100%" stopColor={tier.gradientTo} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={gradId} x1="10%" y1="8%" x2="88%" y2="92%">
              <stop offset="0%" stopColor={tier.gradientFrom} />
              <stop offset="48%" stopColor={tier.gradientVia} />
              <stop offset="100%" stopColor={tier.gradientTo} />
            </linearGradient>
            <linearGradient id={shineId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <circle cx="180" cy="180" r="156" fill={`url(#${haloId})`} />
          <circle cx="180" cy="180" r="132" fill="rgba(11,12,21,0.92)" stroke={`url(#${gradId})`} strokeWidth="8" />
          <circle cx="180" cy="180" r="111" fill="rgba(10,11,19,0.85)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          <g fill={`url(#${gradId})`} opacity="0.98" transform="translate(180 180)">
            <path d="M0,-78 C14,-50 14,-26 0,-6 C-14,-26 -14,-50 0,-78" />
            <path d="M0,-78 C14,-50 14,-26 0,-6 C-14,-26 -14,-50 0,-78" transform="rotate(45)" />
            <path d="M0,-78 C14,-50 14,-26 0,-6 C-14,-26 -14,-50 0,-78" transform="rotate(90)" />
            <path d="M0,-78 C14,-50 14,-26 0,-6 C-14,-26 -14,-50 0,-78" transform="rotate(135)" />
            <path d="M0,-78 C14,-50 14,-26 0,-6 C-14,-26 -14,-50 0,-78" transform="rotate(180)" />
            <path d="M0,-78 C14,-50 14,-26 0,-6 C-14,-26 -14,-50 0,-78" transform="rotate(225)" />
            <path d="M0,-78 C14,-50 14,-26 0,-6 C-14,-26 -14,-50 0,-78" transform="rotate(270)" />
            <path d="M0,-78 C14,-50 14,-26 0,-6 C-14,-26 -14,-50 0,-78" transform="rotate(315)" />
          </g>

          <circle cx="180" cy="180" r="56" fill="rgba(7,8,14,0.92)" stroke={`url(#${gradId})`} strokeWidth="3" />
          <path d="M180 140 L198 176 L238 182 L208 209 L214 248 L180 228 L146 248 L152 209 L122 182 L162 176 Z" fill={`url(#${gradId})`} opacity="0.95" />
          <circle cx="180" cy="180" r="18" fill={`url(#${shineId})`} opacity="0.5" />

          <text x="180" y="292" textAnchor="middle" fill={tier.gradientFrom} fontSize="16" fontWeight="700" letterSpacing="2.6">
            {tier.metal.toUpperCase()}
          </text>
          <text x="180" y="336" textAnchor="middle" fill="rgba(255,255,255,0.42)" fontSize="8" letterSpacing="1.2">
            {awariconCopyright.notice}
          </text>
        </svg>
      </div>

      <p className="text-xs uppercase tracking-[0.2em] text-lotus-gold/70 mb-2">{tier.scoreRange}</p>
      <h3 className="font-serif text-2xl font-black text-lotus-cream mb-2">{tier.label}</h3>
      <p className="text-sm text-lotus-muted mb-3">{tier.claim}</p>
      <p className="text-xs text-lotus-muted-2 mb-2">Aura: <span className="text-lotus-cream/80">{tier.aura}</span></p>
      <p className="text-xs text-lotus-muted-2 mb-2">Sigil: <span className="text-lotus-cream/80">{tier.sigil}</span></p>
      <p className="text-xs text-lotus-muted-2">Manifesto fit: <span className="text-lotus-cream/80">{tier.manifestoFit}</span></p>
      <p className="mt-2 text-[10px] text-lotus-muted-2/90">{awariconCopyright.notice}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="btn-primary !px-4 !py-2 !text-xs" onClick={handleDownloadSvg}>
          Download SVG
        </button>
        <button type="button" className="btn-ghost !px-4 !py-2 !text-xs" onClick={() => void handleDownloadPng()} disabled={downloadingPng}>
          {downloadingPng ? 'Rendering PNG...' : 'Download PNG'}
        </button>
      </div>
    </div>
  );
}
