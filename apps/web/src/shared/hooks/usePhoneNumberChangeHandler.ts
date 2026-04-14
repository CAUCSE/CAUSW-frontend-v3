'use client';

import { useCallback } from 'react';

import type {
  FieldPathByValue,
  FieldValues,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form';

import { formatPhoneNumberWithCaret } from '@/shared/lib';

type UsePhoneNumberChangeHandlerParams<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  fieldName: FieldPathByValue<T, string>;
};

export const usePhoneNumberChangeHandler = <T extends FieldValues>({
  setValue,
  fieldName,
}: UsePhoneNumberChangeHandlerParams<T>) => {
  const handlePhoneNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const { formattedValue, nextCaretPosition } = formatPhoneNumberWithCaret(
        input.value,
        input.selectionStart ?? input.value.length,
      );

      setValue(
        fieldName,
        formattedValue as PathValue<T, FieldPathByValue<T, string>>,
        { shouldValidate: true },
      );
      requestAnimationFrame(() => {
        input.setSelectionRange(nextCaretPosition, nextCaretPosition);
      });
    },
    [fieldName, setValue],
  );

  return { handlePhoneNumberChange };
};
