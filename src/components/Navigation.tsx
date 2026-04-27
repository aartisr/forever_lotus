'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import LotusIcon from './LotusIcon';
import LogoMeaningPopover from './LogoMeaningPopover';
import AwariconMark, { type AwariconMarkVariant } from './AwariconMark';
import { selectableLocales, withLocale } from '@/i18n/core';
import { getChromeMessages } from '@/i18n/chromeMessages';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import { getJourneyLinks, getNavigationGroups } from '@/components/chrome/siteChromeModel';

// Chevron SVG inline for tree-shaking friendliness
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Accent line used inside dropdown panels
function DropdownAccentLine() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-lotus-gold/25 to-transparent mb-1.5" />;
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [awariconVariant, setAwariconVariant] = useState<AwariconMarkVariant>('crystal');
  const langRef = useRef<HTMLDivElement>(null);
  const locale = useResolvedLocale();
  const pathname = usePathname();
  const currentSearch = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => undefined;

      const handler = () => onStoreChange();
      window.addEventListener('popstate', handler);
      window.addEventListener('pageshow', handler);
      window.addEventListener('forever-lotus:locale-url-change', handler);

      return () => {
        window.removeEventListener('popstate', handler);
        window.removeEventListener('pageshow', handler);
        window.removeEventListener('forever-lotus:locale-url-change', handler);
      };
    },
    () => (typeof window === 'undefined' ? '' : window.location.search || ''),
    () => '',
  );
  const messages = getChromeMessages(locale);
  const menuGroups = getNavigationGroups(messages);
  const journeyLinks = getJourneyLinks(messages);
  const currentPathWithSearch = `${pathname || '/'}${currentSearch}`;
  const isActivePath = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);
  const localeFlagMap: Record<string, string> = {
    en: '🇺🇸',
    es: '🇪🇸',
    pt: '🇵🇹',
    ta: '🇮🇳',
    kn: '🇮🇳',
  };

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // Keep Awaricon icon variant synced with user selection from Awaricon Icon Studio.
  useEffect(() => {
    const key = 'awaricon-icon-variant';

    const read = () => {
      if (typeof window === 'undefined') return;
      const value = window.localStorage.getItem(key);
      if (value === 'crystal' || value === 'luxury' || value === 'heraldic') {
        setAwariconVariant(value);
      }
    };

    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === 'crystal' || detail === 'luxury' || detail === 'heraldic') {
        setAwariconVariant(detail);
      }
    };

    read();
    window.addEventListener('storage', read);
    window.addEventListener('awaricon-icon-variant-change', onCustom as EventListener);

    return () => {
      window.removeEventListener('storage', read);
      window.removeEventListener('awaricon-icon-variant-change', onCustom as EventListener);
    };
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  // Close everything on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLangOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-lotus-bg/90 backdrop-blur-lg border-b border-white/[0.06] shadow-[0_1px_32px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link
          href={withLocale('/', locale)}
          className="flex items-center gap-3 group shrink-0"
          aria-label={messages.nav.homeAria}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-lotus-gold/30 bg-[rgba(255,214,107,0.08)] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <LotusIcon size={34} variant="nav" />
          </span>
          <span className="font-serif text-[1.08rem] font-bold tracking-[0.02em] text-lotus-cream">
            {messages.nav.brand}
          </span>
        </Link>
        <div className="hidden 2xl:block">
          <LogoMeaningPopover locale={locale} align="left" />
        </div>

        {/* ── Desktop nav ── */}
        <div className="hidden xl:flex items-center gap-0.5 ml-auto">
          <div className="relative group/start">
            <Link
              href={withLocale('/manifesto', locale)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[0.825rem] font-semibold transition-all duration-200 select-none ${
                journeyLinks.some((item) => isActivePath(item.href))
                  ? 'text-lotus-gold bg-lotus-gold-dim'
                  : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.06]'
              }`}
              aria-haspopup="true"
              data-track="nav_start_here"
            >
              {messages.nav.startHere}
              <ChevronDown className="w-[9px] h-[9px] opacity-50 transition-transform duration-300 group-hover/start:rotate-180" />
            </Link>

            <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none translate-y-2 transition-all duration-[220ms] delay-100 ease-out group-hover/start:opacity-100 group-hover/start:pointer-events-auto group-hover/start:translate-y-0">
              <div className="w-[min(640px,calc(100vw-2rem))] rounded-2xl border border-white/[0.08] bg-[rgba(10,11,20,0.97)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.65),_0_0_0_1px_rgba(255,255,255,0.04)] p-3">
                <DropdownAccentLine />
                <div className="mb-3 px-1">
                  <p className="eyebrow mb-1">{messages.nav.startHere}</p>
                  <p className="max-w-md text-xs leading-relaxed text-lotus-muted-2">
                    {messages.nav.startHereDescription}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {journeyLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={withLocale(item.href, locale)}
                      className={`group/item rounded-xl border px-3 py-3 transition-all duration-150 ${
                        isActivePath(item.href)
                          ? 'border-lotus-gold/35 bg-lotus-gold-dim text-lotus-cream'
                          : 'border-white/[0.06] bg-white/[0.025] text-lotus-muted hover:border-lotus-gold/25 hover:bg-white/[0.06] hover:text-lotus-cream'
                      }`}
                      data-track={`nav_start_${item.href.replace('/', '') || 'home'}`}
                    >
                      <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-lotus-gold/25 bg-lotus-gold/10 font-mono text-[0.65rem] text-lotus-gold">
                        {item.icon}
                      </span>
                      <span className="block text-[0.64rem] uppercase tracking-[0.14em] text-lotus-muted-2">
                        {item.kicker}
                      </span>
                      <span className="mt-1 block text-[0.84rem] font-semibold leading-tight text-lotus-cream">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[0.7rem] leading-snug text-lotus-muted-2">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {menuGroups.map((group) => {
            const isActive = group.items.some((item) => isActivePath(item.href));
            return (
              <div key={group.key} className="relative group/nav">
                {/* Trigger link */}
                <Link
                  href={withLocale(group.href, locale)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[0.825rem] font-medium transition-all duration-200 select-none ${
                    isActive
                      ? 'text-lotus-gold bg-lotus-gold-dim'
                      : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.06]'
                  }`}
                  aria-haspopup="true"
                  data-track={`nav_group_${group.key}`}
                >
                  {group.label}
                  <ChevronDown className="w-[9px] h-[9px] opacity-50 transition-transform duration-300 group-hover/nav:rotate-180" />
                </Link>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lotus-gold opacity-70" />
                )}

                {/* Dropdown panel – slide & fade on group hover */}
                <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none translate-y-2 transition-all duration-[220ms] delay-100 ease-out group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto group-hover/nav:translate-y-0">
                  <div className="min-w-[240px] rounded-2xl border border-white/[0.08] bg-[rgba(10,11,20,0.97)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.65),_0_0_0_1px_rgba(255,255,255,0.04)] p-2">
                    <DropdownAccentLine />
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={withLocale(item.href, locale)}
                        className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 group/item ${
                          isActivePath(item.href)
                            ? 'bg-lotus-gold-dim text-lotus-cream'
                            : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                        }`}
                      >
                        {/* Icon bubble */}
                        <span className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 text-[0.9rem] transition-colors duration-150 ${
                          isActivePath(item.href)
                            ? 'bg-lotus-gold/15'
                            : 'bg-white/[0.05] group-hover/item:bg-white/[0.08]'
                        }`}>
                          {item.icon}
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <div className={`text-[0.825rem] font-semibold leading-tight ${isActivePath(item.href) ? 'text-lotus-gold' : ''}`}>
                            {item.label}
                          </div>
                          <div className="text-[0.7rem] text-lotus-muted-2 mt-0.5 leading-snug">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Featured destination */}
          <Link
            href={withLocale('/awaricon', locale)}
            className={`ml-2 awaricon-nav-link group/aw relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.78rem] font-semibold tracking-[0.06em] uppercase transition-all duration-300 ${
              pathname === '/awaricon'
                ? 'text-[#fff3d2] ring-1 ring-[#ffd369]/45 bg-[linear-gradient(120deg,rgba(255,214,107,0.24),rgba(232,135,166,0.18),rgba(184,216,255,0.2))]'
                : 'text-[#ffe9b3] bg-[linear-gradient(120deg,rgba(255,214,107,0.16),rgba(232,135,166,0.1),rgba(184,216,255,0.1))] hover:text-[#fff4d9] hover:shadow-[0_0_0_1px_rgba(255,214,107,0.35),0_12px_36px_rgba(255,214,107,0.16)]'
            }`}
            aria-label={messages.nav.links.awaricon}
            data-track="nav_awaricon_spotlight"
          >
            <span className="absolute inset-[1px] rounded-full bg-[linear-gradient(110deg,rgba(255,255,255,0.08),transparent_40%,rgba(255,255,255,0.12)_62%,transparent_78%)] awaricon-nav-sheen" aria-hidden="true" />
            <AwariconMark size={20} variant={awariconVariant} className="relative z-[1] awaricon-nav-icon" />
            <span className="relative z-[1]">{messages.nav.links.awaricon}</span>
          </Link>

          {/* ── CTA ── */}
          <Link
            href={withLocale('/manifesto', locale)}
            className="ml-3 btn-primary text-[0.8rem] !py-[0.45rem] !px-5"
            data-track="nav_manifesto_cta"
          >
            {messages.nav.cta}
          </Link>

          {/* ── Language dropdown ── */}
          <div ref={langRef} className="relative ml-2">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-[0.45rem] rounded-full border text-[0.75rem] font-medium transition-all duration-200 ${
                langOpen
                  ? 'border-lotus-gold/40 text-lotus-cream bg-lotus-gold-dim'
                  : 'border-white/[0.10] text-lotus-muted hover:text-lotus-cream hover:border-lotus-gold/30 hover:bg-white/[0.05]'
              }`}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={messages.nav.languageLabel}
            >
              <span aria-hidden="true" className="text-[0.85rem]">🌐</span>
              <span className="uppercase tracking-widest">{locale}</span>
              <ChevronDown className={`w-[9px] h-[9px] opacity-50 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language panel */}
            <div
              className={`absolute right-0 top-full mt-2 min-w-[175px] rounded-2xl border border-white/[0.08] bg-[rgba(10,11,20,0.97)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.65),_0_0_0_1px_rgba(255,255,255,0.04)] p-2 transition-all duration-[220ms] ease-out origin-top-right ${
                langOpen
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto animate-nav-in'
                  : 'opacity-0 scale-[0.96] -translate-y-1 pointer-events-none'
              }`}
              role="listbox"
              aria-label={messages.nav.languageLabel}
            >
              <DropdownAccentLine />
              {selectableLocales.map((lang) => {
                const isSelected = locale === lang;
                return (
                  <Link
                    key={lang}
                    href={withLocale(currentPathWithSearch, lang)}
                    onClick={() => {
                      setLangOpen(false);
                    }}
                    role="option"
                    aria-selected={isSelected}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.825rem] transition-all duration-150 ${
                      isSelected
                        ? 'text-lotus-gold bg-lotus-gold-dim font-medium'
                        : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-base">{localeFlagMap[lang] ?? '🌐'}</span>
                    <span className="flex-1">{messages.nav.languages[lang]}</span>
                    {isSelected && <CheckIcon className="w-3.5 h-3.5 text-lotus-gold shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="xl:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-center rounded-xl hover:bg-white/[0.06] transition-colors shrink-0"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? messages.nav.closeMenu : messages.nav.openMenu}
          aria-expanded={menuOpen}
        >
          <span className={`block h-[1.5px] w-5 bg-lotus-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block h-[1.5px] w-5 bg-lotus-cream transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block h-[1.5px] w-5 bg-lotus-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </nav>

      {/* ── Mobile menu drawer ── */}
      <div
        className={`xl:hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          menuOpen ? 'max-h-[90vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
        } bg-[rgba(7,8,15,0.98)] backdrop-blur-xl border-b border-white/[0.06]`}
      >
        <div className="px-4 pb-6 pt-3 flex flex-col gap-2">
          <div className="rounded-2xl border border-lotus-gold/15 bg-[linear-gradient(135deg,rgba(255,214,107,0.1),rgba(184,216,255,0.055))] p-3">
            <div className="mb-3">
              <p className="eyebrow mb-1">{messages.nav.startHere}</p>
              <p className="text-xs leading-relaxed text-lotus-muted-2">{messages.nav.startHereDescription}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {journeyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={withLocale(item.href, locale)}
                  className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-all duration-150 ${
                    isActivePath(item.href)
                      ? 'border-lotus-gold/35 bg-lotus-gold-dim text-lotus-cream'
                      : 'border-white/[0.07] bg-black/10 text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                  }`}
                  data-track={`mobile_nav_start_${item.href.replace('/', '') || 'home'}`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lotus-gold/25 bg-lotus-gold/10 font-mono text-[0.64rem] text-lotus-gold">
                    {item.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.62rem] uppercase tracking-[0.13em] text-lotus-muted-2">
                      {item.kicker}
                    </span>
                    <span className="mt-0.5 block text-[0.84rem] font-semibold leading-tight">
                      {item.label}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {menuGroups.map((group) => (
            <div key={group.key} className="rounded-2xl border border-white/[0.07] overflow-hidden">
              {/* Group header */}
              <p className="px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.16em] text-lotus-muted-2 bg-white/[0.02] border-b border-white/[0.05]">
                {group.label}
              </p>
              {/* Group items */}
              <div className="p-1.5 flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocale(item.href, locale)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.85rem] font-medium transition-all duration-150 ${
                      isActivePath(item.href)
                        ? 'text-lotus-gold bg-lotus-gold-dim'
                        : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-[0.85rem] shrink-0 ${
                      isActivePath(item.href) ? 'bg-lotus-gold/15' : 'bg-white/[0.05]'
                    }`}>
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <div>{item.label}</div>
                      <div className="text-[0.7rem] text-lotus-muted-2 font-normal mt-0.5">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href={withLocale('/awaricon', locale)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[0.85rem] font-semibold tracking-[0.06em] uppercase transition-all duration-200 border ${
              pathname === '/awaricon'
                ? 'text-[#fff3d2] border-[#ffd369]/40 bg-[linear-gradient(120deg,rgba(255,214,107,0.23),rgba(232,135,166,0.16),rgba(184,216,255,0.17))]'
                : 'text-[#ffe2a0] border-white/[0.12] bg-[linear-gradient(120deg,rgba(255,214,107,0.12),rgba(232,135,166,0.09),rgba(184,216,255,0.08))]'
            }`}
            data-track="mobile_nav_awaricon_spotlight"
          >
            <AwariconMark size={20} variant={awariconVariant} />
            <div>
              <div>{messages.nav.links.awaricon}</div>
              <div className="text-[0.7rem] text-lotus-muted-2 font-normal mt-0.5">{messages.nav.descriptions.awaricon}</div>
            </div>
          </Link>

          {/* CTA */}
          <Link href={withLocale('/manifesto', locale)} className="mt-1 btn-primary justify-center text-sm">
            {messages.nav.cta}
          </Link>

          {/* Mobile language selector */}
          <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.05]">
              <span aria-hidden="true" className="text-base">🌐</span>
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-lotus-muted-2">
                {messages.nav.languageLabel}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-1.5 min-[420px]:grid-cols-3 sm:grid-cols-5">
              {selectableLocales.map((lang) => {
                const isSelected = locale === lang;
                return (
                  <Link
                    key={lang}
                    href={withLocale(currentPathWithSearch, lang)}
                    onClick={() => setMenuOpen(false)}
                    className={`min-w-0 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[0.825rem] transition-all duration-150 ${
                      isSelected
                        ? 'bg-lotus-gold-dim text-lotus-gold font-medium'
                        : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-sm">{localeFlagMap[lang] ?? '🌐'}</span>
                    <span className="min-w-0 truncate">{messages.nav.languages[lang]}</span>
                    {isSelected && <CheckIcon className="w-3 h-3 text-lotus-gold shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
