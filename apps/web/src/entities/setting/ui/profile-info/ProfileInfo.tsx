import { isNil } from 'es-toolkit';

import { HStack, Text, VStack } from '@causw/cds';

type ProfileInfoProps = {
  name: string;
  admissionYear?: number;
};

export const ProfileInfo = ({ name, admissionYear }: ProfileInfoProps) => {
  const formattedAdmissionYear =
    !isNil(admissionYear) && `${admissionYear}학번`;

  return (
    <VStack align="center" gap="xs">
      <Text typography="subtitle-18-bold">{name}</Text>
      <HStack gap="sm" align="center">
        <Text typography="body-16-regular" textColor="gray-400">
          {formattedAdmissionYear}
        </Text>
      </HStack>
    </VStack>
  );
};
