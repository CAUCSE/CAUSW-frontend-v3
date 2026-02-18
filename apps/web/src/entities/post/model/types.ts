export type PostCardItem = {
  id: number;
  author: string;
  timeAgo: string;
  content: string;
  likeCount: number;
  commentCount: number;
  imageCount?: number;
};
