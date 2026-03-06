'use client';

import { Tab } from '@causw/cds';

import type {
  CeremonyFilterType,
  CeremonyItem,
  MyCeremonyStateFilter,
} from '@/entities/ceremony';
import { CeremonyFilterChips } from '@/entities/ceremony';

import { CeremonySection } from '../ceremony-section';
import { MyCeremonyListView } from '../my-ceremony-list-view';

interface CeremonyListViewProps {
  filter: CeremonyFilterType;
  onFilterChange: (filter: CeremonyFilterType) => void;
  ongoingItems: CeremonyItem[];
  upcomingItems: CeremonyItem[];
  endedItems: CeremonyItem[];
  myStateFilter: MyCeremonyStateFilter;
  onMyStateFilterChange: (filter: MyCeremonyStateFilter) => void;
  myItems: CeremonyItem[];
  onItemClick?: (id: string) => void;
}

export const CeremonyListView = ({
  filter,
  onFilterChange,
  ongoingItems,
  upcomingItems,
  endedItems,
  myStateFilter,
  onMyStateFilterChange,
  myItems,
  onItemClick,
}: CeremonyListViewProps) => (
  <Tab variant="underline" defaultValue="all">
    <Tab.List className="bg-gray-100 px-5">
      <Tab.TabItem value="all" className="px-0 py-2">
        전체 경조사
      </Tab.TabItem>
      <Tab.TabItem value="mine" className="px-0 py-2">
        내 경조사
      </Tab.TabItem>
    </Tab.List>

    <Tab.Content value="all" className="flex flex-col gap-5 pt-5 pb-25">
      <CeremonyFilterChips selected={filter} onChange={onFilterChange} />

      <CeremonySection
        title="진행 중인 경조사"
        items={ongoingItems}
        emptyMessage="진행 중인 경조사가 없어요"
        onItemClick={onItemClick}
      />

      <CeremonySection
        title="곧 다가올 경조사"
        items={upcomingItems}
        emptyMessage="곧 다가올 경조사가 없어요"
        onItemClick={onItemClick}
      />

      {endedItems.length > 0 && (
        <CeremonySection
          title="끝난 경조사"
          items={endedItems}
          onItemClick={onItemClick}
        />
      )}
    </Tab.Content>

    <Tab.Content value="mine" className="flex flex-col gap-5 pt-5 pb-25">
      <MyCeremonyListView
        stateFilter={myStateFilter}
        onStateFilterChange={onMyStateFilterChange}
        items={myItems}
        onItemClick={onItemClick}
      />
    </Tab.Content>
  </Tab>
);
