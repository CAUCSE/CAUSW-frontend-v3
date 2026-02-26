export const ROUTES = Object.freeze({
  NOTIFICATION: '/notification',
  LOCKER: '/locker',
  SCHEDULE: '/home/calendar',
  CEREMONY: '/ceremony',
} as const);

export const EXTERNAL_ROUTES = Object.freeze({
  CAU_MEETINGROOM: 'https://cse.cau.ac.kr/sub05/sub0504_cal.php',
  CAU_CAFETERIA: 'https://mportal.cau.ac.kr/main.do',
} as const);
