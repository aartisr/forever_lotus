import React from 'react';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-lotus-bg">
      <LotusIcon size={60} variant="section" className="mb-8 opacity-60 animate-float" />
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-serif font-black text-lotus-cream mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Page Not Found
      </h1>
      <p className="text-lotus-muted text-lg max-w-md mx-auto mb-10 leading-relaxed">
        Like the lotus, some paths loop back before rising. This page doesn&apos;t exist, but
        the framework does.
      </p>
      <Link href="/" className="btn-primary">
        Return Home →
      </Link>
    </div>
  );
}
