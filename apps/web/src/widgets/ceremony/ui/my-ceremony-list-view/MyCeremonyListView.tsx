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
        <NoDataView className="rounded-3 bg-white px-0 py-13.5">
          <NoDataView.Icon>
            <BellGrayColored size={52} />
          </NoDataView.Icon>
          <NoDataView.Message>해당하는 경조사가 없어요</NoDataView.Message>
        </NoDataView>
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
