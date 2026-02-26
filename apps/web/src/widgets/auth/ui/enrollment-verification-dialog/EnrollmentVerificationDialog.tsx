'use client';

import { Dialog } from '@causw/cds';

import { EnrollmentVerificationForm } from '../enrollment-verification-form';

export interface EnrollmentVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // name property value in real logic
  userName?: string;
}

export const EnrollmentVerificationDialog = ({
  open,
  onOpenChange,
  userName = '유지아', // Dummy initial
}: EnrollmentVerificationDialogProps) => {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="h-full w-full overflow-hidden rounded-none bg-gray-100 px-0 py-0 md:h-[800px] md:w-full md:max-w-[700px] md:rounded-lg md:px-4 md:py-6">
        <div className="h-full w-full overflow-y-auto">
          <Dialog.Title hidden>재학정보 인증하기</Dialog.Title>
          <EnrollmentVerificationForm
            userName={userName}
            onCancel={handleClose}
            onSuccess={handleClose}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
