'use client';

import { useState, type KeyboardEvent, type MouseEvent } from 'react';

import { useRouter } from 'next/navigation';

import { type BoardGroup } from '@/entities/feed';
import { getPostDetailPath, type PostResponseDto } from '@/entities/post';

import { useSessionStorage } from '@/shared/hooks';

import { type PostListScrollRestorationStorageKey } from '../../config';

interface UsePostListItemProps {
  storageKey: PostListScrollRestorationStorageKey;
  boardGroup: BoardGroup;
}

export const usePostListItem = ({
  storageKey,
  boardGroup,
}: UsePostListItemProps) => {
  const router = useRouter();

  const [, setScrollRestoration] = useSessionStorage(storageKey, '', {
    initializeWithValue: false,
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const moveToPost = (postId: PostResponseDto['postId']) => {
    setScrollRestoration(postId);
    router.push(getPostDetailPath(boardGroup, postId));
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
    isExpanded,
    handleExpand,
  };
};
