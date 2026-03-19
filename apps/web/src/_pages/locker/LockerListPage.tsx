'use client';

import { useState } from 'react';

import { BottomSheet, Dialog, mergeStyles } from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks';
import { toast } from '@/shared/model';
import { ActionHeader } from '@/shared/ui';

type FloorId = '2' | '3' | '4';

type FloorSummary = {
  floorId: FloorId;
  availableCount: number;
  totalCount: number;
};

type LockerAssignment = {
  floorId: FloorId;
  lockerNumber: number;
  expiresAt: string;
};

type LockerStatus = 'available' | 'disabled' | 'mine';

type LockerCell = {
  lockerNumber: number;
  status: LockerStatus;
  hidden?: boolean;
};

const FLOOR_SUMMARIES: FloorSummary[] = [
  { floorId: '2', availableCount: 68, totalCount: 136 },
  { floorId: '3', availableCount: 168, totalCount: 166 },
  { floorId: '4', availableCount: 31, totalCount: 32 },
];

const APPLICATION_TIME_LABEL = '오전 00:00 - 오후 00:00';
const FLOOR_LOCKER_COUNT = 32;
const CLOSED_PERIOD_FLOOR: FloorId = '4';

function getInitialLockerCells(
  floorId: FloorId,
  currentLocker: LockerAssignment | null,
): LockerCell[] {
  const lockers: LockerCell[] = Array.from(
    { length: FLOOR_LOCKER_COUNT },
    (_, index): LockerCell => {
      const lockerNumber = index + 1;
      const isMine =
        currentLocker?.floorId === floorId &&
        currentLocker.lockerNumber === lockerNumber;

      if (isMine) {
        return { lockerNumber, status: 'mine' };
      }

      const disabledByFloor: Record<FloorId, number[]> = {
        '2': [4, 11, 18, 27],
        '3': [2, 14, 21],
        '4': [19],
      };

      return {
        lockerNumber,
        status: disabledByFloor[floorId].includes(lockerNumber)
          ? 'disabled'
          : 'available',
      };
    },
  );

  const hiddenLockers: LockerCell[] =
    floorId === '4'
      ? [
          { lockerNumber: 33, status: 'available', hidden: true },
          { lockerNumber: 34, status: 'available', hidden: true },
          { lockerNumber: 35, status: 'available', hidden: true },
        ]
      : [];

  return lockers.concat(hiddenLockers);
}

function getSummaryActionLabel(
  floorId: FloorId,
  currentLocker: LockerAssignment | null,
) {
  if (!currentLocker) return '사물함 신청하기';
  return currentLocker.floorId === floorId
    ? '사물함 확인하기'
    : '사물함 현황 보기';
}

function getLockerCellClassName(status: LockerStatus, isSelected: boolean) {
  if (status === 'mine' || isSelected) {
    return 'bg-blue-500 text-gray-50 font-bold';
  }

  if (status === 'disabled') {
    return 'bg-gray-200 text-gray-300';
  }

  return 'bg-white text-gray-700';
}

function LockerSelectionGrid({
  lockers,
  selectedLockerNumber,
  onSelect,
}: {
  lockers: LockerCell[];
  selectedLockerNumber: number | null;
  onSelect: (lockerNumber: number) => void;
}) {
  return (
    <div className="desktop:gap-3 grid grid-cols-5 gap-2">
      {lockers.map((locker) => {
        const isSelected = selectedLockerNumber === locker.lockerNumber;
        const isClickable = locker.status === 'available';

        return (
          <button
            key={`${locker.lockerNumber}-${locker.hidden ? 'hidden' : 'shown'}`}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onSelect(locker.lockerNumber)}
            className={mergeStyles(
              'flex h-[4.3125rem] items-center justify-center rounded-md text-lg tracking-[-0.0225rem] transition-colors',
              getLockerCellClassName(locker.status, isSelected),
              locker.hidden ? 'pointer-events-none opacity-0' : '',
            )}
          >
            {locker.lockerNumber}
          </button>
        );
      })}
    </div>
  );
}

function LockerLegend() {
  const items = [
    { label: '선택 불가', className: 'bg-gray-300' },
    { label: '선택 가능', className: 'border border-gray-300 bg-white' },
    { label: '내 사물함', className: 'bg-blue-500' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            className={mergeStyles(
              'h-[1.125rem] w-[1.125rem] rounded',
              item.className,
            )}
          />
          <span className="text-sm font-medium tracking-[-0.0175rem] text-gray-500">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function LockerInfoCard({ assignment }: { assignment: LockerAssignment }) {
  return (
    <div className="rounded-lg bg-white p-5">
      <div className="flex items-center justify-between text-base tracking-[-0.02rem]">
        <p className="font-medium text-gray-500">현재 사물함</p>
        <p className="font-bold text-gray-700">
          {assignment.floorId}층 {assignment.lockerNumber}번
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between text-base tracking-[-0.02rem]">
        <p className="font-medium text-gray-500">만료 일시</p>
        <p className="font-bold text-gray-700">{assignment.expiresAt}</p>
      </div>
    </div>
  );
}

function LockerNoticeCard() {
  return (
    <section className="flex flex-col gap-[0.625rem]">
      <div className="flex items-center gap-1 px-1">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 text-[0.625rem] font-bold text-white">
          i
        </span>
        <p className="text-base font-bold tracking-[-0.02rem] text-gray-700">
          사물함 기간 안내
        </p>
      </div>
      <div className="rounded-lg bg-white p-5">
        <div className="flex items-center justify-between text-base tracking-[-0.02rem]">
          <p className="font-medium text-gray-500">신청기간</p>
          <p className="font-bold text-gray-700">{APPLICATION_TIME_LABEL}</p>
        </div>
      </div>
    </section>
  );
}

function FloorSummaryCard({
  summary,
  currentLocker,
  onOpen,
}: {
  summary: FloorSummary;
  currentLocker: LockerAssignment | null;
  onOpen: (floorId: FloorId) => void;
}) {
  const progressRatio = Math.min(
    summary.availableCount / summary.totalCount,
    1,
  );

  return (
    <article className="rounded-md bg-white p-4">
      <div className="flex items-end justify-between">
        <h3 className="text-lg font-bold tracking-[-0.0225rem] text-gray-700">
          {summary.floorId}층
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
        onClick={() => onOpen(summary.floorId)}
        className="mt-4 flex h-[3.25rem] w-full items-center justify-center rounded-lg bg-blue-100 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-blue-700"
      >
        {getSummaryActionLabel(summary.floorId, currentLocker)}
      </button>
    </article>
  );
}

function LockerPanelContent({
  floorId,
  currentLocker,
  selectedLockerNumber,
  lockers,
  isApplicationPeriod,
  onSelectLocker,
}: {
  floorId: FloorId;
  currentLocker: LockerAssignment | null;
  selectedLockerNumber: number | null;
  lockers: LockerCell[];
  isApplicationPeriod: boolean;
  onSelectLocker: (lockerNumber: number) => void;
}) {
  const availableCount = lockers.filter(
    (locker) => locker.status === 'available' || locker.status === 'mine',
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="px-1">
        <h2 className="text-[1.375rem] font-bold tracking-[-0.0275rem] text-gray-700">
          {floorId}층
        </h2>
      </div>

      {currentLocker && currentLocker.floorId === floorId && (
        <LockerInfoCard assignment={currentLocker} />
      )}

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 px-1">
          <p className="text-lg font-bold tracking-[-0.0225rem] text-gray-700">
            {isApplicationPeriod ? (
              <>
                잔여 <span className="text-blue-700">{availableCount}개</span> /
                전체 {FLOOR_LOCKER_COUNT}개
              </>
            ) : (
              '사물함 신청기간이 아니에요.'
            )}
          </p>
          <LockerLegend />
        </div>

        <LockerSelectionGrid
          lockers={lockers}
          selectedLockerNumber={selectedLockerNumber}
          onSelect={onSelectLocker}
        />
      </section>
    </div>
  );
}

function LockerPanelActions({
  currentLocker,
  isApplicationPeriod,
  hasSelection,
  onApply,
  onReturn,
  onExtend,
}: {
  currentLocker: LockerAssignment | null;
  isApplicationPeriod: boolean;
  hasSelection: boolean;
  onApply: () => void;
  onReturn: () => void;
  onExtend: () => void;
}) {
  if (!isApplicationPeriod && !currentLocker) {
    return (
      <button
        type="button"
        disabled
        className="flex h-[3.25rem] w-full items-center justify-center rounded-md bg-gray-300 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-white"
      >
        사물함 신청하기
      </button>
    );
  }

  if (currentLocker) {
    return (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReturn}
          className="flex h-[3.25rem] flex-1 items-center justify-center rounded-md bg-gray-700 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-white"
        >
          반납하기
        </button>
        <button
          type="button"
          onClick={onExtend}
          className="flex h-[3.25rem] flex-1 items-center justify-center rounded-md bg-white px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-gray-500"
        >
          연장하기
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onApply}
      className={mergeStyles(
        'flex h-[3.25rem] w-full items-center justify-center rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] transition-colors',
        hasSelection ? 'bg-gray-700 text-white' : 'bg-gray-300 text-white',
      )}
    >
      사물함 신청하기
    </button>
  );
}

function LockerSelectionOverlay({
  open,
  floorId,
  currentLocker,
  selectedLockerNumber,
  lockers,
  isApplicationPeriod,
  onOpenChange,
  onSelectLocker,
  onApply,
  onReturn,
  onExtend,
}: {
  open: boolean;
  floorId: FloorId | null;
  currentLocker: LockerAssignment | null;
  selectedLockerNumber: number | null;
  lockers: LockerCell[];
  isApplicationPeriod: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectLocker: (lockerNumber: number) => void;
  onApply: () => void;
  onReturn: () => void;
  onExtend: () => void;
}) {
  const { isMobileSize } = useBreakpoint();

  if (!floorId) return null;

  const content = (
    <div className="flex flex-col gap-6 bg-gray-100">
      <LockerPanelContent
        floorId={floorId}
        currentLocker={currentLocker}
        selectedLockerNumber={selectedLockerNumber}
        lockers={lockers}
        isApplicationPeriod={isApplicationPeriod}
        onSelectLocker={onSelectLocker}
      />
      <LockerPanelActions
        currentLocker={currentLocker}
        isApplicationPeriod={isApplicationPeriod}
        hasSelection={selectedLockerNumber !== null}
        onApply={onApply}
        onReturn={onReturn}
        onExtend={onExtend}
      />
    </div>
  );

  if (isMobileSize) {
    return (
      <BottomSheet open={open} onOpenChange={onOpenChange} headerAlign="left">
        <BottomSheet.Header className="hidden" title={`${floorId}층`} />
        <BottomSheet.Content className="z-modal bg-gray-100 px-5 pt-7 pb-6">
          {content}
        </BottomSheet.Content>
      </BottomSheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        width={700}
        className="max-h-[calc(100vh-80px)] overflow-y-auto rounded-[1.75rem] bg-gray-100 p-8"
        aria-describedby={undefined}
      >
        <Dialog.Title hidden>{floorId}층 사물함 선택</Dialog.Title>
        {content}
      </Dialog.Content>
    </Dialog>
  );
}

export function LockerListPage() {
  const [currentLocker, setCurrentLocker] = useState<LockerAssignment | null>(
    null,
  );
  const [activeFloorId, setActiveFloorId] = useState<FloorId | null>(null);
  const [selectedLockerNumber, setSelectedLockerNumber] = useState<
    number | null
  >(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);

  const isApplicationPeriod = activeFloorId
    ? activeFloorId !== CLOSED_PERIOD_FLOOR
    : true;

  const activeLockers = activeFloorId
    ? getInitialLockerCells(activeFloorId, currentLocker)
    : [];

  const handleOpenFloor = (floorId: FloorId) => {
    setActiveFloorId(floorId);
    setSelectedLockerNumber(
      currentLocker?.floorId === floorId ? currentLocker.lockerNumber : null,
    );
    setIsSelectionOpen(true);
  };

  const handleApply = () => {
    if (!activeFloorId || !selectedLockerNumber) {
      toast.error('신청할 사물함을 선택해 주세요.');
      return;
    }

    setCurrentLocker({
      floorId: activeFloorId,
      lockerNumber: selectedLockerNumber,
      expiresAt: '2025-09-05 23:59',
    });
    setSelectedLockerNumber(null);
    setIsSelectionOpen(false);
    toast.success(
      `사물함 신청이 완료됐어요. ${activeFloorId}층 ${selectedLockerNumber}번`,
    );
  };

  const handleReturn = () => {
    if (!currentLocker) return;

    const returnedLocker = `${currentLocker.floorId}층 ${currentLocker.lockerNumber}번`;
    setCurrentLocker(null);
    setSelectedLockerNumber(null);
    setIsSelectionOpen(false);
    toast.success(`${returnedLocker} 사물함을 반납했어요.`);
  };

  const handleExtend = () => {
    if (!currentLocker) return;

    setCurrentLocker({
      ...currentLocker,
      expiresAt: '2025-10-05 23:59',
    });
    setSelectedLockerNumber(currentLocker.lockerNumber);
    setIsSelectionOpen(false);
    toast.success('사물함 사용 기간을 연장했어요.');
  };

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

          <div className="rounded-lg bg-white p-5">
            {currentLocker ? (
              <>
                <div className="flex items-center justify-between text-base tracking-[-0.02rem]">
                  <p className="font-medium text-gray-500">현재 사물함</p>
                  <p className="font-bold text-gray-700">
                    {currentLocker.floorId}층 {currentLocker.lockerNumber}번
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between text-base tracking-[-0.02rem]">
                  <p className="font-medium text-gray-500">만료 일시</p>
                  <p className="font-bold text-gray-700">
                    {currentLocker.expiresAt}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between text-base tracking-[-0.02rem]">
                <p className="font-medium text-gray-500">현재 사물함</p>
                <p className="font-bold text-gray-700">없음</p>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="px-1">
            <p className="text-lg font-bold tracking-[-0.0225rem] text-gray-700">
              잔여 <span className="text-blue-700">332개</span> / 전체 336개
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FLOOR_SUMMARIES.map((summary) => (
              <FloorSummaryCard
                key={summary.floorId}
                summary={summary}
                currentLocker={currentLocker}
                onOpen={handleOpenFloor}
              />
            ))}
          </div>
        </section>

        <LockerNoticeCard />
      </div>

      <LockerSelectionOverlay
        open={isSelectionOpen}
        floorId={activeFloorId}
        currentLocker={currentLocker}
        selectedLockerNumber={selectedLockerNumber}
        lockers={activeLockers}
        isApplicationPeriod={isApplicationPeriod}
        onOpenChange={setIsSelectionOpen}
        onSelectLocker={setSelectedLockerNumber}
        onApply={handleApply}
        onReturn={handleReturn}
        onExtend={handleExtend}
      />
    </div>
  );
}
