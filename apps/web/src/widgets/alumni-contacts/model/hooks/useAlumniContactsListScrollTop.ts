'use client';

import { useScrollDirectionVisibility } from '@/shared/hooks';

import { ALUMNI_CONTACTS_SCROLL_CONTAINER_CLASS_NAME } from '../../config';

export const useAlumniContactsListScrollTop = () => {
  const { isScrolled, scrollToTop } = useScrollDirectionVisibility({
    containerClassName: ALUMNI_CONTACTS_SCROLL_CONTAINER_CLASS_NAME,
  });

  return {
    showScrollToTopButton: isScrolled,
    handleClickScrollTop: scrollToTop,
  };
};
