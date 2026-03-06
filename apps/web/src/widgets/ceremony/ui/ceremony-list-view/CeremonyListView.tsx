'use client';

import dynamic from 'next/dynamic';

import { Tab } from '@causw/cds';

import type {
  CeremonyFilterType,
  CeremonyFilterTypeApi,
  CeremonyItem,
  MyCeremonyStateFilter,
} from '@/entities/ceremony';
import { CeremonyFilterChips, FILTER_TYPE_API_MAP } from '@/entities/ceremony';

import { SuspenseView } from '@/shared/ui/fallback';

import { MyCeremonyListView } from '../my-ceremony-list-view';

const OngoingCeremonySection = dynamic(
  () =>
    import('../ceremony-section/CeremonySectionContent').then((mod) => ({
      default: mod.OngoingCeremonySection,
    })),
  { ssr: false, loading: () => <SuspenseView /> },
);

const UpcomingCeremonySection = dynamic(
  () =>
    import('../ceremony-section/CeremonySectionContent').then((mod) => ({
      default: mod.UpcomingCeremonySection,
    })),
  { ssr: false, loading: () => <SuspenseView /> },
);

const PastCeremonySection = dynamic(
  () =>
    import('../ceremony-section/CeremonySectionContent').then((mod) => ({
      default: mod.PastCeremonySection,
    })),
  { ssr: false, loading: () => <SuspenseView /> },
);

interface CeremonyListViewProps {
  filter: CeremonyFilterType;
  onFilterChange: (filter: CeremonyFilterType) => void;
  myStateFilter: MyCeremonyStateFilter;
  onMyStateFilterChange: (filter: MyCeremonyStateFilter) => void;
  myItems: CeremonyItem[];
  onItemClick?: (id: string) => void;
}

export const CeremonyListView = ({
  filter,
  onFilterChange,
  myStateFilter,
  onMyStateFilterChange,
  myItems,
  onItemClick,
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

        <OngoingCeremonySection
          type={apiFilterType}
          onItemClick={onItemClick}
        />
        <UpcomingCeremonySection
          type={apiFilterType}
          onItemClick={onItemClick}
        />
        <PastCeremonySection type={apiFilterType} onItemClick={onItemClick} />
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
};
