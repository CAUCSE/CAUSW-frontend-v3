'use client';

import { useState } from 'react';

import { Close, Dialog, mergeStyles } from '@causw/cds';

import { LockerActionPanel } from '@/features/locker';

import type { LockerMyResponse } from '@/entities/locker';

import { useBreakpoint } from '@/shared/hooks';
import { ActionHeader, ConfirmModal } from '@/shared/ui';

import { type ActiveFloor, type LockerGridItem } from '../model';

import { LockerAutoReturnNoticeModal } from './LockerAutoReturnNoticeModal';
import { LockerPanelContent } from './LockerPanelContent';

interface LockerSelectionOverlayProps {
  availableCount: number;
  canApply: boolean;
  canExtend: boolean;
  currentLocker: LockerMyResponse | null;
  disableAvailableLockers?: boolean;
  errorMessage: string | null;
  floor: ActiveFloor | null;
  isLoading: boolean;
  isPending: boolean;
  lockers: LockerGridItem[];
  onApply: () => void;
  onAcknowledgeAutoReturnedNotice: () => void;
  onExtend: () => void;
  onOpenChange: (open: boolean) => void;
  onReturn: () => void;
  onSelectLocker: (lockerId: string) => void;
  open: boolean;
  selectedLockerId: string | null;
  statusMessage: string | null;
  shouldShowAutoReturnedNotice: boolean;
  totalCount: number;
}

export const LockerSelectionOverlay = ({
  availableCount,
  canApply,
  canExtend,
  currentLocker,
  disableAvailableLockers = false,
  errorMessage,
  floor,
  isLoading,
  isPending,
  lockers,
  onApply,
  onAcknowledgeAutoReturnedNotice,
  onExtend,
  onOpenChange,
  onReturn,
  onSelectLocker,
  open,
  selectedLockerId,
  statusMessage,
  shouldShowAutoReturnedNotice,
  totalCount,
}: LockerSelectionOverlayProps) => {
  const { isMobileSize } = useBreakpoint();
  const [isExtendConfirmOpen, setIsExtendConfirmOpen] = useState(false);

  if (!floor) return null;

  const isCurrentLockerInActiveFloor = Boolean(
    currentLocker?.lockerId &&
      lockers.some((locker) => locker.lockerId === currentLocker.lockerId),
  );

  const panelContent = (
    <LockerPanelContent
      availableCount={availableCount}
      currentLocker={currentLocker}
      disableAvailableLockers={disableAvailableLockers}
      errorMessage={errorMessage}
      floorName={floor.floorName}
      isLoading={isLoading}
      lockers={lockers}
      onSelectLocker={onSelectLocker}
      selectedLockerId={selectedLockerId}
      statusMessage={statusMessage}
      totalCount={totalCount}
    />
  );

  const actionPanel = (
    <div className="flex flex-col gap-4 bg-gray-100">
      <LockerActionPanel
        canApply={canApply}
        canExtend={canExtend}
        hasCurrentLocker={Boolean(currentLocker)}
        hasSelection={selectedLockerId !== null}
        isCurrentLockerInActiveFloor={isCurrentLockerInActiveFloor}
        isPending={isPending}
        onApply={onApply}
        onExtend={() => setIsExtendConfirmOpen(true)}
        onReturn={onReturn}
      />
    </div>
  );

  const handleOverlayOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIsExtendConfirmOpen(false);
    }

    onOpenChange(nextOpen);
  };

  const handleAutoReturnedNoticeOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onAcknowledgeAutoReturnedNotice();
    }
  };

  const handleConfirmExtend = () => {
    void onExtend();
  };

  if (isMobileSize) {
    return (
      <>
        <Dialog open={open} onOpenChange={handleOverlayOpenChange}>
          <Dialog.Content
            className="h-dvh max-h-dvh w-full overflow-hidden rounded-none bg-gray-100 px-0 py-0"
            aria-describedby={undefined}
          >
            <Dialog.Title hidden>{floor.floorName} 사물함 선택</Dialog.Title>
            <div className="flex h-full min-h-0 w-full flex-col">
              <ActionHeader background="gray">
                <ActionHeader.BackButton
                  type="button"
                  onClick={() => handleOverlayOpenChange(false)}
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
        <ConfirmModal
          open={open && isExtendConfirmOpen}
          onOpenChange={setIsExtendConfirmOpen}
          onConfirm={handleConfirmExtend}
          title="연장 시 만료 일시가 늘어납니다."
          titleTypo="subtitle-16-bold"
          cancelText="닫기"
          confirmText="연장하기"
        />
        <LockerAutoReturnNoticeModal
          open={open && shouldShowAutoReturnedNotice}
          onOpenChange={handleAutoReturnedNoticeOpenChange}
        />
      </>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOverlayOpenChange}>
        <Dialog.Content
          width={700}
          className="max-h-[calc(100vh-80px)] overflow-hidden rounded-[1.75rem] bg-gray-100 p-0"
          aria-describedby={undefined}
        >
          <Dialog.Title hidden>{floor.floorName} 사물함 선택</Dialog.Title>
          <button
            type="button"
            onClick={() => handleOverlayOpenChange(false)}
            className="absolute top-7 right-7 z-10 text-gray-600 transition-colors hover:text-gray-700"
            aria-label="사물함 선택 모달 닫기"
          >
            <Close size={24} />
          </button>
          <div className="flex max-h-[calc(100vh-80px)] min-h-0 flex-col">
            <div
              className={mergeStyles(
                'min-h-0 flex-1 overflow-y-auto p-8 pb-6',
                currentLocker ? 'pt-8' : 'pt-10',
              )}
            >
              {panelContent}
            </div>
            <div className="shrink-0 px-8 pt-2 pb-8">{actionPanel}</div>
          </div>
        </Dialog.Content>
      </Dialog>
      <ConfirmModal
        open={open && isExtendConfirmOpen}
        onOpenChange={setIsExtendConfirmOpen}
        onConfirm={handleConfirmExtend}
        title="연장 시 만료 일시가 늘어납니다."
        titleTypo="subtitle-16-bold"
        cancelText="닫기"
        confirmText="연장하기"
      />
      <LockerAutoReturnNoticeModal
        open={open && shouldShowAutoReturnedNotice}
        onOpenChange={handleAutoReturnedNoticeOpenChange}
      />
    </>
  );
};
