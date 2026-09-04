import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/shared/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/$', '/_next/', '/images/', '/sitemap.xml'],
      disallow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
