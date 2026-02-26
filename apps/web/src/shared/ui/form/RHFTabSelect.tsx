'use client';

import { useController } from 'react-hook-form';

import { Field, Tab } from '@causw/cds';

export interface RHFTabSelectProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

export const RHFTabSelect = ({
  name,
  label,
  options,
  required,
}: RHFTabSelectProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, rules: { required } });

  return (
    <Field className="flex flex-col gap-2" error={!!error?.message}>
      <Field.Label>{label}</Field.Label>
      <Tab.Root variant="chip" value={value} onValueChange={onChange}>
        <Tab.List className="scrollbar-hide flex-wrap gap-2 overflow-x-auto">
          {options.map((opt) => (
            <Tab.TabItem key={opt.value} value={opt.value} type="button">
              {opt.label}
            </Tab.TabItem>
          ))}
        </Tab.List>
      </Tab.Root>
      <Field.ErrorDescription>
        {error?.message as string | undefined}
      </Field.ErrorDescription>
    </Field>
  );
};
