import { describe, it, expect, afterEach } from 'vitest';
import {
  getDataLayerDriver,
  hasSupabaseConfiguration,
} from '@/services/data-layer/config';

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe('data layer config', () => {
  it('defaults to supabase driver', () => {
    delete process.env.DATA_LAYER_DRIVER;
    expect(getDataLayerDriver()).toBe('supabase');
  });

  it('uses memory driver when configured', () => {
    process.env.DATA_LAYER_DRIVER = 'memory';
    expect(getDataLayerDriver()).toBe('memory');
  });

  it('reports supabase configuration presence', () => {
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key';
    expect(hasSupabaseConfiguration()).toBe(true);
  });

  it('reports supabase configuration missing when partial', () => {
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(hasSupabaseConfiguration()).toBe(false);
  });
});
