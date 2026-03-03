'use client';

import { useState } from 'react';

import { Select, Text } from '@causw/cds';

import {
  ALUMNI_CONTACTS_SORT_FILTER_OPTION,
  AlumniContactsSortFilterOption,
} from '@/entities/alumni-contacts';

export const AlumniContactsSortFilterSelect = () => {
  const [value, setValue] = useState<AlumniContactsSortFilterOption>(
    ALUMNI_CONTACTS_SORT_FILTER_OPTION.UPDATED_AT_DESC.value,
  );

  const handleValueChange = (value: AlumniContactsSortFilterOption) => {
    setValue(value);
  };

  return (
    <Select
      defaultValue={ALUMNI_CONTACTS_SORT_FILTER_OPTION.UPDATED_AT_DESC.value}
      value={value}
      onValueChange={handleValueChange}
    >
      <Select.Trigger className="typo-body-15-medium px-3 py-1.5 text-gray-700 [&_svg]:size-3.5 [&_svg]:text-gray-400">
        <Select.Value
          placeholder={ALUMNI_CONTACTS_SORT_FILTER_OPTION.UPDATED_AT_DESC.label}
        />
      </Select.Trigger>
      <Select.Content>
        {Object.values(ALUMNI_CONTACTS_SORT_FILTER_OPTION).map((option) => (
          <Select.Item key={option.value} value={option.value}>
            <Text typography="body-16-regular">{option.label}</Text>
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
