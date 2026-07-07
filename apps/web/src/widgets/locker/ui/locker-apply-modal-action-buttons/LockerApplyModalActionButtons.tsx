'use client';

import { CTAButton, HStack } from '@causw/cds';

import { type GetMyLockerResponseDto } from '@/entities/locker';

import { LockerExtensionDialog } from '../locker-extension-dialog';

interface LockerApplyModalActionButtonsProps {
  myLocker: GetMyLockerResponseDto;
  selectedLockerId: string | null;
  isExtended?: boolean;
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
  isExtended = false,
  canApply = false,
  canExtend = false,
  expiredAt,
  handleRegisterLocker,
  handleReturnLocker,
  handleExtendLocker,
}: LockerApplyModalActionButtonsProps) => {
  if (!myLocker.hasLocker) {
    return (
      <CTAButton
        color="dark"
        className="w-full"
        disabled={!selectedLockerId || !canApply}
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
      {!isExtended && (
        <LockerExtensionDialog
          handleExtendLocker={() => handleExtendLocker(myLocker.lockerId)}
          expiredAt={expiredAt ?? ''}
          disabled={!canExtend}
        />
      )}
    </HStack>
  );
};
