export type ActivityType = 'my-posts' | 'my-comments' | 'favorites';
export type ActivityMode = 'list' | 'empty';

export type MyActivityPostItem = {
  postId: string;
  boardId: string;
  authorName: string;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
  avatarUrl?: string;
  images?: string[];
  isOfficial?: boolean;
  isAnonymous?: boolean;
  boardName?: string;
};

export type MyActivityFeedPage = {
  posts: MyActivityPostItem[];
  nextCursor: string | null;
};
