'use client';

import { useState, useEffect } from 'react';

import { MEDIA_QUERIES } from '../constants';

/**
 * 현재 뷰포트의 반응형 디자인 브레이크포인트 상태를 감지하는 커스텀 훅입니다.
 * MEDIA_QUERIES에 정의된 기준에 따라 모바일, 태블릿, 데스크탑 여부를 반환합니다.
 *
 * @returns {{isMobile: boolean, isTablet: boolean, isDesktop: boolean}} 현재 브레이크포인트 상태를 나타내는 객체
 * - isMobile: 뷰포트가 모바일 브레이크포인트에 해당하는 경우 true
 * - isTablet: 뷰포트가 태블릿 브레이크포인트에 해당하는 경우 true
 * - isDesktop: 뷰포트가 데스크탑 브레이크포인트에 해당하는 경우 true
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryLists = {
      mobile: window.matchMedia(MEDIA_QUERIES.mobile),
      tablet: window.matchMedia(MEDIA_QUERIES.tablet),
      desktop: window.matchMedia(MEDIA_QUERIES.desktop),
    };

    const updateBreakpoint = () => {
      setBreakpoint({
        isMobile: mediaQueryLists.mobile.matches,
        isTablet: mediaQueryLists.tablet.matches,
        isDesktop: mediaQueryLists.desktop.matches,
      });
    };

    updateBreakpoint();

    const queries = Object.values(mediaQueryLists);
    queries.forEach((query) =>
      query.addEventListener('change', updateBreakpoint),
    );

    return () => {
      queries.forEach((query) =>
        query.removeEventListener('change', updateBreakpoint),
      );
    };
  }, []);

  return breakpoint;
};
