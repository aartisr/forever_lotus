import type { AwariconTier } from '@/content/awaricon';
import { awariconCopyright } from '@/content/awaricon';

function normalizeId(value: string): string {
  return value.replace(/[^a-z0-9-_]/gi, '').toLowerCase();
}

export function buildAwariconBadgeSvgMarkup(
  tier: AwariconTier,
  ids: { gradId: string; haloId: string; shineId: string }
): string {
  const gradId = normalizeId(ids.gradId);
  const haloId = normalizeId(ids.haloId);
  const shineId = normalizeId(ids.shineId);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" role="img" aria-label="${tier.label} badge">
  <metadata>${awariconCopyright.notice}</metadata>
  <defs>
    <radialGradient id="${haloId}" cx="50%" cy="45%" r="58%">
      <stop offset="0%" stop-color="${tier.gradientVia}" stop-opacity="0.95" />
      <stop offset="65%" stop-color="${tier.gradientTo}" stop-opacity="0.38" />
      <stop offset="100%" stop-color="${tier.gradientTo}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="${gradId}" x1="10%" y1="8%" x2="88%" y2="92%">
      <stop offset="0%" stop-color="${tier.gradientFrom}" />
      <stop offset="48%" stop-color="${tier.gradientVia}" />
      <stop offset="100%" stop-color="${tier.gradientTo}" />
    </linearGradient>
    <linearGradient id="${shineId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7" />
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>
  </defs>

  <circle cx="180" cy="180" r="156" fill="url(#${haloId})" />
  <circle cx="180" cy="180" r="132" fill="rgba(11,12,21,0.92)" stroke="url(#${gradId})" stroke-width="8" />
  <circle cx="180" cy="180" r="111" fill="rgba(10,11,19,0.85)" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

  <g fill="url(#${gradId})" opacity="0.82" stroke="rgba(255,255,255,0.16)" stroke-width="1.2" transform="translate(180 180)">
    <path d="M0,-66 C10,-46 10,-30 0,-16 C-10,-30 -10,-46 0,-66" />
    <path d="M0,-66 C10,-46 10,-30 0,-16 C-10,-30 -10,-46 0,-66" transform="rotate(45)" />
    <path d="M0,-66 C10,-46 10,-30 0,-16 C-10,-30 -10,-46 0,-66" transform="rotate(90)" />
    <path d="M0,-66 C10,-46 10,-30 0,-16 C-10,-30 -10,-46 0,-66" transform="rotate(135)" />
    <path d="M0,-66 C10,-46 10,-30 0,-16 C-10,-30 -10,-46 0,-66" transform="rotate(180)" />
    <path d="M0,-66 C10,-46 10,-30 0,-16 C-10,-30 -10,-46 0,-66" transform="rotate(225)" />
    <path d="M0,-66 C10,-46 10,-30 0,-16 C-10,-30 -10,-46 0,-66" transform="rotate(270)" />
    <path d="M0,-66 C10,-46 10,-30 0,-16 C-10,-30 -10,-46 0,-66" transform="rotate(315)" />
  </g>

  <circle cx="180" cy="180" r="52" fill="rgba(7,8,14,0.94)" stroke="url(#${gradId})" stroke-width="3" />
  <path d="M180 148 L191 170 L215 174 L197 191 L201 215 L180 204 L159 215 L163 191 L145 174 L169 170 Z" fill="url(#${gradId})" opacity="0.98" stroke="rgba(8,9,16,0.45)" stroke-width="2" />
  <g fill="#fff5c6" opacity="0.9">
    <path d="M180 118 L184 126 L193 127 L186 133 L188 142 L180 138 L172 142 L174 133 L167 127 L176 126 Z" />
    <path d="M226 180 L230 188 L239 189 L232 195 L234 204 L226 200 L218 204 L220 195 L213 189 L222 188 Z" />
    <path d="M134 180 L138 188 L147 189 L140 195 L142 204 L134 200 L126 204 L128 195 L121 189 L130 188 Z" />
  </g>
  <circle cx="180" cy="180" r="18" fill="url(#${shineId})" opacity="0.5" />

  <text x="180" y="292" text-anchor="middle" fill="${tier.gradientFrom}" font-size="16" font-weight="700" letter-spacing="2.6">${tier.metal.toUpperCase()}</text>
  <text x="180" y="336" text-anchor="middle" fill="rgba(255,255,255,0.42)" font-size="8" letter-spacing="1.2">${awariconCopyright.notice}</text>
</svg>`;
}