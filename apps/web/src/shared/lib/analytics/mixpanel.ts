'use client';

import mixpanel from 'mixpanel-browser';

import { ENVIRONMENT, MIXPANEL_TOKEN } from '@/shared/config';

export type MixpanelAuthMethod = 'email' | 'kakao' | 'google' | 'apple';
export type MixpanelAcademicStatus = 'enrolled' | 'graduated';
export type MixpanelOnboardingViewEventName =
  | 'auth_method_viewed'
  | 'profile_info_viewed'
  | 'academic_verification_viewed';

const ONBOARDING_USER_ID_KEY = 'mixpanel_onboarding_user_id';
const UNIDENTIFIED_ONBOARDING_USER = 'unidentified';

type MixpanelEvent =
  | { name: 'app_opened'; properties?: never }
  | {
      name:
        | MixpanelOnboardingViewEventName
        | 'onboarding_started'
        | 'email_verification_completed'
        | 'profile_info_completed';
      properties?: never;
    }
  | {
      name: 'auth_method_selected';
      properties: { auth_method: MixpanelAuthMethod };
    }
  | {
      name: 'academic_verification_submitted';
      properties: { requested_academic_status: MixpanelAcademicStatus };
    }
  | {
      name: 'home_reached';
      properties: { academic_status: MixpanelAcademicStatus };
    }
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
  mixpanel.track(name, properties);
};

const normalizeAcademicStatus = (
  academicStatus: 'ENROLLED' | 'GRADUATED',
): MixpanelAcademicStatus =>
  academicStatus === 'GRADUATED' ? 'graduated' : 'enrolled';

const markOnboardingInProgress = () => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(
    ONBOARDING_USER_ID_KEY,
    identifiedUserId ?? UNIDENTIFIED_ONBOARDING_USER,
  );
};

const attachIdentifiedUserToOnboarding = (userId: string) => {
  if (typeof window === 'undefined') return;
  if (
    localStorage.getItem(ONBOARDING_USER_ID_KEY) !==
    UNIDENTIFIED_ONBOARDING_USER
  ) {
    return;
  }

  localStorage.setItem(ONBOARDING_USER_ID_KEY, userId);
};

const clearOnboardingProgress = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(ONBOARDING_USER_ID_KEY);
};

export const trackMixpanelEvent = (event: MixpanelEvent) => {
  if (!ensureInitialized()) return;
  sendEvent(event);
};

export const registerMixpanelAuthMethod = (authMethod: MixpanelAuthMethod) => {
  if (!ensureInitialized()) return;
  mixpanel.register({ auth_method: authMethod });
};

export const selectMixpanelAuthMethod = (authMethod: MixpanelAuthMethod) => {
  if (!ensureInitialized()) return;

  mixpanel.register({ auth_method: authMethod });
  sendEvent({
    name: 'auth_method_selected',
    properties: { auth_method: authMethod },
  });
};

export const clearMixpanelAuthMethod = () => {
  if (!ensureInitialized()) return;
  mixpanel.unregister('auth_method');
};

export const startMixpanelOnboarding = () => {
  if (!ensureInitialized()) return;

  markOnboardingInProgress();
  sendEvent({ name: 'onboarding_started' });
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
};

export const attachMixpanelOnboardingUser = (userId: string) => {
  if (!ensureInitialized() || !userId) return;
  attachIdentifiedUserToOnboarding(userId);
};

export const syncMixpanelAcademicStatus = (
  academicStatus: 'ENROLLED' | 'GRADUATED',
) => {
  if (!ensureInitialized() || !identifiedUserId) return;

  const normalizedStatus = normalizeAcademicStatus(academicStatus);
  mixpanel.register({ academic_status: normalizedStatus });
  mixpanel.people.set({ academic_status: normalizedStatus });
};

export const trackMixpanelAcademicVerificationSubmitted = (
  academicStatus: 'ENROLLED' | 'GRADUATED',
) => {
  if (!ensureInitialized()) return;

  markOnboardingInProgress();
  sendEvent({
    name: 'academic_verification_submitted',
    properties: {
      requested_academic_status: normalizeAcademicStatus(academicStatus),
    },
  });
};

export const trackMixpanelHomeReached = ({
  userId,
  academicStatus,
}: {
  userId: string;
  academicStatus: 'ENROLLED' | 'GRADUATED';
}) => {
  if (!ensureInitialized() || !userId) return;

  identifyMixpanelUser(userId);
  syncMixpanelAcademicStatus(academicStatus);

  const onboardingUserId = localStorage.getItem(ONBOARDING_USER_ID_KEY);
  if (onboardingUserId !== userId) return;

  sendEvent({
    name: 'home_reached',
    properties: {
      academic_status: normalizeAcademicStatus(academicStatus),
    },
  });
  clearOnboardingProgress();
  clearMixpanelAuthMethod();
};

export const resetMixpanelUser = () => {
  identifiedUserId = null;
  appOpenedTracked = false;
  if (initialized) mixpanel.reset();
};
