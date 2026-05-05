import { type Board } from '@/entities/feed';

export interface GetPostsQuery {
  boardIds: Board['id'][];
  cursor?: string;
  size?: number;
  keyword?: string;
}
