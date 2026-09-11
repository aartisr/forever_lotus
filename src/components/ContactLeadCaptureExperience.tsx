'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

type Intent = 'intro' | 'diligence';
type Status = 'idle' | 'submitting' | 'success' | 'error';

type LeadPayload = {
  kind: Intent;
  fullName: string;
  workEmail: string;
  organization?: string;
  stageFocus?: string;
  timeline?: string;
  notes?: string;
  consent: boolean;
  website?: string;
  requestId: string;
};

interface Props {
  investorEmail: string;
}

const stageOptions = ['Pre-seed', 'Seed', 'Series A', 'Series B+', 'Growth Equity', 'Impact / Strategic'] as const;
const timelineOptions = ['Within 2 weeks', 'This month', 'This quarter', 'Exploratory'] as const;

function makeRequestId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

const inputClass =
  'w-full rounded-xl border border-white/15 bg-[#090d1a] px-4 py-3 text-sm text-lotus-cream placeholder:text-lotus-muted/70 outline-none transition-colors focus:border-lotus-gold/70';

export default function ContactLeadCaptureExperience({ investorEmail }: Props) {
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<Intent>('intro');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [stageFocus, setStageFocus] = useState('');
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [requestId, setRequestId] = useState(() => makeRequestId());

  const heading = useMemo(
    () =>
      intent === 'diligence'
        ? 'Request Diligence Pack'
        : 'Talk To The Investment Team',
    [intent],
  );

  const canSubmit = fullName.trim().length > 0 && workEmail.trim().length > 0 && consent;

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const timeout = window.setTimeout(() => firstInputRef.current?.focus(), 0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen]);

  function openModal(nextIntent: Intent) {
    setIntent(nextIntent);
    setStatus('idle');
    setErrorMessage('');
    setSuccessMessage('');
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function submit() {
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');
    setSuccessMessage('');

    const payload: LeadPayload = {
      kind: intent,
      fullName: fullName.trim(),
      workEmail: workEmail.trim(),
      organization: organization.trim() || undefined,
      stageFocus: stageFocus || undefined,
      timeline: timeline || undefined,
      notes: notes.trim() || undefined,
      consent,
      website,
      requestId,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const body: { success?: boolean; error?: string; requestId?: string } = await response.json();
      if (!response.ok || !body.success) {
        setStatus('error');
        setErrorMessage(body.error ?? 'Unable to submit right now. Please try again shortly.');
        return;
      }

      setStatus('success');
      setSuccessMessage(
        'Confirmed. We have received your request and will respond within one business day.',
      );
      setRequestId(makeRequestId());
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please retry in a moment.');
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#05060c] px-5 pb-20 pt-32 sm:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 76% 56% at 50% 0%, rgba(201,168,76,0.2) 0%, transparent 64%), radial-gradient(ellipse 52% 44% at 14% 90%, rgba(14,182,168,0.12) 0%, transparent 70%), radial-gradient(ellipse 46% 42% at 88% 80%, rgba(158,230,255,0.11) 0%, transparent 75%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-lotus-gold/80">
            Capital Invitation
          </p>
          <h1
            className="font-serif font-black text-lotus-cream"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5.1rem)', lineHeight: 1.04 }}
          >
            Invest In The Future Of
            <span className="block text-gold-shimmer">Creation With Responsibility</span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-lotus-muted">
            Forever Lotus is building a trust-first civilization brand and Awaricon is its proof layer: a new
            standard for presence, dignity, and accountable digital participation. We invite investors who care about
            durable value, not extractive velocity.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openModal('intro')}
              className="btn-primary text-base"
              data-track="contact_open_intro_capture"
            >
              Email The Investment Team
            </button>
            <button
              type="button"
              onClick={() => openModal('diligence')}
              className="btn-ghost text-base"
              data-track="contact_open_diligence_capture"
            >
              Request Diligence Pack
            </button>
          </div>
        </div>
      </section>

      <section className="bg-lotus-bg px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Why This Moment',
              text: 'AI abundance has created a trust deficit. The next category winner is the organization that can prove responsibility at scale.',
            },
            {
              title: 'What We Are Building',
              text: 'Awaricon certification, verification interfaces, and governance-grade transparency systems that convert trust into compounding adoption.',
            },
            {
              title: 'Who We Seek',
              text: 'Venture capitalists, impact funds, family offices, and institutions aligned with dignity-first growth and long-horizon ethical returns.',
            },
          ].map((card) => (
            <article key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h2 className="mb-3 font-serif text-2xl text-lotus-cream">{card.title}</h2>
              <p className="leading-relaxed text-lotus-muted">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#070914] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-lotus-gold/30 bg-gradient-to-br from-lotus-gold/10 via-transparent to-lotus-teal/10 p-8 sm:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-lotus-gold/80">Contact</p>
          <h2 className="font-serif text-lotus-cream" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 900 }}>
            Let Us Build Responsible Scale Together
          </h2>
          <p className="mt-5 max-w-3xl text-lotus-muted leading-relaxed">
            Share your thesis, fund mandate, and strategic intent. We will respond with the most relevant next step:
            manifesto alignment conversation, diligence package, or founder strategy session.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openModal('intro')}
              className="inline-flex items-center justify-center rounded-full border border-lotus-gold/40 bg-lotus-gold/20 px-6 py-3 text-sm font-semibold text-lotus-cream transition-colors hover:bg-lotus-gold/30"
              data-track="contact_open_secondary_capture"
            >
              Start Investor Conversation
            </button>
            <Link href="/manifesto" className="text-sm font-semibold text-lotus-gold hover:text-lotus-cream">
              Revisit the Manifesto →
            </Link>
          </div>

          <p className="mt-4 text-xs text-lotus-muted">Primary inbox: {investorEmail}</p>
        </div>
      </section>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="contact-capture-title" aria-describedby="contact-capture-description">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#060913] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lotus-gold/80">Private Intake</p>
                <h3 id="contact-capture-title" className="mt-2 font-serif text-2xl text-lotus-cream">{heading}</h3>
                <p id="contact-capture-description" className="mt-2 text-sm text-lotus-muted">Takes less than 30 seconds. A human response is sent within one business day.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-lotus-muted hover:text-lotus-cream"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-lotus-muted/80">Full Name *</label>
                <input
                  ref={firstInputRef}
                  id="contact-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-lotus-muted/80">Work Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="you@fund.com"
                  className={inputClass}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-org" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-lotus-muted/80">Fund / Organization</label>
                <input
                  id="contact-org"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Optional"
                  className={inputClass}
                  autoComplete="organization"
                />
              </div>
              <div>
                <label htmlFor="contact-stage" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-lotus-muted/80">Stage Focus</label>
                <select id="contact-stage" value={stageFocus} onChange={(e) => setStageFocus(e.target.value)} className={inputClass}>
                  <option value="">Select stage</option>
                  {stageOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-timeline" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-lotus-muted/80">Preferred Timeline</label>
                <select id="contact-timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} className={inputClass}>
                  <option value="">Select timeline</option>
                  {timelineOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-notes" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-lotus-muted/80">Notes</label>
                <input id="contact-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional context" className={inputClass} />
              </div>
            </div>

            <div aria-hidden="true" className="absolute h-0 overflow-hidden opacity-0 pointer-events-none">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" value={website} onChange={(e) => setWebsite(e.target.value)} autoComplete="off" tabIndex={-1} />
            </div>

            <label className="mt-4 flex items-start gap-2 text-xs text-lotus-muted">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
              <span>I agree to be contacted about this request and understand my details are used only for investor communications.</span>
            </label>

            {status === 'error' && errorMessage ? (
              <p className="mt-3 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200" role="alert">{errorMessage}</p>
            ) : null}

            {status === 'success' && successMessage ? (
              <p className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200" role="status">{successMessage}</p>
            ) : null}

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-lotus-muted hover:text-lotus-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={status === 'submitting' || !canSubmit}
                className="rounded-xl border border-lotus-gold/40 bg-lotus-gold/20 px-5 py-2.5 text-sm font-semibold text-lotus-cream transition-colors hover:bg-lotus-gold/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
