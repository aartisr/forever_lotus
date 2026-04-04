export interface TimeStampedRecord {
  id: string;
  updatedAt: string;
}

export class InMemoryStore<T extends TimeStampedRecord> {
  private db: Map<string, T> = new Map();
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
  }

  async save(record: T): Promise<void> {
    await this.initialize();
    this.db.set(record.id, record);
  }

  async get(id: string): Promise<T | null> {
    await this.initialize();
    return this.db.get(id) || null;
  }

  async list(limit: number = 50): Promise<T[]> {
    await this.initialize();
    return Array.from(this.db.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    await this.initialize();
    const current = this.db.get(id);
    if (!current) return null;

    const merged = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    } as T;

    this.db.set(id, merged);
    return merged;
  }

  async delete(id: string): Promise<void> {
    await this.initialize();
    this.db.delete(id);
  }
}
