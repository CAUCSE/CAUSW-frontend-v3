import { PostCardItem } from '@/entities/post';

export type ActivityType = 'my-posts' | 'my-comments' | 'favorites';
export type ActivityMode = 'list' | 'empty';

export type MyActivityFeed = {
  emptyMessage: string;
  posts: PostCardItem[];
};
