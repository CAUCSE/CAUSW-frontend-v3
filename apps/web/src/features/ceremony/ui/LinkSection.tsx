import { useFormContext } from 'react-hook-form';

import { Field, TextInput } from '@causw/cds';

import type { CeremonyFormData } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/form-section';

export const LinkSection = () => {
  const { register } = useFormContext<CeremonyFormData>();

  return (
    <FormSection title="관련 링크" optional>
      <Field>
        <TextInput
          {...register('relatedLink')}
          placeholder="URL을 입력해주세요."
          className="rounded-xl bg-white"
        />
      </Field>
    </FormSection>
  );
};
