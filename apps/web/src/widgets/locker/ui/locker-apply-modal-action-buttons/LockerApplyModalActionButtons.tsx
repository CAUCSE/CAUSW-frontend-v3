'use client';

import { CTAButton, HStack } from '@causw/cds';

import { type GetMyLockerResponseDto } from '@/entities/locker';

import { LockerExtensionDialog } from '../locker-extension-dialog';

interface LockerApplyModalActionButtonsProps {
  myLocker: GetMyLockerResponseDto;
  selectedLockerId: string | null;
  canApply?: boolean;
  canExtend?: boolean;
  expiredAt: string | null;
  handleRegisterLocker: () => void;
  handleReturnLocker: (lockerId: string | null) => void;
  handleExtendLocker: (lockerId: string | null) => void;
}

export const LockerApplyModalActionButtons = ({
  myLocker,
  selectedLockerId,
  canApply = false,
  canExtend = false,
  expiredAt,
  handleRegisterLocker,
  handleReturnLocker,
  handleExtendLocker,
}: LockerApplyModalActionButtonsProps) => {
  const canChangeLockerState = canApply || canExtend;

  if (!myLocker.hasLocker || !canChangeLockerState) {
    return (
      <CTAButton
        color="dark"
        className="w-full"
        disabled={!selectedLockerId}
        onClick={handleRegisterLocker}
      >
        신청하기
      </CTAButton>
    );
  }

  return (
    <HStack gap="sm" align="center">
      <CTAButton
        color="dark"
        className="flex-1"
        onClick={() => handleReturnLocker(myLocker.lockerId)}
      >
        반납하기
      </CTAButton>
      <LockerExtensionDialog
        handleExtendLocker={() => handleExtendLocker(myLocker.lockerId)}
        expiredAt={expiredAt ?? ''}
        disabled={!canExtend}
      />
    </HStack>
  );
};
