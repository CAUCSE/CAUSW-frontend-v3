'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentKeys } from '@/entities/comment/config';

import { toast } from '@/shared/model';

import { createComment } from '../../api';

export const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  // TODO: 댓글 등록 optimistic update
  return useMutation({
    mutationFn: createComment,

    onSuccess: (_, variables) => {
      toast.success('댓글이 작성되었어요.');

      queryClient.invalidateQueries({
        queryKey: commentKeys.post(variables.postId),
      });
    },

    onError: () => {
      toast.error('댓글 작성에 실패했어요.');
    },
  });
};
