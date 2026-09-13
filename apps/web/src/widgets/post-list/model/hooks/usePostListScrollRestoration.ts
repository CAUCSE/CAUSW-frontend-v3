'use client';

import { useEffect } from 'react';

import { type PostResponseDto } from '@/entities/post';

import { useSessionStorage } from '@/shared/hooks';

import { type PostListScrollRestorationStorageKey } from '../../config';

interface UsePostListScrollRestorationProps {
  storageKey: PostListScrollRestorationStorageKey;
  enabled?: boolean;
  posts?: PostResponseDto[];
}

export const usePostListScrollRestoration = ({
  storageKey,
  enabled = false,
  posts,
}: UsePostListScrollRestorationProps) => {
  const [, , removeScrollRestoration] = useSessionStorage(storageKey, '', {
    initializeWithValue: false,
  });

  useEffect(() => {
    if (!enabled || !posts) return;

    const rawScrollRestorationTarget = sessionStorage.getItem(storageKey);

    const scrollRestorationTarget = rawScrollRestorationTarget
      ? JSON.parse(rawScrollRestorationTarget)
      : null;

    const hasScrollRestorationTarget = posts.some(
      (post) => post.postId === scrollRestorationTarget,
    );

    // 게시글 캐시 데이터에 복원 대상 게시글이 없으면 초기화
    if (!scrollRestorationTarget || !hasScrollRestorationTarget) {
      removeScrollRestoration();
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(`${scrollRestorationTarget}`)?.scrollIntoView({
        block: 'center',
      });

      removeScrollRestoration();
    });
  }, [enabled, removeScrollRestoration, posts, storageKey]);
};
