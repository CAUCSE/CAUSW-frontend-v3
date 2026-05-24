import './globals.css';

import type { Metadata } from 'next';

import { getTraceData } from '@causw/logger';

import { QueryProviderWithDevtools, Toaster } from '@/shared/ui';

import { MSWComponent } from './_mock';
import {
  AuthRefreshProvider,
  ForceUpdateProvider,
  GlobalRoutingProvider,
} from './_provider';

const SOCIAL_PREVIEW_IMAGE = '/images/social-preview.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.causw.co.kr'),
  title: '동문 네트워크',
  description: '동문 네트워크 서비스',
  icons: {
    icon: '/images/favicon-128.png',
  },
  openGraph: {
    title: '동문 네트워크',
    description: '동문 네트워크 서비스',
    siteName: '동문 네트워크',
    images: [
      {
        alt: '동문 네트워크 공유 미리보기 이미지',
        height: 630,
        url: SOCIAL_PREVIEW_IMAGE,
        width: 1200,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    description: '동문 네트워크 서비스',
    images: [SOCIAL_PREVIEW_IMAGE],
    title: '동문 네트워크',
  },
  other: {
    ...getTraceData(), // Sentry 오류 로그 추적
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>
        <MSWComponent>
          <QueryProviderWithDevtools>
            <Toaster />
            <ForceUpdateProvider>
              <AuthRefreshProvider>
                <GlobalRoutingProvider>{children}</GlobalRoutingProvider>
              </AuthRefreshProvider>
            </ForceUpdateProvider>
          </QueryProviderWithDevtools>
        </MSWComponent>
      </body>
    </html>
  );
}
