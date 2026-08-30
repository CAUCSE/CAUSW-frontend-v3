'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE,
  type AlumniContactsDetailSectionTabType,
} from '@/entities/alumni-contacts';

import { getScrollContainer, isMobile } from '@/shared/utils';

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

  /** 네이티브 앱에서는 scrollIntoView 위치 계산이 달라질 수 있어 직접 중앙 위치를 계산해 스크롤함 */
  const scrollToCategoryInNativeApp = (target: HTMLSpanElement) => {
    const scrollContainer = getScrollContainer();

    if (!scrollContainer) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    /** 기존 웹 동작과 동일하게 타깃 요소가 스크롤 영역의 중앙에 오도록 위치를 계산 */
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetTop =
      scrollContainer.scrollTop +
      (targetRect.top - scrollContainerRect.top) -
      (scrollContainer.clientHeight - targetRect.height) / 2;

    scrollContainer.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  };

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

    const scrollEventTarget: EventTarget = isMobile
      ? scrollContainer
      : document;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallbackTimer);
      scrollEventTarget.removeEventListener('scrollend', onScrollEnd);
      releaseIfCurrent();
    };
    const onScrollEnd = (event: Event) => {
      if (
        !isMobile &&
        event.target !== document &&
        event.target !== scrollContainer
      ) {
        return;
      }
      finish();
    };

    /* scrollend 이벤트가 발생하지 않을 경우 탭 동기화를 위한 타이머 */
    const fallbackTimer = window.setTimeout(finish, TAB_SYNC_FALLBACK_TIMER);
    scrollEventTarget.addEventListener(
      'scrollend',
      onScrollEnd as EventListener,
      { passive: true },
    );
  };

  const handleClickCategoryTab = (key: AlumniContactsDetailSectionTabType) => {
    skipScrollSyncRef.current = true;
    const opId = ++scrollSyncOpIdRef.current;

    setSelectedTab(key);
    const targetCategory =
      categoryRef.current[
        Object.values(ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE).indexOf(key)
      ];

    if (targetCategory) {
      if (isMobile) {
        scrollToCategoryInNativeApp(targetCategory);
      } else {
        targetCategory.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }

    scheduleTabSyncUnlockOnScrollEnd(opId);
  };

  useEffect(() => {
    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

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

    if (isMobile) {
      scrollContainer.addEventListener('scroll', changeSelectedTab);
      return () => {
        scrollContainer.removeEventListener('scroll', changeSelectedTab);
      };
    }

    const handleDocumentScroll = (event: Event) => {
      if (event.target !== document && event.target !== scrollContainer) {
        return;
      }
      changeSelectedTab();
    };

    document.addEventListener('scroll', handleDocumentScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener('scroll', handleDocumentScroll, {
        capture: true,
      });
    };
  }, []);

  return {
    selectedTab,
    categoryRef,
    handleClickCategoryTab,
  };
};
