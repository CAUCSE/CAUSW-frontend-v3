'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentKeys, type GetCommentsResponseDto } from '@/entities/comment';
import { postKeys } from '@/entities/post';

import { toast } from '@/shared/model';

import { deleteReply } from '../../api';

export const useDeleteReplyMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyId: string) => deleteReply(replyId),

    onMutate: async (replyId: string) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.post(postId) });

      const previousComments =
        queryClient.getQueriesData<GetCommentsResponseDto>({
          queryKey: commentKeys.post(postId),
        });

      queryClient.setQueriesData<GetCommentsResponseDto>(
        { queryKey: commentKeys.post(postId) },
        (old) => {
          if (!old) return old;

          const updatedContent = old.content.map((comment) => {
            const isTargetInChild = comment.childCommentList.some(
              (child) => child.id === replyId,
            );

            if (isTargetInChild) {
              return {
                ...comment,
                childCommentList: comment.childCommentList.map((child) =>
                  child.id === replyId
                    ? {
                        ...child,
                        isDeleted: true,
                      }
                    : child,
                ),
              };
            }

            return comment;
          });

          return {
            ...old,
            content: updatedContent,
          };
        },
      );

      return { previousComments };
    },

    onError: (_err, _replyId, context) => {
      toast.error('답글 삭제에 실패했어요.');

      if (context?.previousComments) {
        context.previousComments.forEach(([queryKey, oldData]) => {
          if (oldData) {
            queryClient.setQueryData(queryKey, oldData);
          }
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.post(postId),
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(postId),
      });
    },
  });
};
