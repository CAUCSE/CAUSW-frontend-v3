'use client';

import { Dialog } from '@causw/cds';

import { EnrollmentVerificationForm } from '../enrollment-verification-form';

export interface EnrollmentVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
}

export const EnrollmentVerificationDialog = ({
  open,
  onOpenChange,
  userName,
}: EnrollmentVerificationDialogProps) => {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="flex h-full max-h-[100dvh] w-full flex-col overflow-hidden rounded-none bg-gray-100 px-0 py-0 md:h-auto md:max-h-[min(50rem,calc(100dvh-2rem))] md:w-full md:max-w-[43.75rem] md:rounded-lg md:px-4 md:py-6">
        <Dialog.Title hidden>재학정보 인증하기</Dialog.Title>
        <EnrollmentVerificationForm
          userName={userName}
          onCancel={handleClose}
          onSuccess={handleClose}
        />
      </Dialog.Content>
    </Dialog>
  );
};
