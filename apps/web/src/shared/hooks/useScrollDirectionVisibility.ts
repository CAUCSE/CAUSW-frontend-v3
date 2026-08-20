'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_DIRECTION_THRESHOLD = 4;
// 헤더 접힘/펼침 CSS 트랜지션이 끝날 때까지 재판정을 잠궈서,
// 트랜지션 도중 레이아웃이 흔들리며 생기는 미세한 scroll 이벤트에 다시 반응해
// 보임/숨김이 반복 진동(떨림)하는 것을 막는다.
const DEFAULT_TOGGLE_COOLDOWN_MS = 300;

interface UseScrollDirectionVisibilityOptions {
  /** window가 아니라 특정 컨테이너(PullToRefresh 등)가 실제로 스크롤될 때, 그 컨테이너를 식별할 className */
  containerClassName?: string;
  directionThreshold?: number;
  toggleCooldownMs?: number;
}

/**
 * 스크롤을 내리면 숨기고 올리면 다시 보여주는 헤더용 훅
 */
export const useScrollDirectionVisibility = ({
  containerClassName,
  directionThreshold = DEFAULT_DIRECTION_THRESHOLD,
  toggleCooldownMs = DEFAULT_TOGGLE_COOLDOWN_MS,
}: UseScrollDirectionVisibilityOptions = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollTopRef = useRef(0);
  const lastToggleTimeRef = useRef(0);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target;
      const isWindowScroll = target === document;
      const isContainerScroll =
        !!containerClassName &&
        target instanceof HTMLElement &&
        target.classList.contains(containerClassName);

      if (!isWindowScroll && !isContainerScroll) return;

      const currentScrollTop = isWindowScroll
        ? window.scrollY
        : (target as HTMLElement).scrollTop;

      setIsScrolled(currentScrollTop > 1);

      const delta = currentScrollTop - lastScrollTopRef.current;
      const now = Date.now();
      const canToggle = now - lastToggleTimeRef.current > toggleCooldownMs;

      if (currentScrollTop <= 0) {
        setIsVisible(true);
        lastToggleTimeRef.current = now;
      } else if (canToggle && delta > directionThreshold) {
        setIsVisible(false);
        lastToggleTimeRef.current = now;
      } else if (canToggle && delta < -directionThreshold) {
        setIsVisible(true);
        lastToggleTimeRef.current = now;
      }

      lastScrollTopRef.current = currentScrollTop;
    };

    document.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [containerClassName, directionThreshold, toggleCooldownMs]);

  const scrollToTop = () => {
    const container = containerClassName
      ? document.querySelector<HTMLElement>(`.${containerClassName}`)
      : null;

    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { isVisible, isScrolled, scrollToTop };
};
