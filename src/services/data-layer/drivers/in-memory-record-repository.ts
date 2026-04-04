import { InMemoryStore } from '@/lib/in-memory-store';
import { DataRepository, EntityRecord } from '@/services/data-layer/types';

export class InMemoryRecordRepository<T extends EntityRecord>
  implements DataRepository<T>
{
  private readonly store = new InMemoryStore<T>();

  async save(record: T): Promise<void> {
    await this.store.save(record);
  }

  async get(id: string): Promise<T | null> {
    return this.store.get(id);
  }

  async list(limit: number = 100): Promise<T[]> {
    return this.store.list(limit);
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    return this.store.update(id, updates);
  }

  async remove(id: string): Promise<void> {
    await this.store.delete(id);
  }
}
