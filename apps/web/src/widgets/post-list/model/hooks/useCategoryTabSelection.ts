'use client';

import { POST_CATEGORY_FILTER_LIST, type PostCategory } from '@/entities/post';

import { POST_LIST_TAB } from '../../config';

import { useNormalizeTabParam, useTabSelection } from './useTabSelection';

/**
 * URL의 카테고리 탭 값이 노출 대상 카테고리에 존재하는지 확인하고,
 * 유효하지 않으면 'all' 탭으로 변경한다.
 */
export const useNormalizeCategoryTabParam = () => {
  useNormalizeTabParam({ validValues: POST_CATEGORY_FILTER_LIST });
};

export const useCategoryTabSelection = () => {
  const { selectedTab, handleTabChange } = useTabSelection({
    validValues: POST_CATEGORY_FILTER_LIST,
  });

  const selectedCategory =
    selectedTab === POST_LIST_TAB.ALL
      ? undefined
      : (selectedTab as PostCategory);

  return {
    selectedTab,
    selectedCategory,
    handleTabChange,
  };
};
