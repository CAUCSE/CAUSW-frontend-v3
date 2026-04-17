'use client';

import {
  type ChangeEvent,
  type CompositionEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from 'react';

import { useFormContext } from 'react-hook-form';

import { ALUMNI_CONTACTS_EDIT_FORM_FIELD } from '@/entities/alumni-contacts';
import {
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts/model';

export const useAlumniContactsInterestTechAddDialog = () => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();
  const userInterestTech = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newInterestTech, setNewInterestTech] = useState<string>('');

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef(false);

  const handleClickTrigger = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNewInterestTech('');
    }
    setIsOpen(open);
  };

  const handleInterestTechChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewInterestTech(event.target.value);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setNewInterestTech(event.currentTarget.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || isComposingRef.current) {
      return;
    }

    if (event.key === 'Enter') {
      addButtonRef.current?.click();
    }
  };

  const handleClickAddButton = () => {
    if (isComposingRef.current) {
      return;
    }

    if (newInterestTech.trim() === '') {
      return;
    }

    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH,
      [...userInterestTech, newInterestTech].sort((a, b) => a.localeCompare(b)),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
    setNewInterestTech('');
  };

  return {
    isOpen,
    newInterestTech,
    addButtonRef,
    handleClickTrigger,
    handleOpenChange,
    handleInterestTechChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddButton,
  };
};
