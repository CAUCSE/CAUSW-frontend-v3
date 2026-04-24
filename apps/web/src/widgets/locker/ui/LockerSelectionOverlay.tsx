'use client';

import { Dialog } from '@causw/cds';

import { LockerActionPanel } from '@/features/locker';

import type { LockerMyResponse } from '@/entities/locker';

import { useBreakpoint } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';

import { type ActiveFloor, type LockerGridItem } from '../model';

import { LockerPanelContent } from './LockerPanelContent';

interface LockerSelectionOverlayProps {
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
  onExtend: () => void;
  onOpenChange: (open: boolean) => void;
  onReturn: () => void;
  onSelectLocker: (lockerId: string) => void;
  open: boolean;
  selectedLockerId: string | null;
  totalCount: number;
}

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
  onExtend,
  onOpenChange,
  onReturn,
  onSelectLocker,
  open,
  selectedLockerId,
  totalCount,
}: LockerSelectionOverlayProps) => {
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
