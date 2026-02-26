import { Controller, useFormContext } from 'react-hook-form';

import { Field, HStack, Tab, TextInput } from '@causw/cds';

import type { CeremonyFormData, CeremonyType } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/form-section';

import { CATEGORY_MAP, CUSTOM_VALUE } from '../config';

export const CategorySection = () => {
  const { control, register, watch } = useFormContext<CeremonyFormData>();
  const ceremonyType = watch('ceremonyType');
  const category = watch('category');

  if (!ceremonyType) return null;

  const categoryOptions = CATEGORY_MAP[ceremonyType as CeremonyType] ?? [];
  const isCustom = category === CUSTOM_VALUE;

  return (
    <FormSection title="상세 분류">
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Tab
            variant="chip"
            value={field.value}
            onValueChange={field.onChange}
          >
            <Tab.List className="flex-wrap">
              {categoryOptions.map((opt) => (
                <Tab.TabItem key={opt.value} value={opt.value}>
                  {opt.emoji ? (
                    <HStack gap="xs" className="items-center">
                      <span>{opt.emoji}</span>
                      <span>{opt.value}</span>
                    </HStack>
                  ) : (
                    (opt.label ?? opt.value)
                  )}
                </Tab.TabItem>
              ))}
            </Tab.List>
          </Tab>
        )}
      />

      {isCustom && (
        <Field>
          <TextInput
            {...register('customCategory')}
            placeholder={`${ceremonyType}를 입력해주세요.`}
            className="rounded-xl bg-white"
          />
        </Field>
      )}
    </FormSection>
  );
};
