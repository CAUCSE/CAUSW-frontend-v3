import {
  type PostCreateRequestDto,
  type PostCreateResponseDto,
} from '@/entities/post';

import { API } from '@/shared/api';

/* 게시글 작성 */
export const createPost = (
  request: PostCreateRequestDto,
  imageFiles?: File[],
) => {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify(request)], {
      type: 'application/json',
    }),
  );

  imageFiles?.forEach((file) => {
    formData.append('images', file);
  });

  const data = API.post<PostCreateResponseDto>(`/api/v2/posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/* 게시글 좋아요 */
export const likePost = async (postId: string): Promise<void> => {
  await API.post(`/api/v2/posts/${postId}/like`);
};
