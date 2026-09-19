'use client';

import mixpanel from 'mixpanel-browser';

import { MIXPANEL_TOKEN } from '@/shared/config/env/mixpanel';

type MixpanelEvent =
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
    debug: process.env.NODE_ENV !== 'production',
  });
  initialized = true;
  return true;
};

const sendEvent = ({ name, properties }: MixpanelEvent) => {
  mixpanel.track(name, properties);
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
  if (initialized) mixpanel.reset();
};
