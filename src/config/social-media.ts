export type TopSocialPlatformId = 'youtube' | 'facebook' | 'instagram' | 'tiktok' | 'whatsapp';

type TopSocialPlatformDefinition = {
  id: TopSocialPlatformId;
  rank: number;
  name: string;
  homeUrl: string;
  profileEnvVar: string;
};

export type TopSocialPlatform = TopSocialPlatformDefinition & {
  profileUrl?: string;
};

export type SocialShareInput = {
  title: string;
  url: string;
  description?: string;
};

export const topSocialPlatformSource = {
  label: 'Pew Research Center, Americans Social Media Use 2025',
  url: 'https://www.pewresearch.org/internet/2026/01/15/americans-social-media-use-2025/',
} as const;

const topSocialPlatformDefinitions = [
  {
    id: 'youtube',
    rank: 1,
    name: 'YouTube',
    homeUrl: 'https://www.youtube.com/',
    profileEnvVar: 'NEXT_PUBLIC_YOUTUBE_CHANNEL_URL',
  },
  {
    id: 'facebook',
    rank: 2,
    name: 'Facebook',
    homeUrl: 'https://www.facebook.com/',
    profileEnvVar: 'NEXT_PUBLIC_FACEBOOK_PAGE_URL',
  },
  {
    id: 'instagram',
    rank: 3,
    name: 'Instagram',
    homeUrl: 'https://www.instagram.com/',
    profileEnvVar: 'NEXT_PUBLIC_INSTAGRAM_PROFILE_URL',
  },
  {
    id: 'tiktok',
    rank: 4,
    name: 'TikTok',
    homeUrl: 'https://www.tiktok.com/',
    profileEnvVar: 'NEXT_PUBLIC_TIKTOK_PROFILE_URL',
  },
  {
    id: 'whatsapp',
    rank: 5,
    name: 'WhatsApp',
    homeUrl: 'https://www.whatsapp.com/',
    profileEnvVar: 'NEXT_PUBLIC_WHATSAPP_CHANNEL_URL',
  },
] as const satisfies readonly TopSocialPlatformDefinition[];

function normalizeUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value).toString();
  } catch {
    return undefined;
  }
}

function normalizePhoneNumber(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const digits = value.replace(/[^\d]/g, '');
  return digits.length >= 8 ? digits : undefined;
}

function getWhatsAppProfileUrl(): string | undefined {
  const channelUrl = normalizeUrl(process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL);
  if (channelUrl) {
    return channelUrl;
  }

  const phoneNumber = normalizePhoneNumber(process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER);
  return phoneNumber ? `https://wa.me/${phoneNumber}` : undefined;
}

function getConfiguredProfileUrl(id: TopSocialPlatformId): string | undefined {
  switch (id) {
    case 'youtube':
      return normalizeUrl(process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL);
    case 'facebook':
      return normalizeUrl(process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL);
    case 'instagram':
      return normalizeUrl(process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL);
    case 'tiktok':
      return normalizeUrl(process.env.NEXT_PUBLIC_TIKTOK_PROFILE_URL);
    case 'whatsapp':
      return getWhatsAppProfileUrl();
  }
}

export function getTopSocialPlatforms(): TopSocialPlatform[] {
  return topSocialPlatformDefinitions.map((platform) => ({
    ...platform,
    profileUrl: getConfiguredProfileUrl(platform.id),
  }));
}

export function getConfiguredSocialProfileUrls(): string[] {
  return Array.from(
    new Set(
      getTopSocialPlatforms()
        .map((platform) => platform.profileUrl)
        .filter((value): value is string => Boolean(value))
    )
  );
}

export function buildSocialShareUrls({ title, url, description }: SocialShareInput) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const shareText = description ? `${title} - ${description}` : title;
  const encodedBody = encodeURIComponent(`${shareText}\n\n${url}`);
  const encodedWhatsAppText = encodeURIComponent(`${shareText} ${url}`);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedWhatsAppText}`,
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedBody}`,
  };
}
