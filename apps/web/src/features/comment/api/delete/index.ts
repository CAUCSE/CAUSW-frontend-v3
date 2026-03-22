import { API } from '@/shared/api';

export const deleteComment = async (commentId: string): Promise<void> => {
  await API.delete(`/api/v2/comments/${commentId}`);
};

export const deleteReply = async (replyId: string): Promise<void> => {
  await API.delete(`/api/v2/child-comments/${replyId}`);
};

export const unlikeComment = async (commentId: string): Promise<void> => {
  await API.delete(`/api/v2/comments/${commentId}/like`);
};

export const unlikeReply = async (replyId: string): Promise<void> => {
  await API.delete(`/api/v2/child-comments/${replyId}/like`);
};
