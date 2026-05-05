import type { CeremonyPageResponse } from '../types';

export const selectCeremonyPages = (data: {
  pages: CeremonyPageResponse[];
}) => {
  const allItems = data.pages.flatMap((page) => page.content);
  const seen = new Set<string>();
  const items = allItems.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  return {
    items,
    hasNext: data.pages[data.pages.length - 1]?.hasNext ?? false,
  };
};

export const getNextPage = (lastPage: CeremonyPageResponse) =>
  lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
