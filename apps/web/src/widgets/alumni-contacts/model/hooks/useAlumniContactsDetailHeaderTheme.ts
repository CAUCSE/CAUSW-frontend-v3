'use client';

import { useEffect, useState } from 'react';

import { useAlumniContactsHeaderBoundaryContext } from '@/entities/alumni-contacts';

import { getScrollContainer } from '@/shared/utils';

export const useAlumniContactsDetailHeaderTheme = () => {
  const { alumniContactsHeroRef } = useAlumniContactsHeaderBoundaryContext();

  const [changeHeaderTextColor, setChangeHeaderTextColor] =
    useState<boolean>(false);

  useEffect(() => {
    const scrollContainer = getScrollContainer();

    const handleScroll = () => {
      if (!alumniContactsHeroRef.current) {
        return;
      }

      if (
        (scrollContainer?.scrollTop ?? 0) >
        alumniContactsHeroRef.current.clientHeight
      ) {
        setChangeHeaderTextColor(true);
      } else {
        setChangeHeaderTextColor(false);
      }
    };
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [alumniContactsHeroRef]);

  return {
    changeHeaderTextColor,
  };
};
