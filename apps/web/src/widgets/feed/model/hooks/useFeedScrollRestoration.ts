'use client';

import { useEffect } from 'react';

import { useGetFeedScrollRestorationStorageKey } from '@/entities/feed';
import { type PostResponseDto } from '@/entities/post';

import { useSessionStorage } from '@/shared/hooks';

interface UseFeedScrollRestorationProps {
  enabled?: boolean;
  posts?: PostResponseDto[];
}

export const useFeedScrollRestoration = ({
  enabled = false,
  posts,
}: UseFeedScrollRestorationProps) => {
  const { feedScrollRestorationStorageKey } =
    useGetFeedScrollRestorationStorageKey();

  const [, , removeScrollRestoration] = useSessionStorage(
    feedScrollRestorationStorageKey,
    '',
    {
      initializeWithValue: false,
    },
  );

  useEffect(() => {
    if (!enabled || !posts) return;

    const scrollRestorationTarget = sessionStorage
      .getItem(feedScrollRestorationStorageKey)
      ?.replaceAll('"', '');

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
  }, [
    enabled,
    removeScrollRestoration,
    posts,
    feedScrollRestorationStorageKey,
  ]);
};
