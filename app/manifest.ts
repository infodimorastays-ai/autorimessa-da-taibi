import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Autorimessa Da Taibi',
    short_name: 'Da Taibi',
    description:
      'Autorimessa e parcheggio custodito H24 a Torino.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020309',
    theme_color: '#020309',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
