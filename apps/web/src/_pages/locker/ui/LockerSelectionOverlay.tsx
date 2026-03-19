'use client';

import type { ReactNode } from 'react';

import {
  Dialog,
  ErrorColored,
  LoadingColored,
  SuccessColored,
  mergeStyles,
} from '@causw/cds';

import type { LockerMyResponse } from '@/entities/locker';

import { useBreakpoint } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';

import {
  getFloorNameFromDisplayName,
  getLockerCellClassName,
  type ActiveFloor,
  type LockerGridItem,
  type LockerToastItem,
  type LockerToastType,
} from '../model';

import { LockerInfoCard } from './LockerInfoCard';

const LockerSelectionGrid = ({
  lockers,
  selectedLockerId,
  onSelect,
}: {
  lockers: LockerGridItem[];
  selectedLockerId: string | null;
  onSelect: (lockerId: string) => void;
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

const LockerToastStack = ({
  toasts,
  onDismiss,
  className,
}: {
  toasts: LockerToastItem[];
  onDismiss: (id: string) => void;
  className?: string;
}) => {
  if (toasts.length === 0) return null;

  const iconMap: Record<LockerToastType, ReactNode> = {
    success: <SuccessColored size={20} />,
    error: <ErrorColored size={20} />,
    loading: <LoadingColored size={20} className="animate-spin" />,
  };

  return (
    <div
      className={mergeStyles(
        'pointer-events-none flex w-full flex-col gap-2',
        className,
      )}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          aria-live="assertive"
          className={mergeStyles(
            'pointer-events-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gray-700 px-0 py-3',
            'text-gray-0 text-center text-base leading-[160%] font-medium tracking-[-0.02rem]',
          )}
          onClick={() => onDismiss(toast.id)}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            {iconMap[toast.type]}
          </span>
          <span className="min-w-0 break-words">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

const LockerPanelContent = ({
  floorName,
  currentLocker,
  selectedLockerId,
  lockers,
  availableCount,
  totalCount,
  isActionAvailable,
  isLoading,
  errorMessage,
  onSelectLocker,
}: {
  floorName: string;
  currentLocker: LockerMyResponse | null;
  selectedLockerId: string | null;
  lockers: LockerGridItem[];
  availableCount: number;
  totalCount: number;
  isActionAvailable: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  onSelectLocker: (lockerId: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-6">
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
            selectedLockerId={selectedLockerId}
            onSelect={onSelectLocker}
          />
        )}
      </section>
    </div>
  );
};

const LockerPanelActions = ({
  hasCurrentLocker,
  isCurrentLockerInActiveFloor,
  canApply,
  canExtend,
  hasSelection,
  isPending,
  onApply,
  onReturn,
  onExtend,
}: {
  hasCurrentLocker: boolean;
  isCurrentLockerInActiveFloor: boolean;
  canApply: boolean;
  canExtend: boolean;
  hasSelection: boolean;
  isPending: boolean;
  onApply: () => void;
  onReturn: () => void;
  onExtend: () => void;
}) => {
  if (isCurrentLockerInActiveFloor) {
    return (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReturn}
          disabled={isPending}
          className={mergeStyles(
            'flex h-[3.25rem] flex-1 items-center justify-center rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-white',
            isPending
              ? 'cursor-not-allowed bg-gray-400'
              : 'cursor-pointer bg-gray-700',
          )}
        >
          반납하기
        </button>
        <button
          type="button"
          onClick={onExtend}
          disabled={!canExtend || isPending}
          className={mergeStyles(
            'flex h-[3.25rem] flex-1 items-center justify-center rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem]',
            canExtend && !isPending
              ? 'cursor-pointer bg-white text-gray-500'
              : 'cursor-not-allowed bg-gray-300 text-white',
          )}
        >
          연장하기
        </button>
      </div>
    );
  }

  if (!canApply) {
    return (
      <button
        type="button"
        disabled
        className="flex h-[3.25rem] w-full cursor-not-allowed items-center justify-center rounded-md bg-gray-300 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-white"
      >
        {hasCurrentLocker ? '반납하기' : '신청하기'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onApply}
      disabled={!hasSelection || isPending}
      className={mergeStyles(
        'flex h-[3.25rem] w-full items-center justify-center rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] transition-colors',
        hasSelection && !isPending
          ? 'cursor-pointer bg-gray-700 text-white'
          : 'cursor-not-allowed bg-gray-300 text-white',
      )}
    >
      {hasCurrentLocker ? '반납하기' : '신청하기'}
    </button>
  );
};

export const LockerSelectionOverlay = ({
  open,
  floor,
  currentLocker,
  selectedLockerId,
  lockers,
  availableCount,
  totalCount,
  canApply,
  canExtend,
  isLoading,
  isPending,
  errorMessage,
  toasts,
  onDismissToast,
  onOpenChange,
  onSelectLocker,
  onApply,
  onReturn,
  onExtend,
}: {
  open: boolean;
  floor: ActiveFloor | null;
  currentLocker: LockerMyResponse | null;
  selectedLockerId: string | null;
  lockers: LockerGridItem[];
  availableCount: number;
  totalCount: number;
  canApply: boolean;
  canExtend: boolean;
  isLoading: boolean;
  isPending: boolean;
  errorMessage: string | null;
  toasts: LockerToastItem[];
  onDismissToast: (id: string) => void;
  onOpenChange: (open: boolean) => void;
  onSelectLocker: (lockerId: string) => void;
  onApply: () => void;
  onReturn: () => void;
  onExtend: () => void;
}) => {
  const { isMobileSize } = useBreakpoint();

  if (!floor) return null;

  const isCurrentLockerInActiveFloor = Boolean(
    currentLocker?.lockerId &&
    lockers.some((locker) => locker.lockerId === currentLocker.lockerId),
  );

  const panelContent = (
    <div className="flex flex-col gap-6 bg-gray-100">
      <LockerPanelContent
        floorName={floor.floorName}
        currentLocker={currentLocker}
        selectedLockerId={selectedLockerId}
        lockers={lockers}
        availableCount={availableCount}
        totalCount={totalCount}
        isActionAvailable={canApply || canExtend}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onSelectLocker={onSelectLocker}
      />
    </div>
  );

  const actionPanel = (
    <div className="flex flex-col gap-4 bg-gray-100">
      <LockerToastStack
        toasts={toasts}
        onDismiss={onDismissToast}
        className="mx-auto w-full max-w-[20rem]"
      />
      <LockerPanelActions
        hasCurrentLocker={Boolean(currentLocker)}
        isCurrentLockerInActiveFloor={isCurrentLockerInActiveFloor}
        canApply={canApply}
        canExtend={canExtend}
        hasSelection={selectedLockerId !== null}
        isPending={isPending}
        onApply={onApply}
        onReturn={onReturn}
        onExtend={onExtend}
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
