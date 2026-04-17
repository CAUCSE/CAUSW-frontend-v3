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
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

export const useAlumniContactsInterestDomainAddDialog = () => {
  const userInterestDomain = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_DOMAIN,
  );

  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newInterestDomain, setNewInterestDomain] = useState<string>('');

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef(false);

  const handleClickTrigger = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNewInterestDomain('');
    }
    setIsOpen(open);
  };

  const handleInterestDomainChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewInterestDomain(event.target.value);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setNewInterestDomain(event.currentTarget.value);
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

    if (newInterestDomain.trim() === '') {
      return;
    }

    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_DOMAIN,
      [...userInterestDomain, newInterestDomain].sort((a, b) =>
        a.localeCompare(b),
      ),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );

    setNewInterestDomain('');
    setIsOpen(false);
  };

  return {
    isOpen,
    newInterestDomain,
    addButtonRef,
    handleClickTrigger,
    handleOpenChange,
    handleInterestDomainChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddButton,
  };
};
