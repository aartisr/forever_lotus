import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryStore } from '@/lib/in-memory-store';

interface Widget {
  id: string;
  name: string;
  updatedAt: string;
}

function makeWidget(id: string, name: string): Widget {
  return { id, name, updatedAt: new Date().toISOString() };
}

describe('InMemoryStore', () => {
  let store: InMemoryStore<Widget>;

  beforeEach(() => {
    store = new InMemoryStore<Widget>();
  });

  it('saves and retrieves a record by id', async () => {
    const w = makeWidget('1', 'Alpha');
    await store.save(w);
    const result = await store.get('1');
    expect(result).toEqual(w);
  });

  it('returns null for an unknown id', async () => {
    expect(await store.get('unknown')).toBeNull();
  });

  it('lists all saved records', async () => {
    await store.save(makeWidget('a', 'A'));
    await store.save(makeWidget('b', 'B'));
    const list = await store.list();
    expect(list).toHaveLength(2);
  });

  it('respects the limit parameter', async () => {
    for (let i = 0; i < 10; i++) {
      await store.save(makeWidget(String(i), `Item ${i}`));
    }
    const list = await store.list(3);
    expect(list).toHaveLength(3);
  });

  it('updates an existing record and refreshes updatedAt', async () => {
    const original = makeWidget('x', 'Original');
    await store.save(original);

    await new Promise(r => setTimeout(r, 2));
    const updated = await store.update('x', { name: 'Updated' });
    expect(updated?.name).toBe('Updated');
    expect(updated?.updatedAt).not.toBe(original.updatedAt);
  });

  it('returns null when updating a non-existent id', async () => {
    expect(await store.update('missing', { name: 'Ghost' })).toBeNull();
  });

  it('deletes a record', async () => {
    await store.save(makeWidget('del', 'DeleteMe'));
    await store.delete('del');
    expect(await store.get('del')).toBeNull();
  });

  it('lists records sorted by updatedAt descending', async () => {
    const old = { id: 'old', name: 'Old', updatedAt: '2020-01-01T00:00:00.000Z' };
    const recent = { id: 'new', name: 'New', updatedAt: '2025-01-01T00:00:00.000Z' };
    await store.save(old);
    await store.save(recent);
    const list = await store.list();
    expect(list[0].id).toBe('new');
    expect(list[1].id).toBe('old');
  });
});
