import { isNil } from 'es-toolkit';

import { HStack, Text, VStack } from '@causw/cds';

import type { AccountAcademicStatus } from '@/entities/user/model/types/types';

type ProfileInfoProps = {
  name: string;
  admissionYear?: number;
  academicStatus?: AccountAcademicStatus;
};

const ACADEMIC_STATUS_LABEL: Partial<Record<AccountAcademicStatus, string>> = {
  ENROLLED: '재학생',
  GRADUATED: '졸업생',
};

export const ProfileInfo = ({
  name,
  admissionYear,
  academicStatus,
}: ProfileInfoProps) => {
  const formattedAdmissionYear =
    !isNil(admissionYear) && `${admissionYear}학번`;
  const academicStatusLabel = academicStatus
    ? ACADEMIC_STATUS_LABEL[academicStatus]
    : undefined;

  return (
    <VStack align="center" gap="xs">
      <Text typography="subtitle-18-bold">{name}</Text>
      <HStack gap="sm" align="center">
        <Text typography="body-16-regular" textColor="gray-400">
          {formattedAdmissionYear}
        </Text>
        {formattedAdmissionYear && academicStatusLabel && (
          <div className="h-3 w-px bg-gray-200" />
        )}
        {academicStatusLabel && (
          <Text typography="body-16-regular" textColor="gray-400">
            {academicStatusLabel}
          </Text>
        )}
      </HStack>
    </VStack>
  );
};
