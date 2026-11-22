'use client';

import { trackGoogleAnalyticsEvent } from '@/shared/lib/analytics';

type LandingEventName = 'landing_store_click' | 'landing_website_click';

export const trackLandingEvent = (
  eventName: LandingEventName,
  eventParameters: Record<string, string>,
) => {
  trackGoogleAnalyticsEvent(eventName, eventParameters);
};
