'use client';

import React, { useState } from 'react';
import { MANIFESTO_CRITERIA, CriteriaMeasurement } from '@/lib/manifesto-evaluator';
import { RealWebsiteAnalyzer } from '@/services/real-website-analyzer';

interface EvaluationResult {
  url: string;
  criteria: CriteriaMeasurement[];
  overall: {
    score: number;
    grade: string;
  };
  timestamp: string;
}

export function WebsiteEvaluator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState('');

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Validate URL
      new URL(url);

      // Fetch website content using real analyzer
      const content = await RealWebsiteAnalyzer.fetchWebsiteContent(url);

      // Flatten criteria from Record to array
      const criteriaArray = Object.values(MANIFESTO_CRITERIA).flat();

      // Score each criterion
      const scoredCriteria = criteriaArray.map((criterion) =>
        RealWebsiteAnalyzer.scoreCriterion(criterion, content)
      );

      // Calculate overall score
      const overallScore = Math.round(
        scoredCriteria.reduce((sum, c) => sum + c.score, 0) / scoredCriteria.length
      );

      // Determine grade
      const grade =
        overallScore >= 85
          ? 'excellent'
          : overallScore >= 70
            ? 'good'
            : overallScore >= 55
              ? 'fair'
              : 'needs-improvement';

      setResult({
        url,
        criteria: scoredCriteria,
        overall: { score: overallScore, grade },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to evaluate website');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-300 shadow-sm p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 text-stone-900">Website Manifesto Evaluator</h2>

      {/* Input Form */}
      <form onSubmit={handleEvaluate} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="flex-1 px-4 py-2.5 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-stone-50 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2.5 rounded-xl disabled:opacity-50 transition text-sm shadow-sm"
          >
            {loading ? 'Evaluating...' : 'Evaluate'}
          </button>
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-900 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-stone-100 border border-stone-300 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-stone-900 mb-4">Overall Assessment</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-700">Manifesto Alignment Score</p>
                <p className="text-4xl font-black text-amber-900 mt-1">{result.overall.score}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-stone-700">Grade</p>
                <p className={`text-3xl font-black ${getGradeColor(result.overall.grade)} mt-1`}>
                  {result.overall.grade.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Criteria Results */}
          <div>
            <h3 className="text-lg font-bold text-stone-900 mb-4">Criteria Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.criteria.map((criterion) => (
                <CriterionCard key={criterion.id} criterion={criterion} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CriterionCard({ criterion }: { criterion: CriteriaMeasurement; key?: React.Key }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-stone-300 bg-[#FCFBF8] rounded-xl p-4 hover:shadow-md transition">
      <div
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-stone-900 text-sm">{criterion.name}</h4>
          <span className={`text-lg font-black ${getGradeColor(criterion.grade)}`}>
            {criterion.score}%
          </span>
        </div>
        <div className="w-full bg-stone-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getScoreColor(criterion.score)}`}
            style={{ width: `${criterion.score}%` }}
          />
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-stone-200 pt-4">
          <div>
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">Evidence:</p>
            <ul className="text-xs text-stone-700 space-y-1">
              {criterion.evidence?.map((e, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-stone-900">•</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          {criterion.recommendations && criterion.recommendations.length > 0 && (
            <div>
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">Recommendations:</p>
              <ul className="text-xs text-stone-700 space-y-1">
                {criterion.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-amber-700 font-bold">→</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getGradeColor(grade: string): string {
  switch (grade) {
    case 'excellent':
      return 'text-emerald-800';
    case 'good':
      return 'text-sky-800';
    case 'fair':
      return 'text-amber-800';
    case 'needs-improvement':
      return 'text-rose-800';
    default:
      return 'text-stone-800';
  }
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'bg-emerald-600';
  if (score >= 70) return 'bg-sky-600';
  if (score >= 55) return 'bg-amber-600';
  return 'bg-rose-600';
}
