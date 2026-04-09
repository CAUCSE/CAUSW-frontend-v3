'use client';

import type { RefObject } from 'react';

import { Pen } from '@causw/cds';

import type { FeedSearchPost } from '@/widgets/feed/model';

import { NoDataView } from '@/shared/ui';

import { FeedSearchLoadingState } from './FeedSearchLoadingState';
import { RecentSearchesSection } from './RecentSearchesSection';
import { SearchResultsSection } from './SearchResultsSection';

type FeedSearchContentProps =
  | {
      state: 'recent-searches';
      recentSearches: string[];
      recentSearchTitle: string;
      clearAllLabel: string;
      removeSuffix: string;
      onClearAllRecentSearches: () => void;
      onClickRecentSearch: (keyword: string) => void;
      onRemoveRecentSearch: (keyword: string) => void;
    }
  | {
      state: 'empty-recent-searches';
      message: string;
    }
  | {
      state: 'loading';
      message: string;
    }
  | {
      state: 'search-results';
      posts: FeedSearchPost[];
      hasNextPage: boolean;
      isFetchingNextPage: boolean;
      loadingMessage: string;
      targetRef: RefObject<HTMLDivElement | null>;
      onPostClick: (postId: FeedSearchPost['id']) => void;
    }
  | {
      state: 'empty-search-results';
      message: string;
      writePostLabel: string;
      onWritePost: () => void;
    };

export const FeedSearchContent = (props: FeedSearchContentProps) => {
  switch (props.state) {
    case 'recent-searches':
      return (
        <RecentSearchesSection
          recentSearches={props.recentSearches}
          clearAllLabel={props.clearAllLabel}
          title={props.recentSearchTitle}
          removeSuffix={props.removeSuffix}
          onClearAll={props.onClearAllRecentSearches}
          onClickItem={props.onClickRecentSearch}
          onRemoveItem={props.onRemoveRecentSearch}
        />
      );

    case 'empty-recent-searches':
      return (
        <NoDataView
          message={props.message}
          typography="body-16-regular"
          textColor="gray-500"
          gapClassName="gap-6"
          className="tablet:pt-[120px] px-4 pt-[142px] text-center"
        />
      );

    case 'loading':
      return <FeedSearchLoadingState message={props.message} />;

    case 'search-results':
      return (
        <SearchResultsSection
          posts={props.posts}
          hasNextPage={props.hasNextPage}
          isFetchingNextPage={props.isFetchingNextPage}
          loadingMessage={props.loadingMessage}
          targetRef={props.targetRef}
          onPostClick={props.onPostClick}
        />
      );

    case 'empty-search-results':
      return (
        <NoDataView
          className="tablet:pt-[120px] px-4 pt-[160px] text-center"
          gapClassName="gap-8"
        >
          <p className="typo-body-16-regular whitespace-pre-line text-gray-500">
            {props.message}
          </p>

          <button
            type="button"
            onClick={props.onWritePost}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-600 px-4 py-3 text-white transition-colors hover:bg-gray-700"
          >
            <Pen size={20} className="fill-white" />
            <span className="typo-subtitle-16-bold">
              {props.writePostLabel}
            </span>
          </button>
        </NoDataView>
      );
  }
};
