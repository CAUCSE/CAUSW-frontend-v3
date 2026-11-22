'use client';

import mixpanel from 'mixpanel-browser';

import { ENVIRONMENT, MIXPANEL_TOKEN } from '@/shared/config';

export type StickyBannerEventName =
  | 'view_sticky_banner'
  | 'click_sticky_banner_cta'
  | 'click_sticky_banner_close';

type MixpanelEvent =
  | {
      name: StickyBannerEventName;
      properties: Record<string, string | boolean>;
    }
  | { name: 'app_opened'; properties?: never }
  | {
      name: 'feed_viewed' | 'community_viewed';
      properties: { view_mode: 'compact' | 'feed' };
    }
  | {
      name: 'contact_clicked';
      properties: { section_name: 'my' | 'coffeechat' | 'all' };
    }
  | { name: 'contact_profile_coffeechat'; properties?: never }
  | {
      name: 'feed_news_changed';
      properties: { option_group: 'channel'; is_enabled: boolean };
    };

let initialized = false;
let identifiedUserId: string | null = null;
let appOpenedTracked = false;
const pendingEvents: MixpanelEvent[] = [];

const ensureInitialized = () => {
  if (typeof window === 'undefined' || !MIXPANEL_TOKEN) return false;
  if (initialized) return true;

  mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: false,
    track_pageview: false,
    persistence: 'localStorage',
    debug: ENVIRONMENT !== 'production',
  });
  initialized = true;
  return true;
};

const sendEvent = ({ name, properties }: MixpanelEvent) => {
  if (name === 'click_sticky_banner_cta') {
    mixpanel.track(name, properties, {
      transport: 'sendBeacon',
      send_immediately: true,
    });
  } else {
    mixpanel.track(name, properties);
  }
};

/** Track only after identify, so a fast page render cannot create anonymous events. */
export const trackMixpanelEvent = (event: MixpanelEvent) => {
  if (!ensureInitialized()) return;
  if (!identifiedUserId) {
    pendingEvents.push(event);
    return;
  }
  sendEvent(event);
};

export const identifyMixpanelUser = (userId: string) => {
  if (!ensureInitialized() || !userId) return;
  if (identifiedUserId !== userId) {
    mixpanel.identify(userId);
    identifiedUserId = userId;
  }

  if (!appOpenedTracked) {
    appOpenedTracked = true;
    sendEvent({ name: 'app_opened' });
  }

  pendingEvents.splice(0).forEach(sendEvent);
};

export const resetMixpanelUser = () => {
  pendingEvents.length = 0;
  identifiedUserId = null;
  appOpenedTracked = false;
  if (initialized) mixpanel.reset();
};
