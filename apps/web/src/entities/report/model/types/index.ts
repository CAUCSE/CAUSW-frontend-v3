import { REPORT_REASON } from '../../config';

/* 신고 사유 */
export type ReportReason = (typeof REPORT_REASON)[keyof typeof REPORT_REASON];

/* 게시글 신고 */
export interface ReportPostRequestDto {
  postId: string;
  reportReason: ReportReason;
}

export interface ReportPostResponseDto {
  reportId: string;
  postId: string;
  reportReason: ReportReason;
  createdAt: string;
}
