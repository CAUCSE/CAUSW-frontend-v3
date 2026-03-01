import type { CeremonyItem, MyCeremonyStateFilter } from '../model';
import { MY_CEREMONY_STATE_MAP } from '../model';

export const filterByState = (
  items: CeremonyItem[],
  stateFilter: MyCeremonyStateFilter,
): CeremonyItem[] => {
  const targetState = MY_CEREMONY_STATE_MAP[stateFilter];
  return items.filter((item) => item.state === targetState);
};
