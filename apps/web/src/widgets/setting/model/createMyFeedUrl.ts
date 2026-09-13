import { type ActivityType } from '@/entities/setting';

import { ROUTES } from '@/shared/constants';

export const createMyFeedUrl = (view: ActivityType) => {
  return `${ROUTES.MY_FEED}?view=${view}`;
};
