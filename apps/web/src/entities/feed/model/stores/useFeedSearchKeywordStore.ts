'use client';

import { create } from 'zustand';

type FeedSearchKeywordState = {
  feedSearchKeyword: string;
};

type FeedSearchKeywordActions = {
  setFeedSearchKeyword: (keyword: string) => void;
};

type FeedSearchKeywordStore = FeedSearchKeywordState & FeedSearchKeywordActions;

export const useFeedSearchKeywordStore = create<FeedSearchKeywordStore>()(
  (set) => ({
    feedSearchKeyword: '',
    setFeedSearchKeyword: (feedSearchKeyword) => set({ feedSearchKeyword }),
  }),
);
