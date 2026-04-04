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
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-900">Website Manifesto Evaluator</h2>

      {/* Input Form */}
      <form onSubmit={handleEvaluate} className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition"
          >
            {loading ? 'Evaluating...' : 'Evaluate'}
          </button>
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Overall Assessment</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Manifesto Alignment Score</p>
                <p className="text-4xl font-bold text-purple-900">{result.overall.score}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Grade</p>
                <p className={`text-3xl font-bold ${getGradeColor(result.overall.grade)}`}>
                  {result.overall.grade.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Criteria Results */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Criteria Assessment</h3>
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

function CriterionCard({ criterion }: { criterion: CriteriaMeasurement }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-800">{criterion.name}</h4>
          <span className={`text-xl font-bold ${getGradeColor(criterion.grade)}`}>
            {criterion.score}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getScoreColor(criterion.score)}`}
            style={{ width: `${criterion.score}%` }}
          />
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">Evidence:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              {criterion.evidence?.map((e, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          {criterion.recommendations && criterion.recommendations.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Recommendations:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {criterion.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">→</span>
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
      return 'text-green-600';
    case 'good':
      return 'text-blue-600';
    case 'fair':
      return 'text-yellow-600';
    case 'needs-improvement':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'bg-green-500';
  if (score >= 70) return 'bg-blue-500';
  if (score >= 55) return 'bg-yellow-500';
  return 'bg-red-500';
}
