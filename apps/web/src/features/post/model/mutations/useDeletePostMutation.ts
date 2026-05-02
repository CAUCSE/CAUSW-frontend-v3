'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  postQueryKeys,
  type GetPostResponseDto,
  type GetPostsResponseDto,
} from '@/entities/post';

import { toast } from '@/shared/model';

import { deletePost } from '../../api';

export const useDeletePostMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({
        queryKey: postQueryKeys.detail(postId),
      });
      await queryClient.cancelQueries({ queryKey: postQueryKeys.all });

      const previousDetail = queryClient.getQueryData<GetPostResponseDto>(
        postQueryKeys.detail(postId),
      );

      const previousLists = queryClient.getQueriesData({
        queryKey: postQueryKeys.all,
      });

      queryClient.setQueryData<GetPostResponseDto>(
        postQueryKeys.detail(postId),
        (old) => {
          if (!old) return old;
          return { ...old, isDeleted: true };
        },
      );

      queryClient.setQueriesData({ queryKey: postQueryKeys.all }, (old) => {
        if (!old || typeof old !== 'object' || !('pages' in old)) return old;

        const data = old as {
          pages: GetPostsResponseDto[];
          pageParams: unknown[];
        };

        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            posts: page.posts.filter((post) => post.postId !== postId),
          })),
        };
      });

      return { previousDetail, previousLists };
    },

    onError: (_error, postId, context) => {
      toast.error('게시글 삭제에 실패했어요.');

      if (context?.previousDetail) {
        queryClient.setQueryData(
          postQueryKeys.detail(postId),
          context.previousDetail,
        );
      }

      if (context?.previousLists) {
        context?.previousLists?.forEach(([queryKey, oldData]) => {
          if (oldData !== undefined) {
            queryClient.setQueryData(queryKey, oldData);
          }
        });
      }
    },

    onSuccess: (_data, postId) => {
      toast.success('게시글이 삭제되었어요.');

      const current = window.location.pathname;

      if (current.includes(postId)) {
        router.replace('/feed');
      }
    },

    onSettled: (_data, _error, postId) => {
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.detail(postId),
      });
    },
  });
};
