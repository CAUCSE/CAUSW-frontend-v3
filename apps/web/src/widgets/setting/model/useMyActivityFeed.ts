import { useSuspenseQueries } from '@tanstack/react-query';

import {
  ActivityMode,
  ActivityType,
  getMyActivityFeed,
} from '@/entities/setting';

const ACTIVITY_TABS: ActivityType[] = ['my-posts', 'my-comments', 'favorites'];

export const useMyActivityFeeds = (mode: ActivityMode) => {
  const results = useSuspenseQueries({
    queries: ACTIVITY_TABS.map((activityType) => ({
      queryKey: ['setting', 'activity-feed', activityType, mode],
      queryFn: () => getMyActivityFeed(activityType, mode),
    })),
  });

  return {
    'my-posts': results[0].data,
    'my-comments': results[1].data,
    favorites: results[2].data,
  };
};
