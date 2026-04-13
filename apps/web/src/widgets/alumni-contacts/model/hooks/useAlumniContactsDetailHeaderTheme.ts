'use client';

import { useEffect, useState } from 'react';

import { getScrollContainer } from '@/shared/utils';

export const useAlumniContactsDetailHeaderTheme = () => {
  const [changeHeaderTextColor, setChangeHeaderTextColor] =
    useState<boolean>(false);

  const PROFILE_HEADER_HEIGHT = 400;

  useEffect(() => {
    const scrollContainer = getScrollContainer();

    const handleScroll = () => {
      if ((scrollContainer?.scrollTop ?? 0) > PROFILE_HEADER_HEIGHT) {
        setChangeHeaderTextColor(true);
      } else {
        setChangeHeaderTextColor(false);
      }
    };
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    changeHeaderTextColor,
  };
};
