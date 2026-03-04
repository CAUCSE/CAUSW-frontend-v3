import './globals.css';

import type { Metadata } from 'next';

import { getTraceData } from '@causw/logger';

import {
  QueryProviderWithDevtools,
  Toaster,
} from '@/shared/ui';

import { MSWComponent } from './_mock';
import { GlobalRoutingProvider } from './_provider';

export const metadata: Metadata = {
  title: '동문 네트워크',
  description: '동문 네트워크 서비스',
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
            <GlobalRoutingProvider>{children}</GlobalRoutingProvider>
          </QueryProviderWithDevtools>
        </MSWComponent>
      </body>
    </html>
  );
}
