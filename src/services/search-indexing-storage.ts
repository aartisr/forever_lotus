import { WebsiteIndexingRecord } from '@/lib/search-indexing';
import { InMemoryStore } from '@/lib/in-memory-store';

export class SearchIndexingStorage {
  private static store = new InMemoryStore<WebsiteIndexingRecord>();

  static async initialize() {
    await this.store.initialize();
  }

  static async save(record: WebsiteIndexingRecord): Promise<void> {
    await this.store.save(record);
  }

  static async get(id: string): Promise<WebsiteIndexingRecord | null> {
    return this.store.get(id);
  }

  static async list(limit: number = 50): Promise<WebsiteIndexingRecord[]> {
    return this.store.list(limit);
  }

  static async update(
    id: string,
    updates: Partial<WebsiteIndexingRecord>
  ): Promise<WebsiteIndexingRecord | null> {
    return this.store.update(id, updates);
  }

  static generateId(): string {
    return `idx_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }
}
