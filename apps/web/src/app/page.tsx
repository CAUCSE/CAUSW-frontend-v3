import type { Metadata } from 'next';

import { LandingPage } from '@/_pages/landing';

import { LANDING_METADATA, SITE_URL } from '@/shared/config';

export const metadata: Metadata = {
  title: LANDING_METADATA.title,
  description: LANDING_METADATA.description,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/#website`,
      '@type': 'WebSite',
      inLanguage: 'ko-KR',
      name: '크자회(CCSSAA)',
      url: SITE_URL,
    },
    {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'Organization',
      logo: `${SITE_URL}/images/ccssaa-logo.png`,
      name: '중앙대학교 ICT 위원회',
      url: SITE_URL,
    },
  ],
};

export default function Page() {
  return (
    <>
      <LandingPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
