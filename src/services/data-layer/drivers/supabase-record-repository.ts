import { DataRepository, EntityRecord } from '@/services/data-layer/types';

interface SupabaseRow<T extends EntityRecord> {
  id: string;
  entity: string;
  payload: T;
  created_at: string;
  updated_at: string;
}

interface SupabaseConfig {
  url: string;
  serviceRoleKey: string;
}

function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Supabase data layer requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  return { url, serviceRoleKey };
}

export class SupabaseRecordRepository<T extends EntityRecord>
  implements DataRepository<T>
{
  private readonly table: string;
  private readonly entity: string;

  constructor(entity: string, table = process.env.SUPABASE_DATA_TABLE ?? 'app_records') {
    this.table = table;
    this.entity = entity;
  }

  private async request<R>(path: string, init?: RequestInit): Promise<R> {
    const config = getSupabaseConfig();
    const response = await fetch(`${config.url}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        ...(init?.headers ?? {}),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Supabase request failed (${response.status}): ${message}`);
    }

    const text = await response.text();
    if (!text) return [] as unknown as R;

    return JSON.parse(text) as R;
  }

  async save(record: T): Promise<void> {
    const body = {
      id: record.id,
      entity: this.entity,
      payload: record,
      created_at: record.createdAt,
      updated_at: record.updatedAt,
    };

    await this.request<SupabaseRow<T>[]>(
      `${this.table}?on_conflict=id`,
      {
        method: 'POST',
        headers: {
          Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify(body),
      }
    );
  }

  async get(id: string): Promise<T | null> {
    const query =
      `${this.table}?select=id,entity,payload,created_at,updated_at` +
      `&id=eq.${encodeURIComponent(id)}` +
      `&entity=eq.${encodeURIComponent(this.entity)}` +
      '&limit=1';

    const rows = await this.request<SupabaseRow<T>[]>(query, { method: 'GET' });
    return rows[0]?.payload ?? null;
  }

  async list(limit: number = 100): Promise<T[]> {
    const safeLimit = Math.max(1, Math.min(limit, 500));
    const query =
      `${this.table}?select=id,entity,payload,created_at,updated_at` +
      `&entity=eq.${encodeURIComponent(this.entity)}` +
      '&order=updated_at.desc' +
      `&limit=${safeLimit}`;

    const rows = await this.request<SupabaseRow<T>[]>(query, { method: 'GET' });
    return rows.map((row) => row.payload);
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const current = await this.get(id);
    if (!current) return null;

    const merged: T = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await this.save(merged);
    return merged;
  }

  async remove(id: string): Promise<void> {
    const query =
      `${this.table}?id=eq.${encodeURIComponent(id)}` +
      `&entity=eq.${encodeURIComponent(this.entity)}`;

    await this.request<SupabaseRow<T>[]>(query, {
      method: 'DELETE',
      headers: {
        Prefer: 'return=minimal',
      },
    });
  }
}
