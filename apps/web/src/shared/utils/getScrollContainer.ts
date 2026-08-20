import { MEDIA_QUERIES } from '../constants';

export const getScrollContainer = (): HTMLElement | null => {
  const isMobile = window.matchMedia(MEDIA_QUERIES.mobile).matches;

  if (isMobile) {
    return document.querySelector<HTMLElement>('#main-scroll-container');
  }

  return document.scrollingElement as HTMLElement | null;
};
