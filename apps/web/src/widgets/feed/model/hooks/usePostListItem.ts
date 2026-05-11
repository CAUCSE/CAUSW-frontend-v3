'use client';

import { type KeyboardEvent, type MouseEvent } from 'react';

import { useRouter } from 'next/navigation';

import { type PostResponseDto } from '@/entities/post';

export const usePostListItem = () => {
  const router = useRouter();

  const moveToPost = (postId: PostResponseDto['postId']) => {
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
