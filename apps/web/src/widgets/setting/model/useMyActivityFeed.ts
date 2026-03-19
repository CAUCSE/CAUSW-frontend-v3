import { useInfiniteQuery } from '@tanstack/react-query';

import {
  ActivityMode,
  ActivityType,
  EMPTY_ACTIVITY_MESSAGE,
  getMyActivityFeed,
} from '@/entities/setting';

import { QUERY_STALE_TIME } from '@/shared/constants';

export const useMyActivityFeed = (
  activityType: ActivityType,
  mode: ActivityMode,
) => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ['setting', 'activity-feed', activityType],
    queryFn: ({ pageParam }) => getMyActivityFeed(activityType, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: mode !== 'empty',
    staleTime: QUERY_STALE_TIME.NONE,
  });

  return {
    ...query,
    emptyMessage: EMPTY_ACTIVITY_MESSAGE[activityType],
  };
};
