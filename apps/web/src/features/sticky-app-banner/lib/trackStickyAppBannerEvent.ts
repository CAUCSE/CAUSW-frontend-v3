'use client';

import {
  trackGoogleAnalyticsEvent,
  trackMixpanelEvent,
  type StickyBannerEventName,
} from '@/shared/lib/analytics';

interface StickyAppBannerEventContext {
  os: string;
  inApp: boolean;
  store?: string;
}

export const trackStickyAppBannerEvent = (
  eventName: StickyBannerEventName,
  { os, inApp, store }: StickyAppBannerEventContext,
) => {
  const properties = {
    os,
    is_in_app: inApp,
    page_path: window.location.pathname,
    ...(store ? { store } : {}),
  };

  try {
    trackGoogleAnalyticsEvent(eventName, properties);
  } catch {
    /* unavailable */
  }
  try {
    trackMixpanelEvent({ name: eventName, properties });
  } catch {
    /* unavailable */
  }
};
