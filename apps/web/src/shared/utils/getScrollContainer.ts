export const getScrollContainer = (): HTMLElement | null => {
  const container = document.querySelector<HTMLElement>(
    '#main-scroll-container',
  );

  if (container && container.scrollHeight > container.clientHeight) {
    return container;
  }

  return document.scrollingElement as HTMLElement | null;
};
