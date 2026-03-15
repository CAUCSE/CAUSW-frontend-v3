import { API } from '@/shared/api';

import { GetPostResponse } from '../../model';

export const getPost = async (postId: string): Promise<GetPostResponse> => {
  const data = await API.get<GetPostResponse>(`/api/v2/posts/${postId}`);
  return data;
};
