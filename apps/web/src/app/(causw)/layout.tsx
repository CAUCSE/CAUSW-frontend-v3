'use client';

import { NavigationLayout } from '@/widgets/navigation-layout';

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <NavigationLayout>
      {children}
      {modal}
    </NavigationLayout>
  );
}
