'use client';

import { useCallback } from 'react';

import { useShallow } from 'zustand/shallow';

import { Select, Text } from '@causw/cds';

import {
  ALUMNI_CONTACTS_SORT_FILTER_OPTION,
  AlumniContactsSortFilterOption,
  useAlumniContactsFilterStore,
} from '@/entities/alumni-contacts';

export const AlumniContactsSortFilterSelect = () => {
  const { sortType, setSortType } = useAlumniContactsFilterStore(
    useShallow((state) => ({
      sortType: state.sortType,
      setSortType: state.setSortType,
    })),
  );

  const handleSelectChange = useCallback(
    (value: string) => {
      setSortType(value as AlumniContactsSortFilterOption);
    },
    [setSortType],
  );

  return (
    <Select
      defaultValue={ALUMNI_CONTACTS_SORT_FILTER_OPTION.UPDATED_AT_DESC.value}
      value={sortType ?? ''}
      onValueChange={handleSelectChange}
    >
      <Select.Trigger className="typo-body-15-medium cursor-pointer px-3 py-1.5 text-gray-700 [&_svg]:size-3.5 [&_svg]:fill-current [&_svg]:text-gray-400">
        <Select.Value
          placeholder={ALUMNI_CONTACTS_SORT_FILTER_OPTION.UPDATED_AT_DESC.label}
        />
      </Select.Trigger>
      <Select.Content>
        {Object.values(ALUMNI_CONTACTS_SORT_FILTER_OPTION).map((option) => (
          <Select.Item
            key={option.value}
            value={option.value}
            className="cursor-pointer"
          >
            <Text typography="body-16-regular">{option.label}</Text>
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
