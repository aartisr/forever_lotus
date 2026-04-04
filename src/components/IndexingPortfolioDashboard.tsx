'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { EngineStatus, WebsiteIndexingRecord } from '@/lib/search-indexing';

type SortKey = 'updated' | 'coverage' | 'health' | 'indexed';

function badgeTone(status: EngineStatus): string {
  if (status === 'indexed') return 'text-emerald-300 bg-emerald-400/15 border-emerald-400/30';
  if (status === 'processing' || status === 'submitted' || status === 'queued') {
    return 'text-sky-300 bg-sky-400/15 border-sky-400/30';
  }
  if (status === 'action-required' || status === 'partial') {
    return 'text-amber-300 bg-amber-400/15 border-amber-400/30';
  }
  if (status === 'failed') return 'text-red-300 bg-red-400/15 border-red-400/30';
  return 'text-zinc-300 bg-zinc-400/15 border-zinc-400/30';
}

export default function IndexingPortfolioDashboard() {
  const [records, setRecords] = useState<WebsiteIndexingRecord[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EngineStatus>('all');
  const [sortBy, setSortBy] = useState<SortKey>('updated');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/indexing?limit=200');
      if (!response.ok) throw new Error('Failed to load records');
      const payload = (await response.json()) as { records: WebsiteIndexingRecord[] };
      setRecords(payload.records || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    let next = records.filter((record) => {
      const byQuery =
        !normalized ||
        record.input.websiteName.toLowerCase().includes(normalized) ||
        record.input.websiteUrl.toLowerCase().includes(normalized);

      const byStatus = statusFilter === 'all' || record.overallStatus === statusFilter;

      return byQuery && byStatus;
    });

    next = [...next].sort((a, b) => {
      if (sortBy === 'updated') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === 'coverage') {
        return b.metrics.indexingCoveragePct - a.metrics.indexingCoveragePct;
      }
      if (sortBy === 'health') {
        return b.metrics.healthScore - a.metrics.healthScore;
      }

      const indexedA = a.submissions.filter((s) => s.status === 'indexed').length;
      const indexedB = b.submissions.filter((s) => s.status === 'indexed').length;
      return indexedB - indexedA;
    });

    return next;
  }, [records, query, statusFilter, sortBy]);

  return (
    <main className="min-h-screen bg-lotus-bg px-5 sm:px-8 pt-28 pb-16">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="eyebrow mb-3">Portfolio Operations</p>
          <h1 className="font-serif font-black text-lotus-cream text-4xl md:text-5xl mb-4">
            Indexing Portfolio Tracker
          </h1>
          <p className="text-lotus-muted max-w-3xl mx-auto">
            Manage many aligned websites at once, filter by status, and prioritize actions by
            coverage, health, and indexed-engine count.
          </p>
        </div>

        <section className="card-glass rounded-2xl p-5 mb-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or URL"
              className="rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-lotus-cream"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'all' | EngineStatus)}
              className="rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-lotus-cream"
            >
              <option value="all">All statuses</option>
              <option value="indexed">Indexed</option>
              <option value="processing">Processing</option>
              <option value="action-required">Action required</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
              className="rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-lotus-cream"
            >
              <option value="updated">Sort: Last updated</option>
              <option value="coverage">Sort: Coverage</option>
              <option value="health">Sort: Health</option>
              <option value="indexed">Sort: Indexed engines</option>
            </select>

            <button onClick={load} className="btn-ghost" type="button">
              Refresh Portfolio
            </button>
          </div>
        </section>

        {error ? (
          <p className="mb-5 text-sm text-red-300 bg-red-400/10 border border-red-400/25 rounded px-3 py-2">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="text-lotus-muted">Loading portfolio...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((record) => {
              const indexedCount = record.submissions.filter((s) => s.status === 'indexed').length;
              const actionCount = record.submissions.filter(
                (s) => s.status === 'action-required'
              ).length;

              return (
                <article key={record.id} className="card-glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold text-lotus-cream">{record.input.websiteName}</h3>
                      <p className="text-xs text-lotus-muted">{record.input.websiteUrl}</p>
                    </div>
                    <span className={`text-xs border rounded-full px-3 py-1 ${badgeTone(record.overallStatus)}`}>
                      {record.overallStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs mt-4">
                    <div>
                      <p className="text-lotus-muted">Indexed</p>
                      <p className="text-lotus-cream font-semibold">{indexedCount}/10</p>
                    </div>
                    <div>
                      <p className="text-lotus-muted">Coverage</p>
                      <p className="text-lotus-cream font-semibold">{record.metrics.indexingCoveragePct}%</p>
                    </div>
                    <div>
                      <p className="text-lotus-muted">Health</p>
                      <p className="text-lotus-cream font-semibold">{record.metrics.healthScore}</p>
                    </div>
                    <div>
                      <p className="text-lotus-muted">Actions</p>
                      <p className="text-amber-300 font-semibold">{actionCount}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-lotus-muted mt-4">
                    Updated {new Date(record.updatedAt).toLocaleString()}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
