'use client';

import { Text, Toggle } from '@causw/cds';

interface AlumniContactsContactVisibilityToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const AlumniContactsContactVisibilityToggle = ({
  checked,
  onCheckedChange,
}: AlumniContactsContactVisibilityToggleProps) => {
  return (
    <Toggle
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="items-center justify-between"
    >
      <Toggle.Label>
        <Text
          typography="body-16-medium"
          textColor="gray-700"
          className="shrink-0"
        >
          전화 / 메세지 공개
        </Text>
      </Toggle.Label>
      <Toggle.Switch />
    </Toggle>
  );
};
