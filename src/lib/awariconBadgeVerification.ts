import { createHmac, timingSafeEqual } from 'crypto';
import { isApprovedSite, listApprovedSites } from '@/lib/awariconApprovalRegistry';

interface BadgeSignatureInput {
  tier: string;
  site: string;
  exp: number;
}

export interface BadgeTokenPayload extends BadgeSignatureInput {
  sig: string;
}

export function normalizeSite(input: string): string | null {
  const raw = input.trim();
  if (!raw) {
    return null;
  }

  try {
    const parsed = raw.includes('://') ? new URL(raw) : new URL(`https://${raw}`);
    return parsed.hostname.toLowerCase();
  } catch {
    return null;
  }
}

export async function getApprovedSites(): Promise<string[]> {
  return listApprovedSites();
}

export async function isSiteApproved(site: string): Promise<boolean> {
  return isApprovedSite(site);
}

export function buildBadgeSignaturePayload(input: BadgeSignatureInput): string {
  return `${input.tier}:${input.site}:${input.exp}`;
}

export function signBadgePayload(input: BadgeSignatureInput, secret: string): string {
  const payload = buildBadgeSignaturePayload(input);
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function verifyBadgeSignature(payload: BadgeTokenPayload, secret: string): boolean {
  const expected = signBadgePayload(payload, secret);

  const expectedBuffer = Buffer.from(expected, 'hex');
  const actualBuffer = Buffer.from(payload.sig, 'hex');
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}