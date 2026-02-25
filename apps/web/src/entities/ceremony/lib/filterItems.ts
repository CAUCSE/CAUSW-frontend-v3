import type { CeremonyItem, CeremonyFilterType } from '../model';

export const filterItems = (
  items: CeremonyItem[],
  filter: CeremonyFilterType,
): CeremonyItem[] => {
  if (filter === '전체') return items;
  return items.filter((item) => item.type === filter);
};
