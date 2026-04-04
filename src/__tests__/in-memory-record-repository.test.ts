import { describe, it, expect } from 'vitest';
import { InMemoryRecordRepository } from '@/services/data-layer/drivers/in-memory-record-repository';

interface SampleRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  value: string;
}

function sample(id: string, value: string): SampleRecord {
  const now = new Date().toISOString();
  return { id, createdAt: now, updatedAt: now, value };
}

describe('InMemoryRecordRepository', () => {
  it('supports save/get/list/update/remove', async () => {
    const repo = new InMemoryRecordRepository<SampleRecord>();

    const a = sample('a', 'alpha');
    const b = sample('b', 'beta');

    await repo.save(a);
    await repo.save(b);

    expect(await repo.get('a')).toEqual(a);
    expect((await repo.list(10)).map((r) => r.id).sort()).toEqual(['a', 'b']);

    const updated = await repo.update('a', { value: 'alpha-2' });
    expect(updated?.value).toBe('alpha-2');

    await repo.remove('a');
    expect(await repo.get('a')).toBeNull();
  });
});
