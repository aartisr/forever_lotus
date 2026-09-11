import posthog from 'posthog-js';

declare global {
  interface Window {
    clarity?: {
      (command: 'event', eventName: string): void;
      (command: 'set', key: string, value: string | string[]): void;
      (command: 'identify', customId: string, customSessionId?: string, customPageId?: string, friendlyName?: string): void;
      (command: 'consent', consentGiven?: boolean): void;
      q?: unknown[];
      v?: string;
    };
  }
}

let isPostHogInitialized = false;
let isClarityInitialized = false;

export interface AnalyticsConfig {
  posthogKey?: string;
  posthogHost?: string;
  clarityProjectId?: string;
}

export function getAnalyticsConfig(): AnalyticsConfig {
  return {
    posthogKey: import.meta.env.VITE_POSTHOG_KEY || undefined,
    posthogHost: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    clarityProjectId: import.meta.env.VITE_CLARITY_PROJECT_ID || undefined,
  };
}

/**
 * Initializes PostHog and Microsoft Clarity with dignified privacy baselines
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  const config = getAnalyticsConfig();

  // 1. Initialize PostHog if key is present
  if (config.posthogKey && !isPostHogInitialized) {
    try {
      posthog.init(config.posthogKey, {
        api_host: config.posthogHost || 'https://us.i.posthog.com',
        autocapture: true,
        capture_pageview: false, // Managed by our router to prevent duplicates
        capture_pageleave: true,
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: '[data-clarity-mask], input[type="password"]',
        },
        persistence: 'localStorage+cookie',
        loaded: () => {
          isPostHogInitialized = true;
          if (import.meta.env.DEV) {
            console.log('[Analytics] PostHog initialized successfully');
          }
        },
      });
      isPostHogInitialized = true;
    } catch (err) {
      console.warn('[Analytics] Failed to initialize PostHog:', err);
    }
  }

  // 2. Initialize Microsoft Clarity if project ID is present
  if (config.clarityProjectId && !isClarityInitialized) {
    try {
      const projectId = config.clarityProjectId.trim();
      if (projectId && !window.clarity) {
        // Official Clarity asynchronous bootloader script
        (function (c: Window, l: Document, a: string, r: string, i: string) {
          const w = c as unknown as Record<string, unknown>;
          w[a] = w[a] || function (...args: unknown[]) {
            const clarityFn = w[a] as { q?: unknown[] };
            (clarityFn.q = clarityFn.q || []).push(args);
          };
          const t = l.createElement(r) as HTMLScriptElement;
          t.async = true;
          t.src = 'https://www.clarity.ms/tag/' + i;
          const y = l.getElementsByTagName(r)[0];
          if (y && y.parentNode) {
            y.parentNode.insertBefore(t, y);
          } else {
            l.head.appendChild(t);
          }
        })(window, document, 'clarity', 'script', projectId);

        isClarityInitialized = true;
        if (import.meta.env.DEV) {
          console.log('[Analytics] Microsoft Clarity script injected with ID:', projectId);
        }
      }
    } catch (err) {
      console.warn('[Analytics] Failed to initialize Microsoft Clarity:', err);
    }
  }
}

/**
 * Tracks route / pageview transitions across both PostHog and Microsoft Clarity
 */
export function trackPageView(pathname: string, title?: string): void {
  if (typeof window === 'undefined') return;

  const currentTitle = title || document.title || 'Forever Lotus';
  const currentUrl = window.location.href;

  // Track in PostHog
  if (isPostHogInitialized) {
    try {
      posthog.capture('$pageview', {
        $current_url: currentUrl,
        $pathname: pathname,
        title: currentTitle,
      });
    } catch {
      // safe fallback
    }
  }

  // Track in Microsoft Clarity
  if (window.clarity) {
    try {
      window.clarity('set', 'page', pathname);
    } catch {
      // safe fallback
    }
  }
}

/**
 * Tracks custom interaction events across PostHog and Microsoft Clarity
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  // PostHog event
  if (isPostHogInitialized) {
    try {
      posthog.capture(eventName, properties);
    } catch {
      // safe fallback
    }
  }

  // Clarity custom event tag
  if (window.clarity) {
    try {
      window.clarity('event', eventName);
      if (properties) {
        Object.entries(properties).forEach(([key, val]) => {
          if (typeof val === 'string' || Array.isArray(val)) {
            window.clarity?.('set', key, val);
          } else if (typeof val === 'number' || typeof val === 'boolean') {
            window.clarity?.('set', key, String(val));
          }
        });
      }
    } catch {
      // safe fallback
    }
  }
}

/**
 * Identify an authenticated / opted-in user with sovereign privacy guards
 */
export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  if (isPostHogInitialized) {
    try {
      posthog.identify(userId, traits);
    } catch {
      // safe fallback
    }
  }

  if (window.clarity) {
    try {
      window.clarity('identify', userId);
    } catch {
      // safe fallback
    }
  }
}

/**
 * Checks active status of PostHog and Microsoft Clarity
 */
export function getAnalyticsStatus() {
  const config = getAnalyticsConfig();
  return {
    posthogConfigured: Boolean(config.posthogKey),
    posthogInitialized: isPostHogInitialized,
    clarityConfigured: Boolean(config.clarityProjectId),
    clarityInitialized: isClarityInitialized || (typeof window !== 'undefined' && Boolean(window.clarity)),
  };
}
