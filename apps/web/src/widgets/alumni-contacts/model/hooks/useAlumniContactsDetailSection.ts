'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE,
  type AlumniContactsDetailSectionTabType,
} from '@/entities/alumni-contacts';

import { getScrollContainer } from '@/shared/utils';

export const useAlumniContactsDetailSection = () => {
  const [selectedTab, setSelectedTab] =
    useState<AlumniContactsDetailSectionTabType>(
      ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.SNS,
    );

  const categoryRef = useRef<HTMLSpanElement[]>([]);
  /** 탭 클릭으로 smooth scroll 중일 때 스크롤 기반 탭 동기화를 건너뜀 */
  const skipScrollSyncRef = useRef(false);
  const scrollSyncOpIdRef = useRef(0);

  const CATEGORY_TAB_SYNC_THRESHOLD = 90; // y좌표가 90px 이하일 때 해당 카테고리가 활성화되도록 함
  const TAB_SYNC_FALLBACK_TIMER = 800; // scrollend 이벤트가 발생하지 않을 경우 탭 동기화를 위한 타이머

  const scheduleTabSyncUnlockOnScrollEnd = (opId: number) => {
    const scrollContainer = getScrollContainer();

    const releaseIfCurrent = () => {
      if (scrollSyncOpIdRef.current !== opId) return;
      skipScrollSyncRef.current = false;
    };

    if (!scrollContainer) {
      releaseIfCurrent();
      return;
    }

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallbackTimer);
      scrollContainer.removeEventListener('scrollend', done);
      releaseIfCurrent();
    };

    /* scrollend 이벤트가 발생하지 않을 경우 탭 동기화를 위한 타이머 */
    const fallbackTimer = window.setTimeout(done, TAB_SYNC_FALLBACK_TIMER);
    scrollContainer.addEventListener('scrollend', done, { passive: true });
  };

  const handleClickCategoryTab = (key: AlumniContactsDetailSectionTabType) => {
    skipScrollSyncRef.current = true;
    const opId = ++scrollSyncOpIdRef.current;

    setSelectedTab(key);
    categoryRef.current[
      Object.values(ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE).indexOf(key)
    ]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    scheduleTabSyncUnlockOnScrollEnd(opId);
  };

  useEffect(() => {
    const changeSelectedTab = () => {
      if (skipScrollSyncRef.current) return;

      categoryRef.current.forEach((ref: HTMLSpanElement | null) => {
        if (
          ref &&
          ref.getBoundingClientRect().y <= CATEGORY_TAB_SYNC_THRESHOLD
        ) {
          setSelectedTab(ref.id as AlumniContactsDetailSectionTabType);
        }
      });
    };
    const scrollContainer = getScrollContainer();

    scrollContainer?.addEventListener('scroll', changeSelectedTab);

    return () => {
      scrollContainer?.removeEventListener('scroll', changeSelectedTab);
    };
  }, []);

  return {
    selectedTab,
    categoryRef,
    handleClickCategoryTab,
  };
};
