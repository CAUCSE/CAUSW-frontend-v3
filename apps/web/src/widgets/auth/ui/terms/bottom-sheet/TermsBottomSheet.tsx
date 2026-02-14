import { BottomSheet } from '@causw/cds';

import { UseTermsContent } from '../content/UseTermsContent';

interface TermsBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsBottomSheet = ({
  open,
  onOpenChange,
}: TermsBottomSheetProps) => {
  return (
    <BottomSheet headerAlign="left" open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Header className="hidden" title="이용 약관 동의 여부" />
      <BottomSheet.Content>
        <UseTermsContent />
      </BottomSheet.Content>
    </BottomSheet>
  );
};
