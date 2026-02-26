import { Controller, useFormContext } from 'react-hook-form';

import { Tab } from '@causw/cds';

import type { CeremonyFormData, CeremonyType } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/form-section';

import { CEREMONY_TYPES } from '../config';

interface TypeSectionProps {
  onTypeChange: (type: CeremonyType) => void;
}

export const TypeSection = ({ onTypeChange }: TypeSectionProps) => {
  const { control } = useFormContext<CeremonyFormData>();

  return (
    <FormSection title="분류">
      <Controller
        control={control}
        name="ceremonyType"
        render={({ field }) => (
          <Tab
            variant="chip"
            value={field.value}
            onValueChange={(v) => onTypeChange(v as CeremonyType)}
          >
            <Tab.List>
              {CEREMONY_TYPES.map((type) => (
                <Tab.TabItem key={type} value={type}>
                  {type}
                </Tab.TabItem>
              ))}
            </Tab.List>
          </Tab>
        )}
      />
    </FormSection>
  );
};
