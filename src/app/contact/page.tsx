import type { Metadata } from 'next';
import ContactLeadCaptureExperience from '@/components/ContactLeadCaptureExperience';
import { buildAlternates, buildPageUrl, defaultOgImage, siteName } from '@/lib/seo';

const title = 'Invest In Creation With Responsibility';
const description =
  'A private invitation for aligned venture capitalists, partners, and long-horizon investors to support Forever Lotus and Awaricon as trust infrastructure for conscious creation.';

const investorEmail = 'investors@foreverlotus.com';

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates('/contact', 'en'),
  openGraph: {
    type: 'website',
    url: buildPageUrl('/contact', 'en'),
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

export default function ContactPage() {
  return <ContactLeadCaptureExperience investorEmail={investorEmail} />;
}
