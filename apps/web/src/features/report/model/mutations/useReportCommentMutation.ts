'use client';

import { useMutation } from '@tanstack/react-query';

import { toast } from '@/shared/model';

import { reportComment } from '../../api/post';

export const useReportCommentMutation = () => {
  return useMutation({
    mutationFn: reportComment,

    onSuccess: () => {
      toast.success('신고가 접수되었어요');
    },

    onError: () => {
      toast.error('댓글 신고에 실패했어요.');
    },
  });
};
