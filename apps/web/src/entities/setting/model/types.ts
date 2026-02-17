export type ActivityType = 'my-posts' | 'my-comments' | 'favorites';
export type ActivityMode = 'list' | 'empty';

export type ActivityPost = {
  id: number;
  author: string;
  timeAgo: string;
  content: string;
  likeCount: number;
  commentCount: number;
  imageCount?: number;
};

export type MyActivityFeed = {
  emptyMessage: string;
  posts: ActivityPost[];
};
