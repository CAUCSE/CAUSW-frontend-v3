'use client';

import { type ChangeEvent, useDeferredValue, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useInfiniteQuery } from '@tanstack/react-query';

import { mergeStyles } from '@causw/cds';

import { postQueryOptions } from '@/entities/post';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { useBreakpoint, useFetchNextOnScroll } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';

import { FeedSearchEmptyState } from './ui/FeedSearchEmptyState';
import { FeedSearchInput } from './ui/FeedSearchInput';
import { FeedSearchLoadingState } from './ui/FeedSearchLoadingState';
import { RecentSearchesSection } from './ui/RecentSearchesSection';
import { SearchResultsSection } from './ui/SearchResultsSection';

import {
  createRecentSearches,
  formatEmptyResultMessage,
  loadRecentSearches,
  mapPostToCard,
  saveRecentSearches,
  updateSearchParam,
} from '@/_pages/feed/feed-page.helpers';

const COPY = {
  back: '뒤로',
  searchPlaceholder: '글 제목, 내용을 검색해보세요.',
  recentSearches: '최근 검색어',
  clearAll: '전체 삭제',
  noRecentSearches: '최근 검색한 내용이 없어요.',
  noSearchResult: '에 관한\n첫 게시글을 작성해보세요.',
  writePost: '글 쓰러 가기',
  removeSuffix: '삭제',
  loading: '검색 결과를 불러오는 중...',
  htmlOnlyPost: '이미지가 포함된 게시글입니다.',
} as const;

export const FeedPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isMobileSize, isTabletSize } = useBreakpoint();
  const searchKeyword = searchParams.get('q') ?? '';

  const [keyword, setKeyword] = useState(searchKeyword);
  const [recentSearches, setRecentSearches] =
    useState<string[]>(loadRecentSearches);

  const deferredKeyword = useDeferredValue(keyword);
  const trimmedDeferredKeyword = deferredKeyword.trim();
  const hasKeyword = trimmedDeferredKeyword.length > 0;

  useEffect(() => {
    setKeyword(searchKeyword);
  }, [searchKeyword]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      ...postQueryOptions.list({
        keyword: trimmedDeferredKeyword,
        size: 20,
      }),
      enabled: hasKeyword,
      staleTime: QUERY_STALE_TIME.NONE,
      select: (queryData) =>
        queryData.pages
          .flatMap((page) => page.posts)
          .map((post) => mapPostToCard(post, COPY.htmlOnlyPost)),
    });

  const { targetRef } = useFetchNextOnScroll({
    fetchNextPage: () => {
      if (!isFetchingNextPage) {
        fetchNextPage();
      }
    },
    hasNextPage: Boolean(hasNextPage),
  });

  const feedPosts = data ?? [];

  const commitRecentSearch = (nextKeyword: string) => {
    const nextRecentSearches = createRecentSearches(
      nextKeyword,
      recentSearches,
    );

    setRecentSearches(nextRecentSearches);
    saveRecentSearches(nextRecentSearches);
  };

  const handleSearchParamUpdate = (nextKeyword: string) => {
    updateSearchParam({
      keyword: nextKeyword,
      pathname,
      router,
      searchParams,
    });
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextKeyword = event.target.value;

    setKeyword(nextKeyword);
    handleSearchParamUpdate(nextKeyword);
  };

  const handleClearKeyword = () => {
    setKeyword('');
    handleSearchParamUpdate('');
  };

  const handleSubmit = () => {
    commitRecentSearch(keyword);
  };

  const handleRecentSearchClick = (recentKeyword: string) => {
    setKeyword(recentKeyword);
    handleSearchParamUpdate(recentKeyword);
    commitRecentSearch(recentKeyword);
  };

  const handleRecentSearchRemove = (recentKeyword: string) => {
    const nextRecentSearches = recentSearches.filter(
      (item) => item !== recentKeyword,
    );

    setRecentSearches(nextRecentSearches);
    saveRecentSearches(nextRecentSearches);
  };

  const handleRecentSearchClear = () => {
    setRecentSearches([]);
    saveRecentSearches([]);
  };

  const handlePostClick = (postId: string) => {
    commitRecentSearch(keyword);
    router.push(`/feed/${postId}`);
  };

  const handleWritePostClick = () => {
    commitRecentSearch(keyword);
    router.push('/feed/write');
  };

  const contentWidthClassName = isMobileSize
    ? 'w-full'
    : isTabletSize
      ? 'w-full max-w-[540px]'
      : 'w-full max-w-[900px]';

  const renderContent = () => {
    if (!hasKeyword) {
      if (recentSearches.length > 0) {
        return (
          <RecentSearchesSection
            recentSearches={recentSearches}
            clearAllLabel={COPY.clearAll}
            title={COPY.recentSearches}
            removeSuffix={COPY.removeSuffix}
            onClearAll={handleRecentSearchClear}
            onClickItem={handleRecentSearchClick}
            onRemoveItem={handleRecentSearchRemove}
          />
        );
      }

      return (
        <FeedSearchEmptyState
          message={COPY.noRecentSearches}
          variant="recent"
        />
      );
    }

    if (isLoading) {
      return <FeedSearchLoadingState message={COPY.loading} />;
    }

    if (feedPosts.length > 0) {
      return (
        <SearchResultsSection
          posts={feedPosts}
          hasNextPage={Boolean(hasNextPage)}
          isFetchingNextPage={isFetchingNextPage}
          loadingMessage={COPY.loading}
          targetRef={targetRef}
          onPostClick={handlePostClick}
        />
      );
    }

    return (
      <FeedSearchEmptyState
        message={formatEmptyResultMessage(
          trimmedDeferredKeyword,
          COPY.noSearchResult,
        )}
        writePostLabel={COPY.writePost}
        variant="search"
        onWritePost={handleWritePostClick}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className={mergeStyles(
          'tablet:px-8 tablet:pt-6 mx-auto px-4 pt-[47px] pb-8',
          contentWidthClassName,
        )}
      >
        <ActionHeader isSticky={false}>
          <ActionHeader.BackButton>{COPY.back}</ActionHeader.BackButton>
          <div />
        </ActionHeader>

        <div className="tablet:mt-0 mt-3">
          <FeedSearchInput
            keyword={keyword}
            placeholder={COPY.searchPlaceholder}
            onChange={handleKeywordChange}
            onClear={handleClearKeyword}
            onSubmit={handleSubmit}
          />
        </div>

        {renderContent()}
      </div>
    </div>
  );
};
