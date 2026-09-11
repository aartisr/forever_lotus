import { useState, useEffect, useSyncExternalStore } from 'react';

let currentPath = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
const listeners = new Set<() => void>();

function notify() {
  currentPath = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
  listeners.forEach((l) => l());
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', notify);
  window.addEventListener('next-route-change', notify);
}

export function navigateTo(url: string) {
  if (typeof window !== 'undefined') {
    window.history.pushState(null, '', url);
    notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function usePathname() {
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    () => (typeof window !== 'undefined' ? window.location.pathname || '/' : '/'),
    () => '/',
  );
}

export function useRouter() {
  return {
    push: (url: string) => {
      navigateTo(url);
    },
    replace: (url: string) => {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', url);
        notify();
      }
    },
    back: () => {
      if (typeof window !== 'undefined') window.history.back();
    },
    forward: () => {
      if (typeof window !== 'undefined') window.history.forward();
    },
    refresh: () => {
      if (typeof window !== 'undefined') window.location.reload();
    },
    prefetch: () => {},
  };
}

export function useSearchParams() {
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    () => (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()),
    () => new URLSearchParams(),
  );
}

export default {
  usePathname,
  useRouter,
  useSearchParams,
  navigateTo,
};

