'use client';

import { useEffect, useState } from 'react';

import { getScrollContainer } from '@/shared/utils';

export const useAlumniContactsDetailHeaderTheme = () => {
  const [changeHeaderTextColor, setChangeHeaderTextColor] =
    useState<boolean>(false);

  useEffect(() => {
    const scrollContainer = getScrollContainer();

    const handleScroll = () => {
      if ((scrollContainer?.scrollTop ?? 0) > 400) {
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
