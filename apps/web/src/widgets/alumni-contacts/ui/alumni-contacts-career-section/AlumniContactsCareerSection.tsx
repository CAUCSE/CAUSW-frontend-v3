import { BuildingColored, HStack, Text, VStack } from '@causw/cds';

import {
  formatAlumniContactsPeriod,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsDetailInfoEmptyView } from '../alumni-contacts-detail-info-empty-view';

interface AlumniContactsCareerSectionProps {
  userCareer: GetAlumniContactsDetailResponseDto['userCareer'];
}

export const AlumniContactsCareerSection = ({
  userCareer,
}: AlumniContactsCareerSectionProps) => {
  if (userCareer.length === 0) {
    return <AlumniContactsDetailInfoEmptyView />;
  }

  return (
    <VStack className="gap-5">
      {userCareer.map((career) => (
        <HStack key={career.id}>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-gray-100">
            <BuildingColored size={24} />
          </div>
          <VStack gap="xs" className="min-w-0">
            <Text
              typography="body-16-regular"
              textColor="gray-700"
              className="line-clamp-2 min-w-0"
            >
              {career.description}
            </Text>
            <Text
              typography="body-14-regular"
              textColor="gray-400"
              className="whitespace-pre-wrap"
            >
              {formatAlumniContactsPeriod(career)}
            </Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};
