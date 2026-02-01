import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import { getTraceData } from '@causw/logger';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
