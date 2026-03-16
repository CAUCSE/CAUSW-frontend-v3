import { API } from '@/shared/api';

export const likePost = async (postId: string): Promise<void> => {
  await API.post(`/api/v2/posts/${postId}/like`);
};
