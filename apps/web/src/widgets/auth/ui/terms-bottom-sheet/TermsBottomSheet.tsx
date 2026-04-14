import { Suspense } from 'react';

import { BottomSheet } from '@causw/cds';

import type { TermsAgreementRequestDto } from '@/entities/auth';

import { SuspenseView } from '@/shared/ui';

import { TermsContent } from '../terms-content';
import { TermsDetailDialog } from '../terms-detail-dialog';

interface TermsBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
  onSubmitTermsAgreement?:
    | ((params: TermsAgreementRequestDto) => void | Promise<void>)
    | null;
}

export const TermsBottomSheet = ({
  open,
  onOpenChange,
  onComplete,
  onSubmitTermsAgreement,
}: TermsBottomSheetProps) => {
  return (
    <BottomSheet
      headerAlign="left"
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) onOpenChange(true);
      }}
    >
      <BottomSheet.Header className="hidden" title="이용 약관 동의 여부" />
      <BottomSheet.Content>
        <Suspense fallback={<SuspenseView />}>
          <TermsContent
            onComplete={onComplete}
            onSubmitTermsAgreement={onSubmitTermsAgreement}
          />
        </Suspense>
        <TermsDetailDialog />
      </BottomSheet.Content>
    </BottomSheet>
  );
};
