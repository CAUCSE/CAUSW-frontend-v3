import { ActivityType } from '@/entities/setting';

export const parseTabFromPath = (pathname: string): ActivityType => {
  if (pathname.includes('/setting/my-comments')) return 'my-comments';
  if (pathname.includes('/setting/favorites')) return 'favorites';
  return 'my-posts';
};

export const buildPath = (tab: ActivityType) => {
  switch (tab) {
    case 'my-comments':
      return '/setting/my-comments';
    case 'favorites':
      return '/setting/favorites';
    default:
      return '/setting/my-posts';
  }
};
