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
      <Select.Trigger className="typo-body-14-semibold shrink-0 cursor-pointer gap-1 bg-gray-100 px-2.5 py-1 text-gray-500 focus:ring-0 data-[state=open]:ring-0 [&_svg]:size-3 [&_svg]:fill-current [&_svg]:text-gray-500">
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
              className="cursor-pointer px-3 py-2"
            >
              <Text
                typography={isSelected ? 'body-15-semibold' : 'body-15-regular'}
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
