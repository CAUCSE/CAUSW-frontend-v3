'use client';

import {
  Button,
  Close,
  Dialog,
  HStack,
  Text,
  TextInput,
  VStack,
} from '@causw/cds';

import {
  AlumniContactsProfileEntryCurrentToggle,
  AlumniContactsProfileEntryDatePicker,
} from '@/features/alumni-contacts';

import { useAlumniContactsProfileEntryAddDialog } from '../../model';

interface AlumniContactsProfileEntryAddDialogProps {
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

export const AlumniContactsProfileEntryAddDialog = ({
  isOpen,
  onOpenChange,
  title,
  ariaDescription,
  placeholder,
  maxLength,
  toggleLabel,
  onClickAddButton,
}: AlumniContactsProfileEntryAddDialogProps) => {
  const {
    newEntry,
    startDate,
    endDate,
    isCurrent,
    canAdd,
    addButtonRef,
    handleInitialFocus,
    handleOpenChange,
    handleNewEntryChange,
    handleEntryEnterPress,
    handleCompositionStart,
    handleCompositionEnd,
    handleStartDateChange,
    handleEndDateChange,
    handleToggleChange,
  } = useAlumniContactsProfileEntryAddDialog({
    maxLength,
    isOpen,
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
          <HStack className="items-center justify-between px-1 py-[5.5px]">
            <Text typography="subtitle-18-bold" textColor="gray-700">
              {title}
            </Text>
            <Dialog.Close asChild>
              <Button
                color="gray"
                className="h-fit w-fit bg-transparent p-0 hover:bg-transparent!"
              >
                <Close size={20} color="gray-600" />
              </Button>
            </Dialog.Close>
          </HStack>
          <TextInput
            placeholder={placeholder}
            className="bg-gray-100"
            onChange={handleNewEntryChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onKeyDown={handleEntryEnterPress}
            value={newEntry}
            maxLength={maxLength}
            ref={handleInitialFocus}
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
          <Dialog.Close
            asChild
            onClick={() =>
              onClickAddButton?.(newEntry, isCurrent, startDate, endDate)
            }
          >
            <Button
              className="h-13 w-full rounded-md bg-gray-700 text-white hover:bg-gray-800! disabled:bg-gray-200! disabled:[&_span]:text-gray-300!"
              disabled={!canAdd}
              ref={addButtonRef}
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
