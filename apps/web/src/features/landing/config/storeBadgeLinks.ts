import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/shared/constants';

export const STORE_BADGE_LINKS = [
  {
    id: 'app_store',
    href: APP_STORE_URL,
    src: '/images/landing/store/app-store.svg',
    alt: 'App Store에서 다운로드',
  },
  {
    id: 'google_play',
    href: GOOGLE_PLAY_URL,
    src: '/images/landing/store/play-store.svg',
    alt: 'Google Play에서 다운로드',
  },
] as const;
