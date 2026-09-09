import {
  ListOutlineThree,
  ListOutlineTwo,
  type MonoIconComponent,
} from '@causw/cds';

import { FEED_VIEW_MODE, type FeedViewMode } from '@/entities/feed';

export const FEED_VIEW_MODE_ICON: Record<FeedViewMode, MonoIconComponent> = {
  [FEED_VIEW_MODE.COMPACT]: ListOutlineThree,
  [FEED_VIEW_MODE.CARD]: ListOutlineTwo,
};
