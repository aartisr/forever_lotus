/**
 * Evaluation Service - Orchestrates website assessment
 * Generic layer that can evaluate any website against manifesto principles
 */

import {
  WebsiteEvaluationResult,
  PageEvaluation,
  CriteriaMeasurement,
  MANIFESTO_CRITERIA,
  GRADE_SCORES,
  finalizeEvaluation,
  calculatePrincipleScore,
  createBlankEvaluation,
} from '@/lib/manifesto-evaluator';

/**
 * Mock/Demo evaluation service - in production, would integrate with actual assessment engine
 * This creates realistic sample data based on website characteristics you pass in
 */
export class ManifestoEvaluationService {
  /**
   * Generate a sample evaluation for demo/testing purposes
   * In production, this would call actual assessment endpoints
   */
  static generateSampleEvaluation(
    website_name: string,
    website_url: string,
    alignment_level: 'excellent' | 'good' | 'fair' | 'needs-improvement' = 'good'
  ): WebsiteEvaluationResult {
    const baseEval = createBlankEvaluation(website_name, website_url);

    // Simulate score multiplier based on alignment level
    const scoreMultiplier =
      alignment_level === 'excellent'
        ? 0.95
        : alignment_level === 'good'
          ? 0.78
          : alignment_level === 'fair'
            ? 0.58
            : 0.35;

    // Generate sample page evaluations
    const sampleUrls = [website_url, website_url + '/about', website_url + '/mission', website_url + '/contact'];

    baseEval.pages = sampleUrls.map((url, idx) => {
      const criteria = Object.values(MANIFESTO_CRITERIA)
        .flat()
        .map((criterion) => {
          const baseScore = Math.floor(Math.random() * 35) + 55; // 55-90 base
          const adjustedScore = Math.round(baseScore * scoreMultiplier);

          return {
            ...criterion,
            score: Math.min(100, Math.max(0, adjustedScore)),
            grade:
              adjustedScore >= 85
                ? 'excellent'
                : adjustedScore >= 70
                  ? 'good'
                  : adjustedScore >= 55
                    ? 'fair'
                    : 'needs-improvement',
            evidence: [
              idx === 0
                ? 'Homepage clearly states mission and values'
                : idx === 1
                  ? 'About page demonstrates transparency and leadership'
                  : idx === 2
                    ? 'Mission page aligns with manifesto principles'
                    : 'Contact page is straightforward and accessible',
            ],
            recommendations:
              criterion.score < 70
                ? [
                    'Review content for extractive language',
                    'Enhance accessibility features',
                    'Clarify value proposition',
                  ]
                : [],
          };
        });

      return {
        url,
        title: ['Home', 'About', 'Mission', 'Contact'][idx],
        pageType: ['homepage', 'content', 'content', 'contact'][idx] as
          | 'homepage'
          | 'content'
          | 'resources'
          | 'contact'
          | 'other',
        timestamp: new Date().toISOString(),
        overall_score: Math.round(criteria.reduce((sum, c) => sum + c.score * c.weight, 0) / criteria.length),
        criteria,
        passed_criteria: criteria.filter((c) => c.score >= 70).length,
        total_criteria: criteria.length,
        impact_summary: `Page demonstrates ${criteria.filter((c) => c.score >= 70).length} of ${criteria.length} key manifesto alignments.`,
        next_steps: [
          'Strengthen transparency',
          'Enhance accessibility',
          'Clarify earth consciousness commitment',
        ],
        links: {
          total: Math.floor(Math.random() * 15) + 5,
          internal: Math.floor(Math.random() * 10) + 2,
          external: Math.floor(Math.random() * 8) + 2,
          broken: Math.floor(Math.random() * 2),
        },
      } as PageEvaluation;
    });

    baseEval.total_pages_evaluated = baseEval.pages.length;

    baseEval.summary.strengths = [
      'Clear mission and governance',
      'Strong accessibility commitment',
      'Transparent about organizational values',
    ];

    baseEval.summary.opportunities = [
      'Deepen earth consciousness integration',
      'Enhance educational content',
      'Amplify community voice in decision-making',
    ];

    baseEval.summary.critical_actions = [
      'Audit all tracking and data practices for privacy compliance',
      'Review user experience for dark patterns',
      'Add impact metrics to demonstrate real-world change',
    ];

    // Finalize and return
    return finalizeEvaluation(baseEval);
  }

  /**
   * Convert external evaluation API response to internal format
   * Allows integration with real assessment engines
   */
  static async evaluateWebsite(
    website_url: string,
    website_name?: string
  ): Promise<WebsiteEvaluationResult> {
    // In production:
    // 1. Fetch website and parse content
    // 2. Run against manifesto criteria
    // 3. Crawl links and assess each page
    // 4. Aggregate results
    // 5. Map to submission checklist

    // For now, return sample
    return this.generateSampleEvaluation(
      website_name || new URL(website_url).hostname,
      website_url,
      'good'
    );
  }
}
