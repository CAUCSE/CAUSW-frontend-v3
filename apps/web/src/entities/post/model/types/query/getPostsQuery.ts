import { type Board, type BoardGroup } from '@/entities/board';

import { type PostCategory } from '../../../config';

export interface GetPostsQuery {
  boardIds: Board['id'][];
  boardGroup?: BoardGroup;
  category?: PostCategory;
  cursor?: string;
  size?: number;
  keyword?: string;
}
