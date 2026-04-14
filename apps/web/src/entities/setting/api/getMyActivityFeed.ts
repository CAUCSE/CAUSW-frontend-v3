import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import { MY_ACTIVITY_PAGE_SIZE, MY_ACTIVITY_PATH } from '../config';
import type { ActivityType, MyActivityFeedResponseDto } from '../model';

export const getMyActivityFeed = async (
  activityType: ActivityType,
  cursor?: string,
): Promise<MyActivityFeedResponseDto> => {
  const query = new URLSearchParams();

  if (cursor) {
    query.set('cursor', cursor);
  }

  query.set('size', MY_ACTIVITY_PAGE_SIZE.toString());

  const url = withQuery(MY_ACTIVITY_PATH[activityType], query.toString());
  return API.get<MyActivityFeedResponseDto>(url);
};
