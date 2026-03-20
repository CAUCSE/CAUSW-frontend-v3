import { useInfiniteQuery } from '@tanstack/react-query';

import {
  ActivityMode,
  ActivityType,
  EMPTY_ACTIVITY_MESSAGE,
  getMyActivityFeed,
  MyActivityFeedPage,
} from '@/entities/setting';

import { QUERY_STALE_TIME } from '@/shared/constants';

export const useMyActivityFeed = (
  activityType: ActivityType,
  mode: ActivityMode,
) => {
  const query = useInfiniteQuery<
    MyActivityFeedPage,
    Error,
    { pages: MyActivityFeedPage[]; pageParams: Array<string | undefined> },
    [string, string, ActivityType],
    string | undefined
  >({
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
