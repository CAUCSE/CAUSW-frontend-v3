'use client';

import { type ChangeEvent, useLayoutEffect, useRef } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH,
  type AlumniContactsEditForm,
} from '@/entities/alumni-contacts';

export const useAlumniContactsDescriptionTextArea = () => {
  const { control } = useFormContext<AlumniContactsEditForm>();

  const { field } = useController({
    control,
    name: ALUMNI_CONTACTS_EDIT_FORM_FIELD.DESCRIPTION,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (!field.value || field.value.length === 0) {
      textarea.style.height = '24px';
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [field.value]);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (
      event.target.value.length >
      ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.DESCRIPTION
    ) {
      return;
    }

    field.onChange(event);
  };

  return {
    field,
    handleTextAreaChange,
    textareaRef,
  };
};
