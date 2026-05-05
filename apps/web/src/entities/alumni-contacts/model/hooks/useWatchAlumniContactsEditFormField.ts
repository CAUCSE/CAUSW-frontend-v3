'use client';

import {
  type FieldPath,
  type FieldPathValue,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import { type AlumniContactsEditForm } from '../form';

export const useWatchAlumniContactsEditFormField = <
  TFieldName extends FieldPath<AlumniContactsEditForm>,
>(
  field: TFieldName,
): FieldPathValue<AlumniContactsEditForm, TFieldName> => {
  const { control } = useFormContext<AlumniContactsEditForm>();

  return useWatch({
    control,
    name: field,
  });
};
