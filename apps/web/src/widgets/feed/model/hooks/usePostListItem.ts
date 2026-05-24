'use client';

import { type KeyboardEvent, type MouseEvent } from 'react';

import { useRouter } from 'next/navigation';

import { useGetFeedScrollRestorationStorageKey } from '@/entities/feed';
import { type PostResponseDto } from '@/entities/post';

import { useSessionStorage } from '@/shared/hooks';

export const usePostListItem = () => {
  const router = useRouter();

  const { feedScrollRestorationStorageKey } =
    useGetFeedScrollRestorationStorageKey();

  const [, setScrollRestoration] = useSessionStorage(
    feedScrollRestorationStorageKey,
    '',
    {
      initializeWithValue: false,
    },
  );

  const moveToPost = (postId: PostResponseDto['postId']) => {
    setScrollRestoration(postId);
    router.push(`/feed/${postId}`);
  };

  const handleCardClick = (
    event: MouseEvent<HTMLDivElement>,
    postId: PostResponseDto['postId'],
  ) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) {
      return;
    }

    moveToPost(postId);
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    postId: PostResponseDto['postId'],
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      moveToPost(postId);
    }
  };

  return {
    handleCardClick,
    handleCardKeyDown,
  };
};
