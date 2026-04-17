'use client';

import { useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { isNil } from 'es-toolkit';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
} from '@/entities/alumni-contacts';

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

    const newCareer = {
      description: entry,
      startYear: startDate.getFullYear(),
      startMonth: startDate.getMonth() + 1,
      endYear: isCurrent ? null : (endDate?.getFullYear() ?? null),
      endMonth: isCurrent
        ? null
        : isNil(endDate?.getMonth())
          ? null
          : endDate.getMonth() + 1,
    };

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
