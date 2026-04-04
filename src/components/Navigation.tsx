'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LotusIcon from './LotusIcon';
import { getMessages, resolveLocale, supportedLocales, withLocale } from '@/i18n';

type NavChild = {
  href: string;
  label: string;
  icon: string;
  description: string;
};

type NavGroup = {
  key: string;
  label: string;
  items: NavChild[];
};

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
  const [locale, setLocale] = useState(resolveLocale(undefined));
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const messages = getMessages(locale);

  const isEs = locale === 'es';

  const menuGroups: NavGroup[] = [
    {
      key: 'framework',
      label: isEs ? 'Marco' : 'Framework',
      items: [
        {
          href: '/manifesto',
          label: messages.nav.links.manifesto,
          icon: '📜',
          description: isEs ? 'El documento fundacional' : 'The foundational document',
        },
        {
          href: '/philosophy',
          label: messages.nav.links.philosophy,
          icon: '🪷',
          description: isEs ? 'Principios y seis pilares' : 'Principles & six pillars',
        },
        {
          href: '/about',
          label: messages.nav.links.about,
          icon: '✦',
          description: isEs ? 'Origen y proposito' : 'Origin & purpose',
        },
      ],
    },
    {
      key: 'knowledge',
      label: isEs ? 'Conocimiento' : 'Knowledge',
      items: [
        {
          href: '/research',
          label: messages.nav.links.research,
          icon: '🔬',
          description: isEs ? 'Fuentes orientales y modernas' : 'Eastern & modern sources',
        },
        {
          href: '/insights',
          label: isEs ? 'Ideas' : 'Insights',
          icon: '💡',
          description: isEs ? 'Articulos y reflexiones' : 'Articles & reflections',
        },
      ],
    },
    {
      key: 'growth',
      label: isEs ? 'Crecimiento' : 'Growth',
      items: [
        {
          href: '/growth',
          label: isEs ? 'Panel de crecimiento' : 'Growth Dashboard',
          icon: '📈',
          description: isEs ? 'Metricas e impacto' : 'Metrics & impact',
        },
      ],
    },
    {
      key: 'ecosystem',
      label: isEs ? 'Ecosistema' : 'Ecosystem',
      items: [
        {
          href: '/ecosystem',
          label: isEs ? 'Sitios aliados' : 'Aligned Websites',
          icon: '🌐',
          description: isEs ? 'Ecosistema consciente' : 'Conscious ecosystem',
        },
        {
          href: '/evaluate',
          label: isEs ? 'Evaluador de manifiesto' : 'Manifesto Evaluator',
          icon: '⚖️',
          description: isEs ? 'Verificador de alineacion' : 'Alignment checker',
        },
        {
          href: '/onboarding-websites',
          label: isEs ? 'Onboarding de sitios' : 'Onboard Your Website',
          icon: '✚',
          description: isEs ? 'Unirse a la red' : 'Join the network',
        },
      ],
    },
  ];

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Read locale from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLocale(resolveLocale(params.get('lang') ?? undefined));
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

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
          className="flex items-center gap-2.5 group shrink-0"
          aria-label={messages.nav.homeAria}
        >
          <LotusIcon size={30} variant="nav" className="transition-transform duration-700 group-hover:rotate-45" />
          <span className="font-serif text-[1.05rem] font-bold tracking-wide text-lotus-cream">
            {messages.nav.brand}
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-0.5 ml-auto">
          {menuGroups.map((group) => {
            const isActive = group.items.some((item) => pathname === item.href);
            return (
              <div key={group.key} className="relative group/nav">
                {/* Trigger button */}
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[0.825rem] font-medium transition-all duration-200 select-none ${
                    isActive
                      ? 'text-lotus-gold bg-lotus-gold-dim'
                      : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.06]'
                  }`}
                >
                  {group.label}
                  <ChevronDown className="w-[9px] h-[9px] opacity-50 transition-transform duration-300 group-hover/nav:rotate-180" />
                </button>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lotus-gold opacity-70" />
                )}

                {/* Dropdown panel – slide & fade on group hover */}
                <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none translate-y-2 group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto group-hover/nav:translate-y-0 transition-all duration-[220ms] ease-out">
                  <div className="min-w-[240px] rounded-2xl border border-white/[0.08] bg-[rgba(10,11,20,0.97)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.65),_0_0_0_1px_rgba(255,255,255,0.04)] p-2">
                    <DropdownAccentLine />
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={withLocale(item.href, locale)}
                        className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 group/item ${
                          pathname === item.href
                            ? 'bg-lotus-gold-dim text-lotus-cream'
                            : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                        }`}
                      >
                        {/* Icon bubble */}
                        <span className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 text-[0.9rem] transition-colors duration-150 ${
                          pathname === item.href
                            ? 'bg-lotus-gold/15'
                            : 'bg-white/[0.05] group-hover/item:bg-white/[0.08]'
                        }`}>
                          {item.icon}
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <div className={`text-[0.825rem] font-semibold leading-tight ${pathname === item.href ? 'text-lotus-gold' : ''}`}>
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
              {supportedLocales.map((lang) => {
                const isSelected = locale === lang;
                return (
                  <Link
                    key={lang}
                    href={withLocale(pathname || '/', lang)}
                    onClick={() => setLangOpen(false)}
                    role="option"
                    aria-selected={isSelected}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.825rem] transition-all duration-150 ${
                      isSelected
                        ? 'text-lotus-gold bg-lotus-gold-dim font-medium'
                        : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-base">{lang === 'en' ? '🇺🇸' : '🇪🇸'}</span>
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
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-center rounded-xl hover:bg-white/[0.06] transition-colors shrink-0"
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
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          menuOpen ? 'max-h-[52rem] opacity-100' : 'max-h-0 opacity-0'
        } bg-[rgba(7,8,15,0.98)] backdrop-blur-xl border-b border-white/[0.06]`}
      >
        <div className="px-4 pb-6 pt-3 flex flex-col gap-2">
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
                      pathname === item.href
                        ? 'text-lotus-gold bg-lotus-gold-dim'
                        : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-[0.85rem] shrink-0 ${
                      pathname === item.href ? 'bg-lotus-gold/15' : 'bg-white/[0.05]'
                    }`}>
                      {item.icon}
                    </span>
                    <div>
                      <div>{item.label}</div>
                      <div className="text-[0.7rem] text-lotus-muted-2 font-normal mt-0.5">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

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
            <div className="p-1.5 flex gap-1.5">
              {supportedLocales.map((lang) => {
                const isSelected = locale === lang;
                return (
                  <Link
                    key={lang}
                    href={withLocale(pathname || '/', lang)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[0.825rem] transition-all duration-150 ${
                      isSelected
                        ? 'bg-lotus-gold-dim text-lotus-gold font-medium'
                        : 'text-lotus-muted hover:text-lotus-cream hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-sm">{lang === 'en' ? '🇺🇸' : '🇪🇸'}</span>
                    <span>{messages.nav.languages[lang]}</span>
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

