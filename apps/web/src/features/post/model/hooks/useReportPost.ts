import { ReportReason } from '@/features';

export const useReportPost = (postId: string | number) => {
  const submitReport = async (reason: ReportReason) => {
    console.log('Post 신고 API 호출', postId, reason);
    // TODO: await api.reportPost(postId, reason);
  };

  return { submitReport };
};
