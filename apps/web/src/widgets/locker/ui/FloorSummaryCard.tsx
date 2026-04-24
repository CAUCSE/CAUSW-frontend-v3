import { LockerApplyButton } from '@/features/locker';

import type { LockerLocationSummary } from '@/entities/locker';

interface FloorSummaryCardProps {
  onOpen: (floor: LockerLocationSummary) => void;
  summary: LockerLocationSummary;
}

export const FloorSummaryCard = ({
  onOpen,
  summary,
}: FloorSummaryCardProps) => {
  const progressRatio = Math.min(
    summary.totalCount > 0 ? summary.availableCount / summary.totalCount : 0,
    1,
  );

  return (
    <article className="rounded-md bg-white p-4">
      <div className="flex items-end justify-between">
        <h3 className="text-lg font-bold tracking-[-0.0225rem] text-gray-700">
          {summary.floorName}
        </h3>
        <p className="text-base font-bold tracking-[-0.02rem] text-gray-700">
          잔여 {summary.availableCount}개
        </p>
      </div>

      <div className="mt-4">
        <div className="h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-700"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm tracking-[-0.0175rem] text-gray-400">
          전체 {summary.totalCount}개
        </p>
      </div>

      <LockerApplyButton onClick={() => onOpen(summary)} />
    </article>
  );
};
