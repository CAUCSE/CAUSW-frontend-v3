'use client';

import { useCallback, useEffect } from 'react';

const SCROLL_CONTAINER_ID = 'main-scroll-container';

export const useScrollRestoration = (storageKey: string) => {
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(storageKey);
    if (savedPosition === null) return;

    sessionStorage.removeItem(storageKey);

    const container = document.getElementById(SCROLL_CONTAINER_ID);
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop = Number(savedPosition);
    });
  }, [storageKey]);

  const saveScrollPosition = useCallback(() => {
    const container = document.getElementById(SCROLL_CONTAINER_ID);
    if (!container) return;
    sessionStorage.setItem(storageKey, String(container.scrollTop));
  }, [storageKey]);

  return { saveScrollPosition };
};
