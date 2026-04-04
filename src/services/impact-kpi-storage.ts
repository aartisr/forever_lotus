import { InMemoryStore } from '@/lib/in-memory-store';
import { KpiBaselineRecord } from '@/lib/impact-kpi';

export class ImpactKpiStorage {
  private static store = new InMemoryStore<KpiBaselineRecord>();

  static async save(record: KpiBaselineRecord): Promise<void> {
    await this.store.save(record);
  }

  static async get(id: string): Promise<KpiBaselineRecord | null> {
    return this.store.get(id);
  }

  static async list(limit: number = 100): Promise<KpiBaselineRecord[]> {
    return this.store.list(limit);
  }

  static async update(
    id: string,
    updates: Partial<KpiBaselineRecord>
  ): Promise<KpiBaselineRecord | null> {
    return this.store.update(id, updates);
  }

  static async remove(id: string): Promise<void> {
    await this.store.delete(id);
  }

  static generateId(): string {
    return `kpi_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
}
