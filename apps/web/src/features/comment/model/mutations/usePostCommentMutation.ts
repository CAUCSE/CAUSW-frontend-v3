'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentKeys } from '@/entities/comment';

import { toast } from '@/shared/model';

import { createComment } from '../../api';

export const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.post(variables.postId),
      });
    },

    onError: () => {
      toast.error('댓글 작성에 실패했어요.');
    },
  });
};
