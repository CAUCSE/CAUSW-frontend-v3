import type { ActivityType } from '../model';

export const settingQueryKey = {
  all: ['setting'] as const,
  activityFeed: (activityType: ActivityType) =>
    [...settingQueryKey.all, 'activity-feed', activityType] as const,
};
