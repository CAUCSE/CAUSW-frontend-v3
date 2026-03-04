'use client';

import { BellGrayColored } from '@causw/cds';

import type { CeremonyItem, MyCeremonyStateFilter } from '@/entities/ceremony';
import { CeremonyListItem, MyCeremonyFilterChips } from '@/entities/ceremony';

import { NoDataView } from '@/shared/ui/fallback';

interface MyCeremonyListViewProps {
  stateFilter: MyCeremonyStateFilter;
  onStateFilterChange: (filter: MyCeremonyStateFilter) => void;
  items: CeremonyItem[];
  onItemClick?: (id: string) => void;
}

export const MyCeremonyListView = ({
  stateFilter,
  onStateFilterChange,
  items,
  onItemClick,
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
          icon={<BellGrayColored size={52} />}
          className="rounded-[0.75rem] bg-white px-0 py-[3.5rem]"
        />
      ) : (
        items.map((item) => (
          <CeremonyListItem
            key={item.id}
            item={item}
            onClick={() => onItemClick?.(item.id)}
          />
        ))
      )}
    </div>
  </>
);
