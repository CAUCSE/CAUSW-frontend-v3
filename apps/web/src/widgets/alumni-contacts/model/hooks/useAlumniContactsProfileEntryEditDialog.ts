'use client';

import {
  type ChangeEvent,
  type CompositionEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
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

const MIN_YEAR = 1900;

const formatYearMonthValue = (value?: number | null) =>
  isNil(value) ? '' : String(value);

const parseYearMonth = (year: string, month: string) => {
  if (year.length !== 4 || month === '') {
    return undefined;
  }

  const yearNumber = Number(year);
  const monthNumber = Number(month);
  const currentYear = new Date().getFullYear();

  if (
    !Number.isInteger(yearNumber) ||
    !Number.isInteger(monthNumber) ||
    yearNumber < MIN_YEAR ||
    yearNumber > currentYear ||
    monthNumber < 1 ||
    monthNumber > 12
  ) {
    return undefined;
  }

  return {
    year: yearNumber,
    month: monthNumber,
  };
};

const compareYearMonth = (
  a: { year: number; month: number },
  b: { year: number; month: number },
) => a.year - b.year || a.month - b.month;

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

  const [currentStartYear, setCurrentStartYear] = useState<string>(
    formatYearMonthValue(currentProfileEntry.startYear),
  );
  const [currentStartMonth, setCurrentStartMonth] = useState<string>(
    formatYearMonthValue(currentProfileEntry.startMonth),
  );
  const [currentEndYear, setCurrentEndYear] = useState<string>(
    formatYearMonthValue(currentProfileEntry.endYear),
  );
  const [currentEndMonth, setCurrentEndMonth] = useState<string>(
    formatYearMonthValue(currentProfileEntry.endMonth),
  );

  const [isCurrent, setIsCurrent] = useState<boolean>(
    isNil(currentProfileEntry.endYear) || isNil(currentProfileEntry.endMonth),
  );

  const saveButtonPayload = useMemo(() => {
    const startYearMonth = parseYearMonth(currentStartYear, currentStartMonth);
    const endYearMonth = parseYearMonth(currentEndYear, currentEndMonth);

    if (!startYearMonth) {
      return undefined;
    }

    if (isCurrent) {
      return {
        entry: currentFieldValue,
        isCurrent,
        startYear: startYearMonth.year,
        startMonth: startYearMonth.month,
        endYear: null,
        endMonth: null,
      };
    }

    if (!endYearMonth || compareYearMonth(startYearMonth, endYearMonth) > 0) {
      return undefined;
    }

    return {
      entry: currentFieldValue,
      isCurrent,
      startYear: startYearMonth.year,
      startMonth: startYearMonth.month,
      endYear: endYearMonth.year,
      endMonth: endYearMonth.month,
    };
  }, [
    currentFieldValue,
    currentStartYear,
    currentStartMonth,
    currentEndYear,
    currentEndMonth,
    isCurrent,
  ]);

  const canSave = useMemo(() => {
    return currentFieldValue.trim() !== '' && Boolean(saveButtonPayload);
  }, [currentFieldValue, saveButtonPayload]);

  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef<boolean>(false);

  useEffect(() => {
    const initializeFieldValue = () => {
      setCurrentFieldValue(currentProfileEntry.description);
      setCurrentStartYear(formatYearMonthValue(currentProfileEntry.startYear));
      setCurrentStartMonth(
        formatYearMonthValue(currentProfileEntry.startMonth),
      );
      setCurrentEndYear(formatYearMonthValue(currentProfileEntry.endYear));
      setCurrentEndMonth(formatYearMonthValue(currentProfileEntry.endMonth));
      setIsCurrent(
        isNil(currentProfileEntry.endYear) ||
          isNil(currentProfileEntry.endMonth),
      );
    };

    if (isOpen) {
      initializeFieldValue();
    }
  }, [isOpen, currentProfileEntry]);

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  const handleClickDialogTrigger = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
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

  const handleStartYearChange = (year: string) => {
    setCurrentStartYear(year);
  };

  const handleStartMonthChange = (month: string) => {
    setCurrentStartMonth(month);
  };

  const handleEndYearChange = (year: string) => {
    setCurrentEndYear(year);
  };

  const handleEndMonthChange = (month: string) => {
    setCurrentEndMonth(month);
  };

  const handleToggleChange = (checked: boolean) => {
    setIsCurrent(checked);
  };

  const handleClickSaveButton = () => {
    if (!canSave || !saveButtonPayload) {
      return;
    }

    const currentProfileEntrySet = profileEntrySet.filter(
      (_, idx) => idx !== fieldIndex,
    );

    const updateProfileEntry = createAlumniContactsProfileEntry({
      id: currentProfileEntry.id,
      entry: saveButtonPayload.entry,
      isCurrent: saveButtonPayload.isCurrent,
      startYear: saveButtonPayload.startYear,
      startMonth: saveButtonPayload.startMonth,
      endYear: saveButtonPayload.endYear,
      endMonth: saveButtonPayload.endMonth,
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
    currentStartYear,
    currentStartMonth,
    currentEndYear,
    currentEndMonth,
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
    handleStartYearChange,
    handleStartMonthChange,
    handleEndYearChange,
    handleEndMonthChange,
    handleToggleChange,
    handleClickSaveButton,
    handleClickDeleteButton,
  };
};
