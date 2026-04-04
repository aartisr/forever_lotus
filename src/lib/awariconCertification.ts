import { awariconTiers } from '@/content/awaricon';
import type { EntityRecord } from '@/services/data-layer/types';

// ── Status ────────────────────────────────────────────────────────────────────

export type CertificationStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'revoked';

// ── Integrity indicators ──────────────────────────────────────────────────────

export const INTEGRITY_INDICATORS = [
  { key: 'no_dark_patterns', label: 'No dark patterns or manipulative UX' },
  { key: 'privacy_first', label: 'Privacy-first design (no invasive tracking)' },
  { key: 'accessible', label: 'Accessible to all users (WCAG 2.1 AA or above)' },
  { key: 'human_authored', label: 'Content is human-authored or transparently AI-assisted' },
  { key: 'ethical_data', label: 'Ethical data practices (no unauthorized resale or harvesting)' },
  { key: 'clear_ownership', label: 'Clear authorship and organizational accountability' },
] as const;

export type IntegrityKey = typeof INTEGRITY_INDICATORS[number]['key'];

// ── Input ─────────────────────────────────────────────────────────────────────

export interface AwariconApplicationInput {
  /** Public URL of the applying website (normalized to domain on save). */
  site: string;
  organizationName: string;
  contactEmail: string;
  /** Short description of mission / purpose (max 500 chars). */
  description: string;
  /** Self-assessed Phi (presence quality) 0–10. */
  phi: number;
  /** Self-assessed Df (dignity fidelity) 0–10. */
  df: number;
  /** How many years the website/organization has been operating. */
  operatingYears: number;
  /** Checked integrity indicator keys. */
  integrityFlags: IntegrityKey[];
  /** Supporting statement / mission essay (max 1500 chars). */
  statement: string;
  /** Optional tier the applicant believes they qualify for. */
  tierRequested?: string;
}

// ── Record ────────────────────────────────────────────────────────────────────

export interface AwariconCertificationRecord extends EntityRecord {
  site: string;
  organizationName: string;
  contactEmail: string;
  description: string;
  phi: number;
  df: number;
  operatingYears: number;
  /** Omega (0–10) derived from operatingYears. */
  omega: number;
  /** Integrity score (0–10) derived from integrityFlags. */
  integrity: number;
  /** Computed Aw score (0–100). */
  score: number;
  /** Tier key the system recommends based on score. */
  recommendedTier: string | null;
  integrityFlags: IntegrityKey[];
  statement: string;
  tierRequested?: string;
  status: CertificationStatus;
  /** Set by admin on approval. */
  tierAwarded?: string;
  /** Admin's comments on any review action. */
  reviewNotes?: string;
  /** ISO timestamp of last review action. */
  reviewedAt?: string;
}

// ── Scoring helpers ───────────────────────────────────────────────────────────

/**
 * Derive Omega (0–10) from years of operation.
 * 0 yrs → 1 | 1 yr → 3 | 3 yrs → 6 | 5+ yrs → 8 | 10+ yrs → 10
 */
export function computeOmega(years: number): number {
  if (years <= 0) return 1;
  if (years >= 10) return 10;
  // piecewise linear: 0→1, 5→8, 10→10
  const base = 1 + (years / 5) * 7;
  return Math.min(10, Math.round(base));
}

/**
 * Derive Integrity score (0–10) from checked flags.
 */
export function computeIntegrity(flags: IntegrityKey[]): number {
  const unique = new Set(flags);
  return Math.round((unique.size / INTEGRITY_INDICATORS.length) * 10);
}

/**
 * Compute the Aw score (0–100) using the same weighted formula as the calculator.
 * Aw = weighted average of (Phi 35%, Df 35%, Omega 20%, Integrity 10%) scaled to 100.
 */
export function computeScore(phi: number, df: number, omega: number, integrity: number): number {
  const weighted = phi * 0.35 + df * 0.35 + omega * 0.2 + integrity * 0.1;
  return Math.min(100, Math.max(0, Math.round((weighted / 10) * 100)));
}

/**
 * Return the tier key that corresponds to a given Aw score, or null if below Bronze.
 */
export function determineRecommendedTier(score: number): string | null {
  return awariconTiers.find((t) => score >= t.minScore && score <= t.maxScore)?.key ?? null;
}

// ── Validation ────────────────────────────────────────────────────────────────

export interface ValidationError {
  field: string;
  message: string;
}

export function validateApplicationInput(input: AwariconApplicationInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.site?.trim()) errors.push({ field: 'site', message: 'Website URL is required.' });
  if (!input.organizationName?.trim()) errors.push({ field: 'organizationName', message: 'Organization name is required.' });
  if (!input.contactEmail?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.contactEmail)) {
    errors.push({ field: 'contactEmail', message: 'A valid contact email is required.' });
  }
  if (!input.description?.trim() || input.description.trim().length < 20) {
    errors.push({ field: 'description', message: 'Description must be at least 20 characters.' });
  }
  if (input.phi < 0 || input.phi > 10 || !Number.isFinite(input.phi)) {
    errors.push({ field: 'phi', message: 'Phi (presence quality) must be between 0 and 10.' });
  }
  if (input.df < 0 || input.df > 10 || !Number.isFinite(input.df)) {
    errors.push({ field: 'df', message: 'Df (dignity fidelity) must be between 0 and 10.' });
  }
  if (input.operatingYears < 0 || !Number.isFinite(input.operatingYears)) {
    errors.push({ field: 'operatingYears', message: 'Operating years must be a non-negative number.' });
  }
  if (!input.statement?.trim() || input.statement.trim().length < 50) {
    errors.push({ field: 'statement', message: 'Supporting statement must be at least 50 characters.' });
  }
  if (input.statement?.length > 1500) {
    errors.push({ field: 'statement', message: 'Supporting statement must be 1500 characters or fewer.' });
  }

  return errors;
}

// ── ID generator ──────────────────────────────────────────────────────────────

export function generateApplicationId(): string {
  // Prefix `aw-` so IDs are recognizable in logs/URLs
  return `aw-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
