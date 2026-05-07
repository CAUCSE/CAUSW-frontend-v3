export const ROUTES = Object.freeze({
  NOTIFICATION: '/notification',
  LOCKER: '/locker',
  HOME: '/home',
  SCHEDULE: '/home/calendar',
  CEREMONY: '/ceremony',
  FEED: '/feed',
  REGISTER_FEED: '/feed/write',
  ALUMNI_CONTACTS: '/alumni-contacts',
  PROFILE: '/profile',
  SETTING: '/setting',
} as const);

export const EXTERNAL_ROUTES = Object.freeze({
  CAU_MEETINGROOM: 'https://cse.cau.ac.kr/sub05/sub0504_cal.php',
  CAU_CAFETERIA: 'https://mportal.cau.ac.kr/main.do',
} as const);
