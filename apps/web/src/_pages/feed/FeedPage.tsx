'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { mergeStyles } from '@causw/cds';

import {
  createRecentSearches,
  FeedSearchContent,
  FeedSearchInput,
  formatEmptyResultMessage,
  loadRecentSearches,
  saveRecentSearches,
  updateSearchParam,
} from '@/widgets/feed';

import { useDebounce, useFetchNextOnScroll } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';

import { useFeedSearchPosts } from '@/_pages/feed/useFeedSearchPosts';

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
} as const;

export const FeedPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('q') ?? '';

  const [keyword, setKeyword] = useState(searchKeyword);
  const [recentSearches, setRecentSearches] =
    useState<string[]>(loadRecentSearches);

  const debouncedKeyword = useDebounce(keyword, 300);
  const trimmedDebouncedKeyword = debouncedKeyword.trim();

  useEffect(() => {
    setKeyword(searchKeyword);
  }, [searchKeyword]);

  const {
    posts: feedPosts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    hasKeyword,
  } = useFeedSearchPosts({
    keyword: trimmedDebouncedKeyword,
  });

  const { targetRef } = useFetchNextOnScroll({
    fetchNextPage: () => {
      if (!isFetchingNextPage) {
        fetchNextPage();
      }
    },
    hasNextPage: Boolean(hasNextPage),
  });

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

  const searchContentProps = !hasKeyword
    ? recentSearches.length > 0
      ? {
          state: 'recent-searches' as const,
          recentSearches,
          recentSearchTitle: COPY.recentSearches,
          clearAllLabel: COPY.clearAll,
          removeSuffix: COPY.removeSuffix,
          onClearAllRecentSearches: handleRecentSearchClear,
          onClickRecentSearch: handleRecentSearchClick,
          onRemoveRecentSearch: handleRecentSearchRemove,
        }
      : {
          state: 'empty-recent-searches' as const,
          message: COPY.noRecentSearches,
        }
    : isLoading
      ? {
          state: 'loading' as const,
          message: COPY.loading,
        }
      : feedPosts.length > 0
        ? {
            state: 'search-results' as const,
            posts: feedPosts,
            hasNextPage: Boolean(hasNextPage),
            isFetchingNextPage,
            loadingMessage: COPY.loading,
            targetRef,
            onPostClick: handlePostClick,
          }
        : {
            state: 'empty-search-results' as const,
            message: formatEmptyResultMessage(
              trimmedDebouncedKeyword,
              COPY.noSearchResult,
            ),
            writePostLabel: COPY.writePost,
            onWritePost: handleWritePostClick,
          };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className={mergeStyles(
          'mx-auto w-full px-4 pt-[47px] pb-8 md:max-w-[540px] md:px-8 md:pt-6 lg:max-w-[900px]',
        )}
      >
        <ActionHeader isSticky={false}>
          <ActionHeader.BackButton>{COPY.back}</ActionHeader.BackButton>
          <div />
        </ActionHeader>

        <div className="mt-3 md:mt-0">
          <FeedSearchInput
            keyword={keyword}
            placeholder={COPY.searchPlaceholder}
            onChange={handleKeywordChange}
            onClear={handleClearKeyword}
            onSubmit={handleSubmit}
          />
        </div>

        <FeedSearchContent {...searchContentProps} />
      </div>
    </div>
  );
};
