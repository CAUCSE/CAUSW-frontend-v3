import { API } from '@/shared/api';

import { GetPostRequestDto, GetPostResponseDto } from '../../model';

export const getPost = async (
  postId: GetPostRequestDto,
): Promise<GetPostResponseDto> => {
  const data = await API.get<GetPostResponseDto>(`/api/v2/posts/${postId}`);
  return data;
};
