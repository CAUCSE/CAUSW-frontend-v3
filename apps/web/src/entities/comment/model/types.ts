export type ReplyTarget = {
  id: number;
  author: string;
  content: string;
} | null;

export type Comment = {
  id: number;
  author: string;
  content: string;
  time: string;
  isAuthor: boolean;
  replies: Comment[];
};
