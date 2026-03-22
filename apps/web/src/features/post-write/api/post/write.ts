import { PostCreateRequestDto, PostCreateResponseDto } from '@/entities/post';

import { API } from '@/shared/api';

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
