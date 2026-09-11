'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { awariconTiers, type AwariconTier } from '@/content/awaricon';
import { siteUrl } from '@/lib/seo';

type TierKey = AwariconTier['key'];
interface TierToken {
  tier: TierKey;
  site: string;
  exp: number;
  sig: string;
}

function copyToClipboard(value: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }

  return Promise.reject(new Error('Clipboard API unavailable'));
}

function buildBadgeUrl(origin: string, tier: AwariconTier, token?: TierToken): string {
  if (!token) {
    return `${origin}/api/awaricon/badge?tier=${tier.key}`;
  }

  return `${origin}/api/awaricon/badge?tier=${tier.key}&site=${encodeURIComponent(token.site)}&exp=${token.exp}&sig=${token.sig}`;
}

function buildSingleEmbedSnippet(origin: string, tier: AwariconTier, token?: TierToken): string {
  const badgeUrl = buildBadgeUrl(origin, tier, token);

  return `<a href="${origin}/awaricon/legal" target="_blank" rel="noopener noreferrer" aria-label="${tier.label} compliance badge">
  <img src="${badgeUrl}" alt="${tier.label} compliance badge" width="180" height="180" loading="lazy" />
</a>`;
}

function buildStackEmbedSnippet(origin: string, tiers: ReadonlyArray<AwariconTier>, tokens: Partial<Record<TierKey, TierToken>>): string {
  const badges = tiers
    .map(
      (tier) =>
        `  <a href="${origin}/awaricon/legal" target="_blank" rel="noopener noreferrer" aria-label="${tier.label} compliance badge"><img src="${buildBadgeUrl(origin, tier, tokens[tier.key])}" alt="${tier.label} compliance badge" width="120" height="120" loading="lazy" /></a>`
    )
    .join('\n');

  return `<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
${badges}
</div>`;
}

export default function AwariconEmbedKit() {
  const [origin, setOrigin] = useState(siteUrl);
  const [domain, setDomain] = useState('');
  const [selected, setSelected] = useState<TierKey[]>(['gold']);
  const [copyState, setCopyState] = useState<string>('');
  const [tokens, setTokens] = useState<Partial<Record<TierKey, TierToken>>>({});
  const [tokenState, setTokenState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [tokenMessage, setTokenMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
      setDomain(window.location.hostname);
    }
  }, []);

  useEffect(() => {
    const trimmed = domain.trim();
    if (!trimmed) {
      setTokens({});
      setTokenState('idle');
      setTokenMessage('');
      return;
    }

    let isCancelled = false;

    const loadTokens = async (): Promise<void> => {
      setTokenState('loading');
      setTokenMessage('Requesting signed badge links for this domain...');

      try {
        const entries = await Promise.all(
          awariconTiers.map(async (tier) => {
            const response = await fetch(`/api/awaricon/embed-token?tier=${tier.key}&site=${encodeURIComponent(trimmed)}`);
            if (!response.ok) {
              throw new Error('Signed badges unavailable for this domain.');
            }

            const payload = (await response.json()) as TierToken;
            return [tier.key, payload] as const;
          })
        );

        if (isCancelled) {
          return;
        }

        const nextTokens: Partial<Record<TierKey, TierToken>> = {};
        for (const [key, value] of entries) {
          nextTokens[key] = value;
        }

        setTokens(nextTokens);
        setTokenState('ready');
        setTokenMessage('Signed badge links are active.');
      } catch {
        if (isCancelled) {
          return;
        }

        setTokens({});
        setTokenState('error');
        setTokenMessage('Signed links unavailable. Check approved domains and signing secret.');
      }
    };

    void loadTokens();

    return () => {
      isCancelled = true;
    };
  }, [domain]);

  const selectedTiers = useMemo(() => awariconTiers.filter((tier) => selected.includes(tier.key)), [selected]);

  const stackSnippet = useMemo(() => buildStackEmbedSnippet(origin, selectedTiers, tokens), [origin, selectedTiers, tokens]);

  const toggleTier = (tierKey: TierKey): void => {
    setSelected((prev) => {
      if (prev.includes(tierKey)) {
        return prev.filter((item) => item !== tierKey);
      }

      return [...prev, tierKey];
    });
  };

  const handleCopy = async (value: string, key: string): Promise<void> => {
    try {
      await copyToClipboard(value);
      setCopyState(key);
      window.setTimeout(() => setCopyState(''), 1800);
    } catch {
      setCopyState('');
    }
  };

  return (
    <section className="mx-auto mt-16 max-w-6xl rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8" aria-labelledby="awaricon-embed-heading">
      <div className="mb-6">
        <p className="eyebrow mb-2">Website Embed Kit</p>
        <h3 id="awaricon-embed-heading" className="font-serif text-2xl font-black text-lotus-cream sm:text-3xl">Display The Badges You Are Compliant With</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-lotus-muted">
          Copy the official HTML snippets below and paste them into your website footer, about page, or trust section. Only display tiers your organization is genuinely compliant with.
        </p>
        <div className="mt-4 max-w-2xl rounded-2xl border border-white/10 bg-[#070914] p-4">
          <label className="block text-xs uppercase tracking-[0.16em] text-lotus-gold/70" htmlFor="awaricon-domain-input">Website Domain For Signed Badges</label>
          <input
            id="awaricon-domain-input"
            type="text"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            placeholder="example.com"
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-sm text-lotus-cream outline-none transition focus:border-lotus-gold/60"
          />
          <p className="mt-2 text-xs text-lotus-muted">{tokenMessage || 'Signed links are optional. Unsigned links remain available.'}</p>
          {tokenState === 'error' ? <p className="mt-1 text-xs text-[#ffb5b5]">Using unsigned fallback links.</p> : null}
          <p className="mt-2 text-xs text-lotus-muted-2">
            Maintainer access: <Link href="/awaricon/admin" className="text-lotus-gold/80 hover:text-lotus-gold">Awaricon Admin Console</Link>
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {awariconTiers.map((tier) => {
          const token = tokens[tier.key];
          const snippet = buildSingleEmbedSnippet(origin, tier, token);
          const copied = copyState === `single-${tier.key}`;

          return (
            <article key={tier.key} className="rounded-2xl border border-white/10 bg-[#070914] p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-serif text-lg text-lotus-cream">{tier.label}</h4>
                  <p className="text-xs text-lotus-muted-2">{tier.scoreRange}</p>
                </div>
                <label className="inline-flex items-center gap-2 text-xs text-lotus-muted">
                  <input
                    type="checkbox"
                    checked={selected.includes(tier.key)}
                    onChange={() => toggleTier(tier.key)}
                    className="h-4 w-4 rounded border-white/20 bg-transparent"
                  />
                  Include in stack
                </label>
              </div>

              <div className="mb-3 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <Image src={buildBadgeUrl(origin, tier, token)} alt={`${tier.label} compliance badge`} width={120} height={120} unoptimized />
              </div>

              <textarea
                readOnly
                value={snippet}
                className="h-28 w-full rounded-xl border border-white/10 bg-black/25 p-3 font-mono text-[11px] leading-relaxed text-lotus-muted"
              />

              <button type="button" className="btn-ghost mt-3 !px-4 !py-2 !text-xs" onClick={() => void handleCopy(snippet, `single-${tier.key}`)}>
                {copied ? 'Copied' : 'Copy Single-Badge HTML'}
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-lotus-gold/30 bg-lotus-gold-dim p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-lotus-cream">Combined badge strip snippet</p>
          <button type="button" className="btn-primary !px-4 !py-2 !text-xs" onClick={() => void handleCopy(stackSnippet, 'stack')}>
            {copyState === 'stack' ? 'Copied' : 'Copy Combined HTML'}
          </button>
        </div>

        <textarea
          readOnly
          value={stackSnippet}
          className="h-36 w-full rounded-xl border border-white/15 bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-lotus-cream/90"
        />

        <p className="mt-3 text-xs leading-relaxed text-lotus-muted">
          Official badge image endpoint format: <code>{origin}/api/awaricon/badge?tier=gold</code>
        </p>
      </div>
    </section>
  );
}