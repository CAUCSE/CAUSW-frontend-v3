import './globals.css';

import type { Metadata } from 'next';

import Script from 'next/script';

import { getTraceData } from '@causw/logger';

import { CLARITY_PROJECT_ID, GA_MEASUREMENT_ID } from '@/shared/config';
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
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
      {CLARITY_PROJECT_ID ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      ) : null}
    </html>
  );
}
