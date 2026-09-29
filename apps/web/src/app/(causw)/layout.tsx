'use client';

import React from 'react';

import { MixpanelProvider, OnboardingGuard } from '@/app/_provider';

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
        <MixpanelProvider>
          <React.Fragment key="children">{children}</React.Fragment>
          <React.Fragment key="modal">{modal}</React.Fragment>
        </MixpanelProvider>
      </OnboardingGuard>
    </NavigationLayout>
  );
}
