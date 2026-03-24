'use client';

import { Suspense, useSyncExternalStore, type ReactNode } from 'react';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const useIsHydrated = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

interface HydrationSuspenseProps {
  fallback: ReactNode;
  children: ReactNode;
}

export const HydrationSuspense = ({
  fallback,
  children,
}: HydrationSuspenseProps) => {
  const isHydrated = useIsHydrated();

  if (isHydrated) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }

  return <>{null}</>;
};
