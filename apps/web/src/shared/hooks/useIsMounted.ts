'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

// SSR 하이드레이션 안전 처리를 위한 훅

export const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
