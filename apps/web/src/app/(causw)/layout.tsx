'use client';

import { OnboardingGuard } from '@/app/_provider';

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
      <OnboardingGuard>
        {children}
        {modal}
      </OnboardingGuard>
    </NavigationLayout>
  );
}
