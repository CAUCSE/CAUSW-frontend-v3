'use client';

import { BellColored } from '@causw/cds';

import type { CeremonyItem, MyCeremonyStateFilter } from '@/entities/ceremony';
import { CeremonyListItem, MyCeremonyFilterChips } from '@/entities/ceremony';

import { NoDataView } from '@/shared/ui/fallback';

interface MyCeremonyListViewProps {
  stateFilter: MyCeremonyStateFilter;
  onStateFilterChange: (filter: MyCeremonyStateFilter) => void;
  items: CeremonyItem[];
}

export const MyCeremonyListView = ({
  stateFilter,
  onStateFilterChange,
  items,
}: MyCeremonyListViewProps) => (
  <>
    <MyCeremonyFilterChips
      selected={stateFilter}
      onChange={onStateFilterChange}
    />

    <div className="flex flex-col gap-2 px-5">
      {items.length === 0 ? (
        <NoDataView
          message="해당하는 경조사가 없어요"
          icon={<BellColored size={52} className="opacity-50 grayscale" />}
        />
      ) : (
        items.map((item) => <CeremonyListItem key={item.id} item={item} />)
      )}
    </div>
  </>
);
