import './globals.css';

import type { Metadata } from 'next';

import { getTraceData } from '@causw/logger';

import {
  GlobalRoutingProvider,
  QueryProviderWithDevtools,
  Toaster,
} from '@/shared/ui';

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
        <QueryProviderWithDevtools>
          <Toaster />
          <GlobalRoutingProvider>{children}</GlobalRoutingProvider>
        </QueryProviderWithDevtools>
      </body>
    </html>
  );
}
