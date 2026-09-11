import { awariconFormula, awariconTiers } from '@/content/awaricon';
import { INTEGRITY_INDICATORS } from '@/lib/awariconCertification';

export interface PublicAwariconCertificationPayload {
  standard: string;
  version: string;
  formula: string;
  scoring: {
    scale: string;
    components: {
      phi: string;
      df: string;
      omega: string;
      integrity: string;
    };
  };
  levels: Array<{
    key: string;
    label: string;
    metal: string;
    scoreRange: string;
    minScore: number;
    maxScore: number;
    claim: string;
    manifestoFit: string;
    visual: {
      gradientFrom: string;
      gradientVia: string;
      gradientTo: string;
      aura: string;
      sigil: string;
    };
  }>;
  complianceChecklist: Array<{
    key: string;
    requirement: string;
  }>;
  publishedAt: string;
}

export function buildPublicAwariconCertificationPayload(): PublicAwariconCertificationPayload {
  const levels = awariconTiers.map((tier) => ({
    key: tier.key,
    label: tier.label,
    metal: tier.metal,
    scoreRange: tier.scoreRange,
    minScore: tier.minScore,
    maxScore: tier.maxScore,
    claim: tier.claim,
    manifestoFit: tier.manifestoFit,
    visual: {
      gradientFrom: tier.gradientFrom,
      gradientVia: tier.gradientVia,
      gradientTo: tier.gradientTo,
      aura: tier.aura,
      sigil: tier.sigil,
    },
  }));

  const complianceChecklist = INTEGRITY_INDICATORS.map((indicator) => ({
    key: indicator.key,
    requirement: indicator.label,
  }));

  return {
    standard: 'Awaricon Certification',
    version: '2026.1',
    formula: awariconFormula,
    scoring: {
      scale: '0-100',
      components: {
        phi: 'Presence quality (0-10), weighted 35%',
        df: 'Dignity fidelity (0-10), weighted 35%',
        omega: 'Operating maturity (0-10), weighted 20%',
        integrity: 'Integrity checklist completion (0-10), weighted 10%',
      },
    },
    levels,
    complianceChecklist,
    publishedAt: new Date().toISOString(),
  };
}
