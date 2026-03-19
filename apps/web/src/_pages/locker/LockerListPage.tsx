'use client';

import { ActionHeader } from '@/shared/ui';
import { extractErrorMessage } from '@/shared/utils';

import { useLockerListPage } from './model';
import {
  FloorSummaryCard,
  LockerInfoCard,
  LockerNoticeCard,
  LockerSelectionOverlay,
} from './ui';

export const LockerListPage = () => {
  const {
    activeFloor,
    currentLocker,
    locationList,
    selectedLockerId,
    activeFloorLockers,
    activeFloorAvailableCount,
    activeFloorTotalCount,
    canApply,
    canExtend,
    isPending,
    isSelectionOpen,
    initialError,
    activeFloorError,
    periodStatusQuery,
    myLockerQuery,
    lockerLocationsQuery,
    lockerLocationDetailQuery,
    lockerToasts,
    dismissLockerToast,
    handleSelectionOpenChange,
    handleOpenFloor,
    handleApply,
    handleReturn,
    handleExtend,
    setUserSelectedLockerId,
  } = useLockerListPage();

  return (
    <div className="min-h-full bg-gray-100">
      <ActionHeader
        background="gray"
        className="tablet:mx-auto tablet:max-w-[900px] tablet:px-8"
      >
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>

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
                  summary={summary}
                  onOpen={handleOpenFloor}
                />
              ))}
            </div>
          )}
        </section>

        <LockerNoticeCard
          phase={periodStatusQuery.data?.phase}
          startAt={periodStatusQuery.data?.startAt}
          endAt={periodStatusQuery.data?.endAt}
        />
      </div>

      <LockerSelectionOverlay
        open={isSelectionOpen}
        floor={activeFloor}
        currentLocker={currentLocker}
        selectedLockerId={selectedLockerId}
        lockers={activeFloorLockers}
        availableCount={activeFloorAvailableCount}
        totalCount={activeFloorTotalCount}
        canApply={canApply}
        canExtend={canExtend}
        isLoading={lockerLocationDetailQuery.isLoading}
        isPending={isPending}
        errorMessage={
          activeFloorError
            ? extractErrorMessage(
                activeFloorError,
                '층 정보를 불러오지 못했어요.',
              )
            : null
        }
        toasts={lockerToasts}
        onDismissToast={dismissLockerToast}
        onOpenChange={handleSelectionOpenChange}
        onSelectLocker={setUserSelectedLockerId}
        onApply={handleApply}
        onReturn={handleReturn}
        onExtend={handleExtend}
      />
    </div>
  );
};
