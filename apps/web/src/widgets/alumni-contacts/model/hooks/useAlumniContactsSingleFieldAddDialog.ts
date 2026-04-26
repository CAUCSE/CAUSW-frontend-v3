'use client';

import {
  type ChangeEvent,
  type CompositionEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

import { useFormContext } from 'react-hook-form';

import { isNil } from 'es-toolkit';

import {
  type AlumniContactsEditForm,
  type ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

interface UseAlumniContactsSingleFieldAddDialogProps {
  fieldName:
    | typeof ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK
    | typeof ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH
    | typeof ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_DOMAIN;
  maxLength?: number;
}

export const useAlumniContactsSingleFieldAddDialog = ({
  fieldName,
  maxLength,
}: UseAlumniContactsSingleFieldAddDialogProps) => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const fieldValue = useWatchAlumniContactsEditFormField(fieldName);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newFieldValue, setNewFieldValue] = useState<string>('');

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef(false);

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  const handleClickDialogTrigger = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNewFieldValue('');
    }
    setIsOpen(open);
  };

  const handleNewFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNil(maxLength) && event.target.value.length > maxLength) {
      return;
    }

    setNewFieldValue(event.target.value);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;

    if (!isNil(maxLength) && event.currentTarget.value.length > maxLength) {
      return;
    }

    setNewFieldValue(event.currentTarget.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || isComposingRef.current) {
      return;
    }

    if (event.key === 'Enter') {
      addButtonRef.current?.click();
    }
  };

  const handleClickAddFieldValueButton = () => {
    if (isComposingRef.current) {
      return;
    }

    if (newFieldValue.trim() === '') {
      return;
    }

    const newFieldValueSet = new Set(fieldValue);

    newFieldValueSet.add(newFieldValue);

    setValue(
      fieldName,
      Array.from(newFieldValueSet).sort((a, b) => a.localeCompare(b, 'en-US')),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
    setNewFieldValue('');
    setIsOpen(false);
  };

  return {
    isOpen,
    newFieldValue,
    addButtonRef,
    handleInitialFocus,
    handleClickDialogTrigger,
    handleOpenChange,
    handleNewFieldValueChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddFieldValueButton,
  };
};
