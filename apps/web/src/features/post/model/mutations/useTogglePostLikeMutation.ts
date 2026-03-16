'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GetPostResponseDto, postKeys } from '@/entities/post';

import { toast } from '@/shared/model';

import { likePost, unlikePost } from '../../api';

export const useTogglePostLikeMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isPostLike: boolean) => {
      return isPostLike ? likePost(postId) : unlikePost(postId);
    },

    onMutate: async (isPostLike: boolean) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });

      const previous = queryClient.getQueryData<GetPostResponseDto>(
        postKeys.detail(postId),
      );

      queryClient.setQueryData(
        postKeys.detail(postId),
        (old: GetPostResponseDto | undefined) => {
          if (!old) return old;

          return {
            ...old,
            isPostLike: isPostLike,
            numLike: Math.max(0, old.numLike + (isPostLike ? 1 : -1)),
          };
        },
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      toast.error('좋아요 처리에 실패했어요.');
      if (context?.previous) {
        queryClient.setQueryData(postKeys.detail(postId), context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
};
