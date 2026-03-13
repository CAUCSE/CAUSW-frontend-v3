'use client';

import {
  BottomSheet,
  CTAButton,
  Dialog,
  HStack,
  Text,
  VStack,
} from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks';

import { type ReportReason } from '../model';

import { ReasonSelectRadio } from './ReasonSelectRadio';

interface ReportReasonSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason: ReportReason;
  setReason: (value: ReportReason) => void;
  onSubmit: () => void;
}

export const ReportReasonSelector = ({
  open,
  onOpenChange,
  reason,
  setReason,
  onSubmit,
}: ReportReasonSelectorProps) => {
  const { isMobileSize } = useBreakpoint();

  const handleClose = () => onOpenChange(false);

  if (isMobileSize)
    return (
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <BottomSheet.Content aria-describedby={undefined}>
          {/* TODO: BottomSheet Title 분리 필요 */}
          <BottomSheet.Header title="신고 사유 선택" />
          <BottomSheet.Body className="my-6">
            <ReasonSelectRadio value={reason} onChange={setReason} />
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <HStack gap="sm">
              <CTAButton onClick={handleClose} color="light" fullWidth>
                닫기
              </CTAButton>
              <CTAButton onClick={onSubmit} color="red" fullWidth>
                신고하기
              </CTAButton>
            </HStack>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet>
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={420} className="pt-8" aria-describedby={undefined}>
        <VStack gap="xl">
          <VStack gap="lg">
            <Dialog.Title>
              <Text typography="subtitle-18-bold" textColor="gray-800">
                신고 사유 선택
              </Text>
            </Dialog.Title>
            <ReasonSelectRadio value={reason} onChange={setReason} />
          </VStack>
          <Dialog.Footer>
            <HStack gap="sm">
              <CTAButton onClick={handleClose} color="light" fullWidth>
                닫기
              </CTAButton>
              <CTAButton onClick={onSubmit} color="red" fullWidth>
                신고하기
              </CTAButton>
            </HStack>
          </Dialog.Footer>
        </VStack>
      </Dialog.Content>
    </Dialog>
  );
};
