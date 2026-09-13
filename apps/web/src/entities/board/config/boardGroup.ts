import { type ValueOf } from '@/shared/lib';

export const BOARD_GROUP = {
  NOTICE: 'NOTICE', // 소식
  COMMUNITY: 'COMMUNITY', // 소통 (동문수첩)
} as const;

export type BoardGroup = ValueOf<typeof BOARD_GROUP>;
