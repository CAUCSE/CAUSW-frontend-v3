import { CTAButton, Dialog, HStack, Stack, Text } from '@causw/cds';

interface BlockUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  // TODO: API 연동 시 파라미터 구조 변경
  onSubmitBlock: () => void;
}

export const BlockUserDialog = ({
  open,
  setOpen,
  onSubmitBlock,
}: BlockUserDialogProps) => {
  const handleBlock = () => {
    onSubmitBlock();
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Content
        maxWidth={420}
        className="w-[min(312px,calc(100%-32px))] px-0 py-4 pt-8 md:w-105"
      >
        <Stack gap="xl">
          <Dialog.Title>
            <Text
              typography="subtitle-16-bold"
              textColor="gray-800"
              align="center"
              as="p"
              className="px-10"
            >
              이 작성자의 게시물이 목록에 노출되지 않으며, 다시 해제하실 수
              없습니다.
            </Text>
          </Dialog.Title>

          <Dialog.Footer>
            <HStack gap="sm" className="px-4">
              <CTAButton color="light" fullWidth onClick={handleClose}>
                취소
              </CTAButton>
              <CTAButton color="dark" fullWidth onClick={handleBlock}>
                확인
              </CTAButton>
            </HStack>
          </Dialog.Footer>
        </Stack>
      </Dialog.Content>
    </Dialog>
  );
};
