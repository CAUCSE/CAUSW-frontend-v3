'use client';

import { useMutation } from '@tanstack/react-query';

import { toast } from '@/shared/model';

import { reportReply } from '../../api/post';

export const useReportReplyMutation = () => {
  return useMutation({
    mutationFn: reportReply,

    onSuccess: () => {
      toast.success('신고가 접수되었어요');
    },

    onError: () => {
      toast.error('답글 신고에 실패했어요.');
    },
  });
};
