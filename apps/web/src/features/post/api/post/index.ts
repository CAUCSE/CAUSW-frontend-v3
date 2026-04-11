import {
  type PostCreateRequestDto,
  type PostCreateResponseDto,
} from '@/entities/post';

import { API } from '@/shared/api';

/* 게시글 작성 */
export const createPost = (
  postCreateRequest: PostCreateRequestDto,
  attachImageList?: File[],
) => {
  const formData = new FormData();

  formData.append(
    'postCreateRequest',
    new Blob([JSON.stringify(postCreateRequest)], {
      type: 'application/json',
    }),
  );

  if (attachImageList && attachImageList.length > 0) {
    attachImageList.forEach((file) => {
      formData.append('attachImageList', file);
    });
  }

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
