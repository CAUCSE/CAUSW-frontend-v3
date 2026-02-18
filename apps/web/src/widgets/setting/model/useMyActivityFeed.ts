import { useSuspenseQueries } from '@tanstack/react-query';

import { ActivityMode, getMyActivityFeed } from '@/entities/setting';

import { ACTIVITY_TAB_KEYS } from './tabs';

export const useMyActivityFeeds = (mode: ActivityMode) => {
  const results = useSuspenseQueries({
    queries: ACTIVITY_TAB_KEYS.map((activityType) => ({
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
