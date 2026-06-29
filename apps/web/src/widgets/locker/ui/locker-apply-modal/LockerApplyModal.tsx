'use client';

import { Dialog, VStack } from '@causw/cds';

import {
  LockerAvailabilitySummary,
  LockerStatusLegend,
  MyLockerInfoSection,
} from '@/entities/locker';

import { useBreakpoint } from '@/shared/hooks';

import { lockerApplyModalDefaultCss } from '../../config';
import { useLockerApplication } from '../../model';
import { LockerApplyModalActionButtons } from '../locker-apply-modal-action-buttons';
import { LockerApplyModalHeader } from '../locker-apply-modal-header';
import { LockerSelectionGrid } from '../locker-selection-grid';

interface LockerApplyModalProps {
  locationId: string;
}

export const LockerApplyModal = ({ locationId }: LockerApplyModalProps) => {
  const { isMobileSize } = useBreakpoint();

  const {
    lockerLocation,
    myLocker,
    selectedLockerId,
    selectLocker,
    apply,
    returnMyLocker,
    extendMyLocker,
    close,
  } = useLockerApplication({ locationId });

  const handleCloseModal = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  return (
    <Dialog open onOpenChange={handleCloseModal}>
      <Dialog.Content
        fullscreen={isMobileSize}
        onPointerDownOutside={(e) => {
          e.preventDefault();
          handleCloseModal(false);
        }}
        className={lockerApplyModalDefaultCss(isMobileSize)}
      >
        <Dialog.Title className="sr-only">사물함 신청하기</Dialog.Title>
        <Dialog.Description className="sr-only">
          사물함 신청하기
        </Dialog.Description>
        <VStack gap="lg" className="min-h-0 w-full flex-1">
          <LockerApplyModalHeader
            locationName={lockerLocation.floor.locationName}
          />
          <MyLockerInfoSection hideWhenEmpty />
          <VStack gap="lg" className="min-h-0 flex-1">
            <VStack gap="none" className="gap-3 px-1">
              <LockerAvailabilitySummary
                availableCount={lockerLocation.summary.availableCount}
                totalCount={lockerLocation.summary.totalCount}
              />
              <LockerStatusLegend />
            </VStack>
            <LockerSelectionGrid
              lockers={lockerLocation.lockers}
              hasLocker={myLocker.hasLocker}
              canChangeLockerState={
                lockerLocation.currentPolicy.canApply ||
                lockerLocation.currentPolicy.canExtend
              }
              selectedLockerId={selectedLockerId}
              onSelectLocker={selectLocker}
            />
          </VStack>
          <LockerApplyModalActionButtons
            myLocker={myLocker}
            selectedLockerId={selectedLockerId}
            canApply={lockerLocation.currentPolicy.canApply}
            canExtend={lockerLocation.currentPolicy.canExtend}
            expiredAt={lockerLocation.currentPolicy.expireDate}
            handleRegisterLocker={apply}
            handleReturnLocker={returnMyLocker}
            handleExtendLocker={extendMyLocker}
          />
        </VStack>
      </Dialog.Content>
    </Dialog>
  );
};
