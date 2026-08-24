'use client';

import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { FEED_SCROLL_RESTORATION_STORAGE_KEY } from '../../config';

export const useGetFeedScrollRestorationStorageKey = () => {
  const pathname = usePathname();

  const feedScrollRestorationStorageKey = useMemo(() => {
    if (pathname.includes('/feed/search')) {
      return FEED_SCROLL_RESTORATION_STORAGE_KEY.SEARCH;
    }

    if (pathname.includes('/feed')) {
      return FEED_SCROLL_RESTORATION_STORAGE_KEY.LIST;
    }

    if (pathname.includes('/my-feed')) {
      return FEED_SCROLL_RESTORATION_STORAGE_KEY.MY_FEED;
    }

    return '';
  }, [pathname]);

  return {
    feedScrollRestorationStorageKey,
  };
};
