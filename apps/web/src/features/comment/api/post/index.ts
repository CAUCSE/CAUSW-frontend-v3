import {
  PostChildCommentRequestDto,
  PostChildCommentResponseDto,
  PostCommentRequestDto,
  PostCommentResponseDto,
} from '@/entities/comment';

import { API } from '@/shared/api';

export const createComment = async (
  request: PostCommentRequestDto,
): Promise<PostCommentResponseDto> => {
  const data = await API.post<PostCommentResponseDto>(
    `/api/v2/comments`,
    request,
  );
  return data;
};

export const createReply = async (
  request: PostChildCommentRequestDto,
): Promise<PostChildCommentResponseDto> => {
  const data = await API.post<PostChildCommentResponseDto>(
    `/api/v2/child-comments`,
    request,
  );
  return data;
};

export const likeComment = async (commentId: string): Promise<void> => {
  await API.post(`/api/v2/comments/${commentId}/like`);
};

export const likeReply = async (replyId: string): Promise<void> => {
  await API.post(`/api/v2/child-comments/${replyId}/like`);
};
