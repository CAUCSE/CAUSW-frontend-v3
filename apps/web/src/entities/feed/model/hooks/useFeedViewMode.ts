'use client';

import { useLocalStorage } from '@/shared/hooks';

import {
  FEED_VIEW_MODE,
  FEED_VIEW_MODE_STORAGE_KEY,
  type FeedViewMode,
} from '../../config';

export const useFeedViewMode = () => {
  const [feedViewMode, setFeedViewMode] = useLocalStorage<FeedViewMode>(
    FEED_VIEW_MODE_STORAGE_KEY,
    FEED_VIEW_MODE.COMPACT,
    { initializeWithValue: false },
  );

  return { feedViewMode, setFeedViewMode };
};
