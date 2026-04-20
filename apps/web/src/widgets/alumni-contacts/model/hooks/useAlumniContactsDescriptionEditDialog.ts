'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH,
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

export const useAlumniContactsDescriptionEditDialog = () => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const description = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.DESCRIPTION,
  );

  const [isOpen, setIsOpen] = useState(false);

  const [currentDescription, setCurrentDescription] =
    useState<string>(description);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });

    return () => cancelAnimationFrame(frame);
  }, [currentDescription, isOpen]);

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setCurrentDescription(description);
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (
      event.target.value.length >
      ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.DESCRIPTION
    ) {
      return;
    }
    setCurrentDescription(event.target.value);
  };

  const handleClickEditButton = () => {
    // \r\n, \n 2개 이상 연속일 경우 \n로 변경
    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.DESCRIPTION,
      currentDescription.replace(/\r\n/g, '\n').replace(/\n{2,}/g, '\n'),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  return {
    description,
    currentDescription,
    textareaRef,
    handleDialogOpenChange,
    handleDescriptionChange,
    handleClickEditButton,
  };
};
