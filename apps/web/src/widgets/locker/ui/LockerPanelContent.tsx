import type { LockerMyResponse } from '@/entities/locker';

import { getFloorNameFromDisplayName, type LockerGridItem } from '../model';

import { LockerInfoCard } from './LockerInfoCard';
import { LockerLegend } from './LockerLegend';
import { LockerSelectionGrid } from './LockerSelectionGrid';

interface LockerPanelContentProps {
  availableCount: number;
  currentLocker: LockerMyResponse | null;
  errorMessage: string | null;
  floorName: string;
  isActionAvailable: boolean;
  isLoading: boolean;
  lockers: LockerGridItem[];
  onSelectLocker: (lockerId: string) => void;
  selectedLockerId: string | null;
  totalCount: number;
}

export const LockerPanelContent = ({
  availableCount,
  currentLocker,
  errorMessage,
  floorName,
  isActionAvailable,
  isLoading,
  lockers,
  onSelectLocker,
  selectedLockerId,
  totalCount,
}: LockerPanelContentProps) => {
  return (
    <div className="flex flex-col gap-6 bg-gray-100">
      <div className="px-1">
        <h2 className="text-[1.375rem] font-bold tracking-[-0.0275rem] text-gray-700">
          {floorName}
        </h2>
      </div>

      {currentLocker &&
        getFloorNameFromDisplayName(currentLocker.displayName) ===
          floorName && <LockerInfoCard assignment={currentLocker} />}

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 px-1">
          <p className="text-lg font-bold tracking-[-0.0225rem] text-gray-700">
            {isLoading ? (
              '사물함 정보를 불러오는 중이에요.'
            ) : isActionAvailable ? (
              <>
                잔여 <span className="text-blue-700">{availableCount}개</span> /
                전체 {totalCount}개
              </>
            ) : (
              '사물함 신청기간이 아니에요.'
            )}
          </p>
          <LockerLegend />
        </div>

        {errorMessage ? (
          <div className="rounded-lg bg-white px-4 py-5 text-sm text-red-500">
            {errorMessage}
          </div>
        ) : (
          <LockerSelectionGrid
            lockers={lockers}
            onSelect={onSelectLocker}
            selectedLockerId={selectedLockerId}
          />
        )}
      </section>
    </div>
  );
};
