import { ok, serverError } from '@/lib/api-response';
import {
  getDataLayerDriver,
  hasSupabaseConfiguration,
} from '@/services/data-layer/config';

export async function GET() {
  try {
    const driver = getDataLayerDriver();
    const supabaseConfigured = hasSupabaseConfiguration();

    return ok({
      status: 'ok',
      dataLayer: {
        driver,
        ready: driver === 'memory' ? true : supabaseConfigured,
        supabaseConfigured,
        table: process.env.SUPABASE_DATA_TABLE ?? 'app_records',
      },
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Data layer health check error:', error);
    return serverError('Failed to check data layer health');
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
