'use client';

import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { type GetPostResponseDto, postKeys } from '@/entities/post';
import {
  type MyActivityFeedResponseDto,
  settingQueryKey,
} from '@/entities/setting';

import { toast } from '@/shared/model';

import { likePost, unlikePost } from '../../api';

type MyActivityFeedInfiniteData = InfiniteData<
  Omit<MyActivityFeedResponseDto, 'posts'> & {
    posts: Array<
      MyActivityFeedResponseDto['posts'][number] & {
        isLiked?: boolean;
      }
    >;
  },
  string | undefined
>;

const updateLikeInActivityFeed = (
  data: MyActivityFeedInfiniteData | undefined,
  postId: string,
  nextLiked: boolean,
): MyActivityFeedInfiniteData | undefined => {
  if (!data) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      posts: page.posts.map((post) => {
        if (post.postId !== postId) {
          return post;
        }

        const previousLiked = post.isLiked ?? false;
        const likeDelta = Number(nextLiked) - Number(previousLiked);

        return {
          ...post,
          isLiked: nextLiked,
          numLike: Math.max(0, post.numLike + likeDelta),
        };
      }),
    })),
  };
};

export const useTogglePostLikeMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isPostLike: boolean) => {
      return isPostLike ? likePost(postId) : unlikePost(postId);
    },

    onMutate: async (isPostLike: boolean) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: postKeys.detail(postId) }),
        queryClient.cancelQueries({ queryKey: settingQueryKey.all }),
      ]);

      const previousPost = queryClient.getQueryData<GetPostResponseDto>(
        postKeys.detail(postId),
      );
      const previousActivityFeeds =
        queryClient.getQueriesData<MyActivityFeedInfiniteData>({
          queryKey: settingQueryKey.all,
        });

      queryClient.setQueryData(
        postKeys.detail(postId),
        (old: GetPostResponseDto | undefined) => {
          if (!old) return old;

          return {
            ...old,
            isPostLike,
            numLike: Math.max(0, old.numLike + (isPostLike ? 1 : -1)),
          };
        },
      );

      queryClient.setQueriesData<MyActivityFeedInfiniteData>(
        { queryKey: settingQueryKey.all },
        (data) => updateLikeInActivityFeed(data, postId, isPostLike),
      );

      return { previousPost, previousActivityFeeds };
    },

    onError: (_err, _variables, context) => {
      toast.error('좋아요 처리에 실패했어요.');

      if (context?.previousPost) {
        queryClient.setQueryData(postKeys.detail(postId), context.previousPost);
      }

      context?.previousActivityFeeds.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: settingQueryKey.all });
    },
  });
};
