'use client';

import {
  type ChangeEvent,
  type CompositionEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from 'react';

import { useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  useWatchAlumniContactsEditFormField,
  type AlumniContactsEditForm,
} from '@/entities/alumni-contacts';

export const useAlumniContactsTechStackAddDialog = () => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const userTechStack = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [newTechStack, setNewTechStack] = useState<string>('');

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef(false);

  const handleClickTrigger = () => {
    setIsOpen(true);
  };

  const handleTechStackChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTechStack(event.target.value);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setNewTechStack(event.currentTarget.value);
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

    if (newTechStack.trim() === '') {
      return;
    }

    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK,
      [...userTechStack, newTechStack].sort((a, b) => a.localeCompare(b)),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
    setNewTechStack('');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNewTechStack('');
    }
    setIsOpen(open);
  };

  return {
    isOpen,
    newTechStack,
    addButtonRef,
    handleClickTrigger,
    handleTechStackChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddButton,
    handleOpenChange,
  };
};
