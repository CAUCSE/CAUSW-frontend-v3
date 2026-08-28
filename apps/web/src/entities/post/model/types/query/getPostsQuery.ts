import { type Board, type BoardGroup } from '@/entities/feed';

export interface GetPostsQuery {
  boardIds: Board['id'][];
  boardGroup?: BoardGroup;
  cursor?: string;
  size?: number;
  keyword?: string;
}
