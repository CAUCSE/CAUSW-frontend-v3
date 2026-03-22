import { PostUpdateRequestDto, PostUpdateResponseDto } from '@/entities/post';

import { API } from '@/shared/api';

export const updatePost = (
  postId: string,
  postUpdateRequest: PostUpdateRequestDto,
  attachImageList?: File[],
) => {
  const formData = new FormData();

  formData.append(
    'postUpdateRequest',
    new Blob([JSON.stringify(postUpdateRequest)], {
      type: 'application/json',
    }),
  );

  if (attachImageList && attachImageList.length > 0) {
    attachImageList.forEach((file) => {
      formData.append('attachImageList', file);
    });
  }

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
