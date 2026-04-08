'use client';

import React, { useState } from 'react';
import { ManifestoEvaluationService } from '@/services/manifesto-evaluation-service';
import EvaluationDashboard from '@/components/EvaluationDashboard';
import { WebsiteEvaluationResult } from '@/lib/manifesto-evaluator';
import { getMessages } from '@/i18n';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';

export default function EvaluationDashboardClient() {
  const locale = useResolvedLocale();
  const messages = getMessages(locale);

  const [websiteUrl, setWebsiteUrl] = useState('https://example.com');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<WebsiteEvaluationResult | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate URL
      try {
        new URL(websiteUrl);
      } catch {
        throw new Error('Please enter a valid website URL (e.g., https://example.com)');
      }

      // Run real website evaluation
      const result = await ManifestoEvaluationService.evaluateWebsiteReal(
        websiteUrl,
        new URL(websiteUrl).hostname
      );

      setEvaluation(result);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during evaluation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewEvaluation = () => {
    setWebsiteUrl('https://example.com');
    setEvaluation(null);
    setError(null);
    setShowForm(true);
  };

  return (
    <main className="min-h-screen bg-lotus-bg">
      {showForm ? (
        /* Submission Form */
        <div className="relative pt-32 pb-20 px-5 sm:px-8 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 100% 70% at 50% 0%, rgba(20,184,166,0.12) 0%, transparent 70%)',
            }}
          />

          <div className="relative max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Manifesto Alignment</p>
              <h1
                className="font-serif font-black text-lotus-cream mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                Evaluate a Website
              </h1>
              <p className="text-lotus-muted text-lg leading-relaxed max-w-xl mx-auto">
                Submit your website for a thoughtful, encouraging evaluation against the Forever Lotus Manifesto.
                Receive actionable feedback on how your mission aligns with our core principles of compassion,
                dignity, and conscious creation.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-semibold text-lotus-cream mb-2">Website URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-lotus-border-soft bg-white/80 px-4 py-3 text-lotus-cream placeholder:text-lotus-muted focus:outline-none focus:ring-2 focus:ring-lotus-gold focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-lotus-muted mt-2">Include the full URL with https://</p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !websiteUrl}
                className="w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-lotus-cream border-r-transparent" />
                    Evaluating...
                  </span>
                ) : (
                  'Start Evaluation'
                )}
              </button>

              {/* Notice */}
              <div className="rounded-lg bg-lotus-gold-dim/20 border border-lotus-gold-dim p-4">
                <p className="text-xs text-lotus-muted-2 leading-relaxed">
                  <strong>Note:</strong> This evaluation analyzes your website&apos;s static content against Forever Lotus
                  manifesto principles. Real assessment based on homepage content analysis, accessibility features,
                  language patterns, and transparency indicators.
                </p>
              </div>
            </form>

            {/* CTA to Onboarding */}
            <div className="mt-12 text-center">
              <p className="text-lotus-muted text-sm mb-4">
                Looking to showcase your website in the ecosystem?
              </p>
              <a href="/onboarding-websites" className="inline-flex btn-primary text-sm !py-2 !px-5">
                Start Onboarding
              </a>
            </div>
          </div>
        </div>
      ) : evaluation ? (
        /* Evaluation Results */
        <>
          <EvaluationDashboard evaluation={evaluation} locale={locale} />

          {/* Call to Action Footer */}
          <div className="bg-lotus-gold-dim/20 border-t border-lotus-border-soft py-12 px-5 mt-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl font-bold text-lotus-cream mb-3">Ready to Join?</h2>
              <p className="text-lotus-muted mb-6">
                If your website aligns with the Forever Lotus Manifesto, formally join our ecosystem of purpose-led
                platforms.
              </p>
              <button
                onClick={handleNewEvaluation}
                className="btn-primary text-sm !py-2 !px-6 mr-3 mb-3"
              >
                Evaluate Another
              </button>
              <a href="/onboarding-websites" className="inline-flex btn-primary text-sm !py-2 !px-6">
                Begin Onboarding
              </a>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
