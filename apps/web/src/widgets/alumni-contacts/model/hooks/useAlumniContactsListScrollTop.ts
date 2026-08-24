'use client';

import { useCallback, useRef, useState } from 'react';

import { useAlumniContactsScrollVisibilityContext } from '@/entities/alumni-contacts';

import { useIsomorphicLayoutEffect } from '@/shared/hooks';

const SCROLL_DIRECTION_THRESHOLD = 4;
// 헤더 접힘/펼침 CSS 트랜지션(duration-200)이 끝날 때까지 재판정을 잠궈서,
// 트랜지션 도중 레이아웃이 흔들리며 생기는 미세한 scroll 이벤트에 다시 반응해
// 보임/숨김이 반복 진동(떨림)하는 것을 막는다.
const VISIBILITY_TOGGLE_COOLDOWN_MS = 300;

export const useAlumniContactsListScrollTop = () => {
  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  const lastScrollTopRef = useRef(0);
  const lastToggleTimeRef = useRef(0);
  const { setIsSearchFilterVisible } =
    useAlumniContactsScrollVisibilityContext();

  useIsomorphicLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = scrollTarget?.scrollTop ?? 0;
      setShowScrollToTopButton(currentScrollTop > 1);

      const delta = currentScrollTop - lastScrollTopRef.current;
      const now = Date.now();
      const canToggle =
        now - lastToggleTimeRef.current > VISIBILITY_TOGGLE_COOLDOWN_MS;

      if (currentScrollTop <= 0) {
        setIsSearchFilterVisible(true);
        lastToggleTimeRef.current = now;
      } else if (canToggle && delta > SCROLL_DIRECTION_THRESHOLD) {
        setIsSearchFilterVisible(false);
        lastToggleTimeRef.current = now;
      } else if (canToggle && delta < -SCROLL_DIRECTION_THRESHOLD) {
        setIsSearchFilterVisible(true);
        lastToggleTimeRef.current = now;
      }

      lastScrollTopRef.current = currentScrollTop;
    };

    handleScroll();
    scrollTarget?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollTarget?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollTarget, setIsSearchFilterVisible]);

  const setDesktopScrollTargetRef = useCallback(
    (node: HTMLDivElement | null) => {
      setScrollTarget(node);
    },
    [],
  );

  const setMobileScrollTargetRef = useCallback(
    (node: HTMLDivElement | null) => {
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
