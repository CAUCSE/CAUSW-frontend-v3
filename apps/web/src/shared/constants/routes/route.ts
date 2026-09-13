import { ADMIN_BASE_URL } from '@/shared/config';

export const ROUTES = Object.freeze({
  /** 홈 */
  HOME: '/home',
  SCHEDULE: '/home/calendar',
  LOCKER: '/locker',
  CEREMONY: '/ceremony',
  NOTIFICATION: '/notification',
  /** 소식 */
  FEED: '/feed',
  REGISTER_FEED: '/feed/write',
  FEED_SEARCH: '/feed/search',
  /** 동문수첩 */
  ALUMNI_CONTACTS: '/alumni-contacts',
  /** 소통 */
  COMMUNITY: '/community',
  REGISTER_COMMUNITY: '/community/write',
  COMMUNITY_SEARCH: '/community/search',
  /** 설정 */
  SETTING: '/setting',
  PROFILE: '/profile',
  MY_FEED: '/my-feed',
  SYSTEM_NOTICES: '/system-notices',
} as const);

export const ADMIN_ROUTES = Object.freeze({
  EVENTS: (id: string) => `${ADMIN_BASE_URL}/events/${id}`, // 관리자 경조사 페이지
  PENDING_USERS: `${ADMIN_BASE_URL}/users/pending`, // 재학인증 요청 대기 목록
} as const);

export const EXTERNAL_ROUTES = Object.freeze({
  CAU_MEETINGROOM: 'https://cse.cau.ac.kr/sub05/sub0504_cal.php',
  CAU_CAFETERIA: 'https://mportal.cau.ac.kr/main.do',
  ALUMNI_CONTACTS_COFFEE_CHAT_FORM:
    'https://docs.google.com/forms/d/e/1FAIpQLSekWfrPfsouO4kUpsIH5dbJQL9MuUHqSsckONUQghrSwo8nOQ/viewform',
} as const);
