import type { ActivityType } from '../model';

export const MY_ACTIVITY_PATH: Record<ActivityType, string> = {
  'my-posts': '/api/v2/posts/me',
  'my-comments': '/api/v2/posts/me/commented',
  favorites: '/api/v2/posts/me/liked',
};

export const MY_ACTIVITY_PAGE_SIZE = 10;
