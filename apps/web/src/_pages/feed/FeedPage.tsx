'use client';

import {
  type ChangeEvent,
  type KeyboardEvent,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  Button,
  Chip,
  Close,
  CloseFilled,
  Comment,
  CommentGrayColored,
  Heart,
  Pen,
  Search,
  TextInput,
  VStack,
  mergeStyles,
} from '@causw/cds';

import { PostHeader } from '@/features/post';

import { PostBody, postQueryOptions } from '@/entities/post';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { useBreakpoint, useFetchNextOnScroll } from '@/shared/hooks';
import { ActionHeader, IconCountButton } from '@/shared/ui';

import {
  createRecentSearches,
  type FeedSearchPost,
  formatEmptyResultMessage,
  loadRecentSearches,
  mapPostToCard,
  saveRecentSearches,
  updateSearchParam,
} from '@/_pages/feed/feed-page.helpers';

const COPY = {
  back: '뒤로',
  searchPlaceholder: '글 제목, 내용을 검색해보세요',
  recentSearches: '최근 검색어',
  clearAll: '전체삭제',
  noRecentSearches: '최근 검색한 내용이 없어요',
  noSearchResult: '“%s”에 관한\n첫 게시글을 작성해보세요.',
  writePost: '글 쓰러 가기',
  removeSuffix: '삭제',
  loading: '검색 결과를 불러오는 중...',
  htmlOnlyPost: '이미지가 포함된 게시글입니다.',
} as const;

const FeedSearchInput = ({
  keyword,
  onChange,
  onClear,
  onSubmit,
}: {
  keyword: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onSubmit: () => void;
}) => {
  const hasKeyword = keyword.trim().length > 0;

  return (
    <TextInput
      value={keyword}
      onChange={onChange}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onSubmit();
        }
      }}
      leftIcon={<Search size={20} color="gray-400" />}
      rightIcon={
        hasKeyword ? (
          <Button
            className="mt-0 mb-auto h-fit w-fit place-self-center self-center border-none bg-transparent p-0 hover:bg-transparent!"
            onClick={onClear}
          >
            <CloseFilled size={20} color="gray-400" />
          </Button>
        ) : undefined
      }
      placeholder={COPY.searchPlaceholder}
      className="placeholder:typo-body-16-regular border-none! text-gray-800 shadow-none! ring-0! outline-none! [&>span]:flex [&>span]:items-center"
    />
  );
};

const FeedSearchResultCard = ({
  post,
  onClick,
}: {
  post: FeedSearchPost;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg bg-white p-4 text-left transition-colors hover:bg-gray-50"
    >
      <VStack gap="md" className="items-stretch">
        <PostHeader
          authorName={post.author}
          createdAt={post.createdAt}
          avatarUrl={post.avatarUrl}
          isMine={false}
          onAction={() => {}}
        />

        <PostBody content={post.content} isCollapsed maxLines={2} />

        <div className="flex items-center gap-5">
          <IconCountButton icon={<Heart />} count={post.likeCount} disabled />
          <IconCountButton
            icon={<Comment />}
            count={post.commentCount}
            disabled
          />
        </div>
      </VStack>
    </button>
  );
};

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

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextKeyword = event.target.value;

    setKeyword(nextKeyword);
    updateSearchParam({
      keyword: nextKeyword,
      pathname,
      router,
      searchParams,
    });
  };

  const handleClearKeyword = () => {
    setKeyword('');
    updateSearchParam({
      keyword: '',
      pathname,
      router,
      searchParams,
    });
  };

  const handleRecentSearchClick = (recentKeyword: string) => {
    setKeyword(recentKeyword);
    updateSearchParam({
      keyword: recentKeyword,
      pathname,
      router,
      searchParams,
    });
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

  const contentWidthClassName = isMobileSize
    ? 'w-full'
    : isTabletSize
      ? 'w-full max-w-[540px]'
      : 'w-full max-w-[900px]';

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
            onChange={handleKeywordChange}
            onClear={handleClearKeyword}
            onSubmit={() => commitRecentSearch(keyword)}
          />
        </div>

        {!hasKeyword ? (
          recentSearches.length > 0 ? (
            <section className="tablet:px-1 px-4 py-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="typo-subtitle-16-bold text-gray-700">
                  {COPY.recentSearches}
                </h2>

                <button
                  type="button"
                  onClick={handleRecentSearchClear}
                  className="text-[15px] leading-6 font-medium tracking-[-0.02em] text-gray-400"
                >
                  {COPY.clearAll}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((recentKeyword) => (
                  <Chip
                    key={recentKeyword}
                    size="md"
                    color="white"
                    asChild
                    className="rounded-md"
                  >
                    <button
                      type="button"
                      className="gap-1.5"
                      onClick={() => handleRecentSearchClick(recentKeyword)}
                    >
                      <span className="text-[15px] leading-6 font-medium tracking-[-0.02em] text-gray-700">
                        {recentKeyword}
                      </span>
                      <span
                        aria-label={`${recentKeyword} ${COPY.removeSuffix}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRecentSearchRemove(recentKeyword);
                        }}
                      >
                        <Close size={14} color="gray-400" />
                      </span>
                    </button>
                  </Chip>
                ))}
              </div>
            </section>
          ) : (
            <section className="tablet:pt-[120px] flex items-center justify-center px-4 pt-[142px] text-center">
              <div className="flex flex-col items-center gap-6">
                <CommentGrayColored size={56} />
                <p className="typo-body-16-regular text-gray-500">
                  {COPY.noRecentSearches}
                </p>
              </div>
            </section>
          )
        ) : isLoading ? (
          <section className="px-4 py-10 text-center">
            <p className="typo-body-16-regular text-gray-500">{COPY.loading}</p>
          </section>
        ) : feedPosts.length > 0 ? (
          <section className="py-4">
            <div className="flex flex-col gap-2">
              {feedPosts.map((post) => (
                <FeedSearchResultCard
                  key={post.id}
                  post={post}
                  onClick={() => {
                    commitRecentSearch(keyword);
                    router.push(`/feed/${post.id}`);
                  }}
                />
              ))}

              {hasNextPage && <div ref={targetRef} className="h-4 w-full" />}

              {isFetchingNextPage ? (
                <div className="py-4 text-center">
                  <p className="typo-body-14-regular text-gray-400">
                    {COPY.loading}
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        ) : (
          <section className="tablet:pt-[120px] flex items-center justify-center px-4 pt-[160px] text-center">
            <div className="flex w-[176px] flex-col items-center gap-8">
              <p className="typo-body-16-regular whitespace-pre-line text-gray-500">
                {formatEmptyResultMessage(
                  trimmedDeferredKeyword,
                  COPY.noSearchResult,
                )}
              </p>

              <button
                type="button"
                onClick={() => {
                  commitRecentSearch(keyword);
                  router.push('/feed/write');
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gray-600 px-4 py-3 text-white transition-colors hover:bg-gray-700"
              >
                <Pen size={20} className="fill-white" />
                <span className="typo-subtitle-16-bold">{COPY.writePost}</span>
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
