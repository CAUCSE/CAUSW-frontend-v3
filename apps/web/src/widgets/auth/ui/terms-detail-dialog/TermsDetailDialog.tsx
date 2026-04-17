'use client';

import { useShallow } from 'zustand/react/shallow';

import { Dialog, VStack } from '@causw/cds';

import { useTermsDetailDialogStore } from '@/entities/auth';

import { useBreakpoint } from '@/shared/hooks';
import { ActionHeader, MobileOnly } from '@/shared/ui';

import { TermsDetailContent } from '../terms-detail-content';

export const TermsDetailDialog = () => {
  const { isMobileSize } = useBreakpoint();
  const { selectedTerm, close } = useTermsDetailDialogStore(
    useShallow((state) => ({
      selectedTerm: state.selectedTerm,
      close: state.close,
    })),
  );

  if (!selectedTerm) return null;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Dialog.Content
        {...(!isMobileSize ? { width: 700 } : {})}
        fullscreen={isMobileSize}
        className="overflow-hidden bg-gray-100 p-0 focus:outline-none md:h-[800px] md:w-full md:max-w-[700px] md:rounded-2xl md:bg-white"
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <Dialog.Title className="sr-only" title="약관 상세"></Dialog.Title>
        <VStack gap="none" className="overflow-auto">
          <MobileOnly>
            <ActionHeader>
              <ActionHeader.BackButton onClick={close}>
                뒤로
              </ActionHeader.BackButton>
            </ActionHeader>
          </MobileOnly>

          <TermsDetailContent term={selectedTerm} onClose={close} />
        </VStack>
      </Dialog.Content>
    </Dialog>
  );
};
