import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/shared/constants';

import {
  ANDROID_PACKAGE_NAME,
  STICKY_APP_BANNER_HIDE_DURATION,
} from '../config';

export type StickyAppBannerOS = 'ios' | 'android' | 'unknown';

export interface StickyAppBannerEnvironment {
  os: StickyAppBannerOS;
  inApp: boolean;
}

export const getBannerEnvironment = (
  userAgent: string,
  maxTouchPoints = 0,
): StickyAppBannerEnvironment => {
  const os = /android/i.test(userAgent)
    ? 'android'
    : /iphone|ipad|ipod/i.test(userAgent) ||
        // iPadOS 13+ 는 Mac UA 로 보고하므로 터치 지원 여부로 보정
        (/macintosh/i.test(userAgent) && maxTouchPoints > 1)
      ? 'ios'
      : 'unknown';

  return {
    os,
    inApp: /kakaotalk|instagram|FBAN|FBAV|NAVER|Line\//i.test(userAgent),
  };
};

export const getHiddenUntil = (value: string | null, now: number) => {
  const expiry = Number(value);
  return Number.isFinite(expiry) &&
    expiry > now &&
    expiry <= now + STICKY_APP_BANNER_HIDE_DURATION
    ? expiry
    : 0;
};

export const getMarketLink = (
  os: Exclude<StickyAppBannerOS, 'unknown'>,
  inApp: boolean,
) => {
  if (os === 'ios') return APP_STORE_URL;
  if (!inApp) return GOOGLE_PLAY_URL;
  return (
    `intent://details?id=${ANDROID_PACKAGE_NAME}#Intent;scheme=market;` +
    'package=com.android.vending;S.browser_fallback_url=' +
    encodeURIComponent(GOOGLE_PLAY_URL) +
    ';end'
  );
};
