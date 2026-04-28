import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildSocialShareUrls,
  getConfiguredSocialProfileUrls,
  getTopSocialPlatforms,
} from '@/config/social-media';

function clearSocialEnv() {
  vi.stubEnv('NEXT_PUBLIC_YOUTUBE_CHANNEL_URL', '');
  vi.stubEnv('NEXT_PUBLIC_FACEBOOK_PAGE_URL', '');
  vi.stubEnv('NEXT_PUBLIC_INSTAGRAM_PROFILE_URL', '');
  vi.stubEnv('NEXT_PUBLIC_TIKTOK_PROFILE_URL', '');
  vi.stubEnv('NEXT_PUBLIC_WHATSAPP_CHANNEL_URL', '');
  vi.stubEnv('NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER', '');
}

describe('top social media integration', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('keeps the configured top-five social platforms in U.S. usage order', () => {
    expect(getTopSocialPlatforms().map((platform) => platform.id)).toEqual([
      'youtube',
      'facebook',
      'instagram',
      'tiktok',
      'whatsapp',
    ]);
  });

  it('normalizes configured social profiles for structured data', () => {
    clearSocialEnv();
    vi.stubEnv('NEXT_PUBLIC_TIKTOK_PROFILE_URL', 'https://www.tiktok.com/@foreverlotus');
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_CHANNEL_URL', 'not-a-valid-url');
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER', '+1 (555) 123-4567');

    expect(getConfiguredSocialProfileUrls()).toEqual([
      'https://www.tiktok.com/@foreverlotus',
      'https://wa.me/15551234567',
    ]);
  });

  it('builds direct share links for platforms that support web sharing', () => {
    const links = buildSocialShareUrls({
      title: 'Forever Lotus',
      url: 'https://foreverlotus.com/insights/conscious-creation-framework',
      description: 'A dignity-centered framework.',
    });

    expect(links.facebook).toBe(
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fforeverlotus.com%2Finsights%2Fconscious-creation-framework'
    );
    expect(links.whatsapp).toContain('https://wa.me/?text=Forever%20Lotus');
    expect(links.email).toContain('mailto:?subject=Forever%20Lotus');
  });
});
