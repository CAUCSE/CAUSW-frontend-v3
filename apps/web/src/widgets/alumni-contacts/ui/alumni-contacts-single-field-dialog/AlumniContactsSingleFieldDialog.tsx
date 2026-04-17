import { type PropsWithChildren, type RefObject } from 'react';

import { Button, Dialog, HStack, Text } from '@causw/cds';

interface AlumniContactsSingleFieldDialogProps extends PropsWithChildren {
  isOpen: boolean;
  ariaDescription: string;
  onOpenChange: (open: boolean) => void;
  title: string;
  canConfirm: boolean;
  onConfirm: () => void;
  confirmButtonRef?: RefObject<HTMLButtonElement | null>;
}

export const AlumniContactsSingleFieldDialog = ({
  children,
  ariaDescription,
  isOpen,
  onOpenChange,
  title,
  canConfirm,
  onConfirm,
  confirmButtonRef,
}: AlumniContactsSingleFieldDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content className="w-80 gap-2 md:w-105">
        <Dialog.Title>
          <Text typography="subtitle-18-bold" textColor="gray-700">
            {title}
          </Text>
        </Dialog.Title>
        <Dialog.Description className="sr-only">
          {ariaDescription}
        </Dialog.Description>
        {children}
        <Dialog.Footer>
          <HStack gap="sm" className="pt-6">
            <Dialog.Close asChild>
              <Button color="gray" className="h-13 flex-1 rounded-md">
                <Text typography="body-15-semibold" textColor="gray-600">
                  닫기
                </Text>
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                onClick={onConfirm}
                className="h-13 flex-1 rounded-md bg-gray-700 text-white hover:bg-gray-800! disabled:bg-gray-200! disabled:[&_span]:text-gray-300!"
                disabled={!canConfirm}
                ref={confirmButtonRef}
              >
                <Text typography="body-15-semibold" textColor="white">
                  추가하기
                </Text>
              </Button>
            </Dialog.Close>
          </HStack>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
