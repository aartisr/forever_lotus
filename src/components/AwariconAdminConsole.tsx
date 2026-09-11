'use client';

import { useEffect, useMemo, useState } from 'react';
import { awariconTiers, type AwariconTier } from '@/content/awaricon';
import type { AwariconCertificationRecord, CertificationStatus } from '@/lib/awariconCertification';

type TierKey = AwariconTier['key'];

interface EmbedTokenPayload {
  tier: TierKey;
  site: string;
  exp: number;
  sig: string;
}

interface VerificationResult {
  ok: boolean;
  statusCode: number;
  contentType: string;
  message: string;
  checkedAt: string;
}

interface AuditEntry {
  id: string;
  action: 'site_added' | 'site_removed' | 'token_issued';
  site: string;
  tier?: string;
  exp?: number;
  createdAt: string;
}

function withAdminHeader(adminKey: string): HeadersInit {
  if (!adminKey.trim()) {
    return {};
  }

  return {
    'x-awaricon-admin-key': adminKey.trim(),
  };
}

function buildSignedUrl(origin: string, token: EmbedTokenPayload): string {
  return `${origin}/api/awaricon/badge?tier=${token.tier}&site=${encodeURIComponent(token.site)}&exp=${token.exp}&sig=${token.sig}`;
}

function copyValue(value: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }

  return Promise.reject(new Error('Clipboard unavailable'));
}

export default function AwariconAdminConsole() {
  const [adminKey, setAdminKey] = useState('');
  const [sites, setSites] = useState<string[]>([]);
  const [siteInput, setSiteInput] = useState('');
  const [status, setStatus] = useState('Enter admin key and load sites.');
  const [tokenTier, setTokenTier] = useState<TierKey>('gold');
  const [tokenSite, setTokenSite] = useState('');
  const [tokenDays, setTokenDays] = useState(30);
  const [token, setToken] = useState<EmbedTokenPayload | null>(null);
  const [copied, setCopied] = useState('');
  const [origin, setOrigin] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);

  // Certifications
  const [certifications, setCertifications] = useState<AwariconCertificationRecord[]>([]);
  const [certLoading, setCertLoading] = useState(false);
  const [certStatusFilter, setCertStatusFilter] = useState<CertificationStatus | ''>('submitted');
  const [reviewTarget, setReviewTarget] = useState<AwariconCertificationRecord | null>(null);
  const [reviewTier, setReviewTier] = useState<string>('gold');
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const signedUrl = useMemo(() => {
    if (!origin || !token) {
      return '';
    }

    return buildSignedUrl(origin, token);
  }, [origin, token]);

  const signedSnippet = useMemo(() => {
    if (!signedUrl || !token) {
      return '';
    }

    const tier = awariconTiers.find((item) => item.key === token.tier);
    const label = tier?.label ?? 'Awaricon badge';

    return `<a href="${origin}/awaricon/legal" target="_blank" rel="noopener noreferrer" aria-label="${label} compliance badge">
  <img src="${signedUrl}" alt="${label} compliance badge" width="180" height="180" loading="lazy" />
</a>`;
  }, [origin, signedUrl, token]);

  const expiryInfo = useMemo(() => {
    if (!token) {
      return null;
    }

    const expiresAt = new Date(token.exp * 1000);
    const secondsLeft = token.exp - Math.floor(Date.now() / 1000);
    return {
      expiresAt,
      secondsLeft,
      expired: secondsLeft <= 0,
    };
  }, [token]);

  const loadSites = async (): Promise<void> => {
    setStatus('Loading approved sites...');
    try {
      const response = await fetch('/api/awaricon/admin/sites', {
        headers: withAdminHeader(adminKey),
      });
      const payload = (await response.json()) as { sites?: string[]; error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to load sites.');
      }

      const nextSites = payload.sites ?? [];
      setSites(nextSites);
      if (!tokenSite && nextSites[0]) {
        setTokenSite(nextSites[0]);
      }
      setStatus(`Loaded ${nextSites.length} approved sites.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to load sites.');
    }
  };

  const addSite = async (): Promise<void> => {
    setStatus('Adding site...');
    try {
      const response = await fetch('/api/awaricon/admin/sites', {
        method: 'POST',
        headers: {
          ...withAdminHeader(adminKey),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ site: siteInput }),
      });
      const payload = (await response.json()) as { sites?: string[]; error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to add site.');
      }

      const nextSites = payload.sites ?? [];
      setSites(nextSites);
      setSiteInput('');
      setStatus('Site added.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to add site.');
    }
  };

  const removeSite = async (site: string): Promise<void> => {
    setStatus(`Removing ${site}...`);
    try {
      const response = await fetch('/api/awaricon/admin/sites', {
        method: 'DELETE',
        headers: {
          ...withAdminHeader(adminKey),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ site }),
      });
      const payload = (await response.json()) as { sites?: string[]; error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to remove site.');
      }

      const nextSites = payload.sites ?? [];
      setSites(nextSites);
      if (tokenSite === site) {
        setTokenSite(nextSites[0] ?? '');
      }
      setStatus('Site removed.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to remove site.');
    }
  };

  const generateToken = async (): Promise<void> => {
    setStatus('Generating signed token...');
    try {
      const response = await fetch(
        `/api/awaricon/embed-token?tier=${tokenTier}&site=${encodeURIComponent(tokenSite)}&days=${tokenDays}`,
        {
          headers: withAdminHeader(adminKey),
        }
      );
      const payload = (await response.json()) as EmbedTokenPayload & { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to generate token.');
      }

      setToken(payload);
      setVerification(null);
      setStatus('Signed token generated.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to generate token.');
    }
  };

  const verifySignedBadge = async (): Promise<void> => {
    if (!signedUrl) {
      return;
    }

    setVerifying(true);
    setStatus('Verifying signed badge URL...');
    try {
      const response = await fetch(signedUrl, { cache: 'no-store' });
      const contentType = response.headers.get('content-type') ?? '';
      const isSvg = contentType.includes('image/svg+xml');
      const ok = response.ok && isSvg;

      const result: VerificationResult = {
        ok,
        statusCode: response.status,
        contentType,
        message: ok
          ? 'Signature valid. Badge endpoint returned SVG successfully.'
          : 'Verification failed. Check signature, expiry, and approved domain.',
        checkedAt: new Date().toISOString(),
      };

      setVerification(result);
      setStatus(result.message);
    } catch {
      const result: VerificationResult = {
        ok: false,
        statusCode: 0,
        contentType: 'n/a',
        message: 'Verification request failed. Check network connectivity or URL.',
        checkedAt: new Date().toISOString(),
      };
      setVerification(result);
      setStatus(result.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleCopy = async (value: string, key: string): Promise<void> => {
    try {
      await copyValue(value);
      setCopied(key);
      window.setTimeout(() => setCopied(''), 1800);
    } catch {
      setCopied('');
    }
  };

  const loadAuditLog = async (): Promise<void> => {
    setAuditLoading(true);
    try {
      const response = await fetch('/api/awaricon/admin/audit?limit=100', {
        headers: withAdminHeader(adminKey),
      });
      const payload = (await response.json()) as { entries?: AuditEntry[]; error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to load audit log.');
      }
      setAuditEntries(payload.entries ?? []);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to load audit log.');
    } finally {
      setAuditLoading(false);
    }
  };

  const loadCertifications = async (): Promise<void> => {
    setCertLoading(true);
    try {
      const qs = certStatusFilter ? `&status=${certStatusFilter}` : '';
      const response = await fetch(`/api/awaricon/admin/certifications?limit=100${qs}`, {
        headers: withAdminHeader(adminKey),
      });
      const payload = (await response.json()) as { certifications?: AwariconCertificationRecord[]; error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'Failed to load certifications.');
      setCertifications(payload.certifications ?? []);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to load certifications.');
    } finally {
      setCertLoading(false);
    }
  };

  const submitReview = async (
    id: string,
    action: 'approve' | 'reject' | 'revoke' | 'mark_under_review'
  ): Promise<void> => {
    setReviewing(true);
    try {
      const response = await fetch(`/api/awaricon/admin/certifications/${id}/review`, {
        method: 'POST',
        headers: { ...withAdminHeader(adminKey), 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, tierAwarded: action === 'approve' ? reviewTier : undefined, notes: reviewNotes || undefined }),
      });
      const payload = (await response.json()) as { certification?: AwariconCertificationRecord; error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'Review action failed.');
      setReviewTarget(null);
      setReviewNotes('');
      await loadCertifications();
      setStatus(`Review action "${action}" applied.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Review action failed.');
    } finally {
      setReviewing(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8" aria-labelledby="awaricon-admin-heading">
      <p className="eyebrow mb-3">Awaricon Admin</p>
      <h1 id="awaricon-admin-heading" className="font-serif text-lotus-cream" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900 }}>
        Domain and Token Management Console
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-lotus-muted">
        Use this console to manage approved domains and generate signed badge URLs. Domain approvals are persisted via the configured data layer. Keep your admin key private.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-serif text-xl text-lotus-cream">Admin Authentication</h2>
          <input
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            placeholder="AWARICON_ADMIN_KEY"
            className="mt-3 w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
          />
          <button type="button" className="btn-primary mt-3 !px-4 !py-2 !text-xs" onClick={() => void loadSites()}>
            Load Approved Sites
          </button>
          <p className="mt-3 text-xs text-lotus-muted">{status}</p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-serif text-xl text-lotus-cream">Manage Approved Domains</h2>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={siteInput}
              onChange={(event) => setSiteInput(event.target.value)}
              placeholder="example.com"
              className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
            />
            <button type="button" className="btn-ghost !px-4 !py-2 !text-xs" onClick={() => void addSite()}>
              Add
            </button>
          </div>

          <ul className="mt-4 space-y-2">
            {sites.map((site) => (
              <li key={site} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#070914] px-3 py-2 text-sm text-lotus-muted">
                <span>{site}</span>
                <button type="button" className="btn-ghost !px-3 !py-1 !text-xs" onClick={() => void removeSite(site)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-lotus-gold/30 bg-lotus-gold-dim p-5">
        <h2 className="font-serif text-xl text-lotus-cream">Generate Signed Badge Snippet</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <label className="text-xs text-lotus-muted">
            Tier
            <select
              value={tokenTier}
              onChange={(event) => setTokenTier(event.target.value as TierKey)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-lotus-cream"
            >
              {awariconTiers.map((tier) => (
                <option key={tier.key} value={tier.key}>{tier.label}</option>
              ))}
            </select>
          </label>

          <label className="text-xs text-lotus-muted md:col-span-2">
            Site
            <input
              type="text"
              value={tokenSite}
              onChange={(event) => setTokenSite(event.target.value)}
              placeholder="example.com"
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-lotus-cream"
            />
          </label>

          <label className="text-xs text-lotus-muted">
            Expiration (days)
            <input
              type="number"
              min={1}
              max={365}
              value={tokenDays}
              onChange={(event) => setTokenDays(Number(event.target.value) || 30)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-lotus-cream"
            />
          </label>
        </div>

        <button type="button" className="btn-primary mt-4 !px-5 !py-2 !text-xs" onClick={() => void generateToken()}>
          Generate Signed URL
        </button>

        {signedUrl ? (
          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-1 text-xs text-lotus-muted">Signed image URL</p>
              <textarea readOnly value={signedUrl} className="h-20 w-full rounded-xl border border-white/15 bg-black/30 p-3 font-mono text-[11px] text-lotus-cream/90" />
              <button type="button" className="btn-ghost mt-2 !px-4 !py-2 !text-xs" onClick={() => void handleCopy(signedUrl, 'url')}>
                {copied === 'url' ? 'Copied' : 'Copy URL'}
              </button>
            </div>
            <div>
              <p className="mb-1 text-xs text-lotus-muted">Signed embed HTML</p>
              <textarea readOnly value={signedSnippet} className="h-28 w-full rounded-xl border border-white/15 bg-black/30 p-3 font-mono text-[11px] text-lotus-cream/90" />
              <button type="button" className="btn-ghost mt-2 !px-4 !py-2 !text-xs" onClick={() => void handleCopy(signedSnippet, 'html')}>
                {copied === 'html' ? 'Copied' : 'Copy HTML'}
              </button>
            </div>

            <div className="rounded-xl border border-white/12 bg-[#070914] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lotus-gold/70">Signed Badge Verification</p>
                <button type="button" className="btn-primary !px-4 !py-2 !text-xs" onClick={() => void verifySignedBadge()} disabled={verifying}>
                  {verifying ? 'Verifying...' : 'Verify Signed URL'}
                </button>
              </div>

              {expiryInfo ? (
                <div className="mt-3 text-xs text-lotus-muted">
                  <p>Expires: {expiryInfo.expiresAt.toLocaleString()}</p>
                  <p>
                    Remaining: {expiryInfo.expired ? 'Expired' : `${Math.floor(expiryInfo.secondsLeft / 60)} min`}
                  </p>
                </div>
              ) : null}

              {verification ? (
                <div className="mt-3 rounded-lg border border-white/10 bg-black/25 p-3 text-xs">
                  <p className={verification.ok ? 'text-[#bff9cf]' : 'text-[#ffb5b5]'}>{verification.message}</p>
                  <p className="mt-1 text-lotus-muted">HTTP: {verification.statusCode}</p>
                  <p className="text-lotus-muted">Content-Type: {verification.contentType || 'n/a'}</p>
                  <p className="text-lotus-muted">Checked: {new Date(verification.checkedAt).toLocaleString()}</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </article>

      <article className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-xl text-lotus-cream">Audit Log</h2>
          <button
            type="button"
            className="btn-ghost !px-4 !py-2 !text-xs"
            onClick={() => void loadAuditLog()}
            disabled={auditLoading}
          >
            {auditLoading ? 'Loading…' : 'Refresh Log'}
          </button>
        </div>
        <p className="mt-1 text-xs text-lotus-muted">Records domain changes and every token issuance. Persisted via the active data layer.</p>

        {auditEntries.length === 0 ? (
          <p className="mt-4 text-xs text-lotus-muted/60">No entries loaded. Click Refresh Log to fetch.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs text-lotus-muted">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-lotus-muted/50">
                  <th className="pb-2 pr-4">When</th>
                  <th className="pb-2 pr-4">Action</th>
                  <th className="pb-2 pr-4">Site</th>
                  <th className="pb-2">Tier / Exp</th>
                </tr>
              </thead>
              <tbody>
                {auditEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-white/5 align-top">
                    <td className="py-2 pr-4 tabular-nums text-lotus-muted/70">{new Date(entry.createdAt).toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <span className={
                        entry.action === 'token_issued'
                          ? 'text-lotus-gold/80'
                          : entry.action === 'site_added'
                          ? 'text-[#bff9cf]'
                          : 'text-[#ffb5b5]'
                      }>
                        {entry.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-2 pr-4 font-mono">{entry.site}</td>
                    <td className="py-2 text-lotus-muted/70">
                      {entry.tier ? entry.tier : '—'}
                      {entry.exp ? ` · exp ${new Date(entry.exp * 1000).toLocaleDateString()}` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>

      {/* ── Certifications ── */}
      <article className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl text-lotus-cream">Certification Applications</h2>
            <p className="mt-1 text-xs text-lotus-muted">Review, approve, or reject Awaricon certification applications.</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={certStatusFilter}
              onChange={(e) => setCertStatusFilter(e.target.value as CertificationStatus | '')}
              className="rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-xs text-lotus-cream"
            >
              <option value="">All statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="revoked">Revoked</option>
            </select>
            <button
              type="button"
              className="btn-ghost !px-4 !py-2 !text-xs"
              onClick={() => void loadCertifications()}
              disabled={certLoading}
            >
              {certLoading ? 'Loading…' : 'Load Applications'}
            </button>
          </div>
        </div>

        {certifications.length === 0 ? (
          <p className="mt-4 text-xs text-lotus-muted/60">No applications loaded. Click Load Applications to fetch.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="rounded-xl border border-white/10 bg-[#070914] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sm text-lotus-cream">{cert.organizationName}</p>
                    <p className="text-xs text-lotus-muted">{cert.site}</p>
                    <p className="mt-1 text-xs text-lotus-muted/60">ID: <code className="font-mono">{cert.id}</code></p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-semibold ${
                      cert.status === 'approved' ? 'text-[#bff9cf]' :
                      cert.status === 'rejected' || cert.status === 'revoked' ? 'text-[#ffb5b5]' :
                      cert.status === 'under_review' ? 'text-lotus-gold' : 'text-lotus-muted'
                    }`}>{cert.status.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-lotus-muted/60">Aw {cert.score} · {cert.recommendedTier ?? 'no tier'}</p>
                    {cert.tierAwarded ? <p className="text-xs text-[#bff9cf]">Awarded: {cert.tierAwarded}</p> : null}
                  </div>
                </div>

                <div className="mt-3 text-xs text-lotus-muted/70 line-clamp-2">{cert.description}</div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-ghost !px-3 !py-1 !text-xs"
                    onClick={() => { setReviewTarget(cert); setReviewTier(cert.recommendedTier ?? 'gold'); setReviewNotes(''); }}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review Modal */}
        {reviewTarget ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#070914] p-6 shadow-2xl">
              <h3 className="font-serif text-xl text-lotus-cream">Review: {reviewTarget.organizationName}</h3>
              <p className="mt-1 text-xs text-lotus-muted">{reviewTarget.site} · Aw {reviewTarget.score}</p>

              <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] p-3 text-xs text-lotus-muted leading-relaxed max-h-28 overflow-y-auto">
                {reviewTarget.statement}
              </div>

              <div className="mt-4 grid gap-3">
                <div>
                  <label className="text-xs text-lotus-muted/60 mb-1 block">Tier to Award (on approve)</label>
                  <select
                    value={reviewTier}
                    onChange={(e) => setReviewTier(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-lotus-cream"
                  >
                    {awariconTiers.map((t) => (
                      <option key={t.key} value={t.key}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-lotus-muted/60 mb-1 block">Review Notes (optional)</label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Feedback for the applicant…"
                    className="h-20 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-lotus-cream outline-none"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" className="btn-primary !px-4 !py-2 !text-xs" disabled={reviewing} onClick={() => void submitReview(reviewTarget.id, 'approve')}>Approve</button>
                <button type="button" className="btn-ghost !px-4 !py-2 !text-xs" disabled={reviewing} onClick={() => void submitReview(reviewTarget.id, 'mark_under_review')}>Mark Under Review</button>
                <button type="button" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-[#ffb5b5] hover:bg-red-500/20 transition" disabled={reviewing} onClick={() => void submitReview(reviewTarget.id, 'reject')}>Reject</button>
                {reviewTarget.status === 'approved' ? (
                  <button type="button" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-[#ffb5b5] hover:bg-red-500/20 transition" disabled={reviewing} onClick={() => void submitReview(reviewTarget.id, 'revoke')}>Revoke</button>
                ) : null}
                <button type="button" className="btn-ghost !px-4 !py-2 !text-xs ml-auto" onClick={() => setReviewTarget(null)}>Cancel</button>
              </div>
            </div>
          </div>
        ) : null}
      </article>
    </section>
  );
}
