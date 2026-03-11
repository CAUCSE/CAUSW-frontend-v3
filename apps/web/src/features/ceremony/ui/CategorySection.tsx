import { useFormContext } from 'react-hook-form';

import { Field, TextInput } from '@causw/cds';

import type { CeremonyFormData, CeremonyType } from '@/entities/ceremony';

import { RHFTabSelect } from '@/shared/ui';

import { CATEGORY_MAP, CUSTOM_VALUE } from '../config';

export const CategorySection = () => {
  const { register, watch } = useFormContext<CeremonyFormData>();
  const ceremonyType = watch('ceremonyType');
  const category = watch('category');

  if (!ceremonyType) return null;

  const categoryOptions = CATEGORY_MAP[ceremonyType as CeremonyType] ?? [];
  const options = categoryOptions.map((option) => ({
    label: option.label,
    value: option.value,
  }));
  const isCustom = category === CUSTOM_VALUE;

  return (
    <>
      <RHFTabSelect name="category" label="상세 분류" options={options} />

      {isCustom && (
        <Field>
          <TextInput
            {...register('customCategory')}
            placeholder={`${ceremonyType}를 입력해주세요.`}
            className="rounded-xl bg-white"
          />
        </Field>
      )}
    </>
  );
};
