export type FeedSearchPost = {
  id: string;
  author: string;
  createdAt: string;
  avatarUrl?: string;
  content: string;
  isHtml: boolean;
  likeCount: number;
  commentCount: number;
};
