'use client';

import React from 'react';
import { type AwariconTier } from '@/content/awaricon';
import AwariconBadge from '@/components/AwariconBadge';
import AwariconCalculator from '@/components/AwariconCalculator';
import AwariconIconStudio from '@/components/AwariconIconStudio';
import AwariconEmbedKit from '@/components/AwariconEmbedKit';

interface AwariconInteractiveSuiteProps {
  tiers: readonly AwariconTier[];
}

export default function AwariconInteractiveSuite({ tiers }: AwariconInteractiveSuiteProps) {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        {tiers.map((tier, index) => (
          <AwariconBadge key={tier.key} tier={tier} index={index} />
        ))}
      </div>

      <AwariconIconStudio />
      <AwariconCalculator />
      <AwariconEmbedKit />
    </>
  );
}
