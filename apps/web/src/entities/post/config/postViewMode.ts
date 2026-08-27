import { type ValueOf } from '@/shared/lib';

export const POST_VIEW_MODE = {
  COMPACT: 'compact',
  CARD: 'card',
} as const;

export type PostViewMode = ValueOf<typeof POST_VIEW_MODE>;

export const POST_VIEW_MODE_LABEL: Record<PostViewMode, string> = {
  [POST_VIEW_MODE.COMPACT]: '축약형',
  [POST_VIEW_MODE.CARD]: '카드형',
};

export const POST_VIEW_MODE_OPTIONS = Object.values(POST_VIEW_MODE);
