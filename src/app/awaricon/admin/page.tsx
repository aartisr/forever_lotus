import type { Metadata } from 'next';
import AwariconAdminConsole from '@/components/AwariconAdminConsole';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Awaricon Admin Console | Domain and Token Management';
const description =
  'Manage approved Awaricon badge domains and generate signed embed URLs from a protected admin console.';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/awaricon/admin', 'en'),
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': 0,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: buildPageUrl('/awaricon/admin', 'en'),
    title,
    description,
    siteName,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [defaultOgImage],
  },
};

export default function AwariconAdminPage() {
  return <AwariconAdminConsole />;
}
