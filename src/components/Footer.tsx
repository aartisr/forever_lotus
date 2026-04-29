'use client';

import React from 'react';
import Link from 'next/link';
import LotusIcon from './LotusIcon';
import LogoMeaningPopover from './LogoMeaningPopover';
import SocialMediaLinks from './SocialMediaLinks';
import { withLocale } from '@/i18n/core';
import { getChromeMessages } from '@/i18n/chromeMessages';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import { getFooterColumns, getFooterProofPoints, getJourneyLinks } from '@/components/chrome/siteChromeModel';
import { githubRepoUrl } from '@/lib/seo';

export default function Footer() {
  const locale = useResolvedLocale();

  const messages = getChromeMessages(locale);
  const journeyLinks = getJourneyLinks(messages);
  const footerColumns = getFooterColumns(messages);
  const footerProofPoints = getFooterProofPoints(messages);
  const utilityLinks = [
    { label: 'RSS', href: '/rss.xml' },
    { label: 'llms.txt', href: '/llms.txt' },
    { label: 'Full AI index', href: '/llms-full.txt' },
    { label: 'Sitemap', href: '/sitemap.xml' },
    { label: 'Citation kit', href: '/backlinks' },
  ];

  return (
    <footer className="relative bg-lotus-bg-2 border-t border-lotus-border-soft overflow-hidden" role="contentinfo">
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lotus-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-14 rounded-[1.5rem] border border-lotus-gold/15 bg-[linear-gradient(135deg,rgba(255,214,107,0.09),rgba(184,216,255,0.045),rgba(232,135,166,0.045))] p-5 sm:p-6 lg:p-7 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] lg:items-center">
            <div>
              <p className="eyebrow mb-3">{messages.footer.nextEyebrow}</p>
              <h2 className="font-serif text-2xl sm:text-3xl leading-tight text-lotus-cream">
                {messages.footer.nextTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-lotus-muted">
                {messages.footer.nextDescription}
              </p>
            </div>
            <nav aria-label="Recommended next steps">
              <ul className="grid gap-2 sm:grid-cols-2">
                {journeyLinks.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={withLocale(item.href, locale)}
                      className="group flex h-full items-start gap-3 rounded-2xl border border-white/[0.07] bg-black/10 px-3.5 py-3 transition-all duration-200 hover:border-lotus-gold/30 hover:bg-white/[0.055]"
                      data-track={`footer_journey_${item.href.replace('/', '') || 'home'}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lotus-gold/25 bg-lotus-gold/10 font-mono text-[0.64rem] text-lotus-gold">
                        {item.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.62rem] uppercase tracking-[0.13em] text-lotus-muted-2">
                          {item.kicker}
                        </span>
                        <span className="mt-0.5 block text-sm font-semibold leading-tight text-lotus-cream group-hover:text-lotus-gold">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs leading-snug text-lotus-muted-2">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.55fr)_minmax(240px,0.6fr)] mb-12">
          <div>
            <Link href={withLocale('/', locale)} className="flex items-center gap-3 mb-4 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-lotus-gold/30 bg-[rgba(255,214,107,0.08)] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <LotusIcon size={34} variant="nav" />
              </span>
              <span className="font-serif text-lg font-bold tracking-[0.02em] text-lotus-cream">{messages.nav.brand}</span>
            </Link>
            <LogoMeaningPopover locale={locale} className="mb-4" align="left" />
            <p className="text-lotus-muted text-sm leading-relaxed">
              {messages.footer.description}
            </p>
            <p className="text-lotus-muted-2 text-xs leading-relaxed mt-3">
              {messages.footer.alignedNote}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-4">{messages.footer.navigate}</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {footerColumns.map((column) => (
                <div key={column.key}>
                  <h3 className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-lotus-cream/80">
                    {column.label}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {column.links.map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={withLocale(href, locale)}
                          className="text-lotus-muted hover:text-lotus-cream text-sm leading-snug transition-colors duration-200"
                          data-track={`footer_${href.replace('/', '') || 'home'}`}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div>
            <p className="eyebrow mb-4">{messages.footer.standard}</p>
            <blockquote className="font-serif text-lotus-cream/70 text-sm leading-relaxed italic border-l-2 border-lotus-gold/40 pl-4">
              &ldquo;{messages.footer.quote}&rdquo;
            </blockquote>
            <SocialMediaLinks className="mt-7" />
          </div>
        </div>

        <div className="mb-10 grid gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div>
            <p className="eyebrow mb-3">{messages.footer.proofLabel}</p>
            <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {footerProofPoints.map((item) => (
                <div key={item.label}>
                  <dt className="font-serif text-xl leading-none text-lotus-gold">{item.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-lotus-muted-2">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <nav aria-label={messages.footer.utilityLabel}>
            <p className="sr-only">{messages.footer.utilityLabel}</p>
            <ul className="flex flex-wrap gap-2 sm:justify-end">
              {utilityLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-lotus-muted transition-colors duration-200 hover:border-lotus-gold/30 hover:text-lotus-cream"
                    data-track={`footer_utility_${item.href.replace(/[^a-z0-9]+/gi, '_')}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-lotus-muted transition-colors duration-200 hover:border-lotus-gold/30 hover:text-lotus-cream"
                  data-track="footer_utility_repository"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="lotus-divider mb-8">
          <LotusIcon size={20} variant="section" />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-lotus-muted-2">
          <p>
            &copy; {new Date().getFullYear()} {messages.footer.rights}
          </p>
          <p className="font-serif italic text-lotus-gold/60 tracking-wide">
            {messages.footer.tagline}
          </p>
          <div className="flex flex-col sm:items-end gap-1">
            <p>
              {messages.footer.authorLabel}{' '}
              <span className="text-lotus-muted">{messages.footer.authorName}</span>
            </p>
            <Link
              href={withLocale('/awaricon/legal', locale)}
              className="text-lotus-muted hover:text-lotus-cream transition-colors duration-200"
              data-track="footer_awaricon_legal"
            >
              {messages.footer.legalPolicyLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
