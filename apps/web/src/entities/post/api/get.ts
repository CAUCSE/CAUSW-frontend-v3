import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import { POST_API_PREFIX } from '../config';
import {
  type GetPostsQuery,
  type GetPostResponseDto,
  type GetPostsResponseDto,
  type GetMyPostsQuery,
  type GetMyPostsResponseDto,
  type GetMyFavoritePostsQuery,
  type GetMyFavoritePostsResponseDto,
  type GetMyCommentedPostsQuery,
  type GetMyCommentedPostsResponseDto,
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

export const getMyPosts = async (query: GetMyPostsQuery, cursor?: string) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  if (cursor) {
    searchParams.append('cursor', cursor);
  }

  const url = withQuery(`${POST_API_PREFIX}/me`, searchParams.toString());
  const data = await API.get<GetMyPostsResponseDto>(url);
  return data;
};

export const getMyCommentedPosts = async (
  query: GetMyCommentedPostsQuery,
  cursor?: string,
) => {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  if (cursor) {
    searchParams.append('cursor', cursor);
  }

  const url = withQuery(
    `${POST_API_PREFIX}/me/commented`,
    searchParams.toString(),
  );

  const data = await API.get<GetMyCommentedPostsResponseDto>(url);
  return data;
};

export const getMyFavoritePosts = async (
  query: GetMyFavoritePostsQuery,
  cursor?: string,
) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  if (cursor) {
    searchParams.append('cursor', cursor);
  }

  const url = withQuery(`${POST_API_PREFIX}/me/liked`, searchParams.toString());

  const data = await API.get<GetMyFavoritePostsResponseDto>(url);
  return data;
};
