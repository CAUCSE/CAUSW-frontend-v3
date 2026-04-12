'use client';

import { useMutation } from '@tanstack/react-query';

import { toast } from '@/shared/model';

import { reportPost } from '../../api/post';

export const useReportPostMutation = () => {
  return useMutation({
    mutationFn: reportPost,

    onSuccess: () => {
      toast.success('신고가 접수되었어요');
    },

    onError: () => {
      toast.error('게시글 신고에 실패했어요.');
    },
  });
};
