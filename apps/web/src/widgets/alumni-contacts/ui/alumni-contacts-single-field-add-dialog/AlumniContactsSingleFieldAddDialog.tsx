import { type PropsWithChildren, type RefObject } from 'react';

import { Button, Close, Dialog, HStack, Text } from '@causw/cds';

interface AlumniContactsSingleFieldAddDialogProps extends PropsWithChildren {
  isOpen: boolean;
  ariaDescription: string;
  onOpenChange: (open: boolean) => void;
  title: string;
  canConfirm: boolean;
  onConfirm: () => void;
  confirmButtonRef?: RefObject<HTMLButtonElement | null>;
}

export const AlumniContactsSingleFieldAddDialog = ({
  children,
  ariaDescription,
  isOpen,
  onOpenChange,
  title,
  canConfirm,
  onConfirm,
  confirmButtonRef,
}: AlumniContactsSingleFieldAddDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content className="w-80 gap-2 md:w-105">
        <HStack className="items-center justify-between px-1 py-[5.5px]">
          <Dialog.Title>
            <Text typography="subtitle-18-bold" textColor="gray-700">
              {title}
            </Text>
          </Dialog.Title>
          <Dialog.Close asChild>
            <Button
              color="gray"
              className="h-fit w-fit bg-transparent p-0 hover:bg-transparent!"
            >
              <Close size={20} color="gray-600" />
            </Button>
          </Dialog.Close>
        </HStack>
        <Dialog.Description className="sr-only">
          {ariaDescription}
        </Dialog.Description>
        {children}
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button
              onClick={onConfirm}
              className="mt-6 h-13 w-full rounded-md bg-gray-700 text-white hover:bg-gray-800! disabled:bg-gray-200! disabled:[&_span]:text-gray-300!"
              disabled={!canConfirm}
              ref={confirmButtonRef}
            >
              <Text typography="body-15-semibold" textColor="white">
                추가하기
              </Text>
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
