import { type ValueOf } from '@/shared/lib';

// TODO: 백엔드에 크롤링 채널 구분 필드/API가 추가되면 목업 대신 실제 데이터로 교체
export const CRAWLED_CHANNEL = {
  ALL: 'all',
  SW_STUDENT_COUNCIL: 'sw-student-council',
  SW_DEPARTMENT: 'sw-department',
  CCSSAA: 'ccssaa',
  SW_EDUCATION_CENTER: 'sw-education-center',
  CAU_NOTICE: 'cau-notice',
} as const;

export type CrawledChannel = ValueOf<typeof CRAWLED_CHANNEL>;

export const CRAWLED_CHANNEL_LABEL: Record<CrawledChannel, string> = {
  [CRAWLED_CHANNEL.ALL]: '전체',
  [CRAWLED_CHANNEL.SW_STUDENT_COUNCIL]: '소프트웨어학부 학생회',
  [CRAWLED_CHANNEL.SW_DEPARTMENT]: '소프트웨어학부',
  [CRAWLED_CHANNEL.CCSSAA]: '크자회',
  [CRAWLED_CHANNEL.SW_EDUCATION_CENTER]: 'SW 교육원',
  [CRAWLED_CHANNEL.CAU_NOTICE]: '중앙대학교 공지',
};

// 드롭다운 트리거(닫힌 상태)에서만 '전체'를 '채널 전체'로 표시
export const CRAWLED_CHANNEL_TRIGGER_LABEL: Record<CrawledChannel, string> = {
  ...CRAWLED_CHANNEL_LABEL,
  [CRAWLED_CHANNEL.ALL]: '채널 전체',
};

export const CRAWLED_CHANNEL_OPTIONS: CrawledChannel[] = [
  CRAWLED_CHANNEL.ALL,
  CRAWLED_CHANNEL.SW_STUDENT_COUNCIL,
  CRAWLED_CHANNEL.SW_DEPARTMENT,
  CRAWLED_CHANNEL.CCSSAA,
  CRAWLED_CHANNEL.SW_EDUCATION_CENTER,
  CRAWLED_CHANNEL.CAU_NOTICE,
];
