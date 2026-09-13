'use client';

import {
  POST_LIST_TAB_SEARCH_PARAM_KEY,
  PostListWrapper,
  useCategoryTabSelection,
  useNormalizeBoardTabParam,
  useNormalizeCategoryTabParam,
} from '@/widgets/post-list';

import { BOARD_GROUP } from '@/entities/board';

import { ROUTES } from '@/shared/constants';

import { useFeedMain } from '../../model';

export const FeedMain = () => {
  const { data: boards, filteredBoardIds } = useFeedMain();
  useNormalizeBoardTabParam({
    boards,
    searchParamKey: POST_LIST_TAB_SEARCH_PARAM_KEY.CHANNEL,
    basePath: ROUTES.FEED,
  });

  useNormalizeCategoryTabParam({ basePath: ROUTES.FEED });
  const { selectedCategory } = useCategoryTabSelection();

  return (
    <PostListWrapper
      boardIds={filteredBoardIds}
      boardGroup={BOARD_GROUP.NOTICE}
      category={selectedCategory}
    />
  );
};
