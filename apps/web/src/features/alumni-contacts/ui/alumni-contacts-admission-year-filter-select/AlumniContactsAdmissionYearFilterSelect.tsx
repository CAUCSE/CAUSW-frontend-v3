'use client';

import { Select } from '@causw/cds';

interface AlumniContactsAdmissionYearFilterSelectProps {
  defaultValue: string;
  admissionYears: number[];
  value: string;
  onValueChange: (value: string) => void;
}

export const AlumniContactsAdmissionYearFilterSelect = ({
  defaultValue,
  admissionYears,
  value,
  onValueChange,
}: AlumniContactsAdmissionYearFilterSelectProps) => {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <Select.Trigger className="typo-body-15-medium cursor-pointer bg-gray-100 px-3 py-1.5 text-gray-500 [&_svg]:size-3.5 [&_svg]:fill-current [&_svg]:text-gray-500">
        <Select.Value placeholder={defaultValue} />
      </Select.Trigger>
      {/* z-modal보다 높아야 되기 때문에 z-1001로 설정 */}
      <Select.Content className="z-1001" align="center">
        {admissionYears.map((year) => (
          <Select.Item
            key={year}
            value={year.toString()}
            className="cursor-pointer items-center justify-center gap-3 p-0 px-3 py-1.5"
          >
            {year}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
