'use client';

import { useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
  intersectionCallback: IntersectionObserverCallback;
  option?: IntersectionObserverInit;
}

export const useInfiniteScroll = ({
  intersectionCallback,
  option,
}: useInfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const observerOption = option || {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

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
      if (targetRef.current) {
        observer.disconnect();
      }
    };
  }, [intersectionCallback]);

  return { targetRef };
};
