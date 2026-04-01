'use client';

import { useCallback, useEffect, useState } from 'react';

export const useAlumniContactsListScrollTop = () => {
  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTopButton((scrollTarget?.scrollTop ?? 0) > 1);
    };

    handleScroll();
    scrollTarget?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollTarget?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollTarget]);

  const setDesktopScrollTargetRef = useCallback(
    (node: HTMLUListElement | null) => {
      setScrollTarget(node);
    },
    [],
  );

  const setMobileScrollTargetRef = useCallback(
    (node: HTMLUListElement | null) => {
      // PullToRefresh가 스크롤 컨테이너라서 이런식으로 ref를 지정해야함
      setScrollTarget(
        node?.closest(
          '.alumni-contacts-scroll-container',
        ) as HTMLElement | null,
      );
    },
    [],
  );

  const handleClickScrollTop = () => {
    scrollTarget?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    showScrollToTopButton,
    setDesktopScrollTargetRef,
    setMobileScrollTargetRef,
    handleClickScrollTop,
  };
};
