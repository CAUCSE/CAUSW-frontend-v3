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

interface UseAlumniContactsProfileEntryAddDialogProps {
  maxLength?: number;
  onOpenChange: (open: boolean) => void;
}

export const useAlumniContactsProfileEntryAddDialog = ({
  maxLength,
  onOpenChange,
}: UseAlumniContactsProfileEntryAddDialogProps) => {
  const [newEntry, setNewEntry] = useState<string>('');

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [isCurrent, setIsCurrent] = useState<boolean>(false);

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef(false);

  const canAdd = useMemo(() => {
    if (isCurrent) {
      return newEntry.trim() !== '' && startDate;
    }
    return newEntry.trim() !== '' && startDate && endDate;
  }, [newEntry, startDate, endDate, isCurrent]);

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNewEntry('');
      setStartDate(undefined);
      setEndDate(undefined);
      setIsCurrent(false);
    }
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

  const handleStartDateChange = (date: Date) => {
    if (endDate && date > endDate) {
      setEndDate(date);
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    if (startDate && date < startDate) {
      setStartDate(date);
    }
    setEndDate(date);
  };

  const handleToggleChange = (checked: boolean) => {
    setIsCurrent(checked);
  };

  return {
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
  };
};
