'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TokenResult {
  badgeUrl: string;
  embedHtml: string;
}

export default function BadgeGeneratorPage() {
  const [host, setHost] = useState('https://buddhi-align.foreverlotus.com');
  const [site, setSite] = useState('buddhi-align.forever.com');
  const [tier, setTier] = useState('platinum');
  const [embedSize, setEmbedSize] = useState('140');
  const [days, setDays] = useState('30');
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TokenResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    const encodedSite = encodeURIComponent(site.trim());
    const url = `${host.trim()}/api/awaricon/embed-token?tier=${tier}&site=${encodedSite}&days=${days}`;

    const headers: Record<string, string> = { Accept: 'application/json' };
    if (adminKey.trim()) {
      headers['x-awaricon-admin-key'] = adminKey.trim();
    }

    try {
      const res = await fetch(url, { headers });
      const text = await res.text();

      if (!res.ok) {
        setError(`Error ${res.status}: ${text.slice(0, 400)}`);
        return;
      }

      const json = JSON.parse(text);
      const badgeUrl = `${host.trim()}/api/awaricon/badge?tier=${tier}&site=${encodeURIComponent(json.site)}&exp=${json.exp}&sig=${json.sig}`;
        const safeSize = Number(embedSize);
        const embedHtml = `<a href="${host.trim()}/awaricon/legal" target="_blank" rel="noopener noreferrer" aria-label="Awaricon ${tier.charAt(0).toUpperCase() + tier.slice(1)} compliance badge">
      <img src="${badgeUrl}" alt="Awaricon ${tier.charAt(0).toUpperCase() + tier.slice(1)} compliance badge" width="${safeSize}" height="${safeSize}" loading="lazy" />
</a>`;

      setResult({ badgeUrl, embedHtml });
    } catch (err: unknown) {
      setError(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.embedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section className="bg-lotus-bg px-5 pb-24 pt-32 sm:px-8" aria-labelledby="badge-gen-heading">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow mb-3">Awaricon Tools</p>
        <h1
          id="badge-gen-heading"
          className="font-serif text-lotus-cream"
          style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900 }}
        >
          Badge Embed Generator
        </h1>
        <p className="mt-4 text-lotus-muted leading-relaxed">
          Enter your site details to mint a signed Awaricon badge URL and get the ready-to-paste embed HTML.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {/* Host */}
          <div>
            <label htmlFor="bg-host" className="block text-xs font-semibold uppercase tracking-widest text-lotus-gold/80 mb-1.5">
              Awaricon Host
            </label>
            <input
              id="bg-host"
              type="url"
              required
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-lotus-cream placeholder-lotus-muted/50 focus:outline-none focus:ring-2 focus:ring-lotus-gold/40"
              placeholder="https://your-awaricon-host.com"
            />
          </div>

          {/* Site */}
          <div>
            <label htmlFor="bg-site" className="block text-xs font-semibold uppercase tracking-widest text-lotus-gold/80 mb-1.5">
              Your Site Domain
            </label>
            <input
              id="bg-site"
              type="text"
              required
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-lotus-cream placeholder-lotus-muted/50 focus:outline-none focus:ring-2 focus:ring-lotus-gold/40"
              placeholder="your-site.com"
            />
          </div>

          {/* Tier + Size + Days row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="bg-tier" className="block text-xs font-semibold uppercase tracking-widest text-lotus-gold/80 mb-1.5">
                Tier
              </label>
              <select
                id="bg-tier"
                title="Certification tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0d0e1b] px-4 py-2.5 text-lotus-cream focus:outline-none focus:ring-2 focus:ring-lotus-gold/40"
              >
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
            </div>
            <div className="w-36">
              <label htmlFor="bg-size" className="block text-xs font-semibold uppercase tracking-widest text-lotus-gold/80 mb-1.5">
                Badge Size
              </label>
              <select
                id="bg-size"
                title="Embed badge size"
                value={embedSize}
                onChange={(e) => setEmbedSize(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0d0e1b] px-4 py-2.5 text-lotus-cream focus:outline-none focus:ring-2 focus:ring-lotus-gold/40"
              >
                <option value="96">96 px</option>
                <option value="120">120 px</option>
                <option value="140">140 px</option>
                <option value="180">180 px</option>
              </select>
            </div>
            <div className="w-32">
              <label htmlFor="bg-days" className="block text-xs font-semibold uppercase tracking-widest text-lotus-gold/80 mb-1.5">
                Valid Days
              </label>
              <input
                id="bg-days"
                type="number"
                min={1}
                max={365}
                required
                placeholder="30"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-lotus-cream focus:outline-none focus:ring-2 focus:ring-lotus-gold/40"
              />
            </div>
          </div>

          {/* Admin Key */}
          <div>
            <label htmlFor="bg-adminkey" className="block text-xs font-semibold uppercase tracking-widest text-lotus-gold/80 mb-1.5">
              Admin Key{' '}
              <span className="font-normal normal-case tracking-normal text-lotus-muted/60">(optional — only if required by the host)</span>
            </label>
            <input
              id="bg-adminkey"
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              autoComplete="off"
              title="Awaricon admin key"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-lotus-cream placeholder-lotus-muted/50 focus:outline-none focus:ring-2 focus:ring-lotus-gold/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-lotus-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#06070f] transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Minting…' : 'Generate Embed'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 whitespace-pre-wrap break-all">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-10 space-y-6">
            {/* Badge preview */}
            <div className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-white/5 py-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.badgeUrl} alt="Awaricon badge preview" width={Number(embedSize)} height={Number(embedSize)} />
              <p className="text-xs text-lotus-muted">Live badge preview</p>
            </div>

            {/* Embed HTML */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-lotus-gold/80">
                  Ready-to-paste Embed HTML
                </p>
                <button
                  onClick={handleCopy}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-lotus-cream transition hover:bg-white/10"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg border border-white/10 bg-[#0d0e1b] p-4 text-xs text-lotus-cream whitespace-pre-wrap break-all leading-relaxed">
                {result.embedHtml}
              </pre>
            </div>

            {/* Raw URL */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-lotus-gold/80 mb-2">
                Raw Badge URL
              </p>
              <p className="rounded-lg border border-white/10 bg-[#0d0e1b] p-4 text-xs text-lotus-muted break-all">
                {result.badgeUrl}
              </p>
            </div>
          </div>
        )}

        <div className="mt-16 flex flex-wrap gap-4 text-sm">
          <Link href="/awaricon" className="text-lotus-gold hover:underline">← Awaricon Overview</Link>
          <Link href="/awaricon/compliance" className="text-lotus-muted hover:text-lotus-cream">Compliance Guide</Link>
        </div>
      </div>
    </section>
  );
}
