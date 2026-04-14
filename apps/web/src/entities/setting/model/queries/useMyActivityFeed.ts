'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getMyActivityFeed } from '../../api';
import { settingQueryKey } from '../../config';
import { EMPTY_ACTIVITY_MESSAGE } from '../messages';
import type {
  ActivityMode,
  ActivityType,
  MyActivityFeedPage,
  MyActivityFeedResponseDto,
  MyActivityPostItemDto,
} from '../types';

type MyActivityFeedQueryData = {
  pages: MyActivityFeedResponseDto[];
  pageParams: Array<string | undefined>;
};

type MyActivityFeedSelectData = {
  pages: MyActivityFeedPage[];
  pageParams: Array<string | undefined>;
};

const toMyActivityPostItem = (
  post: MyActivityPostItemDto,
  activityType: ActivityType,
) => ({
  postId: post.postId,
  authorName: post.isAnonymous ? '익명' : post.writerNickname,
  createdAt: post.createdAt,
  content: post.content,
  likeCount: post.numLike,
  commentCount: post.numComment,
  isLiked: post.isLiked ?? activityType === 'favorites',
  avatarUrl: post.isAnonymous
    ? undefined
    : (post.writerProfileImageUrl ?? undefined),
  images: post.postImageUrls,
  isAnonymous: post.isAnonymous,
  boardId: post.boardId,
  boardName: post.boardName,
});

const selectMyActivityFeed =
  (activityType: ActivityType) =>
  (data: MyActivityFeedQueryData): MyActivityFeedSelectData => ({
    pages: data.pages.map((page) => ({
      posts: page.posts.map((post) => toMyActivityPostItem(post, activityType)),
      nextCursor: page.nextCursor,
    })),
    pageParams: data.pageParams,
  });

export const useMyActivityFeed = (
  activityType: ActivityType,
  mode: ActivityMode,
) => {
  const query = useInfiniteQuery<
    MyActivityFeedResponseDto,
    Error,
    MyActivityFeedSelectData,
    ReturnType<typeof settingQueryKey.activityFeed>,
    string | undefined
  >({
    queryKey: settingQueryKey.activityFeed(activityType),
    queryFn: ({ pageParam }) => getMyActivityFeed(activityType, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: mode !== 'empty',
    staleTime: QUERY_STALE_TIME.NONE,
    select: selectMyActivityFeed(activityType),
  });

  return {
    ...query,
    emptyMessage: EMPTY_ACTIVITY_MESSAGE[activityType],
  };
};
