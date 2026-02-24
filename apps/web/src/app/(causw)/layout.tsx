'use client';

import { NavigationLayout } from '@/widgets/navigation-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <NavigationLayout>{children}</NavigationLayout>;
}
