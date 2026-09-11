import React from 'react';

export type AwariconMarkVariant = 'crystal' | 'luxury' | 'heraldic';

interface AwariconMarkProps {
  size?: number;
  className?: string;
  variant?: AwariconMarkVariant;
}

function CrystalMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="aw-core-cr" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id="aw-ring-cr" x1="12" y1="10" x2="110" y2="112">
          <stop offset="0%" stopColor="#dff7ff" />
          <stop offset="45%" stopColor="#ffd66b" />
          <stop offset="100%" stopColor="#e887a6" />
        </linearGradient>
        <linearGradient id="aw-star-cr" x1="20" y1="20" x2="98" y2="96">
          <stop offset="0%" stopColor="#fff6d1" />
          <stop offset="45%" stopColor="#ffd369" />
          <stop offset="100%" stopColor="#ffb657" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="49" stroke="url(#aw-ring-cr)" strokeWidth="2.4" opacity="0.85" />
      <circle cx="60" cy="60" r="36" stroke="rgba(223,247,255,0.45)" strokeWidth="1.4" strokeDasharray="2 4" />
      <g transform="translate(60 60)">
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`aw-petal-cr-${i}`}
            d="M0,-32 C5,-24 5,-14 0,-4 C-5,-14 -5,-24 0,-32"
            fill="rgba(184,216,255,0.28)"
            transform={`rotate(${i * 30})`}
          />
        ))}
      </g>
      <circle cx="60" cy="60" r="20" fill="url(#aw-core-cr)" />
      <path d="M60 35 L66 49 L81 51 L70 61 L73 76 L60 68 L47 76 L50 61 L39 51 L54 49 Z" fill="url(#aw-star-cr)" opacity="0.95" />
      <circle cx="60" cy="60" r="4.2" fill="#fff7da" />
    </svg>
  );
}

function LuxuryMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aw-lx-gold" x1="14" y1="16" x2="106" y2="104">
          <stop offset="0%" stopColor="#fff1c1" />
          <stop offset="38%" stopColor="#ffd369" />
          <stop offset="68%" stopColor="#d7a53a" />
          <stop offset="100%" stopColor="#8b5b16" />
        </linearGradient>
      </defs>

      <path d="M60 8 L104 34 L104 86 L60 112 L16 86 L16 34 Z" stroke="url(#aw-lx-gold)" strokeWidth="2.6" opacity="0.82" />
      <circle cx="60" cy="60" r="34" stroke="url(#aw-lx-gold)" strokeWidth="2" opacity="0.85" />
      <circle cx="60" cy="60" r="21" fill="rgba(255,212,105,0.18)" stroke="rgba(255,241,193,0.65)" strokeWidth="1.3" />
      <path d="M60 24 L67 41 L86 42 L72 55 L76 75 L60 66 L44 75 L48 55 L34 42 L53 41 Z" fill="url(#aw-lx-gold)" opacity="0.92" />
      <path d="M60 45 L64 55 L75 56 L67 63 L69 74 L60 69 L51 74 L53 63 L45 56 L56 55 Z" fill="#fff2ca" opacity="0.88" />
      <circle cx="60" cy="60" r="4" fill="#fff4d6" />
    </svg>
  );
}

function HeraldicMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aw-hl-main" x1="18" y1="12" x2="108" y2="110">
          <stop offset="0%" stopColor="#dff7ff" />
          <stop offset="46%" stopColor="#b8d8ff" />
          <stop offset="100%" stopColor="#9ee6ff" />
        </linearGradient>
        <linearGradient id="aw-hl-accent" x1="20" y1="20" x2="100" y2="100">
          <stop offset="0%" stopColor="#ffe8b0" />
          <stop offset="100%" stopColor="#ffd369" />
        </linearGradient>
      </defs>

      <path d="M60 10 L96 22 V50 C96 73 80 96 60 110 C40 96 24 73 24 50 V22 Z" fill="rgba(184,216,255,0.16)" stroke="url(#aw-hl-main)" strokeWidth="2.4" />
      <path d="M36 34 L60 22 L84 34 L84 62 L60 88 L36 62 Z" stroke="url(#aw-hl-accent)" strokeWidth="2" fill="rgba(255,211,105,0.08)" />
      <g transform="translate(60 55)">
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`aw-heraldic-ray-${i}`}
            d="M0,-22 C3,-15 3,-8 0,-2 C-3,-8 -3,-15 0,-22"
            fill="url(#aw-hl-main)"
            opacity="0.7"
            transform={`rotate(${i * 45})`}
          />
        ))}
      </g>
      <path d="M60 38 L65 49 L77 50 L68 58 L70 70 L60 64 L50 70 L52 58 L43 50 L55 49 Z" fill="url(#aw-hl-accent)" opacity="0.95" />
      <circle cx="60" cy="55" r="3.5" fill="#fff5dc" />
    </svg>
  );
}

export default function AwariconMark({ size = 24, className = '', variant = 'crystal' }: AwariconMarkProps) {
  const wrapperClass = `inline-block ${className}`.trim();
  return (
    <span className={wrapperClass} style={{ width: size, height: size }}>
      {variant === 'luxury' && <LuxuryMark className="h-full w-full" />}
      {variant === 'heraldic' && <HeraldicMark className="h-full w-full" />}
      {variant === 'crystal' && <CrystalMark className="h-full w-full" />}
    </span>
  );
}