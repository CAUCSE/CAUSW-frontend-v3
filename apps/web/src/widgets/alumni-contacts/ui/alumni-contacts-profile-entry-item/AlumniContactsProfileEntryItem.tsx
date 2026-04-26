import { useMemo } from 'react';

import { isNil } from 'es-toolkit';

import {
  BuildingColored,
  DocumentColored,
  HStack,
  Text,
  VStack,
} from '@causw/cds';

import {
  ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE,
  type AlumniContactsProfileEntryType,
} from '../../config';
import { AlumniContactsProfileEntryEditDialog } from '../alumni-contacts-profile-entry-edit-dialog';

interface AlumniContactsProfileEntryItemProps {
  type: AlumniContactsProfileEntryType;
  description: string;
  startYear: number;
  startMonth: number;
  endYear?: number | null;
  endMonth?: number | null;
  fieldIndex: number;
  maxLength?: number;
  title: string;
  ariaDescription: string;
  placeholder: string;
  deleteButtonLabel: string;
}

export const AlumniContactsProfileEntryItem = ({
  type,
  description,
  startYear,
  startMonth,
  endYear,
  endMonth,
  fieldIndex,
  maxLength,
  title,
  ariaDescription,
  placeholder,
  deleteButtonLabel,
}: AlumniContactsProfileEntryItemProps) => {
  const Icon = useMemo(() => {
    return type === ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE.USER_CAREER
      ? BuildingColored
      : DocumentColored;
  }, [type]);

  const currentLabel =
    type === ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE.USER_CAREER
      ? '재직 중'
      : '진행 중';

  return (
    <HStack gap="md" className="items-center">
      <HStack className="size-10 shrink-0 items-center justify-center rounded-md bg-gray-100">
        <Icon size={24} />
      </HStack>
      <VStack gap="xs" className="flex-1">
        <Text typography="body-16-regular" textColor="gray-700">
          {description}
        </Text>
        <Text typography="body-14-regular" textColor="gray-400">
          {startYear}년{startMonth}월 -{' '}
          {isNil(endYear) || isNil(endMonth)
            ? currentLabel
            : `${endYear}년${endMonth}월`}
        </Text>
      </VStack>
      <AlumniContactsProfileEntryEditDialog
        fieldIndex={fieldIndex}
        fieldName={type}
        maxLength={maxLength}
        title={title}
        ariaDescription={ariaDescription}
        placeholder={placeholder}
        toggleLabel={currentLabel}
        deleteButtonLabel={deleteButtonLabel}
      />
    </HStack>
  );
};
