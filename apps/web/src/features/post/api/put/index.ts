import {
  type PostUpdateRequestDto,
  type PostUpdateResponseDto,
} from '@/entities/post';

import { API } from '@/shared/api';

/* 게시글 수정 */
export const updatePost = (
  postId: string,
  request: PostUpdateRequestDto,
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

  const data = API.put<PostUpdateResponseDto>(
    `/api/v2/posts/${postId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};
