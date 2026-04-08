'use client';

import dynamic from 'next/dynamic';
import { type AwariconTier } from '@/content/awaricon';

const AwariconBadge = dynamic(() => import('@/components/AwariconBadge'));
const AwariconCalculator = dynamic(() => import('@/components/AwariconCalculator'));
const AwariconIconStudio = dynamic(() => import('@/components/AwariconIconStudio'));
const AwariconEmbedKit = dynamic(() => import('@/components/AwariconEmbedKit'));

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
