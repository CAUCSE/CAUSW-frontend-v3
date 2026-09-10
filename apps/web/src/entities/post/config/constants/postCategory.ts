import { type ValueOf } from '@/shared/lib';

export const POST_CATEGORY = {
  RECRUIT: 'RECRUIT',
  ACADEMIC: 'ACADEMIC',
  EVENT_LECTURE: 'EVENT_LECTURE',
  EXTERNAL_ACTIVITY: 'EXTERNAL_ACTIVITY',
  RESEARCH: 'RESEARCH',
  ETC: 'ETC',
} as const;

export type PostCategory = ValueOf<typeof POST_CATEGORY>;

export const POST_CATEGORY_LABEL: Record<PostCategory, string> = {
  RECRUIT: '채용',
  ACADEMIC: '학사',
  EVENT_LECTURE: '행사·특강',
  EXTERNAL_ACTIVITY: '대외활동',
  RESEARCH: '연구',
  ETC: '기타',
};

export const POST_CATEGORY_FILTER_LIST: PostCategory[] = [
  POST_CATEGORY.RECRUIT,
  POST_CATEGORY.ACADEMIC,
  POST_CATEGORY.EVENT_LECTURE,
  POST_CATEGORY.EXTERNAL_ACTIVITY,
  POST_CATEGORY.RESEARCH,
];
