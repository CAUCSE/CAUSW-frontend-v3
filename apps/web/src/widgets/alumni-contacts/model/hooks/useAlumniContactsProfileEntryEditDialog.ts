'use client';

import {
  type ChangeEvent,
  type CompositionEvent,
  type KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { isNil } from 'es-toolkit';

import {
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

import { type AlumniContactsProfileEntryType } from '../../config';
import { createAlumniContactsProfileEntry } from '../createAlumniContactsProfileEntry';
import { sortAlumniContactsProfileEntry } from '../sortAlumniContactsProfileEntry';

const createDate = (startYear?: number | null, startMonth?: number | null) => {
  if (isNil(startYear) || isNil(startMonth)) {
    return undefined;
  }

  return new Date(startYear, startMonth - 1);
};

interface UseAlumniContactsProfileEntryEditDialogProps {
  fieldIndex: number;
  fieldName: AlumniContactsProfileEntryType;
  maxLength?: number;
}

export const useAlumniContactsProfileEntryEditDialog = ({
  fieldIndex,
  fieldName,
  maxLength,
}: UseAlumniContactsProfileEntryEditDialogProps) => {
  const { control } = useFormContext<AlumniContactsEditForm>();

  const { remove, replace } = useFieldArray({
    control,
    name: fieldName,
  });
  const profileEntrySet = useWatchAlumniContactsEditFormField(fieldName);
  const currentProfileEntry = profileEntrySet[fieldIndex];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentFieldValue, setCurrentFieldValue] = useState<string>(
    currentProfileEntry.description,
  );

  const [currentStartDate, setCurrentStartDate] = useState<Date | undefined>(
    createDate(currentProfileEntry.startYear, currentProfileEntry.startMonth),
  );

  const [currentEndDate, setCurrentEndDate] = useState<Date | undefined>(
    createDate(currentProfileEntry.endYear, currentProfileEntry.endMonth),
  );

  const [isCurrent, setIsCurrent] = useState<boolean>(
    isNil(currentProfileEntry.endYear) || isNil(currentProfileEntry.endMonth),
  );

  const canSave = useMemo(() => {
    if (isCurrent) {
      return currentFieldValue.trim() !== '' && currentStartDate;
    }
    return (
      currentFieldValue.trim() !== '' && currentStartDate && currentEndDate
    );
  }, [currentFieldValue, currentStartDate, currentEndDate, isCurrent]);

  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef<boolean>(false);

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  const handleClickDialogTrigger = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setCurrentFieldValue(currentProfileEntry.description);
      setCurrentStartDate(
        createDate(
          currentProfileEntry.startYear,
          currentProfileEntry.startMonth,
        ),
      );
      setCurrentEndDate(
        createDate(currentProfileEntry.endYear, currentProfileEntry.endMonth),
      );
      setIsCurrent(
        isNil(currentProfileEntry.endYear) ||
          isNil(currentProfileEntry.endMonth),
      );
    }

    setIsOpen(open);
  };

  const handleFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && event.target.value.length > maxLength) {
      return;
    }

    setCurrentFieldValue(event.target.value);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setCurrentFieldValue(event.currentTarget.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || isComposingRef.current) {
      return;
    }

    if (event.key === 'Enter') {
      saveButtonRef.current?.click();
    }
  };

  const handleStartDateChange = (date: Date) => {
    if (currentEndDate && date > currentEndDate) {
      setCurrentEndDate(date);
    }
    setCurrentStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    if (currentStartDate && date < currentStartDate) {
      setCurrentStartDate(date);
    }
    setCurrentEndDate(date);
  };

  const handleToggleChange = (checked: boolean) => {
    setIsCurrent(checked);
  };

  const handleClickSaveButton = () => {
    if (!canSave || !currentStartDate) {
      return;
    }

    const currentProfileEntrySet = profileEntrySet.filter(
      (_, idx) => idx !== fieldIndex,
    );

    const updateProfileEntry = createAlumniContactsProfileEntry({
      entry: currentFieldValue,
      isCurrent,
      startDate: currentStartDate,
      endDate: currentEndDate,
    });

    const newProfileEntrySet = [
      ...currentProfileEntrySet,
      updateProfileEntry,
    ].sort(sortAlumniContactsProfileEntry);

    replace(newProfileEntrySet);
    setIsOpen(false);
  };

  const handleClickDeleteButton = () => {
    remove(fieldIndex);
    setIsOpen(false);
  };

  return {
    isOpen,
    currentFieldValue,
    currentStartDate,
    currentEndDate,
    isCurrent,
    canSave,
    saveButtonRef,
    handleInitialFocus,
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
  };
};
