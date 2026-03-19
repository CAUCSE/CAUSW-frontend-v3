'use client';

import { Dialog, mergeStyles } from '@causw/cds';

import {
  LockerActionPanel,
  LockerToastStack,
  type LockerToastItem,
} from '@/features/locker-control';

import type { LockerMyResponse } from '@/entities/locker';

import { useBreakpoint } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';

import {
  getFloorNameFromDisplayName,
  getLockerCellClassName,
  type ActiveFloor,
  type LockerGridItem,
} from '../model';

import { LockerInfoCard } from './LockerInfoCard';

const LockerSelectionGrid = ({
  lockers,
  onSelect,
  selectedLockerId,
}: {
  lockers: LockerGridItem[];
  onSelect: (lockerId: string) => void;
  selectedLockerId: string | null;
}) => {
  return (
    <div className="desktop:gap-3 grid grid-cols-5 gap-2">
      {lockers.map((locker) => {
        const isSelected = selectedLockerId === locker.lockerId;
        const isClickable = locker.viewStatus === 'available';

        return (
          <button
            key={locker.lockerId}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onSelect(locker.lockerId)}
            className={mergeStyles(
              'flex h-[4.3125rem] items-center justify-center rounded-md text-lg tracking-[-0.0225rem] transition-colors',
              isClickable ? 'cursor-pointer' : 'cursor-not-allowed',
              getLockerCellClassName(locker.viewStatus, isSelected),
            )}
          >
            {locker.lockerNumber}
          </button>
        );
      })}
    </div>
  );
};

const LockerLegend = () => {
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
};

const LockerPanelContent = ({
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
}: {
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
}) => {
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

export const LockerSelectionOverlay = ({
  availableCount,
  canApply,
  canExtend,
  currentLocker,
  errorMessage,
  floor,
  isLoading,
  isPending,
  lockers,
  onApply,
  onDismissToast,
  onExtend,
  onOpenChange,
  onReturn,
  onSelectLocker,
  open,
  selectedLockerId,
  toasts,
  totalCount,
}: {
  availableCount: number;
  canApply: boolean;
  canExtend: boolean;
  currentLocker: LockerMyResponse | null;
  errorMessage: string | null;
  floor: ActiveFloor | null;
  isLoading: boolean;
  isPending: boolean;
  lockers: LockerGridItem[];
  onApply: () => void;
  onDismissToast: (id: string) => void;
  onExtend: () => void;
  onOpenChange: (open: boolean) => void;
  onReturn: () => void;
  onSelectLocker: (lockerId: string) => void;
  open: boolean;
  selectedLockerId: string | null;
  toasts: LockerToastItem[];
  totalCount: number;
}) => {
  const { isMobileSize } = useBreakpoint();

  if (!floor) return null;

  const isCurrentLockerInActiveFloor = Boolean(
    currentLocker?.lockerId &&
    lockers.some((locker) => locker.lockerId === currentLocker.lockerId),
  );

  const panelContent = (
    <LockerPanelContent
      availableCount={availableCount}
      currentLocker={currentLocker}
      errorMessage={errorMessage}
      floorName={floor.floorName}
      isActionAvailable={canApply || canExtend}
      isLoading={isLoading}
      lockers={lockers}
      onSelectLocker={onSelectLocker}
      selectedLockerId={selectedLockerId}
      totalCount={totalCount}
    />
  );

  const actionPanel = (
    <div className="flex flex-col gap-4 bg-gray-100">
      <LockerToastStack
        className="mx-auto w-full max-w-[20rem]"
        onDismiss={onDismissToast}
        toasts={toasts}
      />
      <LockerActionPanel
        canApply={canApply}
        canExtend={canExtend}
        hasCurrentLocker={Boolean(currentLocker)}
        hasSelection={selectedLockerId !== null}
        isCurrentLockerInActiveFloor={isCurrentLockerInActiveFloor}
        isPending={isPending}
        onApply={onApply}
        onExtend={onExtend}
        onReturn={onReturn}
      />
    </div>
  );

  if (isMobileSize) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <Dialog.Content
          className="h-dvh max-h-dvh w-full overflow-hidden rounded-none bg-gray-100 px-0 py-0"
          aria-describedby={undefined}
        >
          <Dialog.Title hidden>{floor.floorName} 사물함 선택</Dialog.Title>
          <div className="flex h-full min-h-0 w-full flex-col">
            <ActionHeader background="gray">
              <ActionHeader.BackButton
                type="button"
                onClick={() => onOpenChange(false)}
              >
                뒤로
              </ActionHeader.BackButton>
            </ActionHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 pb-6">
              {panelContent}
            </div>
            <div className="shrink-0 px-5 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
              {actionPanel}
            </div>
          </div>
        </Dialog.Content>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        width={700}
        className="max-h-[calc(100vh-80px)] overflow-hidden rounded-[1.75rem] bg-gray-100 p-0"
        aria-describedby={undefined}
      >
        <Dialog.Title hidden>{floor.floorName} 사물함 선택</Dialog.Title>
        <div className="flex max-h-[calc(100vh-80px)] min-h-0 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-8 pb-6">
            {panelContent}
          </div>
          <div className="shrink-0 px-8 pt-2 pb-8">{actionPanel}</div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
