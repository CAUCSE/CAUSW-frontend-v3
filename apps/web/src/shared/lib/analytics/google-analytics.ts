'use client';

import { GA_MEASUREMENT_ID } from '@/shared/config';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: 'event',
      eventName: string,
      parameters: Record<string, string | number | boolean>,
    ) => void;
  }
}

export function trackGoogleAnalyticsEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean>,
) {
  if (!GA_MEASUREMENT_ID) return;
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
    return;
  }
  // Preserve impressions before the afterInteractive GA script finishes loading.
  window.dataLayer ??= [];
  function enqueue(..._args: unknown[]) {
    // GA's command queue uses the same Arguments objects as its official snippet.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  enqueue('event', eventName, parameters);
}
