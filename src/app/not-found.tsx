'use client';

import React from 'react';
import Link from 'next/link';
import LotusIcon from '@/components/LotusIcon';
import { getMessages, resolveLocale, withLocale } from '@/i18n';

export default function NotFound() {
  const locale = resolveLocale(undefined);
  const messages = getMessages(locale);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-lotus-bg">
      <LotusIcon size={60} variant="section" className="mb-8 opacity-60 animate-float" />
      <p className="eyebrow mb-4">{messages.notFound.code}</p>
      <h1 className="font-serif font-black text-lotus-cream mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        {messages.notFound.title}
      </h1>
      <p className="text-lotus-muted text-lg max-w-md mx-auto mb-10 leading-relaxed">
        {messages.notFound.description}
      </p>
      <Link href={withLocale('/', locale)} className="btn-primary">
        {messages.notFound.cta} →
      </Link>
    </div>
  );
}
