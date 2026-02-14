import { Dialog } from '@causw/cds';

import { UseTermsContent } from '../content/UseTermsContent';

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsDialog = ({ open, onOpenChange }: TermsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="py-8">
        <Dialog.Title
          className="sr-only"
          title="이용 약관 동의 여부"
        ></Dialog.Title>
        <UseTermsContent />
      </Dialog.Content>
    </Dialog>
  );
};
