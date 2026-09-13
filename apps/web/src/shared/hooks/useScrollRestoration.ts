'use client';

import { useCallback, useEffect } from 'react';

import { getScrollContainer } from '../utils';

export const useScrollRestoration = (storageKey: string) => {
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(storageKey);
    if (savedPosition === null) return;

    sessionStorage.removeItem(storageKey);

    const container = getScrollContainer();
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop = Number(savedPosition);
    });
  }, [storageKey]);

  const saveScrollPosition = useCallback(() => {
    const container = getScrollContainer();
    if (!container) return;
    sessionStorage.setItem(storageKey, String(container.scrollTop));
  }, [storageKey]);

  return { saveScrollPosition };
};
