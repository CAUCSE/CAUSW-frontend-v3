'use client';

import { useCallback } from 'react';

import { useInfiniteScroll } from './useInfiniteScroll';

interface UseFetchNextOnScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  option?: IntersectionObserverInit;
}

export const useFetchNextOnScroll = ({
  fetchNextPage,
  hasNextPage,
  option,
}: UseFetchNextOnScrollProps) => {
  const handleIntersect = useCallback<IntersectionObserverCallback>(
    (entries) => {
      if (entries[0]?.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  return useInfiniteScroll({ intersectionCallback: handleIntersect, option });
};
