'use client';

import React from 'react';

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
      <React.Fragment key="children">{children}</React.Fragment>
      <React.Fragment key="modal">{modal}</React.Fragment>
    </NavigationLayout>
  );
}
