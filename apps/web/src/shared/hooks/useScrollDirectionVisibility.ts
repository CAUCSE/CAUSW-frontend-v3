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
  /**
   * false면 스크롤 이벤트를 감시하지 않고 항상 기본 상태(보임)를 유지한다.
   * 여러 페이지에서 재사용되는 컴포넌트가 언마운트되지 않은 채 라우트만 바뀌는 경우,
   * 이전 페이지에서 감춰졌던 상태가 그대로 남아 다른 페이지에서도 계속 숨겨지는 것을 막기 위함.
   */
  enabled?: boolean;
}

/**
 * 스크롤을 내리면 숨기고 올리면 다시 보여주는 헤더용 훅
 */
export const useScrollDirectionVisibility = ({
  containerClassName,
  directionThreshold = DEFAULT_DIRECTION_THRESHOLD,
  toggleCooldownMs = DEFAULT_TOGGLE_COOLDOWN_MS,
  enabled = true,
}: UseScrollDirectionVisibilityOptions = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollTopRef = useRef(0);
  const lastToggleTimeRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    lastScrollTopRef.current = 0;
    lastToggleTimeRef.current = 0;

    const applyScrollTop = (currentScrollTop: number) => {
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

    const handleScroll = (event: Event) => {
      const target = event.target;
      const isWindowScroll = target === document;
      const isContainerScroll =
        !!containerClassName &&
        target instanceof HTMLElement &&
        target.classList.contains(containerClassName);

      if (!isWindowScroll && !isContainerScroll) return;

      applyScrollTop(
        isWindowScroll ? window.scrollY : (target as HTMLElement).scrollTop,
      );
    };

    const initialContainer = containerClassName
      ? document.querySelector<HTMLElement>(`.${containerClassName}`)
      : null;
    applyScrollTop(
      initialContainer ? initialContainer.scrollTop : window.scrollY,
    );

    document.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [containerClassName, directionThreshold, toggleCooldownMs, enabled]);

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

  return {
    isVisible: enabled ? isVisible : true,
    isScrolled: enabled ? isScrolled : false,
    scrollToTop,
  };
};
