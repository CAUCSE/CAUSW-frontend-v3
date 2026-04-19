'use client';

import { useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
} from '@/entities/alumni-contacts';

import { createAlumniContactsProfileEntry } from '../createAlumniContactsProfileEntry';
import { sortAlumniContactsProfileEntry } from '../sortAlumniContactsProfileEntry';

export const useAlumniContactsEditFormCareerSection = () => {
  const { control, getValues } = useFormContext<AlumniContactsEditForm>();
  const { fields, remove, replace } = useFieldArray({
    control,
    name: ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_CAREER,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickAddButton = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleClickAddCareer = (
    entry: string,
    isCurrent: boolean,
    startDate?: Date,
    endDate?: Date,
  ) => {
    if (!startDate) {
      return;
    }

    const currentCareer = getValues(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_CAREER,
    );

    const newCareer = createAlumniContactsProfileEntry({
      entry,
      isCurrent,
      startDate,
      endDate,
    });

    const newCareerList = [...currentCareer, newCareer].sort(
      sortAlumniContactsProfileEntry,
    );

    replace(newCareerList);
    return;
  };

  const handleClickDeleteCareer = (idx: number) => {
    remove(idx);
  };

  return {
    fields,
    isOpen,
    handleClickAddButton,
    handleOpenChange,
    handleClickAddCareer,
    handleClickDeleteCareer,
  };
};
