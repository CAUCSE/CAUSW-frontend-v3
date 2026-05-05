import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import { POST_API_PREFIX } from '../config';
import {
  type GetPostsQuery,
  type GetPostResponseDto,
  type GetPostsResponseDto,
} from '../model';

export const getPost = async (postId: string): Promise<GetPostResponseDto> => {
  const data = await API.get<GetPostResponseDto>(
    `${POST_API_PREFIX}/${postId}`,
  );
  return data;
};

export const getPosts = async (query: GetPostsQuery, cursor?: string) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  if (cursor) {
    searchParams.append('cursor', cursor);
  }

  const url = withQuery(POST_API_PREFIX, searchParams.toString());

  const data = await API.get<GetPostsResponseDto>(url);
  return data;
};
