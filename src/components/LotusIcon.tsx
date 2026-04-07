import React from 'react';

interface LotusIconProps {
  size?: number;
  className?: string;
  variant?: 'nav' | 'hero' | 'section';
}

function PetalRing({
  count,
  rotationOffset,
  d,
  fill,
}: {
  count: number;
  rotationOffset: number;
  d: string;
  fill: string;
}) {
  return (
    <g transform="translate(60,60)">
      {Array.from({ length: count }).map((_, i) => (
        <path key={`${count}-${i}`} d={d} fill={fill} transform={`rotate(${rotationOffset + (360 / count) * i})`} />
      ))}
    </g>
  );
}

export default function LotusIcon({ size = 36, className = '', variant = 'nav' }: LotusIconProps) {
  if (variant === 'hero') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className={className}
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fl-gold-hero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F6D27A" />
            <stop offset="100%" stopColor="#BC8B2C" />
          </linearGradient>
          <linearGradient id="fl-pink-hero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0A2C2" />
            <stop offset="100%" stopColor="#D871A2" />
          </linearGradient>
          <linearGradient id="fl-seed-hero" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE6B2" />
            <stop offset="100%" stopColor="#C99733" />
          </linearGradient>
          <radialGradient id="fl-glow-hero" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 56) rotate(90) scale(34)">
            <stop offset="0%" stopColor="#F6D27A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F6D27A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="60" cy="56" r="34" fill="url(#fl-glow-hero)" />

        <g style={{ animation: 'lotusSpin 120s linear infinite', transformOrigin: '60px 60px' }}>
          <PetalRing count={8} rotationOffset={0} d="M 60 60 C 52 40, 55 20, 60 7 C 65 20, 68 40, 60 60" fill="url(#fl-gold-hero)" />
        </g>

        <g style={{ animation: 'lotusSpinCounter 150s linear infinite', transformOrigin: '60px 60px' }}>
          <PetalRing count={8} rotationOffset={22.5} d="M 60 60 C 55 46, 57 32, 60 22 C 63 32, 65 46, 60 60" fill="url(#fl-pink-hero)" />
        </g>

        <path d="M 60 60 C 56 50, 57 41, 60 34 C 63 41, 64 50, 60 60" fill="#FDE3A1" />

        <circle cx="60" cy="60" r="6.6" fill="url(#fl-seed-hero)" />
        <circle cx="60" cy="60" r="2.4" fill="#2E1D06" fillOpacity="0.35" />

        {/* Rooted base: the flower rises from water without carrying the mud. */}
        <path d="M 24 79 C 36 72, 47 71, 60 75 C 73 71, 84 72, 96 79" stroke="#E8B85B" strokeOpacity="0.8" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 30 86 C 42 81, 52 80, 60 82 C 68 80, 78 81, 90 86" stroke="#7CC2B7" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
        <path d="M 56 82 L 54 92" stroke="#DFA241" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 64 82 L 66 92" stroke="#DFA241" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'section') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className={className}
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fl-gold-section" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F4CE74" />
            <stop offset="100%" stopColor="#B7842A" />
          </linearGradient>
          <linearGradient id="fl-pink-section" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EFA1C0" />
            <stop offset="100%" stopColor="#D56A9A" />
          </linearGradient>
        </defs>

        <PetalRing count={8} rotationOffset={0} d="M 60 60 C 52 40, 55 20, 60 7 C 65 20, 68 40, 60 60" fill="url(#fl-gold-section)" />
        <PetalRing count={8} rotationOffset={22.5} d="M 60 60 C 55 46, 57 32, 60 22 C 63 32, 65 46, 60 60" fill="url(#fl-pink-section)" />
        <circle cx="60" cy="60" r="6" fill="#D19B39" />
        <path d="M 24 79 C 36 72, 47 71, 60 75 C 73 71, 84 72, 96 79" stroke="#E4B355" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 30 86 C 42 81, 52 80, 60 82 C 68 80, 78 81, 90 86" stroke="#79BEB2" strokeOpacity="0.85" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Nav variant – minimal manifesto mark.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fl-gold-nav" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2CB71" />
          <stop offset="100%" stopColor="#B7842A" />
        </linearGradient>
        <linearGradient id="fl-pink-nav" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0ABC8" />
          <stop offset="100%" stopColor="#D66C9D" />
        </linearGradient>
      </defs>

      <PetalRing count={4} rotationOffset={0} d="M 60 60 C 54 44, 56 28, 60 16 C 64 28, 66 44, 60 60" fill="url(#fl-gold-nav)" />
      <PetalRing count={4} rotationOffset={45} d="M 60 60 C 56 49, 57 39, 60 31 C 63 39, 64 49, 60 60" fill="url(#fl-pink-nav)" />

      <circle cx="60" cy="60" r="5.2" fill="#D29A37" />
      <circle cx="60" cy="60" r="5.2" stroke="#1A122B" strokeOpacity="0.35" strokeWidth="1" />

      <path d="M 39 81 C 46 76.5, 53 75.8, 60 78 C 67 75.8, 74 76.5, 81 81" stroke="#84CDC0" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
