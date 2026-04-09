import type { FeedSearchPost } from '@/widgets/feed/model';

import type { GetPostsItemResponseDto } from '@/entities/post';

type UpdateSearchParamParams = {
  keyword: string;
  pathname: string;
  router: {
    replace: (href: string, options?: { scroll?: boolean }) => void;
  };
  searchParams: {
    toString: () => string;
  };
};

const FEED_RECENT_SEARCHES_KEY = 'feed-recent-searches';

export const saveRecentSearches = (keywords: string[]) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(
    FEED_RECENT_SEARCHES_KEY,
    JSON.stringify(keywords),
  );
};

export const loadRecentSearches = () => {
  if (typeof window === 'undefined') return [];

  const saved = window.localStorage.getItem(FEED_RECENT_SEARCHES_KEY);

  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (keyword): keyword is string => typeof keyword === 'string',
    );
  } catch {
    return [];
  }
};

export const updateSearchParam = ({
  keyword,
  pathname,
  router,
  searchParams,
}: UpdateSearchParamParams) => {
  const params = new URLSearchParams(searchParams.toString());
  const trimmedKeyword = keyword.trim();

  if (trimmedKeyword.length === 0) {
    params.delete('q');
  } else {
    params.set('q', trimmedKeyword);
  }

  const queryString = params.toString();
  const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

  router.replace(nextUrl, { scroll: false });
};

export const createRecentSearches = (
  keyword: string,
  recentSearches: string[],
) => {
  const trimmedKeyword = keyword.trim();

  if (!trimmedKeyword) return recentSearches;

  return [
    trimmedKeyword,
    ...recentSearches.filter((item) => item !== trimmedKeyword),
  ].slice(0, 8);
};

export const formatEmptyResultMessage = (keyword: string, template: string) =>
  template.replace('%s', keyword);

export const mapPostToCard = (
  post: GetPostsItemResponseDto,
): FeedSearchPost => ({
  id: post.postId,
  author: post.writerNickname,
  createdAt: post.createdAt,
  avatarUrl: post.writerProfileImageUrl ?? undefined,
  content: post.content,
  isHtml: post.isCrawled,
  likeCount: post.numLike,
  commentCount: post.numComment,
});
