import { NextRequest } from 'next/server';
import { badRequest, ok, serverError } from '@/lib/api-response';
import { parseJsonBody } from '@/lib/api-request';

interface PerfMetricPayload {
  name: 'LCP' | 'CLS' | 'INP' | 'FCP' | 'TTFB' | 'NAV';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  path: string;
  at: string;
}

function isValidMetric(payload: PerfMetricPayload): boolean {
  const names = ['LCP', 'CLS', 'INP', 'FCP', 'TTFB', 'NAV'];
  const ratings = ['good', 'needs-improvement', 'poor'];

  return (
    names.includes(payload.name) &&
    ratings.includes(payload.rating) &&
    Number.isFinite(payload.value) &&
    payload.path.trim().length > 0 &&
    payload.at.trim().length > 0
  );
}

export async function POST(request: NextRequest) {
  try {
    const parsed = await parseJsonBody<PerfMetricPayload>(request);
    if (parsed.error || !parsed.data) {
      return badRequest(parsed.error ?? 'Invalid payload');
    }

    if (!isValidMetric(parsed.data)) {
      return badRequest('Invalid performance telemetry payload');
    }

    console.info('perf-metric', parsed.data);
    return ok({ accepted: true }, 202);
  } catch (error) {
    console.error('Performance telemetry error:', error);
    return serverError('Failed to process performance telemetry');
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
