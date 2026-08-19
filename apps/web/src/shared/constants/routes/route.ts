import { ADMIN_BASE_URL } from '@/shared/config';

export const ROUTES = Object.freeze({
  NOTIFICATION: '/notification',
  LOCKER: '/locker',
  HOME: '/home',
  SCHEDULE: '/home/calendar',
  CEREMONY: '/ceremony',
  FEED: '/feed',
  REGISTER_FEED: '/feed/write',
  ALUMNI_CONTACTS: '/alumni-contacts',
  COMMUNITY: '/community',
  PROFILE: '/profile',
  SETTING: '/setting',
  MY_FEED: '/my-feed',
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
