import { type ActivityType } from '@/entities/setting';

export const toActivityTab = (view?: string): ActivityType => {
  if (view === 'my-comments' || view === 'comments') return 'my-comments';
  if (view === 'favorites') return 'favorites';
  return 'my-posts';
};

export const buildMyFeedHref = (tab: ActivityType, mode: 'list' | 'empty') => {
  const params = new URLSearchParams();
  params.set('view', tab);

  if (mode === 'empty') {
    params.set('mode', 'empty');
  }

  return `/setting/my-feed?${params.toString()}`;
};
