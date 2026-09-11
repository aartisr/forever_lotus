'use client';

import Analytics from '@/components/Analytics';
import GlobalLanguageBridge from '@/components/GlobalLanguageBridge';
import PerformanceTelemetry from '@/components/PerformanceTelemetry';

export default function ClientRuntime() {
  return (
    <>
      <GlobalLanguageBridge />
      <Analytics />
      <PerformanceTelemetry />
    </>
  );
}
