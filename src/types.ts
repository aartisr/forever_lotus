export type CategoryId = 
  | 'purpose'
  | 'functionality'
  | 'aesthetic'
  | 'engagement'
  | 'accessibility';

export interface SubMetric {
  id: string;
  name: string;
  currentScore: number; // 1-10
  targetScore: number; // 1-10
  currentObservations: string;
  nobelCadreBenchmark: string;
  actionRequired: string;
}

export interface CategoryEvaluation {
  id: CategoryId;
  title: string;
  subtitle: string;
  score: number; // 1-10
  targetScore: number; // typically 9.5 - 10
  benchmarkInstitution: string;
  executiveSummary: string;
  currentStateAnalysis: string[];
  nobelCadreGaps: string[];
  criticalVulnerabilities: string[];
  enduringStrengths: string[];
  subMetrics: SubMetric[];
  directActionItems: string[];
}

export interface RoadmapMilestone {
  week: string;
  title: string;
  deliverables: string[];
  nobelStandardAchieved: string;
  kpi: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  theme: string;
  timeframe: string;
  milestones: RoadmapMilestone[];
  corePhilosophy: string;
}

export interface ImprovementDomain {
  id: 'ui_ux' | 'content_strategy' | 'mobile_responsiveness';
  title: string;
  badge: string;
  leadParagraph: string;
  principles: {
    title: string;
    description: string;
    nobelExample: string;
  }[];
  specifications: {
    area: string;
    currentLimitation: string;
    nobelCadreStandard: string;
    codeOrDesignSpec: string;
  }[];
}

export interface CanonSource {
  id: string;
  title: string;
  traditionOrField: string;
  yearOrEpoch: string;
  coreInsight: string;
  modernEmpiricalCounterpart: string;
  practicalApplicationInSite: string;
}

export interface OperatingCommitment {
  number: number;
  name: string;
  sanskritOrClassicalMotto: string;
  shortDesc: string;
  fullDoctrinalText: string;
  metricOfVerification: string;
  nobelCadreUXImplementation: string;
}
