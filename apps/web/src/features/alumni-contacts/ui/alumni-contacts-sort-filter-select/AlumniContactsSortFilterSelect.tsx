'use client';

import { Select, Text } from '@causw/cds';

import { ALUMNI_CONTACTS_SORT_FILTER_OPTION } from '@/entities/alumni-contacts';

import { useAlumniContactsSortFilter } from '../../model';

export const AlumniContactsSortFilterSelect = () => {
  const { sortType, handleSelectChange } = useAlumniContactsSortFilter();
  const selectedSortType =
    sortType ?? ALUMNI_CONTACTS_SORT_FILTER_OPTION.UPDATED_AT_DESC.value;

  return (
    <Select value={selectedSortType} onValueChange={handleSelectChange}>
      <Select.Trigger className="typo-body-15-medium shrink-0 cursor-pointer px-3 py-1.5 text-gray-700 [&_svg]:size-3.5 [&_svg]:fill-current [&_svg]:text-gray-400">
        <Select.Value
          placeholder={ALUMNI_CONTACTS_SORT_FILTER_OPTION.UPDATED_AT_DESC.label}
        >
          {sortType
            ? ALUMNI_CONTACTS_SORT_FILTER_OPTION[sortType].label
            : ALUMNI_CONTACTS_SORT_FILTER_OPTION.UPDATED_AT_DESC.label}
        </Select.Value>
      </Select.Trigger>
      <Select.Content>
        {Object.values(ALUMNI_CONTACTS_SORT_FILTER_OPTION).map((option) => {
          const isSelected = option.value === selectedSortType;
          return (
            <Select.Item
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              <Text
                typography={isSelected ? 'subtitle-16-bold' : 'body-16-regular'}
                textColor={isSelected ? 'gray-800' : 'gray-500'}
              >
                {option.label}
              </Text>
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select>
  );
};
