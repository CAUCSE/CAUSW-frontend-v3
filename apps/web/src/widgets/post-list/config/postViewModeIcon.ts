import {
  ListOutlineThree,
  ListOutlineTwo,
  type MonoIconComponent,
} from '@causw/cds';

import { POST_VIEW_MODE, type PostViewMode } from '@/entities/post';

export const POST_VIEW_MODE_ICON: Record<PostViewMode, MonoIconComponent> = {
  [POST_VIEW_MODE.COMPACT]: ListOutlineThree,
  [POST_VIEW_MODE.CARD]: ListOutlineTwo,
};
