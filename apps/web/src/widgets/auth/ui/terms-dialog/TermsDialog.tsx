import { Suspense } from 'react';

import { Dialog } from '@causw/cds';

import type { TermsAgreementRequestDto } from '@/entities/auth';

import { SuspenseView } from '@/shared/ui';

import { TermsContent } from '../terms-content';
import { TermsDetailDialog } from '../terms-detail-dialog';

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
  onSubmitTermsAgreement?:
    | ((params: TermsAgreementRequestDto) => void | Promise<void>)
    | null;
}

export const TermsDialog = ({
  open,
  onOpenChange,
  onComplete,
  onSubmitTermsAgreement,
}: TermsDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) onOpenChange(true);
      }}
    >
      <Dialog.Content
        className="py-8 focus:outline-none"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <Dialog.Title
          className="sr-only"
          title="이용 약관 동의 여부"
        ></Dialog.Title>
        <Suspense fallback={<SuspenseView />}>
          <TermsContent
            onComplete={onComplete}
            onSubmitTermsAgreement={onSubmitTermsAgreement}
          />
        </Suspense>
        <TermsDetailDialog />
      </Dialog.Content>
    </Dialog>
  );
};
