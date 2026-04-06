'use client';

import { useEffect, useState } from 'react';

export const useAlumniContactsDetailHeaderTheme = () => {
  const [changeHeaderTextColor, setChangeHeaderTextColor] =
    useState<boolean>(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('#main-scroll-container');

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
