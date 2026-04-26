'use client';

import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

import { useFormContext } from 'react-hook-form';

import {
  type ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

interface UseAlumniContactsSingleFieldEditDialogProps {
  fieldName:
    | typeof ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK
    | typeof ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH
    | typeof ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_DOMAIN;
  fieldItemIndex: number;
}

export const useAlumniContactsSingleFieldEditDialog = ({
  fieldName,
  fieldItemIndex,
}: UseAlumniContactsSingleFieldEditDialogProps) => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const fieldValue = useWatchAlumniContactsEditFormField(fieldName);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentFieldValue, setCurrentFieldValue] = useState<string>(
    fieldValue[fieldItemIndex],
  );

  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef<boolean>(false);

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  const handleClickDialogTrigger = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCurrentFieldValue(fieldValue[fieldItemIndex]);
    }
    setIsOpen(open);
  };

  const handleFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentFieldValue(event.target.value);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = () => {
    isComposingRef.current = false;
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || isComposingRef.current) {
      return;
    }

    if (event.key === 'Enter') {
      saveButtonRef.current?.click();
    }
  };

  const handleClickSaveButton = () => {
    const updatedFieldValueSet = new Set(
      fieldValue.filter((_, idx) => idx !== fieldItemIndex),
    );

    updatedFieldValueSet.add(currentFieldValue);

    setValue(
      fieldName,
      Array.from(updatedFieldValueSet).sort((a, b) =>
        a.localeCompare(b, 'en-US'),
      ),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  const handleClickDeleteButton = () => {
    const updatedFieldValue = fieldValue.filter(
      (_, idx) => idx !== fieldItemIndex,
    );

    setValue(fieldName, updatedFieldValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return {
    isOpen,
    currentFieldValue,
    saveButtonRef,
    handleInitialFocus,
    handleClickDialogTrigger,
    handleOpenChange,
    handleFieldValueChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickSaveButton,
    handleClickDeleteButton,
  };
};
