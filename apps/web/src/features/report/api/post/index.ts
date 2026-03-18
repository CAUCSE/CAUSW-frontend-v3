import { ReportPostRequestDto, ReportPostResponseDto } from '@/entities/report';

import { API } from '@/shared/api';

export const reportPost = async ({
  postId,
  reportReason,
}: ReportPostRequestDto): Promise<ReportPostResponseDto> => {
  const data = await API.post<ReportPostResponseDto>(
    `/api/v2/posts/${postId}/reports`,
    { reportReason },
  );
  return data;
};
