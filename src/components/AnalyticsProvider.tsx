'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, trackPageView } from '@/lib/analytics';

export function AnalyticsProvider() {
  const pathname = usePathname() || '/';
  const initializedRef = useRef(false);

  // Initialize PostHog and Microsoft Clarity once on mount
  useEffect(() => {
    if (!initializedRef.current) {
      initAnalytics();
      initializedRef.current = true;
    }
  }, []);

  // Track pageviews on route change
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
