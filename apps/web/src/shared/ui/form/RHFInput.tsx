'use client';

import { useFormContext } from 'react-hook-form';

import { Field, TextInput } from '@causw/cds';

export interface RHFInputProps extends React.ComponentProps<typeof TextInput> {
  name: string;
  label: string;
}

export const RHFInput = ({ name, label, ...props }: RHFInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <Field className="flex flex-col gap-2" error={!!errorMessage}>
      <Field.Label>{label}</Field.Label>
      <TextInput
        {...props}
        {...register(
          name,
          props.onChange ? { onChange: props.onChange } : undefined,
        )}
      />
      <Field.ErrorDescription>{errorMessage}</Field.ErrorDescription>
    </Field>
  );
};
