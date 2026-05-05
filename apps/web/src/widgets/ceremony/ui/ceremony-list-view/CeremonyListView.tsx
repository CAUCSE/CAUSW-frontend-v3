'use client';

import { Tab } from '@causw/cds';

import type {
  CeremonyFilterType,
  CeremonyFilterTypeApi,
  MyCeremonyStateFilter,
} from '@/entities/ceremony';
import { CeremonyFilterChips, FILTER_TYPE_API_MAP } from '@/entities/ceremony';

import { CeremonySectionsGroup } from '../ceremony-section/CeremonySectionContent';
import { MyCeremonyListView } from '../my-ceremony-list-view';

interface CeremonyListViewProps {
  filter: CeremonyFilterType;
  onFilterChange: (filter: CeremonyFilterType) => void;
  myStateFilter: MyCeremonyStateFilter;
  onMyStateFilterChange: (filter: MyCeremonyStateFilter) => void;
  onItemClick?: (id: string) => void;
  onMyItemClick?: (id: string) => void;
}

export const CeremonyListView = ({
  filter,
  onFilterChange,
  myStateFilter,
  onMyStateFilterChange,
  onItemClick,
  onMyItemClick,
}: CeremonyListViewProps) => {
  const apiFilterType: CeremonyFilterTypeApi = FILTER_TYPE_API_MAP[filter];

  return (
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

        <CeremonySectionsGroup type={apiFilterType} onItemClick={onItemClick} />
      </Tab.Content>

      <Tab.Content value="mine" className="flex flex-col gap-5 pt-5 pb-25">
        <MyCeremonyListView
          stateFilter={myStateFilter}
          onStateFilterChange={onMyStateFilterChange}
          onItemClick={onMyItemClick}
        />
      </Tab.Content>
    </Tab>
  );
};
