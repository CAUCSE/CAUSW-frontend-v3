'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GetCommentsResponseDto } from '@/entities/comment';
import { commentKeys } from '@/entities/comment/config';

import { toast } from '@/shared/model';

import { likeComment, unlikeComment } from '../../api';

export const useToggleCommentLikeMutation = (
  postId: string,
  commentId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isCommentLike: boolean) =>
      isCommentLike ? likeComment(commentId) : unlikeComment(commentId),

    onMutate: async (isCommentLike: boolean) => {
      await queryClient.cancelQueries({
        queryKey: commentKeys.list(postId, 0),
      });

      const previous = queryClient.getQueryData<GetCommentsResponseDto>(
        commentKeys.list(postId, 0),
      );

      queryClient.setQueryData(
        commentKeys.list(postId, 0),
        (old: GetCommentsResponseDto | undefined) => {
          if (!old) return old;

          const updatedContent = old.content.map((comment) => {
            // 좋아요를 누른 대상이 댓글일 때
            if (comment.id === commentId) {
              return {
                ...comment,
                isCommentLike,
                numLike: Math.max(
                  0,
                  comment.numLike + (isCommentLike ? 1 : -1),
                ),
              };
            }

            // 좋아요를 누른 대상이 이 부모 댓글의 대댓글일 때
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
                        isChildCommentLike: isCommentLike,
                        numLike: Math.max(
                          0,
                          child.numLike + (isCommentLike ? 1 : -1),
                        ),
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

      return { previous };
    },

    onError: (_err, _variables, context) => {
      toast.error('댓글 좋아요 처리에 실패했어요.');
      if (context?.previous) {
        queryClient.setQueryData(commentKeys.list(postId, 0), context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId, 0) });
    },
  });
};
