import { useFormContext } from 'react-hook-form';

import { Field, TextInput } from '@causw/cds';

import type { CeremonyFormData } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/form-section';

export const ContactSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CeremonyFormData>();

  return (
    <FormSection title="문의" optional>
      <Field className="flex flex-col gap-2" error={!!errors.phone?.message}>
        <TextInput
          {...register('phone')}
          placeholder="연락 가능한 전화번호를 입력해주세요."
          className="rounded-xl bg-white"
        />
        <Field.ErrorDescription>{errors.phone?.message}</Field.ErrorDescription>
      </Field>
    </FormSection>
  );
};
