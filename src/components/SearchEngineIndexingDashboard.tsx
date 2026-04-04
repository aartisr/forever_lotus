'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  EngineStatus,
  TOP_SEARCH_ENGINES,
  WebsiteIndexingRecord,
} from '@/lib/search-indexing';
import { useToast } from '@/hooks/useToast';
import ToastBanner from '@/components/ToastBanner';

interface CredentialHealth {
  configuredCount: number;
  total: number;
  readyForLiveSubmission: boolean;
  checkedAt: string;
  credentials: Array<{
    engineId: string;
    engineName: string;
    configured: boolean;
    envVar: string;
    note: string;
  }>;
}

function statusTone(status: EngineStatus): string {
  switch (status) {
    case 'indexed':
      return 'text-emerald-300 bg-emerald-400/15 border-emerald-400/30';
    case 'processing':
    case 'submitted':
    case 'queued':
      return 'text-sky-300 bg-sky-400/15 border-sky-400/30';
    case 'action-required':
    case 'partial':
      return 'text-amber-300 bg-amber-400/15 border-amber-400/30';
    case 'failed':
      return 'text-red-300 bg-red-400/15 border-red-400/30';
    default:
      return 'text-zinc-300 bg-zinc-400/15 border-zinc-400/30';
  }
}

export default function SearchEngineIndexingDashboard() {
  const [websiteName, setWebsiteName] = useState('Wellness Rural Guru');
  const [websiteUrl, setWebsiteUrl] = useState('https://wellness.ruralguru.com');
  const [sitemapUrl, setSitemapUrl] = useState('https://wellness.ruralguru.com/sitemap.xml');
  const [feedUrl, setFeedUrl] = useState('');
  const [record, setRecord] = useState<WebsiteIndexingRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentialHealth, setCredentialHealth] = useState<CredentialHealth | null>(null);
  const [checkingCredentials, setCheckingCredentials] = useState(false);
  const { toast, showToast } = useToast();

  const kpis = useMemo(() => {
    if (!record) return null;
    const indexedCount = record.submissions.filter((s) => s.status === 'indexed').length;
    const actionRequiredCount = record.submissions.filter(
      (s) => s.status === 'action-required'
    ).length;

    return {
      indexedCount,
      actionRequiredCount,
      totalEngines: record.submissions.length,
      coverage: record.metrics.indexingCoveragePct,
      healthScore: record.metrics.healthScore,
    };
  }, [record]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/indexing/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteName,
          websiteUrl,
          sitemapUrl,
          feedUrl: feedUrl || undefined,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || 'Submission failed');
      }

      const payload = (await response.json()) as WebsiteIndexingRecord;
      setRecord(payload);
      showToast('success', 'Submitted to indexing pipeline successfully.');
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Submission failed';
      setError(message);
      showToast('error', message);
    } finally {
      setSubmitting(false);
    }
  };

  const refreshStatus = async () => {
    if (!record) return;

    setRefreshing(true);
    setError(null);

    try {
      const response = await fetch(`/api/indexing/${record.id}/refresh`, {
        method: 'POST',
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || 'Refresh failed');
      }

      const payload = (await response.json()) as WebsiteIndexingRecord;
      setRecord(payload);
      showToast('success', 'Status refreshed successfully.');
    } catch (refreshError) {
      const message = refreshError instanceof Error ? refreshError.message : 'Refresh failed';
      setError(message);
      showToast('error', message);
    } finally {
      setRefreshing(false);
    }
  };

  const checkCredentialHealth = async () => {
    setCheckingCredentials(true);
    setError(null);

    try {
      const response = await fetch('/api/indexing/credentials');
      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || 'Credential check failed');
      }

      const payload = (await response.json()) as CredentialHealth;
      setCredentialHealth(payload);
      showToast('success', 'Credential status checked.');
    } catch (credentialError) {
      const message =
        credentialError instanceof Error ? credentialError.message : 'Credential check failed';
      setError(message);
      showToast('error', message);
    } finally {
      setCheckingCredentials(false);
    }
  };

  const downloadEnvTemplate = async () => {
    setError(null);

    try {
      const response = await fetch('/api/indexing/env-template');
      if (!response.ok) {
        throw new Error('Failed to generate env template');
      }

      const content = await response.text();
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const href = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.download = 'indexing.env.template';
      anchor.click();

      URL.revokeObjectURL(href);
      showToast('success', 'Env template downloaded.');
    } catch (downloadError) {
      const message =
        downloadError instanceof Error
          ? downloadError.message
          : 'Failed to download env template';
      setError(message);
      showToast('error', message);
    }
  };

  const copyEnvTemplate = async () => {
    setError(null);

    try {
      const response = await fetch('/api/indexing/env-template');
      if (!response.ok) {
        throw new Error('Failed to load env template');
      }

      const content = await response.text();

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content);
        showToast('success', 'Env template copied to clipboard.');
        return;
      }

      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('success', 'Env template copied to clipboard.');
    } catch (copyError) {
      const message =
        copyError instanceof Error ? copyError.message : 'Failed to copy env template';
      setError(message);
      showToast('error', message);
    }
  };

  return (
    <main className="min-h-screen bg-lotus-bg px-5 sm:px-8 pt-28 pb-16">
      <section className="max-w-6xl mx-auto">
        {toast ? (
          <div className="mb-5">
            <ToastBanner toast={toast} />
          </div>
        ) : null}

        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Search Growth Engine</p>
          <h1 className="font-serif font-black text-lotus-cream text-4xl md:text-5xl mb-4">
            Search Engine Indexing Command Center
          </h1>
          <p className="text-lotus-muted max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Submit aligned websites to the world&apos;s top 10 search engines, track status in one place,
            and monitor visibility metrics with a clean, operator-friendly workflow.
          </p>
          <div className="mt-4">
            <Link href="/insights/indexing/portfolio" className="btn-ghost inline-flex">
              Open Portfolio Tracker
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6 mb-8">
          <form onSubmit={onSubmit} className="card-glass rounded-2xl p-6 border border-white/10">
            <h2 className="font-serif text-2xl font-bold text-lotus-cream mb-5">New Submission</h2>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-lotus-muted">Website Name</span>
                <input
                  value={websiteName}
                  onChange={(event) => setWebsiteName(event.target.value)}
                  className="mt-1 w-full rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-lotus-cream"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-lotus-muted">Website URL</span>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(event) => setWebsiteUrl(event.target.value)}
                  className="mt-1 w-full rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-lotus-cream"
                  placeholder="https://example.com"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-lotus-muted">Sitemap URL</span>
                <input
                  type="url"
                  value={sitemapUrl}
                  onChange={(event) => setSitemapUrl(event.target.value)}
                  className="mt-1 w-full rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-lotus-cream"
                  placeholder="https://example.com/sitemap.xml"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-lotus-muted">Feed URL (Optional)</span>
                <input
                  type="url"
                  value={feedUrl}
                  onChange={(event) => setFeedUrl(event.target.value)}
                  className="mt-1 w-full rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-lotus-cream"
                  placeholder="https://example.com/feed.xml"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit to Top 10 Engines'}
              </button>
              <button type="button" className="btn-ghost" onClick={downloadEnvTemplate}>
                Download Env Template
              </button>
              <button type="button" className="btn-ghost" onClick={copyEnvTemplate}>
                Copy Env Template
              </button>
              <button
                type="button"
                className="btn-ghost"
                disabled={checkingCredentials}
                onClick={checkCredentialHealth}
              >
                {checkingCredentials ? 'Checking Credentials...' : 'Check Engine Credentials'}
              </button>
              {record ? (
                <button
                  type="button"
                  className="btn-ghost"
                  disabled={refreshing}
                  onClick={refreshStatus}
                >
                  {refreshing ? 'Refreshing...' : 'Refresh Status'}
                </button>
              ) : null}
            </div>

            {error ? (
              <p className="mt-4 text-sm text-red-300 bg-red-400/10 border border-red-400/30 rounded-lg px-3 py-2">
                {error}
              </p>
            ) : null}

            {credentialHealth ? (
              <div className="mt-4 rounded-lg border border-white/15 bg-black/25 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-sm text-lotus-cream font-semibold">Credential Readiness</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${
                      credentialHealth.readyForLiveSubmission
                        ? 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10'
                        : 'text-amber-300 border-amber-400/30 bg-amber-400/10'
                    }`}
                  >
                    {credentialHealth.readyForLiveSubmission
                      ? 'Live Submission Ready'
                      : 'Needs Configuration'}
                  </span>
                </div>
                <p className="text-xs text-lotus-muted mb-3">
                  {credentialHealth.configuredCount}/{credentialHealth.total} credentials configured
                </p>
                <div className="space-y-2">
                  {credentialHealth.credentials.map((item) => (
                    <div
                      key={item.engineId}
                      className="flex items-start justify-between gap-3 rounded-md border border-white/10 px-3 py-2"
                    >
                      <div>
                        <p className="text-sm text-lotus-cream">{item.engineName}</p>
                        <p className="text-[11px] text-lotus-muted">{item.envVar}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${
                          item.configured
                            ? 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10'
                            : 'text-zinc-300 border-zinc-400/30 bg-zinc-400/10'
                        }`}
                      >
                        {item.configured ? 'Configured' : 'Missing'}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-lotus-muted mt-3">
                  Last checked: {new Date(credentialHealth.checkedAt).toLocaleString()}
                </p>
              </div>
            ) : null}
          </form>

          <aside className="card-glass-gold rounded-2xl p-6 border border-[#c9a84c33]">
            <h2 className="font-serif text-2xl font-bold text-lotus-cream mb-5">Top 10 Coverage</h2>
            <ul className="space-y-2 text-sm text-lotus-muted">
              {TOP_SEARCH_ENGINES.map((engine) => (
                <li key={engine.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span>{engine.name}</span>
                  <span className="text-xs uppercase tracking-wide text-lotus-gold">{engine.mode}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-lg border border-[#c9a84c44] bg-black/20 p-3 text-xs text-lotus-muted leading-relaxed">
              <p className="text-lotus-cream mb-1">Automation Tip</p>
              <p>
                Call <span className="text-lotus-gold">POST /api/indexing/refresh-all</span> on a schedule
                (e.g., every 6h) with header <span className="text-lotus-gold">x-cron-token</span>.
              </p>
            </div>
          </aside>
        </div>

        {record && kpis ? (
          <>
            <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-7">
              <article className="card-glass rounded-xl p-4">
                <p className="text-xs text-lotus-muted">Indexed Engines</p>
                <p className="text-2xl font-bold text-emerald-300">{kpis.indexedCount}</p>
              </article>
              <article className="card-glass rounded-xl p-4">
                <p className="text-xs text-lotus-muted">Action Required</p>
                <p className="text-2xl font-bold text-amber-300">{kpis.actionRequiredCount}</p>
              </article>
              <article className="card-glass rounded-xl p-4">
                <p className="text-xs text-lotus-muted">Coverage</p>
                <p className="text-2xl font-bold text-lotus-cream">{kpis.coverage}%</p>
              </article>
              <article className="card-glass rounded-xl p-4">
                <p className="text-xs text-lotus-muted">Health Score</p>
                <p className="text-2xl font-bold text-lotus-gold">{kpis.healthScore}</p>
              </article>
              <article className="card-glass rounded-xl p-4">
                <p className="text-xs text-lotus-muted">Avg Position</p>
                <p className="text-2xl font-bold text-sky-300">{record.metrics.averagePosition}</p>
              </article>
            </section>

            <section className="card-glass rounded-2xl p-6 mb-7">
              <h3 className="font-serif text-xl font-bold text-lotus-cream mb-4">Visibility Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-lotus-muted">Indexed URLs</p>
                  <p className="text-xl font-semibold text-lotus-cream">{record.metrics.indexedUrls}</p>
                </div>
                <div>
                  <p className="text-lotus-muted">Discovered URLs</p>
                  <p className="text-xl font-semibold text-lotus-cream">{record.metrics.discoveredUrls}</p>
                </div>
                <div>
                  <p className="text-lotus-muted">Impressions</p>
                  <p className="text-xl font-semibold text-lotus-cream">{record.metrics.estimatedImpressions}</p>
                </div>
                <div>
                  <p className="text-lotus-muted">Clicks</p>
                  <p className="text-xl font-semibold text-lotus-cream">{record.metrics.estimatedClicks}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-serif text-2xl font-bold text-lotus-cream mb-4">Per-Engine Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {record.submissions.map((submission) => (
                  <article key={submission.engineId} className="card-glass rounded-xl p-5 border border-white/10">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="font-semibold text-lotus-cream">{submission.engineName}</h4>
                        <p className="text-xs text-lotus-muted uppercase tracking-wide">{submission.mode}</p>
                      </div>
                      <span
                        className={`text-xs border rounded-full px-3 py-1 capitalize ${statusTone(
                          submission.status
                        )}`}
                      >
                        {submission.status.replace('-', ' ')}
                      </span>
                    </div>

                    <p className="text-sm text-lotus-muted mb-3">{submission.message}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <p className="text-lotus-muted">Indexed Pages</p>
                      <p className="text-lotus-cream text-right">{submission.details.indexedPages || '-'}</p>
                      <p className="text-lotus-muted">Coverage</p>
                      <p className="text-lotus-cream text-right">
                        {typeof submission.details.coveragePct === 'number'
                          ? `${submission.details.coveragePct}%`
                          : '-'}
                      </p>
                      <p className="text-lotus-muted">Impressions</p>
                      <p className="text-lotus-cream text-right">{submission.details.impressions || '-'}</p>
                      <p className="text-lotus-muted">Avg Position</p>
                      <p className="text-lotus-cream text-right">{submission.details.avgPosition || '-'}</p>
                    </div>

                    {submission.nextAction ? (
                      <p className="text-xs text-amber-200 bg-amber-400/10 border border-amber-400/25 rounded px-2 py-1 mt-3">
                        Action: {submission.nextAction}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </section>
    </main>
  );
}
