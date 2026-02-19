import { toast } from '@causw/cds';

import { ReportReason } from '@/features';

export const useReportComment = (commentId: string | number) => {
  // TODO: react query 사용

  const submitReport = async (reason: ReportReason) => {
    console.log('Comment 신고 API 호출', commentId, reason);
    toast.success('신고가 접수되었어요');
  };

  return { submitReport };
};
