import type { CeremonyType } from '@/entities/ceremony';

import { RHFTabSelect } from '@/shared/ui';

import { CEREMONY_TYPES } from '../config';

interface TypeSectionProps {
  onTypeChange: (type: CeremonyType) => void;
}

export const TypeSection = ({ onTypeChange }: TypeSectionProps) => {
  const options = CEREMONY_TYPES.map((type) => ({ label: type, value: type }));

  return (
    <RHFTabSelect
      name="ceremonyType"
      label="분류"
      options={options}
      onValueChange={(nextValue) => {
        onTypeChange(nextValue as CeremonyType);
      }}
    />
  );
};
