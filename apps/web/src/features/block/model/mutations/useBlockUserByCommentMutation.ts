'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentKeys } from '@/entities/comment';

import { toast } from '@/shared/model';

import { blockUserByComment } from '../../api';

export const useBlockUserByCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => blockUserByComment(commentId),

    onSuccess: () => {
      toast.success('작성자를 차단했어요.');
      queryClient.invalidateQueries({
        queryKey: commentKeys.post(postId),
      });
    },

    onError: () => {
      toast.error('작성자 차단에 실패했어요.');
    },
  });
};
