'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostChildCommentRequestDto } from '@/entities/comment';
import { commentKeys } from '@/entities/comment/config';

import { toast } from '@/shared/model';

import { createReply } from '../../api';

interface CreateReplyVariables extends PostChildCommentRequestDto {
  postId: string;
}

export const usePostReplyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId: _postId, ...body }: CreateReplyVariables) =>
      createReply(body),

    onSuccess: (_, variables) => {
      toast.success('답글이 작성되었어요.');

      queryClient.invalidateQueries({
        queryKey: commentKeys.post(variables.postId),
      });
    },

    onError: () => {
      toast.error('답글 작성에 실패했어요.');
    },
  });
};
