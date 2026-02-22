'use client';

import { Tab } from '@causw/cds';

import type { CeremonyFilterType } from '@/shared/types';

const FILTERS: CeremonyFilterType[] = ['전체', '경사', '조사'];

interface CeremonyFilterChipsProps {
  selected: CeremonyFilterType;
  onChange: (filter: CeremonyFilterType) => void;
}

export const CeremonyFilterChips = ({
  selected,
  onChange,
}: CeremonyFilterChipsProps) => (
  <Tab
    variant="chip"
    value={selected}
    onValueChange={(v) => onChange(v as CeremonyFilterType)}
  >
    <Tab.List className="px-5">
      {FILTERS.map((filter) => (
        <Tab.TabItem key={filter} value={filter}>
          {filter}
        </Tab.TabItem>
      ))}
    </Tab.List>
  </Tab>
);
