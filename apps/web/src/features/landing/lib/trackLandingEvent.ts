'use client';

type LandingEventName = 'landing_store_click' | 'landing_website_click';

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: LandingEventName,
      eventParameters: Record<string, string>,
    ) => void;
  }
}

export const trackLandingEvent = (
  eventName: LandingEventName,
  eventParameters: Record<string, string>,
) => {
  window.gtag?.('event', eventName, eventParameters);
};
