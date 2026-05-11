'use client';

import { useMemo, type KeyboardEvent, type MouseEvent } from 'react';

import { useRouter } from 'next/navigation';

import { type PostResponseDto } from '@/entities/post';

export const usePostListItem = (post: PostResponseDto) => {
  const router = useRouter();

  const moveToPost = () => {
    router.push(`/feed/${post.postId}`);
  };

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) {
      return;
    }

    moveToPost();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      moveToPost();
    }
  };

  const authorName = useMemo(() => {
    if (post.isOfficial) {
      return post.writerNickname;
    }

    if (post.isAnonymous) {
      return '익명';
    }

    return post.writerNickname;
  }, [post.isOfficial, post.isAnonymous, post.writerNickname]);

  return {
    handleCardClick,
    handleCardKeyDown,
    authorName,
  };
};
