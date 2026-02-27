export const SETTING_PROFILE_IDENTITY = {
  name: '이름',
  primaryInfo: '이메일',
  secondaryInfo: '이메일',
} as const;

export const SETTING_OVERVIEW_TITLES = {
  account: '계정',
  support: '고객지원',
} as const;

export const SETTING_NOTIFICATIONS = {
  title: '알림 설정',
  community: {
    title: '커뮤니티 알림',
    items: [
      '내 글에 좋아요',
      '내 글에 댓글',
      '내 글에 대댓글',
      '내 글에 대댓글',
    ],
  },
  official: {
    title: '공식계정 글 알림',
    items: ['학생회', '소프트웨어학부', '딜리버드', '크자회'],
  },
  notice: {
    title: '공지',
    items: ['서비스 공지, 계정 상태'],
  },
  event: {
    title: '경조사 알림',
    items: ['경조사 알림 받기'],
  },
} as const;
