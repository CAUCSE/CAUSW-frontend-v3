import { API } from '@/shared/api';

import { type GetPostResponseDto } from '../../model';

export const getPost = async (postId: string): Promise<GetPostResponseDto> => {
  const data = await API.get<GetPostResponseDto>(`/api/v2/posts/${postId}`);
  return data;
};
