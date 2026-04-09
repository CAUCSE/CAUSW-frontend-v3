'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { mapPostToCard } from '@/widgets/feed';

import { postQueryOptions } from '@/entities/post';

import { QUERY_STALE_TIME } from '@/shared/constants';

type UseFeedSearchPostsParams = {
  keyword: string;
};

export const useFeedSearchPosts = ({ keyword }: UseFeedSearchPostsParams) => {
  const hasKeyword = keyword.length > 0;

  const query = useInfiniteQuery({
    ...postQueryOptions.list({
      keyword,
      size: 20,
    }),
    enabled: hasKeyword,
    staleTime: QUERY_STALE_TIME.NONE,
    select: (queryData) =>
      queryData.pages.flatMap((page) => page.posts).map(mapPostToCard),
  });

  return {
    ...query,
    posts: query.data ?? [],
    hasKeyword,
  };
};
