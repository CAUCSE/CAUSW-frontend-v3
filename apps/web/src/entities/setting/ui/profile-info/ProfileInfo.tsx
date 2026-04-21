import { isNil } from 'es-toolkit';

import { HStack, Separator, Text, VStack } from '@causw/cds';

type ProfileInfoProps = {
  name: string;
  admissionYear?: number;
  job?: string;
};

export const ProfileInfo = ({ name, admissionYear, job }: ProfileInfoProps) => {
  const formattedAdmissionYear =
    !isNil(admissionYear) && `${admissionYear}학번`;

  return (
    <VStack align="center" gap="xs">
      <Text typography="subtitle-18-bold">{name}</Text>
      <HStack gap="sm" align="center">
        {formattedAdmissionYear && (
          <Text typography="body-16-regular" textColor="gray-400">
            {formattedAdmissionYear}
          </Text>
        )}
        {formattedAdmissionYear && job && (
          <Separator orientation="vertical" className="gray-400 h-2" />
        )}
        {job && (
          <Text typography="body-16-regular" textColor="gray-400">
            {job}
          </Text>
        )}
      </HStack>
    </VStack>
  );
};
