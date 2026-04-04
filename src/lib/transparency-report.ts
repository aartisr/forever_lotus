import { KpiBaselineRecord } from '@/lib/impact-kpi';

function fmtDate(dateIso: string): string {
  const d = new Date(dateIso);
  return Number.isNaN(d.getTime()) ? dateIso : d.toISOString().slice(0, 10);
}

function pctDelta(current: number, baseline: number): string {
  if (baseline === 0) return 'n/a';
  const delta = ((current - baseline) / Math.abs(baseline)) * 100;
  const sign = delta >= 0 ? '+' : '';
  return `${sign}${delta.toFixed(1)}%`;
}

export function buildTransparencyMarkdown(records: KpiBaselineRecord[]): string {
  const generatedAt = new Date().toISOString();
  const lines: string[] = [];

  lines.push('# Transparency Report (Auto-generated)');
  lines.push('');
  lines.push(`Generated at: ${generatedAt}`);
  lines.push('');
  lines.push('| KPI | Category | Baseline | Current | Delta | Owner | Last Updated |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- |');

  for (const r of records) {
    lines.push(
      `| ${r.title} | ${r.category} | ${r.baseline.value} ${r.baseline.unit} | ${r.current.value} ${r.current.unit} | ${pctDelta(r.current.value, r.baseline.value)} | ${r.owner} | ${fmtDate(r.updatedAt)} |`
    );
  }

  lines.push('');
  lines.push('## Method Notes');
  lines.push('');
  lines.push('- Values are sourced from submitted KPI baseline records.');
  lines.push('- Delta is computed against the baseline value and does not imply causality.');
  lines.push('- Independent validation is required for external impact claims.');

  return lines.join('\n');
}
