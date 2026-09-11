/**
 * Evaluation History Storage - In-memory and file-based storage
 * For production, upgrade to a real database
 */

import { WebsiteEvaluationResult } from '@/lib/manifesto-evaluator';
import { InMemoryStore } from '@/lib/in-memory-store';

export interface EvaluationRecord {
  id: string;
  result: WebsiteEvaluationResult;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'completed' | 'failed';
  notes?: string;
}

export class EvaluationStorage {
  private static store = new InMemoryStore<EvaluationRecord>();

  static async initialize() {
    await this.store.initialize();
  }

  static async save(record: EvaluationRecord): Promise<void> {
    await this.store.save(record);
  }

  static async get(id: string): Promise<EvaluationRecord | null> {
    return this.store.get(id);
  }

  static async getByWebsite(websiteUrl: string): Promise<EvaluationRecord[]> {
    const records = await this.store.list(1000);
    return records.filter((r) =>
      r.result.website_url === websiteUrl
    );
  }

  static async list(limit: number = 50): Promise<EvaluationRecord[]> {
    const records = await this.store.list(1000);
    return records
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  static async delete(id: string): Promise<void> {
    await this.store.delete(id);
  }

  static async update(id: string, updates: Partial<EvaluationRecord>): Promise<EvaluationRecord | null> {
    return this.store.update(id, updates);
  }

  static generateId(): string {
    return `eval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
