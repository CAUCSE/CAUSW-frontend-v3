import { ReportReason } from '@/features';

export const useReportComment = (commentId: string | number) => {
  const submitReport = async (reason: ReportReason) => {
    console.log('Comment 신고 API 호출', commentId, reason);
    // TODO: await api.reportComment(commentId, reason);
  };

  return { submitReport };
};
