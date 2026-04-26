'use client';

import { useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

import { createAlumniContactsProfileEntry } from '../createAlumniContactsProfileEntry';
import { sortAlumniContactsProfileEntry } from '../sortAlumniContactsProfileEntry';

export const useAlumniContactsEditFormProjectSection = () => {
  const { control, getValues } = useFormContext<AlumniContactsEditForm>();

  const { replace } = useFieldArray({
    control,
    name: ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_PROJECT,
  });
  const userProject = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_PROJECT,
  );

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

    const newProject = createAlumniContactsProfileEntry({
      entry,
      isCurrent,
      startDate,
      endDate,
    });

    const newProjectList = [...currentProject, newProject].sort(
      sortAlumniContactsProfileEntry,
    );

    replace(newProjectList);
    return;
  };

  return {
    userProject,
    isOpen,
    handleClickAddButton,
    handleOpenChange,
    handleClickAddProject,
  };
};
