'use client';

import { useState } from 'react';

type CtaKind = 'intro' | 'diligence';
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactCtaButtonsProps {
  className?: string;
  buttonClassName?: string;
  showSecondary?: boolean;
}

export default function ContactCtaButtons({ className, buttonClassName, showSecondary = true }: ContactCtaButtonsProps) {
  const [state, setState] = useState<Record<CtaKind, SubmitState>>({
    intro: 'idle',
    diligence: 'idle',
  });
  const [message, setMessage] = useState('');

  async function submit(kind: CtaKind) {
    if (state[kind] === 'submitting') return;

    setState((prev) => ({ ...prev, [kind]: 'submitting' }));
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind }),
      });

      const payload: { success?: boolean; error?: string } = await response.json();
      if (!response.ok || !payload.success) {
        setState((prev) => ({ ...prev, [kind]: 'error' }));
        setMessage(payload.error ?? 'Could not send your request right now. Please try again.');
        return;
      }

      setState((prev) => ({ ...prev, [kind]: 'success' }));
      setMessage('Received. Our team will reach out with the next steps shortly.');
    } catch {
      setState((prev) => ({ ...prev, [kind]: 'error' }));
      setMessage('Network error. Please retry in a moment.');
    }
  }

  const introSubmitting = state.intro === 'submitting';
  const diligenceSubmitting = state.diligence === 'submitting';

  return (
    <div className={className}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => submit('intro')}
          disabled={introSubmitting}
          className={buttonClassName ?? 'btn-primary text-base'}
          data-track="contact_investor_intro_submit"
        >
          {introSubmitting ? 'Submitting...' : 'Email The Investment Team'}
        </button>

        {showSecondary ? (
          <button
            type="button"
            onClick={() => submit('diligence')}
            disabled={diligenceSubmitting}
            className="btn-ghost text-base disabled:cursor-not-allowed disabled:opacity-60"
            data-track="contact_diligence_submit"
          >
            {diligenceSubmitting ? 'Submitting...' : 'Request Diligence Pack'}
          </button>
        ) : null}
      </div>

      {message ? (
        <p
          className={[
            'mt-3 text-sm',
            state.intro === 'error' || state.diligence === 'error' ? 'text-red-300' : 'text-lotus-muted',
          ].join(' ')}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
