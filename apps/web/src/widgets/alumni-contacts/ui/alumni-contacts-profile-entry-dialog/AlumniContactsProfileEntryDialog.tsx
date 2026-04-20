'use client';

import { Button, Dialog, HStack, Text, TextInput, VStack } from '@causw/cds';

import {
  AlumniContactsProfileEntryCurrentToggle,
  AlumniContactsProfileEntryDatePicker,
} from '@/features/alumni-contacts';

import { useAlumniContactsProfileEntryDialog } from '../../model';

interface AlumniContactsProfileEntryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  ariaDescription: string;
  placeholder: string;
  maxLength?: number;
  toggleLabel: string;
  onClickAddButton?: (
    entry: string,
    isCurrent: boolean,
    startDate?: Date,
    endDate?: Date,
  ) => void;
}

export const AlumniContactsProfileEntryDialog = ({
  isOpen,
  onOpenChange,
  title,
  ariaDescription,
  placeholder,
  maxLength,
  toggleLabel,
  onClickAddButton,
}: AlumniContactsProfileEntryDialogProps) => {
  const {
    newEntry,
    startDate,
    endDate,
    isCurrent,
    canAdd,
    addButtonRef,
    handleOpenChange,
    handleNewEntryChange,
    handleEntryEnterPress,
    handleCompositionStart,
    handleCompositionEnd,
    handleStartDateChange,
    handleEndDateChange,
    handleToggleChange,
  } = useAlumniContactsProfileEntryDialog({
    maxLength,
    onOpenChange,
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content className="w-80 gap-8 md:w-105">
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        <Dialog.Description className="sr-only">
          {ariaDescription}
        </Dialog.Description>
        <VStack gap="sm">
          <Text typography="subtitle-18-bold" textColor="gray-700">
            {title}
          </Text>
          <TextInput
            placeholder={placeholder}
            className="bg-gray-100"
            onChange={handleNewEntryChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onKeyDown={handleEntryEnterPress}
            value={newEntry}
            maxLength={maxLength}
          />
        </VStack>
        <VStack gap="sm">
          <Text typography="subtitle-18-bold" textColor="gray-700">
            기간
          </Text>
          <HStack gap="sm" className="items-center">
            <AlumniContactsProfileEntryDatePicker
              date={startDate}
              onDateChange={handleStartDateChange}
            />
            {!isCurrent && (
              <>
                <div className="h-px w-2 shrink-0 bg-gray-300" />
                <AlumniContactsProfileEntryDatePicker
                  date={endDate}
                  onDateChange={handleEndDateChange}
                />
              </>
            )}
          </HStack>
          <AlumniContactsProfileEntryCurrentToggle
            checked={isCurrent}
            onCheckedChange={handleToggleChange}
            label={toggleLabel}
          />
        </VStack>
        <Dialog.Footer>
          <HStack gap="sm">
            <Dialog.Close asChild>
              <Button color="gray" className="h-13 flex-1 rounded-md">
                <Text typography="body-15-semibold" textColor="gray-600">
                  닫기
                </Text>
              </Button>
            </Dialog.Close>
            <Dialog.Close
              asChild
              onClick={() =>
                onClickAddButton?.(newEntry, isCurrent, startDate, endDate)
              }
            >
              <Button
                className="h-13 flex-1 rounded-md bg-gray-700 text-white hover:bg-gray-800! disabled:bg-gray-200! disabled:[&_span]:text-gray-300!"
                disabled={!canAdd}
                ref={addButtonRef}
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
