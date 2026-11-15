'use client';

import { useEffect, useRef } from 'react';

import {
  clearMixpanelAuthMethod,
  trackMixpanelEvent,
  type MixpanelOnboardingViewEventName,
} from './mixpanel';

export const useTrackMixpanelView = (
  eventName: MixpanelOnboardingViewEventName,
  enabled = true,
) => {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!enabled || trackedRef.current) return;

    trackedRef.current = true;
    if (eventName === 'auth_method_viewed') {
      clearMixpanelAuthMethod();
    }
    trackMixpanelEvent({ name: eventName });
  }, [enabled, eventName]);
};
