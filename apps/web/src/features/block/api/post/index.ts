import { type BlockUserResponseDto } from '@/entities/block';

import { API } from '@/shared/api';

export const blockUserByPost = async (
  postId: string,
): Promise<BlockUserResponseDto> => {
  const data = await API.post<BlockUserResponseDto>(
    `/api/v2/posts/${postId}/blocks`,
  );
  return data;
};

export const blockUserByComment = async (
  commentId: string,
): Promise<BlockUserResponseDto> => {
  const data = await API.post<BlockUserResponseDto>(
    `/api/v2/comments/${commentId}/blocks`,
  );
  return data;
};

export const blockUserByReply = async (
  childCommentId: string,
): Promise<BlockUserResponseDto> => {
  const data = await API.post<BlockUserResponseDto>(
    `/api/v2/child-comments/${childCommentId}/blocks`,
  );
  return data;
};
