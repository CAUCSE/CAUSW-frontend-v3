'use client';

import { Dialog } from '@causw/cds';

import {
  AcademicStateChangeForm,
  type AcademicStateChangeFormProps,
} from '../academic-state-change-form';

export interface AcademicStateChangeDialogProps extends Omit<
  AcademicStateChangeFormProps,
  'onCancel' | 'onSuccess'
> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AcademicStateChangeDialog = ({
  open,
  onOpenChange,
  ...formProps
}: AcademicStateChangeDialogProps) => {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden rounded-none bg-gray-100 px-0 py-0 md:h-[clamp(34rem,72dvh,46rem)] md:max-h-[calc(100dvh-3rem)] md:w-[min(43.75rem,calc(100vw-2rem))] md:rounded-lg md:px-4 md:py-6">
        <Dialog.Title hidden>학적 상태 변경</Dialog.Title>
        <AcademicStateChangeForm
          {...formProps}
          onCancel={handleClose}
          onSuccess={handleClose}
        />
      </Dialog.Content>
    </Dialog>
  );
};
