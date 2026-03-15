import { API } from '@/shared/api';

export const deletePost = async (postId: string): Promise<void> => {
  await API.delete(`/api/v2/posts/${postId}`);
};
