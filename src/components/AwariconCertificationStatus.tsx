'use client';

import { useState } from 'react';
import { awariconTiers } from '@/content/awaricon';
import type { CertificationStatus } from '@/lib/awariconCertification';

interface StatusPayload {
  id: string;
  site: string;
  organizationName: string;
  status: CertificationStatus;
  score: number;
  recommendedTier: string | null;
  tierAwarded: string | null;
  tierRequested: string | null;
  reviewNotes: string | null;
  submittedAt: string;
  reviewedAt: string | null;
}

const STATUS_LABEL: Record<CertificationStatus, string> = {
  submitted: 'Submitted — awaiting review',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Not approved',
  revoked: 'Certification revoked',
};

const STATUS_COLOR: Record<CertificationStatus, string> = {
  submitted: 'text-lotus-muted',
  under_review: 'text-lotus-gold',
  approved: 'text-[#bff9cf]',
  rejected: 'text-[#ffb5b5]',
  revoked: 'text-[#ffb5b5]',
};

export default function AwariconCertificationStatus() {
  const [applicationId, setApplicationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<StatusPayload | null>(null);

  const check = async () => {
    const id = applicationId.trim();
    if (!id) return;

    setLoading(true);
    setError('');
    setStatus(null);

    try {
      const response = await fetch(`/api/awaricon/certification/status?id=${encodeURIComponent(id)}`);
      const payload = (await response.json()) as StatusPayload & { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Application not found.');
      }
      setStatus(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lookup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const awardedTier = awariconTiers.find((t) => t.key === status?.tierAwarded);
  const recommendedTier = awariconTiers.find((t) => t.key === status?.recommendedTier);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <p className="eyebrow mb-2">Check Your Status</p>
      <h2 className="font-serif text-2xl font-black text-lotus-cream">Application Status Lookup</h2>
      <p className="mt-2 text-sm text-lotus-muted">Enter the application ID you received after submitting.</p>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && void check()}
          placeholder="aw-lxyz1234-abc7def"
          className="flex-1 rounded-xl border border-white/15 bg-black/25 px-4 py-3 font-mono text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
        />
        <button
          type="button"
          className="btn-primary !px-5 !py-2 !text-sm shrink-0"
          disabled={loading || !applicationId.trim()}
          onClick={() => void check()}
        >
          {loading ? 'Checking…' : 'Check'}
        </button>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-[#ffb5b5]">{error}</p>
      ) : null}

      {status ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-lotus-muted/60 mb-1">Organization</p>
                <p className="font-serif text-lg font-bold text-lotus-cream">{status.organizationName}</p>
                <p className="text-sm text-lotus-muted">{status.site}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-lotus-muted/60 mb-1">Status</p>
                <p className={`font-semibold text-sm ${STATUS_COLOR[status.status]}`}>{STATUS_LABEL[status.status]}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase tracking-widest text-lotus-muted/50 mb-1">Aw Score</p>
                <p className="font-serif text-2xl font-black text-lotus-cream">{status.score}</p>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase tracking-widest text-lotus-muted/50 mb-1">Recommended Tier</p>
                <p className="text-sm font-semibold text-lotus-cream">
                  {recommendedTier ? recommendedTier.metal : 'Below Bronze'}
                </p>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase tracking-widest text-lotus-muted/50 mb-1">Submitted</p>
                <p className="text-sm text-lotus-muted">{new Date(status.submittedAt).toLocaleDateString()}</p>
              </div>
            </div>

            {status.status === 'approved' && awardedTier ? (
              <div className="mt-4 rounded-xl border border-lotus-gold/30 bg-lotus-gold-dim p-4">
                <p className="text-xs uppercase tracking-widest text-lotus-gold/70 mb-1">Certification Awarded</p>
                <p className="font-serif text-xl font-black text-lotus-cream">{awardedTier.label}</p>
                <p className="mt-1 text-sm text-lotus-muted">{awardedTier.claim}</p>
                {status.reviewedAt ? (
                  <p className="mt-2 text-xs text-lotus-muted/60">Awarded: {new Date(status.reviewedAt).toLocaleDateString()}</p>
                ) : null}
                <p className="mt-3 text-xs text-lotus-muted/60">
                  You can now request signed embed tokens for <strong className="text-lotus-muted">{status.site}</strong> from the{' '}
                  <a href="/awaricon/admin" className="underline hover:text-lotus-cream transition">admin console</a> or your account manager.
                </p>
              </div>
            ) : null}

            {(status.status === 'rejected' || status.status === 'revoked') && status.reviewNotes ? (
              <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-widest text-lotus-muted/50 mb-1">Review Notes</p>
                <p className="text-sm text-lotus-muted leading-relaxed">{status.reviewNotes}</p>
              </div>
            ) : null}

            {status.status === 'submitted' || status.status === 'under_review' ? (
              <p className="mt-4 text-xs text-lotus-muted/60">
                Your application is being reviewed by the Forever Lotus team. Review typically takes 3–10 business days.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
