export interface EntityRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataRepository<T extends EntityRecord> {
  save(record: T): Promise<void>;
  get(id: string): Promise<T | null>;
  list(limit?: number): Promise<T[]>;
  update(id: string, updates: Partial<T>): Promise<T | null>;
  remove(id: string): Promise<void>;
}

export type DataLayerDriver = 'supabase' | 'memory';
