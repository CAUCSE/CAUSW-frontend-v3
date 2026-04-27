import { API } from '@/shared/api';

import { POST_API_PREFIX } from '../config';
import { type GetPostResponseDto } from '../model';

export const getPost = async (postId: string): Promise<GetPostResponseDto> => {
  const data = await API.get<GetPostResponseDto>(
    `${POST_API_PREFIX}/${postId}`,
  );
  return data;
};
