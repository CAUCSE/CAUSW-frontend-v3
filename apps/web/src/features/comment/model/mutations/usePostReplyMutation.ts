'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  commentKeys,
  type PostChildCommentRequestDto,
} from '@/entities/comment';

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
      queryClient.invalidateQueries({
        queryKey: commentKeys.post(variables.postId),
      });
    },

    onError: () => {
      toast.error('답글 작성에 실패했어요.');
    },
  });
};
