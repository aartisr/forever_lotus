import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SupabaseRecordRepository } from '@/services/data-layer/drivers/supabase-record-repository';

interface SampleRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  value: string;
}

const ORIGINAL_ENV = { ...process.env };

describe('SupabaseRecordRepository', () => {
  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'service-key',
      SUPABASE_DATA_TABLE: 'app_records',
    };
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.restoreAllMocks();
  });

  it('builds a list request and returns payloads', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify([
          {
            id: '1',
            entity: 'impact_kpi_baselines',
            payload: {
              id: '1',
              createdAt: '2026-01-01T00:00:00.000Z',
              updatedAt: '2026-01-01T00:00:00.000Z',
              value: 'ok',
            },
            created_at: '2026-01-01T00:00:00.000Z',
            updated_at: '2026-01-01T00:00:00.000Z',
          },
        ]),
        { status: 200 }
      )
    );
    vi.stubGlobal('fetch', fetchMock);

    const repo = new SupabaseRecordRepository<SampleRecord>('impact_kpi_baselines');
    const records = await repo.list(20);

    expect(records).toHaveLength(1);
    expect(records[0].value).toBe('ok');

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/rest/v1/app_records?select=');
    expect(url).toContain('entity=eq.impact_kpi_baselines');
    expect(init.method).toBe('GET');
  });

  it('throws when supabase env is missing', async () => {
    delete process.env.SUPABASE_URL;
    const repo = new SupabaseRecordRepository<SampleRecord>('impact_kpi_baselines');

    await expect(repo.list(5)).rejects.toThrow(
      'Supabase data layer requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
    );
  });
});
