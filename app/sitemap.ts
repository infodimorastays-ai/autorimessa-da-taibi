import type { MetadataRoute } from 'next';

const SITE_URL = 'https://autorimessadataibi.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL }];
}
