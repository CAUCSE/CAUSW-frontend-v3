import { type BoardGroup } from '@/entities/feed';

export const getRecentSearchKeywordStorageKey = (boardGroup: BoardGroup) =>
  `${boardGroup.toLowerCase()}-recent-search-keyword`;

export const RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE: string[] = [];
