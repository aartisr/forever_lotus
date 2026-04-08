'use client';

import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useResolvedLocale } from '@/hooks/useResolvedLocale';
import { type Locale } from '@/i18n/core';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (options: Record<string, unknown>, elementId: string) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
    __googleTranslateInitialized?: boolean;
    __googleTranslateAppliedLocale?: string;
    __googleTranslateScriptStatus?: 'idle' | 'loading' | 'ready' | 'failed';
  }
}

const RETRY_DELAY_MS = 140;
const MAX_APPLY_ATTEMPTS = 30;

function supportsDomainCookies(hostname: string): boolean {
  if (!hostname) return false;
  if (hostname === 'localhost') return false;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) return false;
  return hostname.includes('.');
}

function setGoogleTranslateCookie(targetLocale: Locale) {
  const value = `/en/${targetLocale}`;
  document.cookie = `googtrans=${value};path=/`;

  const hostname = window.location.hostname;
  if (supportsDomainCookies(hostname)) {
    document.cookie = `googtrans=${value};path=/;domain=${hostname}`;
    const rootDomain = `.${hostname.split('.').slice(-2).join('.')}`;
    document.cookie = `googtrans=${value};path=/;domain=${rootDomain}`;
  }
}

function clearGoogleTranslateCookie() {
  const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
  const hostname = window.location.hostname;

  document.cookie = `googtrans=;expires=${expires};path=/`;

  if (supportsDomainCookies(hostname)) {
    document.cookie = `googtrans=;expires=${expires};path=/;domain=${hostname}`;
    const rootDomain = `.${hostname.split('.').slice(-2).join('.')}`;
    document.cookie = `googtrans=;expires=${expires};path=/;domain=${rootDomain}`;
  }
}

function removeTranslateArtifacts() {
  document.body.classList.remove('translated-ltr', 'translated-rtl');
  document.body.style.removeProperty('top');
  document.documentElement.style.removeProperty('top');
}

function applyGoogleTranslateTarget(targetLocale: Locale): boolean {
  const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (!combo) return false;
  if (combo.value === targetLocale) return true;

  combo.value = targetLocale;
  combo.dispatchEvent(new Event('change'));
  return true;
}

function ensureTranslateElement() {
  if (!window.google?.translate?.TranslateElement) {
    return false;
  }

  if (window.__googleTranslateInitialized) {
    return true;
  }

  new window.google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      autoDisplay: false,
      includedLanguages: 'en,es,pt,ta,kn',
      layout: 0,
    },
    'google_translate_element',
  );

  window.__googleTranslateInitialized = true;
  return true;
}

function loadGoogleTranslateScript(onReady: () => void) {
  if (window.google?.translate?.TranslateElement) {
    window.__googleTranslateScriptStatus = 'ready';
    onReady();
    return;
  }

  if (window.__googleTranslateScriptStatus === 'loading') {
    return;
  }

  const existingScript = document.getElementById('google-translate-script') as HTMLScriptElement | null;
  if (existingScript) {
    window.__googleTranslateScriptStatus = 'loading';
    return;
  }

  window.__googleTranslateScriptStatus = 'loading';
  window.googleTranslateElementInit = () => {
    window.__googleTranslateScriptStatus = 'ready';
    onReady();
  };

  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    window.__googleTranslateScriptStatus = 'failed';
  };
  document.body.appendChild(script);
}

export default function GlobalLanguageBridge() {
  const locale = useResolvedLocale();
  const lastLocaleRef = useRef<string | null>(null);
  const retryTimerRef = useRef<number | null>(null);
  const [showFallbackNotice, setShowFallbackNotice] = useState(false);

  useEffect(() => {
    if (retryTimerRef.current) {
      window.clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    if (lastLocaleRef.current === locale) {
      return;
    }
    lastLocaleRef.current = locale;

    if (locale === 'en') {
      clearGoogleTranslateCookie();
      setGoogleTranslateCookie('en');
      applyGoogleTranslateTarget('en');
      removeTranslateArtifacts();
      window.__googleTranslateAppliedLocale = 'en';
      setShowFallbackNotice(false);
      return;
    }

    if (window.__googleTranslateAppliedLocale === locale) {
      return;
    }

    setGoogleTranslateCookie(locale);

    let attempt = 0;

    const applyWithRetry = () => {
      if (locale !== lastLocaleRef.current) {
        return;
      }

      const initialized = ensureTranslateElement();
      if (!initialized) {
        return;
      }

      const applied = applyGoogleTranslateTarget(locale);
      if (applied) {
        window.__googleTranslateAppliedLocale = locale;
        setShowFallbackNotice(false);
        return;
      }

      attempt += 1;
      if (attempt >= MAX_APPLY_ATTEMPTS) {
        setShowFallbackNotice(true);
        return;
      }

      retryTimerRef.current = window.setTimeout(applyWithRetry, RETRY_DELAY_MS);
    };

    if (window.__googleTranslateScriptStatus === 'failed') {
      setShowFallbackNotice(true);
      return;
    }

    loadGoogleTranslateScript(applyWithRetry);
    applyWithRetry();

    return () => {
      if (retryTimerRef.current) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  }, [locale]);

  return (
    <>
      <div id="google_translate_element" className="sr-only" aria-hidden="true" />
      {showFallbackNotice ? (
        <div className="fixed bottom-4 left-1/2 z-[90] w-[min(92vw,560px)] -translate-x-1/2 rounded-xl border border-amber-300/35 bg-[#120f08]/95 px-4 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[#f7d79a]">
              Automatic translation is temporarily unavailable. Showing original content for reliability.
            </p>
            <button
              type="button"
              onClick={() => setShowFallbackNotice(false)}
              className="shrink-0 rounded-md border border-amber-300/30 px-2 py-1 text-xs font-semibold text-[#f7d79a] hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
