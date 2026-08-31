import { type Board, type BoardGroup } from '@/entities/board';

export interface GetPostsQuery {
  boardIds: Board['id'][];
  boardGroup?: BoardGroup;
  cursor?: string;
  size?: number;
  keyword?: string;
}
