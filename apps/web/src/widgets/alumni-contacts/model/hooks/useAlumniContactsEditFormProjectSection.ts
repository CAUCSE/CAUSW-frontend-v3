'use client';

import { useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
} from '@/entities/alumni-contacts';

import { sortAlumniContactsProfileEntry } from '../sortAlumniContactsProfileEntry';

export const useAlumniContactsEditFormProjectSection = () => {
  const { control, getValues } = useFormContext<AlumniContactsEditForm>();

  const { fields, remove, replace } = useFieldArray({
    control,
    name: ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_PROJECT,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickAddButton = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleClickAddProject = (
    entry: string,
    isCurrent: boolean,
    startDate?: Date,
    endDate?: Date,
  ) => {
    if (!startDate) {
      return;
    }

    const currentProject = getValues(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_PROJECT,
    );

    const newProject = {
      description: entry,
      startYear: startDate.getFullYear(),
      startMonth: startDate.getMonth() + 1,
      endYear: isCurrent ? null : (endDate?.getFullYear() ?? null),
      endMonth: isCurrent
        ? null
        : endDate?.getMonth()
          ? endDate.getMonth() + 1
          : null,
    };

    const newProjectList = [...currentProject, newProject].sort(
      sortAlumniContactsProfileEntry,
    );

    replace(newProjectList);
    return;
  };

  const handleClickDeleteProject = (idx: number) => {
    remove(idx);
  };

  return {
    fields,
    isOpen,
    handleClickAddButton,
    handleOpenChange,
    handleClickAddProject,
    handleClickDeleteProject,
  };
};
