import { type ValueOf } from '@/shared/lib';

export const FEED_VIEW_MODE = {
  COMPACT: 'compact',
  CARD: 'card',
} as const;

export type FeedViewMode = ValueOf<typeof FEED_VIEW_MODE>;

export const FEED_VIEW_MODE_LABEL: Record<FeedViewMode, string> = {
  [FEED_VIEW_MODE.COMPACT]: '축약형',
  [FEED_VIEW_MODE.CARD]: '카드형',
};
