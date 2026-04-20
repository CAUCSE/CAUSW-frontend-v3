'use client';

import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  useWatchAlumniContactsEditFormField,
  type AlumniContactsEditForm,
} from '@/entities/alumni-contacts';

export const useAlumniContactsContactVisibilityDialog = () => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const isPhoneNumberVisible = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.IS_PHONE_NUMBER_VISIBLE,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentVisibility, setCurrentVisibility] =
    useState<boolean>(isPhoneNumberVisible);

  const handleClickDialogTrigger = () => {
    setIsOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setCurrentVisibility(isPhoneNumberVisible);
    }

    setIsOpen(open);
  };

  const handleToggleChange = (value: boolean) => {
    setCurrentVisibility(value);
  };

  const handleClickSaveButton = () => {
    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.IS_PHONE_NUMBER_VISIBLE,
      currentVisibility,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  return {
    isOpen,
    currentVisibility,
    isPhoneNumberVisible,
    handleClickDialogTrigger,
    handleDialogOpenChange,
    handleToggleChange,
    handleClickSaveButton,
  };
};
