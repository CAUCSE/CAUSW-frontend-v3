import type { LockerLocationSummary } from '@/entities/locker';

export const FloorSummaryCard = ({
  summary,
  onOpen,
}: {
  summary: LockerLocationSummary;
  onOpen: (floor: LockerLocationSummary) => void;
}) => {
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

      <button
        type="button"
        onClick={() => onOpen(summary)}
        className="mt-4 flex h-[3.25rem] w-full cursor-pointer items-center justify-center rounded-lg bg-blue-100 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-blue-700"
      >
        사물함 신청하기
      </button>
    </article>
  );
};
