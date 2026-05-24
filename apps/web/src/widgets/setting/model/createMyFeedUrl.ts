import { type ActivityType } from '@/entities/setting';

const MY_FEED_PATH = '/setting/my-feed';

export const createMyFeedUrl = (view: ActivityType) => {
  return `${MY_FEED_PATH}?view=${view}`;
};
