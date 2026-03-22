'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GetCommentsResponseDto } from '@/entities/comment';
import { commentKeys } from '@/entities/comment/config';
import { postKeys } from '@/entities/post';

import { toast } from '@/shared/model';

import { deleteComment } from '../../api';

export const useDeleteCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),

    onMutate: async (commentId: string) => {
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
            if (comment.id === commentId) {
              return {
                ...comment,
                isDeleted: true,
              };
            }

            const isTargetInChild = comment.childCommentList.some(
              (child) => child.id === commentId,
            );

            if (isTargetInChild) {
              return {
                ...comment,
                childCommentList: comment.childCommentList.map((child) =>
                  child.id === commentId
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

    onError: (_err, _commentId, context) => {
      toast.error('댓글 삭제에 실패했어요.');

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
