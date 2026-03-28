import {
  type ActivityMode,
  type ActivityType,
  EMPTY_ACTIVITY_MESSAGE,
  type MyActivityFeed,
} from '../model';

import { MOCK_ACTIVITY_POSTS } from './mock-data';

export const getMyActivityFeed = async (
  activityType: ActivityType,
  mode: ActivityMode,
): Promise<MyActivityFeed> => {
  await new Promise((resolve) => setTimeout(resolve, 120));

  return {
    emptyMessage: EMPTY_ACTIVITY_MESSAGE[activityType],
    posts: mode === 'empty' ? [] : MOCK_ACTIVITY_POSTS,
  };
};
