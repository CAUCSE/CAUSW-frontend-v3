'use client';

import { useLocalStorage } from '@/shared/hooks';

import {
  POST_VIEW_MODE,
  POST_VIEW_MODE_STORAGE_KEY,
  type PostViewMode,
} from '../../config';

export const usePostViewMode = () => {
  const [postViewMode, setPostViewMode] = useLocalStorage<PostViewMode>(
    POST_VIEW_MODE_STORAGE_KEY,
    POST_VIEW_MODE.COMPACT,
    { initializeWithValue: false },
  );

  return { postViewMode, setPostViewMode };
};
