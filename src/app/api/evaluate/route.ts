import { NextRequest } from 'next/server';
import { ManifestoEvaluationService } from '@/services/manifesto-evaluation-service';
import { EvaluationStorage, EvaluationRecord } from '@/services/evaluation-storage';
import { createBlankEvaluation, finalizeEvaluation } from '@/lib/manifesto-evaluator';
import { badRequest, ok, serverError } from '@/lib/api-response';
import { parseJsonBody } from '@/lib/api-request';

/**
 * POST /api/evaluate
 */
export async function POST(request: NextRequest) {
  try {
    const { data: body, error: parseError } = await parseJsonBody<{
      website_url?: string;
      website_name?: string;
      save_history?: boolean;
    }>(request);

    if (parseError || !body) {
      return badRequest(parseError ?? 'Invalid request body');
    }

    const { website_url, website_name, save_history = true } = body;

    if (!website_url) {
      return badRequest('website_url is required');
    }

    // Validate URL
    try {
      new URL(website_url);
    } catch {
      return badRequest('Invalid website URL');
    }

    const id = EvaluationStorage.generateId();
    const hostname = new URL(website_url).hostname;
    const name = website_name || hostname;

    // Create initial record
    const initialRecord: EvaluationRecord = {
      id,
      result: createBlankEvaluation(name, website_url),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending',
    };

    if (save_history) {
      await EvaluationStorage.save(initialRecord);
    }

    // Run evaluation asynchronously (in real app, use background job queue)
    evaluateWebsiteAsync(id, website_url, name, save_history).catch(console.error);

    return ok(
      {
        id,
        result: initialRecord.result,
        status: 'pending',
        message: 'Evaluation started. Results will be updated soon.',
      },
      202
    );
  } catch (error) {
    console.error('Evaluation error:', error);
    return serverError('Failed to start evaluation');
  }
}

/**
 * Evaluate website asynchronously
 * In production, this would be a background job
 */
async function evaluateWebsiteAsync(
  id: string,
  website_url: string,
  website_name: string,
  save_history: boolean
) {
  try {
    // Run real evaluation
    const result = await ManifestoEvaluationService.evaluateWebsiteReal(
      website_url,
      website_name
    );

    // Finalize with insights
    const finalResult = finalizeEvaluation(result);

    if (save_history) {
      await EvaluationStorage.update(id, {
        result: finalResult,
        status: 'completed',
      });
    }

    // In a real app, you would broadcast this via WebSocket or Server-Sent Events
    console.log(`Evaluation ${id} completed:`, finalResult.overall_compliance_score);
  } catch (error) {
    console.error(`Evaluation ${id} failed:`, error);
    if (save_history) {
      await EvaluationStorage.update(id, {
        status: 'failed',
        notes: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }
}

export const runtime = 'nodejs';
