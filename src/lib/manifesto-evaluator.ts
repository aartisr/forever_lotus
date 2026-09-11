/**
 * Forever Lotus Manifesto Evaluator
 *
 * Generic, extensible engine to evaluate websites/pages against manifesto principles.
 * Philosophy: Compassionate evaluation focused on growth, not judgment.
 *
 * Core Principles Assessed:
 * 1. Compassion & Non-Domination
 * 2. Kindness Without Expectation
 * 3. Earth Consciousness & Stewardship
 * 4. Dignity & Empowerment
 * 5. Education & Liberation
 * 6. Peace & Inner Harmony
 * 7. Transparency & Agency
 */

export type ManifestoPrinciple =
  | 'compassion'
  | 'kindness'
  | 'earth-consciousness'
  | 'humanitarian-dignity'
  | 'education'
  | 'peace-harmony'
  | 'transparency';

export type CriteriaGrade = 'excellent' | 'good' | 'fair' | 'needs-improvement' | 'not-assessed';

export interface CriteriaMeasurement {
  id: string;
  principle: ManifestoPrinciple;
  name: string;
  description: string;
  grade: CriteriaGrade;
  score: number; // 0-100
  evidence: string[];
  recommendations: string[];
  weight: number; // 1-10, importance factor
}

export interface PageEvaluation {
  url: string;
  title: string;
  pageType: 'homepage' | 'content' | 'resources' | 'contact' | 'other';
  timestamp: string;
  overall_score: number; // 0-100
  criteria: CriteriaMeasurement[];
  passed_criteria: number;
  total_criteria: number;
  impact_summary: string;
  next_steps: string[];
  links: {
    total: number;
    internal: number;
    external: number;
    broken: number;
  };
}

export interface WebsiteEvaluationResult {
  website_name: string;
  website_url: string;
  evaluation_date: string;
  overall_compliance_score: number; // 0-100, weighted average
  total_pages_evaluated: number;
  pages: PageEvaluation[];
  principle_scores: Record<ManifestoPrinciple, number>; // 0-100 per principle
  summary: {
    strengths: string[];
    opportunities: string[];
    critical_actions: string[];
    compliance_status: 'compliant' | 'mostly-compliant' | 'needs-work' | 'not-assessed';
  };
  submission_checklist_mapping: SubmissionChecklistResult[];
  evaluation_metadata: {
    evaluator_version: string;
    methodology: string;
    confidence_level: number; // 0-100
    limitations: string[];
  };
}

export interface SubmissionChecklistResult {
  field: string;
  status: 'met' | 'partial' | 'unmet' | 'not-applicable';
  evidence: string;
  recommendations: string[];
}

/**
 * Core Criteria Library - Maps manifesto principles to evaluable criteria
 */
export const MANIFESTO_CRITERIA: Record<ManifestoPrinciple, CriteriaMeasurement[]> = {
  compassion: [
    {
      id: 'comp-001',
      principle: 'compassion',
      name: 'Non-Extractive Language',
      description: 'Website avoids manipulative, fear-based, or extractive messaging',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 9,
    },
    {
      id: 'comp-002',
      principle: 'compassion',
      name: 'Accessibility First',
      description: 'Content is accessible to diverse abilities (WCAG compliance, alt text, captions)',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 8,
    },
    {
      id: 'comp-003',
      principle: 'compassion',
      name: 'Inclusive Design',
      description: 'Design and messaging welcome and center marginalized voices',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 7,
    },
  ],
  kindness: [
    {
      id: 'kind-001',
      principle: 'kindness',
      name: 'Authentic Purpose',
      description: 'Organization purpose is clear, not hidden behind corporate jargon',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 9,
    },
    {
      id: 'kind-002',
      principle: 'kindness',
      name: 'No Dark Patterns',
      description: 'User experience avoids dark patterns, addiction tactics, or deceptive flows',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 8,
    },
    {
      id: 'kind-003',
      principle: 'kindness',
      name: 'One-Way Value',
      description: 'Service provides value to visitors without requiring extraction of personal data or attention',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 7,
    },
  ],
  'earth-consciousness': [
    {
      id: 'earth-001',
      principle: 'earth-consciousness',
      name: 'Environmental Statement',
      description: 'Organization acknowledges environmental responsibility or stewardship',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 8,
    },
    {
      id: 'earth-002',
      principle: 'earth-consciousness',
      name: 'Sustainable Practices',
      description: 'Website demonstrates commitment to sustainability (carbon-aware hosting, minimal bloat, etc.)',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 7,
    },
    {
      id: 'earth-003',
      principle: 'earth-consciousness',
      name: 'Supply Chain Transparency',
      description: 'Organization communicates supply chain ethics or sourcing practices',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 6,
    },
  ],
  'humanitarian-dignity': [
    {
      id: 'dignity-001',
      principle: 'humanitarian-dignity',
      name: 'Empowerment, Not Dependency',
      description: 'Content empowers users/beneficiaries with agency and education, not relief theater',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 9,
    },
    {
      id: 'dignity-002',
      principle: 'humanitarian-dignity',
      name: 'Respect & Autonomy',
      description: 'Website respects user choice and autonomy (no forced signup, clear opt-outs)',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 8,
    },
    {
      id: 'dignity-003',
      principle: 'humanitarian-dignity',
      name: 'Voice & Representation',
      description: 'Beneficiaries and affected communities have voice in narrative and decision-making',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 8,
    },
  ],
  education: [
    {
      id: 'edu-001',
      principle: 'education',
      name: 'Knowledge Liberation',
      description: 'Educational content aims to expand agency and critical thinking, not credential gatekeeping',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 9,
    },
    {
      id: 'edu-002',
      principle: 'education',
      name: 'Accessible Learning',
      description: 'Learning resources are free, open, or low-cost; multilingual where possible',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 8,
    },
    {
      id: 'edu-003',
      principle: 'education',
      name: 'Skill & Agency Growth',
      description: 'Education content produces skills, discernment, or agency, not just information',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 8,
    },
  ],
  'peace-harmony': [
    {
      id: 'peace-001',
      principle: 'peace-harmony',
      name: 'Conflict-Aware Communication',
      description: 'Website communication reduces polarization, acknowledges nuance and complexity',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 7,
    },
    {
      id: 'peace-002',
      principle: 'peace-harmony',
      name: 'Transparency & Trust',
      description: 'Organization practices transparency in data, decision-making, and communication',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 8,
    },
    {
      id: 'peace-003',
      principle: 'peace-harmony',
      name: 'Inner Practice',
      description: 'Organization demonstrates interior maturity through calm, clear, unhurried communication',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 6,
    },
  ],
  transparency: [
    {
      id: 'trans-001',
      principle: 'transparency',
      name: 'Clear Ownership & Identity',
      description: 'Organization ownership, leadership, and primary purpose are clearly stated',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 9,
    },
    {
      id: 'trans-002',
      principle: 'transparency',
      name: 'Privacy & Data Policy',
      description: 'Privacy policy is clear, minimal data collection, no deceptive tracking',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 9,
    },
    {
      id: 'trans-003',
      principle: 'transparency',
      name: 'Impact Metrics',
      description: 'Organization shares measurable impact metrics, not just vanity metrics',
      grade: 'not-assessed',
      score: 0,
      evidence: [],
      recommendations: [],
      weight: 7,
    },
  ],
};

/**
 * Grade Scoring - map qualitative grades to numerical scores
 */
export const GRADE_SCORES: Record<CriteriaGrade, number> = {
  excellent: 95,
  good: 80,
  fair: 60,
  'needs-improvement': 30,
  'not-assessed': 0,
};

/**
 * Calculate principle-level score from all criteria
 */
export function calculatePrincipleScore(
  criteria: CriteriaMeasurement[],
  principle: ManifestoPrinciple
): number {
  const principleCriteria = criteria.filter((c) => c.principle === principle);
  if (!principleCriteria.length) return 0;

  const weightedSum = principleCriteria.reduce((sum, c) => sum + c.score * c.weight, 0);
  const totalWeight = principleCriteria.reduce((sum, c) => sum + c.weight, 0);

  return Math.round(weightedSum / totalWeight);
}

/**
 * Calculate overall compliance score (weighted by principle importance)
 */
export function calculateOverallComplianceScore(
  principleScores: Record<ManifestoPrinciple, number>
): number {
  const principles = Object.entries(principleScores);
  if (!principles.length) return 0;

  // Weight principles - all equal for now, can be customized per evaluation context
  const principleWeights: Record<ManifestoPrinciple, number> = {
    compassion: 10,
    kindness: 10,
    'earth-consciousness': 8,
    'humanitarian-dignity': 10,
    education: 8,
    'peace-harmony': 8,
    transparency: 10,
  };

  const weightedSum = principles.reduce((sum, [principle, score]) => {
    return sum + score * (principleWeights[principle as ManifestoPrinciple] || 1);
  }, 0);

  const totalWeight = Object.values(principleWeights).reduce((sum, w) => sum + w, 0);

  return Math.round(weightedSum / totalWeight);
}

/**
 * Map submission checklist fields to evaluation results
 * Generic: can be extended for different submission types
 */
export function mapChecklistToEvaluation(
  pages: PageEvaluation[],
  principleScores: Record<ManifestoPrinciple, number>
): SubmissionChecklistResult[] {
  const checklist: SubmissionChecklistResult[] = [
    {
      field: 'Website name',
      status: pages.length > 0 ? 'met' : 'unmet',
      evidence: pages[0]?.title || 'Not found',
      recommendations: [],
    },
    {
      field: 'Primary URL',
      status: pages.length > 0 ? 'met' : 'unmet',
      evidence: pages[0]?.url || 'Not found',
      recommendations: [],
    },
    {
      field: 'Mission alignment with compassion, dignity, and non-extractive impact',
      status: principleScores.compassion >= 70 && principleScores['humanitarian-dignity'] >= 70 ? 'met' : 'partial',
      evidence: `Compassion: ${principleScores.compassion}%, Dignity: ${principleScores['humanitarian-dignity']}%`,
      recommendations:
        principleScores.compassion < 70 ? ['Reduce manipulative messaging; focus on authentic value.'] : [],
    },
    {
      field: 'Transparent identity, ownership, and primary purpose',
      status: principleScores.transparency >= 75 ? 'met' : 'partial',
      evidence: `Transparency Score: ${principleScores.transparency}%`,
      recommendations: principleScores.transparency < 75 ? ['Clarify ownership and primary purpose on homepage/about.'] : [],
    },
    {
      field: 'No harmful, manipulative, or exploitative patterns',
      status: principleScores.kindness >= 75 ? 'met' : 'partial',
      evidence: `Kindness/UX Score: ${principleScores.kindness}%`,
      recommendations:
        principleScores.kindness < 75
          ? ['Remove dark patterns, deceptive flows, or aggressive email tactics.']
          : [],
    },
    {
      field: 'Constructive value to education, wellbeing, peace, or stewardship',
      status:
        principleScores.education >= 70 ||
        principleScores['peace-harmony'] >= 70 ||
        principleScores['earth-consciousness'] >= 70
          ? 'met'
          : 'partial',
      evidence: `Education: ${principleScores.education}%, Peace: ${principleScores['peace-harmony']}%, Earth: ${principleScores['earth-consciousness']}%`,
      recommendations: ['Highlight and amplify educational or stewardship initiatives.'],
    },
  ];

  return checklist;
}

/**
 * Determine compliance status based on overall score
 */
export function getComplianceStatus(
  score: number
): 'compliant' | 'mostly-compliant' | 'needs-work' | 'not-assessed' {
  if (score >= 80) return 'compliant';
  if (score >= 60) return 'mostly-compliant';
  if (score > 0) return 'needs-work';
  return 'not-assessed';
}

/**
 * Initialize blank evaluation result - ready to be filled with assessment data
 */
export function createBlankEvaluation(
  website_name: string,
  website_url: string
): WebsiteEvaluationResult {
  const allCriteria = Object.values(MANIFESTO_CRITERIA).flat();

  return {
    website_name,
    website_url,
    evaluation_date: new Date().toISOString(),
    overall_compliance_score: 0,
    total_pages_evaluated: 0,
    pages: [],
    principle_scores: {
      compassion: 0,
      kindness: 0,
      'earth-consciousness': 0,
      'humanitarian-dignity': 0,
      education: 0,
      'peace-harmony': 0,
      transparency: 0,
    } as Record<ManifestoPrinciple, number>,
    summary: {
      strengths: [],
      opportunities: [],
      critical_actions: [],
      compliance_status: 'not-assessed',
    },
    submission_checklist_mapping: [],
    evaluation_metadata: {
      evaluator_version: '1.0.0',
      methodology: 'Generic Manifesto Alignment Assessment v1',
      confidence_level: 0,
      limitations: [],
    },
  };
}

/**
 * Finalize evaluation - calculate scores, mapping, and recommendations
 */
export function finalizeEvaluation(
  evaluation: WebsiteEvaluationResult
): WebsiteEvaluationResult {
  // Calculate principle scores
  const allCriteria = evaluation.pages.flatMap((p) => p.criteria);

  const principles: ManifestoPrinciple[] = [
    'compassion',
    'kindness',
    'earth-consciousness',
    'humanitarian-dignity',
    'education',
    'peace-harmony',
    'transparency',
  ];

  principles.forEach((principle) => {
    evaluation.principle_scores[principle] = calculatePrincipleScore(allCriteria, principle);
  });

  // Calculate overall score
  evaluation.overall_compliance_score = calculateOverallComplianceScore(evaluation.principle_scores);
  evaluation.summary.compliance_status = getComplianceStatus(evaluation.overall_compliance_score);

  // Map to submission checklist
  evaluation.submission_checklist_mapping = mapChecklistToEvaluation(
    evaluation.pages,
    evaluation.principle_scores
  );

  // Generate summary insights
  const sortedScores = Object.entries(evaluation.principle_scores)
    .map(([principle, score]) => ({ principle, score }))
    .sort((a, b) => b.score - a.score);

  evaluation.summary.strengths = sortedScores
    .slice(0, 2)
    .map((p) => `Strong ${p.principle.replace('-', ' ')} focus (${p.score}%)`);

  evaluation.summary.opportunities = sortedScores
    .slice(-2)
    .map((p) => `Opportunity to deepen ${p.principle.replace('-', ' ')} (${p.score}%)`);

  // Set confidence based on pages evaluated
  evaluation.evaluation_metadata.confidence_level = Math.min(
    100,
    Math.round((evaluation.total_pages_evaluated / 5) * 100)
  );

  if (evaluation.total_pages_evaluated < 3) {
    evaluation.evaluation_metadata.limitations.push(
      'Limited page sample - evaluate more pages for higher confidence'
    );
  }

  return evaluation;
}
