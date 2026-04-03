'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function trackPageView(url: string) {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_location: url,
    page_path: new URL(url).pathname,
  });
}

function trackClick(label: string, href: string) {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'select_content', {
    content_type: 'cta',
    item_id: label,
    item_name: label,
    destination: href,
  });
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const pageUrl = `${window.location.origin}${pathname}${window.location.search}`;
    trackPageView(pageUrl);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const trackable = target.closest<HTMLElement>('[data-track]');
      if (!trackable) {
        return;
      }

      const label = trackable.dataset.track;
      const href = trackable.getAttribute('href') || trackable.dataset.href || '';
      if (!label) {
        return;
      }

      trackClick(label, href);
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
