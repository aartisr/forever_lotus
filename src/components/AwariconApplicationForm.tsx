'use client';

import { useMemo, useState } from 'react';
import {
  INTEGRITY_INDICATORS,
  computeIntegrity,
  computeOmega,
  computeScore,
  determineRecommendedTier,
  type IntegrityKey,
} from '@/lib/awariconCertification';
import { awariconTiers } from '@/content/awaricon';

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5;

interface FormState {
  site: string;
  organizationName: string;
  contactEmail: string;
  description: string;
  phi: number;
  df: number;
  operatingYears: number;
  integrityFlags: IntegrityKey[];
  statement: string;
  tierRequested: string;
}

interface SubmitResult {
  id: string;
  site: string;
  score: number;
  recommendedTier: string | null;
  status: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  site: '',
  organizationName: '',
  contactEmail: '',
  description: '',
  phi: 7,
  df: 7,
  operatingYears: 1,
  integrityFlags: [],
  statement: '',
  tierRequested: '',
};

const STEP_LABELS: Record<Step, string> = {
  1: 'Identity',
  2: 'Self-Assessment',
  3: 'Integrity',
  4: 'Statement',
  5: 'Review',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function ScoreSlider({
  label,
  sublabel,
  value,
  onChange,
}: {
  label: string;
  sublabel: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-semibold text-lotus-cream">{label}</span>
        <span className="rounded-lg bg-white/10 px-2 py-0.5 font-mono text-xs text-lotus-gold">{value.toFixed(1)}</span>
      </div>
      <p className="mb-3 text-xs text-lotus-muted/70">{sublabel}</p>
      <input
        type="range"
        min={0}
        max={10}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-lotus-gold"
      />
      <div className="mt-1 flex justify-between text-[10px] text-lotus-muted/50">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </label>
  );
}

function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-label="Progress steps">
      {Array.from({ length: total }, (_, i) => {
        const step = (i + 1) as Step;
        const done = current > step;
        const active = current === step;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                active
                  ? 'bg-lotus-gold text-black'
                  : done
                  ? 'bg-lotus-gold/30 text-lotus-gold'
                  : 'bg-white/10 text-lotus-muted/50'
              }`}
            >
              {done ? '✓' : step}
            </div>
            {i < total - 1 && (
              <div className={`h-px w-6 transition-all ${done ? 'bg-lotus-gold/40' : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AwariconApplicationForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleFlag = (flag: IntegrityKey) => {
    setForm((prev) => ({
      ...prev,
      integrityFlags: prev.integrityFlags.includes(flag)
        ? prev.integrityFlags.filter((f) => f !== flag)
        : [...prev.integrityFlags, flag],
    }));
  };

  // Live score preview
  const preview = useMemo(() => {
    const omega = computeOmega(form.operatingYears);
    const integrity = computeIntegrity(form.integrityFlags);
    const score = computeScore(form.phi, form.df, omega, integrity);
    const tier = determineRecommendedTier(score);
    return { omega, integrity, score, tier };
  }, [form.phi, form.df, form.operatingYears, form.integrityFlags]);

  const canAdvance = useMemo(() => {
    if (step === 1) return form.site.trim() && form.organizationName.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contactEmail) && form.description.trim().length >= 20;
    if (step === 2) return Number.isFinite(form.phi) && Number.isFinite(form.df) && Number.isFinite(form.operatingYears);
    if (step === 3) return form.integrityFlags.length >= 1;
    if (step === 4) return form.statement.trim().length >= 50 && form.statement.length <= 1500;
    return true;
  }, [step, form]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/awaricon/certification/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: form.site,
          organizationName: form.organizationName,
          contactEmail: form.contactEmail,
          description: form.description,
          phi: form.phi,
          df: form.df,
          operatingYears: form.operatingYears,
          integrityFlags: form.integrityFlags,
          statement: form.statement,
          tierRequested: form.tierRequested || undefined,
        }),
      });
      const payload = (await response.json()) as SubmitResult & { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Submission failed.');
      }
      setResult(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyId = async () => {
    if (!result?.id) return;
    try {
      await navigator.clipboard.writeText(result.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (result) {
    const awardedTier = awariconTiers.find((t) => t.key === result.recommendedTier);
    return (
      <div className="rounded-3xl border border-lotus-gold/30 bg-lotus-gold-dim p-8 text-center">
        <p className="eyebrow mb-4">Application Received</p>
        <h2 className="font-serif text-3xl font-black text-lotus-cream">Your Awaricon application is submitted.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-lotus-muted leading-relaxed">
          Save your application ID below. Use it on the status page at any time to check your review progress.
        </p>

        <div className="mx-auto mt-6 flex max-w-sm items-center justify-between gap-3 rounded-xl border border-white/20 bg-black/30 px-4 py-3">
          <code className="font-mono text-sm text-lotus-cream">{result.id}</code>
          <button type="button" onClick={() => void copyId()} className="btn-ghost !px-3 !py-1 !text-xs shrink-0">
            {copied ? 'Copied' : 'Copy ID'}
          </button>
        </div>

        <div className="mx-auto mt-6 grid max-w-sm gap-3">
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
            <p className="text-xs uppercase tracking-widest text-lotus-muted/60 mb-1">Computed Aw Score</p>
            <p className="font-serif text-2xl font-black text-lotus-cream">{result.score}</p>
          </div>
          {awardedTier ? (
            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-widest text-lotus-muted/60 mb-1">Recommended Tier</p>
              <p className="font-serif text-xl font-bold text-lotus-cream">{awardedTier.label}</p>
              <p className="mt-1 text-xs text-lotus-muted">{awardedTier.claim}</p>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-lotus-muted">
              Score below Bronze threshold. Consider strengthening your Phi, Df, and integrity practices before reapplying.
            </div>
          )}
        </div>
        <p className="mt-6 text-xs text-lotus-muted/60">
          Awaricon certification is reviewed by the Forever Lotus team. You will be contacted at your registered email upon a decision.
        </p>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow mb-1">Step {step} of 5 — {STEP_LABELS[step]}</p>
          <h2 className="font-serif text-2xl font-black text-lotus-cream">Awaricon Certification Application</h2>
        </div>
        <StepIndicator current={step} total={5} />
      </div>

      {/* ── Step 1: Identity ── */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-lotus-muted/70">Website URL *</label>
            <input
              type="url"
              value={form.site}
              onChange={(e) => set('site', e.target.value)}
              placeholder="https://yourwebsite.org"
              className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-lotus-muted/70">Organization Name *</label>
            <input
              type="text"
              value={form.organizationName}
              onChange={(e) => set('organizationName', e.target.value)}
              placeholder="Your organization or project name"
              className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-lotus-muted/70">Contact Email *</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => set('contactEmail', e.target.value)}
              placeholder="you@yourorganization.org"
              className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-lotus-muted/70">Mission Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe your website's purpose and mission in 20–500 characters…"
              className="h-24 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
              maxLength={500}
            />
            <p className="mt-1 text-right text-xs text-lotus-muted/50">{form.description.length}/500</p>
          </div>
        </div>
      )}

      {/* ── Step 2: Self-Assessment ── */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-lotus-muted leading-relaxed">
            Score your website honestly against the three Awaricon dimensions. These scores contribute 90% to your computed Aw value.
          </p>
          <ScoreSlider
            label="Φ · Phi — Presence Quality"
            sublabel="How authentic, intentional, and non-synthetic is your digital presence? 10 = deeply human-centered."
            value={form.phi}
            onChange={(v) => set('phi', v)}
          />
          <ScoreSlider
            label="Df · Dignity Fidelity"
            sublabel="How well do you uphold user dignity — in data practices, design, and power dynamics? 10 = exemplary."
            value={form.df}
            onChange={(v) => set('df', v)}
          />
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-lotus-cream">Ω · Years of Operation</span>
              <span className="rounded-lg bg-white/10 px-2 py-0.5 font-mono text-xs text-lotus-gold">{form.operatingYears} yr{form.operatingYears !== 1 ? 's' : ''} → Ω {preview.omega}</span>
            </div>
            <p className="mb-3 text-xs text-lotus-muted/70">Longer trajectories are trusted more. A brand-new site starts at Ω = 1.</p>
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={form.operatingYears}
              onChange={(e) => set('operatingYears', Number(e.target.value))}
              className="w-full accent-lotus-gold"
            />
          </div>

          {/* Live score preview */}
          <div className="rounded-2xl border border-lotus-gold/30 bg-lotus-gold-dim p-4">
            <p className="text-xs uppercase tracking-widest text-lotus-gold/70 mb-2">Live Score Preview</p>
            <p className="font-serif text-3xl font-black text-lotus-cream">{preview.score}</p>
            {preview.tier ? (
              <p className="mt-1 text-sm text-lotus-muted">
                {awariconTiers.find((t) => t.key === preview.tier)?.label}
              </p>
            ) : (
              <p className="mt-1 text-sm text-lotus-muted/60">Below Bronze threshold</p>
            )}
            <p className="mt-2 text-xs text-lotus-muted/50">Integrity indicators (Step 3) will adjust the final score.</p>
          </div>
        </div>
      )}

      {/* ── Step 3: Integrity ── */}
      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm text-lotus-muted leading-relaxed">
            Select all integrity commitments your website currently meets. These count as 10% of your Aw score and are verified by reviewers.
          </p>
          <ul className="space-y-3">
            {INTEGRITY_INDICATORS.map((indicator) => {
              const checked = form.integrityFlags.includes(indicator.key);
              return (
                <li key={indicator.key}>
                  <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                    checked ? 'border-lotus-gold/40 bg-lotus-gold-dim' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFlag(indicator.key)}
                      className="mt-0.5 accent-lotus-gold"
                    />
                    <span className="text-sm text-lotus-cream leading-snug">{indicator.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
            <p className="text-xs text-lotus-muted">
              {form.integrityFlags.length}/{INTEGRITY_INDICATORS.length} selected · Integrity score: <strong className="text-lotus-cream">{preview.integrity}/10</strong> · Current Aw: <strong className="text-lotus-cream">{preview.score}</strong>
            </p>
          </div>
        </div>
      )}

      {/* ── Step 4: Statement ── */}
      {step === 4 && (
        <div className="space-y-4">
          <p className="text-sm text-lotus-muted leading-relaxed">
            Write a supporting statement explaining why your website embodies the Awaricon principles: conscious creation, dignified agency, and responsible stewardship.
          </p>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-lotus-muted/70">Supporting Statement * (50–1500 characters)</label>
            <textarea
              value={form.statement}
              onChange={(e) => set('statement', e.target.value)}
              placeholder="Describe how your website embodies presence-based trust, protects user dignity, and contributes to conscious digital civilization…"
              className="h-48 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
              maxLength={1500}
            />
            <p className={`mt-1 text-right text-xs ${form.statement.length > 1400 ? 'text-[#ffb5b5]' : 'text-lotus-muted/50'}`}>{form.statement.length}/1500</p>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-lotus-muted/70">Preferred Tier (optional)</label>
            <select
              value={form.tierRequested}
              onChange={(e) => set('tierRequested', e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
            >
              <option value="">— Let the system recommend —</option>
              {awariconTiers.map((t) => (
                <option key={t.key} value={t.key}>{t.label} ({t.scoreRange})</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── Step 5: Review ── */}
      {step === 5 && (
        <div className="space-y-4">
          <p className="text-sm text-lotus-muted">Review your application before submitting. Your contact email is used only for certification communications.</p>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm">
            <ReviewRow label="Website" value={form.site} />
            <ReviewRow label="Organization" value={form.organizationName} />
            <ReviewRow label="Contact" value={form.contactEmail} />
            <ReviewRow label="Description" value={form.description} />
            <ReviewRow label="Phi" value={form.phi.toString()} />
            <ReviewRow label="Df" value={form.df.toString()} />
            <ReviewRow label="Operating years" value={`${form.operatingYears} → Ω ${preview.omega}`} />
            <ReviewRow label="Integrity flags" value={`${form.integrityFlags.length}/${INTEGRITY_INDICATORS.length}`} />
            <ReviewRow label="Statement length" value={`${form.statement.length} chars`} />
            <div className="border-t border-white/10 pt-3">
              <ReviewRow label="Computed Aw Score" value={preview.score.toString()} highlight />
              <ReviewRow
                label="Recommended Tier"
                value={preview.tier ? (awariconTiers.find((t) => t.key === preview.tier)?.label ?? '—') : 'Below Bronze'}
                highlight
              />
            </div>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-[#ffb5b5]">{error}</p>
          ) : null}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            className="btn-ghost !px-5 !py-2 !text-sm"
            onClick={() => setStep((prev) => (prev - 1) as Step)}
          >
            ← Back
          </button>
        ) : (
          <div />
        )}
        {step < 5 ? (
          <button
            type="button"
            className="btn-primary !px-6 !py-2 !text-sm"
            disabled={!canAdvance}
            onClick={() => setStep((prev) => (prev + 1) as Step)}
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary !px-8 !py-2 !text-sm"
            disabled={submitting}
            onClick={() => void handleSubmit()}
          >
            {submitting ? 'Submitting…' : 'Submit Application'}
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-36 shrink-0 text-xs text-lotus-muted/60">{label}</span>
      <span className={`text-sm ${highlight ? 'font-bold text-lotus-cream' : 'text-lotus-muted'}`}>{value}</span>
    </div>
  );
}
