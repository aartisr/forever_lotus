import React from 'react';

interface LotusIconProps {
  size?: number;
  className?: string;
  variant?: 'nav' | 'hero' | 'section';
}

export default function LotusIcon({ size = 36, className = '', variant = 'nav' }: LotusIconProps) {
  if (variant === 'hero') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        className={className}
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring – 16 petals, slow CW rotation */}
        <g
          transform="translate(200,200)"
          style={{ animation: 'lotusSpin 90s linear infinite', transformOrigin: '0 0' }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`outer-${i}`}
              d="M 0 0 C -16 -50, -10 -110, 0 -155 C 10 -110, 16 -50, 0 0"
              fill="rgba(201,168,76,0.13)"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* Middle ring – 8 petals, slow CCW rotation */}
        <g
          transform="translate(200,200)"
          style={{ animation: 'lotusSpinCounter 120s linear infinite', transformOrigin: '0 0' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={`mid-${i}`}
              d="M 0 0 C -14 -40, -10 -85, 0 -115 C 10 -85, 14 -40, 0 0"
              fill="rgba(201,168,76,0.22)"
              transform={`rotate(${i * 45 + 22.5})`}
            />
          ))}
        </g>

        {/* Inner ring – 8 petals, lotus pink */}
        <g
          transform="translate(200,200)"
          style={{ animation: 'lotusSpin 60s linear infinite', transformOrigin: '0 0' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={`inner-${i}`}
              d="M 0 0 C -10 -25, -7 -55, 0 -72 C 7 -55, 10 -25, 0 0"
              fill="rgba(232,135,166,0.35)"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>

        {/* Center seed mandala */}
        <circle cx="200" cy="200" r="28" fill="rgba(201,168,76,0.18)" />
        <circle cx="200" cy="200" r="18" fill="rgba(201,168,76,0.30)" />
        <circle cx="200" cy="200" r="9" fill="rgba(232,135,166,0.6)" />
        <circle cx="200" cy="200" r="4" fill="rgba(240,198,80,0.9)" />
      </svg>
    );
  }

  if (variant === 'section') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        className={className}
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(40,40)">
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M 0 0 C -6 -12, -4 -24, 0 -32 C 4 -24, 6 -12, 0 0"
              fill="rgba(201,168,76,0.5)"
              transform={`rotate(${i * 45})`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={`inner-${i}`}
              d="M 0 0 C -4 -8, -3 -14, 0 -18 C 3 -14, 4 -8, 0 0"
              fill="rgba(232,135,166,0.7)"
              transform={`rotate(${i * 45 + 22.5})`}
            />
          ))}
        </g>
        <circle cx="40" cy="40" r="6" fill="rgba(201,168,76,0.9)" />
      </svg>
    );
  }

  // Nav variant – minimal, crisp
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(24,24)">
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d="M 0 0 C -4 -7, -3 -16, 0 -21 C 3 -16, 4 -7, 0 0"
            fill="rgba(201,168,76,0.8)"
            transform={`rotate(${i * 45})`}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`i-${i}`}
            d="M 0 0 C -3 -5, -2 -9, 0 -12 C 2 -9, 3 -5, 0 0"
            fill="rgba(232,135,166,0.8)"
            transform={`rotate(${i * 45 + 22.5})`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="3.5" fill="#c9a84c" />
    </svg>
  );
}
