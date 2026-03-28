'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type GetCommentsResponseDto } from '@/entities/comment';
import { commentKeys } from '@/entities/comment/config';

import { toast } from '@/shared/model';

import { likeReply, unlikeReply } from '../../api';

export const useToggleReplyLikeMutation = (postId: string, replyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isChildLike: boolean) => {
      return isChildLike ? likeReply(replyId) : unlikeReply(replyId);
    },

    onMutate: async (isChildLike: boolean) => {
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
            const hasTargetChild = comment.childCommentList.some(
              (child) => child.id === replyId,
            );

            if (hasTargetChild) {
              return {
                ...comment,
                childCommentList: comment.childCommentList.map((child) =>
                  child.id === replyId
                    ? {
                        ...child,
                        isChildCommentLike: isChildLike,
                        numLike: Math.max(
                          0,
                          child.numLike + (isChildLike ? 1 : -1),
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
      toast.error('대댓글 좋아요 처리에 실패했어요.');
      if (context?.previous) {
        queryClient.setQueryData(commentKeys.list(postId, 0), context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId, 0) });
    },
  });
};
