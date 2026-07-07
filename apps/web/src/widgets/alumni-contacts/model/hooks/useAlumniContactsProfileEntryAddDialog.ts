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

interface UseAlumniContactsProfileEntryAddDialogProps {
  maxLength?: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MIN_YEAR = 1900;

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

export const useAlumniContactsProfileEntryAddDialog = ({
  maxLength,
  isOpen,
  onOpenChange,
}: UseAlumniContactsProfileEntryAddDialogProps) => {
  const [newEntry, setNewEntry] = useState<string>('');

  const [startYear, setStartYear] = useState<string>('');
  const [startMonth, setStartMonth] = useState<string>('');
  const [endYear, setEndYear] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');

  const [isCurrent, setIsCurrent] = useState<boolean>(false);

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef(false);

  const addButtonPayload = useMemo(() => {
    const startYearMonth = parseYearMonth(startYear, startMonth);
    const endYearMonth = parseYearMonth(endYear, endMonth);

    if (!startYearMonth) {
      return undefined;
    }

    if (isCurrent) {
      return {
        entry: newEntry,
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
      entry: newEntry,
      isCurrent,
      startYear: startYearMonth.year,
      startMonth: startYearMonth.month,
      endYear: endYearMonth.year,
      endMonth: endYearMonth.month,
    };
  }, [newEntry, startYear, startMonth, endYear, endMonth, isCurrent]);

  const canAdd = useMemo(() => {
    return newEntry.trim() !== '' && Boolean(addButtonPayload);
  }, [newEntry, addButtonPayload]);

  useEffect(() => {
    const initializeFieldValue = () => {
      setNewEntry('');
      setStartYear('');
      setStartMonth('');
      setEndYear('');
      setEndMonth('');
      setIsCurrent(false);
    };

    if (isOpen) {
      initializeFieldValue();
    }
  }, [isOpen]);

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  const handleNewEntryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && event.target.value.length > maxLength) {
      return;
    }
    setNewEntry(event.target.value);
  };

  const handleEntryEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || isComposingRef.current) {
      return;
    }

    if (event.key === 'Enter') {
      addButtonRef.current?.click();
    }
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setNewEntry(event.currentTarget.value);
  };

  const handleStartYearChange = (year: string) => {
    setStartYear(year);
  };

  const handleStartMonthChange = (month: string) => {
    setStartMonth(month);
  };

  const handleEndYearChange = (year: string) => {
    setEndYear(year);
  };

  const handleEndMonthChange = (month: string) => {
    setEndMonth(month);
  };

  const handleToggleChange = (checked: boolean) => {
    setIsCurrent(checked);
  };

  return {
    newEntry,
    startYear,
    startMonth,
    endYear,
    endMonth,
    isCurrent,
    canAdd,
    addButtonPayload,
    addButtonRef,
    handleInitialFocus,
    handleOpenChange,
    handleNewEntryChange,
    handleEntryEnterPress,
    handleCompositionStart,
    handleCompositionEnd,
    handleStartYearChange,
    handleStartMonthChange,
    handleEndYearChange,
    handleEndMonthChange,
    handleToggleChange,
  };
};
