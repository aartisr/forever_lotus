'use client';

import { useSyncExternalStore } from 'react';
import { defaultLocale, resolveLocale } from '@/i18n/core';

const LOCALE_URL_CHANGE_EVENT = 'forever-lotus:locale-url-change';
let localeUrlChangeNotificationPending = false;

declare global {
  interface History {
    __foreverLotusLocalePatched?: boolean;
  }
}

function notifyLocaleUrlChange() {
  if (typeof window === 'undefined') return;
  if (localeUrlChangeNotificationPending) return;

  localeUrlChangeNotificationPending = true;
  window.setTimeout(() => {
    localeUrlChangeNotificationPending = false;
    window.dispatchEvent(new Event(LOCALE_URL_CHANGE_EVENT));
  }, 0);
}

function ensureHistoryPatched() {
  if (typeof window === 'undefined') return;
  if (window.history.__foreverLotusLocalePatched) return;

  const wrap = (method: 'pushState' | 'replaceState') => {
    const original = window.history[method];
    window.history[method] = function patchedHistory(...args: Parameters<History[typeof method]>) {
      const result = original.apply(this, args);
      notifyLocaleUrlChange();
      return result;
    };
  };

  wrap('pushState');
  wrap('replaceState');
  window.history.__foreverLotusLocalePatched = true;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  ensureHistoryPatched();

  const handler = () => onStoreChange();
  window.addEventListener('popstate', handler);
  window.addEventListener('pageshow', handler);
  window.addEventListener(LOCALE_URL_CHANGE_EVENT, handler);

  return () => {
    window.removeEventListener('popstate', handler);
    window.removeEventListener('pageshow', handler);
    window.removeEventListener(LOCALE_URL_CHANGE_EVENT, handler);
  };
}

function getLocaleFromUrl() {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }
  const params = new URLSearchParams(window.location.search);
  return resolveLocale(params.get('lang') ?? undefined);
}

export function useResolvedLocale() {
  return useSyncExternalStore(subscribe, getLocaleFromUrl, () => defaultLocale);
}
