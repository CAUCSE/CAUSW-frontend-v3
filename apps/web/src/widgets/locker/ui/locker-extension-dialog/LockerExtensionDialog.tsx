import { Button, CTAButton, Dialog, HStack, Text, VStack } from '@causw/cds';

interface LockerExtensionDialogProps {
  handleExtendLocker: () => void;
  expiredAt: string;
  disabled?: boolean;
}

export const LockerExtensionDialog = ({
  handleExtendLocker,
  expiredAt,
  disabled,
}: LockerExtensionDialogProps) => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <CTAButton color="white" className="flex-1" disabled={disabled}>
          연장하기
        </CTAButton>
      </Dialog.Trigger>
      <Dialog.Content className="w-78 p-4">
        <Dialog.Title className="sr-only">사물함 연장하기</Dialog.Title>
        <Dialog.Description className="sr-only">
          사물함 연장하기
        </Dialog.Description>
        <VStack gap="xl">
          <Text
            typography="subtitle-16-bold"
            textColor="gray-800"
            className="text-center whitespace-pre"
          >
            연장 시 만료 일시가 {expiredAt.split('T')[0]}로{'\n'}늘어납니다.
          </Text>
          <HStack className="h-13 w-full">
            <Dialog.Close asChild>
              <Button color="gray" className="h-full flex-1">
                <Text typography="body-15-semibold" textColor="gray-500">
                  닫기
                </Text>
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                className="h-full flex-1 bg-gray-700 text-white hover:bg-gray-800!"
                onClick={handleExtendLocker}
              >
                <Text typography="body-15-semibold" textColor="white">
                  연장하기
                </Text>
              </Button>
            </Dialog.Close>
          </HStack>
        </VStack>
      </Dialog.Content>
    </Dialog>
  );
};
