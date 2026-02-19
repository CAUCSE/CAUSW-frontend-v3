import { Dialog, CTAButton, HStack, Text, Stack } from '@causw/cds';

interface ReportConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ReportConfirmDialog = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
}: ReportConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Dialog.Content
        maxWidth={420}
        className="w-[min(312px,calc(100%-32px))] px-0 py-4 pt-8 md:w-105"
      >
        <Stack gap="xl">
          <Stack className="gap-3 px-8">
            <Dialog.Title>
              <Text typography="subtitle-18-bold" textColor="gray-800">
                {title}
              </Text>
            </Dialog.Title>

            <Text typography="body-16-regular" textColor="gray-600">
              {description}
            </Text>

            <Text typography="body-16-regular" textColor="gray-600">
              허위 신고 시 제재될 수 있습니다.
            </Text>
          </Stack>

          <Dialog.Footer>
            <HStack gap="sm" className="px-4">
              <CTAButton color="light" fullWidth onClick={onClose}>
                취소
              </CTAButton>
              <CTAButton color="red" fullWidth onClick={onConfirm}>
                확인
              </CTAButton>
            </HStack>
          </Dialog.Footer>
        </Stack>
      </Dialog.Content>
    </Dialog>
  );
};
