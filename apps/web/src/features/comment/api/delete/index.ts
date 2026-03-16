import { API } from '@/shared/api';

export const unlikeComment = async (commentId: string): Promise<void> => {
  await API.delete(`/api/v2/comments/${commentId}/like`);
};

export const unlikeReply = async (replyId: string): Promise<void> => {
  await API.delete(`/api/v2/child-comments/${replyId}/like`);
};
