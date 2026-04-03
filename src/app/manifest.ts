import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Forever Lotus',
    short_name: 'Forever Lotus',
    description:
      'A civilizational framework for conscious creation rooted in compassion, dignity, and Eastern wisdom.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0c1f',
    theme_color: '#c9a84c',
    categories: ['education', 'lifestyle', 'philosophy'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
