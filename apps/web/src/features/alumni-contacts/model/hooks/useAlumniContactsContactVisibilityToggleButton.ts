'use client';

import { useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

export const useAlumniContactsContactVisibilityToggleButton = () => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const isPhoneNumberVisible = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.IS_PHONE_NUMBER_VISIBLE,
  );

  const handleClickButton = () => {
    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.IS_PHONE_NUMBER_VISIBLE,
      !isPhoneNumberVisible,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  return {
    isPhoneNumberVisible,
    handleClickButton,
  };
};
