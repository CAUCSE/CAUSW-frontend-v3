'use client';

import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { Eye, EyeOff, Field, TextInput } from '@causw/cds';

export interface RHFPasswordInputProps extends React.ComponentProps<
  typeof TextInput
> {
  name: string;
  label: string;
}

export const RHFPasswordInput = ({
  name,
  label,
  ...props
}: RHFPasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
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
        type={isVisible ? 'text' : 'password'}
        rightIcon={
          isVisible ? (
            <Eye
              className="cursor-pointer"
              onClick={() => setIsVisible((value) => !value)}
            />
          ) : (
            <EyeOff
              className="cursor-pointer"
              onClick={() => setIsVisible((value) => !value)}
            />
          )
        }
        {...register(
          name,
          props.onChange ? { onChange: props.onChange } : undefined,
        )}
      />
      <Field.ErrorDescription>{errorMessage}</Field.ErrorDescription>
    </Field>
  );
};
