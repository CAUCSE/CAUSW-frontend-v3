import './globals.css';

import type { Metadata } from 'next';
import { QueryProviderWithDevtools } from '@/shared/ui';

export const metadata: Metadata = {
  title: '동문 네트워크',
  description: '동문 네트워크 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>
        <QueryProviderWithDevtools>{children}</QueryProviderWithDevtools>
      </body>
    </html>
  );
}
