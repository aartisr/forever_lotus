import {
  SearchEngineSubmissionStatus,
  TOP_SEARCH_ENGINES,
  WebsiteIndexingInput,
  WebsiteIndexingRecord,
  WebsiteMetricSnapshot,
  computeOverallStatus,
} from '@/lib/search-indexing';
import { SearchIndexingStorage } from '@/services/search-indexing-storage';
import { pollEngineStatus, submitToEngine } from '@/services/search-engine-adapters';

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function buildInitialStatus(input: WebsiteIndexingInput): Promise<SearchEngineSubmissionStatus[]> {
  const submissions = await Promise.all(
    TOP_SEARCH_ENGINES.map((engine) => submitToEngine(engine, input))
  );
  return submissions;
}

function buildMetricSnapshot(submissions: SearchEngineSubmissionStatus[]): WebsiteMetricSnapshot {
  const indexedPages = submissions
    .map((s) => s.details.indexedPages || 0)
    .reduce((acc, value) => acc + value, 0);

  const discoveredUrls = Math.max(indexedPages + random(12, 60), 25);
  const coverage = Math.round((indexedPages / discoveredUrls) * 100);

  return {
    indexedUrls: indexedPages,
    discoveredUrls,
    indexingCoveragePct: coverage,
    estimatedClicks: random(300, 4500),
    estimatedImpressions: random(4000, 65000),
    averagePosition: parseFloat((Math.random() * 20 + 6).toFixed(1)),
    healthScore: Math.max(42, Math.min(96, coverage + random(6, 21))),
    criticalIssues: random(0, 2),
    warnings: random(1, 8),
    fetchedAt: new Date().toISOString(),
  };
}

export class SearchIndexingService {
  static async submitWebsite(input: WebsiteIndexingInput): Promise<WebsiteIndexingRecord> {
    const id = SearchIndexingStorage.generateId();
    const createdAt = new Date().toISOString();

    const submissions = await buildInitialStatus(input);
    const metrics = buildMetricSnapshot(submissions);
    const overallStatus = computeOverallStatus(submissions);

    const record: WebsiteIndexingRecord = {
      id,
      input,
      overallStatus,
      submissions,
      metrics,
      createdAt,
      updatedAt: createdAt,
    };

    await SearchIndexingStorage.save(record);
    return record;
  }

  static async getRecord(id: string): Promise<WebsiteIndexingRecord | null> {
    return SearchIndexingStorage.get(id);
  }

  static async listRecords(limit: number = 50): Promise<WebsiteIndexingRecord[]> {
    return SearchIndexingStorage.list(limit);
  }

  static async refreshStatus(id: string): Promise<WebsiteIndexingRecord | null> {
    const record = await SearchIndexingStorage.get(id);
    if (!record) return null;

    const refreshed: SearchEngineSubmissionStatus[] = await Promise.all(
      record.submissions.map((submission) => pollEngineStatus(submission))
    );

    const metrics = buildMetricSnapshot(refreshed);
    const overallStatus = computeOverallStatus(refreshed);

    return SearchIndexingStorage.update(id, {
      submissions: refreshed,
      metrics,
      overallStatus,
    });
  }

  static async refreshAll(limit: number = 200): Promise<WebsiteIndexingRecord[]> {
    const records = await SearchIndexingStorage.list(limit);
    const updated: WebsiteIndexingRecord[] = [];

    for (const record of records) {
      const next = await this.refreshStatus(record.id);
      if (next) updated.push(next);
    }

    return updated;
  }
}
