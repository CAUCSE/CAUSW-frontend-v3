import { API } from '@/shared/api';

import { POST_API_PREFIX } from '../config';
import { type GetPostsQuery, type GetPostResponseDto } from '../model';

export const getPost = async (postId: string): Promise<GetPostResponseDto> => {
  const data = await API.get<GetPostResponseDto>(
    `${POST_API_PREFIX}/${postId}`,
  );
  return data;
};

export const getPosts = async (query: GetPostsQuery) => {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });
  // const url = withQuery(POST_API_PREFIX, searchParams.toString());
};
