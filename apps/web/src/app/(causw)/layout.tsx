'use client';

import { PageLayout } from '@/widgets/pageLayout/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
