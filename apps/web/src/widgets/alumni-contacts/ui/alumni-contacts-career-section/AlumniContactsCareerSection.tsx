import { BuildingColored, HStack, Text, VStack } from '@causw/cds';

import {
  formatAlumniContactsPeriod,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { sortAlumniContactsProfileEntry } from '../../model';
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

  const sortedUserCareer = [...userCareer].sort(sortAlumniContactsProfileEntry);

  return (
    <VStack className="gap-5">
      {sortedUserCareer.map((career) => (
        <HStack key={career.id} className="items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-gray-100">
            <BuildingColored size={24} />
          </div>
          <VStack gap="none" className="min-w-0">
            <Text
              typography="body-15-medium"
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
