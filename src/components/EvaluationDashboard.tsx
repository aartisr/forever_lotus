/**
 * Forever Lotus Evaluation Dashboard
 *
 * A visually stunning, encouraging display of manifesto alignment evaluation.
 * Designed to inspire growth and highlight pathways to deeper alignment.
 */

'use client';

import React, { useMemo } from 'react';
import { WebsiteEvaluationResult, ManifestoPrinciple } from '@/lib/manifesto-evaluator';

interface EvalDashboardProps {
  evaluation: WebsiteEvaluationResult;
  locale?: string;
}

const getPrincipleIcon = (principle: ManifestoPrinciple) => {
  const icons: Record<ManifestoPrinciple, string> = {
    compassion: '🤲',
    kindness: '✨',
    'earth-consciousness': '🌿',
    'humanitarian-dignity': '👥',
    education: '📚',
    'peace-harmony': '☮️',
    transparency: '🔓',
  };
  return icons[principle];
};

const getPrincipleLabel = (principle: ManifestoPrinciple) => {
  const labels: Record<ManifestoPrinciple, string> = {
    compassion: 'Compassion & Non-Domination',
    kindness: 'Kindness Without Expectation',
    'earth-consciousness': 'Earth Consciousness',
    'humanitarian-dignity': 'Humanitarian Dignity',
    education: 'Education & Liberation',
    'peace-harmony': 'Peace & Inner Harmony',
    transparency: 'Transparency & Agency',
  };
  return labels[principle];
};

const getScoreColor = (score: number): string => {
  if (score >= 85) return '#10b981'; // emerald
  if (score >= 70) return '#3b82f6'; // blue
  if (score >= 55) return '#f59e0b'; // amber
  return '#ef4444'; // red
};

const getGradeLabel = (score: number): string => {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Fair';
  if (score > 0) return 'Needs Improvement';
  return 'Not Assessed';
};

const ScoreGauge: React.FC<{ score: number; size?: 'sm' | 'lg' }> = ({ score, size = 'sm' }) => {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const radius = size === 'lg' ? 60 : 45;
  const strokeWidth = size === 'lg' ? 6 : 5;
  const circum = 2 * Math.PI * radius;
  const offset = circum - (score / 100) * circum;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size === 'lg' ? 160 : 120}
        height={size === 'lg' ? 160 : 120}
        viewBox={`0 0 ${size === 'lg' ? 160 : 120} ${size === 'lg' ? 160 : 120}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size === 'lg' ? 80 : 60}
          cy={size === 'lg' ? 80 : 60}
          r={radius}
          fill="none"
          stroke="rgba(107,114,128,0.15)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size === 'lg' ? 80 : 60}
          cy={size === 'lg' ? 80 : 60}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circum}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-800"
        />
      </svg>
      <div className={`absolute text-center ${size === 'lg' ? 'text-3xl' : 'text-xl'} font-black`} style={{ color }}>
        {Math.round(score)}%
      </div>
    </div>
  );
};

const PrincipleCard: React.FC<{
  principle: ManifestoPrinciple;
  score: number;
  criteria_met?: number;
  total_criteria?: number;
}> = ({ principle, score, criteria_met = 0, total_criteria = 0 }) => {
  const color = getScoreColor(score);
  const icon = getPrincipleIcon(principle);
  const label = getPrincipleLabel(principle);

  return (
    <div className="rounded-2xl border border-lotus-border-soft bg-white/70 backdrop-blur-sm p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-lotus-cream">{label}</h3>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-black" style={{ color }}>
            {Math.round(score)}%
          </div>
          <p className="text-xs text-lotus-muted mt-1">{getGradeLabel(score)}</p>
        </div>
        <ScoreGauge score={score} />
      </div>
    </div>
  );
};

const OGrade: React.FC<{ score: number }> = ({ score }) => {
  const getGrade = (s: number) => {
    if (s >= 90) return 'A+';
    if (s >= 85) return 'A';
    if (s >= 80) return 'B+';
    if (s >= 75) return 'B';
    if (s >= 70) return 'C+';
    if (s >= 60) return 'C';
    return 'D';
  };

  return (
    <div className="text-center">
      <div className="text-7xl font-black mb-2" style={{ color: getScoreColor(score) }}>
        {getGrade(score)}
      </div>
      <p className="text-lotus-muted text-sm">Overall Alignment Score</p>
    </div>
  );
};

export default function EvaluationDashboard({ evaluation, locale = 'en' }: EvalDashboardProps) {
  const translations = {
    en: {
      overall: 'Overall Manifesto Alignment',
      pages_evaluated: 'Pages Evaluated',
      principles: 'Principle Scores',
      strengths: 'Strengths',
      opportunities: 'Opportunities for Growth',
      critical_actions: 'Critical Next Steps',
      compliance: 'Compliance Status',
      not_assessed: 'Not Assessed',
      compliant: 'Fully Compliant',
      mostly_compliant: 'Mostly Compliant',
      needs_work: 'Needs Work',
      checklist: 'Submission Checklist',
      met: 'Met',
      partial: 'Partial',
      unmet: 'Unmet',
      not_applicable: 'N/A',
    },
    es: {
      overall: 'Alineación General con el Manifiesto',
      pages_evaluated: 'Páginas Evaluadas',
      principles: 'Puntuaciones por Principio',
      strengths: 'Fortalezas',
      opportunities: 'Oportunidades de Crecimiento',
      critical_actions: 'Próximos Pasos Críticos',
      compliance: 'Estado de Cumplimiento',
      not_assessed: 'No Evaluado',
      compliant: 'Totalmente Conforme',
      mostly_compliant: 'Mayormente Conforme',
      needs_work: 'Debe Mejorar',
      checklist: 'Lista de Verificación de Envío',
      met: 'Cumplido',
      partial: 'Parcial',
      unmet: 'No Cumplido',
      not_applicable: 'N/D',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const complianceColors: Record<string, string> = {
    compliant: '#10b981',
    'mostly-compliant': '#3b82f6',
    'needs-work': '#f59e0b',
    'not-assessed': '#9ca3af',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lotus-bg via-[#f5f0e8]/30 to-lotus-bg px-5 py-12 sm:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <p className="eyebrow mb-3">Manifesto Evaluation</p>
          <h1 className="font-serif font-black text-lotus-cream mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {evaluation.website_name}
          </h1>
          <p className="text-lotus-muted text-base mb-4">{evaluation.website_url}</p>
          <p className="text-lotus-muted-2 text-xs">Evaluated {new Date(evaluation.evaluation_date).toLocaleDateString()}</p>
        </div>

        {/* Large Score Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Main Score */}
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="relative">
              <ScoreGauge score={evaluation.overall_compliance_score} size="lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <OGrade score={evaluation.overall_compliance_score} />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {/* Pages */}
            <div className="rounded-2xl border border-lotus-border-soft bg-white/80 p-6">
              <p className="text-lotus-muted-2 text-xs uppercase tracking-widest mb-2">{t.pages_evaluated}</p>
              <p className="text-4xl font-black text-lotus-gold">{evaluation.total_pages_evaluated}</p>
            </div>

            {/* Compliance Status */}
            <div
              className="rounded-2xl border border-lotus-border-soft bg-white/80 p-6"
              style={{
                borderColor: complianceColors[evaluation.summary.compliance_status],
                borderWidth: '3px',
              }}
            >
              <p className="text-lotus-muted-2 text-xs uppercase tracking-widest mb-2">{t.compliance}</p>
              <p
                className="text-lg font-black capitalize"
                style={{ color: complianceColors[evaluation.summary.compliance_status] }}
              >
                {evaluation.summary.compliance_status === 'compliant'
                  ? t.compliant
                  : evaluation.summary.compliance_status === 'mostly-compliant'
                    ? t.mostly_compliant
                    : evaluation.summary.compliance_status === 'needs-work'
                      ? t.needs_work
                      : t.not_assessed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seven Principles Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-lotus-cream mb-1">{t.principles}</h2>
          <p className="text-lotus-muted text-sm">How each manifesto principle is reflected in the website</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.entries(evaluation.principle_scores) as [ManifestoPrinciple, number][]).map(
            ([principle, score]) => (
              <PrincipleCard key={principle} principle={principle} score={score} />
            )
          )}
        </div>
      </div>

      {/* Strengths & Opportunities */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Strengths */}
        <div className="rounded-2xl border border-lotus-border-soft bg-[#ecfdf5]/50 p-6">
          <h3 className="font-serif text-xl font-bold text-[#065f46] mb-4">{t.strengths}</h3>
          <ul className="space-y-3">
            {evaluation.summary.strengths.length > 0 ? (
              evaluation.summary.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3 text-[#047857]">
                  <span className="text-xl mt-0.5">✓</span>
                  <span className="text-sm">{strength}</span>
                </li>
              ))
            ) : (
              <li className="text-lotus-muted text-sm italic">Continue building your alignment journey...</li>
            )}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="rounded-2xl border border-lotus-border-soft bg-[#fef3c7]/40 p-6">
          <h3 className="font-serif text-xl font-bold text-[#92400e] mb-4">{t.opportunities}</h3>
          <ul className="space-y-3">
            {evaluation.summary.opportunities.length > 0 ? (
              evaluation.summary.opportunities.map((opp, i) => (
                <li key={i} className="flex items-start gap-3 text-[#b45309]">
                  <span className="text-xl mt-0.5">→</span>
                  <span className="text-sm">{opp}</span>
                </li>
              ))
            ) : (
              <li className="text-lotus-muted text-sm italic">Areas to explore and deepen...</li>
            )}
          </ul>
        </div>
      </div>

      {/* Critical Next Steps */}
      {evaluation.summary.critical_actions.length > 0 && (
        <div className="max-w-6xl mx-auto mb-12 rounded-2xl border-2 border-lotus-gold-dim bg-lotus-gold-dim/20 p-6">
          <h3 className="font-serif text-xl font-bold text-lotus-gold mb-4">{t.critical_actions}</h3>
          <ol className="space-y-2">
            {evaluation.summary.critical_actions.map((action, i) => (
              <li key={i} className="flex items-start gap-3 text-lotus-gold">
                <span className="font-bold min-w-fit">{i + 1}.</span>
                <span className="text-sm">{action}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Submission Checklist Mapping */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-bold text-lotus-cream mb-1">{t.checklist}</h2>
          <p className="text-lotus-muted text-sm">How this evaluation maps to the website onboarding criteria</p>
        </div>

        <div className="space-y-3">
          {evaluation.submission_checklist_mapping.map((item, idx) => {
            const statusColors: Record<string, { bg: string; text: string; label: string }> = {
              met: { bg: '#ecfdf5', text: '#05b081', label: t.met },
              partial: { bg: '#fef3c7', text: '#b45309', label: t.partial },
              unmet: { bg: '#fee2e2', text: '#dc2626', label: t.unmet },
              'not-applicable': { bg: '#f3f4f6', text: '#6b7280', label: t.not_applicable },
            };

            const status = statusColors[item.status] || statusColors.unmet;

            return (
              <div key={idx} className="rounded-xl border border-lotus-border-soft bg-white/70 p-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-medium text-lotus-cream text-sm">{item.field}</h4>
                  <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: status.bg, color: status.text }}>
                    {status.label}
                  </div>
                </div>
                <p className="text-lotus-muted text-xs mb-2">{item.evidence}</p>
                {item.recommendations.length > 0 && (
                  <div className="bg-lotus-border-soft/30 rounded-lg p-3 mt-2">
                    <p className="text-xs font-semibold text-lotus-muted-2 mb-1">Recommendations:</p>
                    <ul className="text-xs text-lotus-muted space-y-1">
                      {item.recommendations.map((rec, ri) => (
                        <li key={ri}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Evaluation Metadata Footer */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-lotus-border-soft">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-lotus-muted">
          <div>
            <p className="font-semibold text-lotus-muted-2 mb-1">Confidence Level</p>
            <p>{evaluation.evaluation_metadata.confidence_level}%</p>
          </div>
          <div>
            <p className="font-semibold text-lotus-muted-2 mb-1">Methodology</p>
            <p className="line-clamp-2">{evaluation.evaluation_metadata.methodology}</p>
          </div>
          <div>
            <p className="font-semibold text-lotus-muted-2 mb-1">Version</p>
            <p>{evaluation.evaluation_metadata.evaluator_version}</p>
          </div>
        </div>
        {evaluation.evaluation_metadata.limitations.length > 0 && (
          <div className="mt-4 p-4 bg-lotus-border-soft/20 rounded-lg">
            <p className="text-xs font-semibold text-lotus-muted-2 mb-2">Limitations:</p>
            <ul className="text-xs text-lotus-muted space-y-1">
              {evaluation.evaluation_metadata.limitations.map((limit, i) => (
                <li key={i}>• {limit}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
