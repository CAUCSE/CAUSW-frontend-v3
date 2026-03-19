'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import {
  Dialog,
  ErrorColored,
  LoadingColored,
  SuccessColored,
  mergeStyles,
} from '@causw/cds';

import type {
  LockerDetailItem,
  LockerLocationSummary,
  LockerMyResponse,
  LockerPhase,
} from '@/entities/locker';
import {
  useExtendLockerMutation,
  useLockerLocationDetail,
  useLockerLocations,
  useLockerPeriodStatus,
  useMyLocker,
  useRegisterLockerMutation,
  useReturnLockerMutation,
} from '@/entities/locker';

import { useBreakpoint } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';
import { extractErrorMessage } from '@/shared/utils';

type LockerStatus = 'available' | 'disabled' | 'mine';

type ActiveFloor = {
  locationId: string;
  floorName: string;
};

type LockerGridItem = LockerDetailItem & {
  lockerNumber: number;
  viewStatus: LockerStatus;
};

type LockerToastType = 'success' | 'error' | 'loading';

type LockerToastItem = {
  id: string;
  message: string;
  type: LockerToastType;
};

const PHASE_LABEL: Record<LockerPhase, string> = {
  READY: '신청 준비',
  APPLY: '신청 기간',
  EXTEND: '연장 기간',
  CLOSED: '마감',
};

function formatDateTime(value?: string | null) {
  if (!value) return '-';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

function getPeriodLabel(startAt?: string, endAt?: string) {
  if (!startAt || !endAt) return '기간 정보가 없어요.';
  return `${formatDateTime(startAt)} - ${formatDateTime(endAt)}`;
}

function getFloorNameFromDisplayName(displayName?: string | null) {
  return displayName?.split(' ')[0] ?? null;
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

function getLockerViewStatus(
  locker: LockerDetailItem,
  currentLockerId: string | null,
): LockerStatus {
  if (locker.lockerId === currentLockerId || locker.status === 'MINE') {
    return 'mine';
  }

  if (locker.status === 'AVAILABLE') {
    return 'available';
  }

  return 'disabled';
}

function LockerSelectionGrid({
  lockers,
  selectedLockerId,
  onSelect,
}: {
  lockers: LockerGridItem[];
  selectedLockerId: string | null;
  onSelect: (lockerId: string) => void;
}) {
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

function LockerInfoCard({ assignment }: { assignment: LockerMyResponse }) {
  return (
    <div className="rounded-lg bg-white p-5">
      <div className="flex items-center justify-between text-base tracking-[-0.02rem]">
        <p className="font-medium text-gray-500">현재 사물함</p>
        <p className="font-bold text-gray-700">
          {assignment.displayName ?? '없음'}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between text-base tracking-[-0.02rem]">
        <p className="font-medium text-gray-500">만료 일시</p>
        <p className="font-bold text-gray-700">
          {formatDateTime(assignment.expiredAt)}
        </p>
      </div>
    </div>
  );
}

function LockerNoticeCard({
  phase,
  startAt,
  endAt,
}: {
  phase?: LockerPhase;
  startAt?: string;
  endAt?: string;
}) {
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
          <p className="font-medium text-gray-500">현재 상태</p>
          <p className="font-bold text-gray-700">
            {phase ? PHASE_LABEL[phase] : '불러오는 중'}
          </p>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 text-base tracking-[-0.02rem]">
          <p className="font-medium text-gray-500">적용 기간</p>
          <p className="text-right font-bold text-gray-700">
            {getPeriodLabel(startAt, endAt)}
          </p>
        </div>
      </div>
    </section>
  );
}

function LockerToastStack({
  toasts,
  onDismiss,
  className,
}: {
  toasts: LockerToastItem[];
  onDismiss: (id: string) => void;
  className?: string;
}) {
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
}

function FloorSummaryCard({
  summary,
  onOpen,
}: {
  summary: LockerLocationSummary;
  onOpen: (floor: LockerLocationSummary) => void;
}) {
  const progressRatio = Math.min(
    summary.availableCount / summary.totalCount,
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
}

function LockerPanelContent({
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
}) {
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
}

function LockerPanelActions({
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
}) {
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
}

function LockerSelectionOverlay({
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
}) {
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
}

export function LockerListPage() {
  const [activeFloor, setActiveFloor] = useState<ActiveFloor | null>(null);
  const [userSelectedLockerId, setUserSelectedLockerId] = useState<
    string | null
  >(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [lockerToasts, setLockerToasts] = useState<LockerToastItem[]>([]);
  const toastTimerMapRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const periodStatusQuery = useLockerPeriodStatus();
  const myLockerQuery = useMyLocker();
  const lockerLocationsQuery = useLockerLocations();
  const lockerLocationDetailQuery = useLockerLocationDetail(
    activeFloor?.locationId ?? null,
  );

  const registerLockerMutation = useRegisterLockerMutation();
  const returnLockerMutation = useReturnLockerMutation();
  const extendLockerMutation = useExtendLockerMutation();

  const currentLocker = myLockerQuery.data?.hasLocker
    ? myLockerQuery.data
    : null;
  const locationList = lockerLocationsQuery.data?.floors ?? [];
  const activeFloorSummary =
    locationList.find(
      (floor) => floor.locationId === activeFloor?.locationId,
    ) ?? null;
  const activeFloorDetail = lockerLocationDetailQuery.data;
  const currentLockerInActiveFloor =
    activeFloorDetail?.lockers.find(
      (locker) => locker.lockerId === currentLocker?.lockerId,
    ) ?? null;
  const selectedLockerId =
    userSelectedLockerId ?? currentLockerInActiveFloor?.lockerId ?? null;
  const activeFloorLockers: LockerGridItem[] = (
    activeFloorDetail?.lockers ?? []
  )
    .slice()
    .sort((left, right) => Number(left.number) - Number(right.number))
    .map((locker) => ({
      ...locker,
      lockerNumber: Number(locker.number),
      viewStatus: getLockerViewStatus(locker, currentLocker?.lockerId ?? null),
    }));
  const activeFloorAvailableCount =
    activeFloorSummary?.availableCount ??
    activeFloorDetail?.summary.availableCount ??
    activeFloorLockers.filter(
      (locker) =>
        locker.viewStatus === 'available' || locker.viewStatus === 'mine',
    ).length;
  const activeFloorTotalCount =
    activeFloorSummary?.totalCount ??
    activeFloorDetail?.summary.totalCount ??
    activeFloorLockers.length;
  const canApply = activeFloorDetail?.currentPolicy.canApply ?? false;
  const canExtend = activeFloorDetail?.currentPolicy.canExtend ?? false;
  const isPending =
    registerLockerMutation.isPending ||
    returnLockerMutation.isPending ||
    extendLockerMutation.isPending;

  const dismissLockerToast = (toastId: string) => {
    const timer = toastTimerMapRef.current.get(toastId);
    if (timer) {
      clearTimeout(timer);
      toastTimerMapRef.current.delete(toastId);
    }

    setLockerToasts((current) =>
      current.filter((toast) => toast.id !== toastId),
    );
  };

  const showLockerToast = (
    message: string,
    type: LockerToastType,
    duration = type === 'loading' ? Infinity : 3000,
  ) => {
    const toastId = `${Date.now()}-${Math.random()}`;

    setLockerToasts((current) =>
      [...current, { id: toastId, message, type }].slice(-3),
    );

    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        dismissLockerToast(toastId);
      }, duration);

      toastTimerMapRef.current.set(toastId, timer);
    }

    return toastId;
  };

  useEffect(() => {
    return () => {
      toastTimerMapRef.current.forEach((timer) => clearTimeout(timer));
      toastTimerMapRef.current.clear();
    };
  }, []);

  const handleOpenFloor = (floor: LockerLocationSummary) => {
    setActiveFloor({
      locationId: floor.locationId,
      floorName: floor.floorName,
    });
    setUserSelectedLockerId(null);
    setIsSelectionOpen(true);
  };

  const handleApply = async () => {
    if (!selectedLockerId) {
      showLockerToast('신청할 사물함을 선택해 주세요.', 'error');
      return;
    }

    const loadingToastId = showLockerToast(
      '사물함 등록 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await registerLockerMutation.mutateAsync(selectedLockerId);
      dismissLockerToast(loadingToastId);
      showLockerToast('사물함 등록이 완료되었습니다.', 'success');
      setIsSelectionOpen(false);
    } catch (error) {
      dismissLockerToast(loadingToastId);
      showLockerToast(
        extractErrorMessage(error, '사물함 등록에 실패했습니다.'),
        'error',
      );
    }
  };

  const handleReturn = async () => {
    if (!currentLocker?.lockerId) return;

    const loadingToastId = showLockerToast(
      '사물함 반납 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await returnLockerMutation.mutateAsync(currentLocker.lockerId);
      dismissLockerToast(loadingToastId);
      showLockerToast('사물함 반납이 완료되었습니다.', 'success');
      setIsSelectionOpen(false);
    } catch (error) {
      dismissLockerToast(loadingToastId);
      showLockerToast(
        extractErrorMessage(error, '사물함 반납에 실패했습니다.'),
        'error',
      );
    }
  };

  const handleExtend = async () => {
    if (!currentLocker?.lockerId) return;

    const loadingToastId = showLockerToast(
      '사물함 연장 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await extendLockerMutation.mutateAsync(currentLocker.lockerId);
      dismissLockerToast(loadingToastId);
      showLockerToast('사물함 연장이 완료되었습니다.', 'success');
      setIsSelectionOpen(false);
    } catch (error) {
      dismissLockerToast(loadingToastId);
      showLockerToast(
        extractErrorMessage(error, '사물함 연장에 실패했습니다.'),
        'error',
      );
    }
  };

  const initialError =
    periodStatusQuery.error ??
    myLockerQuery.error ??
    lockerLocationsQuery.error;
  const activeFloorError = lockerLocationDetailQuery.error;
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
        onOpenChange={setIsSelectionOpen}
        onSelectLocker={setUserSelectedLockerId}
        onApply={handleApply}
        onReturn={handleReturn}
        onExtend={handleExtend}
      />
    </div>
  );
}
