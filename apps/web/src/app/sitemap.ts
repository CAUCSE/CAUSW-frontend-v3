import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/shared/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'weekly',
      priority: 1,
      url: SITE_URL,
    },
  ];
}
