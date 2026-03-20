import type { GetPostsItemResponseDto } from '@/entities/post';

import { HTML_TAG_PATTERN } from '@/shared/constants';

export type FeedSearchPost = {
  id: string;
  author: string;
  createdAt: string;
  avatarUrl?: string;
  content: string;
  likeCount: number;
  commentCount: number;
};

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
const HTML_ENTITY_PATTERN = /&[a-zA-Z0-9#]+;/g;
const HTML_TAG_REPLACE_PATTERN = new RegExp(HTML_TAG_PATTERN.source, 'gi');

const decodeHtmlEntity = (value: string) =>
  value
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");

export const getPostPreviewText = (content: string, fallbackText: string) => {
  const withoutTags = content.replace(HTML_TAG_REPLACE_PATTERN, ' ');
  const normalized = withoutTags
    .replace(HTML_ENTITY_PATTERN, decodeHtmlEntity)
    .replace(/\s+/g, ' ')
    .trim();

  return normalized || fallbackText;
};

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
  fallbackText: string,
): FeedSearchPost => ({
  id: post.postId,
  author: post.writerNickname,
  createdAt: post.createdAt,
  avatarUrl: post.writerProfileImageUrl ?? undefined,
  content: getPostPreviewText(post.content, fallbackText),
  likeCount: post.numLike,
  commentCount: post.numComment,
});
