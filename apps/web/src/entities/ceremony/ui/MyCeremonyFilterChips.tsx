'use client';

import { Tab } from '@causw/cds';

import type { MyCeremonyStateFilter } from '../model';

const MY_CEREMONY_STATE_FILTERS: MyCeremonyStateFilter[] = [
  '등록 완료',
  '등록 거부',
  '등록 대기중',
];

interface MyCeremonyFilterChipsProps {
  selected: MyCeremonyStateFilter;
  onChange: (filter: MyCeremonyStateFilter) => void;
}

export const MyCeremonyFilterChips = ({
  selected,
  onChange,
}: MyCeremonyFilterChipsProps) => (
  <Tab
    variant="chip"
    value={selected}
    onValueChange={(v) => onChange(v as MyCeremonyStateFilter)}
  >
    <Tab.List className="px-5">
      {MY_CEREMONY_STATE_FILTERS.map((filter) => (
        <Tab.TabItem key={filter} value={filter}>
          {filter}
        </Tab.TabItem>
      ))}
    </Tab.List>
  </Tab>
);
