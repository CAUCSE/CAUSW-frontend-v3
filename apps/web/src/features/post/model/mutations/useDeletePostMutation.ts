'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BOARD_GROUP, type BoardGroup } from '@/entities/board';
import {
  postQueryKeys,
  type GetPostResponseDto,
  type GetPostsResponseDto,
} from '@/entities/post';

import { ROUTES } from '@/shared/constants';
import { toast } from '@/shared/model';

import { deletePost } from '../../api';

interface DeletePostVariables {
  postId: string;
  boardGroup: BoardGroup;
}

export const useDeletePostMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: DeletePostVariables) => deletePost(postId),

    onMutate: async ({ postId }: DeletePostVariables) => {
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

    onError: (_error, { postId }, context) => {
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

    onSuccess: (_data, { postId, boardGroup }) => {
      toast.success('게시글이 삭제되었어요.');

      const current = window.location.pathname;

      if (current.includes(postId)) {
        router.replace(
          boardGroup === BOARD_GROUP.COMMUNITY ? ROUTES.COMMUNITY : ROUTES.FEED,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });
    },
  });
};
