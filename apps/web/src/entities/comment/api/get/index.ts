import { API } from '@/shared/api';

import { GetCommentsRequestDto, GetCommentsResponseDto } from '../../model';

export const getComments = async ({
  postId,
  pageNum,
}: GetCommentsRequestDto) => {
  const data = await API.get<GetCommentsResponseDto>(
    `/api/v2/comments?postId=${postId}${
      pageNum !== undefined ? `&pageNum=${pageNum}` : ''
    }`,
  );
  return data;
};
