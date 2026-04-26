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
  AlumniContactsFieldEditButton,
  AlumniContactsProfileEntryCurrentToggle,
  AlumniContactsProfileEntryDatePicker,
} from '@/features/alumni-contacts';

import { type AlumniContactsProfileEntryType } from '../../config';
import { useAlumniContactsProfileEntryEditDialog } from '../../model';

interface AlumniContactsProfileEntryEditDialogProps {
  fieldIndex: number;
  fieldName: AlumniContactsProfileEntryType;
  maxLength?: number;
  title: string;
  ariaDescription: string;
  placeholder: string;
  toggleLabel: string;
  deleteButtonLabel: string;
}

export const AlumniContactsProfileEntryEditDialog = ({
  fieldIndex,
  fieldName,
  maxLength,
  title,
  ariaDescription,
  placeholder,
  toggleLabel,
  deleteButtonLabel,
}: AlumniContactsProfileEntryEditDialogProps) => {
  const {
    isOpen,
    currentFieldValue,
    currentStartDate,
    currentEndDate,
    isCurrent,
    canSave,
    saveButtonRef,
    handleClickDialogTrigger,
    handleOpenChange,
    handleFieldValueChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleStartDateChange,
    handleEndDateChange,
    handleToggleChange,
    handleClickSaveButton,
    handleClickDeleteButton,
  } = useAlumniContactsProfileEntryEditDialog({
    fieldIndex,
    fieldName,
    maxLength,
  });

  return (
    <>
      <AlumniContactsFieldEditButton
        iconSize={16}
        iconColor="gray-300"
        onClick={handleClickDialogTrigger}
        ariaLabel={title}
      />
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
              onChange={handleFieldValueChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              onKeyDown={handleEnterPress}
              value={currentFieldValue}
              maxLength={maxLength}
            />
          </VStack>
          <VStack gap="sm">
            <Text typography="subtitle-18-bold" textColor="gray-700">
              기간
            </Text>
            <HStack gap="sm" className="items-center">
              <AlumniContactsProfileEntryDatePicker
                date={currentStartDate}
                onDateChange={handleStartDateChange}
              />
              {!isCurrent && (
                <>
                  <div className="h-px w-2 shrink-0 bg-gray-300" />
                  <AlumniContactsProfileEntryDatePicker
                    date={currentEndDate}
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
            <VStack className="gap-3 pt-6">
              <Dialog.Close asChild>
                <Button
                  className="h-13 w-full rounded-md bg-gray-700 text-white hover:bg-gray-800! disabled:bg-gray-200! disabled:[&_span]:text-gray-300!"
                  disabled={!canSave}
                  ref={saveButtonRef}
                  onClick={handleClickSaveButton}
                >
                  <Text typography="body-15-semibold" textColor="white">
                    저장하기
                  </Text>
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild onClick={handleClickDeleteButton}>
                <Button color="white" className="h-fit w-fit self-center p-0">
                  <Text typography="body-15-medium" textColor="gray-400">
                    {deleteButtonLabel}
                  </Text>
                </Button>
              </Dialog.Close>
            </VStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};
