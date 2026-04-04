'use client';

import { useEffect } from 'react';

type PerfMetricName = 'LCP' | 'CLS' | 'INP' | 'FCP' | 'TTFB' | 'NAV';

interface PerfMetricPayload {
  name: PerfMetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  path: string;
  at: string;
}

function getRating(name: PerfMetricName, value: number): PerfMetricPayload['rating'] {
  if (name === 'CLS') {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  if (name === 'LCP') {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  if (name === 'INP') {
    if (value <= 200) return 'good';
    if (value <= 500) return 'needs-improvement';
    return 'poor';
  }

  if (name === 'FCP') {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  if (name === 'TTFB') {
    if (value <= 800) return 'good';
    if (value <= 1800) return 'needs-improvement';
    return 'poor';
  }

  if (value <= 1000) return 'good';
  if (value <= 3000) return 'needs-improvement';
  return 'poor';
}

function sendMetric(payload: PerfMetricPayload): void {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/telemetry/performance', body);
    return;
  }

  fetch('/api/telemetry/performance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export default function PerformanceTelemetry() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (navigator.doNotTrack === '1') return;

    const sampleRate = Number.parseFloat(process.env.NEXT_PUBLIC_PERF_SAMPLE_RATE ?? '0.2');
    if (Number.isFinite(sampleRate) && Math.random() > sampleRate) return;

    const path = window.location.pathname;
    const now = () => new Date().toISOString();

    const emit = (name: PerfMetricName, value: number) => {
      sendMetric({ name, value, rating: getRating(name, value), path, at: now() });
    };

    const perf = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (perf) {
      emit('TTFB', perf.responseStart);
      emit('NAV', perf.duration);
    }

    const observers: PerformanceObserver[] = [];

    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const last = entries[entries.length - 1];
        if (last) emit('LCP', last.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);

      const fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') emit('FCP', entry.startTime);
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
      observers.push(fcpObserver);

      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as Array<PerformanceEntry & { hadRecentInput?: boolean; value?: number }>) {
          if (!entry.hadRecentInput && typeof entry.value === 'number') {
            clsValue += entry.value;
          }
        }
        emit('CLS', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObserver);

      const inpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as Array<PerformanceEntry & { duration?: number }>;
        const maxDuration = entries.reduce(
          (max, entry) => Math.max(max, entry.duration ?? 0),
          0
        );
        if (maxDuration > 0) emit('INP', maxDuration);
      });
      inpObserver.observe({
        type: 'event',
        buffered: true,
        durationThreshold: 40,
      } as PerformanceObserverInit);
      observers.push(inpObserver);
    }

    return () => {
      for (const observer of observers) observer.disconnect();
    };
  }, []);

  return null;
}
