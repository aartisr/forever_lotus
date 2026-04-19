'use client';

import React, { useMemo, useState } from 'react';

type ShareActionsProps = {
  title: string;
  url: string;
  description?: string;
};

function buildShareLinks(title: string, url: string, description?: string) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedSummary = encodeURIComponent(description ? `${description}\n\n${url}` : url);

  return {
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedSummary}`,
  };
}

export default function ShareActions({ title, url, description }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [nativeShared, setNativeShared] = useState(false);
  const links = useMemo(() => buildShareLinks(title, url, description), [description, title, url]);
  const supportsNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function handleNativeShare() {
    if (!supportsNativeShare) {
      return;
    }

    try {
      await navigator.share({
        title,
        text: description,
        url,
      });
      setNativeShared(true);
      window.setTimeout(() => setNativeShared(false), 1800);
    } catch {
      setNativeShared(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[rgba(26,22,18,0.14)] bg-white/80 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#8c7a53] mb-1">Share this insight</p>
          <p className="text-sm text-[#5a544c]">Help this page travel across search, socials, and AI answers.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {supportsNativeShare ? (
            <button
              type="button"
              onClick={handleNativeShare}
              className="rounded-full border border-[rgba(26,22,18,0.12)] px-4 py-2 text-sm font-medium text-[#1a1612] hover:border-[#c9a84c]/40 hover:text-[#8c6b28] transition-colors"
              data-track="insight_share_native"
            >
              {nativeShared ? 'Shared' : 'Share'}
            </button>
          ) : null}
          <a
            href={links.x}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[rgba(26,22,18,0.12)] px-4 py-2 text-sm font-medium text-[#1a1612] hover:border-[#c9a84c]/40 hover:text-[#8c6b28] transition-colors"
            data-track="insight_share_x"
          >
            Post on X
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[rgba(26,22,18,0.12)] px-4 py-2 text-sm font-medium text-[#1a1612] hover:border-[#c9a84c]/40 hover:text-[#8c6b28] transition-colors"
            data-track="insight_share_linkedin"
          >
            Share on LinkedIn
          </a>
          <a
            href={links.email}
            className="rounded-full border border-[rgba(26,22,18,0.12)] px-4 py-2 text-sm font-medium text-[#1a1612] hover:border-[#c9a84c]/40 hover:text-[#8c6b28] transition-colors"
            data-track="insight_share_email"
          >
            Email
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-[rgba(26,22,18,0.12)] px-4 py-2 text-sm font-medium text-[#1a1612] hover:border-[#c9a84c]/40 hover:text-[#8c6b28] transition-colors"
            data-track="insight_share_copy"
          >
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  );
}
