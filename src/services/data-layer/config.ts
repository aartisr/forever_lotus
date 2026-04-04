import { DataLayerDriver } from '@/services/data-layer/types';

export function getDataLayerDriver(): DataLayerDriver {
  const configured = process.env.DATA_LAYER_DRIVER?.trim().toLowerCase();

  if (configured === 'memory') return 'memory';
  return 'supabase';
}

export function hasSupabaseConfiguration(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
