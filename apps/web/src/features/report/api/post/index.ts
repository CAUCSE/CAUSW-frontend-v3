import {
  type ReportCommentResponseDto,
  type ReportCommentRequestDto,
  type ReportPostRequestDto,
  type ReportPostResponseDto,
  type ReportChildCommentRequestDto,
  type ReportChildCommentResponseDto,
} from '@/entities/report';

import { API } from '@/shared/api';

export const reportPost = async ({
  postId,
  reportReason,
}: ReportPostRequestDto): Promise<ReportPostResponseDto> => {
  const data = await API.post<ReportPostResponseDto>(
    `/api/v2/reports/posts/${postId}`,
    { reportReason },
  );
  return data;
};

export const reportComment = async ({
  commentId,
  reportReason,
}: ReportCommentRequestDto): Promise<ReportCommentResponseDto> => {
  const data = await API.post<ReportCommentResponseDto>(
    `/api/v2/reports/comments/${commentId}`,
    { reportReason },
  );
  return data;
};

export const reportReply = async ({
  childCommentId,
  reportReason,
}: ReportChildCommentRequestDto): Promise<ReportChildCommentResponseDto> => {
  const data = await API.post<ReportChildCommentResponseDto>(
    `/api/v2/reports/child-comments/${childCommentId}`,
    { reportReason },
  );
  return data;
};
