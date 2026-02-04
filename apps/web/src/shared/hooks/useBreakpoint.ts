'use client';

import { useState, useEffect } from 'react';

import { MEDIA_QUERIES } from '../constants';

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobileQuery = window.matchMedia(MEDIA_QUERIES.mobile);
    const tabletQuery = window.matchMedia(MEDIA_QUERIES.tablet);
    const desktopQuery = window.matchMedia(MEDIA_QUERIES.desktop);

    const updateBreakpoint = () => {
      setBreakpoint({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
      });
    };

    updateBreakpoint();

    mobileQuery.addEventListener('change', updateBreakpoint);
    tabletQuery.addEventListener('change', updateBreakpoint);
    desktopQuery.addEventListener('change', updateBreakpoint);

    return () => {
      mobileQuery.removeEventListener('change', updateBreakpoint);
      tabletQuery.removeEventListener('change', updateBreakpoint);
      desktopQuery.removeEventListener('change', updateBreakpoint);
    };
  }, []);

  return breakpoint;
};
