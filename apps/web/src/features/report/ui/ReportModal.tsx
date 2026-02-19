'use client';

import {
  BottomSheet,
  CTAButton,
  Dialog,
  HStack,
  Stack,
  Text,
} from '@causw/cds';

import { ReportReason } from '../model';

import { ReportReasonSelect } from './ReportReasonSelect';

import { useBreakpoint } from '@/shared';

interface ReportModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reason: ReportReason;
  setReason: (value: ReportReason) => void;
  onSubmit: () => void;
}

export const ReportModal = ({
  open,
  setOpen,
  reason,
  setReason,
  onSubmit,
}: ReportModalProps) => {
  const { isMobileSize } = useBreakpoint();

  const handleClose = () => setOpen(false);

  if (isMobileSize)
    return (
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheet.Content>
          {/* TODO: BottomSheet Title 분리 필요 */}
          <BottomSheet.Header title="신고 사유 선택" />
          <BottomSheet.Body className="my-6">
            <ReportReasonSelect value={reason} onChange={setReason} />
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
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Content width={420} className="pt-8">
        <Stack gap="xl">
          <Stack gap="lg">
            <Dialog.Title>
              <Text typography="subtitle-18-bold" textColor="gray-800">
                신고 사유 선택
              </Text>
            </Dialog.Title>
            <ReportReasonSelect value={reason} onChange={setReason} />
          </Stack>
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
        </Stack>
      </Dialog.Content>
    </Dialog>
  );
};
