'use client';

import { useCallback, useEffect, useState } from 'react';

import { type UseInfiniteQueryResult } from '@tanstack/react-query';
import { isEqual } from 'es-toolkit';

import {
  ALUMNI_CONTACTS_SCROLL_RESTORATION_STORAGE_KEY,
  type GetPaginatedAlumniContactsResponseDto,
  type GetAlumniContactsQuery,
} from '@/entities/alumni-contacts';

interface UseAlumniContactsScrollRestorationProps {
  data?: GetPaginatedAlumniContactsResponseDto['content'];
  query: GetAlumniContactsQuery;
  enabled?: boolean;
  hasNextPage: boolean;
  fetchNextPage: UseInfiniteQueryResult['fetchNextPage'];
}

export const useAlumniContactsScrollRestoration = ({
  data,
  query,
  enabled = false,
  hasNextPage,
  fetchNextPage,
}: UseAlumniContactsScrollRestorationProps) => {
  const [isScrollRestoring, setIsScrollRestoring] = useState<boolean>(false);

  const removeScrollRestoration = useCallback(() => {
    sessionStorage.removeItem(
      ALUMNI_CONTACTS_SCROLL_RESTORATION_STORAGE_KEY.LIST,
    );
  }, []);

  const scrollToTargetAlumniContacts = useCallback(
    (alumniContactsId: string) => {
      requestAnimationFrame(() => {
        document.getElementById(`${alumniContactsId}`)?.scrollIntoView({
          block: 'center',
        });
      });
    },
    [],
  );

  useEffect(() => {
    const updateIsScrollRestoring = (isScrollRestoring: boolean) => {
      setIsScrollRestoring(isScrollRestoring);
    };

    const resetScrollRestoration = () => {
      removeScrollRestoration();
      updateIsScrollRestoring(false);
    };

    if (!enabled || !data) {
      return;
    }

    updateIsScrollRestoring(true);
    const rawScrollRestorationTarget = sessionStorage.getItem(
      ALUMNI_CONTACTS_SCROLL_RESTORATION_STORAGE_KEY.LIST,
    );

    if (!rawScrollRestorationTarget) {
      updateIsScrollRestoring(false);
      return;
    }

    try {
      const scrollRestorationTarget = JSON.parse(rawScrollRestorationTarget);

      const isSameQuery = isEqual(scrollRestorationTarget.query, query);

      // 같은 저장 상태가 아니라면 스크롤 복원 초기화
      if (!isSameQuery) {
        resetScrollRestoration();
        return;
      }

      const hasScrollRestorationTarget = data.some(
        (item) => item.id === scrollRestorationTarget.alumniContactsId,
      );

      if (hasScrollRestorationTarget) {
        updateIsScrollRestoring(false);
        scrollToTargetAlumniContacts(scrollRestorationTarget.alumniContactsId);
        removeScrollRestoration();
        return;
      }

      if (hasNextPage) {
        fetchNextPage();
        return;
      }

      resetScrollRestoration();
    } catch {
      resetScrollRestoration();
    }
  }, [
    data,
    query,
    enabled,
    removeScrollRestoration,
    scrollToTargetAlumniContacts,
    fetchNextPage,
    hasNextPage,
  ]);

  return {
    isScrollRestoring,
  };
};
