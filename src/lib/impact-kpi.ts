export type KpiCategory =
  | 'impact'
  | 'evidence'
  | 'reliability'
  | 'governance'
  | 'adoption';

export interface KpiMeasurement {
  value: number;
  unit: string;
  measuredAt: string;
  source: string;
  notes?: string;
}

export interface KpiBaselineRecord {
  id: string;
  key: string;
  title: string;
  category: KpiCategory;
  owner: string;
  description?: string;
  baseline: KpiMeasurement;
  current: KpiMeasurement;
  target?: KpiMeasurement;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const categories: ReadonlyArray<KpiCategory> = [
  'impact',
  'evidence',
  'reliability',
  'governance',
  'adoption',
];

export function isKpiCategory(value: string): value is KpiCategory {
  return categories.includes(value as KpiCategory);
}

export function normalizeKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
