import { KpiBaselineRecord } from '@/lib/impact-kpi';
import { createDataRepository } from '@/services/data-layer/factory';

export class ImpactKpiStorage {
  private static readonly repository =
    createDataRepository<KpiBaselineRecord>('impact_kpi_baselines');

  static async save(record: KpiBaselineRecord): Promise<void> {
    await this.repository.save(record);
  }

  static async get(id: string): Promise<KpiBaselineRecord | null> {
    return this.repository.get(id);
  }

  static async list(limit: number = 100): Promise<KpiBaselineRecord[]> {
    return this.repository.list(limit);
  }

  static async update(
    id: string,
    updates: Partial<KpiBaselineRecord>
  ): Promise<KpiBaselineRecord | null> {
    return this.repository.update(id, updates);
  }

  static async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }

  static generateId(): string {
    return `kpi_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
}
