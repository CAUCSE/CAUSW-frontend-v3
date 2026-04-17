'use client';

import { Text, Toggle } from '@causw/cds';

interface AlumniContactsProfileEntryCurrentToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

export const AlumniContactsProfileEntryCurrentToggle = ({
  checked,
  onCheckedChange,
  label,
}: AlumniContactsProfileEntryCurrentToggleProps) => {
  return (
    <Toggle checked={checked} onCheckedChange={onCheckedChange}>
      <Toggle.Switch />
      <Toggle.Label>
        <Text typography="body-15-medium" textColor="gray-700">
          {label}
        </Text>
      </Toggle.Label>
    </Toggle>
  );
};
