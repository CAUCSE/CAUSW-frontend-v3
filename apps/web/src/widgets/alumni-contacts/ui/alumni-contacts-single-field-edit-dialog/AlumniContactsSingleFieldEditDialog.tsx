'use client';

import { type RefObject, type PropsWithChildren } from 'react';

import { Button, Close, Dialog, HStack, Text, VStack } from '@causw/cds';

interface AlumniContactsSingleFieldEditDialogProps extends PropsWithChildren {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  ariaDescription: string;
  canSave?: boolean;
  onSave?: () => void;
  saveButtonRef?: RefObject<HTMLButtonElement | null>;
  deleteButtonLabel: string;
  onDelete?: () => void;
}

export const AlumniContactsSingleFieldEditDialog = ({
  isOpen,
  onOpenChange,
  title,
  ariaDescription,
  children,
  canSave = false,
  onSave,
  saveButtonRef,
  deleteButtonLabel,
  onDelete,
}: AlumniContactsSingleFieldEditDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content className="w-80 gap-2 md:w-105">
        <HStack className="justify-between px-1 py-[5.5px]">
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
          <VStack className="gap-3 pt-6">
            <Dialog.Close asChild>
              <Button
                className="h-13 w-full rounded-md bg-gray-700 text-white hover:bg-gray-800! disabled:bg-gray-200! disabled:[&_span]:text-gray-300!"
                disabled={!canSave}
                onClick={onSave}
                ref={saveButtonRef}
              >
                <Text typography="body-15-semibold" textColor="white">
                  저장하기
                </Text>
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                color="white"
                className="h-fit w-fit self-center p-0"
                onClick={onDelete}
              >
                <Text typography="body-15-medium" textColor="gray-400">
                  {deleteButtonLabel}
                </Text>
              </Button>
            </Dialog.Close>
          </VStack>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
