import { type BlockUserResponseDto } from '@/entities/block';

import { API } from '@/shared/api';

export const blockUserByPost = async (
  postId: string,
): Promise<BlockUserResponseDto> => {
  const data = await API.post<BlockUserResponseDto>(
    `/api/v2/blocks/by-post/${postId}`,
  );
  return data;
};
