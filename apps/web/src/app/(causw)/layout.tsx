'use client';

import { NavigationLayout } from '@/widgets/navigationLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <NavigationLayout>{children}</NavigationLayout>;
}
