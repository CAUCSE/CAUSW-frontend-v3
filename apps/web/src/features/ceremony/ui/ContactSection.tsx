import { useFormContext } from 'react-hook-form';

import { Field, TextInput } from '@causw/cds';

import type { CeremonyFormData } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/FormSection';

export const ContactSection = () => {
  const { register } = useFormContext<CeremonyFormData>();

  return (
    <FormSection title="문의" optional>
      <Field>
        <TextInput
          {...register('phone')}
          placeholder="연락 가능한 전화번호를 입력해주세요."
          className="rounded-xl bg-white"
        />
      </Field>
    </FormSection>
  );
};
