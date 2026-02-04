'use client';

import { useEffect, useMemo, useRef } from 'react';

interface UseInfiniteScrollProps {
  intersectionCallback: IntersectionObserverCallback;
  option?: IntersectionObserverInit;
}

export const useInfiniteScroll = ({
  intersectionCallback,
  option,
}: UseInfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const observerOption = useMemo<IntersectionObserverInit>(
    () =>
      option ?? {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    [option],
  );

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      intersectionCallback,
      observerOption,
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [intersectionCallback, observerOption]);

  return { targetRef };
};
