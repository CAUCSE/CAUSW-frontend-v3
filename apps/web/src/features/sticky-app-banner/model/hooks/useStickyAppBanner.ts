'use client';

import { useEffect, useRef, useState } from 'react';

import { Capacitor } from '@capacitor/core';

import { useIsomorphicLayoutEffect } from '@/shared/hooks';
import { type StickyBannerEventName } from '@/shared/lib/analytics';

import {
  STICKY_APP_BANNER_HEIGHT_VAR,
  STICKY_APP_BANNER_HIDE_DURATION,
  STICKY_APP_BANNER_MEDIA_QUERY,
  STICKY_APP_BANNER_STORAGE_KEY,
} from '../../config';
import { trackStickyAppBannerEvent } from '../../lib';
import { getBannerEnvironment, getHiddenUntil } from '../policy';

/** 스티키 앱 배너 노출, 닫기, 높이 측정, 트래킹 상태 */
export const useStickyAppBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);
  const hiddenUntilRef = useRef(0);
  const storageWriteFailedRef = useRef(false);
  const impressionRef = useRef(false);
  const refreshRef = useRef<() => void>(() => {});
  const environment =
    typeof navigator === 'undefined'
      ? getBannerEnvironment('')
      : getBannerEnvironment(navigator.userAgent, navigator.maxTouchPoints);

  const track = (eventName: StickyBannerEventName, store?: string) =>
    trackStickyAppBannerEvent(eventName, { ...environment, store });

  // 노출 여부: 모바일 폭 + 웹(네이티브 앱 아님) + iOS/Android 판별됨 + 숨김 기간 지남
  useEffect(() => {
    const media = window.matchMedia(STICKY_APP_BANNER_MEDIA_QUERY);
    const { os } = getBannerEnvironment(
      navigator.userAgent,
      navigator.maxTouchPoints,
    );
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      clearTimeout(timer);
      const now = Date.now();
      try {
        if (!storageWriteFailedRef.current) {
          hiddenUntilRef.current = getHiddenUntil(
            localStorage.getItem(STICKY_APP_BANNER_STORAGE_KEY),
            now,
          );
        }
      } catch {
        /* storage 접근 불가 시 메모리의 숨김 상태 유지 */
      }
      const remaining = hiddenUntilRef.current - now;
      setVisible(
        media.matches &&
          !Capacitor.isNativePlatform() &&
          os !== 'unknown' &&
          remaining <= 0,
      );
      if (remaining > 0) timer = setTimeout(refresh, remaining);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STICKY_APP_BANNER_STORAGE_KEY || event.key === null) {
        refresh();
      }
    };

    refreshRef.current = refresh;
    refresh();
    media.addEventListener('change', refresh);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('pageshow', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      clearTimeout(timer);
      media.removeEventListener('change', refresh);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('pageshow', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  // 본문이 배너에 가려지지 않도록 실제 배너 높이를 CSS 변수로 기록
  useIsomorphicLayoutEffect(() => {
    const banner = bannerRef.current;
    if (!visible || !banner) return;

    const { style } = document.documentElement;
    const measure = () =>
      style.setProperty(
        STICKY_APP_BANNER_HEIGHT_VAR,
        `${banner.getBoundingClientRect().height}px`,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(banner);
    return () => {
      observer.disconnect();
      style.removeProperty(STICKY_APP_BANNER_HEIGHT_VAR);
    };
  }, [visible]);

  useEffect(() => {
    const recordImpression = () => {
      if (
        !visible ||
        document.visibilityState !== 'visible' ||
        impressionRef.current
      )
        return;
      impressionRef.current = true;
      track('view_sticky_banner');
    };
    recordImpression();
    document.addEventListener('visibilitychange', recordImpression);
    return () =>
      document.removeEventListener('visibilitychange', recordImpression);
    //1회만 기록
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const openHelp = () => setShowHelp(true);

  const close = () => {
    hiddenUntilRef.current = Date.now() + STICKY_APP_BANNER_HIDE_DURATION;
    try {
      localStorage.setItem(
        STICKY_APP_BANNER_STORAGE_KEY,
        String(hiddenUntilRef.current),
      );
    } catch {
      storageWriteFailedRef.current = true;
    }
    setVisible(false);
    setShowHelp(false);
    refreshRef.current();
    track('click_sticky_banner_close');
  };

  return {
    bannerRef,
    visible,
    environment,
    showHelp,
    openHelp,
    close,
    track,
  };
};
