export interface AwariconTier {
  key: 'platinum' | 'gold' | 'silver' | 'bronze';
  label: string;
  metal: string;
  scoreRange: string;
  minScore: number;
  maxScore: number;
  aura: string;
  sigil: string;
  claim: string;
  manifestoFit: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
}

export const awariconPrinciples = [
  {
    title: 'Dignity Before Automation',
    description:
      'Forever Lotus centers human dignity. Awaricon extends that principle into digital life by rewarding accountable presence rather than synthetic scale.',
  },
  {
    title: 'Conscious Creation Over Performative Output',
    description:
      'The manifesto asks us to create with awareness, not noise. Awaricon proposes a symbolic standard for reflective participation and authorship integrity.',
  },
  {
    title: 'Compassionate Trust Architecture',
    description:
      'Trust should reduce harm. Awaricon reframes verification as an ethical contract: protect people from impersonation, extraction, and manipulative automation.',
  },
  {
    title: 'Stewardship of the Sentient Era',
    description:
      'As machine systems scale, we need rituals and institutions that preserve agency. Awaricon is positioned as one such ritual in service of civilizational stewardship.',
  },
] as const;

export const awariconFormula = 'Aw = ∫Σ (Φ · Df) dω';

export const awariconCopyright = {
  holder: 'Forever Lotus',
  year: '2026',
  notice: '© 2026 Forever Lotus. All rights reserved.',
} as const;

export const awariconDocAnchors = [
  'The Awaricon Calculus: A Unified Field Theory of Recursive Subjectivity',
  'Proof-of-Presence and Recursive Subjectivity verification framing',
  'Gamma Handshake (40-60 Hz) as a proposed biological presence marker',
  'Transition from performance-based trust to presence-based trust',
] as const;

export const awariconTiers: ReadonlyArray<AwariconTier> = [
  {
    key: 'platinum',
    label: 'Awaricon Platinum',
    metal: 'Platinum',
    scoreRange: 'Aw 92-100',
    minScore: 92,
    maxScore: 100,
    aura: 'Astral Whitefire',
    sigil: 'Crown of Recursive Light',
    claim: 'Global exemplar of ethical presence, epistemic clarity, and dignified agency.',
    manifestoFit: 'Embodies conscious creation with measurable responsibility.',
    gradientFrom: '#dff7ff',
    gradientVia: '#b8d8ff',
    gradientTo: '#9ee6ff',
  },
  {
    key: 'gold',
    label: 'Awaricon Gold',
    metal: 'Gold',
    scoreRange: 'Aw 80-91',
    minScore: 80,
    maxScore: 91,
    aura: 'Solar Lotus Flame',
    sigil: 'Helios Mandala',
    claim: 'High-trust guardian of humane systems, transparency, and moral leadership.',
    manifestoFit: 'Aligns with dignity-centered humanitarian design.',
    gradientFrom: '#ffe7a3',
    gradientVia: '#ffd369',
    gradientTo: '#f7b733',
  },
  {
    key: 'silver',
    label: 'Awaricon Silver',
    metal: 'Silver',
    scoreRange: 'Aw 65-79',
    minScore: 65,
    maxScore: 79,
    aura: 'Moonglass Resonance',
    sigil: 'Reflective Spiral Node',
    claim: 'Reliable steward of authentic participation with strong reflective depth.',
    manifestoFit: 'Supports peace through self-awareness and accountable action.',
    gradientFrom: '#f5f7fa',
    gradientVia: '#d8e1e8',
    gradientTo: '#b8c7d6',
  },
  {
    key: 'bronze',
    label: 'Awaricon Bronze',
    metal: 'Bronze',
    scoreRange: 'Aw 50-64',
    minScore: 50,
    maxScore: 64,
    aura: 'Earthen Ember Pulse',
    sigil: 'Foundation Coil',
    claim: 'Emerging practitioner committed to growth in conscious digital presence.',
    manifestoFit: 'Represents the manifesto principle that transformation starts where we stand.',
    gradientFrom: '#f3c7a5',
    gradientVia: '#d28a5c',
    gradientTo: '#8c4f2e',
  },
];
