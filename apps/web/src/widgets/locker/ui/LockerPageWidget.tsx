'use client';

import { extractErrorMessage } from '@/shared/utils';

import { useLockerPage } from '../model';

import { FloorSummaryCard } from './FloorSummaryCard';
import { LockerInfoCard } from './LockerInfoCard';
import { LockerNoticeCard } from './LockerNoticeCard';
import { LockerSelectionOverlay } from './LockerSelectionOverlay';

export const LockerPageWidget = () => {
  const {
    activeFloor,
    activeFloorAvailableCount,
    activeFloorError,
    activeFloorLockers,
    activeFloorTotalCount,
    canApply,
    canExtend,
    currentLocker,
    handleApply,
    handleAutoReturnedNoticeClose,
    handleExtend,
    handleOpenFloor,
    handleReturn,
    handleSelectionOpenChange,
    hasAutoReturnedNotice,
    initialError,
    isPending,
    isSelectionOpen,
    locationList,
    lockerLocationDetailQuery,
    lockerLocationsQuery,
    myLockerQuery,
    periodStatusQuery,
    selectedLockerId,
    setSelectedLockerId,
  } = useLockerPage();

  return (
    <>
      <div className="tablet:px-8 tablet:pb-12 tablet:pt-6 mx-auto flex w-full max-w-[900px] flex-col gap-6 px-4 pt-2 pb-10">
        <section className="flex flex-col gap-4">
          <div className="px-1">
            <h1 className="text-[1.375rem] font-bold tracking-[-0.0275rem] text-gray-700">
              사물함 목록
            </h1>
          </div>

          {currentLocker ? (
            <LockerInfoCard assignment={currentLocker} />
          ) : (
            <div className="rounded-lg bg-white p-5">
              <div className="flex items-center justify-between text-base tracking-[-0.02rem]">
                <p className="font-medium text-gray-500">현재 사물함</p>
                <p className="font-bold text-gray-700">
                  {myLockerQuery.isLoading ? '불러오는 중' : '없음'}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <div className="px-1">
            <p className="text-lg font-bold tracking-[-0.0225rem] text-gray-700">
              잔여{' '}
              <span className="text-blue-700">
                {lockerLocationsQuery.data?.summary.availableCount ?? '-'}개
              </span>{' '}
              / 전체 {lockerLocationsQuery.data?.summary.totalCount ?? '-'}개
            </p>
          </div>

          {initialError ? (
            <div className="rounded-lg bg-white px-5 py-6 text-sm text-red-500">
              {extractErrorMessage(
                initialError,
                '사물함 정보를 불러오지 못했어요.',
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {locationList.map((summary) => (
                <FloorSummaryCard
                  key={summary.locationId}
                  onOpen={handleOpenFloor}
                  summary={summary}
                />
              ))}
            </div>
          )}
        </section>

        <LockerNoticeCard
          endAt={periodStatusQuery.data?.endAt}
          startAt={periodStatusQuery.data?.startAt}
        />
      </div>

      <LockerSelectionOverlay
        availableCount={activeFloorAvailableCount}
        canApply={canApply}
        canExtend={canExtend}
        currentLocker={currentLocker}
        errorMessage={
          activeFloorError
            ? extractErrorMessage(
                activeFloorError,
                '층별 정보를 불러오지 못했어요.',
              )
            : null
        }
        floor={activeFloor}
        isLoading={lockerLocationDetailQuery.isLoading}
        isPending={isPending}
        lockers={activeFloorLockers}
        onApply={handleApply}
        onAcknowledgeAutoReturnedNotice={handleAutoReturnedNoticeClose}
        onExtend={handleExtend}
        onOpenChange={handleSelectionOpenChange}
        onReturn={handleReturn}
        onSelectLocker={setSelectedLockerId}
        open={isSelectionOpen}
        selectedLockerId={selectedLockerId}
        shouldShowAutoReturnedNotice={hasAutoReturnedNotice}
        totalCount={activeFloorTotalCount}
      />
    </>
  );
};
