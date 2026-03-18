import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import type {
  GetPostDetailResponseDto,
  GetPostsCondition,
  GetPostsResponseDto,
} from '../../model';

const POSTS_API_PREFIX = '/api/v2/posts';

export const getPosts = async (
  condition: GetPostsCondition,
): Promise<GetPostsResponseDto> => {
  const queryString = new URLSearchParams();

  condition.boardIds?.forEach((boardId) => {
    queryString.append('boardIds', boardId);
  });

  if (condition.cursor) {
    queryString.set('cursor', condition.cursor);
  }

  if (condition.size) {
    queryString.set('size', String(condition.size));
  }

  if (condition.keyword?.trim()) {
    queryString.set('keyword', condition.keyword.trim());
  }

  const url = withQuery(POSTS_API_PREFIX, queryString.toString());

  return API.get<GetPostsResponseDto>(url);
};

export const getPost = async (
  postId: string,
): Promise<GetPostDetailResponseDto> => {
  return API.get<GetPostDetailResponseDto>(`${POSTS_API_PREFIX}/${postId}`);
};
